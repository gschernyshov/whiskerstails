import { object, string, number, preprocess } from "zod"
 
export const registerSchema = object({
  name: string()
    .min(2, "имя обязательно")
    .max(32, "имя слишком длинное"),
  telephone: string()
    .min(7, "телефон слишком короткий")
    .max(32, "телефон слишком длинный")
    .regex(/^\+?[0-9\s\-()]+$/, "некорректный формат телефона"),
  email: string()
    .min(5, "Email cлишком короткий")
    .max(32, "Email cлишком длинный")
    .email("некорректный формат Email"),
  password: string()
    .min(8, "пароль должен содержать 8 символов")
    .max(32, "пароль слишком длинный"),
  confirmPassword: string()
    .min(8, "пароль должен содержать 8 символов")
    .max(32, "пароль слишком длинный"),
})

export const signInSchema = object({
  email: string()
    .min(5, "Email cлишком короткий")
    .max(32, "Email cлишком длинный")
    .email("некорректный формат Email"),
  password: string()
    .min(8, "пароль должен содержать 8 символов")
    .max(32, "пароль слишком длинный"),
})

export const passwordReset = string()
  .min(5, "Email cлишком короткий")
  .max(32, "Email cлишком длинный")
  .email("некорректный формат Email")

export const updateUserSchema = object({
  name: string()
    .min(2, "имя обязательно")
    .max(32, "имя слишком длинное"),
  email:string()
    .min(5, "Email cлишком короткий")
    .max(32, "Email cлишком длинный")
    .email("некорректный формат Email"),
  telephone: string()
    .min(7, "телефон слишком короткий")
    .max(30, "телефон слишком длинный")
    .regex(/^\+?[0-9\s\-()]+$/, "некорректный формат телефона"),
})

export const petSchema = object({
  userId: string()
    .min(2, "ID пользователя обязателен")
    .uuid("некорректный ID пользователя"),
  nameCity: string()
    .min(2, "название города обязательно")
    .max(32, "название города cлишком длинное"),
  location: string()
    .min(2, "название населенного пункта обязательно")
    .max(32, "название населенного пункта cлишком длинное"),
  species: string()
    .min(2, "вид обязателен")
    .max(32, "некорректный вид питомца"),
  gender: string()
    .min(2, "пол обязателен")
    .max(32, "некорректный пол питомца"),
  age: preprocess((val) => Number(val), number().min(1, "возраст не может равен 0 или быть отрицательным")),
  description: string()
    .min(5, "описание слишком короткое"),
  status: string()
    .min(2, "статус обязателен"),
})

export const sendLetterSchema = object({
  userId: string()
    .min(2, "ID пользователя обязателен")
    .uuid("некорректный ID пользователя"),
  telephone: string()
    .min(7, "телефон слишком короткий")
    .max(20, "телефон слишком длинный")
    .regex(/^\+?[0-9\s\-()]+$/, "некорректный формат телефона"),
  message: string()
    .min(5, "сообщение слишком короткое"),
})

export const shelterSchema = object({
  nameCity: string()
    .min(2, "название города обязательно")
    .max(32, "название города cлишком длинное"),
  locality: string()
    .min(2, "название населенного пункта обязательно")
    .max(32, "название населенного пункта cлишком длинное"),
  nameShelter: string()
    .min(2, "название приюта обязательно")
    .max(128, "название приюта cлишком длинное"),
  address: string()
    .min(2, "адрес приюта обязателен")
    .max(32, "адрес приюта cлишком длинный"),
  contacts: string()
    .min(2, "контактные данные обязательны")
    .max(32, "контактные данные cлишком длинные"),
  site: string().
    url("некорректный формат сайта"),
  comments: string()
    .min(5, "комментарий слишком короткий"),
})



