"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveSearchQuery(
  query: string,
  category?: string,
  filters?: Record<string, any>,
  resultsCount?: number,
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Save search history (anonymous or authenticated)
    const { error } = await supabase.from("search_history").insert({
      user_id: user?.id || null,
      query,
      category,
      filters,
      results_count: resultsCount,
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error saving search:", error)
    return { success: false }
  }
}

export async function getSearchHistory() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: [], error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("search_history")
      .select("query, category")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error

    // Get unique queries
    const uniqueQueries = Array.from(new Map(data.map((item: any) => [item.query, item])).values())

    return { data: uniqueQueries, error: null }
  } catch (error) {
    console.error("Error fetching search history:", error)
    return { data: [], error: "Failed to fetch search history" }
  }
}

export async function clearSearchHistory() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const { error } = await supabase.from("search_history").delete().eq("user_id", user.id)

    if (error) throw error

    revalidatePath("/search")
    return { success: true }
  } catch (error) {
    console.error("Error clearing search history:", error)
    return { error: "Failed to clear search history" }
  }
}
