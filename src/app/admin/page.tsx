// ================================================================
// FILE: src/app/admin/page.tsx
// HOW: src/app → folder "admin" → file "page.tsx" (replace all)
// PURPOSE: Admin dashboard — manage products & orders
// ================================================================

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS, BRANDS, CATEGORIES } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import {
  Package, ShoppingBag, Plus, Edit,
  Trash2, Eye, X, Check,
  BarChart2, TrendingUp, DollarSign,
} from 'lucide-react'

// ── Mock orders ───────────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  { id: 'BBV-2024-10421', customer: 'Ayesha Ahmed',  city: 'Lahore',     total: 6500,  items: 1, status: 'Delivered',  date: 'Jan 15, 2024', phone: '0300-0000001' },
  { id: 'BBV-2024-10420', customer: 'Sara Malik',    city: 'Karachi',    total: 12000, items: 2, status: 'Processing', date: 'Jan 14, 2024', phone: '0300-0000002' },
  { id: 'BBV-2024-10419', customer: 'Fatima Raza',   city: 'Islamabad',  total: 3800,  items: 1, status: 'Shipped',    date: 'Jan 13, 2024', phone: '0300-0000003' },
  { id: 'BBV-2024-10418', customer: 'Hina Javed',    city: 'Faisalabad', total: 45000, items: 1, status: 'Confirmed',  date: 'Jan 12, 2024', phone: '0300-0000004' },
  { id: 'BBV-2024-10417', customer: 'Nadia Khan',    city: 'Multan',     total: 5200,  items: 2, status: 'Delivered',  date: 'Jan 11, 2024', phone: '0300-0000005' },
  { id: 'BBV-2024-10416', customer: 'Sana Tariq',    city: 'Rawalpindi', total: 2950,  items: 1, status: 'Cancelled',  date: 'Jan 10, 2024', phone: '0300-0000006' },
]

type StatusKey = 'Delivered' | 'Processing' | 'Shipped' | 'Confirmed' | 'Cancelled'

