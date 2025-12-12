"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useComparison } from "@/components/comparison/comparison-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addProduct, canAddMore } = useComparison()
  const minPrice = Math.min(...product.prices.map((p) => p.price))
  const maxPrice = Math.max(...product.prices.map((p) => p.price))
  const savings = maxPrice - minPrice

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (canAddMore()) {
      addProduct(product)
    }
  }

  // Create product URL with name and brand for Perplexity lookup
  const productUrl = `/product/${product.id}?name=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}`

  const handleCardClick = () => {
    router.push(productUrl)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-card rounded-lg border border-border hover:shadow-lg hover:border-primary/50 transition overflow-hidden group cursor-pointer h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 bg-muted overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg"
          }}
        />
        {savings > 0 && (
          <Badge className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-accent text-accent-foreground text-xs lg:text-sm px-2 py-1">
            Save ₹{savings.toLocaleString()}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-3 lg:p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase">{product.brand}</span>
          <div className="flex items-center gap-1">
            <span className="text-xs lg:text-sm font-bold text-foreground">{product.ratings.average}</span>
            <span className="text-yellow-500 text-sm">★</span>
          </div>
        </div>

        <h3 className="font-semibold text-sm lg:text-base text-foreground mb-2 line-clamp-2 group-hover:text-primary transition min-h-[2.5rem] lg:min-h-[3rem]">
          {product.name}
        </h3>

        <p className="text-xs lg:text-sm text-muted-foreground mb-3 lg:mb-4 line-clamp-2 flex-1">{product.description}</p>

        {/* Price Info */}
        <div className="space-y-2 mb-3 lg:mb-4 border-t border-border pt-3 lg:pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Lowest Price</span>
            <span className="text-base lg:text-lg font-bold text-primary">₹{minPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Highest Price</span>
            <span className="text-xs lg:text-sm text-muted-foreground">₹{maxPrice.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">{product.prices.length} retailers compared</p>
        </div>

        {/* Button */}
        <button
          onClick={handleCompare}
          disabled={!canAddMore()}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition text-sm lg:text-base"
        >
          Compare Prices
        </button>
      </div>
    </div>
  )
}
