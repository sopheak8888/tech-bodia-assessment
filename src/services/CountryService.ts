import type { Country } from '@/types/Country'
import axios from 'axios'
import fuse from 'fuse.js'

const API_URL = 'https://restcountries.com/v3.1/'

const fetchData = async (fields: string) => {
  const apiUrl = `${API_URL}all?fields=${fields}`
  return axios.get(apiUrl)
}

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

const fuzzySearch = (searchQuery: string, country: Country[]) => {
  if (!searchQuery) return country
  const query = searchQuery.toLowerCase()
  const options = {
    keys: [{ name: 'name.official', weight: 2 }],
    threshold: 0.4
  }
  const fuseInstance = new fuse(country, options)
  const result = fuseInstance.search(query)
  return result.map((result) => result.item)
}

export const fetchCountries = async (
  searchQuery = '',
  page = 1,
  pageSize = 25,
  sortAsc = true
): Promise<Country[]> => {
  try {
    const fields = 'flags,name,cca2,cca3,altSpellings,idd'
    const response = await fetchData(fields)
    let countries = fuzzySearch(searchQuery, response.data) as Country[]
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
