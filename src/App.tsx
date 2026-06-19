import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Toggle } from './components/ui/Toggle'
import { Select } from './components/ui/Select'
import { MaterialIcon } from './components/ui/MaterialIcon'
import { Tooltip } from './components/ui/Tooltip'

// ─── Social media platform selector ──────────────────────────────────────────

const PLATFORMS = [
  { id: 'meta',        label: 'Meta',        icon: '/Name .Sub-Components/Meta.svg' },
  { id: 'google-ads',  label: 'Google Ads',  icon: '/Name .Sub-Components/Google Ads.svg' },
  { id: 'linkedin',    label: 'LinkedIn',    icon: '/Name .Sub-Components/LinkedIn.svg' },
  { id: 'tiktok',      label: 'TikTok',      icon: '/Name .Sub-Components/TikTok.svg' },
  { id: 'pinterest',   label: 'Pinterest',   icon: '/Name .Sub-Components/Pinterest.svg' },
  { id: 'reddit',      label: 'Reddit',      icon: '/Name .Sub-Components/Reddit.svg' },
  { id: 'snapchat',    label: 'Snapchat',    icon: '/Name .Sub-Components/Snapchat.svg' },
  { id: 'x',           label: 'X',           icon: '/Name .Sub-Components/X.svg' },
  { id: 'spotify',     label: 'Spotify',     icon: '/Name .Sub-Components/Spotify.svg' },
  { id: 'amazon',      label: 'Amazon',      icon: '/Name .Sub-Components/amazon-logo.svg' },
  { id: 'chatgpt',     label: 'ChatGPT',     icon: '/Name .Sub-Components/chatgpt-logo.svg' },
]

