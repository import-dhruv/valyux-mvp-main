// Perplexity API client for real-time product search
// Uses Perplexity's online search models for up-to-date pricing

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"

export interface PerplexityOptions {
    model?: string
    temperature?: number
    max_tokens?: number
}

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
}

/**
 * Call Perplexity API with a prompt
 */
export async function callPerplexity(prompt: string, options: PerplexityOptions = {}) {
    const {
        model = "llama-3.1-sonar-small-128k-online", // Fast online model
        temperature = 0.2,
        max_tokens = 2000
    } = options

    if (!PERPLEXITY_API_KEY) {
        throw new Error("PERPLEXITY_API_KEY is not configured. Please add it to your .env.local file.")
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

    try {
        const response = await fetch(PERPLEXITY_API_URL, {
            method: "POST",
            signal: controller.signal,
            headers: {
                "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that searches for product prices across Indian e-commerce websites. Always return valid JSON responses."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature,
                max_tokens,
            }),
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: "Unknown error" }))
            throw new Error(`Perplexity API error: ${error.error || response.statusText}`)
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content || ""
        return content
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("Perplexity API request timed out")
        }
        throw error
    }
}

/**
 * Search for products using Perplexity AI
 */
export async function searchProductsWithPrices(
    query: string,
    category?: string,
    limit: number = 10,
): Promise<Product[]> {
    const categoryContext = category
        ? `Focus on ${category} category. `
        : "Search across all categories (electronics, clothing, flights, hotels). "

    const prompt = `Search for "${query}" and find current prices from major Indian retailers.

${categoryContext}Find products and their prices from these retailers: Amazon India, Flipkart, Myntra, Ajio (for clothing), MakeMyTrip, Cleartrip (for flights/hotels), OYO (for hotels).

Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks):
[
  {
    "name": "Product full name",
    "brand": "Brand name",
    "category": "electronics|clothing|flights|hotels",
    "description": "Brief product description",
    "image": "product name for image search",
    "prices": [
      {
        "retailer": "Amazon India",
        "price": 12345,
        "currency": "INR",
        "url": "https://amazon.in/product-link",
        "availability": "in_stock"
      }
    ],
    "ratings": {
      "average": 4.5,
      "count": 1234
    },
    "specifications": {
      "key1": "value1"
    }
  }
]

Requirements:
- Return valid JSON array starting with [ and ending with ]
- Include 2-3 retailers per product minimum
- Prices in INR (Indian Rupees)
- Real product URLs from retailers
- Find up to ${limit} products
- Use current, accurate pricing

Query: "${query}"`

    try {
        const response = await callPerplexity(prompt, {
            max_tokens: 2000,
            temperature: 0.2,
        })

        // Extract JSON from response
        let jsonMatch = response.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
            jsonMatch = response.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/)
            if (jsonMatch && jsonMatch[1]) {
                jsonMatch = [jsonMatch[1]]
            }
        }

        if (!jsonMatch) {
            console.error("Could not parse JSON from Perplexity response:", response.substring(0, 500))
            return []
        }

        const products: Product[] = JSON.parse(jsonMatch[0])

        if (!Array.isArray(products)) {
            console.error("Response is not an array")
            return []
        }

        // Transform and add IDs
        return products.map((product, index) => {
            const categoryKeywords: Record<string, string> = {
                electronics: "electronics,smartphone,gadget,tech",
                clothing: "fashion,clothing,apparel,style",
                flights: "airplane,flight,travel,aviation",
                hotels: "hotel,accommodation,building,luxury",
            }

            const keywords = categoryKeywords[product.category || "electronics"] || "product"
            const searchTerm = encodeURIComponent(product.image || product.name)
            const imageUrl = `https://source.unsplash.com/400x400/?${keywords},${searchTerm}`

            return {
                ...product,
                id: `prod-${Date.now()}-${index}`,
                image: imageUrl,
                prices: product.prices || [],
                ratings: product.ratings || { average: 0, count: 0 },
                specifications: product.specifications || {},
            }
        })
    } catch (error) {
        console.error("Error searching products with Perplexity:", error)
        throw error
    }
}

/**
 * Get detailed product information with prices
 */
export async function getProductDetailsWithPrices(
    productName: string,
    brand?: string,
): Promise<Product | null> {
    const brandContext = brand ? `Brand: ${brand}. ` : ""

    const prompt = `Get detailed information and current prices for "${productName}" ${brandContext}from major Indian retailers.

Find this product and return ONLY a valid JSON object (no markdown, no code blocks):
{
  "name": "Product full name",
  "brand": "Brand name",
  "category": "electronics|clothing|flights|hotels",
  "description": "Detailed product description",
  "image": "product name for image",
  "prices": [
    {
      "retailer": "Amazon India",
      "price": 12345,
      "currency": "INR",
      "url": "https://amazon.in/product",
      "availability": "in_stock"
    }
  ],
  "ratings": {
    "average": 4.5,
    "count": 1234
  },
  "specifications": {
    "key1": "value1"
  }
}

Requirements:
- Return valid JSON object starting with { and ending with }
- Include 3-5 retailers with prices
- Prices in INR
- Real product URLs
- Include all specifications

Product: "${productName}"`

    try {
        const response = await callPerplexity(prompt, {
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
            console.error("Could not parse JSON from Perplexity response:", response.substring(0, 500))
            return null
        }

        const product: Product = JSON.parse(jsonMatch[0])

        if (!product || typeof product !== 'object') {
            console.error("Invalid product object")
            return null
        }

        const categoryKeywords: Record<string, string> = {
            electronics: "electronics,smartphone,gadget,tech",
            clothing: "fashion,clothing,apparel,style",
            flights: "airplane,flight,travel,aviation",
            hotels: "hotel,accommodation,building,luxury",
        }

        const keywords = categoryKeywords[product.category || "electronics"] || "product"
        const searchTerm = encodeURIComponent(product.image || product.name)
        const imageUrl = `https://source.unsplash.com/600x600/?${keywords},${searchTerm}`

        return {
            ...product,
            id: `prod-${Date.now()}`,
            image: imageUrl,
            prices: product.prices || [],
            ratings: product.ratings || { average: 0, count: 0 },
            specifications: product.specifications || {},
        }
    } catch (error) {
        console.error("Error getting product details with Perplexity:", error)
        return null
    }
}
