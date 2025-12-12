// Mock product data with 4 demo products with REAL URLs

export interface ProductPrice {
    retailer: string
    price: number
    currency: string
    url: string
    availability: "in_stock" | "out_of_stock" | "limited"
}

export interface Product {
    id: string
    name: string
    brand: string
    category: "electronics" | "clothing" | "flights" | "hotels"
    description: string
    image: string
    prices: ProductPrice[]
    ratings: {
        average: number
        count: number
    }
    specifications: Record<string, string>
    tags: string[]
}

export const mockProducts: Product[] = [
    {
        id: "demo-electronics-001",
        name: "iPhone 15 Pro 256GB - Blue Titanium",
        brand: "Apple",
        category: "electronics",
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced 48MP camera system",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845699311",
        prices: [
            { retailer: "Amazon India", price: 109999, currency: "INR", url: "https://www.amazon.in/s?k=Apple+iPhone+15+Pro+256GB+Blue+Titanium", availability: "in_stock" },
            { retailer: "Flipkart", price: 110000, currency: "INR", url: "https://www.flipkart.com/search?q=apple%20iphone%2015%20pro%20blue%20titanium%20256%20gb", availability: "in_stock" },
            { retailer: "Croma", price: 119900, currency: "INR", url: "https://www.croma.com/search/?text=apple%20iphone%2015%20pro%20256gb%20blue%20titanium", availability: "in_stock" }
        ],
        ratings: { average: 4.7, count: 2847 },
        specifications: {
            "Storage": "256GB",
            "RAM": "8GB",
            "Display": "6.1-inch Super Retina XDR",
            "Processor": "A17 Pro",
            "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
        },
        tags: ["smartphone", "apple", "iphone", "electronics"]
    },
    {
        id: "demo-clothing-001",
        name: "Nike Air Max 270 - Black/White",
        brand: "Nike",
        category: "clothing",
        description: "Iconic sneakers with visible Air cushioning and modern style",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-shoes-KkLcGR.png",
        prices: [
            { retailer: "Myntra", price: 11196, currency: "INR", url: "https://www.myntra.com/nike-air-max-270", availability: "in_stock" },
            { retailer: "Amazon India", price: 13995, currency: "INR", url: "https://www.amazon.in/s?k=Nike+Air+Max+270+Black", availability: "in_stock" },
            { retailer: "Ajio", price: 13995, currency: "INR", url: "https://www.ajio.com/search/?text=Nike%20Air%20Max%20270", availability: "in_stock" }
        ],
        ratings: { average: 4.5, count: 2341 },
        specifications: {
            "Size": "UK 9",
            "Material": "Mesh + Synthetic",
            "Sole": "Rubber with Air Max cushioning",
            "Color": "Black/White"
        },
        tags: ["shoes", "nike", "sneakers", "clothing"]
    },
    {
        id: "demo-flight-001",
        name: "Delhi to Mumbai - IndiGo 6E 2012",
        brand: "IndiGo",
        category: "flights",
        description: "Non-stop flight from Delhi to Mumbai, 2h 15m duration, morning departure",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop",
        prices: [
            { retailer: "MakeMyTrip", price: 4599, currency: "INR", url: "https://www.makemytrip.com/flight/search?from=DEL&to=BOM&depart_date=2025-12-20&adults=1&class=E", availability: "in_stock" },
            { retailer: "Cleartrip", price: 4499, currency: "INR", url: "https://www.cleartrip.com/flights/results?from=DEL&to=BOM&depart_date=20/12/2025&adults=1&class=Economy", availability: "in_stock" },
            { retailer: "Goibibo", price: 4650, currency: "INR", url: "https://www.goibibo.com/flights/air-DEL-BOM-20251220-6E-2012/", availability: "in_stock" }
        ],
        ratings: { average: 4.3, count: 8934 },
        specifications: {
            "Route": "DEL → BOM",
            "Flight": "6E 2012",
            "Duration": "2h 15m",
            "Departure": "06:00 AM",
            "Class": "Economy"
        },
        tags: ["flight", "travel", "indigo", "delhi", "mumbai"]
    },
    {
        id: "demo-hotel-001",
        name: "The Taj Mahal Palace, Mumbai - Deluxe Room",
        brand: "Taj Hotels",
        category: "hotels",
        description: "Iconic luxury hotel overlooking the Gateway of India with world-class amenities",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Booking.com", price: 25000, currency: "INR", url: "https://www.booking.com/hotel/in/the-taj-mahal-palace-mumbai.html", availability: "in_stock" },
            { retailer: "MakeMyTrip", price: 26000, currency: "INR", url: "https://www.makemytrip.com/hotels/taj_mahal_palace-details-mumbai.html", availability: "in_stock" },
            { retailer: "Agoda", price: 24800, currency: "INR", url: "https://www.agoda.com/the-taj-mahal-palace-mumbai/hotel/mumbai-in.html", availability: "in_stock" }
        ],
        ratings: { average: 4.8, count: 12456 },
        specifications: {
            "Location": "Colaba, Mumbai",
            "Room Type": "Deluxe Room",
            "Amenities": "Pool, Spa, Restaurant, Gym",
            "Check-in": "2:00 PM",
            "Check-out": "12:00 PM"
        },
        tags: ["hotel", "luxury", "mumbai", "travel"]
    },
    {
        id: "demo-clothing-002",
        name: "Nike Air Max 270 - Red",
        brand: "Nike",
        category: "clothing",
        description: "Nike Air Max 270 running shoes in vibrant red color with Air cushioning technology",
        image: "https://assets.ajio.com/medias/sys_master/root/20230621/Wvqr/6492c9c9eebac147fc0f3e7e/-473Wx593H-469763455-red-MODEL.jpg",
        prices: [
            { retailer: "Ajio", price: 10495, currency: "INR", url: "https://www.ajio.com/nike-air-max-270-running-shoes/p/469763455_red", availability: "in_stock" },
            { retailer: "Myntra", price: 11196, currency: "INR", url: "https://www.myntra.com/sports-shoes/nike/nike-air-max-270-mens-shoes/11196/buy", availability: "in_stock" },
            { retailer: "Flipkart", price: 13995, currency: "INR", url: "https://www.flipkart.com/nike-air-max-270-running-shoes-men/p/itmf85fzybpg8hzy", availability: "in_stock" }
        ],
        ratings: { average: 4.6, count: 1876 },
        specifications: {
            "Size": "UK 8-11",
            "Material": "Mesh + Synthetic",
            "Sole": "Rubber with Air Max cushioning",
            "Color": "Red"
        },
        tags: ["shoes", "nike", "sneakers", "clothing", "red", "running"]
    }
]

