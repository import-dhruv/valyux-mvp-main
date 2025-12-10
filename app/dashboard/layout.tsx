// Dashboard layout - auth disabled for MVP
import type React from "react"
import { Header } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // For MVP, no auth check needed - all features are public
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
