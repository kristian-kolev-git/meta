import { clsx } from 'clsx'
import { ChevronDown, Check } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface SelectProps {
  value: string | null
  onChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
  id?: string
  startAdornment?: ReactNode
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  id,
  startAdornment,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const portalRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const insideToggle = ref.current?.contains(target)
      const insidePortal = portalRef.current?.contains(target)
      if (!insideToggle && !insidePortal) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 140),
        zIndex: 9999,
      })
    }
    setOpen((v) => !v)
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={btnRef}
        id={id}
        type="button"
        onClick={handleOpen}
        className={clsx(
          'flex h-8 w-full items-center justify-between rounded-lg border border-border bg-white px-3.5 text-left text-sm',
          !value && 'text-muted',
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {startAdornment}
          <span className="truncate">{value ?? placeholder}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-label" />
      </button>
      {open && createPortal(
        <ul
          ref={portalRef}
          style={dropdownStyle}
          className="max-h-48 overflow-auto rounded-lg border border-border bg-white py-1 shadow-lg"
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={clsx(
                  'flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-page',
                  value === opt ? 'bg-active-bg text-primary' : 'text-body',
                )}
              >
                {opt}
                {value === opt && <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
              </button>
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </div>
  )
}
