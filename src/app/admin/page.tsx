'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BRANDS, CATEGORIES } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import {
  Package, ShoppingBag, Plus, Edit,
  Trash2, Eye, X, Check, Lock,
  BarChart2, TrendingUp, DollarSign,
  RefreshCw, Loader2,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  address: string
  city: string
  total: number
  status: string
  payment_method: string
  items: any[]
  created_at: string
}

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  brand_slug: string
  category: string
  emoji: string
  price: number
  compare_price: number | null
  color: string
  color_hex: string
  sizes: string[]
  badge: string
  description: string
  fabric: string
  is_new: boolean
  is_featured: boolean
  is_active: boolean
}

// ── Status helper ─────────────────────────────────────────────────────────────
function statusStyle(s: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    Delivered:  { bg: '#DCFCE7', color: '#166534' },
    Processing: { bg: '#FEF9C3', color: '#854D0E' },
    Shipped:    { bg: '#DBEAFE', color: '#1E40AF' },
    confirmed:  { bg: '#F0D5C8', color: '#C4622D' },
    Confirmed:  { bg: '#F0D5C8', color: '#C4622D' },
    Cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
    cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
  }
  return map[s] || { bg: '#F0D5C8', color: '#C4622D' }
}

// ── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)

  const ADMIN_PASSWORD = 'bbvalley2024' // Change this to your own password

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('bbv-admin', 'true')
      onUnlock()
    } else {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1C1C1E] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-[#1C1C1E]">Admin Access</h1>
          <p className="text-sm text-gray-400 mt-1">BB Valley Store Management</p>
        </div>

        <div className={`bg-white rounded-2xl p-8 border shadow-sm transition-all ${error ? 'border-red-300 shake' : 'border-gray-100'}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter password"
                  autoFocus
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors pr-10 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#C4622D]'
                  }`}
                />
                <button
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">Incorrect password. Try again.</p>}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#1C1C1E] hover:bg-[#C4622D] text-white py-3 text-sm font-bold rounded-sm transition-colors"
            >
              Enter Admin Panel →
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          <Link href="/" className="hover:text-[#C4622D] transition-colors">← Back to Store</Link>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .shake { animation: shake 0.3s ease; }
      `}</style>
    </div>
  )
}

// ── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: any
  onClose: () => void
  onSave: (p: any) => void
}) {
  const [form, setForm] = useState(
    product || {
      name: '', brand: 'Khaadi', brand_slug: 'khaadi',
      category: 'unstitched', emoji: '🌸',
      price: '', compare_price: '',
      color: '', color_hex: '#C9A5A0',
      sizes: ['S', 'M', 'L'],
      badge: 'New', description: '', fabric: '',
      is_new: true, is_featured: false, is_active: true, slug: '',
    }
  )
  const [saving, setSaving] = useState(false)
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))
  const EMOJIS = ['🌸', '👔', '✨', '🌿', '🌺', '💎', '🌙', '🤍', '💐', '👗', '🧣', '🧵']

  const handleSave = async () => {
    if (!form.name || !form.price) { alert('Name and price are required'); return }
    setSaving(true)
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const productData = { ...form, slug, price: +form.price, compare_price: form.compare_price ? +form.compare_price : null }
    try {
      const url = product?.id ? `/api/admin/products?id=${product.id}` : '/api/admin/products'
      const method = product?.id ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })
      if (res.ok) {
        const data = await res.json()
        onSave(data.product)
      } else {
        alert('Failed to save product')
      }
    } catch {
      alert('Error saving product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-[500]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(680px,95vw)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl z-[501] shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-[#1C1C1E]">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Product Name *</label>
            <input value={form.name} onChange={e => { set('name', e.target.value); set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }}
              placeholder="e.g. Embroidered Lawn 3-Piece"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Brand *</label>
              <select value={form.brand} onChange={e => { const b = BRANDS.find(br => br.name === e.target.value); set('brand', e.target.value); set('brand_slug', b?.slug || '') }}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] bg-white">
                {BRANDS.map(b => <option key={b.slug}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] bg-white">
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Price (PKR) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="5000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Original Price (if sale)</label>
              <input type="number" value={form.compare_price || ''} onChange={e => set('compare_price', e.target.value || null)} placeholder="6500"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Color Name</label>
              <input value={form.color} onChange={e => set('color', e.target.value)} placeholder="e.g. Dusty Rose"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Color</label>
              <div className="flex gap-2">
                <input type="color" value={form.color_hex} onChange={e => set('color_hex', e.target.value)} className="w-12 h-[46px] rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input value={form.color_hex} onChange={e => set('color_hex', e.target.value)} placeholder="#C9A5A0"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Product Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map(e => (
                <button key={e} type="button" onClick={() => set('emoji', e)}
                  className={`w-10 h-10 text-2xl rounded-lg border-2 transition-all ${form.emoji === e ? 'border-[#C4622D] bg-[#F0D5C8]' : 'border-gray-100 hover:border-gray-300'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {['XS','S','M','L','XL','XXL','Free Size'].map(size => (
                <button key={size} type="button"
                  onClick={() => set('sizes', form.sizes.includes(size) ? form.sizes.filter((s: string) => s !== size) : [...form.sizes, size])}
                  className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${form.sizes.includes(size) ? 'border-[#C4622D] bg-[#C4622D] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge</label>
            <div className="flex gap-2">
              {['New','Sale','Exclusive',''].map(b => (
                <button key={b||'none'} type="button" onClick={() => set('badge', b)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded border transition-all ${form.badge === b ? 'border-[#C4622D] bg-[#C4622D] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                  {b || 'None'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe the product..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Fabric & Care</label>
            <textarea value={form.fabric} onChange={e => set('fabric', e.target.value)} rows={2} placeholder="e.g. Premium lawn fabric. Machine wash cold."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors resize-none" />
          </div>
          <div className="flex gap-6 flex-wrap">
            {[{ key: 'is_new', label: 'New Arrival' }, { key: 'is_featured', label: 'Featured on Homepage' }, { key: 'is_active', label: 'Active (visible)' }].map(t => (
              <label key={t.key} className="flex items-center gap-2.5 cursor-pointer">
                <div onClick={() => set(t.key, !form[t.key])}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${form[t.key] ? 'bg-[#C4622D]' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form[t.key] ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
                <span className="text-sm text-[#1C1C1E]">{t.label}</span>
              </label>
            ))}
          </div>
          {/* Preview */}
          <div className="bg-[#FAF7F2] rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Preview</p>
            <div className="flex items-center gap-4">
              <div style={{ background: `linear-gradient(135deg, ${form.color_hex}44, ${form.color_hex}88)` }}
                className="w-16 h-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {form.emoji}
              </div>
              <div>
                <p className="text-[10px] text-[#C4622D] uppercase tracking-wider font-bold">{form.brand}</p>
                <p className="text-sm font-medium text-[#1C1C1E]">{form.name || 'Product Name'}</p>
                <p className="text-sm font-bold mt-1">
                  {form.price ? formatPrice(+form.price) : 'PKR —'}
                  {form.compare_price && <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(+form.compare_price)}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-gray-200 text-sm font-medium rounded-sm hover:border-gray-400 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 bg-[#C4622D] hover:bg-[#A3501F] disabled:bg-[#C4622D]/70 text-white py-3 text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2">
            {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : <><Check size={16} />{product ? 'Save Changes' : 'Add Product'}</>}
          </button>
        </div>
      </div>
    </>
  )
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [tab, setTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard')
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<any>(null)

  // Check session
  useEffect(() => {
    if (sessionStorage.getItem('bbv-admin') === 'true') setUnlocked(true)
  }, [])

  // Load orders
  const loadOrders = async () => {
    setLoadingOrders(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      if (data.orders) setOrders(data.orders)
    } catch (err) {
      console.error('Failed to load orders:', err)
    } finally {
      setLoadingOrders(false)
    }
  }

  // Load products
  const loadProducts = async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      if (data.products) setProducts(data.products)
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    if (unlocked) {
      loadOrders()
      loadProducts()
    }
  }, [unlocked])

  const updateOrderStatus = async (orderId: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    })
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    setProducts(prev => prev.filter(p => p.id !== id))
    await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
  }

  const totalRevenue = orders.filter(o => o.status !== 'cancelled' && o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0)
  const delivered = orders.filter(o => o.status === 'Delivered' || o.status === 'delivered').length

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1C1C1E] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C4622D] rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">BB</span>
          </div>
          <div>
            <div className="text-sm font-bold">BB Valley Admin</div>
            <div className="text-[10px] text-white/40">Store Management</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { loadOrders(); loadProducts() }}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
            <RefreshCw size={13} /> Refresh
          </button>
          <Link href="/" target="_blank" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
            <Eye size={14} /> View Store
          </Link>
          <button onClick={() => { sessionStorage.removeItem('bbv-admin'); setUnlocked(false) }}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors">
            <Lock size={13} /> Lock
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-100 min-h-[calc(100vh-60px)] sticky top-[60px] p-4">
          <nav className="space-y-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={16} /> },
              { key: 'products',  label: `Products (${products.length})`, icon: <Package size={16} /> },
              { key: 'orders',    label: `Orders (${orders.length})`, icon: <ShoppingBag size={16} /> },
            ].map(item => (
              <button key={item.key} onClick={() => setTab(item.key as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  tab === item.key ? 'bg-[#C4622D] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#1C1C1E]'
                }`}>
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 min-w-0">

          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1C1C1E] mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: <DollarSign size={20} />, color: '#C4622D' },
                  { label: 'Total Orders',  value: orders.length,            icon: <ShoppingBag size={20} />, color: '#1C3A5E' },
                  { label: 'Products Live', value: products.filter(p => p.is_active).length, icon: <Package size={20} />, color: '#3D5A4C' },
                  { label: 'Delivered',     value: delivered,                icon: <TrendingUp size={20} />, color: '#2D6A4F' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: s.color + '18', color: s.color }}>
                      {s.icon}
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E]">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-[#1C1C1E]">Recent Orders</h2>
                  <button onClick={() => setTab('orders')} className="text-xs text-[#C4622D] font-semibold">View All →</button>
                </div>
                {loadingOrders ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 size={24} className="animate-spin text-[#C4622D]" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-10 text-sm text-gray-400">No orders yet</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {orders.slice(0, 5).map(order => {
                      const s = statusStyle(order.status)
                      return (
                        <div key={order.id} className="px-5 py-3.5 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-[#1C1C1E]">{order.order_number}</div>
                            <div className="text-xs text-gray-400">{order.customer_name} · {order.city}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold mb-1">{formatPrice(order.total)}</div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                              style={{ backgroundColor: s.bg, color: s.color }}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#1C1C1E]">Products</h1>
                  <p className="text-sm text-gray-400">{products.length} total in database</p>
                </div>
                <button onClick={() => { setEditProduct(null); setShowModal(true) }}
                  className="flex items-center gap-2 bg-[#C4622D] hover:bg-[#A3501F] text-white px-4 py-2.5 text-sm font-bold rounded-sm transition-colors">
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {loadingProducts ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={32} className="animate-spin text-[#C4622D]" />
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {['Product', 'Brand', 'Price', 'Badge', 'Status', 'Actions'].map(h => (
                            <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div style={{ background: `linear-gradient(135deg, ${p.color_hex}44, ${p.color_hex}88)` }}
                                  className="w-10 h-12 rounded flex items-center justify-center text-xl flex-shrink-0">
                                  {p.emoji}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-[#1C1C1E] line-clamp-1 max-w-[180px]">{p.name}</div>
                                  <div className="text-xs text-gray-400">{p.color}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-sm text-gray-600">{p.brand}</td>
                            <td className="px-5 py-3.5">
                              <div className="text-sm font-bold text-[#1C1C1E]">{formatPrice(p.price)}</div>
                              {p.compare_price && <div className="text-xs text-gray-400 line-through">{formatPrice(p.compare_price)}</div>}
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                p.badge === 'Sale' ? 'bg-[#F0D5C8] text-[#C4622D]' :
                                p.badge === 'New' ? 'bg-green-100 text-green-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>{p.badge}</span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {p.is_active ? 'Active' : 'Hidden'}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <Link href={`/products/${p.slug}`} target="_blank"
                                  className="w-7 h-7 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                                  <Eye size={13} className="text-gray-500" />
                                </Link>
                                <button onClick={() => { setEditProduct(p); setShowModal(true) }}
                                  className="w-7 h-7 rounded flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors">
                                  <Edit size={13} className="text-blue-500" />
                                </button>
                                <button onClick={() => handleDeleteProduct(p.id)}
                                  className="w-7 h-7 rounded flex items-center justify-center bg-red-50 hover:bg-red-100 transition-colors">
                                  <Trash2 size={13} className="text-red-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#1C1C1E]">Orders</h1>
                  <p className="text-sm text-gray-400">{orders.length} total real orders</p>
                </div>
                <button onClick={loadOrders} disabled={loadingOrders}
                  className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium rounded-sm hover:border-[#C4622D] transition-colors">
                  <RefreshCw size={14} className={loadingOrders ? 'animate-spin' : ''} /> Refresh
                </button>
              </div>

              {loadingOrders ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={32} className="animate-spin text-[#C4622D]" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                  <ShoppingBag size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => {
                    const s = statusStyle(order.status)
                    return (
                      <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="text-sm font-bold text-[#1C1C1E]">{order.order_number}</span>
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize"
                                style={{ backgroundColor: s.bg, color: s.color }}>
                                {order.status}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {new Date(order.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-500">
                              <div><span className="block text-gray-300 mb-0.5">Customer</span>{order.customer_name}</div>
                              <div><span className="block text-gray-300 mb-0.5">City</span>{order.city}</div>
                              <div><span className="block text-gray-300 mb-0.5">Phone</span>{order.customer_phone}</div>
                              <div><span className="block text-gray-300 mb-0.5">Items</span>{Array.isArray(order.items) ? order.items.length : 0} item(s)</div>
                            </div>
                            {order.address && (
                              <p className="text-xs text-gray-400 mt-2 truncate">📍 {order.address}, {order.city}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-base font-bold text-[#1C1C1E] mb-2">{formatPrice(order.total)}</div>
                            <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#C4622D] bg-white cursor-pointer">
                              {['confirmed','Processing','Shipped','Delivered','Cancelled'].map(s => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(null) }}
          onSave={(p) => { setProducts(prev => { const exists = prev.find(x => x.id === p.id); return exists ? prev.map(x => x.id === p.id ? p : x) : [p, ...prev] }); setShowModal(false); setEditProduct(null) }}
        />
      )}
    </div>
  )
}