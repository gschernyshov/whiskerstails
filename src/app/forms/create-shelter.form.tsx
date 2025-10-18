"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Select, SelectItem, Button, Input, Textarea } from "@heroui/react"
import Alert from '@/components/common/alert'
import PetIcon from "@/assets/icons"
import { createShelter } from "@/actions/create-shelter"
import { siteConfig } from "@/config/site.config"

interface IProps {
  onClose: () => void
}

const CreateShelterForm = ({ onClose }: IProps) =>  {
  const router = useRouter()
  const pathname = usePathname()
  const cities = siteConfig.cities

  const [formData, setFormData] = useState({
    nameCity: "",
    locality: "",
    nameShelter: "",
    address: "",
    contacts: "",
    site: "",
    comments: ""
  })
  const [loadingCreateShelter, setLoadingCreateShelter] = useState(false)
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

    setLoadingCreateShelter(true)
    try {
      const result = await createShelter({ ...formData })
      
      if (result.success) {
        setAction({ error: false, message: result.message })
        onClose()
        if (pathname === '/shelters') {
          window.location.reload()
        } else {
          router.push('/shelters')
        }
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "При добавление приюта возникла ошибка" })
    } finally {
      setLoadingCreateShelter(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full text-black">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl leading-9 font-bold">
          Добавление нового приюта
          <span aria-label="emoji" className="ml-2" role="img">
            ❤️
          </span>
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {action.message && <Alert error={action.error} message={action.message} />}
          <Select 
            isRequired
            label="Выберите город" 
            placeholder="Город"
            selectedKeys={[formData.nameCity]}
            variant="bordered"
            startContent={<PetIcon />}
            defaultSelectedKeys={[formData.nameCity]}
            onChange={(e) => setFormData({ ...formData, nameCity: e.target.value })}
            disabled={loadingCreateShelter}
          >
            {cities.map((citie) => (
              <SelectItem key={citie.key} className="text-black">{citie.label}</SelectItem>
            ))}
          </Select>
          <Input
            isRequired
            label="Населённый пункт"
            name="locality"
            placeholder="Введите название населённого пункта"
            type="text"
            variant="bordered"
            onChange={handleChange}
            value={formData.locality}
            disabled={loadingCreateShelter}
          />
          <Input
            isRequired
            label="Название приюта"
            name="nameShelter"
            placeholder="Введите название приюта"
            type="text"
            variant="bordered"
            value={formData.nameShelter}
            onChange={handleChange}
            disabled={loadingCreateShelter}
          />
          <Input
            isRequired
            label="Адрес приюта"
            name="address"
            placeholder="Введите адрес приюта"
            type="text"
            variant="bordered"
            value={formData.address}
            onChange={handleChange}
            disabled={loadingCreateShelter}
          />
          <Input
            isRequired
            label="Контактные данные приюта"
            name="contacts"
            placeholder="Введите контактные данные приюта"
            type="text"
            variant="bordered"
            value={formData.contacts}
            onChange={handleChange}
            disabled={loadingCreateShelter}
          />
          <Input
            isRequired
            label="Сайт приюта"
            name="site"
            placeholder="Введите ссылку на сайт приюта"
            type="text"
            variant="bordered"
            value={formData.site}
            onChange={handleChange}
            disabled={loadingCreateShelter}
          />
          <Textarea
            isRequired
            defaultValue=""
            label="Комментарий"
            name="comments"
            placeholder="Введите комментарий"
            description="Например: «Проверенный приют, сотрудничаем уже 5 лет!»"
            minRows={1}
            variant="bordered"
            value={formData.comments}
            onChange={handleChange}
            disabled={loadingCreateShelter}
          />
            
          <Button 
            isLoading={loadingCreateShelter}
            type="submit"
            color="primary" 
            disabled={loadingCreateShelter}
          >
            {loadingCreateShelter ? "Отправка..." : "Добавить приют"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateShelterForm