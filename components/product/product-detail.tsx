"use client"

import { ExternalLink, ShoppingCart, TrendingDown, Star, Check } from "lucide-react"
import type { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const minPrice = Math.min(...product.prices.map((p) => p.price))
  const maxPrice = Math.max(...product.prices.map((p) => p.price))
  const savings = maxPrice - minPrice

  // Sort prices by lowest first
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price)

  // Handle redirect to retailer
  const handleBuyNow = (url: string, retailer: string) => {
    // Track click (you can add analytics here)
    console.log(`Redirecting to ${retailer}:`, url)

    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Image */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {savings > 0 && (
            <Badge className="absolute top-4 right-4 bg-green-600 text-white text-lg px-4 py-2">
              <TrendingDown className="w-5 h-5 mr-2" />
              Save ₹{savings.toLocaleString()}
            </Badge>
          )}
        </div>

        {/* Specifications */}
        {Object.keys(product.specifications || {}).length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-sm text-muted-foreground">{key}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Details & Prices */}
      <div className="space-y-6">
        {/* Product Info */}
        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded">
              <span className="font-bold">{product.ratings.average}</span>
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm text-muted-foreground">
              {product.ratings.count.toLocaleString()} ratings
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Price Comparison Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Compare Prices</h2>
            <Badge variant="outline" className="text-sm">
              {product.prices.length} retailers
            </Badge>
          </div>

          {/* Best Price Highlight */}
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Best Price</p>
                <p className="text-3xl font-bold text-primary">₹{minPrice.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">at {sortedPrices[0].retailer}</p>
              </div>
              <button
                onClick={() => handleBuyNow(sortedPrices[0].url, sortedPrices[0].retailer)}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* All Retailer Prices */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground mb-4">All Prices</h3>
            {sortedPrices.map((price, index) => {
              const isBestPrice = index === 0
              const priceDiff = price.price - minPrice

              return (
                <div
                  key={`${price.retailer}-${index}`}
                  className={`flex items-center justify-between p-4 rounded-lg border transition hover:shadow-md ${isBestPrice
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                    }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{price.retailer}</p>
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
                      <p className="text-2xl font-bold text-foreground">₹{price.price.toLocaleString()}</p>
                      {priceDiff > 0 && (
                        <p className="text-sm text-red-600">+₹{priceDiff.toLocaleString()}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyNow(price.url, price.retailer)}
                    disabled={price.availability === "out_of_stock"}
                    className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${price.availability === "out_of_stock"
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
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Savings Info */}
          {savings > 0 && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-semibold text-green-800 dark:text-green-400">
                💰 You can save up to ₹{savings.toLocaleString()} by choosing the best price!
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Clicking "Go to Store" will redirect you to the retailer's website to complete your purchase.
          </p>
        </div>
      </div>
    </div>
  )
}
