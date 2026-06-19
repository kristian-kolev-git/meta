import { DynamicContentIcon } from './DynamicContentIcon'

interface AdSetNameInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
}

export function AdSetNameInput({ value, onChange, id }: AdSetNameInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add dynamic content with {{"
        className="h-8 w-full rounded-lg border border-border bg-white py-2 pr-10 pl-3.5 text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none"
      />
      <button
        type="button"
        aria-label="Insert dynamic content"
        className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-label hover:bg-page hover:text-body"
      >
        <DynamicContentIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
