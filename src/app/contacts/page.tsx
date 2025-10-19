"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Spinner } from "@heroui/react"
import { Icon } from "@iconify/react"
import { siteConfig } from "@/config/site.config"
import PhotoBg from "@/assets/photo/contacts.webp"
import PhotoTwoBg from "@/assets/photo/contacts-2.webp"

const ContactsPage = () => {
  const contacts = siteConfig.contacts
  const map = siteConfig.map
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = map

    script.async = true

    script.onload = () => setMapLoaded(true)
    script.onerror = () => {
      // console.error("При загрузке карты возникла ошибка")
      setMapLoaded(true)
    }

    const mapContainer = document.getElementById("yandex-map")
    if (mapContainer) mapContainer.appendChild(script)

    return () => {
      if (mapContainer) mapContainer.innerHTML = ""
      script.remove()
    }
  }, [])

  return (
    <div className="flex flex-col gap-7 md:gap-10 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
      <h1 className="text-3xl md:text-4xl leading-9 md:leading-12 font-bold">
        Контакты
      </h1>
      <div className="flex flex-col gap-7 md:gap-20 w-full">
        <div className="flex flex-col md:flex-row items-stretch gap-7 md:gap-20 w-full">
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-1/3">
            <div className="flex flex-col flex-1 gap-4 order-2 md:order-1 w-full p-8 rounded-2xl bg-white shadow hover:shadow-lg transition-shadow">
              <Link href={`tel:${contacts.telephone}`}>
                <div className="flex items-center gap-4 text-black">
                  <Icon icon="mdi:phone" className="text-xl" />
                  <span>{contacts.telephone}</span>
                </div>
              </Link>
              <Link href={`mailto:${contacts.email}`}>
                <div className="flex items-center gap-4 text-black">
                  <Icon icon="mdi:email" className="text-xl" />
                  <span>{contacts.email}</span>
                </div>
              </Link>
              <div className="flex items-center gap-4 text-black">
                <Icon icon="mdi:map-marker" className="text-xl" />
                <span className="text-sm">{contacts.adress}</span>
              </div>
            </div>
            <div 
              className="h-40 w-full order-1 md:order-2 rounded-2xl bg-white bg-cover bg-center bg-no-repeat shadow hover:shadow-lg transition-shadow"
              style={{ backgroundImage: `url(${PhotoBg.src})` }}
            />
          </div>
          <div className="relative flex-1 h-[400px] md:h-auto md:min-h-[400px] overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition-shadow">
            {!mapLoaded && (
              <div className="absolute inset-0 flex justify-center items-center bg-white">
                <Spinner color="primary" size="lg" variant="gradient" />
              </div>
            )}
            <div
              id="yandex-map"
              className={`h-full w-full transition-opacity duration-700 ${
                mapLoaded ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Карта расположения WhiskersTails"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-20 w-full">
          <div
            className="flex-1 w-full min-h-60 rounded-2xl bg-white bg-cover bg-center bg-no-repeat shadow hover:shadow-lg transition-shadow"
            style={{ backgroundImage: `url(${PhotoTwoBg.src})` }}
          />
         <div className="flex flex-col gap-4 w-full md:w-1/3">
            <Link
              href={contacts.whatsApp}
              className="flex items-center justify-center gap-2 w-full p-6 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" className="text-2xl text-green-500" />
              <span className="font-nunito text-xl text-black font-bold">WhatsApp</span>
            </Link>

            <Link
              href={contacts.telegram}
              className="flex items-center justify-center gap-2 w-full p-6 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-105 transition-all"
            >
              <Icon icon="mdi:telegram" className="text-2xl text-blue-400" />
              <span className="font-nunito text-xl text-black font-bold">Telegram</span>
            </Link>

            <Link
              href={contacts.instagram}
              className="flex items-center justify-center gap-2 w-full p-6 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-105 transition-all"
            >
              <Icon icon="mdi:instagram" className="text-2xl text-pink-500" />
              <span className="font-nunito text-xl text-black font-bold">Instagram</span>
            </Link>

            <Link
              href={contacts.vk}
              className="flex items-center justify-center gap-2 w-full p-6 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-105 transition-all"
            >
              <Icon icon="mdi:vk" className="text-2xl text-blue-700" />
              <span className="font-nunito text-xl text-black font-bold">ВКонтакте</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage
