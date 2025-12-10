import Link from "next/link"
import { Smartphone, Shirt, Plane, Hotel } from "lucide-react"

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Phones, Laptops, Headphones",
    icon: Smartphone,
    color: "from-blue-500 to-blue-600",
    href: "/electronics",
    stats: "2,500+ products",
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Fashion, Footwear, Accessories",
    icon: Shirt,
    color: "from-purple-500 to-purple-600",
    href: "/clothing",
    stats: "5,000+ products",
  },
  {
    id: "flights",
    name: "Flights",
    description: "Domestic & International",
    icon: Plane,
    color: "from-orange-500 to-orange-600",
    href: "/flights",
    stats: "7 Major Airlines",
  },
  {
    id: "hotels",
    name: "Hotels",
    description: "Budget to Luxury",
    icon: Hotel,
    color: "from-green-500 to-green-600",
    href: "/hotels",
    stats: "10,000+ Hotels",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-12 sm:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">Explore our comprehensive collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-card rounded-xl p-6 hover:shadow-lg transition duration-300 border border-border hover:border-primary/50 cursor-pointer"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent">{category.stats}</span>
                  <span className="text-primary font-bold group-hover:translate-x-1 transition">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
