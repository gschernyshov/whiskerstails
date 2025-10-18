export interface IFormRegisterData {
  name: string
  telephone: string
  email: string
  password: string
  confirmPassword: string
}

export interface IFormLoginData {
  email: string
  password: string
}

export interface IFormUpdateUserData {
  name: string
  telephone: string
  email: string
}

export interface IFormCreateShelterData {
  nameCity: string
  locality: string
  nameShelter: string
  address: string
  contacts: string
  site: string
  comments: string
}