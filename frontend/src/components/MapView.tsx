import { Map, useMap } from '@vis.gl/react-google-maps'
import { useEffect, type ReactNode } from 'react'
import {
  CROSSHAIR_ICON_URL,
  CROSSHAIR_SIZE_PX,
  FOCUS_ZOOM,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_ID,
} from '../constants'
import type { LatLng, VendingMachine } from '../types'
import { ClusteredPins } from './ClusteredPins'
import { CurrentLocationButton } from './CurrentLocationButton'

type Props = {
  machines?: VendingMachine[]
  selectedId?: number
  onSelect?: (machine: VendingMachine) => void
  // 指定すると地図中央に照準を表示し、中心座標の変化を通知する
  onCenterChange?: (center: LatLng) => void
  // 指定すると、その位置を拡大して表示する（一覧から来たとき・編集時）
  focus?: LatLng
  children?: ReactNode // 地図の上に重ねる案内表示など
}

export function MapView({ machines = [], selectedId, onSelect, onCenterChange, focus, children }: Props) {
  return (
    <div className="map-container">
      <Map
        mapId={MAP_ID}
        defaultCenter={MAP_DEFAULT_CENTER}
        defaultZoom={MAP_DEFAULT_ZOOM}
        gestureHandling="greedy"
        onCameraChanged={onCenterChange && ((e) => onCenterChange(e.detail.center))}
      >
        <ClusteredPins machines={machines} selectedId={selectedId} onSelect={onSelect} />
        <CurrentLocationButton />
        {focus && <MapFocus position={focus} />}
      </Map>
      {onCenterChange && (
        <img
          className="map-crosshair"
          src={CROSSHAIR_ICON_URL}
          width={CROSSHAIR_SIZE_PX}
          height={CROSSHAIR_SIZE_PX}
          alt=""
        />
      )}
      {children}
    </div>
  )
}

// 指定位置へ地図を移動して拡大する。位置の値が変わったときだけ動かす
function MapFocus({ position }: { position: LatLng }) {
  const map = useMap()
  const { lat, lng } = position

  useEffect(() => {
    if (!map) return
    map.setCenter({ lat, lng })
    map.setZoom(FOCUS_ZOOM)
  }, [map, lat, lng])

  return null
}
