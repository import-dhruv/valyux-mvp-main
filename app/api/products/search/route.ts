import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")
    const category = searchParams.get("category")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 50)

    if (!query) {
      return NextResponse.json({ data: [] })
    }

    const supabase = await createClient()

    let queryBuilder = supabase
      .from("products")
      .select("id, name, brand, image_url, base_price, category")
      .ilike("name", `%${query}%`)
      .order("rating", { ascending: false })
      .limit(limit)

    if (category) {
      queryBuilder = queryBuilder.eq("category", category)
    }

    const { data, error } = await queryBuilder

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
