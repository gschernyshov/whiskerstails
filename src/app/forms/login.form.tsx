"use client"

import { useState } from "react"
import { Button, Input, Checkbox, Form } from "@heroui/react"
import Alert from '@/components/common/alert'
import { signInWithCredentials } from "@/actions/sign-in"
import { passwordResetFunc } from "@/actions/password-reset"
import { Icon } from "@iconify/react"

interface IProps {
  onClose: () => void
  setIsRegistrationOpen: () => void
}

const LoginForm = ({ onClose, setIsRegistrationOpen }: IProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const [textPasswordReset, setTextPasswordReset] = useState("Забыли пароль?")

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loadingLoginOrPasswordReset, setLoadingLoginOrPasswordReset] = useState(false)
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

    setLoadingLoginOrPasswordReset(true)
    try{
      const result = await signInWithCredentials({...formData})

      if(result.success) {
        setAction({ error: false, message: result.message })
        onClose()
        window.location.reload()
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "При авторизации возникла ошибка" })
    } finally {
      setLoadingLoginOrPasswordReset(false)
    }
  }

  const passwordReset = async () => {
    if (!formData.email) {
      setAction({ error: true, message: "Введите Email" })
      return
    }

    setLoadingLoginOrPasswordReset(true)
    setTextPasswordReset("")
    try{
      const result = await passwordResetFunc({ email: formData.email }) 

      if(result.success) {
        setAction({ error: false, message: result.message })
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "При сбросе пароля возникла ошибка" })
    } finally {
      setLoadingLoginOrPasswordReset(false)
      setTextPasswordReset("Забыли пароль?")
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full text-black">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <h2 className="text-3xl leading-9 font-bold">
          Вход
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </h2>
        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
          {action.message && <Alert error={action.error} message={action.message} />}

          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Введите Email"
            type="email"
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingLoginOrPasswordReset}
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
            placeholder="Введите пароль"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingLoginOrPasswordReset}
          />
          <div className="flex justify-between items-center w-full y-2 px-1">
            <Checkbox isRequired /*defaultSelected*/ name="remember" className="checkbox" size="sm" isDisabled={loadingLoginOrPasswordReset}>
              <span className="text-default-500">Запомнить меня</span>
            </Checkbox>
            <span 
              className="cursor-pointer text-sm text-gray-500"
              onClick={passwordReset}
            >
              {textPasswordReset}
            </span>
          </div>

          <Button
            isLoading={loadingLoginOrPasswordReset}
            className="w-full" 
            color="primary" 
            type="submit"
            isDisabled={loadingLoginOrPasswordReset}
          >
            {!loadingLoginOrPasswordReset ? "Войти" : textPasswordReset ?  "Вход..." : "Сброс пароля..."}
          </Button>
        </Form>
        
        <p className="text-small text-center">
          <span 
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => {
              onClose()
              setIsRegistrationOpen()
            }}
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginForm