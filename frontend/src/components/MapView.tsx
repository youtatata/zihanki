import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import type { ReactNode } from 'react'
import {
  CROSSHAIR_ICON_URL,
  CROSSHAIR_SIZE_PX,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_ICON_SIZE_PX,
  MAP_ID,
  PIN_ICON_URL,
  SELECTED_PIN_SIZE_PX,
} from '../constants'
import type { LatLng, VendingMachine } from '../types'
import { CurrentLocationButton } from './CurrentLocationButton'

type Props = {
  machines?: VendingMachine[]
  selectedId?: number
  onSelect?: (machine: VendingMachine) => void
  // 指定すると地図中央に照準を表示し、中心座標の変化を通知する
  onCenterChange?: (center: LatLng) => void
  children?: ReactNode // 地図の上に重ねる案内表示など
}

export function MapView({ machines = [], selectedId, onSelect, onCenterChange, children }: Props) {
  return (
    <div className="map-container">
      <Map
        mapId={MAP_ID}
        defaultCenter={MAP_DEFAULT_CENTER}
        defaultZoom={MAP_DEFAULT_ZOOM}
        gestureHandling="greedy"
        onCameraChanged={onCenterChange && ((e) => onCenterChange(e.detail.center))}
      >
        {machines.map((m) => {
          const selected = m.id === selectedId
          const size = selected ? SELECTED_PIN_SIZE_PX : MAP_ICON_SIZE_PX
          return (
            <AdvancedMarker
              key={m.id}
              position={{ lat: m.lat, lng: m.lng }}
              onClick={() => onSelect?.(m)}
              // ピンの先端（画像の下端中央）が登録位置を指す
              anchorLeft="-50%"
              anchorTop="-100%"
              // 選択中のピンを他のピンより手前に出す
              zIndex={selected ? 1 : 0}
            >
              <img className="map-pin" src={PIN_ICON_URL} width={size} alt="" />
            </AdvancedMarker>
          )
        })}
        <CurrentLocationButton />
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
