export interface IPet {
  id: string
  userId?: string
  photo: string
  nameCity: string
  location: string
  species: string
  gender: string
  age: number
  description: string
  status?: string
  createdAt: Date
}