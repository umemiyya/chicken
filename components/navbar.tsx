'use client'

import Link from 'next/link'
import { Bird } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <Bird className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">AyamAI</span>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors text-sm">
              Beranda
            </Link>
            <Link href="/deteksi" className="text-foreground hover:text-primary transition-colors text-sm">
              Deteksi Ayam
            </Link>
            <Link href="/informasi" className="text-foreground hover:text-primary transition-colors text-sm">
              Informasi
            </Link>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors text-sm">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
