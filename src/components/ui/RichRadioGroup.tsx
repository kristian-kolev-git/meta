import { clsx } from 'clsx'

export interface RichRadioOption {
  value: string
  label: string
  description: string
}

interface RichRadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: readonly RichRadioOption[]
}

export function RichRadioGroup({ value, onChange, options }: RichRadioGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className="inline-flex cursor-pointer items-start gap-2.5 text-left"
        >
          <span
            className={clsx(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
              value === opt.value ? 'border-primary' : 'border-border',
            )}
          >
            {value === opt.value && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
          </span>
          <div>
            <p className="text-sm font-medium leading-tight text-body">{opt.label}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-muted">{opt.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
