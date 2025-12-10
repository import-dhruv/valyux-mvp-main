"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Settings, LogOut, Home } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/profile", label: "Profile", icon: Settings },
    { href: "/dashboard/favorites", label: "Saved Products", icon: Heart },
  ]

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="font-semibold text-slate-900">Hello, {user?.email?.split("@")[0]}</h2>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 border-t border-slate-200 pt-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
