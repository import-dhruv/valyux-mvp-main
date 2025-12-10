// Component to display AI-powered recommendations
// Fetches and displays personalized product recommendations

"use client"

import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface Recommendation {
  product_type: string
  reason: string
  category: string
  expected_price_range: string
  product: any
}

export function AIRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/ai/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, limit: 5 }),
        })

        const data = await response.json()
        setRecommendations(data.recommendations || [])
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [user])

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>Personalized for you based on your searches</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <Link
                key={idx}
                href={`/product/${rec.product?.id}`}
                className="block p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <p className="font-semibold">{rec.product?.name}</p>
                <p className="text-sm text-gray-600">{rec.reason}</p>
                <p className="text-sm font-medium text-primary">{rec.expected_price_range}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recommendations yet. Start searching!</p>
        )}
      </CardContent>
    </Card>
  )
}
