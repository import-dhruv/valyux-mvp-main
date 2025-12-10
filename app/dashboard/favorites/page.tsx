import { getFavorites } from "@/lib/actions/user"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/search/product-card"

export default async function FavoritesPage() {
  const { data: favorites } = await getFavorites()

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Products</h1>
        <p className="mt-2 text-slate-600">Your collection of favorite products for easy access</p>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No saved products yet</p>
              <a href="/search" className="text-blue-600 hover:underline">
                Start exploring products
              </a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite: any) => (
            <ProductCard key={favorite.id} product={favorite.products} />
          ))}
        </div>
      )}
    </div>
  )
}
