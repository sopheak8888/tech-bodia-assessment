<template>
  <div>
    <input v-model="searchQuery" placeholder="Search by country name..." />
    <button @click="fetchData">Search</button>
    <div v-for="country in countries" :key="country.cca3" @click="showModal(country)">
      <img :src="country.flagsPng" alt="Flag" />
      <p>{{ country.countryName }}</p>
      <!-- Display other required fields here -->
    </div>
    <!-- Pagination controls -->
    <button @click="page > 1 && page--">Previous</button>
    <button @click="page++">Next</button>
    <!-- Modal component goes here -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { fetchCountries } from '@/services/CountryService'

export default {
  setup() {
    const countries = ref([])
    const searchQuery = ref('')
    const page = ref(1)
    const sortAsc = ref(true)

    const fetchData = async () => {
      countries.value = await fetchCountries(searchQuery.value, page.value, 25, sortAsc.value)
    }

    const showModal = (country) => {
      // Implement modal logic here
      console.log(country)
    }

    // Initial fetch
    fetchData()

    return { countries, searchQuery, page, fetchData, showModal }
  }
}
</script>
