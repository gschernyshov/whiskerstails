"use server"

import prisma from "@/utils/prisma"
import { ZodError } from "zod"
import { updateUserSchema } from "@/schema/zod"
import { IFormUpdateUserData } from "@/types/form-data"

interface IUser  {
  name: string
  email: string
  telephone: string 
}

type UpdateUserDataResult = | { success: true; message: string; user: IUser } | { success: false; error: string }

export async function updateUserData(id: string, formData: IFormUpdateUserData): Promise<UpdateUserDataResult> {
  try {
    const data = await updateUserSchema.parseAsync(formData)

    const user = await prisma.user.update({
      where: { 
        id,
      },
      data,
      select: {
        name: true,
        email: true,
        telephone: true, 
      }
    })
    
    return { 
      success: true,
      message: "Данные обновлены",
      user, 
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const messageError = error.issues.map(issue => issue.message).join(", ") 
      return  { 
        success: false,
        error: "Предупреждение: " + messageError
      }
    }

    // console.error("При обновлении данных пользователя возникла ошибка: ", error)
    return { 
      success: false,
      error: "При обновлении данных пользователя возникла ошибка" 
    }
  }
}
