export interface IShelter {
  id: string
  nameCity: string
  locality: string
  nameShelter: string
  address: string
  contacts: string
  site: string
  comments: string
}

export interface ICity {
  id: string
  name: string
  shelters: IShelter[]
}