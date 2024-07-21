<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" @click.self="closeModal">
    <div class="relative top-10 mx-auto p-5 border w-[500px] bg-white rounded-lg shadow-lg">
      <div v-if="loading">Loading...</div>
      <div v-else class="mt-3">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
          <img :src="countryInfo.flags.png" alt="Flag" class="h-6 w-10">
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">Country Information</h3>
        <div class="mt-2 px-2 py-3 text-sm text-gray-500">
          <p>Common Name: {{ countryInfo?.name?.common }}</p>
          <p>Official Name: {{ countryInfo?.name?.official }}</p>
          <p>Top Level Domain: {{ countryInfo?.tld?.join(', ') }}</p>
          <p>CCA2: {{ countryInfo?.cca2 }}</p>
          <p>CCN3: {{ countryInfo?.ccn3 }}</p>
          <p>CCA3: {{ countryInfo?.cca3 }}</p>
          <p>CIOC: {{ countryInfo?.cioc }}</p>
          <p>Independent: {{ countryInfo?.independent ? 'Yes' : 'No' }}</p>
          <p>Status: {{ countryInfo?.status }}</p>
          <p>UN Member: {{ countryInfo?.unMember ? 'Yes' : 'No' }}</p>
          <p>Currencies: {{ Object?.values(countryInfo?.currencies)?.map(currency => currency?.name)?.join(', ') }}</p>
          <p>IDD Root: {{ countryInfo?.idd?.root }}</p>
          <p>IDD Suffixes: {{ countryInfo?.idd?.suffixes?.join(', ') }}</p>
          <p>Capital: {{ countryInfo?.capital?.join(', ') }}</p>
          <p>Alt Spellings: {{ countryInfo?.altSpellings?.join(', ') }}</p>
          <p>Region: {{ countryInfo?.region }}</p>
          <p>Subregion: {{ countryInfo?.subregion }}</p>
          <p>Languages: {{ Object?.values(countryInfo?.languages)?.join(', ') }}</p>
          <p>Lat, Lng: {{ countryInfo?.latlng?.join(', ') }}</p>
          <p>Landlocked: {{ countryInfo?.landlocked ? 'Yes' : 'No' }}</p>
          <p>Borders: {{ countryInfo?.borders?.join(', ') }}</p>
          <p>Area: {{ countryInfo?.area }}</p>
          <p>Population: {{ countryInfo?.population }}</p>
          <p>FIFA: {{ countryInfo?.fifa }}</p>
          <p>Car Side: {{ countryInfo?.car?.side }}</p>
          <p>Timezones: {{ countryInfo?.timezones?.join(', ') }}</p>
          <p>Continents: {{ countryInfo?.continents?.join(', ') }}</p>
          <p>Google Maps: <a :href="countryInfo?.maps?.googleMaps" target="_blank">View</a></p>
          <p>OpenStreetMap: <a :href="countryInfo?.maps?.openStreetMaps" target="_blank">View</a></p>
          <p>Start of Week: {{ countryInfo?.startOfWeek }}</p>
          <p>Capital Latitude, Longitude: {{ countryInfo?.capitalInfo?.latlng?.join(', ') }}</p>
          <p>Postal Code Format: {{ countryInfo?.postalCode?.format }}</p>
        </div>
        <div class="items-center px-4 py-3">
          <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchCountry } from '@/services/CountryService'
import type { Country } from '@/types/Country.ts'

export default {
  props: ['isVisible', 'country'],
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    },
  },
  data() {
    return {
      loading: false,
      countryInfo: {} as Country
    }
  },
  watch: {
    country: {
      immediate: true,
      handler() {
        if (this.country?.cca2 !== undefined) {
          this.loading = true;
          fetchCountry(this.country.cca2).then((data) => {
            this.countryInfo = data as Country;
            this.loading = false;
          })
        }
      }
    }
  }
}
</script>