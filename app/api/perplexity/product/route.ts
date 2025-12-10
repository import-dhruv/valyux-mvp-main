// API route for getting product details using Perplexity AI
// Real-time product information

import { getProductDetailsWithPrices } from "@/lib/perplexity"
import { getProductById, getProductByName } from "@/lib/mock-products"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("id")
    const productName = searchParams.get("name") || ""
    const brand = searchParams.get("brand") || undefined

    // If we have an ID, try mock data first (for consistency)
    if (productId) {
      const mockProduct = getProductById(productId)
      if (mockProduct) {
        return NextResponse.json({ ...mockProduct, source: "mock" })
      }
    }

    // Try Perplexity for name-based search
    if (productName) {
      try {
        const product = await getProductDetailsWithPrices(productName, brand)

        if (product) {
          return NextResponse.json({ ...product, source: "perplexity" })
        }
      } catch (perplexityError) {
        console.error("Perplexity API error:", perplexityError)

        // Fallback to mock data
        const mockProduct = getProductByName(productName, brand)
        if (mockProduct) {
          return NextResponse.json({
            ...mockProduct,
            source: "mock",
            warning: "Using mock data - Perplexity API unavailable"
          })
        }
      }
    }

    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  } catch (error) {
    console.error("Error getting product details:", error)
    return NextResponse.json(
      { error: "Failed to fetch product details. Please try again." },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, productName, brand } = body

    if (productId) {
      const mockProduct = getProductById(productId)
      if (mockProduct) {
        return NextResponse.json({ ...mockProduct, source: "mock" })
      }
    }

    if (productName) {
      try {
        const product = await getProductDetailsWithPrices(productName, brand)

        if (product) {
          return NextResponse.json({ ...product, source: "perplexity" })
        }
      } catch (perplexityError) {
        console.error("Perplexity API error:", perplexityError)

        const mockProduct = getProductByName(productName, brand)
        if (mockProduct) {
          return NextResponse.json({
            ...mockProduct,
            source: "mock",
            warning: "Using mock data - Perplexity API unavailable"
          })
        }
      }
    }

    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  } catch (error) {
    console.error("Error getting product details:", error)
    return NextResponse.json(
      { error: "Failed to fetch product details. Please try again." },
      { status: 500 }
    )
  }
}
