"use server"

import { signOut } from "@/auth/auth"

export async function signOutFunc() {
  try {
    await signOut({ redirect: false })
    
    return { 
      success: true,
      message: "Успешный выход из системы",
    }
  } catch (error) {
    // console.error("При выходе из системы возникла ошибка: ", error)
    return { 
      success: false,
      error: "При выходе из системы возникла ошибка",
    }
  }
}