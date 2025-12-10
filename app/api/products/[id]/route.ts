import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: product, error: productError } = await supabase
      .from("products")
      .select(
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
        product_specs(spec_key, spec_value),
        product_prices(price, currency, in_stock, url, retailers(name, website, logo_url))
      `,
      )
      .eq("id", id)
      .single()

    if (productError) throw productError
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (reviewsError) throw reviewsError

    return NextResponse.json({
      ...product,
      reviews,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
