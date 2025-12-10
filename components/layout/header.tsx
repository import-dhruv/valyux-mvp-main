"use client"

import Link from "next/link"
import { Search, Menu, X, Heart, LogOut, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-8">
            <img
              src="/valyux-logo.png"
              alt="Valyux Logo"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline font-bold text-lg text-foreground">Valyux</span>
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <form
            action="/search"
            method="get"
            className="hidden md:flex flex-1 max-w-md mx-4"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const query = formData.get("q")?.toString() || ""
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query)}`)
              } else {
                router.push("/search")
              }
            }}
          >
            <div className="relative w-full">
              <input
                type="text"
                name="q"
                placeholder="Search products, flights, hotels..."
                className="w-full px-4 py-2 pl-10 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/electronics"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition"
            >
              Electronics
            </Link>
            <Link
              href="/clothing"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition"
            >
              Clothing
            </Link>
            <Link
              href="/flights"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition"
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition"
            >
              Hotels
            </Link>
          </nav>

          {/* Action Buttons - Simplified for MVP (no auth needed) */}
          <div className="flex items-center gap-2 ml-4">
            {/* Auth features disabled for MVP - comparison works without login */}
            <Link href="/comparison">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-2">
                <Heart className="w-4 h-4" />
                Compare
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-2">
            <Link href="/electronics" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Electronics
            </Link>
            <Link href="/clothing" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Clothing
            </Link>
            <Link href="/flights" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Flights
            </Link>
            <Link href="/hotels" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Hotels
            </Link>
            <Link href="/comparison" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Product Comparison
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
