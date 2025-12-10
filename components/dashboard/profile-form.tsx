"use client"

import type React from "react"

import { useState } from "react"
import { updateUserProfile } from "@/lib/actions/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfileFormProps {
  initialProfile: any
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    first_name: initialProfile?.first_name || "",
    last_name: initialProfile?.last_name || "",
    phone: initialProfile?.phone || "",
    city: initialProfile?.city || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await updateUserProfile(formData)
      if (error) {
        setMessage(error)
      } else {
        setMessage("Profile updated successfully!")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" value={formData.city} onChange={handleChange} disabled={isLoading} />
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
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
