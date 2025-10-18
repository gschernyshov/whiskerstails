"use client"

import { Button, Image, Link } from '@heroui/react'

const Donate = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 w-full pt-20 md:pt-40 px-4 md:px-20">
      <div className="flex flex-col items-center md:items-start gap-7 md:gap-10 w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl text-center md:text-left leading-9 md:leading-12 font-bold">Станьте частью проекта!</h2>
        <p className="text-center md:text-left">
          Наш проект постоянно растёт, и мы ищем активных и талантливых людей, которые готовы присоединиться к команде и помочь сделать его ещё лучше. 
          Сейчас нам особенно нужны: дизайнер — чтобы создавать красивые и удобные интерфейсы, разработчик — чтобы реализовывать новые функции и улучшать платформу, контент-менеджер — чтобы наполнять проект интересным и полезным контентом.
          Даже если у вас нет профессиональных навыков, вы всё равно можете помочь проекту: делитесь информацией, рассказывайте о нас друзьям или помогайте распространять идеи проекта. Каждая помощь ценна!
          Для связи с нами кликайте по кнопке ниже, чтобы написать в Telegram и стать частью команды.
        </p>
         <Link href="https://t.me/gschernyshov">
          <Button 
            className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            radius="full"
            size="lg"
          >
            Связаться
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-1/4"> 
        <Image
          src='/photo/donate.webp'
          sizes="100vw"
          isBlurred
          alt="Фотография собаки"
        />
      </div>
    </div>
  )
}

export default Donate
