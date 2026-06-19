import { clsx } from 'clsx'
import type React from 'react'

interface MaterialIconProps {
  name: string
  className?: string
  filled?: boolean
  variant?: 'round' | 'outlined'
  style?: React.CSSProperties
}

export function MaterialIcon({ name, className, variant = 'outlined', style }: MaterialIconProps) {
  return (
    <span
      className={clsx(
        variant === 'outlined' ? 'material-icons-outlined' : 'material-icons-round',
        'select-none',
        className,
      )}
      style={style}
      aria-hidden
    >
      {name}
    </span>
  )
}
