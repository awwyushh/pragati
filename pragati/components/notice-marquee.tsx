"use client"

const notices = [
  "Important Notice: Village health camp on 15th August!",
  "New agricultural subsidies announced. Check the Agriculture section for details.",
  "Education module updated with new lessons on basic literacy.",
]

export function NoticeMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-yellow-100 py-2 text-sm text-yellow-800">
      {/* The inner div now has 'flex' to keep content in a row and will be animated */}
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render the original content */}
        {notices.map((notice, index) => (
          <span key={`original-${index}`} className="mx-4">
            {notice}
          </span>
        ))}
        {/* Duplicate the content for seamless looping */}
        {notices.map((notice, index) => (
          <span key={`duplicate-${index}`} className="mx-4" aria-hidden="true">
            {notice}
          </span>
        ))}
      </div>
    </div>
  )
}
