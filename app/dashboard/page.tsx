// Dashboard page - simplified for MVP (no database needed)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, BarChart3, History } from "lucide-react"

export default async function DashboardPage() {
  // For MVP, no user data needed - comparison works without login
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Valyux</h1>
        <p className="mt-2 text-slate-600">Compare prices and find the best deals across India</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Compare Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Compare up to 5 products side-by-side</p>
              <Link href="/comparison">
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <History className="w-4 h-4" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/search">
              <Button size="sm" className="w-full">
                Start Comparing
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Search Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/search">
              <Button size="sm" className="w-full" variant="outline">
                Search Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>Get started with price comparison</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                1
              </div>
              <div>
                <p className="font-medium">Search for a product</p>
                <p className="text-sm text-slate-600">Use the search bar to find products, flights, or hotels</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                2
              </div>
              <div>
                <p className="font-medium">Compare prices</p>
                <p className="text-sm text-slate-600">See prices from multiple retailers side-by-side</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                3
              </div>
              <div>
                <p className="font-medium">Buy at best price</p>
                <p className="text-sm text-slate-600">Click on any retailer to purchase directly</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
