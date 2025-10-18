"use client"

import { useRouter } from 'next/navigation'
import { Alert, Button } from "@heroui/react"

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full px-4 md:px-20">
      <div className="w-full md:w-xl md:m-auto">
        <Alert
          variant="faded"
          color="danger"
          className="max-w-3xl mt-10 md:mt-40"
          title="Страница не найдена!"
          endContent={
            <Button 
              variant="flat" 
              color="danger" 
              size="sm" 
              onClick={() => router.push("/")}
            >
              Главная
            </Button> 
          }
        />
      </div>
    </div>
  )
}

export default NotFoundPage