import { useState } from 'react'
import { clsx } from 'clsx'
import { Check } from 'lucide-react'
import { MaterialIcon } from './MaterialIcon'
import { iabCategories } from '../../data/categories'
import type { Category } from '../../data/categories'

interface CategoryTreeProps {
  categories?: Category[]
  selected: Set<string>
  onChange: (selected: Set<string>) => void
  placeholder?: string
}

export function CategoryTree({
  categories = iabCategories,
  selected,
  onChange,
  placeholder = 'Search..',
}: CategoryTreeProps) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleParent = (category: Category) => {
    const childIds = category.children?.map((c) => c.id) ?? []
    const next = new Set(selected)
    if (childIds.length > 0) {
      const allSelected = childIds.every((c) => next.has(c))
      if (allSelected) {
        childIds.forEach((c) => next.delete(c))
      } else {
        childIds.forEach((c) => next.add(c))
      }
    } else {
      if (next.has(category.id)) next.delete(category.id)
      else next.add(category.id)
    }
    onChange(next)
  }

  const toggleChild = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onChange(next)
  }

  const getParentState = (category: Category): 'none' | 'some' | 'all' => {
    if (!category.children?.length) return selected.has(category.id) ? 'all' : 'none'
    const count = category.children.filter((c) => selected.has(c.id)).length
    if (count === 0) return 'none'
    if (count === category.children.length) return 'all'
    return 'some'
  }

  const query = search.toLowerCase()
  const filtered = query
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.children?.some((ch) => ch.name.toLowerCase().includes(query)),
      )
    : categories

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-body placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="overflow-y-auto pr-1" style={{ maxHeight: 360 }}>
        {filtered.map((category) => {
          const state = getParentState(category)
          const isExpanded = expanded.has(category.id)
          return (
            <div key={category.id}>
              <div className="flex items-center gap-2 py-1.5">
                <button
                  type="button"
                  onClick={() => toggleExpand(category.id)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center text-muted"
                >
                  <MaterialIcon
                    name={isExpanded ? 'expand_more' : 'chevron_right'}
                    className="text-[18px]"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => toggleParent(category)}
                  className={clsx(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border transition-colors',
                    state === 'none'
                      ? 'border-border bg-white'
                      : 'border-primary bg-primary text-white',
                  )}
                  aria-label={category.name}
                >
                  {state === 'some' && (
                    <span className="block h-[2px] w-3 rounded-full bg-white" />
                  )}
                  {state === 'all' && (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  )}
                </button>
                <span
                  className="font-medium text-body"
                  style={{ fontSize: 16, lineHeight: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                >
                  {category.name}
                  {(() => {
                    const count = category.children?.filter((c) => selected.has(c.id)).length ?? 0
                    return count > 0 ? <span className="ml-1 font-normal text-muted">({count})</span> : null
                  })()}
                </span>
              </div>
              {isExpanded &&
                category.children?.map((child) => (
                  <div key={child.id} className="flex items-center gap-2 py-1.5 pl-14">
                    <button
                      type="button"
                      onClick={() => toggleChild(child.id)}
                      className={clsx(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border transition-colors',
                        selected.has(child.id)
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-white',
                      )}
                      aria-label={child.name}
                    >
                      {selected.has(child.id) && (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      )}
                    </button>
                    <span
                      className="font-medium text-body"
                      style={{ fontSize: 16, lineHeight: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                    >
                      {child.name}
                    </span>
                  </div>
                ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
