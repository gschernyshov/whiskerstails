"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button, Chip, Spinner } from "@heroui/react"
import { Icon } from "@iconify/react"
import { getPets } from "@/utils/pet"
import { IPet } from "@/types/pet"
import { useRouter } from "next/navigation"

const PetsPage = () => {
  const router = useRouter()
  const [petsData, setPetsData] = useState<IPet[] | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false;

    const query = async () => {
      try {
        const result = await getPets()

        if (cancelled) return

        if (result.success) {
          setPetsData(result.pets)
        } else {
          setPetsData(null)
          // console.error(result.error)
        }
      } catch (e) {
        setPetsData(null)
        // console.error(e)
      } 
    }

    query()

    return () => {
      cancelled = true
    }
  }, [])

  if (petsData === undefined) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full">
        <Spinner className="mt-10 md:mt-40" color="primary" size="lg" variant="gradient" />
      </div>
    )
  }

  if (petsData === null || petsData.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full px-4 md:px-20">
        <h2 className="mt-10 md:mt-40 text-3xl md:text-4xl text-center leading-9 md:leading-12 font-bold">Питомцев пока нет 😿</h2>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center gap-7 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
        <span className="text-xs text-blue-500 border border-blue-500 rounded-full px-4 py-2 inline-block">
          мир пушистиков пушистиков #1
        </span>
      <div className="flex flex-col justify-center items-center gap-4 md:gap-7 w-full mb-4">
        <h2 className="text-3xl md:text-5xl text-center leading-9 md:leading-12 font-bold">Анкеты питомцев</h2>
        <p className="text-center max-w-2xl">
          Каталог животных, ищущих дом. Смотрите анкеты кошек и собак из приютов и{" "}
          <Link
            href="/add-pet"
          >
            добавляйте собственные объявления
          </Link>
          {" "}о животных, которые нуждаются в помощи.
        </p>
        <div className="flex gap-2">
          <Button 
            radius="full"
            color="primary"
            className="px-6"
            size="md"
            onPress={() => router.push("/add-pet")}
          >
            Добавить анкету питомца
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-5 w-full">
        {petsData.map((petData) => (
          <div key={petData.id} className="flex flex-col md:flex-row gap-2 md:gap-5 w-full md:w-[calc(50%-0.75rem)] p-2 bg-white rounded-4xl shadow-[0_0_5px_rgba(0,0,0,0.1)]">
            <div className="w-full md:w-2/5">
              <Image
                unoptimized
                src={petData.photo || "/avatars/base.webp"}
                height={750}
                width={750}    
                quality={100}
                alt={`Фотография ${petData.species}`}   
                className="h-full w-full object-cover rounded-4xl md:rounded-tr-none md:rounded-br-none"
              />
            </div>
            <div className="flex flex-col justify-between gap-10 w-full md:w-3/5 px-3 md:pl-0 pt-2 text-black">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl leading-none font-bold">{petData.species} из г. {petData.nameCity}<br /><span className="text-base text-gray-500 leading-7">(н. п. {petData.location})</span><br />ищет себе дом 🏠</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    <Chip color="warning" variant="bordered" size="sm">{petData.species}</Chip>
                    <Chip color="warning" variant="bordered" size="sm">{petData.gender}</Chip>
                    <Chip color="warning" variant="bordered" size="sm">{petData.age} мес.</Chip>
                  </div>
                  <p className="text-sm text-black">
                    {petData.description.length > 120 
                      ? petData.description.slice(0, 120) + "…" 
                      : petData.description
                    }
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <Link
                  className="flex items-center gap-1 ml-3 md:ml-0 text-sm text-blue-500" 
                  href={`/pet/${petData.id}`}
                >
                  Страница питомца
                  <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                </Link>
                <p className="mr-3 md:mr-0 text-sm text-gray-400">От {new Date(petData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PetsPage
