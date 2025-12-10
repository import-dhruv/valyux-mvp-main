"use client"

import { useComparison } from "./comparison-context"
import { X, ExternalLink, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ComparisonTable() {
  const { selectedProducts, removeProduct, clearComparison } = useComparison()

  if (selectedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground mb-4">No products selected for comparison</p>
        <Link href="/electronics">
          <Button>Start Comparing</Button>
        </Link>
      </div>
    )
  }

  // Get all unique specification keys
  const allSpecKeys = new Set<string>()
  selectedProducts.forEach((p) => {
    Object.keys(p.specifications).forEach((key) => allSpecKeys.add(key))
  })
  const specKeys = Array.from(allSpecKeys)

  return (
    <div className="space-y-6">
      {/* Valyux Branding Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <img
            src="/valyux-logo.png"
            alt="Valyux Logo"
            className="h-16 w-16 object-contain"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-1">Valyux</h1>
            <p className="text-lg italic">"smarter shopping starts here!"</p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Comparing {selectedProducts.length} Products</h2>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={clearComparison}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto bg-card rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-4 text-left font-semibold text-foreground min-w-48 sticky left-0 bg-muted z-10">
                Specifications
              </th>
              {selectedProducts.map((product) => (
                <th
                  key={product.id}
                  className="px-6 py-4 text-center font-semibold text-foreground min-w-56 relative group"
                >
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-destructive/10 rounded transition opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                  <Link href={`/product/${product.id}?name=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}`}>
                    <div className="pr-8">
                      <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                      <p className="font-bold text-foreground line-clamp-2 hover:text-primary transition">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs font-semibold">{product.ratings.average}</span>
                        <span className="text-xs text-muted-foreground">({product.ratings.count})</span>
                      </div>
                    </div>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price Row */}
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="px-6 py-4 font-semibold text-foreground sticky left-0 bg-card z-10">Price Range</td>
              {selectedProducts.map((product) => {
                const prices = product.prices.map((p) => p.price)
                const minPrice = Math.min(...prices)
                const maxPrice = Math.max(...prices)
                return (
                  <td key={product.id} className="px-6 py-4 text-center">
                    <div className="bg-success/10 rounded-lg p-4">
                      <p className="text-2xl font-bold text-success mb-1">₹{minPrice.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">to ₹{maxPrice.toLocaleString()}</p>
                    </div>
                  </td>
                )
              })}
            </tr>

            {/* Retailers Row */}
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="px-6 py-4 font-semibold text-foreground sticky left-0 bg-card z-10">Retailers</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="px-6 py-4">
                  <div className="space-y-2">
                    {product.prices.map((priceOption, idx) => (
                      <a
                        key={idx}
                        href={priceOption.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                            {priceOption.retailer}
                          </p>
                          <p className="text-xs text-muted-foreground">₹{priceOption.price.toLocaleString()}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                      </a>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Specifications */}
            {specKeys.map((key) => (
              <tr key={key} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold text-foreground sticky left-0 bg-card z-10 capitalize">
                  {key.replace(/_/g, " ")}
                </td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    <p className="text-sm text-foreground">{product.specifications[key] || "-"}</p>
                  </td>
                ))}
              </tr>
            ))}

            {/* Availability */}
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="px-6 py-4 font-semibold text-foreground sticky left-0 bg-card z-10">Availability</td>
              {selectedProducts.map((product) => {
                const inStock = product.prices.filter((p) => p.availability === "in_stock").length
                const total = product.prices.length
                return (
                  <td key={product.id} className="px-6 py-4 text-center">
                    <Badge
                      className={
                        inStock === total ? "bg-success text-success-foreground" : "bg-accent text-accent-foreground"
                      }
                    >
                      {inStock}/{total} retailers in stock
                    </Badge>
                  </td>
                )
              })}
            </tr>

            {/* CTA Row */}
            <tr className="bg-muted/50">
              <td className="px-6 py-4 sticky left-0 bg-muted/50 z-10"></td>
              {selectedProducts.map((product) => {
                const minPrice = Math.min(...product.prices.map((p) => p.price))
                const bestDeal = product.prices.find((p) => p.price === minPrice)
                return (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {bestDeal?.url ? (
                      <a
                        href={bestDeal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                      >
                        Buy at {bestDeal.retailer}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">No link available</span>
                    )}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <p className="text-sm font-semibold text-foreground mb-3">How to use:</p>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Compare up to 5 products side by side</li>
          <li>• View prices from multiple retailers</li>
          <li>• Click on retailer links to buy directly</li>
          <li>• Remove products by clicking the X button</li>
        </ul>
      </div>
    </div>
  )
}
