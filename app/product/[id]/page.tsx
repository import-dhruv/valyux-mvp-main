import { ProductDetail } from "@/components/product/product-detail"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BottomNav } from "@/components/layout/bottom-nav"
import { notFound } from "next/navigation"
import type { Product } from "@/lib/types"
import { getProductById, getProductByName } from "@/lib/mock-products"

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

  // Get product from mock data
  let product: Product | undefined

  // Try to fetch by ID first
  if (id) {
    product = getProductById(id)
  }

  // If no product found by ID, try name/brand
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetail product={product} />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
