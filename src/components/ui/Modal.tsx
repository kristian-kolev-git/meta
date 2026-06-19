import { useEffect } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children?: React.ReactNode
  onConfirm?: () => void
  confirmLabel?: string
  confirmDisabled?: boolean
  cancelLabel?: string
  onBack?: () => void
  height?: number
  bodyClassName?: string
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  onConfirm,
  confirmLabel = 'Add',
  confirmDisabled = false,
  cancelLabel = 'Cancel',
  onBack,
  height,
  bodyClassName,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="flex w-[600px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ height: height ? `${height}px` : undefined, maxHeight: height ? `${height}px` : 'calc(100vh - 80px)' }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-body">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-label hover:bg-page hover:text-body"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-px shrink-0 bg-border" />

        {/* Body */}
        <div className={bodyClassName ?? 'flex-1 overflow-y-auto p-6'}>
          {children}
        </div>

        <div className="h-px shrink-0 bg-border" />

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 items-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-body hover:bg-page"
          >
            {cancelLabel}
          </button>
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="flex h-9 items-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-body hover:bg-page"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm}
              disabled={confirmDisabled}
              className="flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:bg-[#d1d5db] disabled:text-[#9ca3af] bg-primary text-white hover:bg-primary-hover"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
