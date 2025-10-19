"use server"

import prisma from "./prisma"

export async function getCity(nameCity: string) {
  try { 
    return await prisma.city.findUnique({
      where: { 
        name: nameCity,
      },
    })
  } catch(error) {
    // console.error("При получении города возникла ошибка: ", error)
    throw error
  }
}

