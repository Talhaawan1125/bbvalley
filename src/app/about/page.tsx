'use client'
// ================================================
// src/app/about/page.tsx
// ================================================

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Our Story</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-4">About BB Valley</h1>
        <p className="text-[#FAF7F2]/55 text-sm max-w-lg mx-auto leading-relaxed">
          Pakistan&apos;s curated fashion destination — bringing the best of local brands to your doorstep.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Who We Are</p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1C1E] mb-4">Born in Pakistan, Built for Pakistan</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              BB Valley was created with a simple idea — Pakistani women and men deserve a single destination
              to discover and shop the best local fashion brands without hunting across multiple websites.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We hand-pick products from 7 of Pakistan&apos;s most trusted brands including Khaadi, J., Sana Safinaz,
              Limelight, Gul Ahmed, Maria B, and Alkaram — and deliver them straight to your door.
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #C4622D22, #C4622D44)' }}
            className="rounded-2xl p-10 flex items-center justify-center text-8xl">
            🌸
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: '7', label: 'Premium Brands' },
            { num: '100+', label: 'Products' },
            { num: 'COD', label: 'Payment' },
            { num: '3-5', label: 'Days Delivery' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="font-display text-4xl font-semibold text-[#C4622D] mb-1">{s.num}</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Our Values</p>
          <h2 className="font-display text-3xl font-semibold text-[#1C1C1E] mb-8">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { emoji: '🤝', title: 'Trust', desc: 'We only stock authentic products directly from official brand partners. No counterfeits, ever.' },
              { emoji: '🚀', title: 'Speed', desc: 'Fast dispatch, reliable delivery partners, and real-time order tracking across Pakistan.' },
              { emoji: '💎', title: 'Quality', desc: 'Every product on BB Valley is personally reviewed for quality before it goes live.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-display text-xl font-semibold text-[#1C1C1E] mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1C1C1E] rounded-2xl p-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-[#FAF7F2] mb-3">Start Shopping</h2>
          <p className="text-[#FAF7F2]/50 text-sm mb-6">Discover Pakistan&apos;s finest fashion brands today.</p>
          <Link href="/shop" className="inline-block bg-[#C4622D] hover:bg-[#A3501F] text-white px-8 py-3.5 text-sm font-bold rounded-sm transition-colors">
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  )
}