"use client"

import { useState } from "react"
import Image from 'next/image'
import { Button, Alert, Spinner } from "@heroui/react"
import { useAuthStore } from "@/store/auth.store"
import AddPetForm from "../forms/add-pet.form"
import LoginnModal from "@/components/UI/modals/login.modal"
import RegistrationModal from "@/components/UI/modals/registration.modal"
import Photo from "@/assets/photo/cards.webp"

const AddPetPage = () => {
  const { isAuth, status } = useAuthStore()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
 
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full">
        <Spinner className="mt-10 md:mt-40" color="primary" size="lg" variant="gradient" />
      </div>
    )
  }

  if (!isAuth) {
    return ( 
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full px-4 md:px-20">
        <Alert
          variant="faded"
          color="primary"
          className="max-w-3xl mt-10 md:mt-40"
          title={
            <div className="w-[95%] md:w-full">
              Данная страница доступна только для авторизованных пользователей!
            </div>
          }
          endContent={
            <Button 
              variant="flat"
              color="primary" 
              size="sm" 
              onPress={() => setIsLoginOpen(true)}
            >
              Войти
            </Button>
          }
        />

        <LoginnModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          setIsRegistrationOpen={() => setIsRegistrationOpen(true)}
        />

        <RegistrationModal
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
          setIsLoginOpen={() => setIsLoginOpen(true)}
      />
      </div>
    ) 
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-10 w-full md:p-10 md:bg-white md:rounded-4xl md:shadow-2xl">
        <div className="flex flex-col jusify-between gap-4 md:gap-10 w-full md:w-1/2">
          <div className="flex flex-col jusify-between gap-4 md:gap-6 w-full">
            <h1 className="title-add-pet w-xs md:w-full text-3xl md:text-4xl text-black leading-9 md:leading-12 font-bold">Создание анкеты питомца ✨</h1>
            <p className="w-full md:w-lg text-gray-500">
              Заполните информацию о животном, прикрепите фото и расскажите его историю. Так вы поможете людям найти своего будущего друга 🐾
            </p>
          </div>
          <div className="w-full">
            <Image 
              priority
              src={Photo}
              sizes="100vw"
              quality={100}
              alt="Фотография с животными"
            />
          </div>
        </div>
        <div className="md:w-1/2 py-5 px-4 md:px-15 bg-white rounded-4xl shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <AddPetForm />
        </div>
      </div>
    </div>
  )
}

export default AddPetPage

