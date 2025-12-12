import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ComparisonProvider } from "@/components/comparison/comparison-context"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Valyux - Best Price Comparison Platform in India",
  description:
    "Compare prices across electronics, clothing, flights, and hotels. Find the best deals from top Indian and international brands.",
  keywords: "price comparison, shopping, deals, India, electronics, clothing, flights, hotels",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#003B73" },
    { media: "(prefers-color-scheme: dark)", color: "#A6B4FF" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <ComparisonProvider>
            {children}
            <Analytics />
          </ComparisonProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
