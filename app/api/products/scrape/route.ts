import { NextRequest, NextResponse } from 'next/server'
import { scrapeProductFromUrl, findProductOnOtherRetailers, comparePricesFromUrls } from '@/lib/scraper-service'
import type { Product } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/products/scrape
 * Scrape product from URL and find prices on other platforms
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { url, findAlternatives = true } = body

        if (!url || typeof url !== 'string') {
            return NextResponse.json(
                { error: 'Valid product URL is required' },
                { status: 400 }
            )
        }

        // Scrape the main product
        const scrapedProduct = await scrapeProductFromUrl(url)

        if (!scrapedProduct) {
            return NextResponse.json(
                { error: 'Failed to extract product data from URL. Please check the URL and try again.' },
                { status: 400 }
            )
        }

        // Build the product object
        const product: Partial<Product> = {
            id: `scraped-${Date.now()}`,
            name: scrapedProduct.name,
            brand: extractBrand(scrapedProduct.name),
            category: 'electronics', // You can enhance this with ML classification
            description: scrapedProduct.name,
            image: scrapedProduct.image || '/placeholder.svg',
            prices: [
                {
                    retailer: detectRetailerName(url),
                    price: scrapedProduct.price,
                    currency: 'INR',
                    url: url,
                    availability: scrapedProduct.availability
                }
            ],
            ratings: { average: 0, count: 0 },
            specifications: scrapedProduct.specifications || {},
            tags: []
        }

        // Find alternatives on other platforms if requested
        if (findAlternatives && scrapedProduct.name) {
            const alternatives = await findProductOnOtherRetailers(
                scrapedProduct.name,
                detectRetailerName(url).toLowerCase()
            )

            // Add search URLs for other retailers
            for (const alt of alternatives) {
                product.prices?.push({
                    retailer: capitalizeRetailer(alt.retailer),
                    price: 0, // Will be updated when user clicks
                    currency: 'INR',
                    url: alt.url,
                    availability: 'in_stock'
                })
            }
        }

        return NextResponse.json({
            success: true,
            product,
            message: 'Product scraped successfully'
        })

    } catch (error) {
        console.error('Scraping API error:', error)
        return NextResponse.json(
            {
                error: 'Failed to scrape product',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

/**
 * POST /api/products/scrape/compare
 * Compare prices from multiple URLs
 */
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { urls } = body

        if (!Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: 'Array of URLs is required' },
                { status: 400 }
            )
        }

        // Scrape all URLs
        const results = await comparePricesFromUrls(urls.map(url => ({ url })))

        if (results.length === 0) {
            return NextResponse.json(
                { error: 'Failed to scrape any products' },
                { status: 400 }
            )
        }

        // Build combined product
        const firstResult = results[0]
        const product: Partial<Product> = {
            id: `comparison-${Date.now()}`,
            name: firstResult.product.name,
            brand: extractBrand(firstResult.product.name),
            category: 'electronics',
            description: firstResult.product.name,
            image: firstResult.product.image || '/placeholder.svg',
            prices: results.map(r => ({
                retailer: capitalizeRetailer(r.retailer),
                price: r.product.price,
                currency: 'INR',
                url: r.url,
                availability: r.product.availability
            })),
            ratings: { average: 0, count: 0 },
            specifications: firstResult.product.specifications || {},
            tags: []
        }

        return NextResponse.json({
            success: true,
            product,
            scrapedCount: results.length
        })

    } catch (error) {
        console.error('Comparison API error:', error)
        return NextResponse.json(
            { error: 'Failed to compare prices' },
            { status: 500 }
        )
    }
}

// Helper functions
function detectRetailerName(url: string): string {
    const urlLower = url.toLowerCase()
    if (urlLower.includes('amazon.in')) return 'Amazon India'
    if (urlLower.includes('flipkart.com')) return 'Flipkart'
    if (urlLower.includes('myntra.com')) return 'Myntra'
    if (urlLower.includes('ajio.com')) return 'Ajio'
    if (urlLower.includes('croma.com')) return 'Croma'
    if (urlLower.includes('tatacliq.com')) return 'TataCliq'
    return 'Unknown'
}

function capitalizeRetailer(name: string): string {
    const map: Record<string, string> = {
        'amazon': 'Amazon India',
        'flipkart': 'Flipkart',
        'myntra': 'Myntra',
        'ajio': 'Ajio',
        'croma': 'Croma',
        'tatacliq': 'TataCliq'
    }
    return map[name.toLowerCase()] || name
}

function extractBrand(productName: string): string {
    // Simple brand extraction - can be enhanced
    const brands = ['Nike', 'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Oppo', 'Adidas', 'Puma']
    for (const brand of brands) {
        if (productName.toLowerCase().includes(brand.toLowerCase())) {
            return brand
        }
    }
    return 'Unknown'
}
