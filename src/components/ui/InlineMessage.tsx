interface InlineMessageProps {
  children: React.ReactNode
  variant?: 'blue' | 'neutral'
}

export function InlineMessage({ children, variant = 'blue' }: InlineMessageProps) {
  const styles =
    variant === 'neutral'
      ? 'bg-transparent text-label'
      : 'bg-[#EBF4FF] text-[#1565C0]'

  return (
    <div className={`inline-flex h-7 items-center gap-1.5 rounded-full pl-2 pr-2 text-sm font-medium ${styles}`}>
      <span
        className="material-symbols-outlined leading-none"
        style={{ fontSize: 16, fontVariationSettings: "'FILL' 1, 'OPSZ' 16" }}
      >
        info
      </span>
      {children}
    </div>
  )
}
