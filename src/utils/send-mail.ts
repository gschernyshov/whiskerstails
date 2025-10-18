"use server"

import nodemailer, { Transporter } from "nodemailer"

interface IDataMail {
  email: string
  title: string
  htmlContent: string
}

export async function sendMail({ email, title, htmlContent }: IDataMail) {
  try{    
    const transporter: Transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.YANDEX_USER, 
        pass: process.env.YANDEX_PASS, 
      },
    })

    const mailOptions: nodemailer.SendMailOptions = {
      from: {
        name: "WhiskersTails",
        address: "test-grchafv@yandex.ru",
      },
      to: email,
      subject: title,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
    transporter.close()
  } catch(error) {
    // console.error("При отправке сообщения возникла ошибка: ", error)
    throw error
  }
}
