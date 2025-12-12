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
        id: "demo-electronics-iphone17pro",
        name: "Apple iPhone 17 Pro - Cosmic Orange 256GB",
        brand: "Apple",
        category: "electronics",
        description: "Revolutionary iPhone 17 Pro with A18 Pro chip, stunning Cosmic Orange titanium design, and breakthrough camera technology",
        image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&h=800&fit=crop",
        prices: [
            {
                retailer: "Flipkart",
                price: 134900,
                currency: "INR",
                url: "https://www.flipkart.com/apple-iphone-17-pro-cosmic-orange-256-gb/p/itm76fe37ca9ea8c?pid=MOBHFN6YR8HF5BQ9&lid=LSTMOBHFN6YR8HF5BQ9RBYDOE&marketplace=FLIPKART&q=iphone+15+pro+17&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_13_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_13_na_na_na&fm=organic&iid=007abb0b-0132-4e1c-a253-f525f8d390fa.MOBHFN6YR8HF5BQ9.SEARCH&ppt=hp&ppn=homepage&ssid=lwfdan2d000000001765539605575&qH=c24a38c021f35b13",
                availability: "in_stock"
            },
            {
                retailer: "Amazon India",
                price: 132999,
                currency: "INR",
                url: "https://www.amazon.in/iPhone-Pro-256-Promotion-Breakthrough/dp/B0FQG1LPVF/ref=sr_1_1?sr=8-1",
                availability: "in_stock"
            },
            {
                retailer: "Croma",
                price: 134900,
                currency: "INR",
                url: "https://www.croma.com/apple-iphone-17-pro-256gb-cosmic-orange-/p/317417",
                availability: "in_stock"
            }
        ],
        ratings: { average: 4.9, count: 15847 },
        specifications: {
            "Storage": "256GB",
            "RAM": "12GB",
            "Display": "6.3-inch ProMotion LTPO OLED",
            "Processor": "A18 Pro",
            "Camera": "64MP Main + 48MP Ultra Wide + 12MP Telephoto",
            "Color": "Cosmic Orange"
        },
        tags: ["smartphone", "apple", "iphone", "iphone17", "electronics", "trending"]
    },
    {
        id: "demo-electronics-macbook-m4",
        name: "Apple MacBook Air M4 - 16GB/512GB SSD",
        brand: "Apple",
        category: "electronics",
        description: "Revolutionary MacBook Air with M4 chip, 13.6-inch Liquid Retina display, 16GB unified memory, and 512GB SSD. Ultra-thin and powerful.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
        prices: [
            {
                retailer: "Reliance Digital",
                price: 111900,
                currency: "INR",
                url: "https://www.reliancedigital.in/product/apple-mc6u4hna-macbook-air-apple-m4-chip16-gb512-gb-ssdmacos-sequoialiquid-retina-3446-cm-136-inch-sky-blue-m7x80l-8968957",
                availability: "in_stock"
            },
            {
                retailer: "Croma",
                price: 114990,
                currency: "INR",
                url: "https://www.croma.com/apple-macbook-air-13-6-inch-m4-16gb-512gb-macos-silver-/p/314072",
                availability: "in_stock"
            },
            {
                retailer: "Amazon India",
                price: 119900,
                currency: "INR",
                url: "https://www.amazon.in/Apple-MacBook-13-inch-10-core-Unified/dp/B0DZDDKTQZ/ref=sr_1_3?nsdOptOutParam=true&sr=8-3",
                availability: "in_stock"
            },
            {
                retailer: "Flipkart",
                price: 144900,
                currency: "INR",
                url: "https://www.flipkart.com/apple-macbook-air-m4-16-gb-512-gb-ssd-macos-sequoia-mc7c4hn-a/p/itmdb7ee0ce0e128?pid=COMH9ZWQ389TVPJG&lid=LSTCOMH9ZWQ389TVPJGO1QM12&marketplace=FLIPKART&q=macbook+air+m5&store=6bo%2Fb5g&srno=s_1_4&otracker=search&otracker1=search&fm=Search&iid=8b4e6934-6810-4b67-9bb7-4d3c27ae7dcd.COMH9ZWQ389TVPJG.SEARCH&ppt=sp&ppn=sp&ssid=puh3z4847k0000001765544278869&qH=63d10def9d97a2d3",
                availability: "in_stock"
            }
        ],
        ratings: { average: 4.9, count: 8234 },
        specifications: {
            "Processor": "Apple M4 (10-core CPU, 10-core GPU)",
            "RAM": "16GB Unified Memory",
            "Storage": "512GB SSD",
            "Display": "13.6-inch Liquid Retina (2880x1864)",
            "Battery": "Up to 18 hours",
            "Weight": "1.24 kg"
        },
        tags: ["laptop", "apple", "macbook", "m4", "electronics", "trending"]
    },
    {
        id: "demo-flight-trending-001",
        name: "Delhi to Mumbai - December 13, 2025",
        brand: "Multiple Airlines",
        category: "flights",
        description: "Compare best flight prices from Delhi (DEL) to Mumbai (BOM) on December 13, 2025. Economy class, 1 adult. Non-stop flights available with multiple carriers.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=800&fit=crop",
        prices: [
            {
                retailer: "Ixigo",
                price: 9006,
                currency: "INR",
                url: "https://www.ixigo.com/search/result/flight?from=DEL&to=BOM&date=13122025&adults=1&children=0&infants=0&class=e&source=Search+Form",
                availability: "in_stock"
            },
            {
                retailer: "MakeMyTrip",
                price: 9500,
                currency: "INR",
                url: "https://www.makemytrip.com/flight/search?itinerary=DEL-BOM-13/12/2025&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&lang=eng",
                availability: "in_stock"
            },
            {
                retailer: "Goibibo",
                price: 9650,
                currency: "INR",
                url: "https://www.goibibo.com/flight/search?itinerary=DEL-BOM-13/12/2025&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&lang=eng",
                availability: "in_stock"
            },
            {
                retailer: "EaseMyTrip",
                price: 9300,
                currency: "INR",
                url: "https://flight.easemytrip.us/FlightList/Index?srch=DEL-Delhi-India|BOM-Mumbai-India|13/12/2025&px=1-0-0&cbn=0&ar=undefined&isow=true&isdm=true&lang=en-us&&IsDoubleSeat=false&CCODE=US&curr=USD&apptype=B2C",
                availability: "in_stock"
            }
        ],
        ratings: { average: 4.8, count: 12456 },
        specifications: {
            "Route": "DEL → BOM",
            "Date": "December 13, 2025",
            "Duration": "~2h 15m",
            "Passengers": "1 Adult",
            "Class": "Economy",
            "Type": "One-way"
        },
        tags: ["flight", "travel", "delhi", "mumbai", "trending", "domestic"]
    },
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
        description: "Iconic luxury hotel overlooking the Gateway of India with world-class amenities. Price shown is average per night.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=800&fit=crop",
        prices: [
            {
                retailer: "Agoda",
                price: 18500,
                currency: "INR",
                url: "https://www.agoda.com/the-taj-mahal-palace-mumbai/hotel/mumbai-in.html",
                availability: "in_stock"
            },
            {
                retailer: "Booking.com",
                price: 19200,
                currency: "INR",
                url: "https://www.booking.com/hotel/in/the-taj-mahal-palace-mumbai.html",
                availability: "in_stock"
            },
            {
                retailer: "MakeMyTrip",
                price: 20500,
                currency: "INR",
                url: "https://www.makemytrip.com/hotels/taj_mahal_palace-details-mumbai.html",
                availability: "in_stock"
            },
            {
                retailer: "Goibibo",
                price: 20800,
                currency: "INR",
                url: "https://www.goibibo.com/hotels/the-taj-mahal-palace-hotel-in-mumbai-5207114460352955315/",
                availability: "in_stock"
            }
        ],
        ratings: { average: 4.8, count: 12456 },
        specifications: {
            "Location": "Colaba, Mumbai",
            "Room Type": "Deluxe Room",
            "Price Type": "Per Night (Average)",
            "Amenities": "Pool, Spa, Restaurant, Gym",
            "Check-in": "2:00 PM",
            "Check-out": "12:00 PM"
        },
        tags: ["hotel", "luxury", "mumbai", "travel", "trending"]
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
