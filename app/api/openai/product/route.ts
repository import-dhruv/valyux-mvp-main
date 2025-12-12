import { NextRequest, NextResponse } from "next/server"
import { getProductDetailsWithPrices } from "@/lib/openai"
import { getProductById } from "@/lib/mock-products"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const productName = searchParams.get("name") || ""
        const brand = searchParams.get("brand") || undefined

        if (!productName) {
            return NextResponse.json(
                { error: "Query parameter 'name' is required" },
                { status: 400 }
            )
        }

        console.log(`Getting product details with OpenAI: "${productName}", brand: ${brand}`)

        // Try OpenAI first
        let product = await getProductDetailsWithPrices(productName, brand)

        // Fallback to mock data if OpenAI fails
        if (!product) {
            console.log("OpenAI returned no product, falling back to mock data")
            // Try to find in mock data by name
            const id = searchParams.get("id")
            if (id) {
                product = getProductById(id) || null
            }
        }

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("Error in OpenAI product API:", error)

        // Fallback to mock data on error
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get("id")

        if (id) {
            console.log("OpenAI API error, falling back to mock data")
            const product = getProductById(id)
            if (product) {
                return NextResponse.json(product)
            }
        }

        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        )
    }
}
