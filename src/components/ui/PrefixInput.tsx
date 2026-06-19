interface PrefixInputProps {
  prefix: string
  value: string
  onChange: (value: string) => void
  step?: string
  placeholder?: string
  className?: string
}

export function PrefixInput({
  prefix,
  value,
  onChange,
  step = '0.01',
  placeholder = '',
  className = '',
}: PrefixInputProps) {
  const prefixWidth = prefix.length <= 1 ? 'pl-7' : prefix.length <= 2 ? 'pl-9' : 'pl-14'

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <span className="text-sm text-label">{prefix}</span>
      </div>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-8 w-full rounded-lg border border-border bg-white ${prefixWidth} pr-3 text-sm text-body placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
    </div>
  )
}
