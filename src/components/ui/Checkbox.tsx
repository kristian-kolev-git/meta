import { clsx } from 'clsx'
import { Check } from 'lucide-react'
import { Tooltip } from './Tooltip'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  id?: string
  disabled?: boolean
  tooltip?: string
  tooltipMaxWidth?: number
  size?: 'S' | 'M'
}

export function Checkbox({
  checked,
  onChange,
  label,
  description,
  id,
  disabled,
  tooltip,
  tooltipMaxWidth,
  size = 'M',
}: CheckboxProps) {
  const boxCls = size === 'M' ? 'h-5 w-5' : 'h-4 w-4'
  const checkCls = size === 'M' ? 'h-3.5 w-3.5' : 'h-3 w-3'
  const hasDescription = Boolean(description)

  const el = (
    <label
      htmlFor={id}
      className={clsx(
        'inline-flex gap-2',
        hasDescription ? 'items-start' : 'items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-[3px] border transition-colors',
          boxCls,
          hasDescription && 'mt-0.5',
          disabled
            ? 'border-border bg-[#f4f4f5] text-muted'
            : checked
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-white',
        )}
      >
        {checked && !disabled && <Check className={checkCls} strokeWidth={3} />}
      </button>
      {hasDescription ? (
        <div>
          <p
            className={clsx('font-medium leading-tight', disabled ? 'text-muted' : 'text-body')}
            style={{ fontSize: 16, lineHeight: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
          >
            {label}
          </p>
          <p className="mt-0.5 text-sm leading-4" style={{ color: '#68696A' }}>{description}</p>
        </div>
      ) : (
        <span
          className={clsx('font-medium', disabled ? 'text-muted' : 'text-body')}
          style={{ fontSize: 16, lineHeight: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
        >
          {label}
        </span>
      )}
    </label>
  )

  if (tooltip) return <Tooltip content={tooltip} maxWidth={tooltipMaxWidth}>{el}</Tooltip>
  return el
}
