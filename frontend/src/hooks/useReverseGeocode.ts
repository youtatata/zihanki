import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useCallback } from 'react'
import type { Area, LatLng } from '../types'

type AddressComponent = google.maps.GeocoderAddressComponent

// 検索結果の中から、指定した種類の住所要素を最初に見つかった順で探す
function findComponent(results: google.maps.GeocoderResult[], type: string): AddressComponent | undefined {
  for (const result of results) {
    const found = result.address_components.find((c) => c.types.includes(type))
    if (found) return found
  }
  return undefined
}

function extractArea(results: google.maps.GeocoderResult[]): Area | null {
  const prefecture = findComponent(results, 'administrative_area_level_1')
  // 市区町村は locality。見つからない地域は郡など一段上の区分で代用する
  const city = findComponent(results, 'locality') ?? findComponent(results, 'administrative_area_level_2')
  if (!prefecture) return null
  return { prefecture: prefecture.long_name, city: city?.long_name ?? '' }
}

// 緯度・経度から都道府県と市区町村を調べる関数を返す。調べられなければ null
export function useReverseGeocode() {
  const geocoding = useMapsLibrary('geocoding')

  return useCallback(
    async (position: LatLng): Promise<Area | null> => {
      if (!geocoding) return null
      try {
        const { results } = await new geocoding.Geocoder().geocode({ location: position })
        return extractArea(results)
      } catch {
        // Geocoding API が無効・通信失敗など。地域なしで保存を続ける
        return null
      }
    },
    [geocoding],
  )
}
