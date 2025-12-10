// AI-powered product description generation
// Converts raw product specifications into engaging marketing descriptions

import { callPerplexity } from "@/lib/perplexity"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { productName, brand, specifications, category } = await request.json()

    if (!productName || !specifications) {
      return NextResponse.json({ error: "Product name and specifications required" }, { status: 400 })
    }

    // Format specs for AI
    const specsText =
      typeof specifications === "string"
        ? specifications
        : Object.entries(specifications)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")

    const prompt = `
You are a product description writer for Indian e-commerce. Create an engaging, concise product description.

Product: ${brand || ""} ${productName}
Category: ${category || "General"}
Specifications: ${specsText}

Write a 2-3 sentence marketing description that:
1. Highlights key features
2. Appeals to Indian consumers
3. Mentions value proposition
4. Is conversational and engaging

Write ONLY the description, no other text.`

    const description = await callPerplexity(prompt, {
      max_tokens: 300,
      temperature: 0.7,
    })

    return NextResponse.json({
      description: description.trim(),
      product: `${brand} ${productName}`,
    })
  } catch (error) {
    console.error("Description generation error:", error)
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 })
  }
}
