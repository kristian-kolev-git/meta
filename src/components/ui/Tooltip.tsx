import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
  maxWidth?: number
  disabled?: boolean
}

export function Tooltip({ content, children, maxWidth = 400, disabled = false }: TooltipProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      top: rect.top - 8, // will be shifted up by translateY(-100%)
      left: rect.left + rect.width / 2,
    })
  }

  const handleMouseLeave = () => setPos(null)

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {pos && createPortal(
        <div
          className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-full"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="w-max rounded-md bg-[#18181b] shadow-lg" style={{ maxWidth, fontSize: 12, lineHeight: '14px', color: '#ADADAD', padding: 10 }}>
            {content}
          </div>
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#18181b]" />
        </div>,
        document.body,
      )}
    </div>
  )
}
