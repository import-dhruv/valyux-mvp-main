import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("retailers").select("id, name, website, logo_url").order("name")

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching retailers:", error)
    return NextResponse.json({ error: "Failed to fetch retailers" }, { status: 500 })
  }
}
