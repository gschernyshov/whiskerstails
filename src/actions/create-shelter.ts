"use server"

import  prisma  from "@/utils/prisma"
import { ZodError } from "zod"
import { shelterSchema } from "@/schema/zod"
import { getCity } from "@/utils/city"
import { IFormCreateShelterData } from "@/types/form-data"

type CreateShelterResponse = | { success: true; message: string } | { success: false; error: string }

export async function createShelter(formData: IFormCreateShelterData): Promise<CreateShelterResponse> {
  try{
    const data = await shelterSchema.parseAsync(formData) 

    let city = await getCity(data.nameCity)

    if (!city) {
      city = await prisma.city.create({
        data: { 
          name: data.nameCity,
        },
      })
    }

    await prisma.shelter.create({ data: { ...data, cityId: city.id } })

    return {  
      success: true,
      message: "Новый приют успешно добавлен",
    }
  } catch (error) {
     if (error instanceof ZodError) {
      const messageError = error.issues.map(issue => issue.message).join(". ")
      return { 
        success: false,
        error: "Предупреждение: " + messageError,
      }
    }
    // console.error("При добавление приюта возникла ошибка: ", error)
    return { 
      success: false,
      error: "При добавление приюта возникла ошибка",
    }
  }
}