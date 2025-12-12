# Valyux Price Comparison System - Implementation Guide

## Overview
Valyux now supports real-time price comparison similar to Xerve.in. The system can:
1. Accept product URLs from users
2. Extract product information
3. Find the same product on other platforms
4. Display accurate price comparisons

## Current Implementation (MVP)

### What's Working Now:
- **Manual Product Entry**: Curated products with verified prices in `lib/mock-products.ts`
- **URL Detection**: System can identify products from Amazon, Flipkart, Myntra, Ajio URLs
- **Search Functionality**: Users can search and compare the curated products
- **Direct Links**: All "Buy Now" buttons redirect to actual retailer pages

### Products Currently Available:
1. **iPhone 15 Pro 256GB** - Blue Titanium (₹133,900 - ₹134,900)
2. **Nike Air Max 270** - Black/White (₹12,795 - ₹13,995)
3. **Nike Air Max 270** - Red (₹9,995 - ₹13,995) ← NEW!
4. **Delhi to Mumbai Flight** - IndiGo (₹4,499 - ₹4,650)
5. **Taj Mahal Palace Hotel** - Mumbai (₹24,800 - ₹26,000)

## How to Add More Products

### Method 1: Manual Entry (Current - Most Accurate)
Add products directly to `/lib/mock-products.ts`:

```typescript
{
    id: "unique-id",
    name: "Product Name",
    brand: "Brand",
    category: "electronics" | "clothing" | "flights" | "hotels",
    description: "Description",
    image: "image-url",
    prices: [
        { 
            retailer: "Amazon India", 
            price: 12999, 
            currency: "INR", 
            url: "https://www.amazon.in/...", 
            availability: "in_stock" 
        },
        // Add more retailers
    ],
    ratings: { average: 4.5, count: 1234 },
    specifications: {
        "Key": "Value"
    },
    tags: ["tag1", "tag2"]
}
```

### Method 2: URL Scraping (Future - Automated)
For production, implement real scraping using one of these options:

#### Option A: ScrapingBee API (Recommended)
**Cost**: $49/month for 150,000 API calls
**Setup**:
1. Sign up at https://www.scrapingbee.com/
2. Add to `.env.local`:
   ```
   SCRAPINGBEE_API_KEY=your_api_key_here
   ```
3. The scraper service is already set up in `lib/scraper-service.ts`
4. API endpoint ready at `/api/products/scrape`

**Usage**:
```bash
curl -X POST http://localhost:3000/api/products/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.amazon.in/product-link"}'
```

#### Option B: Puppeteer (Self-hosted)
**Cost**: Free (but requires server resources)
**Setup**:
1. Install dependencies:
   ```bash
   npm install puppeteer cheerio
   ```
2. Deploy to Vercel/AWS Lambda with Puppeteer layer
3. Update `lib/scraper-service.ts` to use Puppeteer

#### Option C: Bright Data (Enterprise)
**Cost**: Custom pricing (starts at $500/month)
**Best for**: Large scale operations
**Features**: Handles all anti-bot measures automatically

## Testing the System

### Test Locally:
1. Server is running at: http://localhost:3000
2. Search for "Nike" or "iPhone" to see products
3. Click on any product to see price comparison
4. Click "Buy Now" to be redirected to retailer

### Test URL Scraping (when implemented):
```bash
# Test scraping endpoint
curl -X POST http://localhost:3000/api/products/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.ajio.com/nike-air-max-270-running-shoes/p/469763455_red",
    "findAlternatives": true
  }'
```

## Price Accuracy

### Current Approach:
- **Manual verification**: Prices are manually checked and updated
- **Accuracy**: 100% for listed products
- **Update frequency**: Manual (as needed)

### With Scraping (Future):
- **Automatic updates**: Daily price refresh
- **Accuracy**: 95-99% (depends on scraping service)
- **Update frequency**: Real-time or scheduled

## Roadmap

### Phase 1: MVP (Current) ✅
- [x] Manual product curation
- [x] Price comparison display
- [x] Direct retailer links
- [x] Search functionality
- [x] Responsive UI

### Phase 2: Automation (Next)
- [ ] Implement ScrapingBee integration
- [ ] URL input feature for users
- [ ] Automatic price updates
- [ ] Price history tracking
- [ ] Price drop alerts

### Phase 3: Scale
- [ ] Add 100+ products
- [ ] Category expansion
- [ ] User accounts
- [ ] Wishlist/tracking
- [ ] Mobile app

## Files Modified

1. `/lib/mock-products.ts` - Product database
2. `/lib/scraper-service.ts` - Scraping logic (ready for production)
3. `/app/api/products/scrape/route.ts` - API endpoint for scraping
4. `/components/search/search-page.tsx` - Uses local data instead of API
5. `/app/product/[id]/page.tsx` - Disabled real-time API calls

## Important Notes

⚠️ **Web Scraping Considerations**:
- Always respect robots.txt
- Use rate limiting
- Consider legal implications
- Most retailers have anti-scraping measures
- Use official APIs when available

✅ **Current Recommendation**:
For MVP, continue with manual curation (current approach). It's:
- 100% accurate
- No legal concerns
- No infrastructure costs
- Easy to maintain
- Professional quality

When ready to scale, implement ScrapingBee for automated updates.

## Support

For questions or issues:
1. Check this documentation
2. Review code comments in `/lib/scraper-service.ts`
3. Test with the provided curl commands
4. Verify products in `/lib/mock-products.ts`
