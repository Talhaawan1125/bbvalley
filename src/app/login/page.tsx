'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, User, Package, MapPin, Heart, LogOut } from 'lucide-react'

// ================================================
// LOGIN PAGE — src/app/login/page.tsx
// ================================================

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const set = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }))

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#C4622D] rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">BB</span>
            </div>
            <span className="font-display text-2xl font-semibold text-[#1C1C1E]">BB Valley</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          {/* Tabs */}
          <div className="flex bg-gray-50 rounded-lg p-1 mb-6">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all capitalize ${
                  mode === m
                    ? 'bg-white text-[#1C1C1E] shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Full Name</label>
                <input
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Ayesha Ahmed"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@email.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C4622D] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:border-[#C4622D] transition-colors"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <a href="#" className="text-xs text-[#C4622D] hover:underline">Forgot password?</a>
              </div>
            )}

            <button className="w-full bg-[#C4622D] hover:bg-[#A3501F] text-white py-3.5 text-sm font-bold rounded-sm transition-colors">
              {mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-[#C4622D] font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing you agree to our{' '}
          <Link href="/terms" className="text-[#C4622D] hover:underline">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-[#C4622D] hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}