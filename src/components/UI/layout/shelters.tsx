"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {Button, ButtonGroup} from "@heroui/react"
import CreateShelterModal from "../modals/create-shelter.modal"

const Shelters = () => {
  const router = useRouter()
  const [isCreateShelter, setIsCreateShelter] = useState(false)

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-center items-center w-full pt-20 md:pt-40 px-4 md:px-20">
        <div className="flex flex-col items-center md:items-start gap-7 md:gap-10 w-full max-w-2xl"> 
          <h2 className="text-3xl md:text-4xl text-center leading-9 md:leading-12 font-bold">Найдите и / или поддержите приют</h2>
          <p className="text-center max-w-2xl mb-4 md:mb-0">Наш каталог приютов помогает людям находить места, где животные ждут помощи и дома. Вы можете просмотреть существующие приюты или добавить новый, чтобы помочь еще большему числу питомцев.</p>
          <ButtonGroup
           className="m-auto"
          >
            <Button 
              size="lg" 
              onPress={() => router.push("/shelters")}
            >
              Посмотреть приюты
            </Button>
            <Button 
              color="primary"
              variant="solid" 
              size="lg" 
              onPress={() => setIsCreateShelter(true)}
            >
              Добавить приют
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <CreateShelterModal 
        isOpen={isCreateShelter}
        onClose={() => setIsCreateShelter(false)}
      />
    </>
  )
}

export default Shelters
