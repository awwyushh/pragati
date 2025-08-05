import streamlit as st
import sounddevice as sd
import queue
import json
import os
from vosk import Model, KaldiRecognizer

# Hindi model path
MODEL_PATH = "vosk-model-small-hi-0.22"

# Load Vosk model
@st.cache_resource
def load_model():
    return Model(MODEL_PATH)

model = load_model()

# Settings
sample_rate = 16000
q = queue.Queue()

# Audio callback
def callback(indata, frames, time, status):
    if status:
        st.warning(f"Recording error: {status}")
    q.put(bytes(indata))

# UI
st.title("🗣️ हिंदी स्पीच-टू-टेक्स्ट")
st.markdown("🎤 **माइक्रोफ़ोन से बोलिए और नीचे टेक्स्ट देखिए।**")

if st.button("🔴 रिकॉर्डिंग शुरू करें"):
    st.info("🎙️ बोलना शुरू करें... (Ctrl+C या स्टॉप दबाएं बंद करने के लिए)")
    rec = KaldiRecognizer(model, sample_rate)

    try:
        with sd.RawInputStream(samplerate=sample_rate, blocksize=8000, dtype='int16',
                               channels=1, callback=callback):
            stframe = st.empty()
            full_text = ""
            while True:
                data = q.get()
                if rec.AcceptWaveform(data):
                    result = json.loads(rec.Result())
                    text = result.get("text", "")
                    if text.strip():
                        full_text += text + " "
                        stframe.markdown(f"📝 **टेक्स्ट:** {full_text}")
                else:
                    partial = json.loads(rec.PartialResult()).get("partial", "")
                    if partial:
                        stframe.markdown(f"⌛ **आंशिक:** {partial}")
    except KeyboardInterrupt:
        st.success("✅ रिकॉर्डिंग रोक दी गई।")
    except Exception as e:
        st.error(f"❌ Error: {e}")
