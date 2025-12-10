// Admin layout - auth disabled for MVP
import type React from "react"
import { Header } from "@/components/layout/header"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // For MVP, no auth check needed - admin features accessible (or can be disabled)
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
