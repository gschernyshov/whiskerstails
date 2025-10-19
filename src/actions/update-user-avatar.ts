"use server"

import prisma from "@/utils/prisma"

type UpdateUserAvatarResult = | { success: true; message: string } | { success: false; error: string }

export async function updateUserAvatar(id: string, avatarUrl: string): Promise<UpdateUserAvatarResult> {
  try {
    await prisma.user.update({
      where: { 
        id,
      },
      data: {
        avatar: avatarUrl,
      },
    })

    return { 
      success: true,
      message: "Фотография обновлена",
    }
  } catch (error) {
    // console.error("Не удалось обновить фотографию пользователя: ", error)
    return { 
      success: false,
      error: "Не удалось обновить фотографию пользователя",
    }
  }
}
