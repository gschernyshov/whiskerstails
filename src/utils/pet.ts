"use server"

import prisma from "./prisma"
import { IPet } from "@/types/pet"

type GetPetResponse = | { success: true; pet: IPet } | { success: false; error: string }

export async function getPet(id: string): Promise<GetPetResponse> {
  try { 
    const pet = await prisma.pet.findUnique({
      where: { 
        id,
      },
      select: {
        id: true,
        userId: true,
        photo: true,
        species: true,
        age: true,
        gender: true,
        description: true,
        nameCity: true,
        location: true,
        status: true,
        createdAt: true,
      },
    })

    if(!pet) {
      // findUnique возвращает либо object, либо null
      return {
        success: false,
        error: "Анкета питомца не найдена",
      }
    }

    return { 
      success: true, 
      pet,
    }
  } catch(error) {
    // console.error("При получении анкеты питомца возникла ошибка: ", error)
    return {
      success: false,
      error: "При получении анкеты питомца возникла ошибка",
    }
  }
}

type GetPetsResult = | { success: true; pets: IPet[] } | { success: false; error: string }

export async function getPets(): Promise<GetPetsResult> {
  try {
    const pets = await prisma.pet.findMany({
      select: {
        id: true,
        userId: true,
        photo: true,
        species: true,
        age: true,
        gender: true,
        description: true,
        nameCity: true,
        location: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }) // findMany всегда возвращает массив, даже если он пустой

    return { 
      success: true, 
      pets,
    }
  } catch (error) {
    // console.error("При получении анкет питомцев возникла ошибка:", error);
    return { 
      success: false, 
      error: "При получении анкет питомцев возникла ошибка",
    }
  }
}

