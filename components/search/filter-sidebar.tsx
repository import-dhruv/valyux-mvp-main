"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"

interface FilterSidebarProps {
  brands: string[]
  maxPrice: number
  onFilterChange: (filters: any) => void
  category: string
}

export function FilterSidebar({ brands, maxPrice, onFilterChange, category }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    brand: true,
    rating: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    onFilterChange({ priceRange: value, brands: selectedBrands, minRating })
  }

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    setSelectedBrands(newBrands)
    onFilterChange({ priceRange, brands: newBrands, minRating })
  }

  const handleRatingChange = (rating: number) => {
    setMinRating(rating)
    onFilterChange({ priceRange, brands: selectedBrands, minRating: rating })
  }

  const handleReset = () => {
    setPriceRange([0, maxPrice])
    setSelectedBrands([])
    setMinRating(0)
    onFilterChange({ priceRange: [0, maxPrice], brands: [], minRating: 0 })
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-20 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground">Filters</h3>
        <button onClick={handleReset} className="text-sm text-accent hover:text-accent/80 transition">
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-4 font-semibold text-foreground hover:text-primary transition"
        >
          Price Range
          <ChevronDown className={`w-4 h-4 transition ${expandedSections.price ? "" : "-rotate-90"}`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={maxPrice}
              step={1000}
              className="w-full"
            />
            <div className="flex gap-4 text-sm">
              <div className="flex-1">
                <label className="block text-muted-foreground mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  readOnly
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
                />
              </div>
              <div className="flex-1">
                <label className="block text-muted-foreground mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  readOnly
                  className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("brand")}
          className="flex items-center justify-between w-full mb-4 font-semibold text-foreground hover:text-primary transition"
        >
          Brands
          <ChevronDown className={`w-4 h-4 transition ${expandedSections.brand ? "" : "-rotate-90"}`} />
        </button>
        {expandedSections.brand && (
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4"
                />
                <label htmlFor={brand} className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full mb-4 font-semibold text-foreground hover:text-primary transition"
        >
          Minimum Rating
          <ChevronDown className={`w-4 h-4 transition ${expandedSections.rating ? "" : "-rotate-90"}`} />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {[0, 3, 3.5, 4, 4.5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition ${minRating === rating
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
              >
                {rating === 0 ? "All Ratings" : `${rating}+ stars`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
