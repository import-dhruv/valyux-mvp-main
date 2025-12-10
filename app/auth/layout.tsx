import type React from "react"

// Auth layout simplified for MVP - no authentication needed
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // For MVP: Auth pages are accessible but not functional
  // No Supabase check to avoid build-time errors

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
