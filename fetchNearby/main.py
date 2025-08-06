from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import httpx
import asyncio
from typing import List, Dict, Any, Optional
import math

app = FastAPI(title="Nearby Places API", version="1.0.0")

class LocationRequest(BaseModel):
    lat: float = Field(..., description="Latitude", ge=-90, le=90)
    lng: float = Field(..., description="Longitude", ge=-180, le=180)
    xyz: str = Field(..., description="Type of place to search for (e.g., hospital, restaurant, school)")
    radius: Optional[int] = Field(1000, description="Search radius in meters", ge=100, le=5000)

class PlaceInfo(BaseModel):
    name: Optional[str]
    lat: float
    lng: float
    distance: float
    place_type: str
    address: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    opening_hours: Optional[str] = None

# Mapping common search terms to OSM tags
PLACE_TYPE_MAPPING = {
    "hospital": "amenity=hospital",
    "hospitals": "amenity=hospital",
    "restaurant": "amenity=restaurant",
    "restaurants": "amenity=restaurant",
    "school": "amenity=school",
    "schools": "amenity=school",
    "pharmacy": "amenity=pharmacy",
    "pharmacies": "amenity=pharmacy",
    "bank": "amenity=bank",
    "banks": "amenity=bank",
    "atm": "amenity=atm",
    "atms": "amenity=atm",
    "gas_station": "amenity=fuel",
    "fuel": "amenity=fuel",
    "supermarket": "shop=supermarket",
    "grocery": "shop=supermarket",
    "cafe": "amenity=cafe",
    "cafes": "amenity=cafe",
    "hotel": "tourism=hotel",
    "hotels": "tourism=hotel",
    "police": "amenity=police",
    "fire_station": "amenity=fire_station",
    "library": "amenity=library",
    "libraries": "amenity=library",
    "park": "leisure=park",
    "parks": "leisure=park",
    "gym": "leisure=fitness_centre",
    "fitness": "leisure=fitness_centre",
    "mall": "shop=mall",
    "shopping": "shop=mall"
}

def calculate_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate distance between two points using Haversine formula"""
    R = 6371000  # Earth's radius in meters
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lng = math.radians(lng2 - lng1)
    
    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lng/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    return R * c

def build_overpass_query(lat: float, lng: float, place_type: str, radius: int) -> str:
    """Build Overpass API query"""
    osm_tag = PLACE_TYPE_MAPPING.get(place_type.lower(), f"amenity={place_type}")
    
    query = f"""
    [out:json][timeout:25];
    (
      node[{osm_tag}](around:{radius},{lat},{lng});
      way[{osm_tag}](around:{radius},{lat},{lng});
      relation[{osm_tag}](around:{radius},{lat},{lng});
    );
    out center meta;
    """
    return query

async def fetch_places_from_overpass(lat: float, lng: float, place_type: str, radius: int) -> List[Dict[str, Any]]:
    """Fetch places from Overpass API"""
    query = build_overpass_query(lat, lng, place_type, radius)
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(
                "https://overpass-api.de/api/interpreter",
                data=query,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )
            response.raise_for_status()
            return response.json().get("elements", [])
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Error fetching data from Overpass API: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Overpass API error")

def extract_place_info(element: Dict[str, Any], search_lat: float, search_lng: float, place_type: str) -> PlaceInfo:
    """Extract place information from OSM element"""
    tags = element.get("tags", {})
    
    # Get coordinates
    if "lat" in element and "lon" in element:
        lat, lng = element["lat"], element["lon"]
    elif "center" in element:
        lat, lng = element["center"]["lat"], element["center"]["lon"]
    else:
        lat, lng = search_lat, search_lng  # fallback
    
    # Calculate distance
    distance = calculate_distance(search_lat, search_lng, lat, lng)
    
    # Extract information
    name = tags.get("name", "Unknown")
    
    # Build address from available components
    address_parts = []
    for key in ["addr:housenumber", "addr:street", "addr:city", "addr:postcode"]:
        if key in tags:
            address_parts.append(tags[key])
    address = ", ".join(address_parts) if address_parts else None
    
    return PlaceInfo(
        name=name,
        lat=lat,
        lng=lng,
        distance=round(distance, 2),
        place_type=place_type,
        address=address,
        phone=tags.get("phone"),
        website=tags.get("website"),
        opening_hours=tags.get("opening_hours")
    )

@app.get("/")
async def root():
    return {
        "message": "Nearby Places API",
        "endpoints": {
            "search": "/nearby",
            "supported_types": list(PLACE_TYPE_MAPPING.keys())
        }
    }

@app.get("/supported-types")
async def get_supported_types():
    return {"supported_types": list(PLACE_TYPE_MAPPING.keys())}

@app.post("/nearby", response_model=List[PlaceInfo])
async def get_nearby_places(request: LocationRequest):
    """Get nearby places based on coordinates and place type"""
    
    if request.xyz.lower() not in PLACE_TYPE_MAPPING and not request.xyz.replace("_", " ").lower() in PLACE_TYPE_MAPPING:
        # Try to search anyway with the provided term
        pass
    
    try:
        elements = await fetch_places_from_overpass(
            request.lat, request.lng, request.xyz, request.radius
        )
        
        if not elements:
            return []
        
        places = []
        for element in elements:
            try:
                place = extract_place_info(element, request.lat, request.lng, request.xyz)
                places.append(place)
            except Exception as e:
                # Skip problematic elements
                continue
        
        # Sort by distance
        places.sort(key=lambda x: x.distance)
        
        # Return top 20 results
        return places[:20]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)