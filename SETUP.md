# Valyux MVP - Simple Setup Guide

## 🚀 Quick Start (Mock Data Only)

This MVP uses **only mock data** - no API keys, no database, no configuration needed!

### Step 1: Install Dependencies

```bash
pnpm install
# or
npm install
```

### Step 2: Run Development Server

```bash
pnpm dev
# or
npm run dev
```

### Step 3: Open Browser

Visit [http://localhost:3000](http://localhost:3000)

**That's it!** Your price comparison platform is ready to use.

---

## ✨ How It Works

1. **User searches** → App searches mock product database
2. **Instant results** → No API calls, < 50ms response time
3. **Price comparison** → Shows prices from multiple retailers
4. **User clicks** → Redirected to retailer website to purchase

---

## 📋 Features

- ✅ Instant product search (no waiting!)
- ✅ 15+ mock products across all categories
- ✅ Price comparison from multiple retailers
- ✅ Product details with specifications
- ✅ Responsive design (mobile-friendly)
- ✅ Zero configuration required

---

## 🔧 API Routes

The app includes these API routes that work with mock data:

- `GET /api/perplexity/search?q=query&category=electronics` - Search products
- `GET /api/perplexity/product?id=prod-001` - Get product by ID
- `GET /api/perplexity/product?name=iPhone&brand=Apple` - Get product by name

---

## 📝 Adding More Products

Want to add more products? Edit `lib/mock-products.ts`:

```typescript
export const mockProducts: Product[] = [
  // ... existing products
  {
    id: "prod-016",
    name: "Your Product",
    brand: "Brand",
    category: "electronics",
    description: "Description here",
    image: "https://images.unsplash.com/...",
    prices: [
      { 
        retailer: "Amazon India", 
        price: 9999, 
        currency: "INR", 
        url: "https://amazon.in/...", 
        availability: "in_stock" 
      }
    ],
    ratings: { average: 4.5, count: 100 },
    specifications: { "Storage": "256GB" }
  }
]
```

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 🐛 Troubleshooting

**Port already in use?**
- Kill the process on port 3000: `lsof -ti:3000 | xargs kill`
- Or use a different port: `PORT=3001 pnpm dev`

**Build errors?**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

**Slow performance?**
- This shouldn't happen with mock data!
- Check browser console for errors
- Ensure you're using the latest code

---

## 💡 Next Steps

1. **Customize Products**: Edit `lib/mock-products.ts` with your own data
2. **Add Categories**: Extend the category types in the Product interface
3. **Enhance UI**: Modify components in `components/` directory
4. **Add Features**: Implement wishlists, price alerts, etc.

---

**That's it!** Your price comparison platform is ready to use. 🎉
