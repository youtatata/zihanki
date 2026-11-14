import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import {
  CROSSHAIR_ICON_URL,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_ICON_SIZE_PX,
  MAP_ID,
  PIN_ICON_URL,
} from '../constants'
import type { LatLng, VendingMachine } from '../types'

type Props = {
  machines?: VendingMachine[]
  onSelect?: (machine: VendingMachine) => void
  // 指定すると地図中央に照準を表示し、中心座標の変化を通知する
  onCenterChange?: (center: LatLng) => void
}

export function MapView({ machines = [], onSelect, onCenterChange }: Props) {
  return (
    <div className="map-container">
      <Map
        mapId={MAP_ID}
        defaultCenter={MAP_DEFAULT_CENTER}
        defaultZoom={MAP_DEFAULT_ZOOM}
        gestureHandling="greedy"
        onCameraChanged={onCenterChange && ((e) => onCenterChange(e.detail.center))}
      >
        {machines.map((m) => (
          <AdvancedMarker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            onClick={() => onSelect?.(m)}
            anchorLeft="-50%"
            anchorTop="-50%"
          >
            <img src={PIN_ICON_URL} width={MAP_ICON_SIZE_PX} height={MAP_ICON_SIZE_PX} alt="" />
          </AdvancedMarker>
        ))}
      </Map>
      {onCenterChange && (
        <img
          className="map-crosshair"
          src={CROSSHAIR_ICON_URL}
          width={MAP_ICON_SIZE_PX}
          height={MAP_ICON_SIZE_PX}
          alt=""
        />
      )}
    </div>
  )
}
