import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import SellForm from './components/SellForm'
import OrderDrawer from './components/OrderDrawer'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [currentTab, setCurrentTab] = useState('browse')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/products`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to load')
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleAddToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === p._id)
      if (existing) return prev.map(i => i._id === p._id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
    setCurrentTab('orders')
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return
    const items = cart.map(c => ({ product_id: c._id, quantity: c.qty }))
    const order = {
      buyer_name: 'Guest',
      shipping_address: 'To be provided',
      items
    }
    try {
      const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Order failed')
      setCart([])
      alert('Order placed!')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} cartCount={cart.length} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentTab === 'browse' && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">Discover products</h2>
                <p className="text-slate-500 text-sm">Fresh picks from independent sellers</p>
              </div>
              <button onClick={fetchProducts} className="text-sm px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50">Refresh</button>
            </div>
            {loading ? (
              <p className="text-slate-600">Loading...</p>
            ) : error ? (
              <p className="text-rose-600">{error}</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(p => (
                  <ProductCard key={p._id} product={p} onAdd={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentTab === 'sell' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Sell a product</h2>
              <SellForm onCreated={fetchProducts} />
              <p className="text-xs text-slate-500 mt-3">Share clear details and a nice image to attract buyers.</p>
            </div>
            <div>
              <OrderDrawer cart={cart} onCheckout={handleCheckout} />
            </div>
          </div>
        )}

        {currentTab === 'orders' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Your bag</h2>
              {cart.length === 0 ? (
                <p className="text-slate-600">Your cart is empty. Explore products to add items.</p>
              ) : (
                <div className="grid gap-4">
                  {cart.map((p) => (
                    <div key={p._id} className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4">
                      <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden">
                        {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : null}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{p.title}</p>
                        <p className="text-sm text-slate-500">{p.qty} × ${p.price.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">${(p.price * p.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <OrderDrawer cart={cart} onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
