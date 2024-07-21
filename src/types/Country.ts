export interface Country {
  flags: { png: string }
  name: { common: string; official: string; nativeName: string }
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: { [key: string]: { name: string } }
  idd: { root: string; suffixes: string[] }
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: { [key: string]: string }
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  population: number
  fifa: string
  car: { side: string }
  timezones: string[]
  continents: string[]
  maps: { googleMaps: string; openStreetMaps: string }
  startOfWeek: string
  capitalInfo: { latlng: number[] }
  postalCode: { format: string }
}
