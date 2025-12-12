// Price synchronization service with caching and real-time updates
import { getProductDetailsWithPrices } from './openai'
import { priceCache, productCache } from './cache'
import { getProductById } from './mock-products'
import type { Product } from './types'

export interface PriceUpdateResult {
    product: Product
    lastUpdated: string
    fromCache: boolean
    cacheAge?: number
}

export interface PriceSyncOptions {
    forceRefresh?: boolean
    cacheTTL?: number
}

/**
 * Get product with real-time prices
 * Uses cache when available, fetches fresh data when needed
 */
export async function getProductWithPrices(
    productName: string,
    brand?: string,
    options: PriceSyncOptions = {}
): Promise<PriceUpdateResult | null> {
    const { forceRefresh = false, cacheTTL } = options
    const cacheKey = `price:${productName}:${brand || 'any'}`

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cached = priceCache.get(cacheKey)
        if (cached) {
            const cacheAge = priceCache.getTTL(cacheKey)
            return {
                product: cached.product,
                lastUpdated: cached.lastUpdated,
                fromCache: true,
                cacheAge: cacheAge || 0,
            }
        }
    }

    // Fetch fresh data from Perplexity
    try {
        const product = await getProductDetailsWithPrices(productName, brand)

        if (!product) {
            return null
        }

        const result: PriceUpdateResult = {
            product,
            lastUpdated: new Date().toISOString(),
            fromCache: false,
        }

        // Cache the result
        priceCache.set(cacheKey, result, cacheTTL)

        return result
    } catch (error) {
        console.error('Error fetching product prices:', error)

        // Return stale cache data if available (better than nothing)
        const staleCache = priceCache.get(cacheKey)
        if (staleCache) {
            console.warn('Returning stale cache data due to fetch error')
            return {
                ...staleCache,
                fromCache: true,
            }
        }

        return null
    }
}

/**
 * Refresh prices for multiple products in parallel
 */
export async function refreshMultipleProducts(
    products: Array<{ name: string; brand?: string }>,
    options: PriceSyncOptions = {}
): Promise<PriceUpdateResult[]> {
    const promises = products.map(({ name, brand }) =>
        getProductWithPrices(name, brand, options)
    )

    const results = await Promise.allSettled(promises)

    return results
        .filter((r): r is PromiseFulfilledResult<PriceUpdateResult> =>
            r.status === 'fulfilled' && r.value !== null
        )
        .map(r => r.value)
}

/**
 * Invalidate cache for a specific product
 */
export function invalidateProductCache(productName: string, brand?: string): void {
    const cacheKey = `price:${productName}:${brand || 'any'}`
    priceCache.delete(cacheKey)
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
    return {
        ...priceCache.getStats(),
        hitRate: priceCache.getHitRate(),
    }
}

/**
 * Preload prices for popular products (background task)
 */
export async function preloadPopularProducts(
    products: Array<{ name: string; brand?: string }>
): Promise<void> {
    console.log(`Preloading prices for ${products.length} popular products...`)

    // Fetch in batches to avoid overwhelming the API
    const batchSize = 5
    for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize)
        await refreshMultipleProducts(batch, { forceRefresh: false })

        // Small delay between batches to respect rate limits
        if (i + batchSize < products.length) {
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }

    console.log('Preload complete')
}