// Helper functions for searching and filtering
export function searchProducts(query: string, category?: string, limit: number = 20): Product[] {
    const lowerQuery = query.toLowerCase()

    let results = mockProducts.filter(product => {
        const matchesQuery =
            product.name.toLowerCase().includes(lowerQuery) ||
            product.brand.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            Object.values(product.specifications).some(spec =>
                spec.toLowerCase().includes(lowerQuery)
            )

        const matchesCategory = !category || product.category === category

        return matchesQuery && matchesCategory
    })

    return results.slice(0, limit)
}

export function getProductById(id: string): Product | undefined {
    return mockProducts.find(p => p.id === id)
}

export function getProductByName(name: string, brand?: string): Product | undefined {
    return mockProducts.find(p => {
        const nameMatch = p.name.toLowerCase().includes(name.toLowerCase())
        const brandMatch = !brand || p.brand.toLowerCase() === brand.toLowerCase()
        return nameMatch && brandMatch
    })
}

export function getProductsByCategory(category: string): Product[] {
    return mockProducts.filter(p => p.category === category)
}

export function getFeaturedProducts(limit: number = 6): Product[] {
    // Return products with highest ratings
    return [...mockProducts]
        .sort((a, b) => b.ratings.average - a.ratings.average)
        .slice(0, limit)
}

export function getTrendingProducts(limit: number = 8): Product[] {
    // Return products with most reviews
    return [...mockProducts]
        .sort((a, b) => b.ratings.count - a.ratings.count)
        .slice(0, limit)
}
