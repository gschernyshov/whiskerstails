"use client"

import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Button } from '@heroui/react'
import Photo from '@/assets/photo/hero.webp'
import PhotoMobile from '@/assets/photo/hero-mobile.webp'

const Hero = () => {
  const router = useRouter()

  return (
    <>
      <div className="relative min-h-[800px] w-full">
        <Image 
          priority
          src={Photo}
          fill
          quality={100}
          alt="Кошки и собаки — баннер WhiskersTails"
          className="absolute top-0 left-0 hidden md:block object-cover"
        />
        <Image 
          priority
          src={PhotoMobile}
          fill
          sizes="(max-width: 768px) 100vw"
          quality={100}
          alt="Кошки и собаки — баннер WhiskersTails"
          className="absolute top-0 left-0 block md:hidden object-cover"
        />
        <div className="absolute top-0 left-0 flex flex-col justify-end md:justify-center min-h-[800px] w-full pb-10 md:pb-0 px-4 md:px-20">
          <div className="flex flex-col items-start gap-6 w-full md:w-2/5">
            <h1 className="text-3xl md:text-4xl leading-9 md:leading-12 font-bold">WhiskersTails — место, где питомцы находят друзей, а люди находят радость общения.</h1>
            <p>Познакомиться с питомцами 🐾</p>
            <Button 
              color="primary" 
              variant="ghost" 
              size="lg"
              className="dark-scheme-button-white"
              onPress={() => router.push("/pets")}
            >
              Анкеты
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
