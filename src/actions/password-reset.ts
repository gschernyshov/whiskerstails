"use server" 

import  prisma  from "@/utils/prisma"
import generator from "generate-password"
import { ZodError } from "zod"
import { passwordReset } from "@/schema/zod"
import { getUserByEmail } from "@/utils/user"
import { saltAndHashPassword } from "@/utils/password"
import { sendMail } from "@/utils/send-mail"

type PasswordResetFuncResponse = | { success: true; message: string } | { success: false; error: string }

export async function passwordResetFunc({ email }: { email: string }): Promise<PasswordResetFuncResponse> {
  try {
    const emailUser = await passwordReset.parseAsync(email)

    const existingUser = await getUserByEmail(emailUser)
    
    if (!existingUser) {
      return { 
        success: false,
        error: "Пользователь с таким Email не найден",
      }
    }

    const newPassword = await generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    }) 

    const title = "Ваш новый пароль :)"
    const htmlContent = `<p>
                           Пароль: <b>${newPassword}</b>
                         </p>`

    await sendMail({ email, title, htmlContent })

    const passwordHash = await saltAndHashPassword(newPassword)

    await prisma.user.update({
      where: { 
        email: emailUser,
      },
      data: {
        password: passwordHash,
      },
    })

    return {
      success: true, 
      message: "Новый пароль отправлен Вам на почту",
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const messageError = error.issues.map(issue => issue.message).join(", ") 
      return  { 
        success: false,
        error: "Предупреждение: " + messageError,
      }
    }
    // console.error("При сбросе пароля возникла ошибка: ", error)
    return { 
      success: false, 
      error: "При сбросе пароля возникла ошибка",
    }
  }
}