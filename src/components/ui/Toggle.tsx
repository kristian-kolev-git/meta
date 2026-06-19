import { clsx } from 'clsx'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, id, disabled }: ToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={clsx(
        'relative h-5 w-9 shrink-0 rounded-full transition-colors',
        disabled ? 'cursor-not-allowed bg-[#d4d4d8]' : checked ? 'bg-primary' : 'bg-[#d4d4d8]',
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked && !disabled && 'translate-x-4',
        )}
      />
    </button>
  )
}
