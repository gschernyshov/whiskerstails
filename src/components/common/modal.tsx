"use client"

import { 
  useState, 
  useEffect, 
  ReactNode,
} from "react"
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/react"

interface IProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const CustomModal = ({ isOpen, onClose, size = "md", children }: IProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)

    checkScreen()

    window.addEventListener("resize", checkScreen)
    
    return () => {
      window.removeEventListener("resize", checkScreen)
    }
  }, [])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={isMobile ? "full" : size}
      classNames={{
        base: isMobile
          ? "fixed inset-0 h-[100dvh] w-screen rounded-none overflow-y-auto scrollbar-none"
          : "max-h-[98vh] max-w-sm rounded-3xl",
        closeButton: isMobile
          ? "m-4 p-2 text-2xl text-gray-500 hover:text-black"
          : "m-2 p-2 text-lg text-gray-500 hover:text-black",
        body: isMobile
          ? "pb-[env(safe-area-inset-bottom)] p-10"
          : "p-10"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            {children}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