function PlatformSelector() {
  const [selected, setSelected] = useState(PLATFORMS[0])
  const [open, setOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const btnRef = useRef<HTMLButtonElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node) && !dropRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setDropdownStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, minWidth: rect.width, zIndex: 9999 })
    }
    setOpen(v => !v)
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-sm text-body hover:bg-page"
      >
        <img src={selected.icon} alt={selected.label} className="h-4 w-4 object-contain" />
        <MaterialIcon name="expand_more" className="text-[16px] text-label" />
      </button>

      {open && createPortal(
        <div
          ref={dropRef}
          style={dropdownStyle}
          className="overflow-hidden rounded-lg border border-border bg-white py-1 shadow-lg"
        >
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => { setSelected(p); setOpen(false) }}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-page ${
                selected.id === p.id ? 'bg-active-bg text-primary' : 'text-body'
              }`}
            >
              <img src={p.icon} alt={p.label} className="h-5 w-5 shrink-0 object-contain" />
              <span className="font-medium">{p.label}</span>
              {selected.id === p.id && <MaterialIcon name="check" className="ml-auto text-[16px] text-primary" />}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = 'facebook' | 'instagram' | 'threads' | 'partnership' | 'postboosting' | 'applications'

interface PageRow {
  id: string
  name: string
  pageId: string
  connected: boolean
  platform?: 'facebook' | 'instagram'
}

interface AppRow extends PageRow {
  trackByDefault: boolean
}

// ─── Data helpers ─────────────────────────────────────────────────────────────

const AD_ACCOUNTS = ['Account A', 'Account B', 'Account C']

const PAGE_CONN: Record<string, boolean[]> = {
  facebook:    [true,  false, true,  false],
  instagram:   [false, true,  true,  false, true],
  threads:     [true,  true,  false, true,  false, true],
  partnership: [false, true,  false, true,  true],
  postboosting:[true,  false, true,  true,  false],
}

const PARTNERSHIP_PLATFORMS: Array<'facebook' | 'instagram'> = [
  'facebook', 'facebook', 'instagram', 'facebook', 'instagram',
]

function makePages(count: number, key: string): PageRow[] {
  const states = PAGE_CONN[key] ?? []
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: 'Page_name',
    pageId: '8172221729384617',
    connected: states[i] ?? false,
    ...(key === 'partnership' ? { platform: PARTNERSHIP_PLATFORMS[i] } : {}),
  }))
}

function makeApps(): AppRow[] {
  const track = [true,  false, true,  true,  false, true,  false, true]
  const conn  = [false, true,  false, true,  true,  false, true,  false]
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    name: 'Page_name',
    pageId: '8172221729384617',
    connected: conn[i],
    trackByDefault: track[i],
  }))
}

// ─── SVG platform logos ───────────────────────────────────────────────────────

function FacebookLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function ThreadsLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.138 18.75H10.1327C7.47539 18.7325 5.43254 17.8715 4.05937 16.1915C2.83936 14.6952 2.20887 12.6145 2.1875 10.007V9.99475C2.20887 7.3855 2.83936 5.3065 4.06115 3.81025C5.43254 2.1285 7.47717 1.2675 10.1327 1.25H10.138H10.1434C12.1809 1.264 13.8853 1.7785 15.2086 2.7795C16.4536 3.721 17.3298 5.0615 17.8125 6.766L16.2986 7.18075C15.4793 4.29325 13.4062 2.818 10.1362 2.79525C7.97764 2.811 6.34443 3.47775 5.28294 4.77625C4.2909 5.9925 3.77796 7.7495 3.75837 10C3.77796 12.2505 4.2909 14.0075 5.28472 15.2238C6.34621 16.524 7.97942 17.1908 10.138 17.2048C12.0847 17.1908 13.3724 16.7445 14.4428 15.7138C15.6646 14.5378 15.6432 13.094 15.2514 12.2155C15.0216 11.6975 14.6031 11.267 14.0385 10.9398C13.896 11.925 13.5772 12.723 13.0856 13.325C12.4284 14.1283 11.497 14.5675 10.3179 14.6305C9.42562 14.6777 8.56538 14.4713 7.89927 14.046C7.11027 13.5438 6.64899 12.7773 6.59912 11.8848C6.55103 11.0168 6.90189 10.2187 7.58581 9.63775C8.23945 9.083 9.15846 8.7575 10.2449 8.69625C11.0446 8.6525 11.7944 8.6875 12.4854 8.7995C12.3928 8.25875 12.2076 7.82825 11.9297 7.5185C11.5486 7.0915 10.9591 6.8745 10.179 6.86925C10.1719 6.86925 10.1647 6.86925 10.1576 6.86925C9.5307 6.86925 8.67936 7.039 8.13793 7.83175L6.83421 6.9725C7.56088 5.912 8.73992 5.3275 10.1576 5.3275C10.1683 5.3275 10.179 5.3275 10.1897 5.3275C12.5602 5.3415 13.9726 6.76775 14.1133 9.25625C14.1934 9.2895 14.2736 9.3245 14.352 9.3595C15.458 9.8705 16.2666 10.644 16.6922 11.5977C17.2835 12.926 17.3387 15.0907 15.5435 16.818C14.1703 18.1375 12.505 18.7343 10.1434 18.75H10.138ZM10.8825 10.2258C10.7026 10.2258 10.521 10.231 10.3339 10.2415C8.97145 10.3167 8.1219 10.931 8.16999 11.8042C8.21986 12.7195 9.24751 13.1448 10.236 13.0923C11.1443 13.045 12.3269 12.6967 12.5264 10.3867C12.0241 10.28 11.4738 10.2258 10.8825 10.2258Z" />
    </svg>
  )
}

function PartnershipLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function ApplicationsLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

// ─── Thumbnail ────────────────────────────────────────────────────────────────

function CheckeredThumbnail() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rounded" aria-hidden>
      <rect width="36" height="36" fill="#e4e4e7" />
      <rect x="0"  y="0"  width="9" height="9" fill="#a1a1aa" />
      <rect x="18" y="0"  width="9" height="9" fill="#a1a1aa" />
      <rect x="9"  y="9"  width="9" height="9" fill="#a1a1aa" />
      <rect x="27" y="9"  width="9" height="9" fill="#a1a1aa" />
      <rect x="0"  y="18" width="9" height="9" fill="#a1a1aa" />
      <rect x="18" y="18" width="9" height="9" fill="#a1a1aa" />
      <rect x="9"  y="27" width="9" height="9" fill="#a1a1aa" />
      <rect x="27" y="27" width="9" height="9" fill="#a1a1aa" />
    </svg>
  )
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavBtn({ icon, label, active = false, badge }: { icon: string; label: string; active?: boolean; badge?: string }) {
  return (
    <Tooltip content={label}>
      <button
        type="button"
        aria-label={label}
        className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
          active ? 'bg-active-bg text-primary' : 'text-label hover:bg-page hover:text-body'
        }`}
      >
        <MaterialIcon name={icon} filled={active} className="text-[20px]" />
        {badge && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dc2626] px-0.5 text-[10px] font-semibold leading-none text-white">
            {badge}
          </span>
        )}
      </button>
    </Tooltip>
  )
}

