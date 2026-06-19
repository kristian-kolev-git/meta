import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronDown, Check } from 'lucide-react'
import { clsx } from 'clsx'

interface MultiSelectProps {
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  compact?: boolean
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  compact = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (!ref.current?.contains(target) && !portalRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const dropdownH = Math.min(options.length * 41 + 8, 224) // estimate
      const spaceBelow = window.innerHeight - rect.bottom
      const openUpward = spaceBelow < dropdownH + 8
      setDropdownStyle({
        position: 'fixed',
        width: rect.width,
        left: rect.left,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
        zIndex: 9999,
      })
    }
    setOpen((o) => !o)
  }

  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  const remove = (opt: string) => onChange(value.filter((v) => v !== opt))

  return (
    <div ref={ref} className="relative">
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
        className="flex h-8 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-lg border border-border bg-white px-2.5"
      >
        {value.length === 0 ? (
          <span className="flex-1 text-sm text-muted">{placeholder}</span>
        ) : compact ? (
          <span className="flex-1 text-sm text-body">{value.length} selected</span>
        ) : (
          value.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1 rounded-full bg-page px-2.5 py-0.5 text-sm text-body"
            >
              {v}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(v) }}
                className="ml-0.5 text-muted hover:text-body"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        )}
        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-label" />
      </div>

      {open && createPortal(
        <ul
          ref={portalRef}
          style={dropdownStyle}
          className="max-h-56 overflow-auto rounded-lg border border-border bg-white py-1 shadow-lg"
        >
          {options.map((opt) => {
            const checked = value.includes(opt)
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => toggle(opt)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-body hover:bg-page"
                >
                  <span
                    className={clsx(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border transition-colors',
                      checked ? 'border-primary bg-primary text-white' : 'border-border bg-white',
                    )}
                  >
                    {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  {opt}
                </button>
              </li>
            )
          })}
        </ul>,
        document.body,
      )}
    </div>
  )
}
