import { getAdminStats } from "@/lib/actions/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, ShoppingBag, MessageSquare } from "lucide-react"

export default async function AdminDashboard() {
  const { stats } = await getAdminStats()

  const statCards = [
    {
      label: "Total Products",
      value: stats?.productCount || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      label: "Total Users",
      value: stats?.userCount || 0,
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Total Reviews",
      value: stats?.reviewCount || 0,
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      label: "Comparisons Made",
      value: stats?.comparisonCount || 0,
      icon: BarChart,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">Manage products, prices, and platform data</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access common admin tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <a
            href="/admin/products"
            className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
          >
            <h3 className="font-semibold text-slate-900">Manage Products</h3>
            <p className="mt-1 text-sm text-slate-600">Add, edit, or remove products</p>
          </a>
          <a
            href="/admin/prices"
            className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
          >
            <h3 className="font-semibold text-slate-900">Update Prices</h3>
            <p className="mt-1 text-sm text-slate-600">Manage product pricing</p>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