// ─── Tab button ───────────────────────────────────────────────────────────────

function TabBtn({ label, logo, active = false, onClick }: { label: string; logo: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 pb-3 pt-2 text-[14px] font-medium leading-4 transition-colors ${
        active ? 'border-primary text-primary' : 'border-transparent text-[#292929] hover:text-body'
      }`}
    >
      {logo}
      {label}
    </button>
  )
}

// ─── Shared table cell ────────────────────────────────────────────────────────

function ColCell({ children, className = '', divided = false }: { children: React.ReactNode; className?: string; divided?: boolean }) {
  return (
    <div className={`flex items-center px-4 ${divided ? 'border-l border-border' : ''} ${className}`}>
      {children}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('facebook')
  const [adAccount, setAdAccount] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Callout visibility (reset on refresh)
  const [showWarningCallout, setShowWarningCallout] = useState(true)
  const [showThreadsCallout, setShowThreadsCallout] = useState(true)
  const [showInfoCallout,    setShowInfoCallout]    = useState(true)

  // Per-tab page state
  const [fbRows,   setFbRows]   = useState<PageRow[]>(makePages(4, 'facebook'))
  const [igRows,   setIgRows]   = useState<PageRow[]>(makePages(5, 'instagram'))
  const [thRows,   setThRows]   = useState<PageRow[]>(makePages(6, 'threads'))
  const [paRows,   setPaRows]   = useState<PageRow[]>(makePages(5, 'partnership'))
  const [partnerSubNav, setPartnerSubNav] = useState<'smartly' | 'facebook' | 'instagram'>('smartly')
  const [pbRows,   setPbRows]   = useState<PageRow[]>(makePages(5, 'postboosting'))
  const [appRows,  setAppRows]  = useState<AppRow[]>(makeApps())

  const switchTab = (tab: TabKey) => { setActiveTab(tab); setSearch('') }

  const togglePage = (setter: React.Dispatch<React.SetStateAction<PageRow[]>>, id: string, val: boolean) =>
    setter(prev => prev.map(r => r.id === id ? { ...r, connected: val } : r))

  const toggleApp = (id: string, field: 'connected' | 'trackByDefault', val: boolean) =>
    setAppRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r))

  const isApps = activeTab === 'applications'
  const isFb   = activeTab === 'facebook'

  const searchPlaceholder = isFb ? 'Search Page name or ID' : 'Search Account name or ID'

  const currentRows = activeTab === 'facebook'     ? fbRows
    : activeTab === 'instagram'    ? igRows
    : activeTab === 'threads'      ? thRows
    : activeTab === 'partnership'  ? paRows
    : activeTab === 'postboosting' ? pbRows
    : []

  const currentSetter = activeTab === 'facebook'     ? setFbRows
    : activeTab === 'instagram'    ? setIgRows
    : activeTab === 'threads'      ? setThRows
    : activeTab === 'partnership'  ? setPaRows
    : setPbRows

  const filteredRows = isApps
    ? appRows.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.pageId.includes(search))
    : currentRows.filter(r => {
        const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.pageId.includes(search)
        const matchesPlatform = activeTab !== 'partnership' || partnerSubNav === 'smartly' || r.platform === partnerSubNav
        return matchesSearch && matchesPlatform
      })

  return (
    <div className="flex h-full overflow-hidden bg-page">

      {/* ── Floating nav card ─────────────────────────────────────── */}
      <aside className="m-3 flex w-[68px] shrink-0 flex-col items-center rounded-2xl bg-card py-3">

        <div className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center">
          <img src="/favicon.svg" alt="Smartly" className="h-9 w-9 object-contain" />
        </div>

        <nav className="flex flex-col items-center gap-1">
          <NavBtn icon="home"      label="Home" />
          <NavBtn icon="bar_chart" label="Analytics" />
          <NavBtn icon="campaign"  label="Campaign assets" active />
          <NavBtn icon="ads_click" label="Audiences" />
          <NavBtn icon="settings"  label="Settings" />
        </nav>

        <div className="flex-1" />

        <div className="flex flex-col items-center gap-1">
          <NavBtn icon="search"        label="Search" />
          <NavBtn icon="notifications" label="Notifications" badge="2" />
          <NavBtn icon="help"          label="Help" />

          <div className="mt-1 flex flex-col items-center gap-0.5">
            <Tooltip content="Profile">
              <button type="button" aria-label="Profile" className="flex h-8 w-8 overflow-hidden rounded-full bg-[#c8a882] hover:opacity-90">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  <circle cx="16" cy="13" r="5.5" fill="#8B5C3E" />
                  <path d="M3 30c0-7.18 5.82-13 13-13s13 5.82 13 13" fill="#8B5C3E" />
                </svg>
              </button>
            </Tooltip>
            <span className="text-[10px] font-semibold text-label">ES</span>
          </div>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header bar — breadcrumb left, platform + account selectors right */}
        <div className="flex h-14 shrink-0 items-center justify-between px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-5">
            <MaterialIcon name="home" className="text-[#292929]" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
            <MaterialIcon name="chevron_right" className="text-[16px] text-muted" />
            <span className="text-[14px] font-medium leading-4 text-[#292929]">Campaign assets</span>
            <MaterialIcon name="chevron_right" className="text-[16px] text-muted" />
            <span className="text-[14px] font-medium leading-4 text-[#292929]">Pages &amp; Apps</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Platform selector */}
            <PlatformSelector />

            {/* Ad Account selector */}
            <div className="w-40">
              <Select
                options={AD_ACCOUNTS}
                value={adAccount}
                onChange={setAdAccount}
                placeholder="Ad Account"
              />
            </div>
          </div>
        </div>

        {/* Scrollable content — 24px horizontal padding */}
        <div className="flex-1 overflow-y-auto px-6 pb-10">

          {/* Page heading */}
          <div className="py-8">
          <h1
            className="text-[32px] font-medium text-body"
            style={{ fontFamily: 'var(--font-display)', lineHeight: '40px', letterSpacing: '-0.014em' }}
          >
            Pages &amp; Apps
          </h1>
            <p
              className="mt-4 font-normal text-label"
            style={{ fontSize: '18px', lineHeight: '20px', letterSpacing: '-0.008em' }}
          >
            Manage and promote your brand's presence directly in campaigns.
            </p>
          </div>

            {/* Platform tabs */}
          <div className="mt-6 border-b border-border">
            <nav className="-mb-px flex">
              <TabBtn label="Facebook Pages"                   logo={<FacebookLogo />}     active={activeTab === 'facebook'}     onClick={() => switchTab('facebook')} />
              <TabBtn label="Instagram Accounts"               logo={<InstagramLogo />}    active={activeTab === 'instagram'}    onClick={() => switchTab('instagram')} />
              <TabBtn label="Threads Accounts"                 logo={<ThreadsLogo />}      active={activeTab === 'threads'}      onClick={() => switchTab('threads')} />
              <TabBtn label="Partnership accounts"             logo={<PartnershipLogo />}  active={activeTab === 'partnership'}  onClick={() => switchTab('partnership')} />
              <TabBtn label="Post Boosting Instagram Accounts" logo={<InstagramLogo />}    active={activeTab === 'postboosting'} onClick={() => switchTab('postboosting')} />
              <TabBtn label="Applications"                     logo={<ApplicationsLogo />} active={activeTab === 'applications'} onClick={() => switchTab('applications')} />
            </nav>
          </div>

          {/* Callouts */}
          {(isFb || activeTab === 'instagram' || isApps || activeTab === 'threads' || activeTab === 'partnership') && (
            <div className="mt-6 flex flex-col gap-3">

              {/* Warning callout — FB, Instagram, Applications */}
              {(isFb || activeTab === 'instagram' || isApps) && showWarningCallout && (
                <div className="rounded-lg border-l-[3px] border-l-[#D97706] bg-[#FEF9C3] px-5 py-4">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <MaterialIcon name="warning" variant="outlined" className="mt-0.5 shrink-0 text-[#D97706]" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                      <p className="text-[14px] font-medium leading-5 text-[#525252]">
                        To connect or disconnect apps you must be the account authorizer:{' '}
                        <span className="font-semibold text-[#292929]">Giulia Collu (966925778863333)</span>.
                        {' '}Disconnecting an app from Smartly.io does not affect currently running campaigns that use that app, but editing those campaigns will not be possible.
                      </p>
                    </div>
                    <button type="button" onClick={() => setShowWarningCallout(false)} className="mt-0.5 shrink-0 text-label hover:text-body">
                      <MaterialIcon name="close" variant="outlined" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              )}

              {/* Threads-specific info callout */}
              {activeTab === 'threads' && showThreadsCallout && (
                <div className="rounded-lg border-l-[3px] border-l-[#2563EB] bg-[#DBEAFE] px-5 py-4">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <MaterialIcon name="info" variant="outlined" className="mt-0.5 shrink-0 text-[#2563EB]" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                      <p className="text-[14px] font-medium leading-5 text-[#525252]">
                        To see a Threads account below, the Threads account must be connected to an Instagram account that is connected to Smartly above.
                      </p>
                    </div>
                    <button type="button" onClick={() => setShowThreadsCallout(false)} className="mt-0.5 shrink-0 text-label hover:text-body">
                      <MaterialIcon name="close" variant="outlined" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              )}

              {/* "Not finding a page/app?" info callout — FB, Instagram, Threads, Applications */}
              {showInfoCallout && (
                <div className="rounded-lg border-l-[3px] border-l-[#2563EB] bg-[#DBEAFE] px-5 py-4">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <MaterialIcon name="info" variant="outlined" className="mt-0.5 shrink-0 text-[#2563EB]" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                      <div>
                        <p className="text-[16px] font-medium leading-5 text-[#2563EB]">
                          {isApps ? 'Not finding an app?' : 'Not finding a page?'}
                        </p>
                        <p className="mt-[10px] text-[14px] font-medium leading-5 text-[#525252]">
                          Make sure the account authorizer has at least Create Ads permission in Business Manager.
                          If you have the right permissions, check the Ads Manager to ensure that Smartly has access
                          to the relevant pages.{' '}
                          <button type="button" className="text-[#9138EA] underline underline-offset-2">
                            Learn more ↗
                          </button>
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setShowInfoCallout(false)} className="mt-0.5 shrink-0 text-label hover:text-body">
                      <MaterialIcon name="close" variant="outlined" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Partnership sub-navigation */}
          {activeTab === 'partnership' && (
            <div className="mt-6 flex w-fit items-center gap-[2px] rounded-xl bg-[#EDEDED] p-[4px]">
              {/* Smartly */}
              <button
                type="button"
                onClick={() => setPartnerSubNav('smartly')}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                  partnerSubNav === 'smartly'
                    ? 'bg-white text-body shadow-sm'
                    : 'text-[#737373] hover:text-body'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M5.66113 8.0255H1.31152V9.61848L10.3141 11.3886V8.0255H14.6889V6.4322L5.66113 4.61157V8.0255Z" fill="currentColor"/>
                </svg>
                Smartly
              </button>
              {/* Facebook */}
              <button
                type="button"
                onClick={() => setPartnerSubNav('facebook')}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                  partnerSubNav === 'facebook'
                    ? 'bg-white text-body shadow-sm'
                    : 'text-[#737373] hover:text-body'
                }`}
              >
                <FacebookLogo size={14} />
                Facebook
              </button>
              {/* Instagram */}
              <button
                type="button"
                onClick={() => setPartnerSubNav('instagram')}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                  partnerSubNav === 'instagram'
                    ? 'bg-white text-body shadow-sm'
                    : 'text-[#737373] hover:text-body'
                }`}
              >
                <InstagramLogo size={14} />
                Instagram
              </button>
            </div>
          )}

          {/* Filter row */}
          <div className="mt-6 flex items-center gap-4">
            <div className="relative w-64">
              <MaterialIcon name="search" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[16px] text-muted" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-8 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-[13px] text-body placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {activeTab === 'partnership' && (
              <button
                type="button"
                className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[13px] font-medium text-body hover:bg-page"
              >
                <MaterialIcon name="download" variant="outlined" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                Export
              </button>
            )}
          </div>

          {/* Table */}
          <div className="mt-3 overflow-hidden rounded-2xl border border-border">

            {/* ── Simple table (non-Applications tabs) ── */}
            {!isApps && (
              <>
                {/* Header */}
                <div className="flex bg-[#f5f5f5]">
                  <div className="flex-1 px-4 py-2.5 text-[13px] font-medium text-label">Page</div>
                  <div className="w-[140px] shrink-0 border-l border-border px-4 py-2.5 text-[13px] font-medium text-label">
                    Connected
                  </div>
                </div>

                {/* Rows */}
                {filteredRows.map((row, i) => (
                  <div key={row.id} className={`flex bg-card ${i !== filteredRows.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex flex-1 items-center gap-3 px-4 py-3.5">
                      {row.platform && partnerSubNav === 'smartly' && (
                        <div className="shrink-0">
                          {row.platform === 'facebook'
                            ? <span className="text-[#1877F2]"><FacebookLogo size={16} /></span>
                            : <img src="/Name .Sub-Components/instagram icon.svg" alt="Instagram" className="h-4 w-4 object-contain" />
                          }
                        </div>
                      )}
                      <CheckeredThumbnail />
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium leading-4 text-[#1A1A1A]">{row.name}</p>
                        <p className="mt-0.5 text-[12px] font-medium leading-4 text-[#525252]">ID: {row.pageId}</p>
                      </div>
                    </div>
                    <div className="flex w-[140px] shrink-0 items-center border-l border-border px-4 py-3.5">
                      <Toggle checked={row.connected} onChange={v => togglePage(currentSetter, row.id, v)} />
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ── Applications table ── */}
            {isApps && (
              <>
                {/* Header */}
                <div className="flex bg-[#f5f5f5]">
                  <div className="flex-1 px-4 py-2.5 text-[13px] font-medium text-label">Page</div>
                  <ColCell divided className="w-[140px] shrink-0 py-2.5 text-[13px] font-medium text-label">Overview</ColCell>
                  <ColCell divided className="w-[140px] shrink-0 py-2.5 text-[13px] font-medium text-label">Events</ColCell>
                  <ColCell divided className="w-[140px] shrink-0 py-2.5 text-[13px] font-medium text-label">Track by default</ColCell>
                  <ColCell divided className="w-[140px] shrink-0 py-2.5 text-[13px] font-medium text-label">Connected</ColCell>
                </div>

                {/* Rows */}
                {(filteredRows as AppRow[]).map((row, i) => (
                  <div key={row.id} className={`flex bg-card ${i !== filteredRows.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex flex-1 items-center gap-3 px-4 py-3.5">
                      <CheckeredThumbnail />
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium leading-4 text-[#1A1A1A]">{row.name}</p>
                        <p className="mt-0.5 text-[12px] font-medium leading-4 text-[#525252]">ID: {row.pageId}</p>
                      </div>
                    </div>
                    <ColCell divided className="w-[140px] shrink-0 py-3.5">
                      <button type="button" className="text-[13px] font-medium text-[#9138EA]">
                        App overview ↗
                      </button>
                    </ColCell>
                    <ColCell divided className="w-[140px] shrink-0 py-3.5">
                      <button type="button" className="text-[13px] font-medium text-[#9138EA]">
                        App Events ↗
                      </button>
                    </ColCell>
                    <ColCell divided className="w-[140px] shrink-0 py-3.5">
                      <Toggle checked={row.trackByDefault} onChange={v => toggleApp(row.id, 'trackByDefault', v)} />
                    </ColCell>
                    <ColCell divided className="w-[140px] shrink-0 py-3.5">
                      <Toggle checked={row.connected} onChange={v => toggleApp(row.id, 'connected', v)} />
                    </ColCell>
                  </div>
                ))}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
