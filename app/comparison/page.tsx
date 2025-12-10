import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Footer } from "@/components/layout/footer"
import { ComparisonTable } from "@/components/comparison/comparison-table"

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComparisonTable />
      </div>
      <Footer />
      <BottomNav />
    </div>
  )
}
