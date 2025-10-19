import NextAuth from "next-auth"
import prisma from "@/utils/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { signInSchema } from "@/schema/zod"
import { ZodError } from "zod"
import { getUserByEmail } from "@/utils/user"

// Создаём NextAuth с адаптером Prisma
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma), // Подключаем Prisma к NextAuth
  providers: [
    Credentials({
      name: "Account", // Название провайдера
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
        },
        password: { 
          label: "Password", 
          type: "password",
        }
      },
      // Функция authorize отвечает за проверку учетных данных
      authorize: async (credentials) => {
        try {
          // Проверяем, что email и пароль переданы
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email и пароль обязательны")
          }

          // Валидируем email и пароль через Zod схему
          const { email, password } = await signInSchema.parseAsync(credentials) // parseAsync — это асинхронный метод Zod для валидации данных, он возвращает валидированные данные или выбрасывает ZodError, если данные не проходят проверку

           // Получаем пользователя из БД по email
          const user = await getUserByEmail(email)

           // Проверяем, что пользователь существует и у него есть пароль
          if (!user || !user.password) {
            throw new Error("Неверный ввод данных")
          }

          // Сравниваем введённый пароль с захешированным в базе
          const isPasswordValid = await bcryptjs.compare(password, user.password)

          // Если пароли не совпадает, выдаем ошибку
          if (!isPasswordValid) {
            throw new Error("Неверный ввод данных")
          }

          // Если всё ок, возвращаем объект пользователя
          return { 
            id: user.id, 
            name: user.name, 
            email: user.email,
          }
        } catch (error) {
          // Если ошибка валидации Zod, то возвращаем null
          if (error instanceof ZodError) { // instanceof — это оператор JavaScript, который проверяет, принадлежит ли объект к определённому классу.
             return null
          }
          // При любой другой ошибке тоже возвращаем null
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt", // Сессия хранится в JWT
    maxAge: 3600 // Время жизни сессии — 1 час
  },
  secret: process.env.AUTH_SECRET, // Секрет для шифрования JWT
  // Коллбек для JWT: добавляем id пользователя в токен
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string, 
        },
      }
    }
  }
})