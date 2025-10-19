"use server"

import { signIn } from "@/auth/auth"
import { ZodError } from "zod"
import { signInSchema } from "@/schema/zod"
import { AuthError } from "next-auth"
import { IFormLoginData } from "@/types/form-data"

type SignInWithCredentialsResponse = | { success: true; message: string } | { success: false; error: string }

export async function signInWithCredentials(formData: IFormLoginData): Promise<SignInWithCredentialsResponse> {
  try {
    const {email, password} = await signInSchema.parseAsync(formData)

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { 
      success: true,
      message: "Успешная авторизация",
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const messageError = error.issues.map(issue => issue.message).join(", ") 
      return  { 
        success: false,
        error: "Предупреждение: " + messageError,
      }
    }

    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { 
          success: false,
          error: "Неверный email или пароль",
        }
      }
    }

    // console.error("При авторизации возникла ошибка: ", error);
    return { 
      success: false,
      error: "При авторизации возникла ошибка",
    }
  }
}