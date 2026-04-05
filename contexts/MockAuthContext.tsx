"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { UserRole } from "@/types"

interface MockAuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined)

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  // 預設為 ADMIN，如果 localStorage 裡有值則取 localStorage (為了頁面重載保持狀態)
  const [role, setRoleState] = useState<UserRole>('ADMIN')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedRole = localStorage.getItem('mockRole') as UserRole
    if (savedRole) {
      setRoleState(savedRole)
    }
  }, [])

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    localStorage.setItem('mockRole', newRole)
  }

  // 避免 server side render 時閃爍不一致
  if (!isClient) return <>{children}</>

  return (
    <MockAuthContext.Provider value={{ role, setRole }}>
      {children}
    </MockAuthContext.Provider>
  )
}

export function useMockAuth() {
  const context = useContext(MockAuthContext)
  if (context === undefined) {
    throw new Error("useMockAuth must be used within a MockAuthProvider")
  }
  return context
}
