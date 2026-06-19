import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { Card } from './Card'
import { MaterialIcon } from './MaterialIcon'

interface SectionCardProps {
  icon: string
  iconElement?: ReactNode
  title: string
  subtitle?: string
  action?: ReactNode
  children?: ReactNode
  className?: string
  bodyClassName?: string
}

export function SectionCard({
  icon,
  iconElement,
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
}: SectionCardProps) {
  const hasBody = Boolean(children)

  return (
    <Card
      className={clsx(
        'box-border w-[640px] min-w-[640px] max-w-[640px] shrink-0 rounded-2xl',
        className,
      )}
    >
      <div
        className={clsx(
          'flex items-center gap-3 px-6',
          subtitle ? 'h-[90px]' : 'h-[72px]',
        )}
      >
        {iconElement ?? <MaterialIcon name={icon} className="text-[24px] text-body" />}

        <div className="min-w-0 flex-1">
          <h2 className="text-[18px] font-medium leading-tight text-body" style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm leading-snug text-muted">{subtitle}</p>
          )}
        </div>

        {action}
      </div>

      {hasBody && (
        <>
          <div className="border-b border-border" aria-hidden />
          <div className={clsx('flex flex-col', bodyClassName ?? 'gap-5 py-5 pr-6 pl-[60px]')}>{children}</div>
        </>
      )}
    </Card>
  )
}
