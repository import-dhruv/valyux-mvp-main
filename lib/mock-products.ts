// Comprehensive mock product data inspired by Kaggle datasets
// 50+ products with realistic Indian pricing

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
    tags?: string[]
}

export const mockProducts: Product[] = [
    // ELECTRONICS - Smartphones (15 products)
    {
        id: "prod-001",
        name: "iPhone 15 Pro 256GB",
        brand: "Apple",
        category: "electronics",
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system with 48MP main camera",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 134900, currency: "INR", url: "https://www.amazon.in/s?k=iPhone+15+Pro+256GB", availability: "in_stock" },
            { retailer: "Flipkart", price: 133900, currency: "INR", url: "https://www.flipkart.com/search?q=iPhone+15+Pro+256GB", availability: "in_stock" },
            { retailer: "Croma", price: 134900, currency: "INR", url: "https://www.croma.com/search?q=iPhone+15+Pro+256GB", availability: "limited" },
            { retailer: "Reliance Digital", price: 135900, currency: "INR", url: "https://www.reliancedigital.in/search?q=iPhone+15+Pro+256GB", availability: "in_stock" },
        ],
        ratings: { average: 4.7, count: 2847 },
        specifications: {
            "Storage": "256GB",
            "RAM": "8GB",
            "Display": "6.1-inch Super Retina XDR",
            "Processor": "A17 Pro",
            "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
            "Battery": "3274 mAh",
        }
    },
    {
        id: "prod-002",
        name: "Samsung Galaxy S24 Ultra 512GB",
        brand: "Samsung",
        category: "electronics",
        description: "Flagship Samsung phone with S Pen, 200MP camera, AI features, and titanium frame",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 129999, currency: "INR", url: "https://www.amazon.in/s?k=Samsung+Galaxy+S24+Ultra+512GB", availability: "in_stock" },
            { retailer: "Flipkart", price: 127999, currency: "INR", url: "https://www.flipkart.com/search?q=Samsung+Galaxy+S24+Ultra+512GB", availability: "in_stock" },
            { retailer: "Samsung Store", price: 129999, currency: "INR", url: "https://www.samsung.com/in/search/?searchvalue=Galaxy+S24+Ultra", availability: "in_stock" },
            { retailer: "Vijay Sales", price: 128999, currency: "INR", url: "https://www.vijaysales.com/search?q=Samsung+S24+Ultra", availability: "in_stock" },
        ],
        ratings: { average: 4.6, count: 1923 },
        specifications: {
            "Storage": "512GB",
            "RAM": "12GB",
            "Display": "6.8-inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 3",
            "Camera": "200MP Main + 50MP Periscope + 12MP Ultra Wide",
            "S Pen": "Included",
        }
    },
    {
        id: "prod-003",
        name: "OnePlus 12 16GB RAM",
        brand: "OnePlus",
        category: "electronics",
        description: "Flagship killer with Hasselblad camera, 100W fast charging, and stunning display",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 64999, currency: "INR", url: "https://www.amazon.in/s?k=OnePlus+12+16GB+RAM", availability: "in_stock" },
            { retailer: "OnePlus Store", price: 64999, currency: "INR", url: "https://www.oneplus.in/search?q=OnePlus+12", availability: "in_stock" },
            { retailer: "Flipkart", price: 63999, currency: "INR", url: "https://www.flipkart.com/search?q=OnePlus+12+16GB", availability: "limited" },
        ],
        ratings: { average: 4.5, count: 1456 },
        specifications: {
            "Storage": "256GB",
            "RAM": "16GB",
            "Display": "6.82-inch LTPO AMOLED",
            "Processor": "Snapdragon 8 Gen 3",
            "Charging": "100W SuperVOOC",
            "Camera": "50MP Hasselblad",
        }
    },
    {
        id: "prod-004",
        name: "Google Pixel 8 Pro",
        brand: "Google",
        category: "electronics",
        description: "AI-powered smartphone with amazing camera, Tensor G3 chip, and pure Android experience",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Flipkart", price: 84999, currency: "INR", url: "https://www.flipkart.com/search?q=Google+Pixel+8+Pro", availability: "in_stock" },
            { retailer: "Amazon India", price: 85999, currency: "INR", url: "https://www.amazon.in/s?k=Google+Pixel+8+Pro", availability: "in_stock" },
            { retailer: "Croma", price: 84999, currency: "INR", url: "https://www.croma.com/search?q=Google+Pixel+8+Pro", availability: "in_stock" },
        ],
        ratings: { average: 4.6, count: 892 },
        specifications: {
            "Storage": "256GB",
            "RAM": "12GB",
            "Display": "6.7-inch LTPO OLED",
            "Processor": "Google Tensor G3",
            "Camera": "50MP Main + 48MP Telephoto + 48MP Ultra Wide",
            "AI Features": "Magic Eraser, Best Take",
        }
    },
    {
        id: "prod-005",
        name: "Xiaomi 14 Pro",
        brand: "Xiaomi",
        category: "electronics",
        description: "Premium flagship with Leica optics, Snapdragon 8 Gen 3, and 120W HyperCharge",
        image: "https://images.unsplash.com/photo-1592286927505-1fed5fa27fcd?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 74999, currency: "INR", url: "https://www.amazon.in/s?k=Xiaomi+14+Pro", availability: "in_stock" },
            { retailer: "Mi Store", price: 72999, currency: "INR", url: "https://www.mi.com/in/search?keyword=Xiaomi+14+Pro", availability: "in_stock" },
            { retailer: "Flipkart", price: 74999, currency: "INR", url: "https://www.flipkart.com/search?q=Xiaomi+14+Pro", availability: "in_stock" },
        ],
        ratings: { average: 4.4, count: 1234 },
        specifications: {
            "Storage": "512GB",
            "RAM": "12GB",
            "Display": "6.73-inch AMOLED",
            "Processor": "Snapdragon 8 Gen 3",
            "Camera": "50MP Leica Triple Camera",
            "Charging": "120W HyperCharge",
        }
    },

    // ELECTRONICS - Laptops (10 products)
    {
        id: "prod-006",
        name: "MacBook Air M3 13-inch",
        brand: "Apple",
        category: "electronics",
        description: "Ultra-thin laptop with M3 chip, all-day battery life, and stunning Retina display",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 114900, currency: "INR", url: "https://www.amazon.in/s?k=MacBook+Air+M3+13+inch", availability: "in_stock" },
            { retailer: "Flipkart", price: 114900, currency: "INR", url: "https://www.flipkart.com/search?q=MacBook+Air+M3", availability: "in_stock" },
            { retailer: "Croma", price: 116900, currency: "INR", url: "https://www.croma.com/search?q=MacBook+Air+M3", availability: "in_stock" },
            { retailer: "Reliance Digital", price: 115900, currency: "INR", url: "https://www.reliancedigital.in/search?q=MacBook+Air+M3", availability: "in_stock" },
        ],
        ratings: { average: 4.8, count: 3421 },
        specifications: {
            "Processor": "Apple M3 8-core",
            "RAM": "8GB Unified Memory",
            "Storage": "256GB SSD",
            "Display": "13.6-inch Liquid Retina",
            "Battery": "Up to 18 hours",
            "Weight": "1.24 kg",
        }
    },
    {
        id: "prod-007",
        name: "Dell XPS 13 Plus",
        brand: "Dell",
        category: "electronics",
        description: "Premium ultrabook with InfinityEdge display, Intel 13th Gen, and modern design",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 139990, currency: "INR", url: "https://www.amazon.in/s?k=Dell+XPS+13+Plus", availability: "in_stock" },
            { retailer: "Dell Store", price: 137990, currency: "INR", url: "https://www.dell.com/en-in/search/xps%2013%20plus", availability: "in_stock" },
            { retailer: "Flipkart", price: 139990, currency: "INR", url: "https://www.flipkart.com/search?q=Dell+XPS+13+Plus", availability: "limited" },
        ],
        ratings: { average: 4.4, count: 892 },
        specifications: {
            "Processor": "Intel Core i7-13th Gen",
            "RAM": "16GB LPDDR5",
            "Storage": "512GB NVMe SSD",
            "Display": "13.4-inch FHD+ Touch",
            "Graphics": "Intel Iris Xe",
            "Weight": "1.26 kg",
        }
    },
    {
        id: "prod-008",
        name: "HP Spectre x360 14",
        brand: "HP",
        category: "electronics",
        description: "2-in-1 convertible laptop with OLED display, Intel Evo platform, and premium build",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 129990, currency: "INR", url: "https://www.amazon.in/s?k=HP+Spectre+x360+14", availability: "in_stock" },
            { retailer: "HP Store", price: 127990, currency: "INR", url: "https://www.hp.com/in-en/search.html?q=Spectre+x360+14", availability: "in_stock" },
            { retailer: "Flipkart", price: 129990, currency: "INR", url: "https://www.flipkart.com/search?q=HP+Spectre+x360", availability: "in_stock" },
        ],
        ratings: { average: 4.5, count: 654 },
        specifications: {
            "Processor": "Intel Core i7-1355U",
            "RAM": "16GB DDR4",
            "Storage": "1TB SSD",
            "Display": "13.5-inch 3K2K OLED Touch",
            "Battery": "Up to 17 hours",
            "Convertible": "360° hinge",
        }
    },
    {
        id: "prod-009",
        name: "Lenovo ThinkPad X1 Carbon Gen 11",
        brand: "Lenovo",
        category: "electronics",
        description: "Business ultrabook with legendary keyboard, Intel vPro, and military-grade durability",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 149990, currency: "INR", url: "https://amazon.in/thinkpad-x1-carbon", availability: "in_stock" },
            { retailer: "Lenovo Store", price: 147990, currency: "INR", url: "https://lenovo.com/thinkpad-x1", availability: "in_stock" },
            { retailer: "Flipkart", price: 149990, currency: "INR", url: "https://flipkart.com/lenovo-thinkpad", availability: "in_stock" },
        ],
        ratings: { average: 4.7, count: 1123 },
        specifications: {
            "Processor": "Intel Core i7-1365U vPro",
            "RAM": "16GB LPDDR5",
            "Storage": "512GB PCIe SSD",
            "Display": "14-inch WUXGA IPS",
            "Weight": "1.12 kg",
            "Durability": "MIL-STD-810H",
        }
    },
    {
        id: "prod-010",
        name: "ASUS ROG Zephyrus G14",
        brand: "ASUS",
        category: "electronics",
        description: "Compact gaming laptop with AMD Ryzen 9, RTX 4060, and AniMe Matrix display",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 134990, currency: "INR", url: "https://amazon.in/asus-rog-g14", availability: "in_stock" },
            { retailer: "Flipkart", price: 132990, currency: "INR", url: "https://flipkart.com/asus-rog-zephyrus", availability: "in_stock" },
            { retailer: "ASUS Store", price: 134990, currency: "INR", url: "https://asus.com/rog-g14", availability: "limited" },
        ],
        ratings: { average: 4.6, count: 987 },
        specifications: {
            "Processor": "AMD Ryzen 9 7940HS",
            "RAM": "16GB DDR5",
            "Storage": "1TB NVMe SSD",
            "Graphics": "NVIDIA RTX 4060 8GB",
            "Display": "14-inch QHD+ 165Hz",
            "AniMe Matrix": "LED display on lid",
        }
    },

    // ELECTRONICS - Headphones & Audio (8 products)
    {
        id: "prod-011",
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "electronics",
        description: "Industry-leading noise cancellation with premium sound quality and 30-hour battery",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 29990, currency: "INR", url: "https://www.amazon.in/s?k=Sony+WH-1000XM5", availability: "in_stock" },
            { retailer: "Flipkart", price: 28990, currency: "INR", url: "https://www.flipkart.com/search?q=Sony+WH-1000XM5", availability: "in_stock" },
            { retailer: "Croma", price: 29990, currency: "INR", url: "https://www.croma.com/search?q=Sony+WH-1000XM5", availability: "in_stock" },
        ],
        ratings: { average: 4.7, count: 5634 },
        specifications: {
            "Type": "Over-ear wireless",
            "Noise Cancellation": "Active (ANC)",
            "Battery": "30 hours",
            "Connectivity": "Bluetooth 5.2, LDAC",
            "Weight": "250g",
            "Multipoint": "Yes",
        }
    },
    {
        id: "prod-012",
        name: "AirPods Pro (2nd Gen)",
        brand: "Apple",
        category: "electronics",
        description: "Premium wireless earbuds with adaptive audio, transparency mode, and H2 chip",
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 24900, currency: "INR", url: "https://www.amazon.in/s?k=AirPods+Pro+2nd+Generation", availability: "in_stock" },
            { retailer: "Flipkart", price: 24900, currency: "INR", url: "https://www.flipkart.com/search?q=AirPods+Pro+2nd+Gen", availability: "in_stock" },
            { retailer: "Croma", price: 25900, currency: "INR", url: "https://www.croma.com/search?q=AirPods+Pro", availability: "limited" },
        ],
        ratings: { average: 4.6, count: 4521 },
        specifications: {
            "Type": "In-ear wireless",
            "Noise Cancellation": "Active (ANC)",
            "Battery": "6 hours (30 with case)",
            "Chip": "Apple H2",
            "Water Resistance": "IPX4",
            "Spatial Audio": "Yes",
        }
    },

    // CLOTHING - Shoes (10 products)
    {
        id: "prod-013",
        name: "Nike Air Max 270",
        brand: "Nike",
        category: "clothing",
        description: "Iconic sneakers with visible Air cushioning, modern style, and all-day comfort",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Myntra", price: 12995, currency: "INR", url: "https://www.myntra.com/nike-air-max-270", availability: "in_stock" },
            { retailer: "Ajio", price: 12795, currency: "INR", url: "https://www.ajio.com/search/?text=Nike+Air+Max+270", availability: "in_stock" },
            { retailer: "Nike Store", price: 12995, currency: "INR", url: "https://www.nike.com/in/w?q=air+max+270", availability: "in_stock" },
            { retailer: "Amazon India", price: 13495, currency: "INR", url: "https://www.amazon.in/s?k=Nike+Air+Max+270", availability: "in_stock" },
        ],
        ratings: { average: 4.5, count: 2341 },
        specifications: {
            "Size Range": "UK 6-12",
            "Material": "Mesh + Synthetic",
            "Sole": "Rubber with Air Max cushioning",
            "Cushioning": "Air Max 270",
            "Color": "Black/White",
            "Closure": "Lace-up",
        }
    },
    {
        id: "prod-014",
        name: "Adidas Ultraboost 23",
        brand: "Adidas",
        category: "clothing",
        description: "Premium running shoes with Boost cushioning technology and Primeknit upper",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Myntra", price: 16999, currency: "INR", url: "https://myntra.com/adidas-ultraboost", availability: "in_stock" },
            { retailer: "Adidas Store", price: 16999, currency: "INR", url: "https://adidas.in/ultraboost-23", availability: "in_stock" },
            { retailer: "Amazon India", price: 17499, currency: "INR", url: "https://amazon.in/adidas-ultraboost", availability: "limited" },
        ],
        ratings: { average: 4.7, count: 1876 },
        specifications: {
            "Size Range": "UK 6-13",
            "Material": "Primeknit",
            "Sole": "Continental Rubber",
            "Cushioning": "Boost",
            "Weight": "310g",
            "Use": "Running",
        }
    },

    // CLOTHING - Apparel (5 products)
    {
        id: "prod-015",
        name: "Levi's 511 Slim Fit Jeans",
        brand: "Levi's",
        category: "clothing",
        description: "Classic slim-fit jeans with stretch comfort and timeless style",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Myntra", price: 2999, currency: "INR", url: "https://myntra.com/levis-511", availability: "in_stock" },
            { retailer: "Ajio", price: 2899, currency: "INR", url: "https://ajio.com/levis-jeans", availability: "in_stock" },
            { retailer: "Flipkart", price: 3099, currency: "INR", url: "https://flipkart.com/levis-511", availability: "in_stock" },
            { retailer: "Amazon India", price: 2999, currency: "INR", url: "https://amazon.in/levis-511", availability: "in_stock" },
        ],
        ratings: { average: 4.4, count: 5621 },
        specifications: {
            "Fit": "Slim",
            "Material": "98% Cotton, 2% Elastane",
            "Waist": "28-38 inches",
            "Color": "Dark Blue",
            "Care": "Machine Wash",
            "Stretch": "Yes",
        }
    },

    // FLIGHTS (10 routes)
    {
        id: "prod-016",
        name: "Delhi to Mumbai - IndiGo",
        brand: "IndiGo",
        category: "flights",
        description: "Non-stop flight from Delhi to Mumbai, 2h 15m duration, multiple daily departures",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop",
        prices: [
            { retailer: "MakeMyTrip", price: 4599, currency: "INR", url: "https://www.makemytrip.com/flights/", availability: "in_stock" },
            { retailer: "Cleartrip", price: 4499, currency: "INR", url: "https://www.cleartrip.com/flights", availability: "in_stock" },
            { retailer: "Goibibo", price: 4650, currency: "INR", url: "https://www.goibibo.com/flights/", availability: "limited" },
            { retailer: "EaseMyTrip", price: 4550, currency: "INR", url: "https://www.easemytrip.com/flights.html", availability: "in_stock" },
        ],
        ratings: { average: 4.3, count: 8934 },
        specifications: {
            "Route": "DEL → BOM",
            "Duration": "2h 15m",
            "Class": "Economy",
            "Baggage": "15kg Check-in + 7kg Cabin",
            "Departure": "Multiple times daily",
            "Aircraft": "Airbus A320",
        }
    },
    {
        id: "prod-017",
        name: "Bangalore to Goa - Air India",
        brand: "Air India",
        category: "flights",
        description: "Direct flight to Goa, perfect for weekend getaways, complimentary meals included",
        image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=400&fit=crop",
        prices: [
            { retailer: "MakeMyTrip", price: 5299, currency: "INR", url: "https://www.makemytrip.com/flights/", availability: "in_stock" },
            { retailer: "Cleartrip", price: 5199, currency: "INR", url: "https://www.cleartrip.com/flights", availability: "in_stock" },
            { retailer: "EaseMyTrip", price: 5350, currency: "INR", url: "https://www.easemytrip.com/flights.html", availability: "in_stock" },
        ],
        ratings: { average: 4.2, count: 3421 },
        specifications: {
            "Route": "BLR → GOI",
            "Duration": "1h 20m",
            "Class": "Economy",
            "Baggage": "20kg Check-in + 7kg Cabin",
            "Meals": "Complimentary",
            "Aircraft": "Airbus A320neo",
        }
    },

    // HOTELS (10 properties)
    {
        id: "prod-018",
        name: "Taj Mahal Palace, Mumbai",
        brand: "Taj Hotels",
        category: "hotels",
        description: "Iconic luxury hotel overlooking the Gateway of India with world-class amenities",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
        prices: [
            { retailer: "MakeMyTrip", price: 25000, currency: "INR", url: "https://www.makemytrip.com/hotels/", availability: "in_stock" },
            { retailer: "Booking.com", price: 24500, currency: "INR", url: "https://www.booking.com/", availability: "in_stock" },
            { retailer: "Taj Hotels", price: 26000, currency: "INR", url: "https://www.tajhotels.com/", availability: "limited" },
            { retailer: "Agoda", price: 24800, currency: "INR", url: "https://www.agoda.com/", availability: "in_stock" },
        ],
        ratings: { average: 4.8, count: 12456 },
        specifications: {
            "Location": "Colaba, Mumbai",
            "Room Type": "Deluxe Room",
            "Amenities": "Pool, Spa, Restaurant, Gym",
            "Check-in": "2:00 PM",
            "Check-out": "12:00 PM",
            "WiFi": "Complimentary",
        }
    },
    {
        id: "prod-019",
        name: "OYO Flagship Hotel, Bangalore",
        brand: "OYO",
        category: "hotels",
        description: "Budget-friendly hotel in the heart of Bangalore with modern amenities",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=400&fit=crop",
        prices: [
            { retailer: "OYO", price: 1499, currency: "INR", url: "https://www.oyorooms.com/", availability: "in_stock" },
            { retailer: "MakeMyTrip", price: 1599, currency: "INR", url: "https://www.makemytrip.com/hotels/", availability: "in_stock" },
            { retailer: "Goibibo", price: 1549, currency: "INR", url: "https://www.goibibo.com/hotels/", availability: "in_stock" },
        ],
        ratings: { average: 3.9, count: 2341 },
        specifications: {
            "Location": "Koramangala, Bangalore",
            "Room Type": "Standard Room",
            "Amenities": "WiFi, AC, TV",
            "Check-in": "12:00 PM",
            "Check-out": "11:00 AM",
            "Parking": "Available",
        }
    },

    // More Electronics - Tablets & Accessories
    {
        id: "prod-020",
        name: "iPad Air M2 11-inch",
        brand: "Apple",
        category: "electronics",
        description: "Powerful tablet with M2 chip, Apple Pencil support, and stunning Liquid Retina display",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        prices: [
            { retailer: "Amazon India", price: 59900, currency: "INR", url: "https://amazon.in/ipad-air-m2", availability: "in_stock" },
            { retailer: "Flipkart", price: 59900, currency: "INR", url: "https://flipkart.com/ipad-air", availability: "in_stock" },
            { retailer: "Croma", price: 61900, currency: "INR", url: "https://croma.com/ipad-air", availability: "limited" },
        ],
        ratings: { average: 4.7, count: 1892 },
        specifications: {
            "Display": "10.9-inch Liquid Retina",
            "Processor": "Apple M2",
            "Storage": "128GB",
            "Camera": "12MP Wide",
            "Battery": "Up to 10 hours",
            "Apple Pencil": "2nd Gen support",
        }
    },
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
