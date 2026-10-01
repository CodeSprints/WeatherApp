import { ref } from 'vue'

export interface UserLocation {
  lat: number
  lon: number
  accuracy?: number
}

export const locationLoading = ref(false)
export const locationError = ref<string | null>(null)

export function requestLocation(): Promise<UserLocation | null> {
  if (!navigator.geolocation) {
    locationError.value = 'Ta przeglądarka nie obsługuje lokalizacji.'
    return Promise.resolve(null)
  }

  locationLoading.value = true
  locationError.value = null

  return new Promise<UserLocation | null>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationLoading.value = false
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
      },
      (error) => {
        locationLoading.value = false
        locationError.value = error.code === error.PERMISSION_DENIED
          ? 'Dostęp do lokalizacji został odrzucony.'
          : 'Nie udało się ustalić lokalizacji.'
        resolve(null)
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 300_000 },
    )
  })
}
