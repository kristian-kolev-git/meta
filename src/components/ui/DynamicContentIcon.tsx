export function DynamicContentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 8h2M11.5 8h2M6 5.5 4 8l2 2.5M10 5.5l2 2.5-2 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="0.75" fill="currentColor" />
      <circle cx="6.25" cy="8" r="0.75" fill="currentColor" />
      <circle cx="9.75" cy="8" r="0.75" fill="currentColor" />
    </svg>
  )
}
