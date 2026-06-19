import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  showChevron?: boolean
  className?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  showChevron,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium transition-colors',
        variant === 'primary' &&
          'bg-primary text-white hover:bg-primary-hover',
        variant === 'ghost' &&
          'text-label hover:bg-page hover:text-body',
        className,
      )}
    >
      {children}
      {showChevron && <ChevronDown className="h-3.5 w-3.5 opacity-90" />}
    </button>
  )
}
