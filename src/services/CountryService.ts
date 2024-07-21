import type { Country } from '@/types/Country'
import axios from 'axios'

const API_URL = 'https://restcountries.com/v3.1/'

const fetchData = async (searchQuery: string, fields: string) => {
  const apiUrl = searchQuery
    ? `${API_URL}name/${searchQuery}?fullText=false&fields=${fields}`
    : `${API_URL}all?fields=${fields}`
  return axios.get(apiUrl)
}

// const mapData = (response: any) =>
//   response.data.map((country: any) => ({
//     flagsPng: country.flags.png,
//     countryName: country.name.official,
//     cca2: country.cca2,
//     cca3: country.cca3,
//     nativeCountryName: JSON.stringify(country.name.nativeName)
//       .replace(/"(\w{2,3})?":{"official":"(.+?)","common":".+?"}/g, '$1: $2</br>')
//       .replace(/[{,}]/g, ''),
//     altSpellings: country.altSpellings.join(', '),
//     callingCode:
//       country.idd.root + (country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : '')
//   }))

const sortCountries = (countries: Country[], sortAsc: boolean) =>
  countries.sort((a, b) =>
    sortAsc
      ? a.name.official.localeCompare(b.name.official)
      : b.name.official.localeCompare(a.name.official)
  )

const paginateResults = (countries: Country[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize
  return countries.slice(startIndex, startIndex + pageSize)
}

export const fetchCountries = async (
  searchQuery = '',
  page = 1,
  pageSize = 25,
  sortAsc = true
): Promise<Country[]> => {
  try {
    const fields = 'flags,name,cca2,cca3,altSpellings,idd'
    const response = await fetchData(searchQuery, fields)
    let countries = response.data as Country[]
    countries = sortCountries(countries, sortAsc)
    return paginateResults(countries, page, pageSize)
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchCountry = async (cca3: string): Promise<Country | undefined> => {
  try {
    const response = await axios.get(API_URL + 'alpha/' + cca3)
    return response.data[0]
  } catch (error) {
    return undefined
  }
}
