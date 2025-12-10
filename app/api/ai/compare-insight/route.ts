// AI-powered comparison analysis
// Generates pro/con analysis and buying guidance for product comparisons

import { createClient } from "@/lib/supabase/server"
import { callPerplexity } from "@/lib/perplexity"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json()

    if (!productIds || productIds.length === 0) {
      return NextResponse.json({ error: "No products to compare" }, { status: 400 })
    }

    const supabase = await createClient()

    // Fetch all products to compare
    const { data: products } = await supabase
      .from("products")
      .select("id, name, brand, category, base_price, specifications")
      .in("id", productIds.slice(0, 5)) // Max 5 products

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Products not found" }, { status: 404 })
    }

    // Format product data for AI analysis
    const productComparison = products
      .map((p: any) => `${p.brand} ${p.name} - ₹${p.base_price} - Specs: ${JSON.stringify(p.specifications)}`)
      .join("\n")

    const prompt = `
You are a product comparison expert for Indian consumers. Analyze these ${products.length} products and provide a detailed comparison.

Products to compare:
${productComparison}

Provide analysis as JSON with:
- best_overall: which product is best overall and why
- best_value: best value for money option
- best_features: product with best specs
- pros_cons: array of objects with product name, pros (array), and cons (array)
- recommendation: which one to buy based on different budgets/needs
- key_differences: main differences between products

Return ONLY valid JSON, no other text.`

    const aiResponse = await callPerplexity(prompt, {
      max_tokens: 1500,
      temperature: 0.5,
    })

    let analysis
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {}
    } catch {
      analysis = {
        best_overall: products[0].name,
        key_differences: "AI analysis unavailable at this moment",
      }
    }

    // Add product references to analysis
    return NextResponse.json({
      products: products.map((p: any) => ({
        id: p.id,
        name: `${p.brand} ${p.name}`,
        price: p.base_price,
      })),
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Comparison insight error:", error)
    return NextResponse.json({ error: "Failed to generate comparison insights" }, { status: 500 })
  }
}
