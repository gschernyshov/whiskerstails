"use server"

import  prisma  from "@/utils/prisma"
import { ZodError } from "zod"
import { registerSchema } from "@/schema/zod"
import { getUserByEmail } from "@/utils/user"
import { saltAndHashPassword } from "@/utils/password"
import { IFormRegisterData } from "@/types/form-data"

type RegisterUserResponse = | { success: true; message: string } | { success: false; error: string }

export async function registerUser(formData: IFormRegisterData): Promise<RegisterUserResponse> {
  try {
    const { confirmPassword, ...userData } = await registerSchema.parseAsync(formData)
    const { email, password } = userData

    if (password !== confirmPassword) {
      return { 
        success: false,
        error: "Пароли не совпадают",
      }
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { 
        success: false,
        error: "Пользователь с таким Email существует",
      }
    }

    const passwordHash = await saltAndHashPassword(password)
        
    await prisma.user.create({
      data: { 
        ...userData, 
        avatar: "/avatars/base.webp", 
        password: passwordHash,
        status: "active",
        role: "user",
      }
    })

    return {
      success: true, 
      message: "Вы успешно зарегистрировались",
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const messageError = error.issues.map(issue => issue.message).join(", ") 
      return  { 
        success: false,
        error: "Предупреждение: " + messageError,
      }
    }
    console.error("При регистрации возникла ошибка: ", error)
    return { 
      success: false, 
      error: "При регистрации возникла ошибка",
    }
  }
}