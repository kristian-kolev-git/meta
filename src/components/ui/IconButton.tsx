import type { LucideIcon } from 'lucide-react'

interface IconButtonProps {
  icon: LucideIcon
  onClick?: () => void
  label: string
}

export function IconButton({ icon: Icon, onClick, label }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-input)] text-label hover:bg-page hover:text-body"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </button>
  )
}
