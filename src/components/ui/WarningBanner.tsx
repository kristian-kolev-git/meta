interface WarningBannerProps {
  title: string
  message?: string
  inline?: boolean
}

export function WarningBanner({ title, message, inline }: WarningBannerProps) {
  if (inline) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-[#fef9c3] px-3 py-1.5 text-sm text-[#92400e]">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#92400e] text-[9px] font-bold text-white">
          !
        </span>
        {title}
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-[#fde68a] bg-[#fefce8] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#92400e] text-[11px] font-bold text-white">
          !
        </span>
        <div>
          <p className="font-semibold text-[#92400e]">{title}</p>
          {message && <p className="mt-1 text-sm text-body">{message}</p>}
        </div>
      </div>
    </div>
  )
}
