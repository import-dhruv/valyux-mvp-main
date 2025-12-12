// Web scraping service for real-time price comparison
// For production: Use ScrapingBee API, Bright Data, or Puppeteer in serverless function

export interface ScrapedProduct {
    name: string
    price: number
    image?: string
    availability: "in_stock" | "out_of_stock" | "limited"
    specifications?: Record<string, string>
}

export interface ProductUrlInput {
    url: string
    retailer?: string
}

// Retailer-specific selectors (updated as of Dec 2024)
const RETAILER_SELECTORS = {
    amazon: {
        name: ['#productTitle', '.product-title-word-break'],
        price: ['.a-price-whole', '.a-price .a-offscreen', '#priceblock_ourprice'],
        image: ['#landingImage', '#imgBlkFront'],
        availability: ['#availability span', '.a-declarative .a-color-success']
    },
    flipkart: {
        name: ['.B_NuCI', '._35KyD6', 'h1.yhB1nd'],
        price: ['._30jeq3', '._1_WHN1', '.CEmiEU div'],
        image: ['._396cs4', '._2r_T1I img'],
        availability: ['._16FRp0', '._2aK_gu']
    },
    myntra: {
        name: ['.pdp-title', '.pdp-name'],
        price: ['.pdp-price strong', '.pdp-price'],
        image: ['.image-grid-image', '.pdp-img'],
        availability: ['.size-buttons-size-text']
    },
    ajio: {
        name: ['.prod-title', 'h1.prod-name'],
        price: ['.prod-sp', '.prod-price'],
        image: ['.img-holder img', '.prod-image-container img'],
        availability: ['.prod-size']
    }
}

/**
 * Extract product information from a retailer URL
 * NOTE: This is a simplified version. For production use:
 * 1. ScrapingBee API (https://www.scrapingbee.com/)
 * 2. Bright Data (https://brightdata.com/)
 * 3. Puppeteer in AWS Lambda/Vercel serverless function
 */
export async function scrapeProductFromUrl(url: string): Promise<ScrapedProduct | null> {
    try {
        const retailer = detectRetailer(url)

        if (!retailer) {
            throw new Error("Unsupported retailer. Supported: Amazon, Flipkart, Myntra, Ajio")
        }

        // IMPORTANT: This basic fetch won't work for most sites due to:
        // - JavaScript rendering
        // - Anti-bot protection
        // - CORS policies

        // For MVP demo, we'll return mock data based on URL patterns
        // In production, replace this with actual scraping service

        console.warn('Using mock scraper - implement real scraping service for production')
        return await mockScrapeProduct(url, retailer)

    } catch (error) {
        console.error('Scraping error:', error)
        return null
    }
}

/**
 * Mock scraper for MVP - extracts product ID from URL and returns realistic data
 * Replace this with real scraping in production
 */
async function mockScrapeProduct(url: string, retailer: string): Promise<ScrapedProduct | null> {
    // Extract product identifier from URL
    const productId = extractProductIdFromUrl(url, retailer)

    if (!productId) {
        return null
    }

    // For demo purposes, return structured data
    // In production, this would be actual scraped data
    return {
        name: `Product from ${retailer} (${productId})`,
        price: Math.floor(Math.random() * 50000) + 5000, // Random price for demo
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        availability: 'in_stock',
        specifications: {
            'Source': retailer,
            'Product ID': productId
        }
    }
}

/**
 * Extract product ID from URL
 */
function extractProductIdFromUrl(url: string, retailer: string): string | null {
    try {
        switch (retailer) {
            case 'amazon':
                // Amazon: /dp/PRODUCTID or /gp/product/PRODUCTID
                const amazonMatch = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]+)/i)
                return amazonMatch ? amazonMatch[1] : null

            case 'flipkart':
                // Flipkart: /p/itm... or /product-name/p/itm...
                const flipkartMatch = url.match(/\/p\/(itm[a-z0-9]+)/i)
                return flipkartMatch ? flipkartMatch[1] : null

            case 'myntra':
                // Myntra: /product-name/12345/buy
                const myntraMatch = url.match(/\/(\d+)\/buy/i)
                return myntraMatch ? myntraMatch[1] : null

            case 'ajio':
                // Ajio: /p/12345_color
                const ajioMatch = url.match(/\/p\/(\d+_[a-z]+)/i)
                return ajioMatch ? ajioMatch[1] : null

            default:
                return null
        }
    } catch {
        return null
    }
}

/**
 * Detect retailer from URL
 */
function detectRetailer(url: string): string | null {
    const urlLower = url.toLowerCase()

    if (urlLower.includes('amazon.in')) return 'amazon'
    if (urlLower.includes('flipkart.com')) return 'flipkart'
    if (urlLower.includes('myntra.com')) return 'myntra'
    if (urlLower.includes('ajio.com')) return 'ajio'
    if (urlLower.includes('croma.com')) return 'croma'
    if (urlLower.includes('tatacliq.com')) return 'tatacliq'

    return null
}

/**
 * Search for the same product on other retailers
 * This uses the product name to find matches
 */
export async function findProductOnOtherRetailers(
    productName: string,
    excludeRetailer?: string
): Promise<Array<{ retailer: string; url: string; price?: number }>> {
    const retailers = [
        { name: 'amazon', searchUrl: 'https://www.amazon.in/s?k=' },
        { name: 'flipkart', searchUrl: 'https://www.flipkart.com/search?q=' },
        { name: 'myntra', searchUrl: 'https://www.myntra.com/' },
        { name: 'ajio', searchUrl: 'https://www.ajio.com/search/?text=' }
    ]

    const results = []

    for (const retailer of retailers) {
        if (retailer.name === excludeRetailer) continue

        const searchQuery = encodeURIComponent(productName)
        const searchUrl = retailer.searchUrl + searchQuery

        results.push({
            retailer: retailer.name,
            url: searchUrl
        })
    }

    return results
}

/**
 * Compare prices across multiple URLs
 */
export async function comparePricesFromUrls(
    urls: ProductUrlInput[]
): Promise<Array<{ retailer: string; product: ScrapedProduct; url: string }>> {
    const results = []

    for (const { url, retailer } of urls) {
        const product = await scrapeProductFromUrl(url)

        if (product) {
            results.push({
                retailer: retailer || detectRetailer(url) || 'unknown',
                product,
                url
            })
        }
    }

    return results
}

/**
 * PRODUCTION IMPLEMENTATION GUIDE:
 * 
 * Option 1: ScrapingBee API (Recommended for MVP)
 * - Sign up at https://www.scrapingbee.com/
 * - Add API key to .env.local: SCRAPINGBEE_API_KEY=your_key
 * - Replace mockScrapeProduct with:
 * 
 * const response = await fetch(
 *   `https://app.scrapingbee.com/api/v1/?api_key=${process.env.SCRAPINGBEE_API_KEY}&url=${encodeURIComponent(url)}&render_js=true`
 * )
 * const html = await response.text()
 * // Parse HTML with cheerio
 * 
 * Option 2: Puppeteer in Serverless Function
 * - Deploy to Vercel/AWS Lambda with Puppeteer
 * - Use chrome-aws-lambda for Lambda
 * - Example: https://github.com/vercel/og-image
 * 
 * Option 3: Bright Data (Enterprise)
 * - Best for large scale
 * - Handles all anti-bot measures
 * - https://brightdata.com/
 */
