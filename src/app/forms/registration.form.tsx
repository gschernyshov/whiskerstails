"use client"

import { useState } from "react"
import Link from 'next/link'
import { Button, Input, Checkbox } from "@heroui/react"
import Alert from '@/components/common/alert'
import { registerUser } from "@/actions/register"
import { Icon } from "@iconify/react" 

interface IProps {
  onClose: () => void
  setIsLoginOpen: () => void
}

const RegistrationForm = ({ onClose, setIsLoginOpen }: IProps) =>  {
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loadingRegistration, setLoadingRegistration] = useState(false)
  const [action, setAction] = useState({
    error: false,
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoadingRegistration(true)
    try {
      const result = await registerUser({...formData})

      if(result.success) {
        setAction({ error: false, message: result.message })
        onClose()
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "При регистрации возникла ошибка" })
    } finally {
      setLoadingRegistration(false) 
    }
  }

  return (
   <div className="flex justify-center items-center h-full w-full text-black">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl leading-9 font-bold">
          Регистрация
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {action.message && <Alert error={action.error} message={action.message} />}

          <Input
            isRequired
            label="Имя"
            labelPlacement="outside"
            name="name"
            placeholder="Введите своё имя"
            type="text"
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingRegistration}
          />
          <Input
            isRequired
            label="Номер телефона"
            labelPlacement="outside"
            name="telephone"
            placeholder="Введите свой номер телефона"
            type="text"
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingRegistration}
          />
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Введите свой Email"
            type="email"
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingRegistration}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Пароль"
            labelPlacement="outside"
            name="password"
            placeholder="Введите свой пароль"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingRegistration}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Повторите пароль"
            labelPlacement="outside"
            name="confirmPassword"
            placeholder="Повторите свой пароль"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingRegistration}
          />
          <Checkbox isRequired className="checkbox py-4" size="sm" isDisabled={loadingRegistration}>
            <span className="text-black">Я согласен с&nbsp;</span>
            <Link className="relative z-1" href="/">
              <span className="text-sm !text-gray-500">
                Условиями
              </span>
            </Link>
            <span className="text-black">&nbsp;и&nbsp;</span>
            <Link className="relative z-1" href="/">
              <span className="text-sm !text-gray-500">
                Политикой конфиденциальности
              </span>
            </Link>
            <span className="text-black">.</span>
          </Checkbox>

          <Button 
            isLoading={loadingRegistration}
            color="primary" 
            type="submit"
            isDisabled={loadingRegistration}
          >
            {!loadingRegistration ? "Зарегистрироваться" : "Регистрация..."}
          </Button>
        </form>
        
        <p className="text-small text-center">
          <span 
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => {
              onClose()
              setIsLoginOpen()
            }}
          >
            У вас уже есть аккаунт? Войти
          </span>
        </p>
      </div>
    </div>
  )
}

export default RegistrationForm
