"use server"

import prisma from "@/utils/prisma"
import { unlink } from "fs/promises"
import path from "path"

type DeleteAccountResponse = | { success: true; message: string } | { success: false; error: string }

export async function deleteAccount(userId: string): Promise<DeleteAccountResponse> {
  try {
    const pets = await prisma.pet.findMany({
      where: { 
        userId,
      },
      select: { 
        id: true,
      },
    })

    const petsDir =
      process.env.NODE_ENV === "production"
        ? "/var/www/whiskerstails/whiskerstails/public/pets"
        : path.join(process.cwd(), "public", "pets")

    for (const pet of pets) {
      const petFilePath = path.join(petsDir, `${pet.id}.jpg`)
      try {
        await unlink(petFilePath)
      } catch (error) {
        // console.warn("Фото питомца не найдено или уже удалено:", error)
      }
    }

    const avatarsDir =
      process.env.NODE_ENV === "production"
        ? "/var/www/whiskerstails/whiskerstails/public/avatars"
        : path.join(process.cwd(), "public", "avatars")

    const avatarFilePath = path.join(avatarsDir, `${userId}.jpg`)
    
    try {
      await unlink(avatarFilePath)
    } catch (error) {
      // console.warn("Фото пользователя не найдено или уже удалено:", error)
    }

    await prisma.user.delete({
      where: { 
        id: userId,
      },
    })
  
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