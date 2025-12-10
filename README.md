# Valyux - AI-Powered Price Comparison Platform

A smart price comparison platform for Indian consumers powered by **Perplexity AI**. Compare real-time prices across Electronics, Clothing, Flights, and Hotels from major retailers.

## 🚀 Features

- **AI-Powered Search** - Real-time product search using Perplexity AI
- **Live Pricing** - Get current prices from Amazon, Flipkart, Myntra, and more
- **Smart Fallback** - Uses mock data if API is unavailable
- **Multiple Categories** - Electronics, Clothing, Flights, Hotels
- **Price Comparison** - Compare prices from multiple retailers instantly
- **Responsive Design** - Works perfectly on mobile and desktop

## ⚡ Quick Start

### 1. Get Perplexity API Key

Visit [Perplexity AI](https://www.perplexity.ai/settings/api) and create an API key.

### 2. Set Environment Variable

Create `.env.local` in the project root:

```bash
PERPLEXITY_API_KEY=pplx-your-api-key-here
```

### 3. Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**That's it!** Your AI-powered price comparison platform is ready.

## 📖 How It Works

1. User searches for a product (e.g., "iPhone 15 Pro")
2. Perplexity AI searches across Indian e-commerce sites in real-time
3. Platform displays current prices from multiple retailers:
   - Amazon India
   - Flipkart  
   - Myntra
   - MakeMyTrip
   - OYO
   - And other major retailers
4. User clicks to buy → Redirected to retailer website

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Perplexity AI** - Real-time product search with online data
- **shadcn/ui** - UI components

## 🔧 API Routes

- `GET /api/perplexity/search?q=query&category=electronics` - Search products
- `GET /api/perplexity/product?name=iPhone&brand=Apple` - Get product details

## 💡 Features

✅ **Real-time Search** - Perplexity AI fetches live prices
✅ **Smart Fallback** - Mock data if API fails
✅ **Fast Response** - Optimized for speed
✅ **Accurate Data** - Online search model for current prices
✅ **Easy Setup** - Just add API key and go

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

Or build for production:

```bash
pnpm build
pnpm start
```

## 📝 Environment Variables

Required:
- `PERPLEXITY_API_KEY` - Your Perplexity API key

## 📄 License

MIT

---

**Built with ❤️ using Perplexity AI**
