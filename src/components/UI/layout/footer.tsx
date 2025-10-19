"use client"

import Link from "next/link"
import { siteConfig } from "@/config/site.config"

const Footer = () => {
  const contacts = siteConfig.contacts 

  return (
    <div className="w-full mt-10 md:mt-40 pt-10 md:pt-20 px-4 md:px-20 bg-dark-blue text-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full max-w-2xl mb-5 md:mb-10">
        <div className="flex flex-col gap-1">
          <h2 className="mb-2 text-neutral-50 text-3xl">WhiskersTails</h2>
          <span className="text-gray-500">{contacts.adress}</span>
          <Link href={`tel:${contacts.telephone}`}>
            <span className="text-gray-500">Тел.: {contacts.telephone}</span>
          </Link>
          <Link href={`tel:${contacts.email}`}>
            <span className="text-gray-500">Email: {contacts.email}</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1 md:gap-3 text-gray-200">
          <Link href={contacts.whatsApp}>WhatsApp</Link>
          <Link href={contacts.telegram}>Telegram</Link>
        </div>
        <div className="flex flex-col gap-1 md:gap-3 text-gray-200">
          <Link href={contacts.instagram}>Instagram</Link>
          <Link href={contacts.vk}>VK</Link>
        </div>
      </div>
      <hr className="text-gray-500" />
      <div className="w-full py-10">
        <p className="font-nunito text-neutral-50">© 2025 Whiskers & Tails. Все права защищены.</p>
      </div>
    </div>
  )
}

export default Footer

     