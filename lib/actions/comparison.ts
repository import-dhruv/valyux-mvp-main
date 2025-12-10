"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveComparison(productIds: string[], category?: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase.from("comparisons").insert({
      user_id: user.id,
      product_ids: productIds,
      category,
    })

    if (error) throw error

    revalidatePath("/dashboard/comparisons")
    return { data, error: null }
  } catch (error) {
    console.error("Error saving comparison:", error)
    return { data: null, error: "Failed to save comparison" }
  }
}

export async function getComparisons() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: [], error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("comparisons")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching comparisons:", error)
    return { data: [], error: "Failed to fetch comparisons" }
  }
}

export async function deleteComparison(comparisonId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const { error } = await supabase.from("comparisons").delete().eq("id", comparisonId).eq("user_id", user.id)

    if (error) throw error

    revalidatePath("/dashboard/comparisons")
    return { success: true }
  } catch (error) {
    console.error("Error deleting comparison:", error)
    return { error: "Failed to delete comparison" }
  }
}

export async function createPriceAlert(productId: string, targetPrice: number) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase.from("price_alerts").insert({
      user_id: user.id,
      product_id: productId,
      target_price: targetPrice,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Error creating price alert:", error)
    return { data: null, error: "Failed to create price alert" }
  }
}

export async function getPriceAlerts() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: [], error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("price_alerts")
      .select(
        `
        id,
        target_price,
        is_active,
        triggered_at,
        products(id, name, brand, image_url, base_price)
      `,
      )
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching price alerts:", error)
    return { data: [], error: "Failed to fetch price alerts" }
  }
}

export async function deletePriceAlert(alertId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const { error } = await supabase.from("price_alerts").delete().eq("id", alertId).eq("user_id", user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error deleting price alert:", error)
    return { error: "Failed to delete price alert" }
  }
}
