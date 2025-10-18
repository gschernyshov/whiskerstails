"use client"

import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@heroui/react"
import { IShelter } from "@/types/shelter-city"

interface IShelterCardProps {
  shelter: IShelter
}

const ShelterCard = ({ shelter }: IShelterCardProps) => {
  return (
    <Card className="max-w-3xl m-auto mb-10 last:mb-0">
      <CardHeader className="flex flex-col gap-1 items-start">
        <p className="text-md text-black">{shelter.nameShelter}</p>
        <p className="text-small text-default-500">г. {shelter.nameCity}, {shelter.locality}.</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-md text-black"><span className="text-small text-default-500">Приют располагается по адресу:</span> {shelter.address}</p>
        <p className="text-md text-black"><span className="text-small text-default-500">Контактные данные:</span> {shelter.contacts}</p>
        <p className="text-md text-black"><span className="text-small text-default-500">Комментарий добавлятеля:</span> {shelter.comments}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={shelter.site}>
          Посетить сайт приюта
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ShelterCard
