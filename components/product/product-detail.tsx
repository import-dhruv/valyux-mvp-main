"use client"

import { useState, useEffect } from "react"
import { ExternalLink, ShoppingCart, TrendingDown, Star, Check, RefreshCw, Clock } from "lucide-react"
import type { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductDetailProps {
  product: Product
  initialProduct?: Product
}

export function ProductDetail({ product: initialProduct }: ProductDetailProps) {
  const [product, setProduct] = useState<Product>(initialProduct)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString())
  const [error, setError] = useState<string | null>(null)

  const minPrice = Math.min(...product.prices.map((p) => p.price))
  const maxPrice = Math.max(...product.prices.map((p) => p.price))
  const savings = maxPrice - minPrice

  // Sort prices by lowest first
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price)

  // Auto-refresh prices every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshPrices(false) // Silent refresh
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [product.name, product.brand])

  // Refresh prices from API
  const refreshPrices = async (forceRefresh = true) => {
    setIsRefreshing(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/products/prices/refresh?name=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}&forceRefresh=${forceRefresh}`
      )

      if (!response.ok) {
        throw new Error('Failed to refresh prices')
      }

      const data = await response.json()

      if (data.product) {
        setProduct(data.product)
        setLastUpdated(data.lastUpdated)
      }
    } catch (err) {
      console.error('Error refreshing prices:', err)
      setError('Failed to refresh prices. Please try again.')
    } finally {
      setIsRefreshing(false)
    }
  }

  // Format last updated time
  const formatLastUpdated = () => {
    const date = new Date(lastUpdated)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  // Handle redirect to retailer - direct product page
  const handleBuyNow = (url: string, retailer: string) => {
    console.log(`Opening ${retailer} product page:`, url)
    // Open direct product URL in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {/* Left Column - Image */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {savings > 0 && (
            <Badge className="absolute top-4 right-4 bg-green-600 text-white text-base lg:text-lg px-3 lg:px-4 py-2">
              <TrendingDown className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Save ₹{savings.toLocaleString()}
            </Badge>
          )}
        </div>

        {/* Specifications */}
        {Object.keys(product.specifications || {}).length > 0 && (
          <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-xs lg:text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                  <p className="text-sm lg:text-base font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Details & Prices */}
      <div className="space-y-4 lg:space-y-6">
        {/* Product Info */}
        <div>
          <p className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase mb-2">{product.brand}</p>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded">
              <span className="font-bold text-sm lg:text-base">{product.ratings.average}</span>
              <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
            </div>
            <span className="text-xs lg:text-sm text-muted-foreground">
              {product.ratings.count.toLocaleString()} ratings
            </span>
          </div>

          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Price Comparison Section */}
        <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
          {/* Header with Refresh Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 lg:mb-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-foreground">Compare Prices</h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Updated {formatLastUpdated()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs lg:text-sm">
                {product.prices.length} retailers
              </Badge>
              <Button
                onClick={() => refreshPrices(true)}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Best Price Highlight */}
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-3 lg:p-4 mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground mb-1">Best Price</p>
                <p className="text-2xl lg:text-3xl font-bold text-primary">₹{minPrice.toLocaleString()}</p>
                <p className="text-xs lg:text-sm text-muted-foreground mt-1">at {sortedPrices[0].retailer}</p>
              </div>
              <button
                onClick={() => handleBuyNow(sortedPrices[0].url, sortedPrices[0].retailer)}
                className="bg-primary text-primary-foreground px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 text-sm lg:text-base"
              >
                <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                Buy Now
                <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
            </div>
          </div>

          {/* All Retailer Prices */}
          <div className="space-y-2 lg:space-y-3">
            <h3 className="font-semibold text-foreground mb-3 lg:mb-4 text-sm lg:text-base">All Prices</h3>
            {isRefreshing ? (
              // Loading skeleton
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              sortedPrices.map((price, index) => {
                const isBestPrice = index === 0
                const priceDiff = price.price - minPrice

                return (
                  <div
                    key={`${price.retailer}-${index}`}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 lg:p-4 rounded-lg border transition hover:shadow-md ${isBestPrice
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                      }`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm lg:text-base">{price.retailer}</p>
                        {isBestPrice && (
                          <Badge className="bg-green-600 text-white text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Best Price
                          </Badge>
                        )}
                        {price.availability === "limited" && (
                          <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                            Limited Stock
                          </Badge>
                        )}
                        {price.availability === "out_of_stock" && (
                          <Badge variant="outline" className="text-xs text-red-600 border-red-600">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl lg:text-2xl font-bold text-foreground">₹{price.price.toLocaleString()}</p>
                        {priceDiff > 0 && (
                          <p className="text-xs lg:text-sm text-red-600">+₹{priceDiff.toLocaleString()}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyNow(price.url, price.retailer)}
                      disabled={price.availability === "out_of_stock"}
                      className={`px-4 lg:px-6 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm lg:text-base whitespace-nowrap ${price.availability === "out_of_stock"
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : isBestPrice
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                    >
                      {price.availability === "out_of_stock" ? (
                        "Out of Stock"
                      ) : (
                        <>
                          Go to Store
                          <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )
              })
            )}
          </div>

          {/* Savings Info */}
          {savings > 0 && (
            <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs lg:text-sm font-semibold text-green-800 dark:text-green-400">
                💰 You can save up to ₹{savings.toLocaleString()} by choosing the best price!
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-3 lg:p-4 text-xs lg:text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            Clicking "Go to Store" will redirect you to the retailer's website to complete your purchase.
          </p>
        </div>
      </div>
    </div>
  )
}
