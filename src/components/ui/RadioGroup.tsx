import { RadioButton } from './RadioButton'

interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
  label?: string
  size?: 'S' | 'M'
}

export function RadioGroup({ value, onChange, options, label, size = 'M' }: RadioGroupProps) {
  return (
    <div>
      {label && <p className="mb-2 text-sm font-medium text-body">{label}</p>}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => (
          <RadioButton
            key={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            label={opt}
            size={size}
          />
        ))}
      </div>
    </div>
  )
}
