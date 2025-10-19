"use server"

import { revalidatePath } from "next/cache"
import  prisma  from "@/utils/prisma"
import { unlink } from "fs/promises"
import path from "path"

type DeletePetResponse = | { success: true; message: string } | { success: false; error: string }

export async function deletePet(petId: string): Promise<DeletePetResponse> {
  try {
    await prisma.pet.delete({
      where: { 
        id: petId,
      },
    })

    const petsDir =
      process.env.NODE_ENV === "production"
        ? "/var/www/whiskerstails/whiskerstails/public/pets"
        : path.join(process.cwd(), "public", "pets")

    const filePath = path.join(petsDir, `${petId}.jpg`)

    try {
      await unlink(filePath)
    } catch (error) {
      // console.warn("Фото питомца не найдено или уже удалено:", error)
    }

    revalidatePath("/account")

    return { 
        success: true,
        message: "Анкета питомца успешно удалена",
    }
  } catch (error) {
    // console.error("При удалении анкеты питомца возникла ошибка: ", error)
    return { 
      success: false, 
      error: "При удалении анкеты питомца возникла ошибка",
    }
  }
}
