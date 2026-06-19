import { X } from 'lucide-react'
import { Checkbox } from './Checkbox'
import { LinkButton } from './LinkButton'
import { Select } from './Select'

const periodOptions = ['Hours', 'Days', 'Weeks', 'Months'] as const
const targetOptions = ['User', 'Device', 'Household'] as const

export interface FrequencyCapRow {
  id: string
  maxShows: string
  timesIn: string
  period: string
  target: string
}

interface FrequencyCapControlProps {
  enabled: boolean
  onEnabledChange: (v: boolean) => void
  caps: FrequencyCapRow[]
  onCapsChange: (caps: FrequencyCapRow[]) => void
  showAddButton?: boolean
}

export function FrequencyCapControl({ enabled, onEnabledChange, caps, onCapsChange }: FrequencyCapControlProps) {
  const updateCap = (id: string, field: keyof FrequencyCapRow, value: string) =>
    onCapsChange(caps.map((c) => (c.id === id ? { ...c, [field]: value } : c)))

  const removeCap = (id: string) =>
    onCapsChange(caps.filter((c) => c.id !== id))

  const addCap = () =>
    onCapsChange([
      ...caps,
      { id: `cap-${Date.now()}`, maxShows: '1', timesIn: '1', period: 'Days', target: 'User' },
    ])

  return (
    <div>
      <Checkbox
        label="Limit the number of times a shopper can see this ad"
        checked={enabled}
        onChange={onEnabledChange}
      />

      {enabled && (
        <div className="mt-3 pl-6">
          <div className="flex flex-col gap-3">
            {caps.map((cap) => (
              <div key={cap.id} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2 text-sm text-body">
                  <span>Don't show this ad more than</span>
                  <input
                    type="number"
                    min={1}
                    value={cap.maxShows}
                    onChange={(e) => updateCap(cap.id, 'maxShows', e.target.value)}
                    className="h-8 w-16 rounded-lg border border-border bg-white px-2 text-center text-sm text-body focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-auto [&::-webkit-outer-spin-button]:appearance-auto"
                  />
                  <span>times in</span>
                  <input
                    type="number"
                    min={1}
                    value={cap.timesIn}
                    onChange={(e) => updateCap(cap.id, 'timesIn', e.target.value)}
                    className="h-8 w-16 rounded-lg border border-border bg-white px-2 text-center text-sm text-body focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-auto [&::-webkit-outer-spin-button]:appearance-auto"
                  />
                  <div className="w-32">
                    <Select
                      value={cap.period}
                      onChange={(v) => updateCap(cap.id, 'period', v)}
                      options={periodOptions}
                    />
                  </div>
                  <span>per</span>
                  <div className="w-32">
                    <Select
                      value={cap.target}
                      onChange={(v) => updateCap(cap.id, 'target', v)}
                      options={targetOptions}
                    />
                  </div>
                </div>

                {caps.length > 1 && (
                  <button
                    type="button"
                    aria-label="Remove frequency cap"
                    onClick={() => removeCap(cap.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-label hover:bg-page hover:text-body"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3">
            <LinkButton onClick={addCap}>+ Add frequency cap</LinkButton>
          </div>
        </div>
      )}
    </div>
  )
}
