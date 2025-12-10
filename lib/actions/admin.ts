"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function checkAdminStatus() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { isAdmin: false }
    }

    const { data: profile, error } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (error) throw error
    return { isAdmin: profile?.is_admin ?? false }
  } catch (error) {
    console.error("Error checking admin status:", error)
    return { isAdmin: false }
  }
}

export async function addProduct(productData: {
  name: string
  category: string
  brand: string
  description?: string
  image_url?: string
  base_price: number
  availability?: string
}) {
  try {
    const supabase = await createClient()
    const { isAdmin } = await checkAdminStatus()

    if (!isAdmin) {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase.from("products").insert(productData).select().single()

    if (error) throw error

    revalidatePath("/admin/products")
    return { data, error: null }
  } catch (error) {
    console.error("Error adding product:", error)
    return { data: null, error: "Failed to add product" }
  }
}

export async function updateProduct(productId: string, updates: Partial<any>) {
  try {
    const supabase = await createClient()
    const { isAdmin } = await checkAdminStatus()

    if (!isAdmin) {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin/products")
    return { data, error: null }
  } catch (error) {
    console.error("Error updating product:", error)
    return { data: null, error: "Failed to update product" }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const supabase = await createClient()
    const { isAdmin } = await checkAdminStatus()

    if (!isAdmin) {
      return { error: "Unauthorized" }
    }

    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) throw error

    revalidatePath("/admin/products")
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { error: "Failed to delete product" }
  }
}

export async function addProductPrice(priceData: {
  product_id: string
  retailer_id: string
  price: number
  currency?: string
  in_stock?: boolean
  url?: string
}) {
  try {
    const supabase = await createClient()
    const { isAdmin } = await checkAdminStatus()

    if (!isAdmin) {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase.from("product_prices").upsert(priceData).select().single()

    if (error) throw error

    revalidatePath("/admin/prices")
    return { data, error: null }
  } catch (error) {
    console.error("Error adding product price:", error)
    return { data: null, error: "Failed to add product price" }
  }
}

export async function getAdminStats() {
  try {
    const supabase = await createClient()
    const { isAdmin } = await checkAdminStatus()

    if (!isAdmin) {
      return { stats: null, error: "Unauthorized" }
    }

    const [{ count: productCount }, { count: userCount }, { count: reviewCount }, { count: comparisonCount }] =
      await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("reviews").select("*", { count: "exact", head: true }),
        supabase.from("comparisons").select("*", { count: "exact", head: true }),
      ])

    return {
      stats: {
        productCount,
        userCount,
        reviewCount,
        comparisonCount,
      },
      error: null,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return { stats: null, error: "Failed to fetch stats" }
  }
}
