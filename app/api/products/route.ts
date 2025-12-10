import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 100)
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = await createClient()

    let query = supabase.from("products").select(
      `
      id,
      name,
      category,
      brand,
      description,
      image_url,
      base_price,
      currency,
      rating,
      rating_count,
      availability,
      product_specs(spec_key, spec_value)
    `,
      { count: "exact" },
    )

    if (category) query = query.eq("category", category)
    if (brand) query = query.eq("brand", brand)
    if (minPrice) query = query.gte("base_price", Number.parseFloat(minPrice))
    if (maxPrice) query = query.lte("base_price", Number.parseFloat(maxPrice))
    if (search) query = query.ilike("name", `%${search}%`)

    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      data,
      count,
      limit,
      offset,
      total: count || 0,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
