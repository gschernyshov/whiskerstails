import { Session } from "next-auth"
import { create } from "zustand"

type SessionStatus = "authenticated" | "unauthenticated" | "loading"

interface AuthState {
  isAuth: boolean // Флаг авторизации
  status: SessionStatus // Статус сессии
  session: Session | null // Объект сессии или null
  setAuthState: (status: SessionStatus, session: Session | null) => void // Функция для обновления состояния
}

export const useAuthStore = create<AuthState>((set) => ({ // set — это функция, которая обновляет состояние стора
  isAuth: false,
  status: "loading",
  session: null,
  // Функция, которая обновляет всё состояние сразу
  setAuthState: (status: SessionStatus, session: Session | null) =>
    set({
      isAuth: status === "authenticated",
      status,
      session
    })
}))