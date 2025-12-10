// Proxy disabled for MVP - no Supabase auth needed
// This file is kept for reference but not actively used
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest): Promise<NextResponse> {
  // For MVP, just pass through without auth checking
  // Return a pass-through response
  return NextResponse.next()
}

export const config = {
  // Disabled matcher - this middleware is not active for MVP
  matcher: [],
}
