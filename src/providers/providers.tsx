"use client"

import { HeroUIProvider } from '@heroui/react'

interface IProps {
  children: React.ReactNode
}

export function Providers({ children }: IProps) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}