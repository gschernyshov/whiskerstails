"use client"

import { Avatar, Button } from '@heroui/react'
import CameraIcon from '@/components/common/camera-icon'
import { useAccount } from '@/context/account.context'

const UpdateUserAvatarForm = () => {
  const {
    userData,
    selectedFile,
    loadingUpdateUserDataById,
    handleFileChange,
    handleUpload,
  } = useAccount()
  
  return (
    <div className="flex gap-5 items-center">
      <Avatar
        className="w-27 md:w-40 h-27 md:h-40 text-large border-5 border-neutral-50"
        src={userData!.avatar}
      />
      <div className="flex flex-col gap-1 md:w-1/2">
        <div className="flex items-center gap-1">
          <Button isIconOnly aria-label="Выбрать фото" color="warning" variant="faded">
            <label
              htmlFor="image_uploads"
              className="cursor-pointer !text-yellow-500"
            >
              <CameraIcon />
            </label>
          </Button>
          <input
            id="image_uploads"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={loadingUpdateUserDataById}
          />
          
          <Button 
            isLoading={Boolean(selectedFile) && loadingUpdateUserDataById}
            size="md" 
            color="default" 
            variant="bordered" 
            className="text-gray-500"
            onPress={handleUpload} 
            disabled={loadingUpdateUserDataById}
          >
            {selectedFile ? (loadingUpdateUserDataById ? "Обновляем..." : "Обновить фото") : "Обновить фото"}
          </Button>
        </div>
        
        {selectedFile && <p className="font-nunito text-sm text-gray-500 pl-3">😻 фото выбрано</p>}
      </div>
    </div>
  )
}

export default UpdateUserAvatarForm
