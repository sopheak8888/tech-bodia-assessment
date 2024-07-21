export type Country = {
  flagsPng: string
  countryName: string
  cca2: string
  cca3: string
  nativeCountryName: string
  altSpellings: string[]
  idd: {
    root?: string
    suffixes?: string[]
  }
}
