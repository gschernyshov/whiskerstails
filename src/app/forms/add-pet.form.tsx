"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, Input, Radio, RadioGroup, Select, SelectItem, Slider, Textarea, Button } from "@heroui/react"
import Alert from '@/components/common/alert'
import CameraIcon from "@/components/common/camera-icon"
import PetIcon from "@/assets/icons"
import { useAuthStore } from "@/store/auth.store"
import { siteConfig } from "@/config/site.config"

const AddPetForm = () => {
  const router = useRouter()
  const { session } = useAuthStore()
  const userId = session?.user?.id
  const cities = siteConfig.cities

  const [preview, setPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    userId: userId,
    photo: null as File | null,
    nameCity: "",
    location: "",
    species: "",
    gender: "",
    age: "0",
    description: "",
    status: "active",
  })
  const [loadingAddPet, setLoadingAddPet] = useState(false)
  const [action, setAction] = useState({
    error: false,
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      e.target.value = ""
      setFormData(prev => ({ ...prev, photo: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId) {
      setAction({error: true, message: "При добавлении питомца возникла ошибка" })
      return
    }

    if (!formData.photo){
      setAction({error: true, message: "Добавьте фотографию питомца" })
      return
    }

    setLoadingAddPet(true)

    const body = new FormData()
    body.append("userId", userId)
    body.append("photo", formData.photo)
    body.append("nameCity", formData.nameCity)
    body.append("location", formData.location)
    body.append("species", formData.species)
    body.append("gender", formData.gender)
    body.append("age", formData.age)
    body.append("description", formData.description)
    body.append("status", formData.status)

    try {
      const res = await fetch(`/api/add-pet`, {
        method: "POST",
        body
      })

      if (!res.ok) {
        setAction({error: true, message: "При добавлении питомца возникла ошибка" })
      }   

      const result = await res.json()

      if (result.success) {
        setAction({ error: false, message: result.message })
        router.push(`/pet/${result.petId}`)
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({error: true, message: "При добавлении питомца возникла ошибка" })
    } finally {
      setLoadingAddPet(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 pt-3 text-black">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl text-center leading-9 font-bold">Введите данные</h2>
        <p className="text-sm text-center text-gray-500">Пожалуйста, указывайте только достоверные данные о питомце. Информация будет опубликована в открытом доступе, чтобы помочь людям найти и забрать животное</p>
      </div>

      <div className="flex justify-center w-full my-3">
        {!preview ? (
          <>
            <Button 
              color="primary"
              radius="full"
              endContent={<CameraIcon />}
              isDisabled={loadingAddPet}
            >
              <label
                htmlFor="image_uploads"
                className="cursor-pointer !text-white"
              >
                Добавить фото
              </label>
            </Button>

            <input 
              id="image_uploads" 
              type="file" 
              accept="image/*"          
              className="hidden" 
              onChange={handleFileChange} 
            />
          </>
        ) : (
          <Avatar src={preview} className="w-60 h-60 object-cover border-5 border-blue-500" />
        )}
      </div>
      <Select 
        isRequired
        label="Выберите город" 
        placeholder="Город"
        startContent={<PetIcon />}
        variant="bordered"
        color="primary"
        className="w-full" 
        selectedKeys={formData.nameCity ? [formData.nameCity] : []}
        onChange={(e) => setFormData({ ...formData, nameCity: e.target.value })}
        isDisabled={loadingAddPet}
      >
        {cities.map((citie) => <SelectItem key={citie.key} className="text-black">{citie.label}</SelectItem> )}
      </Select>
      <Input
        isRequired
        label="Населённый пункт"
        placeholder="Введите населённый пункт"
        name="location"
        type="text"
        variant="bordered"
        color="primary"
        value={formData.location}
        onChange={handleChange}
        isDisabled={loadingAddPet}
      />
      <Select
        isRequired
        label="Вид"
        placeholder="Введите вид животного"
        name="species"
        variant="bordered"
        color="primary"
        selectedKeys={formData.species ? [formData.species] : []}
        onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
        isDisabled={loadingAddPet}
      >
        <SelectItem key="Кошка" className="text-black">Кошка</SelectItem>
        <SelectItem key="Собака" className="text-black">Собака</SelectItem>
        <SelectItem key="Другое" className="text-black">Другое</SelectItem>
      </Select>
      <RadioGroup
        isRequired
        label={<span className="text-sm text-blue-500">Пол животного</span>}
        color="primary"
        value={formData.gender}
        onValueChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
        isDisabled={loadingAddPet}
      >
        <Radio value="Самка">Самка</Radio>
        <Radio value="Самец">Самец</Radio>
      </RadioGroup>
      <div className="w-full">
        <Slider
          label={<span className="text-sm text-blue-500">Возраст (в месяцах)</span>}
          color="primary"
          minValue={0}
          maxValue={120}
          step={1}
          value={Number(formData.age)}
          onChange={(val) => setFormData(prev => ({ ...prev, age: String(val) }))}
          isDisabled={loadingAddPet}
        />
        <p className="text-sm text-gray-500 mt-1">Выбранный возраст: {formData.age} мес.</p>
      </div>
      <Textarea
        isRequired
        label="Описание"
        placeholder="Например: дружелюбный, активный, любит детей..."
        name="description"
        color="primary"
        variant="bordered"
        value={formData.description}
        onChange={handleChange}
        isDisabled={loadingAddPet}
      />
      
      {action.message && <Alert error={action.error} message={action.message} />}

      <Button 
        isLoading={loadingAddPet}
        type="submit" 
        size="lg" 
        color="primary" 
        className="w-full"
        isDisabled={loadingAddPet}
      >
        {!loadingAddPet ? "Создать анкету" : "Создание анкеты..."}
      </Button>
    </form>
  )
}

export default AddPetForm
