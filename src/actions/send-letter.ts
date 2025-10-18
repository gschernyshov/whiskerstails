"use server"

import prisma from "@/utils/prisma"
import { ZodError } from "zod"
import { sendLetterSchema } from "@/schema/zod"
import { sendMail } from "@/utils/send-mail"

interface IDataLetter {
  userId: string
  telephone: string
  message: string
}

type SendLetterResponse = | { success: true; message: string } | { success: false; error: string }

export async function sendLetter(dataLetter: IDataLetter): Promise<SendLetterResponse> {
  try{
    const data = await sendLetterSchema.parseAsync(dataLetter)

    const { userId, telephone, message } = data

    const user = await prisma.user.findUnique({
      where: { 
        id: userId 
      },
      select: { 
        email: true 
      },
    })

    if (!user) {
      return {
        success: false,
        error: "Владелец питомца не найден",
      }
    }

    const email = user.email
    const title = "Кто-то хочет забрать питомца :)"
    const htmlContent = `<p>Номер телефона отправителя: <b>${telephone}</b></p>
                         <p>Его сообщение: </b>${message}</b></p>`

    await sendMail({ email, title, htmlContent })

    return { 
      success: true, 
      message: "Сообщение успешно отправлено",
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const messageError = error.issues.map(issue => issue.message).join(", ") 
      return  { 
        success: false,
        error: "Предупреждение: " + messageError,
      }
    }
    // console.error("При отправке сообщения возникла ошибка: ", error)
    return { 
      success: false, 
      error: "При отправке сообщения возникла ошибка",
    }
  }
}

