"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAuthStore } from "@/store/auth.store"

interface IProps {
  children: React.ReactNode
}

const AppLoader = ({ children }: IProps) => {
  const { data: session, status } = useSession()
  const { setAuthState } = useAuthStore()

  useEffect(() => {
    setAuthState(status, session || null)
  }, [status, session, setAuthState])

  return (
    <>
      {children}
    </>
  )
}

export default AppLoader