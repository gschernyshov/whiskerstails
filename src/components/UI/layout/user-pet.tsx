"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Chip } from "@heroui/react"
import { Icon } from "@iconify/react"
import { deletePet } from "@/actions/delete-pet"
import { IPet } from "@/types/pet"

interface IUserPetProps {
  pet: IPet
}

const UserPet = ({ pet }: IUserPetProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deletePet(pet.id)

      if (result.success) {
        setIsAnimating(true)
        setTimeout(() => setIsVisible(false), 400)
      } else {
        // console.error(result.error)
      }
    } catch (e) {
      // console.error(e)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`relative flex flex-col md:flex-row gap-2 md:gap-5 w-full p-2 bg-white rounded-4xl shadow-[0_0_5px_rgba(0,0,0,0.1)]
                  transition-all duration-400 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
    >
      <button
        title="Удалить анкету"
        className="cursor-pointer absolute top-[-4px] left-[-4px] md:left-auto md:right-[-4px] p-2 bg-white rounded-full shadow-[0_0_5px_rgba(0,0,0,0.1)] text-red-500 hover:text-red-700 transition-all"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Icon
          icon={isDeleting ? "mdi:loading" : "mdi:delete"}
          className={`w-5 h-5 ${isDeleting ? "animate-spin" : ""}`}
        />
      </button>
      <div className="w-full md:w-2/5">
        <Image
          unoptimized
          src={pet.photo || "/avatars/base.webp"}   
          height={750}
          width={750}
          quality={100}
          alt={`Фотография ${pet.species}`}   
          className="h-full md:max-h-65 w-full object-cover rounded-4xl md:rounded-tr-none md:rounded-br-none"
        />
      </div>
      <div className="flex flex-col justify-between gap-10 w-full md:w-3/5 px-3 md:pl-0 pt-2 text-black">
        <div className="flex flex-col gap-4">
         <h3 className="text-xl md:text-2xl leading-none font-bold">{pet.species} из г. {pet.nameCity}<br /><span className="text-base text-gray-500 leading-7">(н. п. {pet.location})</span><br />ищет себе дом 🏠</h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              <Chip color="warning" variant="bordered" size="sm">{pet.species}</Chip>
              <Chip color="warning" variant="bordered" size="sm">{pet.gender}</Chip>
              <Chip color="warning" variant="bordered" size="sm">{pet.age} мес.</Chip>
            </div>
            <p className="text-sm text-black">
              {pet.description.length > 120 
                ? pet.description.slice(0, 120) + "…" 
                : pet.description
              }
            </p>
          </div>
        </div>
       <div className="flex justify-between">
          <Link
            href={`/pet/${pet.id}`}
            className="flex items-center gap-1 ml-3 md:ml-0 text-sm text-blue-500" 
          >
            Страница питомца
            <Icon icon="mdi:open-in-new" className="w-4 h-4" />
          </Link>
          <p className="mr-3 md:mr-0 text-sm text-gray-400">От {new Date(pet.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default UserPet
