interface FieldLabelProps {
  children: React.ReactNode
  required?: boolean
  htmlFor?: string
}

export function FieldLabel({ children, required, htmlFor }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-body"
    >
      {children}
      {required && <span className="text-[#dc2626]"> *</span>}
    </label>
  )
}
