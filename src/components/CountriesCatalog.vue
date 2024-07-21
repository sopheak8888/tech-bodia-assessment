<template>
  <div>
    <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
      <div class="flex">
        <div class="flex-auto justify-start space-x-2 mb-4">
          <form @submit.prevent="submitSearch" class="flex">
            <input v-model="search" placeholder="Search by country name..." class=" p-2 border rounded mr-4" />
            <button @click.prevent="submitSearch" class="p-2 bg-blue-500 text-white rounded">Search</button>
          </form>
        </div>
        <div class="flex-auto space-x-2 mb-4 text-right">
          <button @click="page > 1 && page--" :class="(page <= 1? 'bg-blue-300': 'bg-blue-500') + ' p-2 text-white rounded'" :disabled="page <= 1">Previous</button>
        <span class="p-2">Page {{ page }}</span>
        <button @click="page++" :class="(countries.length < 25? 'bg-blue-300': 'bg-blue-500') + ' p-2 bg-blue-500 text-white rounded'" :disabled="countries.length < 25">Next</button>
        </div>
      </div>
      <div class="overflow-x-auto mt-6">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2">Flags</th>
              <th class="px-4 py-2 cursor-pointer" @click="sort = !sort">Country Name
                  {{ sort ? '↓' : '↑' }}
              </th>
              <th class="px-4 py-2">2 character Country Code</th>
              <th class="px-4 py-2">3 character Country Code</th>
              <th class="px-4 py-2">Native Country Name</th>
              <th class="px-4 py-2">Alternative Country Name</th>
              <th class="px-4 py-2">Country Calling Codes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in countries" :key="country.cca3" @click="showModal(country)" class="bg-white border-b hover:bg-gray-100">
              <td class="px-4 py-2"><img :src="country.flags.png" alt="Flag" class="h-6 w-10"></td>
              <td class="px-4 py-2">{{ country.name.official }}</td>
              <td class="px-4 py-2">{{ country.cca2 }}</td>
              <td class="px-4 py-2">{{ country.cca3 }}</td>
              <td class="px-4 py-2" v-html="formattedNativeName(country.name.nativeName)"></td>
              <td class="px-4 py-2">{{ country.altSpellings.join(', ') }}</td>
              <td class="px-4 py-2">{{ country.idd.root + (country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : '') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CountryModal :isVisible="isModalVisible" :country="selectedCountry" @update:isVisible="isModalVisible = $event"></CountryModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { fetchCountries } from '@/services/CountryService'
import type { Country } from '@/types/Country.ts'
import CountryModal from '@/components/CountryModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const params = new URLSearchParams(window.location.search)
const countries = ref<Country[]>([])
const search = ref(params.get('search') || '')
const page = ref(parseInt(params.get('page') || '1'))
const sort = ref(params.get('sort') === 'true')
const isModalVisible = ref(false)
const selectedCountry = ref<Country | null>(null)

const fetchData = async () => {
  countries.value = await fetchCountries(search.value, page.value, 25, sort.value)
}

const showModal = (country: Country) => {
  selectedCountry.value = country
  isModalVisible.value = true
}

const submitSearch = () => {
  page.value = 1
  router.push({ query: { search: search.value, page: page.value.toString(), sort: sort.value.toString() } })
  fetchData()
}

watch([page, sort], () => {
  router.push({ query: { page: page.value.toString(), sort: sort.value.toString() } })
  fetchData()
})

const formattedNativeName = (nativeName: string) => {
  return JSON.stringify(nativeName)
    .replace(/"(\w{2,3})?":{"official":"(.+?)","common":".+?"}/g, '$1: $2</br>')
    .replace(/[{,}]/g, '');
}
    
onMounted(() => {
  fetchData()
})
</script>