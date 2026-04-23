'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, MapPin, Heart, User, LogOut, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const MOCK_ORDERS = [
  { id: 'BBV-2024-10421', date: 'Jan 15, 2024', status: 'Delivered', total: 6500, items: 1, color: '#2D6A4F' },
  { id: 'BBV-2024-09833', date: 'Jan 8, 2024',  status: 'Processing', total: 12000, items: 2, color: '#C4622D' },
  { id: 'BBV-2024-08977', date: 'Dec 28, 2023', status: 'Delivered', total: 3800, items: 1, color: '#2D6A4F' },
]

export default function AccountPage() {
  const [tab, setTab] = useState<'orders' | 'addresses' | 'wishlist' | 'profile'>('orders')

  const tabs = [
    { key: 'orders',    label: 'My Orders',   icon: <Package size={16} /> },
    { key: 'addresses', label: 'Addresses',    icon: <MapPin size={16} /> },
    { key: 'wishlist',  label: 'Wishlist',     icon: <Heart size={16} /> },
    { key: 'profile',   label: 'Profile',      icon: <User size={16} /> },
  ] as const

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#1C1C1E] px-4 py-12">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#C4622D] flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#FAF7F2]">Ayesha Ahmed</h1>
            <p className="text-[#FAF7F2]/50 text-sm">ayesha@email.com · Member since 2024</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-[200px,1fr] gap-8">
        {/* Sidebar */}
        <aside>
          <nav className="space-y-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                  tab === t.key
                    ? 'bg-[#C4622D] text-white'
                    : 'text-gray-600 hover:bg-white hover:text-[#1C1C1E]'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 transition-colors text-left mt-4">
              <LogOut size={16} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main>
          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-6">My Orders</h2>
              {MOCK_ORDERS.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <Package size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No orders yet</p>
                  <Link href="/shop" className="mt-4 inline-block text-[#C4622D] text-sm font-semibold">Start Shopping →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="bg-white rounded-xl p-5 border border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-bold text-[#1C1C1E]">{order.id}</span>
                          <span
                            style={{ color: order.color, background: order.color + '18' }}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#1C1C1E]">{formatPrice(order.total)}</div>
                        <button className="text-xs text-[#C4622D] hover:underline mt-0.5 flex items-center gap-0.5">
                          View <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES */}
          {tab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-[#1C1C1E]">Saved Addresses</h2>
                <button className="text-sm text-[#C4622D] font-semibold">+ Add New</button>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-[#1C1C1E]">Home</span>
                      <span className="text-[10px] font-bold text-[#2D6A4F] bg-green-50 px-2 py-0.5 rounded-full">Default</span>
                    </div>
                    <p className="text-sm text-gray-500">Ayesha Ahmed</p>
                    <p className="text-sm text-gray-500">House 5, Street 3, F-7/2</p>
                    <p className="text-sm text-gray-500">Islamabad, ICT 44000</p>
                    <p className="text-sm text-gray-500">+92 300 0000000</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-xs text-[#C4622D] font-semibold hover:underline">Edit</button>
                    <button className="text-xs text-gray-400 font-semibold hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WISHLIST */}
          {tab === 'wishlist' && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-6">My Wishlist</h2>
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <Heart size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-4">Your wishlist is empty</p>
                <Link href="/shop" className="text-[#C4622D] text-sm font-semibold">Browse Products →</Link>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {tab === 'profile' && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-6">My Profile</h2>
              <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-4">
                {[
                  { label: 'Full Name', value: 'Ayesha Ahmed', type: 'text' },
                  { label: 'Email', value: 'ayesha@email.com', type: 'email' },
                  { label: 'Phone', value: '+92 300 0000000', type: 'tel' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      defaultValue={f.value}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                    />
                  </div>
                ))}
                <button className="bg-[#C4622D] hover:bg-[#A3501F] text-white px-6 py-3 text-sm font-bold rounded-sm transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}