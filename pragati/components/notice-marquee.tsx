"use client"

const notices = [
  "Important Notice: Village health camp on 15th August!",
  "New agricultural subsidies announced. Check the Agriculture section for details.",
  "Education module updated with new lessons on basic literacy.",
]

export function NoticeMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-yellow-100 py-2 text-sm text-yellow-800">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        {notices.map((notice, index) => (
          <span key={`original-${index}`} className="mx-4">
            {notice}
          </span>
        ))}
        {notices.map((notice, index) => (
          <span key={`duplicate-${index}`} className="mx-4" aria-hidden="true">
            {notice}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
