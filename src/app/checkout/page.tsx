'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronRight, Truck, Shield, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

const PK_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
  'Hyderabad', 'Abbottabad', 'Murree', 'Swat', 'Bahawalpur',
  'Sargodha', 'Sukkur', 'Larkana', 'Sheikhupura', 'Rahim Yar Khan',
]

type Step = 'contact' | 'shipping' | 'payment'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('contact')
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '', phone: '',
    firstName: '', lastName: '',
    address: '', city: '', province: '', zip: '',
    notes: '',
  })

  const set = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }))

  const total = subtotal()
  const shipping = total >= 5000 ? 0 : 200
  const grandTotal = total + shipping

  const steps: { key: Step; label: string }[] = [
    { key: 'contact',  label: 'Contact' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment',  label: 'Payment' },
  ]
  const stepIndex = steps.findIndex(s => s.key === step)

  const placeOrder = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName:  `${form.firstName} ${form.lastName}`.trim(),
          customerEmail: form.email || null,
          customerPhone: form.phone,
          address:       form.address,
          city:          form.city,
          province:      form.province,
          zip:           form.zip,
          notes:         form.notes,
          items: items.map(i => ({
            productId:   i.productId,
            productName: i.productName,
            brandName:   i.brandName,
            size:        i.size,
            color:       i.color,
            price:       i.price,
            quantity:    i.quantity,
            total:       i.price * i.quantity,
          })),
          subtotal,
          shippingAmount: shipping,
          total:          grandTotal,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order')
      }

      setOrderNumber(data.orderNumber)
      setOrderPlaced(true)
      clearCart()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Order Confirmed ──────────────────────────────────────────────────────────
  if (orderPlaced) return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-up">
          <Check size={36} className="text-white" />
        </div>
        <h1 className="font-display text-4xl font-semibold text-[#1C1C1E] mb-3">Order Placed!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">
          Thank you! We&apos;ll confirm your order via WhatsApp/SMS shortly.
        </p>

        <div className="bg-white border border-gray-100 rounded-xl p-6 my-6 text-left space-y-3 shadow-sm">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Order Number</span>
            <span className="font-bold text-[#C4622D]">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Name</span>
            <span className="font-medium">{form.firstName} {form.lastName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Phone</span>
            <span className="font-medium">{form.phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">City</span>
            <span className="font-medium">{form.city}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Payment</span>
            <span className="font-medium text-[#2D6A4F]">Cash on Delivery</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
            <span className="font-bold">Total</span>
            <span className="font-bold text-lg">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          📦 Estimated delivery: 3–5 business days
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#C4622D] hover:bg-[#A3501F] text-white px-8 py-3.5 text-sm font-bold rounded-sm transition-colors"
          >
            Continue Shopping
          </Link>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 hover:border-[#25D366] text-[#1C1C1E] hover:text-[#25D366] px-6 py-3.5 text-sm font-semibold rounded-sm transition-colors"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  )

  // ── Empty Cart ───────────────────────────────────────────────────────────────
  if (items.length === 0) return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🛍️</div>
        <h2 className="font-display text-2xl mb-3">Your bag is empty</h2>
        <Link href="/shop" className="text-[#C4622D] font-semibold text-sm">
          Start Shopping →
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Top bar */}
      <div className="bg-[#1C1C1E] px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-[#FAF7F2]">
            BB Valley
          </Link>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  i <= stepIndex ? 'text-[#C4622D]' : 'text-white/30'
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i < stepIndex
                      ? 'bg-[#C4622D] text-white'
                      : i === stepIndex
                      ? 'border-2 border-[#C4622D] text-[#C4622D]'
                      : 'border border-white/20 text-white/30'
                  }`}>
                    {i < stepIndex ? <Check size={10} /> : i + 1}
                  </div>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight size={12} className="text-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr,380px] gap-8">
        {/* ── Form ── */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">

          {/* CONTACT */}
          {step === 'contact' && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  We&apos;ll send your order confirmation and delivery updates via SMS.
                </p>
              </div>
              <button
                onClick={() => { if (form.phone) setStep('shipping') }}
                disabled={!form.phone}
                className="mt-6 w-full bg-[#C4622D] hover:bg-[#A3501F] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 text-sm font-bold rounded-sm transition-colors"
              >
                Continue to Shipping →
              </button>
            </div>
          )}

          {/* SHIPPING */}
          {step === 'shipping' && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      First Name *
                    </label>
                    <input
                      value={form.firstName}
                      onChange={e => set('firstName', e.target.value)}
                      placeholder="Ayesha"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      value={form.lastName}
                      onChange={e => set('lastName', e.target.value)}
                      placeholder="Ahmed"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Street Address *
                  </label>
                  <input
                    value={form.address}
                    onChange={e => set('address', e.target.value)}
                    placeholder="House 5, Street 3, F-7/2"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      City *
                    </label>
                    <select
                      value={form.city}
                      onChange={e => set('city', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors bg-white"
                    >
                      <option value="">Select city</option>
                      {PK_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Zip Code
                    </label>
                    <input
                      value={form.zip}
                      onChange={e => set('zip', e.target.value)}
                      placeholder="44000"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Order Notes (optional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    placeholder="Any special instructions for delivery..."
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('contact')}
                  className="px-6 py-3.5 border border-gray-200 text-sm font-medium rounded-sm hover:border-gray-400 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => { if (form.firstName && form.city && form.address) setStep('payment') }}
                  disabled={!form.firstName || !form.city || !form.address}
                  className="flex-1 bg-[#C4622D] hover:bg-[#A3501F] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 text-sm font-bold rounded-sm transition-colors"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {step === 'payment' && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Payment Method</h2>

              {/* COD */}
              <div className="border-2 border-[#C4622D] rounded-xl p-4 bg-[#FFF8F5] mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#C4622D] flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C4622D]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#1C1C1E]">Cash on Delivery (COD)</div>
                    <div className="text-xs text-gray-500">Pay when your order arrives. Available across Pakistan.</div>
                  </div>
                  <span className="text-2xl">💵</span>
                </div>
              </div>

              {/* Coming soon */}
              <div className="border border-gray-100 rounded-xl p-4 opacity-40 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-400">Card Payment</div>
                    <div className="text-xs text-gray-400">Coming soon</div>
                  </div>
                  <span className="text-2xl ml-auto">💳</span>
                </div>
              </div>

              <div className="bg-[#F5F0E8] rounded-lg p-4 mb-5">
                <div className="flex gap-2">
                  <Shield size={16} className="text-[#C4622D] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Pay cash to our delivery rider when your items arrive. No advance payment required.
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                  ⚠️ {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('shipping')}
                  className="px-6 py-3.5 border border-gray-200 text-sm font-medium rounded-sm hover:border-gray-400 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="flex-1 bg-[#C4622D] hover:bg-[#A3501F] disabled:bg-[#C4622D]/70 text-white py-3.5 text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Truck size={16} />
                      Place Order — {formatPrice(grandTotal)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Order Summary ── */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-display text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.variantId} className="flex items-center gap-3">
                  <div
                    style={{ background: `linear-gradient(135deg, ${item.colorHex}44, ${item.colorHex}88)` }}
                    className="w-12 h-16 rounded-md flex items-center justify-center text-2xl flex-shrink-0"
                  >
                    {item.imageEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#C4622D] font-semibold uppercase tracking-wider">
                      {item.brandName}
                    </p>
                    <p className="text-[12px] text-[#1C1C1E] leading-snug truncate">
                      {item.productName}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className={shipping === 0 ? 'text-[#2D6A4F] font-semibold' : 'font-medium'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-gray-400">
                  Add {formatPrice(5000 - total)} more for free shipping
                </p>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F0E8] rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
            🔒 Your information is safe and secure. We never share your personal data.
          </div>
        </div>
      </div>
    </div>
  )
}