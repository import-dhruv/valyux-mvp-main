// AI-powered smart search suggestions
// Analyzes user query intent and returns relevant search filters

import { createClient } from "@/lib/supabase/server"
import { callOpenAI } from "@/lib/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { query, category } = await request.json()

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ suggestions: [] })
    }

    // Use Perplexity to understand search intent
    const prompt = `
You are a product search assistant for an Indian e-commerce price comparison platform.
Analyze this search query and return ONLY a JSON object with these fields:
- intent: "product_search" | "price_comparison" | "brand_research" | "deal_hunting"
- category: "electronics" | "clothing" | "flights" | "hotels" | "general"
- keywords: array of search keywords
- filters: object with suggested filters (price_range, brands, features)

Query: "${query}"
Category hint: ${category || "auto-detect"}

Return ONLY valid JSON, no other text.`

    const aiResponse = await callOpenAI(prompt, {
      max_tokens: 500,
      temperature: 0.5,
    })

    let parsedResponse
    try {
      // Extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : {}
    } catch {
      parsedResponse = {
        intent: "product_search",
        category: category || "general",
        keywords: query.split(" "),
      }
    }

    // Query database for matching products
    const supabase = await createClient()
    const searchCategory = parsedResponse.category || category

    let dbQuery = supabase
      .from("products")
      .select("id, name, brand, category, base_price, image_url")
      .ilike("name", `%${query}%`)
      .limit(8)

    if (searchCategory && searchCategory !== "general") {
      dbQuery = dbQuery.eq("category", searchCategory)
    }

    const { data: products } = await dbQuery

    return NextResponse.json({
      intent: parsedResponse.intent,
      category: parsedResponse.category,
      suggestions: products || [],
      filters: parsedResponse.filters || {},
    })
  } catch (error) {
    console.error("Search suggestions error:", error)
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}
