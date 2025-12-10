# Perplexity AI Integration Guide

## What's Integrated?

Your price comparison platform now has **ONE single LLM integration** using Perplexity AI for:

1. **Smart Search Suggestions** (`/api/ai/search-suggestions`)
   - Understands user intent from queries
   - Returns relevant products and suggested filters
   - Detects categories automatically

2. **AI Recommendations** (`/api/ai/recommendations`)
   - Analyzes user search history
   - Recommends products based on patterns
   - Personalized for each user

3. **Comparison Insights** (`/api/ai/compare-insight`)
   - Generates pros/cons for compared products
   - Recommends best overall, best value options
   - Highlights key differences

4. **Product Descriptions** (`/api/ai/generate-description`)
   - Converts specs to marketing copy
   - Used by admin dashboard
   - Generates engaging descriptions

---

## Setup Instructions

### Step 1: Get Perplexity API Key
1. Go to https://www.perplexity.ai/api
2. Sign up for a Perplexity account
3. Create API key
4. Copy your API key

### Step 2: Add Environment Variable
In your Vercel project settings:
1. Go to Settings → Environment Variables
2. Add new variable:
   - Name: `PERPLEXITY_API_KEY`
   - Value: `your_api_key_from_step_1`
3. Save and redeploy

### Step 3: Verify Integration
Test the APIs:

\`\`\`bash
# Test search suggestions
curl -X POST http://localhost:3000/api/ai/search-suggestions \
  -H "Content-Type: application/json" \
  -d '{"query": "gaming laptop under 50000"}'

# Test recommendations (replace USER_ID)
curl -X POST http://localhost:3000/api/ai/recommendations \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "limit": 5}'

# Test comparison insights
curl -X POST http://localhost:3000/api/ai/compare-insight \
  -H "Content-Type: application/json" \
  -d '{"productIds": ["product_id_1", "product_id_2"]}'
\`\`\`

---

## How It Works

### Architecture
\`\`\`
User Query
    ↓
Perplexity API (analyze intent)
    ↓
Supabase Database (fetch products)
    ↓
Format & Return Results
\`\`\`

### Cost
- Perplexity: ~$0.002-0.01 per API call
- Average platform usage: ~100-500 calls/month for MVP
- Estimated cost: $1-10/month for MVP scale

---

## Features Enabled by Perplexity

### On Homepage
- "AI Recommendations" widget shows personalized suggestions
- Updates based on user's search history

### On Search Page
- Smart search suggestions appear as you type
- Automatically suggests relevant categories and brands

### On Comparison Page
- "AI Insights" button generates comparison analysis
- Shows which product is best, best value, and key differences

### On Product Page
- AI-generated descriptions from specifications

---

## File Reference

| File | Purpose |
|---|---|
| `lib/perplexity.ts` | Perplexity API client |
| `app/api/ai/search-suggestions/route.ts` | Smart search endpoint |
| `app/api/ai/recommendations/route.ts` | Personalized recommendations |
| `app/api/ai/compare-insight/route.ts` | Comparison analysis |
| `app/api/ai/generate-description/route.ts` | Product description generation |
| `components/ai/ai-recommendations.tsx` | Recommendations widget |
| `components/ai/ai-comparison-insights.tsx` | Comparison insights component |

---

## Troubleshooting

**Error: "PERPLEXITY_API_KEY is not configured"**
- Add PERPLEXITY_API_KEY to environment variables
- Redeploy your app

**API calls timing out**
- Check your Perplexity API key validity
- Verify internet connection
- Check Perplexity API status

**No recommendations showing**
- User needs search history first
- System learns from more searches over time

---

## Next Steps

1. Add `PERPLEXITY_API_KEY` to Vercel environment variables
2. Redeploy the application
3. Test each AI feature from the links above
4. Integrate AI widgets into more components as needed
