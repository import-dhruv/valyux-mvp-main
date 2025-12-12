// AI-powered product recommendations
// Analyzes user search history and viewing patterns to recommend products

import { createClient } from "@/lib/supabase/server"
import { callOpenAI } from "@/lib/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, limit = 5 } = await request.json()

    const supabase = await createClient()

    // Get user's search history and favorites
    const { data: searches } = await supabase
      .from("search_history")
      .select("query, category")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10)

    const { data: favorites } = await supabase
      .from("favorites")
      .select("products(id, name, category, brand)")
      .eq("user_id", userId)
      .limit(5)

    // Build user profile from history
    const searchPatterns = searches?.map((s: any) => `${s.query} (${s.category})`).join(", ") || ""
    const favoriteItems = favorites?.map((f: any) => f.products?.name).join(", ") || ""

    const prompt = `
You are a product recommendation expert for an Indian e-commerce platform with categories: electronics, clothing, flights, and hotels.

User Profile:
- Recent searches: ${searchPatterns}
- Favorite items: ${favoriteItems}

Based on this user profile, recommend ${limit} products that would interest them.
Return a JSON array with objects containing:
- product_type: type of product
- reason: why this recommendation (1 sentence)
- category: category name
- expected_price_range: estimated price range in INR

Return ONLY valid JSON array, no other text.`

    const aiResponse = await callOpenAI(prompt, {
      max_tokens: 800,
      temperature: 0.6,
    })

    let recommendations
    try {
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/)
      recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : []
    } catch {
      recommendations = []
    }

    // Enrich recommendations with actual products from database
    const enrichedRecommendations = []
    for (const rec of recommendations) {
      const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("category", rec.category)
        .ilike("name", `%${rec.product_type}%`)
        .limit(1)

      if (products?.length) {
        enrichedRecommendations.push({
          ...rec,
          product: products[0],
        })
      }
    }

    return NextResponse.json({
      recommendations: enrichedRecommendations.slice(0, limit),
      message: `Found ${enrichedRecommendations.length} personalized recommendations for you`,
    })
  } catch (error) {
    console.error("Recommendations error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
