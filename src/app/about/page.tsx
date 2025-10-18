"use client"

import Link from "next/link"
import Image from 'next/image'
import { Button } from "@heroui/react"
import { Icon } from "@iconify/react"
import Photo from "@/assets/photo/about.webp"

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-14 md:gap-20 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
      <div className="text-center max-w-3xl">
        <h2 className="mb-6 text-3xl md:text-4xl leading-9 md:leading-12 font-bold">О нас</h2>
        <p className="text-lg md:text-xl">
          Мы — добровольное сообщество людей, которые неравнодушны к судьбе животных.  
          Наша цель — помогать питомцам, оказавшимся в трудных обстоятельствах, и вдохновлять других на добрые дела.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <Image
            priority
            src={Photo}
            sizes="100vw"
            quality={100}
            alt="Фотография волонтёров с животными"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-7 max-w-xl py-6 px-8 bg-white rounded-2xl">
          <div className="flex items-start gap-4">
            <Icon icon="mdi:hand-heart" className="text-6xl text-red-500" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Добро от сердца</h3>
              <p className="text-gray-700">
                Мы действуем по зову сердца, без выгоды и статусов. Каждый поступок — это проявление заботы и желания помочь тем, кто не может попросить сам.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon icon="mdi:account-group" className="text-6xl text-blue-500" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Сила в единстве</h3>
              <p className="text-gray-700">
                Мы — сообщество единомышленников. Вместе можно сделать гораздо больше: найти дом, накормить, спасти, поддержать.  
                Каждый участник — важная часть доброго дела.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon icon="mdi:leaf" className="text-6xl text-green-500" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Ответственность за жизнь</h3>
              <p className="text-gray-700">
                Мы помогаем осознанно: не просто спасаем, но учим бережному отношению к животным и природе,  
                чтобы добро становилось привычкой, а не исключением.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon icon="mdi:lightbulb-on" className="text-6xl text-yellow-400" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Просвещение и вдохновение</h3>
              <p className="text-gray-700">
                Мы рассказываем истории, делимся опытом и показываем пример.  
                Наша цель — вдохновить как можно больше людей сделать первый шаг к добру.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 md:gap-7 text-center max-w-xl mb-4 md:mb-0 md:mt-10">
        <p className="w-[95%] md:w-full text-lg md:text-xl">
          Если вы хотите присоединиться, помочь или просто узнать больше — мы будем рады общению.
        </p>
        <Link 
          href="https://t.me/gschernyshov"
        >
          <Button color="primary" size="lg">Связаться с нами</Button>
        </Link>
        <p className="text-sm md:text-base max-w-xl">
          Мы отвечаем лично — без автоматических сообщений и шаблонов.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
