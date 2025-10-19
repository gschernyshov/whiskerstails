"use client"

import { sendLetter } from "@/actions/send-letter"
import { Button, Input, Textarea } from "@heroui/react"
import Alert from "@/components/common/alert"
import { Icon } from "@iconify/react"
import { useState } from "react"

interface ISendLetterFormProps {
  userId: string
}

const SendLetterForm = ({ userId }: ISendLetterFormProps) => {
  const [formData, setFormData] = useState({
    userId,
    telephone: "",
    message: ""
  })
  const [loadingSendLetter, setLoadingSendLetter] = useState(false)
  const [action, setAction] = useState({
    error: false,
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoadingSendLetter(true)
    try {
      const result = await sendLetter({...formData})

      if (result.success === true) {
        setFormData(prev => ({ ...prev, telephone: "", message: "" }))
        setAction({ error: false, message: result.message })
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "При отправке сообщения возникла ошибка"  })
    } finally {
      setLoadingSendLetter(false)
    }
  }

  return (
    <form className="flex flex-col gap-2 text-black" onSubmit={handleSubmit}>
      <h2 className="text-lg leading-8 font-bold">Напишите владельцу питомца</h2>
      <Input 
        isRequired
        name="telephone"
        placeholder="Введите свой номер телефона"
        type="tel"
        variant="bordered" 
        className="w-4/5 md:w-3/5"
        value={formData.telephone}
        onChange={handleChange}
        isDisabled={loadingSendLetter}
      />
      <div className="flex items-end gap-2">
        <Textarea
          isRequired
          label="Сообщение для владельца"
          placeholder="Введите своё сообщение для владельца..."
          name="message"
          variant="bordered"
          className="max-full"
          value={formData.message}
          onChange={handleChange}
          isDisabled={loadingSendLetter}
        />

        <Button 
          isIconOnly 
          aria-label="Send" 
          type="submit"
          variant="bordered"
          color="warning"  
          size="sm"
          className="mb-1"  
          isDisabled={loadingSendLetter}
        >
          <Icon icon="gravity-ui:arrow-shape-turn-up-right" height="14" width="14" />
        </Button>
      </div>
      
      {action.message && <Alert error={action.error} message={action.message} />}
    </form>
  )
}

export default SendLetterForm
