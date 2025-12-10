"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Simplified auth context for MVP - no database/auth needed
interface AuthContextType {
  user: null // Always null for MVP
  isLoading: false // Always false for MVP
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // For MVP, we don't need authentication
  // Always return no user
  const logout = async () => {
    // No-op for MVP
  }

  return (
    <AuthContext.Provider value={{ user: null, isLoading: false, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
