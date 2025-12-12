/**
 * OpenAI API Client for Product Search and Price Comparison
 * Replaces Perplexity API with OpenAI GPT models
 */

export interface ProductPrice {
    retailer: string
    price: number
    currency: string
    url: string
    availability: "in_stock" | "out_of_stock" | "limited"
}

export interface Product {
    id: string
    name: string
    brand: string
    category: "electronics" | "clothing" | "flights" | "hotels"
    description: string
    image: string
    prices: ProductPrice[]
    ratings: {
        average: number
        count: number
    }
    specifications: Record<string, string>
    tags: string[]
}

interface OpenAIOptions {
    model?: string
    temperature?: number
    max_tokens?: number
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

/**
 * Call OpenAI API with a prompt
 */
export async function callOpenAI(prompt: string, options: OpenAIOptions = {}): Promise<string> {
    const {
        model = "gpt-3.5-turbo", // Fast and cost-effective
        temperature = 0.2,
        max_tokens = 2000
    } = options

    if (!OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is not configured")
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: "system",
                        content: "You are a product price comparison expert for Indian e-commerce. Provide accurate product information in JSON format."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature,
                max_tokens,
            }),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            let errorMessage = response.statusText
            try {
                const errorData = await response.json()
                errorMessage = errorData.error?.message || JSON.stringify(errorData)
                console.error("OpenAI API error details:", errorData)
            } catch (e) {
                console.error("Could not parse error response:", e)
            }
            throw new Error(`OpenAI API error (${response.status}): ${errorMessage}`)
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content || ""
        return content
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("OpenAI API request timed out")
        }
        throw error
    }
}

/**
 * Search for products with prices using OpenAI
 * Note: OpenAI doesn't have real-time web access, so prices will be estimates
 * For accurate prices, use the mock data
 */
export async function searchProductsWithPrices(
    query: string,
    category?: string,
    limit: number = 20,
): Promise<Product[]> {
    const prompt = `You are a product price comparison expert for Indian e-commerce.

Search for products matching: "${query}"${category ? ` in category: ${category}` : ''}

CRITICAL: Find ALL available variants and models. Examples:
- "iPhone" → iPhone 15 Pro Max 256GB, iPhone 15 Pro 256GB, iPhone 15 128GB, iPhone 14 Pro, iPhone 14, iPhone 13, etc.
- "Samsung Galaxy" → S24 Ultra 512GB, S24 256GB, S23 Ultra, S23, etc.
- "Nike shoes" → Air Max 270, Air Force 1, React, etc.
- Show DIFFERENT storage/color/size options as SEPARATE products

For EACH product, provide:
1. **DIRECT product page URL** (CRITICAL: Must be exact product page, NOT search page)
   - Amazon: https://www.amazon.in/dp/{ASIN} (e.g., https://www.amazon.in/dp/B0CHX1W1XY)
   - Flipkart: https://www.flipkart.com/{product-name}/p/itm{ID} (e.g., https://www.flipkart.com/apple-iphone-15-pro/p/itm123456)
   - Use actual product page URLs, NOT search URLs
2. Estimated current price (note: for accurate prices, check retailer websites)
3. Complete specifications

Return a JSON array with this EXACT structure:
[
  {
    "id": "unique-id",
    "name": "Complete product name with ALL details (model + storage/size + color)",
    "brand": "Brand name",
    "category": "electronics|clothing|flights|hotels",
    "description": "Detailed description with key features",
    "image": "product name for image search",
    "prices": [
      {
        "retailer": "Amazon India",
        "price": 144900,
        "currency": "INR",
        "url": "https://www.amazon.in/dp/B0CHX1W1XY",
        "availability": "in_stock"
      },
      {
        "retailer": "Flipkart",
        "price": 144900,
        "currency": "INR",
        "url": "https://www.flipkart.com/product-name/p/itmXXXXXXXXXX",
        "availability": "in_stock"
      }
    ],
    "ratings": {
      "average": 4.5,
      "count": 1234
    },
    "specifications": {
      "Storage": "256GB",
      "RAM": "8GB",
      "Display": "6.1-inch"
    },
    "tags": []
  }
]

CRITICAL REQUIREMENTS:
- Return ${limit} DIFFERENT product variants
- URLs MUST be DIRECT product pages (with /dp/ or /p/ in URL)
- DO NOT use search URLs (/s? or /search?)
- Include prices from 3-4 retailers: Amazon India, Flipkart, Croma, Reliance Digital
- Prices are estimates (actual prices may vary)
- Include detailed specifications for each variant
- Each variant should be a separate product

Search: "${query}"
Category: "${category || 'all'}"
`

    try {
        const response = await callOpenAI(prompt, {
            max_tokens: 3000,
            temperature: 0.3,
        })

        // Extract JSON array
        let jsonMatch = response.match(/\[[\s\S]{100,}\]/)
        if (!jsonMatch) {
            jsonMatch = response.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/)
            if (jsonMatch && jsonMatch[1]) {
                jsonMatch = [jsonMatch[1]]
            }
        }

        if (!jsonMatch) {
            console.error("Could not parse JSON from OpenAI response:", response.substring(0, 500))
            return []
        }

        const products: Product[] = JSON.parse(jsonMatch[0])

        // Transform and validate products
        return products.map((product, index) => ({
            ...product,
            id: product.id || `prod-${Date.now()}-${index}`,
            image: product.image || product.name,
            prices: product.prices || [],
            ratings: product.ratings || { average: 0, count: 0 },
            specifications: product.specifications || {},
            tags: product.tags || [],
        }))
    } catch (error) {
        console.error("Error searching products with OpenAI:", error)
        return []
    }
}