function statusStyle(s: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    Delivered:  { bg: '#DCFCE7', color: '#166534' },
    Processing: { bg: '#FEF9C3', color: '#854D0E' },
    Shipped:    { bg: '#DBEAFE', color: '#1E40AF' },
    Confirmed:  { bg: '#F0D5C8', color: '#C4622D' },
    Cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
  }
  return map[s] || map['Confirmed']
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
      name: '', brand: 'Khaadi', brandSlug: 'khaadi',
      category: 'unstitched', emoji: '🌸',
      price: '', comparePrice: '',
      color: '', colorHex: '#C9A5A0',
      sizes: ['S', 'M', 'L'],
      badge: 'New', description: '', fabric: '',
      isNew: true, isFeatured: false, slug: '',
    }
  )
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const EMOJIS = ['🌸', '👔', '✨', '🌿', '🌺', '💎', '🌙', '🤍', '💐', '👗', '🧣', '🧵']

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-[500]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(680px,95vw)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl z-[501] shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-[#1C1C1E]">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Product Name *</label>
            <input
              value={form.name}
              onChange={e => {
                set('name', e.target.value)
                set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
              }}
              placeholder="e.g. Embroidered Lawn 3-Piece"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
            />
          </div>

          {/* Brand + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Brand *</label>
              <select
                value={form.brand}
                onChange={e => {
                  const b = BRANDS.find(br => br.name === e.target.value)
                  set('brand', e.target.value)
                  set('brandSlug', b?.slug || '')
                }}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] bg-white transition-colors"
              >
                {BRANDS.map(b => <option key={b.slug}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] bg-white transition-colors"
              >
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Price (PKR) *</label>
              <input
                type="number"
                value={form.price}
                onChange={e => set('price', +e.target.value)}
                placeholder="5000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Original Price (if on sale)</label>
              <input
                type="number"
                value={form.comparePrice || ''}
                onChange={e => set('comparePrice', e.target.value ? +e.target.value : null)}
                placeholder="6500"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
              />
            </div>
          </div>

          {/* Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Color Name</label>
              <input
                value={form.color}
                onChange={e => set('color', e.target.value)}
                placeholder="e.g. Dusty Rose"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.colorHex}
                  onChange={e => set('colorHex', e.target.value)}
                  className="w-12 h-[46px] rounded-lg border border-gray-200 cursor-pointer p-1"
                />
                <input
                  value={form.colorHex}
                  onChange={e => set('colorHex', e.target.value)}
                  placeholder="#C9A5A0"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Product Image Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => set('emoji', e)}
                  className={`w-10 h-10 text-2xl rounded-lg border-2 transition-all ${
                    form.emoji === e
                      ? 'border-[#C4622D] bg-[#F0D5C8]'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    const sizes = form.sizes.includes(size)
                      ? form.sizes.filter((s: string) => s !== size)
                      : [...form.sizes, size]
                    set('sizes', sizes)
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                    form.sizes.includes(size)
                      ? 'border-[#C4622D] bg-[#C4622D] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge</label>
            <div className="flex gap-2">
              {['New', 'Sale', 'Exclusive', ''].map(b => (
                <button
                  key={b || 'none'}
                  type="button"
                  onClick={() => set('badge', b)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded border transition-all ${
                    form.badge === b
                      ? 'border-[#C4622D] bg-[#C4622D] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {b || 'None'}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              placeholder="Describe the product..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors resize-none"
            />
          </div>

          {/* Fabric */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Fabric & Care</label>
            <textarea
              value={form.fabric}
              onChange={e => set('fabric', e.target.value)}
              rows={2}
              placeholder="e.g. Premium lawn fabric. Machine wash cold."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors resize-none"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6 flex-wrap">
            {[
              { key: 'isNew',      label: 'Mark as New Arrival' },
              { key: 'isFeatured', label: 'Feature on Homepage' },
            ].map(t => (
              <label key={t.key} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => set(t.key, !form[t.key])}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    form[t.key] ? 'bg-[#C4622D]' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      form[t.key] ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </div>
                <span className="text-sm text-[#1C1C1E]">{t.label}</span>
              </label>
            ))}
          </div>

          {/* Preview */}
          <div className="bg-[#FAF7F2] rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Preview</p>
            <div className="flex items-center gap-4">
              <div
                style={{ background: `linear-gradient(135deg, ${form.colorHex}44, ${form.colorHex}88)` }}
                className="w-16 h-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
              >
                {form.emoji}
              </div>
              <div>
                <p className="text-[10px] text-[#C4622D] uppercase tracking-wider font-bold">{form.brand}</p>
                <p className="text-sm font-medium text-[#1C1C1E]">{form.name || 'Product Name'}</p>
                <p className="text-sm font-bold mt-1">
                  {form.price ? formatPrice(+form.price) : 'PKR —'}
                  {form.comparePrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {formatPrice(+form.comparePrice)}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 text-sm font-medium rounded-sm hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.name || !form.price) {
                alert('Name and price are required')
                return
              }
              onSave({
                ...form,
                id: form.id || Date.now().toString(),
                slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              })
            }}
            className="flex-1 bg-[#C4622D] hover:bg-[#A3501F] text-white py-3 text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} />
            {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </>
  )
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard')
  const [products, setProducts] = useState(PRODUCTS)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<any>(null)
  const [orderStatus, setOrderStatus] = useState<Record<string, string>>(
    Object.fromEntries(MOCK_ORDERS.map(o => [o.id, o.status]))
  )

  const totalRevenue = MOCK_ORDERS
    .filter(o => o.status !== 'Cancelled')
    .reduce((s, o) => s + o.total, 0)
  const delivered = MOCK_ORDERS.filter(o => o.status === 'Delivered').length

  const handleSave = (product: any) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      return exists
        ? prev.map(p => p.id === product.id ? product : p)
        : [product, ...prev]
    })
    setShowModal(false)
    setEditProduct(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
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
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
        >
          <Eye size={14} /> View Store
        </Link>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-100 min-h-[calc(100vh-60px)] sticky top-[60px] p-4">
          <nav className="space-y-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={16} /> },
              { key: 'products',  label: 'Products',  icon: <Package size={16} /> },
              { key: 'orders',    label: 'Orders',    icon: <ShoppingBag size={16} /> },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setTab(item.key as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  tab === item.key
                    ? 'bg-[#C4622D] text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#1C1C1E]'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 min-w-0">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-[#1C1C1E] mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: <DollarSign size={20} />, color: '#C4622D' },
                  { label: 'Total Orders',  value: MOCK_ORDERS.length,       icon: <ShoppingBag size={20} />, color: '#1C3A5E' },
                  { label: 'Products Live', value: products.length,          icon: <Package size={20} />,     color: '#3D5A4C' },
                  { label: 'Delivered',     value: delivered,                icon: <TrendingUp size={20} />,  color: '#2D6A4F' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: s.color + '18', color: s.color }}
                    >
                      {s.icon}
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E]">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-[#1C1C1E]">Recent Orders</h2>
                  <button onClick={() => setTab('orders')} className="text-xs text-[#C4622D] font-semibold">
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {MOCK_ORDERS.slice(0, 4).map(order => {
                    const s = statusStyle(order.status)
                    return (
                      <div key={order.id} className="px-5 py-3.5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-[#1C1C1E]">{order.id}</div>
                          <div className="text-xs text-gray-400">{order.customer} · {order.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold mb-1">{formatPrice(order.total)}</div>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: s.bg, color: s.color }}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#1C1C1E]">Products</h1>
                  <p className="text-sm text-gray-400">{products.length} total</p>
                </div>
                <button
                  onClick={() => { setEditProduct(null); setShowModal(true) }}
                  className="flex items-center gap-2 bg-[#C4622D] hover:bg-[#A3501F] text-white px-4 py-2.5 text-sm font-bold rounded-sm transition-colors"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Product', 'Brand', 'Price', 'Badge', 'Actions'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div
                                style={{ background: `linear-gradient(135deg, ${p.colorHex}44, ${p.colorHex}88)` }}
                                className="w-10 h-12 rounded flex items-center justify-center text-xl flex-shrink-0"
                              >
                                {p.emoji}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-[#1C1C1E] line-clamp-1 max-w-[200px]">
                                  {p.name}
                                </div>
                                <div className="text-xs text-gray-400">{p.color}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-600">{p.brand}</td>
                          <td className="px-5 py-3.5">
                            <div className="text-sm font-bold text-[#1C1C1E]">{formatPrice(p.price)}</div>
                            {p.comparePrice && (
                              <div className="text-xs text-gray-400 line-through">{formatPrice(p.comparePrice)}</div>
                            )}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              p.badge === 'Sale'
                                ? 'bg-[#F0D5C8] text-[#C4622D]'
                                : p.badge === 'New'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {p.badge}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/products/${p.slug}`}
                                target="_blank"
                                className="w-7 h-7 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                <Eye size={13} className="text-gray-500" />
                              </Link>
                              <button
                                onClick={() => { setEditProduct(p); setShowModal(true) }}
                                className="w-7 h-7 rounded flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors"
                              >
                                <Edit size={13} className="text-blue-500" />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="w-7 h-7 rounded flex items-center justify-center bg-red-50 hover:bg-red-100 transition-colors"
                              >
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
            </div>
          )}

          {/* ── ORDERS ── */}
          {tab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#1C1C1E]">Orders</h1>
                  <p className="text-sm text-gray-400">{MOCK_ORDERS.length} total orders</p>
                </div>
              </div>

              <div className="space-y-3">
                {MOCK_ORDERS.map(order => {
                  const currentStatus = orderStatus[order.id]
                  const s = statusStyle(currentStatus)
                  return (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-sm font-bold text-[#1C1C1E]">{order.id}</span>
                            <span
                              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                              style={{ backgroundColor: s.bg, color: s.color }}
                            >
                              {currentStatus}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-500">
                            <div>
                              <span className="block text-gray-300 mb-0.5">Customer</span>
                              {order.customer}
                            </div>
                            <div>
                              <span className="block text-gray-300 mb-0.5">City</span>
                              {order.city}
                            </div>
                            <div>
                              <span className="block text-gray-300 mb-0.5">Phone</span>
                              {order.phone}
                            </div>
                            <div>
                              <span className="block text-gray-300 mb-0.5">Date</span>
                              {order.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-base font-bold text-[#1C1C1E] mb-2">
                            {formatPrice(order.total)}
                          </div>
                          <select
                            value={currentStatus}
                            onChange={e =>
                              setOrderStatus(prev => ({ ...prev, [order.id]: e.target.value }))
                            }
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#C4622D] bg-white cursor-pointer"
                          >
                            {['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(null) }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}