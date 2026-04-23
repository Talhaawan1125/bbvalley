'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Get In Touch</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-4">Contact Us</h1>
        <p className="text-[#FAF7F2]/55 text-sm max-w-md mx-auto">
          Have a question or need help? We&apos;re here for you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-6">How to Reach Us</h2>
          <div className="space-y-5">
            {[
              { icon: <MessageCircle size={20} />, label: 'WhatsApp', value: '+92 300 0000000', sub: 'Mon–Sat, 10am–8pm' },
              { icon: <Mail size={20} />, label: 'Email', value: 'hello@bluebunnyvalley.com', sub: 'Reply within 24 hours' },
              { icon: <Phone size={20} />, label: 'Phone', value: '+92 300 0000000', sub: 'Mon–Sat, 10am–6pm' },
              { icon: <MapPin size={20} />, label: 'Location', value: 'Lahore, Pakistan', sub: 'Online store only' },
            ].map(c => (
              <div key={c.label} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#F0D5C8] flex items-center justify-center text-[#C4622D] flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{c.label}</div>
                  <div className="text-sm font-semibold text-[#1C1C1E]">{c.value}</div>
                  <div className="text-xs text-gray-400">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white py-3.5 rounded-sm text-sm font-bold transition-colors"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-2">Message Sent!</h3>
              <p className="text-sm text-gray-400">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-6">Send a Message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ayesha Ahmed"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Subject</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors bg-white">
                    <option value="">Select a topic</option>
                    <option>Order Issue</option>
                    <option>Return / Exchange</option>
                    <option>Product Question</option>
                    <option>Delivery Update</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)}
                    placeholder="Tell us how we can help..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors resize-none" />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message}
                  className="w-full bg-[#C4622D] hover:bg-[#A3501F] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 text-sm font-bold rounded-sm transition-colors"
                >
                  Send Message →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}