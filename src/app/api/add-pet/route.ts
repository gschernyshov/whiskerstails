import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"
import { mkdir } from "fs/promises"
import path from "path"
import sharp from "sharp"
import { petSchema } from "@/schema/zod"
import { ZodError } from "zod"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
}

type CreatePetResponse =
  | {
      success: true
      message: string
      petId: string
    }
  | {
      success: false
      error: string
    }

export async function POST(req: Request): Promise<NextResponse<CreatePetResponse>> {
  try {
    const formData = await req.formData()

    const file = formData.get("photo") 
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Добавьте фотографию питомца",
        }, 
        { 
          status: 400,
        },
      )
    }

    const formObj = Object.fromEntries(formData.entries())
    
    const data = await petSchema.parseAsync(formObj)

    const pet = await prisma.pet.create({
      data: {
        ...data,
        photo: "",
      },
      select: { 
        id: true,
      },
    })

    // const petsDir = path.join(process.cwd(), "public", "pets")
    // const petsDir = "/var/www/whiskerstails/whiskerstails/public/pets"
    const petsDir =
      process.env.NODE_ENV === "production"
        ? "/var/www/whiskerstails/whiskerstails/public/pets"
        : path.join(process.cwd(), "public", "pets")

    await mkdir(petsDir, { recursive: true })

    const fileName = `${pet.id}.jpg`
    const filePath = path.join(petsDir, fileName)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await sharp(buffer)
      .rotate()
      .resize(900, 900, 
        { 
          fit: "cover", 
          position: "center" 
        }
      )
      .jpeg({ quality: 90 })
      .toFile(filePath)

    const photoUrl = `/pets/${fileName}`

    await prisma.pet.update({
      where: { 
        id: pet.id,
      },
      data: { 
        photo: photoUrl,
      },
    })
    
    return NextResponse.json({ 
      success: true,
      message: "Питомец успешно добавлен",
      petId: pet.id, 
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map(issue => issue.message).join(", ")
      return NextResponse.json(
        { 
          success: false,
          error: "Предупреждение: " + errorMessage
        },
        { 
          status: 400 
        }
      )
    }
    // console.error("При добавлении питомца возникла ошибка: ", error)
    return NextResponse.json(
      { 
        success: false,
        error: "При добавлении питомца возникла ошибка",
      }, 
      { 
        status: 500,
      },
    )
  }
}
