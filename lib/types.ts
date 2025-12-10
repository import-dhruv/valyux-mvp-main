// Product types for price comparison
export interface Product {
  id: string
  name: string
  category: "electronics" | "clothing" | "flights" | "hotels"
  brand: string
  description: string
  image: string
  specifications: Record<string, string>
  prices: PriceOption[]
  ratings: {
    average: number
    count: number
  }
  tags: string[]
}

export interface PriceOption {
  retailer: string
  price: number
  currency: string
  url: string
  availability: "in_stock" | "out_of_stock" | "limited"
}

export interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  ratings: number
  specifications: Record<string, string[]>
}

export interface SearchParams {
  query: string
  category: string
  page: number
  limit: number
  sort: "price_low" | "price_high" | "rating" | "newest"
  filters: FilterOptions
}
