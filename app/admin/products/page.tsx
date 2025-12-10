"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addProduct } from "@/lib/actions/admin"

export default function AdminProductsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    category: "electronics",
    brand: "",
    description: "",
    image_url: "",
    base_price: "",
    availability: "in_stock",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await addProduct({
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        image_url: formData.image_url,
        base_price: Number.parseFloat(formData.base_price),
        availability: formData.availability,
      })

      if (error) {
        setMessage(error)
      } else {
        setMessage("Product added successfully!")
        setFormData({
          name: "",
          category: "electronics",
          brand: "",
          description: "",
          image_url: "",
          base_price: "",
          availability: "in_stock",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
        <p className="mt-2 text-slate-600">Add and edit products in the catalog</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Enter product details to add to the catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded border border-slate-300 px-3 py-2"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="flights">Flights</option>
                  <option value="hotels">Hotels</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (INR)</Label>
                <Input
                  id="basePrice"
                  name="base_price"
                  type="number"
                  step="0.01"
                  value={formData.base_price}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded border border-slate-300 px-3 py-2"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="image_url"
                type="url"
                value={formData.image_url}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded border border-slate-300 px-3 py-2"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="limited">Limited Stock</option>
              </select>
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
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
