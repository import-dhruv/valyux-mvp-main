// Simple in-memory cache with TTL support
// For production, consider using Redis or similar

interface CacheEntry<T> {
    data: T
    expiresAt: number
    createdAt: number
}

interface CacheStats {
    hits: number
    misses: number
    size: number
}

export class Cache<T = any> {
    private cache = new Map<string, CacheEntry<T>>()
    private stats: CacheStats = { hits: 0, misses: 0, size: 0 }
    private maxSize: number
    private defaultTTL: number

    constructor(options: { maxSize?: number; defaultTTL?: number } = {}) {
        this.maxSize = options.maxSize || 1000
        this.defaultTTL = options.defaultTTL || 5 * 60 * 1000 // 5 minutes default
    }

    /**
     * Get item from cache
     */
    get(key: string): T | null {
        const entry = this.cache.get(key)

        if (!entry) {
            this.stats.misses++
            return null
        }

        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key)
            this.stats.misses++
            this.stats.size = this.cache.size
            return null
        }

        this.stats.hits++
        return entry.data
    }

    /**
     * Set item in cache with optional TTL
     */
    set(key: string, data: T, ttl?: number): void {
        const ttlMs = ttl || this.defaultTTL
        const now = Date.now()

        // Evict oldest entry if cache is full
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this.evictOldest()
        }

        this.cache.set(key, {
            data,
            expiresAt: now + ttlMs,
            createdAt: now,
        })

        this.stats.size = this.cache.size
    }

    /**
     * Check if key exists and is not expired
     */
    has(key: string): boolean {
        return this.get(key) !== null
    }

    /**
     * Delete item from cache
     */
    delete(key: string): boolean {
        const result = this.cache.delete(key)
        this.stats.size = this.cache.size
        return result
    }

    /**
     * Clear all cache entries
     */
    clear(): void {
        this.cache.clear()
        this.stats = { hits: 0, misses: 0, size: 0 }
    }

    /**
     * Get cache statistics
     */
    getStats(): CacheStats {
        return { ...this.stats }
    }

    /**
     * Get cache hit rate
     */
    getHitRate(): number {
        const total = this.stats.hits + this.stats.misses
        return total === 0 ? 0 : this.stats.hits / total
    }

    /**
     * Evict oldest entry (LRU-like)
     */
    private evictOldest(): void {
        let oldestKey: string | null = null
        let oldestTime = Infinity

        for (const [key, entry] of this.cache.entries()) {
            if (entry.createdAt < oldestTime) {
                oldestTime = entry.createdAt
                oldestKey = key
            }
        }

        if (oldestKey) {
            this.cache.delete(oldestKey)
        }
    }

    /**
     * Clean up expired entries
     */
    cleanup(): number {
        const now = Date.now()
        let removed = 0

        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key)
                removed++
            }
        }

        this.stats.size = this.cache.size
        return removed
    }

    /**
     * Get time until expiration for a key (in ms)
     */
    getTTL(key: string): number | null {
        const entry = this.cache.get(key)
        if (!entry) return null

        const ttl = entry.expiresAt - Date.now()
        return ttl > 0 ? ttl : null
    }
}

// Global cache instances
export const priceCache = new Cache({
    maxSize: 500,
    defaultTTL: 5 * 60 * 1000, // 5 minutes for prices
})

export const productCache = new Cache({
    maxSize: 1000,
    defaultTTL: 15 * 60 * 1000, // 15 minutes for product data
})

// Cleanup expired entries every minute
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        priceCache.cleanup()
        productCache.cleanup()
    }, 60 * 1000)
}
