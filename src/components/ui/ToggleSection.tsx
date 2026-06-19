import type { ReactNode } from 'react'
import { MaterialIcon } from './MaterialIcon'

interface ToggleSectionProps {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  children?: ReactNode
  headerAction?: ReactNode
}

export function ToggleSection({ label, checked, onChange, children, headerAction }: ToggleSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className="flex items-center gap-2 text-left"
        >
          <MaterialIcon
            name={checked ? 'expand_more' : 'chevron_right'}
            className="text-[20px] text-label"
          />
          <span className="text-sm font-semibold text-body">{label}</span>
        </button>
        {headerAction}
      </div>
      {checked && children && (
        <>
          {/* <div className="mt-4 border-t border-border" /> */}
          <div className="mt-4 pl-8">{children}</div>
        </>
      )}
    </div>
  )
}