/**
 * Get detailed product information with prices using OpenAI
 */
export async function getProductDetailsWithPrices(
    productName: string,
    brand?: string,
): Promise<Product | null> {
    const prompt = `You are a product price comparison expert for Indian e-commerce.

Get detailed information and current prices for this EXACT product:
Product: "${productName}"${brand ? `\nBrand: ${brand}` : ''}

CRITICAL REQUIREMENTS:
1. Find EXACT product page URLs (with product ID/ASIN if possible)
2. Provide estimated current prices (note: for accurate prices, check retailer websites)
3. Include complete specifications
4. Verify stock availability

Return a JSON object with this EXACT structure:
{
  "id": "unique-id",
  "name": "${productName}",
  "brand": "${brand || 'Unknown'}",
  "category": "electronics|clothing|flights|hotels",
  "description": "Detailed product description with key features",
  "image": "product name for image",
  "prices": [
    {
      "retailer": "Amazon India",
      "price": 144900,
      "currency": "INR",
      "url": "https://www.amazon.in/dp/B0CHX1W1XY",
      "availability": "in_stock"
    }
  ],
  "ratings": {
    "average": 4.7,
    "count": 2847
  },
  "specifications": {
    "Storage": "256GB",
    "RAM": "8GB",
    "Display": "6.1-inch Super Retina XDR"
  },
  "tags": []
}

Requirements:
- Return valid JSON object starting with { and ending with }
- Include 3-5 retailers: Amazon India, Flipkart, Croma, Reliance Digital
- Prices are estimates (actual prices may vary - check retailer websites)
- URLs should be direct product pages with IDs
- Include complete specifications
- Verify availability status

Product: "${productName}"`

    try {
        const response = await callOpenAI(prompt, {
            max_tokens: 2000,
            temperature: 0.2,
        })

        // Extract JSON object
        let jsonMatch = response.match(/\{[\s\S]{100,}\}/)
        if (!jsonMatch) {
            jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
            if (jsonMatch && jsonMatch[1]) {
                jsonMatch = [jsonMatch[1]]
            }
        }

        if (!jsonMatch) {
            console.error("Could not parse JSON from OpenAI response:", response.substring(0, 500))
            return null
        }

        const product: Product = JSON.parse(jsonMatch[0])

        return {
            ...product,
            id: product.id || `prod-${Date.now()}`,
            image: product.image || productName,
            prices: product.prices || [],
            ratings: product.ratings || { average: 0, count: 0 },
            specifications: product.specifications || {},
            tags: product.tags || [],
        }
    } catch (error) {
        console.error("Error getting product details with OpenAI:", error)
        return null
    }
}
