"use client"

import CustomModal from "@/components/common/modal"
import LoginForm from "@/app/forms/login.form"

interface IProps {
  isOpen: boolean
  onClose: () => void
  setIsRegistrationOpen: () => void
}

const LoginnModal = ({ isOpen, onClose, setIsRegistrationOpen }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <LoginForm onClose={onClose} setIsRegistrationOpen={setIsRegistrationOpen} />
    </CustomModal>
  )
}

export default LoginnModal
