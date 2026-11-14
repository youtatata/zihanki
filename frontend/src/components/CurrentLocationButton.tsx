import { AdvancedMarker, ControlPosition, MapControl, useMap } from '@vis.gl/react-google-maps'
import { useState } from 'react'
import { CURRENT_LOCATION_ZOOM, GEOLOCATION_TIMEOUT_MS } from '../constants'
import { useToast } from '../contexts/toast'
import type { LatLng } from '../types'

// 位置情報の取得に失敗した理由を利用者向けの文に変換する
function geolocationErrorMessage(error: GeolocationPositionError): string {
  if (error.code === error.PERMISSION_DENIED) {
    return '位置情報の利用が許可されていません。ブラウザの設定を確認してください'
  }
  if (error.code === error.TIMEOUT) return '現在地の取得に時間がかかったため中止しました'
  return '現在地を取得できませんでした'
}

// 地図右下の現在地ボタン。押すと現在地へ移動し、青い点を表示する（<Map> の中に置く）
export function CurrentLocationButton() {
  const map = useMap()
  const showToast = useToast()
  const [current, setCurrent] = useState<LatLng | null>(null)
  const [locating, setLocating] = useState(false)

  function handleClick() {
    if (!navigator.geolocation) {
      showToast('このブラウザは位置情報に対応していません', 'error')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const position = { lat: coords.latitude, lng: coords.longitude }
        setCurrent(position)
        map?.panTo(position)
        map?.setZoom(CURRENT_LOCATION_ZOOM)
        setLocating(false)
      },
      (error) => {
        showToast(geolocationErrorMessage(error), 'error')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: GEOLOCATION_TIMEOUT_MS },
    )
  }

  return (
    <>
      <MapControl position={ControlPosition.RIGHT_BOTTOM}>
        <button
          type="button"
          className="current-location-button"
          aria-label="現在地へ移動"
          title="現在地へ移動"
          disabled={locating}
          onClick={handleClick}
        >
          {locating ? '…' : '◎'}
        </button>
      </MapControl>
      {current && (
        <AdvancedMarker position={current} anchorLeft="-50%" anchorTop="-50%" clickable={false}>
          <div className="current-location-dot" />
        </AdvancedMarker>
      )}
    </>
  )
}
