import { clsx } from 'clsx'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface RichOption {
  label: string
  description: string
  disabled?: boolean
}

interface RichSelectProps {
  value: string | null
  onChange: (value: string) => void
  options: readonly RichOption[]
  placeholder?: string
  id?: string
}

export function RichSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  id,
}: RichSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.label === value) ?? null

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          'flex h-14 w-full items-center justify-between rounded-lg border border-border bg-white px-3.5 text-left',
          !selected && 'text-muted',
        )}
      >
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block text-sm font-medium leading-tight text-body">
                {selected.label}
              </span>
              <span className="block text-[12px] leading-tight text-muted">
                {selected.description}
              </span>
            </>
          ) : (
            <span className="text-sm">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-label" />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full overflow-auto rounded-lg border border-border bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <li key={opt.label}>
              <button
                type="button"
                disabled={opt.disabled}
                onClick={() => {
                  if (!opt.disabled) {
                    onChange(opt.label)
                    setOpen(false)
                  }
                }}
                className={clsx(
                  'flex w-full items-start gap-3 px-3.5 py-2 text-left',
                  opt.disabled
                    ? 'cursor-not-allowed opacity-40'
                    : value === opt.label
                      ? 'bg-active-bg hover:bg-active-bg'
                      : 'hover:bg-page',
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-tight text-body">
                    {opt.label}
                  </span>
                  <span className="block text-[12px] leading-snug text-muted">
                    {opt.description}
                  </span>
                </span>
                {value === opt.label && !opt.disabled && (
                  <Check className="self-center h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
