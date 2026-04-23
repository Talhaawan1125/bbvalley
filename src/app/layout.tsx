import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | BB Valley',
    default: 'BB Valley — Premium Pakistani Fashion',
  },
  description: 'Shop Khaadi, J., Sana Safinaz, Limelight, Gul Ahmed, Maria B, Alkaram — all in one place. Fast delivery across Pakistan.',
  metadataBase: new URL('https://bluebunnyvalley.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
        {children}
      </body>
    </html>
  )
}