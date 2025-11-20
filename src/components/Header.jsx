import { ShoppingCart, Store, Package } from 'lucide-react'

export default function Header({ currentTab, setCurrentTab, cartCount }) {
  const tabs = [
    { id: 'browse', label: 'Browse', icon: Package },
    { id: 'sell', label: 'Sell', icon: Store },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
  ]

  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 shadow-inner" />
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Bazario</h1>
            <p className="text-xs text-slate-500 -mt-1">Buy • Sell • Delight</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {tabs.map(t => {
            const Icon = t.icon
            const active = currentTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTab(t.id)}
                className={`${active ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'} relative flex items-center gap-2 py-2 px-3 rounded-lg border border-slate-200 transition`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{t.label}</span>
                {t.id === 'orders' && cartCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center text-xs bg-rose-500 text-white rounded-full w-5 h-5">{cartCount}</span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
