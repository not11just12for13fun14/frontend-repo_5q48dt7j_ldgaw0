import { useState } from 'react'

export default function SellForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    seller_name: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description || undefined,
          price: parseFloat(form.price),
          category: form.category,
          seller_name: form.seller_name,
          image_url: form.image_url || undefined,
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create')
      onCreated()
      setForm({ title: '', description: '', price: '', category: '', seller_name: '', image_url: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl border border-slate-200 p-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Product title" className="input" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="input" required />
        <input name="seller_name" value={form.seller_name} onChange={handleChange} placeholder="Your name" className="input" required />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL (optional)" className="input sm:col-span-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input sm:col-span-2" rows={3} />
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button disabled={loading} className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 disabled:opacity-60">
        {loading ? 'Publishing...' : 'Publish product'}
      </button>
    </form>
  )
}
