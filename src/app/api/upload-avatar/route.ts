import { NextResponse } from "next/server"
import { mkdir } from "fs/promises"
import path from "path"
import sharp from "sharp"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
}

type UploadAvatarResponse =
  | {
      success: true
      message: string
      avatarUrl: string
    }
  | {
      success: false
      error: string
    }

export async function POST(req: Request): Promise<NextResponse<UploadAvatarResponse>> {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { 
          success: false,
          error: "ID пользователя обязательно",
        }, 
        { 
          status: 400,
        },
      )
    }

    const formData = await req.formData()
    const file = formData.get("avatar") as File | null

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Добавьте Вашу фотографию",
        }, 
        { 
          status: 400,
        },
      )
    }

    // const avatarsDir = path.join(process.cwd(), "public", "avatars")
    // const avatarsDir = "/var/www/whiskerstails/whiskerstails/public/avatars"
    const avatarsDir =
      process.env.NODE_ENV === "production"
        ? "/var/www/whiskerstails/whiskerstails/public/avatars"
        : path.join(process.cwd(), "public", "avatars")

    await mkdir(avatarsDir, { recursive: true })

    const fileName = `${userId}.jpg`
    const filePath = path.join(avatarsDir, fileName)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await sharp(buffer)
      .rotate()
      .resize(300, 300, 
        { 
          fit: "cover", 
          position: "center" 
        }
      )
      .jpeg({ quality: 80 }) 
      .toFile(filePath)

    const avatarUrl = `/avatars/${fileName}`

    return NextResponse.json(
      { 
        success: true,
        message: "Фотография обновлена",
        avatarUrl,
      },
    )
  } catch (error) {
    // console.error("Не удалось обновить фотографию пользователя: ", error)
    return NextResponse.json(
      { 
        success: false,
        error: "Не удалось обновить фотографию пользователя",
      }, 
      { 
        status: 500,
      },
    )
  }
}
