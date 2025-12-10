"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserProfile() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) throw error
    return { data: profile, error: null }
  } catch (error) {
    console.error("Error fetching profile:", error)
    return { data: null, error: "Failed to fetch profile" }
  }
}

export async function updateUserProfile(updates: {
  first_name?: string
  last_name?: string
  phone?: string
  city?: string
  avatar_url?: string
}) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/dashboard/profile")
    return { data, error: null }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { data: null, error: "Failed to update profile" }
  }
}

export async function addToFavorites(productId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase.from("favorites").insert({
      user_id: user.id,
      product_id: productId,
    })

    if (error && error.code !== "23505") throw error // 23505 is duplicate key error

    revalidatePath("/dashboard/favorites")
    return { data, error: null }
  } catch (error) {
    console.error("Error adding to favorites:", error)
    return { data: null, error: "Failed to add to favorites" }
  }
}

export async function removeFromFavorites(productId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId)

    if (error) throw error

    revalidatePath("/dashboard/favorites")
    return { data, error: null }
  } catch (error) {
    console.error("Error removing from favorites:", error)
    return { data: null, error: "Failed to remove from favorites" }
  }
}

export async function getFavorites() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: [], error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("favorites")
      .select(
        `
        id,
        product_id,
        products(id, name, brand, image_url, base_price, category, rating)
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return { data: [], error: "Failed to fetch favorites" }
  }
}

export async function isFavorite(productId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { isFavorite: false }
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single()

    if (error && error.code === "PGRST116") {
      // Not found
      return { isFavorite: false }
    }

    return { isFavorite: !!data }
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return { isFavorite: false }
  }
}
