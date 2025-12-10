// Component to display AI comparison analysis
// Shows pros, cons, and buying recommendations for compared products

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ComparisonProps {
  productIds: string[]
}

export function AIComparisonInsights({ productIds }: ComparisonProps) {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/compare-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds }),
      })

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Error fetching insights:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Comparison Insights</CardTitle>
        <CardDescription>Smart analysis to help you choose</CardDescription>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <Button onClick={fetchInsights} disabled={loading}>
            {loading ? "Analyzing..." : "Get AI Insights"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Best Overall</h4>
              <p className="text-sm text-gray-700">{analysis.best_overall}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Best Value</h4>
              <p className="text-sm text-gray-700">{analysis.best_value}</p>
            </div>
            {analysis.key_differences && (
              <div>
                <h4 className="font-semibold mb-2">Key Differences</h4>
                <p className="text-sm text-gray-700">{analysis.key_differences}</p>
              </div>
            )}
            {analysis.recommendation && (
              <div>
                <h4 className="font-semibold mb-2">Recommendation</h4>
                <p className="text-sm text-gray-700">{analysis.recommendation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
