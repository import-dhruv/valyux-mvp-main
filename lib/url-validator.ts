/**
 * URL Validator and Builder for Retailer Links
 * Ensures all retailer URLs are valid and builds fallback URLs when needed
 */

export interface RetailerConfig {
    domain: string
    searchPath: string
    productPath?: string
}

const RETAILER_CONFIGS: Record<string, RetailerConfig> = {
    'Amazon India': {
        domain: 'www.amazon.in',
        searchPath: '/s',
        productPath: '/dp/'
    },
    'Flipkart': {
        domain: 'www.flipkart.com',
        searchPath: '/search',
        productPath: '/p/'
    },
    'Croma': {
        domain: 'www.croma.com',
        searchPath: '/search'
    },
    'Reliance Digital': {
        domain: 'www.reliancedigital.in',
        searchPath: '/search'
    },
    'Myntra': {
        domain: 'www.myntra.com',
        searchPath: '/'
    },
    'Ajio': {
        domain: 'www.ajio.com',
        searchPath: '/search'
    }
}

/**
 * Validate if a URL belongs to the correct retailer domain
 */
export function validateRetailerUrl(url: string, retailer: string): boolean {
    try {
        const urlObj = new URL(url)
        const config = RETAILER_CONFIGS[retailer]

        if (!config) {
            console.warn(`Unknown retailer: ${retailer}`)
            return false
        }

        return urlObj.hostname === config.domain || urlObj.hostname === `www.${config.domain}`
    } catch (error) {
        console.error(`Invalid URL: ${url}`, error)
        return false
    }
}

/**
 * Build a search URL for a product on a specific retailer
 */
export function buildSearchUrl(
    retailer: string,
    productName: string,
    brand?: string
): string {
    const config = RETAILER_CONFIGS[retailer]

    if (!config) {
        console.warn(`Unknown retailer: ${retailer}, using generic search`)
        return `https://www.google.com/search?q=${encodeURIComponent(productName + (brand ? ` ${brand}` : ''))}`
    }

    const searchQuery = brand ? `${brand} ${productName}` : productName

    switch (retailer) {
        case 'Amazon India':
            return `https://${config.domain}${config.searchPath}?k=${encodeURIComponent(searchQuery)}`

        case 'Flipkart':
            return `https://${config.domain}${config.searchPath}?q=${encodeURIComponent(searchQuery)}`

        case 'Croma':
        case 'Reliance Digital':
            return `https://${config.domain}${config.searchPath}?q=${encodeURIComponent(searchQuery)}`

        case 'Myntra':
        case 'Ajio':
            return `https://${config.domain}${config.searchPath}?text=${encodeURIComponent(searchQuery)}`

        default:
            return `https://${config.domain}${config.searchPath}?q=${encodeURIComponent(searchQuery)}`
    }
}

/**
 * Build a product URL with ID if available, otherwise fallback to search
 */
export function buildProductUrl(
    retailer: string,
    productName: string,
    brand?: string,
    productId?: string
): string {
    const config = RETAILER_CONFIGS[retailer]

    if (!config) {
        return buildSearchUrl(retailer, productName, brand)
    }

    // If we have a product ID and the retailer supports product paths
    if (productId && config.productPath) {
        switch (retailer) {
            case 'Amazon India':
                return `https://${config.domain}${config.productPath}${productId}`

            case 'Flipkart':
                // Flipkart URLs are more complex, fallback to search
                return buildSearchUrl(retailer, productName, brand)

            default:
                return buildSearchUrl(retailer, productName, brand)
        }
    }

    // Fallback to search URL
    return buildSearchUrl(retailer, productName, brand)
}

/**
 * Sanitize and validate a retailer URL
 * Returns the URL if valid, or builds a fallback search URL
 */
export function sanitizeRetailerUrl(
    url: string,
    retailer: string,
    productName: string,
    brand?: string
): string {
    // Check if URL is valid
    if (!url || url.trim() === '') {
        return buildSearchUrl(retailer, productName, brand)
    }

    // Validate URL format
    try {
        new URL(url)
    } catch (error) {
        console.warn(`Invalid URL format: ${url}, building fallback`)
        return buildSearchUrl(retailer, productName, brand)
    }

    // Validate retailer domain
    if (!validateRetailerUrl(url, retailer)) {
        console.warn(`URL domain mismatch for ${retailer}: ${url}, building fallback`)
        return buildSearchUrl(retailer, productName, brand)
    }

    return url
}

/**
 * Extract product ID from Amazon URL if present
 */
export function extractAmazonProductId(url: string): string | null {
    try {
        const urlObj = new URL(url)
        const pathParts = urlObj.pathname.split('/')
        const dpIndex = pathParts.indexOf('dp')

        if (dpIndex !== -1 && dpIndex < pathParts.length - 1) {
            return pathParts[dpIndex + 1]
        }

        return null
    } catch (error) {
        return null
    }
}

/**
 * Extract product ID from Flipkart URL if present
 */
export function extractFlipkartProductId(url: string): string | null {
    try {
        const urlObj = new URL(url)
        const pathParts = urlObj.pathname.split('/')

        // Flipkart URLs typically end with /p/itmXXXXXXXXXXXX
        const lastPart = pathParts[pathParts.length - 1]
        if (lastPart && lastPart.startsWith('itm')) {
            return lastPart
        }

        return null
    } catch (error) {
        return null
    }
}
