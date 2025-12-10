"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addProductPrice } from "@/lib/actions/admin"

export default function AdminPricesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    product_id: "",
    retailer_id: "",
    price: "",
    url: "",
    in_stock: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await addProductPrice({
        product_id: formData.product_id,
        retailer_id: formData.retailer_id,
        price: Number.parseFloat(formData.price),
        url: formData.url,
        in_stock: formData.in_stock,
      })

      if (error) {
        setMessage(error)
      } else {
        setMessage("Price updated successfully!")
        setFormData({
          product_id: "",
          retailer_id: "",
          price: "",
          url: "",
          in_stock: true,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Prices</h1>
        <p className="mt-2 text-slate-600">Update product prices from different retailers</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add/Update Product Price</CardTitle>
          <CardDescription>Enter price information from retailers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  name="product_id"
                  placeholder="UUID"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retailerId">Retailer ID</Label>
                <Input
                  id="retailerId"
                  name="retailer_id"
                  placeholder="UUID"
                  value={formData.retailer_id}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (INR)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Retailer URL</Label>
              <Input id="url" name="url" type="url" value={formData.url} onChange={handleChange} disabled={isLoading} />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="inStock"
                name="in_stock"
                type="checkbox"
                checked={formData.in_stock}
                onChange={handleChange}
                disabled={isLoading}
                className="rounded border-slate-300"
              />
              <Label htmlFor="inStock" className="mb-0">
                In Stock
              </Label>
            </div>

            {message && (
              <div
                className={`rounded p-3 text-sm ${
                  message.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Price"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
