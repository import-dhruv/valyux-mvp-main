import { TrendingUp, Zap, Award } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Smart Comparison",
    description: "See prices from 50+ retailers instantly",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Latest prices updated every hour",
  },
  {
    icon: Award,
    title: "Trusted Brands",
    description: "From 100+ national & international brands",
  },
]

export function FeaturedSection() {
  return (
    <section className="py-12 sm:py-20 px-4 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
