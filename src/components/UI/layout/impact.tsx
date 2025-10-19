"use client"

import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Button } from '@heroui/react'
import Photo from '@/assets/photo/impact.webp'

const Impact = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 w-full pt-20 md:pt-40 px-4 md:px-20">
      <div className="w-full md:w-1/2">
        <Image 
          src={Photo}
          sizes="100vw"
          quality={100}
          alt="Фотография с животными"
        />
      </div>
      <div className="flex flex-col items-center md:items-start gap-7 md:gap-10 w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl text-center md:text-left leading-9 md:leading-12 font-bold">
          <span className="text-blue-500">Почему помощь</span> бездомным животным так <span className="text-blue-500">важна прямо сейчас?</span>
        </h2>
        <p className="text-center md:text-left">
          Каждый год тысячи собак и кошек оказываются на улице, лишаясь заботы и безопасности.
          Приюты и передержки переполнены, а многие животные вынуждены жить в тяжёлых условиях.
          Но даже одно доброе действие — взять питомца домой или помочь кормом — способно изменить
          чью-то судьбу и подарить шанс на счастливую жизнь.
        </p>
        <div>
          <Button 
            color="primary" 
            variant="ghost" 
            size="lg"
            className="dark-scheme-button-white"
            onPress={() => router.push("/add-pet")}
          >
            Создать анкету
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Impact
