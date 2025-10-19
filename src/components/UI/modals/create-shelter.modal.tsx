"use client"

import CreateShelterForm from "@/app/forms/create-shelter.form"
import CustomModal from "@/components/common/modal"

interface IProps {
  isOpen: boolean,
  onClose: () => void
}

const CreateShelterModal = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <CreateShelterForm onClose={onClose} />
    </CustomModal>
  )
}

export default CreateShelterModal