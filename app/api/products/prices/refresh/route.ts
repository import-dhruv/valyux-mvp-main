// API endpoint for refreshing product prices in real-time
import { NextRequest, NextResponse } from 'next/server'
import { getProductWithPrices, getCacheStats } from '@/lib/price-sync-service'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { productName, brand, forceRefresh = false } = body

        if (!productName) {
            return NextResponse.json(
                { error: 'Product name is required' },
                { status: 400 }
            )
        }

        const result = await getProductWithPrices(productName, brand, {
            forceRefresh,
        })

        if (!result) {
            return NextResponse.json(
                { error: 'Product not found or prices unavailable' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            ...result,
            cacheStats: getCacheStats(),
        })
    } catch (error) {
        console.error('Price refresh error:', error)
        return NextResponse.json(
            {
                error: 'Failed to refresh prices',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const productName = searchParams.get('name')
        const brand = searchParams.get('brand')
        const forceRefresh = searchParams.get('forceRefresh') === 'true'

        if (!productName) {
            return NextResponse.json(
                { error: 'Product name is required' },
                { status: 400 }
            )
        }

        const result = await getProductWithPrices(productName, brand || undefined, {
            forceRefresh,
        })

        if (!result) {
            return NextResponse.json(
                { error: 'Product not found or prices unavailable' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            ...result,
            cacheStats: getCacheStats(),
        })
    } catch (error) {
        console.error('Price refresh error:', error)
        return NextResponse.json(
            {
                error: 'Failed to refresh prices',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
