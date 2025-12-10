import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { HeroSection } from "@/components/home/hero-section"
import { CategoryGrid } from "@/components/home/category-grid"
import { FeaturedSection } from "@/components/home/featured-section"
import { TrendingSection } from "@/components/home/trending-section"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FeaturedSection />
      <TrendingSection />
      <Footer />
      <BottomNav />
    </div>
  )
}
