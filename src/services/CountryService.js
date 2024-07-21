import axios from 'axios'

const API_URL = 'https://restcountries.com/v3.1/'

export const fetchCountries = async (searchQuery = '', page = 1, pageSize = 25, sortAsc = true) => {
  try {
    // Define the fields to fetch
    const fields = 'flags,name,cca2,cca3,altSpellings,idd'
    let apiUrl = `${API_URL}all?fields=${fields}`

    // If there's a search query, use the name endpoint instead
    if (searchQuery) {
      apiUrl = `${API_URL}name/${searchQuery}?fullText=false&fields=${fields}`
    }

    const response = await axios.get(apiUrl)
    let countries = response.data.map((country) => ({
      flagsPng: country.flags.png,
      countryName: country.name.official,
      cca2: country.cca2,
      cca3: country.cca3,
      nativeCountryName: country.name.nativeName
        ? Object.values(country.name.nativeName)[0].official
        : '',
      altSpellings: country.altSpellings,
      idd: country.idd
      // Include other properties you need for the modal
    }))

    // Sort by country name
    countries.sort((a, b) =>
      sortAsc
        ? a.countryName.localeCompare(b.countryName)
        : b.countryName.localeCompare(a.countryName)
    )

    // Apply pagination only if not searching by name, as the search might return fewer results
    if (!searchQuery) {
      const startIndex = (page - 1) * pageSize
      countries = countries.slice(startIndex, startIndex + pageSize)
    }

    return countries
  } catch (error) {
    console.error('Failed to fetch countries:', error)
    return []
  }
}
