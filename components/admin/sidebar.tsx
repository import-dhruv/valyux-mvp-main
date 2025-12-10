"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ShoppingBag, DollarSign, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const items = [
    { href: "/admin", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/products", label: "Products", icon: ShoppingBag },
    { href: "/admin/prices", label: "Prices", icon: DollarSign },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50">
      <div className="p-6">
        <h2 className="mb-8 font-bold text-slate-900">Admin Panel</h2>

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
      </div>
    </aside>
  )
}
