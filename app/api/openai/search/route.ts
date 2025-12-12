import { NextRequest, NextResponse } from "next/server"
import { searchProductsWithPrices } from "@/lib/openai"
import { searchProducts } from "@/lib/mock-products"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get("q") || ""
        const category = searchParams.get("category") || undefined
        const limit = parseInt(searchParams.get("limit") || "20")

        if (!query) {
            return NextResponse.json(
                { error: "Query parameter 'q' is required" },
                { status: 400 }
            )
        }

        console.log(`Searching with OpenAI: "${query}", category: ${category}, limit: ${limit}`)

        // Try OpenAI first
        let products = await searchProductsWithPrices(query, category, limit)

        // Fallback to mock data if OpenAI fails or returns no results
        if (!products || products.length === 0) {
            console.log("OpenAI returned no results, falling back to mock data")
            products = searchProducts(query, category)
        }

        return NextResponse.json(products)
    } catch (error) {
        console.error("Error in OpenAI search API:", error)

        // Fallback to mock data on error
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get("q") || ""
        const category = searchParams.get("category") || undefined

        console.log("OpenAI API error, falling back to mock data")
        const products = searchProducts(query, category)

        return NextResponse.json(products)
    }
}
