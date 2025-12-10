"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addReview(productId: string, rating: number, title: string, content: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    if (rating < 1 || rating > 5) {
      return { data: null, error: "Rating must be between 1 and 5" }
    }

    const { data, error } = await supabase.from("reviews").insert({
      user_id: user.id,
      product_id: productId,
      rating,
      title,
      content,
    })

    if (error) throw error

    revalidatePath(`/product/${productId}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error adding review:", error)
    return { data: null, error: "Failed to add review" }
  }
}

export async function getProductReviews(productId: string, limit = 10) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        id,
        rating,
        title,
        content,
        helpful_count,
        created_at,
        profiles(first_name, last_name)
      `,
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return { data: [], error: "Failed to fetch reviews" }
  }
}

export async function updateReview(reviewId: string, updates: { rating?: number; title?: string; content?: string }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("reviews")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reviewId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Error updating review:", error)
    return { data: null, error: "Failed to update review" }
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const { error } = await supabase.from("reviews").delete().eq("id", reviewId).eq("user_id", user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error deleting review:", error)
    return { error: "Failed to delete review" }
  }
}
