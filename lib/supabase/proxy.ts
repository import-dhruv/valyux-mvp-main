// Supabase proxy - disabled for MVP (no database/auth needed)
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // For MVP, we don't need auth sessions
  // Just pass through all requests without checking auth
  return NextResponse.next({
    request,
  })
}
