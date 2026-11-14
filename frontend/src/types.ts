export type LatLng = {
  lat: number
  lng: number
}

export type VendingMachine = LatLng & {
  id: number
  image_url: string
  date: string // YYYY-MM-DD
  created_at: string
}
