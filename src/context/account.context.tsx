"use client"

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react"
import { useAuthStore } from "@/store/auth.store"
import { getUserByID } from "@/utils/user"
import { updateUserData } from "@/actions/update-user-data"
import { updateUserAvatar } from "@/actions/update-user-avatar"
import { deleteAccount } from "@/actions/delete-account"
import { signOutFunc } from "@/actions/sign-out"
import { IFormUpdateUserData } from "@/types/form-data"
import { IUser } from "@/types/user"

interface IAccountContextProps {
  userId: string | undefined
  userData: IUser | null
  formData: IFormUpdateUserData
  loadingUpdateUserDataById: boolean
  isDeleting: boolean
  selectedFile: File | null
  action: { error: boolean; message: string }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  handleUpload: () => Promise<void>
  handleDeleteAccount: () => Promise<void>
}

const AccountContext = createContext<IAccountContextProps | undefined>(undefined)

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useAuthStore()
  const userId: string | undefined = session?.user?.id

  const [userData, setUserData] = useState<IUser | null>(null)
  const [formData, setFormData] = useState<IFormUpdateUserData>({
    name: "",
    telephone: "",
    email: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loadingUpdateUserDataById, setLoadingUpdateUserDataById] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [action, setAction] = useState({
    error: false,
    message: "",
  })

  useEffect(() => {
    if (!userId) return

    let cancelled = false
    
    const query = async () => {
      try {
        const result = await getUserByID(userId)

        if (cancelled) return
 
        if (result.success) {
          const avatarWithTimestamp = `${result.user.avatar}?key=${Date.now()}`
          setUserData({
            ...result.user,
            avatar: avatarWithTimestamp,
          })

          const { name, telephone, email } = result.user
          setFormData({ name, telephone, email })
        } else {
          // console.error(result.error)
        }
      } catch (e) {
        // console.error(e)
      }
    }

    query()

    return () => {
      cancelled = true
    }
  }, [userId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      e.target.value = ""
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleUpload = async () => {
    if (!userId || !userData) return

    if (!selectedFile){
      setAction({ error: true, message: "Фотография не выбрана" })
      return
    }

    setLoadingUpdateUserDataById(true)

    const magicBag = new FormData()
    magicBag.append("avatar", selectedFile)

    try {
      const res = await fetch(`/api/upload-avatar?userId=${userId}`, {
        method: "POST",
        body: magicBag
      })

      if (!res.ok) {
        setAction({ error: true, message: "Не удалось обновить фотографию пользователя" })
        return
      }

      const result = await res.json()

      if (result.success) {
        if (userData.avatar?.split("?")[0] === "/avatars/base.webp") {
          const resultUpdateUserAvatar = await updateUserAvatar(userId, result.avatarUrl)

          if (!resultUpdateUserAvatar.success) {
            setAction({ error: true, message: resultUpdateUserAvatar.error })
            return
          }
        }

        setUserData(prev => prev ? { ...prev, avatar: `${result.avatarUrl}?key=${Date.now()}` } : null)

        setAction({ error: false, message: result.message })
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "Не удалось обновить фотографию пользователя" })
    } finally {
      setSelectedFile(null)
      setLoadingUpdateUserDataById(false)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId || !userData) return

    if (formData.name === userData.name && formData.email === userData.email && formData.telephone === userData.telephone) {
      setAction({ error: true, message: "Данные не изменились" })
      return
    }

    setLoadingUpdateUserDataById(true) 

    try{
      const result = await updateUserData(userId, {...formData})

      if (result.success) {
        setUserData(prev => prev ? { ...prev, ...result.user } : result.user)
        setAction({ error: false, message: result.message })
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e){
      setAction({ error: true, message: "При обновлении данных пользователя возникла ошибка" })
    } finally {
      setLoadingUpdateUserDataById(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!userId) return

    setIsDeleting(true)
    try {
      const result = await deleteAccount(userId)
      if (result.success) {
        await signOutFunc()
        window.location.reload()
      } else {
        // console.error(result.error)
      }
    } catch (e) {
      // console.error(e)
    } finally {
      setIsDeleting(false)
    }
  }

  const value = useMemo(
    () => ({
      userId,
      userData,
      formData,
      loadingUpdateUserDataById,
      isDeleting,
      selectedFile,
      action,
      handleChange,
      handleFileChange,
      handleSubmit,
      handleUpload,
      handleDeleteAccount,
    }),
    [userId, userData, formData, loadingUpdateUserDataById, isDeleting, selectedFile, action.message, action.error]
  )

  return (
    <AccountContext.Provider
      value={value}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)
  if (!context) throw new Error("useAccount must be used within AccountProvider")
  return context
}
