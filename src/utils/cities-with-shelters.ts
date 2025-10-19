"use server"

import prisma from "@/utils/prisma"
import { ICity } from "@/types/shelter-city"

type GetCitiesWithSheltersResponse = | { success: true; cities: ICity[] } | { success: false; error: string }

export async function getCitiesWithShelters(): Promise<GetCitiesWithSheltersResponse> {
  try{
    const cities = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
        shelters: {
          select: {
            id: true,
            nameCity: true,
            locality: true,
            nameShelter: true,
            address: true,
            contacts: true,
            site: true,
            comments: true,
          },
        },
      },
    })

    return {
      success: true,
      cities,
    }
  } catch (error) {
    // console.error("При получении городов с приютами возникла ошибка: ", error)
    return {
      success: false,
      error: "При получении городов с приютами возникла ошибка",
    }
  }
}