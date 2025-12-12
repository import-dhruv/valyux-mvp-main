"use client"

import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/mock-products"
import Link from "next/link"

export function TrendingSection() {
  // Get featured products from mock data
  const featuredProducts = getFeaturedProducts(4)

  return (
    <section className="py-12 sm:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Trending Now</h2>
          <p className="text-muted-foreground text-lg">Most compared products this week</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const lowestPrice = Math.min(...product.prices.map(p => p.price))
            const highestPrice = Math.max(...product.prices.map(p => p.price))
            const savings = highestPrice - lowestPrice

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}?name=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}`}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg hover:border-primary/50 transition cursor-pointer group h-full flex flex-col"
              >
                <div className="relative h-40 bg-muted overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  {product.category === 'flights' ? (
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                      {product.prices.length} Airlines
                    </Badge>
                  ) : product.category === 'hotels' ? (
                    <Badge className="absolute top-2 right-2 bg-purple-600 text-white">
                      {product.prices.length} Platforms
                    </Badge>
                  ) : (
                    savings > 0 && (
                      <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                        Save ₹{savings.toLocaleString()}
                      </Badge>
                    )
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase">{product.category}</p>
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition">
                    {product.name}
                  </h3>
                  <div className="space-y-1 mb-4 flex-1">
                    {product.category === 'flights' ? (
                      // For flights, show starting price
                      <>
                        <p className="text-sm text-muted-foreground">
                          Starting from
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          ₹{lowestPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          View all airlines
                        </p>
                      </>
                    ) : product.category === 'hotels' ? (
                      // For hotels, show per-night average pricing
                      <>
                        <p className="text-sm text-muted-foreground">
                          From per night
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          ₹{lowestPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Compare {product.prices.length} platforms
                        </p>
                      </>
                    ) : (
                      // For other products, show lowest/highest comparison
                      <>
                        <p className="text-sm text-muted-foreground">
                          Lowest: <span className="font-bold text-foreground">₹{lowestPrice.toLocaleString()}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Highest: <span className="font-bold text-foreground">₹{highestPrice.toLocaleString()}</span>
                        </p>
                      </>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      ⭐ {product.ratings.average} ({product.ratings.count} reviews)
                    </p>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition text-sm mt-auto">
                    {product.category === 'flights' ? 'View Flights' : product.category === 'hotels' ? 'View Hotels' : 'Compare Prices'}
                  </button>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
