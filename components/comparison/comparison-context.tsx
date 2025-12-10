"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Product } from "@/lib/types"

interface ComparisonContextType {
  selectedProducts: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  clearComparison: () => void
  canAddMore: () => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const addProduct = useCallback((product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) return prev
      if (prev.length >= 5) return prev
      return [...prev, product]
    })
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearComparison = useCallback(() => {
    setSelectedProducts([])
  }, [])

  const canAddMore = useCallback(() => {
    return selectedProducts.length < 5
  }, [selectedProducts.length])

  return (
    <ComparisonContext.Provider value={{ selectedProducts, addProduct, removeProduct, clearComparison, canAddMore }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider")
  }
  return context
}
