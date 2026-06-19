import { clsx } from 'clsx'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  suffix?: string
  prefix?: string
  className?: string
}

export function TextInput({
  value,
  onChange,
  placeholder,
  id,
  suffix,
  prefix,
  className,
}: TextInputProps) {
  return (
    <div className={clsx('relative flex', className)}>
      {prefix && (
        <span className="flex h-8 items-center rounded-l-[var(--radius-field)] border border-r-0 border-border bg-input-muted px-2.5 text-xs text-label">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'h-8 w-full rounded-[var(--radius-field)] border border-border bg-white px-3.5 text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none',
          prefix && 'rounded-l-none',
          suffix && 'rounded-r-none',
        )}
      />
      {suffix && (
        <span className="flex h-8 items-center rounded-r-[var(--radius-field)] border border-l-0 border-border bg-input-muted px-2.5 text-xs text-label">
          {suffix}
        </span>
      )}
    </div>
  )
}
