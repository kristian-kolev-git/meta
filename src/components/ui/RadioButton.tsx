import { clsx } from 'clsx'

interface RadioButtonProps {
  checked: boolean
  onChange: () => void
  label?: string
  size?: 'S' | 'M'
}

export function RadioButton({ checked, onChange, label, size = 'M' }: RadioButtonProps) {
  const outerCls = size === 'M' ? 'h-5 w-5' : 'h-4 w-4'
  const innerCls = size === 'M' ? 'h-2.5 w-2.5' : 'h-2 w-2'

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full cursor-pointer items-start gap-2 text-left text-body"
    >
      <span
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          outerCls,
          checked ? 'border-primary' : 'border-border',
        )}
      >
        {checked && <span className={clsx('rounded-full bg-primary', innerCls)} />}
      </span>
      {label && (
        <span
          className="font-medium"
          style={{ fontSize: 16, lineHeight: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
        >
          {label}
        </span>
      )}
    </button>
  )
}
