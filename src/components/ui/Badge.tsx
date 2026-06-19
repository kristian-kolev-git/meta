import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'draft' | 'default'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center text-[11px] font-medium',
        variant === 'draft' &&
          'rounded-full bg-draft-bg px-2 py-0.5 text-draft-text',
        variant === 'default' && 'rounded bg-page px-1.5 py-0.5 text-label',
      )}
    >
      {children}
    </span>
  )
}
