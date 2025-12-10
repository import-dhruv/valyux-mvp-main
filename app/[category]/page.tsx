import { SearchPageClient } from "@/components/search/search-page"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  return <SearchPageClient initialCategory={category} />
}
