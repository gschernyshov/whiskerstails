"use client"

import { Button, Input } from "@heroui/react"
import { useAccount } from "@/context/account.context"

const UpdateUserDataForm = () => {  
  const {
    formData,
    loadingUpdateUserDataById,
    isDeleting,
    handleChange,
    handleSubmit,
    handleDeleteAccount,
  } = useAccount() 

  return (
    <form className="flex flex-col gap-7 text-black" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center w-full">
        <p className="text-sm text-gray-500">Имя:</p>
        <Input 
          isRequired
          name="name"
          placeholder="Введите своё имя"
          type="text"  
          variant="bordered" 
          className="w-3/5"
          value={formData.name}
          onChange={handleChange}
          disabled={loadingUpdateUserDataById}
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-sm text-gray-500">Телефон:</p>
        <Input 
          isRequired
          name="telephone"
          placeholder="Введите свой номер телефона"
          type="tel"
          variant="bordered" 
          className="w-3/5"
          value={formData.telephone}
          onChange={handleChange}
          disabled={loadingUpdateUserDataById}
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-sm text-gray-500">Email:</p>
        <Input 
          isRequired
          name="email"
          placeholder="Введите свой Email"
          type="email"  
          variant="bordered" 
          className="w-3/5"
          value={formData.email}
          onChange={handleChange}
          disabled={loadingUpdateUserDataById}
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-sm text-gray-500">Пароль:</p>
        <Input 
         isRequired
          name="password"
          placeholder=""
          type="password"
          variant="bordered" 
          className="w-3/5"
          defaultValue="********"
          isDisabled
        />
      </div>

      <Button 
        isLoading={loadingUpdateUserDataById}
        size="md"
        color="primary"
        radius="full"
        type="submit"
        className="mt-5"
        disabled={loadingUpdateUserDataById}
      >
        {!loadingUpdateUserDataById ? "Сохранить изменения" : "Сохраняем..."}
      </Button>

      <button
        className={`cursor-pointer flex items-center justify-center gap-2 my-[-3px] text-sm text-gray-500 transition-all
                    ${isDeleting ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={handleDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting && (
          <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
        )}
        {!isDeleting ? "Удалить аккаунт?" : "Удаляем..."}
      </button>
    </form>
  )
}

export default UpdateUserDataForm
