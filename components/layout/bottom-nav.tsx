"use client"

import Link from "next/link"
import { Home, SearchIcon, ShoppingCart, Heart, User } from "lucide-react"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card border-t border-border">
      <div className="flex justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-16 gap-1 transition ${
            isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          href="/search"
          className={`flex flex-col items-center justify-center w-full h-16 gap-1 transition ${
            isActive("/search") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SearchIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Search</span>
        </Link>
        <Link
          href="/comparison"
          className={`flex flex-col items-center justify-center w-full h-16 gap-1 transition ${
            isActive("/comparison") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs font-medium">Compare</span>
        </Link>
        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center w-full h-16 gap-1 transition ${
            isActive("/saved") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs font-medium">Saved</span>
        </Link>
        <Link
          href="/account"
          className={`flex flex-col items-center justify-center w-full h-16 gap-1 transition ${
            isActive("/account") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Account</span>
        </Link>
      </div>
    </nav>
  )
}
