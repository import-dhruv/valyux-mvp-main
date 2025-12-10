"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Footer } from "@/components/layout/footer"
import { FilterSidebar } from "./filter-sidebar"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"
import { ChevronDown, Loader2 } from "lucide-react"

interface SearchPageClientProps {
  initialCategory?: string
}

export function SearchPageClient({ initialCategory = "" }: SearchPageClientProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = initialCategory || searchParams.get("category") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    priceRange: [0, 500000], // Increased to accommodate all products
    brands: [] as string[],
    minRating: 0,
  })

  // Search products using Perplexity API
  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setProducts([])
        setFilteredProducts([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/perplexity/search?q=${encodeURIComponent(query)}${category ? `&category=${category}` : ""}&limit=20`
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to search products")
        }

        // Transform Perplexity response to Product type
        const transformedProducts: Product[] = data.data.map((p: any) => ({
          id: p.id || `prod-${Date.now()}-${Math.random()}`,
          name: p.name,
          category: p.category || "electronics",
          brand: p.brand || "Unknown",
          description: p.description || "",
          image: p.image || "/placeholder.svg",
          specifications: p.specifications || {},
          prices: p.prices || [],
          ratings: p.ratings || { average: 0, count: 0 },
          tags: [],
        }))

        setProducts(transformedProducts)
      } catch (err) {
        console.error("Search error:", err)
        setError(err instanceof Error ? err.message : "Failed to search products")
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    searchProducts()
  }, [query, category])

  useEffect(() => {
    // Filter products
    let filtered = products.filter((product) => {
      const minPrice = Math.min(...product.prices.map((p) => p.price), product.prices[0]?.price || 0)
      const maxPrice = Math.max(...product.prices.map((p) => p.price), product.prices[0]?.price || 0)

      const passesPrice = minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
      const passesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const passesRating = product.ratings.average >= filters.minRating

      return passesPrice && passesBrand && passesRating
    })

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      const aMinPrice = Math.min(...a.prices.map((p) => p.price), 0)
      const bMinPrice = Math.min(...b.prices.map((p) => p.price), 0)

      switch (sortBy) {
        case "price_low":
          return aMinPrice - bMinPrice
        case "price_high":
          return bMinPrice - aMinPrice
        case "rating":
          return b.ratings.average - a.ratings.average
        case "newest":
          return 0 // Default order
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, filters, sortBy])

  const brands = [...new Set(products.map((p) => p.brand))]
  const maxPrice = Math.max(...products.flatMap((p) => p.prices.map((pr) => pr.price)), 500000)

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "Search Results"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block">
            <FilterSidebar brands={brands} maxPrice={maxPrice} onFilterChange={setFilters} category={category} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <span className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Sort by:</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 bg-card border border-border rounded-lg text-foreground pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">Searching for products...</p>
                <p className="text-sm text-muted-foreground mt-2">Finding best prices from retailers</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-lg text-destructive mb-2">{error}</p>
                <p className="text-sm text-muted-foreground">Please try again or search for a different product</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
                <button
                  onClick={() => setFilters({ priceRange: [0, 500000], brands: [], minRating: 0 })}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Enter a product name to start searching</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}
