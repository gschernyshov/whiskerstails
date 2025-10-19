"use client"

import CustomModal from "@/components/common/modal"
import RegistrationForm from "@/app/forms/registration.form"

interface IProps {
  isOpen: boolean
  onClose: () => void
  setIsLoginOpen: () => void
}

const RegistrationModal = ({ isOpen, onClose, setIsLoginOpen }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <RegistrationForm onClose={onClose} setIsLoginOpen={setIsLoginOpen} />
    </CustomModal>
  )
}

export default RegistrationModal
