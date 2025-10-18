"use server"

import { IPet } from "@/types/pet";
import prisma from "@/utils/prisma"

type GetUserPetsResponse = | { success: true; pets: IPet[] } | { success: false; error: string }

export async function getUserPets(userId: string): Promise<GetUserPetsResponse> {
  try {
    const pets = await prisma.pet.findMany({
      where: { 
        userId,
      },
      orderBy: { 
        createdAt: "desc",
      },
      select: {
        id: true,
        photo: true,
        nameCity: true,
        location: true,
        species: true,
        gender: true,
        age: true,
        description: true,
        createdAt: true,
      },
    })

    return { 
      success: true,
      pets,
    }
  } catch (error) {
    // console.error("При получении анкет питомцев возникла ошибка: ", error)
    return {
      success: false,
      error: "При получении анкет питомцев возникла ошибка",
    }
  }
}
