// Supabase client - disabled for MVP (no database needed)
// Only used if Supabase credentials are provided
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase credentials are not provided, return null
  // This allows the app to work without Supabase
  if (!url || !key) {
    return null as any
  }

  return createBrowserClient(url, key)
}
