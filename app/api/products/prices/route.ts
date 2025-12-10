import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("product_prices")
      .select(
        `
        id,
        product_id,
        price,
        currency,
        in_stock,
        url,
        last_updated,
        retailers(name, website, logo_url)
      `,
      )
      .eq("product_id", productId)
      .order("price", { ascending: true })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching prices:", error)
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 })
  }
}
