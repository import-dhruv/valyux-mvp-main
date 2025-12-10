// API route for searching products using Perplexity AI
// Real-time search with online data

import { searchProductsWithPrices } from "@/lib/perplexity"
import { searchProducts } from "@/lib/mock-products"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category") || undefined
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 20)

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        data: [],
        message: "Please enter a search query"
      })
    }

    try {
      // Try Perplexity API first
      const products = await searchProductsWithPrices(query, category, limit)

      return NextResponse.json({
        data: products,
        count: products.length,
        query,
        category,
        source: "perplexity"
      })
    } catch (perplexityError) {
      console.error("Perplexity API error, falling back to mock data:", perplexityError)

      // Fallback to mock data
      const mockResults = searchProducts(query, category, limit)

      return NextResponse.json({
        data: mockResults,
        count: mockResults.length,
        query,
        category,
        source: "mock",
        warning: "Using mock data - Perplexity API unavailable"
      })
    }
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json(
      {
        error: "Failed to search products. Please try again.",
        data: []
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query, category, limit = 10 } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        data: [],
        message: "Please enter a search query"
      })
    }

    try {
      const products = await searchProductsWithPrices(query, category, Math.min(limit, 20))

      return NextResponse.json({
        data: products,
        count: products.length,
        query,
        category,
        source: "perplexity"
      })
    } catch (perplexityError) {
      console.error("Perplexity API error, falling back to mock data:", perplexityError)

      const mockResults = searchProducts(query, category, Math.min(limit, 20))

      return NextResponse.json({
        data: mockResults,
        count: mockResults.length,
        query,
        category,
        source: "mock",
        warning: "Using mock data - Perplexity API unavailable"
      })
    }
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json(
      {
        error: "Failed to search products. Please try again.",
        data: []
      },
      { status: 500 }
    )
  }
}
