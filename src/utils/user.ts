"use server"

import prisma from "./prisma"
import { IUser } from "@/types/user"

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      }, 
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })
  } catch (error) {
    // console.error("При получении данных пользователя возникла ошибка: ", error)
    throw error
  }
}

type GetUserByIDResponse = | { success: true; user: IUser } | { success: false; error: string }

export async function getUserByID(id: string): Promise<GetUserByIDResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { 
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        avatar: true,
      },
    })

    if (!user) {
      return { 
        success: false,
        error: "Пользователь не найден",
      }
    }

    return { 
      success: true,
      user,
    }
  } catch (error) {
    // console.error("При получении данных пользователя возникла ошибка: ", error)
    return {
      success: false,
      error: "При получении данных пользователя возникла ошибка",
    }
  }
}

