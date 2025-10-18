"use server"

import prisma from "@/utils/prisma"
import { unlink } from "fs/promises"
import path from "path"

type DeleteAccountResponse = | { success: true; message: string } | { success: false; error: string }

export async function deleteAccount(userId: string): Promise<DeleteAccountResponse> {
  try {
    await prisma.user.delete({
      where: { 
        id: userId,
      },
    })

    const avatarsDir =
      process.env.NODE_ENV === "production"
        ? "/var/www/whiskerstails/whiskerstails/public/avatars"
        : path.join(process.cwd(), "public", "avatars")

    const filePath = path.join(avatarsDir, `${userId}.jpg`)
    
    try {
      await unlink(filePath)
    } catch (error) {
      // console.warn("Фото пользователя не найдено или уже удалено:", error)
    }
  
    return { 
      success: true,
      message: "Аккаунт успешно удалён",
    }
  } catch (error) {
    //console.error("При удалении аккаунта возникла ошибка: ", error)
    return { 
      success: false, 
      error: "При удалении аккаунта возникла ошибка",
    }
  }
}