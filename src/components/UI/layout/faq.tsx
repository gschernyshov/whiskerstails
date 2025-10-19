"use client"

import Image from 'next/image'
import { Accordion, AccordionItem } from "@heroui/react"
import { siteConfig } from "@/config/site.config"
import Photo from '@/assets/photo/paws.webp'

const Faq = () => {
  const faq = siteConfig.faq
  return (
    <div className="flex flex-col gap-10 w-full pt-20 md:pt-40 px-4 md:px-20">
      <h2 className="text-3xl md:text-6xl leading-9 md:leading-12 font-bold">FAQ</h2>
      <div className="flex flex-col md:flex-row items-end gap-10 md:gap-20">
        <div className="w-full md:w-2/3 max-w-3xl p-5 md:p-10 bg-transparent-blue rounded-4xl">
          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  overflowY: "unset",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      ease: "easeInOut",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  overflowY: "hidden",
                  transition: {
                    height: {
                      ease: "easeInOut",
                      duration: 0.25,
                    },
                    opacity: {
                      ease: "easeInOut",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {faq.map((item) => {
              return (
                <AccordionItem 
                  key={item.question} 
                  aria-label={item.question} 
                  title={item.question} 
                >
                  {item.answer}
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
        <div className="w-full md:w-1/3">
          <Image 
            src={Photo}
            sizes="100vw"
            quality={100}
            alt="Фотография с животными"
          />
        </div>
      </div>
    </div>
  )
}

export default Faq