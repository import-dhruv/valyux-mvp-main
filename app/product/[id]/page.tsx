import { ProductDetail } from "@/components/product/product-detail"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BottomNav } from "@/components/layout/bottom-nav"
import { notFound } from "next/navigation"
import type { Product } from "@/lib/types"
import { getProductById, getProductByName } from "@/lib/mock-products"
import { getProductWithPrices } from "@/lib/price-sync-service"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    name?: string
    brand?: string
  }>
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { id } = await params
  const { name, brand } = await searchParams

  let product: Product | undefined

  // Try to fetch real-time prices if name is provided
  /* 
  // Disable real-time fetch to use verified static data
  if (name) {
    try {
      const result = await getProductWithPrices(name, brand)
      if (result?.product) {
        product = result.product
      }
    } catch (error) {
      console.error('Error fetching real-time prices:', error)
    }
  }
  */

  // Fallback to mock data if real-time fetch fails
  if (!product && id) {
    product = getProductById(id)
  }

  // If still no product, try name/brand from mock data
  if (!product && name) {
    product = getProductByName(name, brand)
  }

  // If still no product, show 404
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <ProductDetail product={product} />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
