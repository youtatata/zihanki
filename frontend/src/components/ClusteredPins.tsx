import { MarkerClusterer, type Renderer } from '@googlemaps/markerclusterer'
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useState } from 'react'
import { CLUSTER_Z_INDEX, MAP_ICON_SIZE_PX, PIN_ICON_URL, SELECTED_PIN_SIZE_PX } from '../constants'
import type { VendingMachine } from '../types'

type MarkerElement = google.maps.marker.AdvancedMarkerElement
type SetMarkerRef = (marker: MarkerElement | null, id: number) => void

// まとめ表示の見た目：件数を書いたオレンジの丸
const clusterRenderer: Renderer = {
  render: ({ count, position }) => {
    const badge = document.createElement('div')
    badge.className = 'cluster-badge'
    badge.textContent = String(count)
    return new google.maps.marker.AdvancedMarkerElement({ position, content: badge, zIndex: CLUSTER_Z_INDEX })
  },
}

type Props = {
  machines: VendingMachine[]
  selectedId?: number
  onSelect?: (machine: VendingMachine) => void
}

// 自販機のピンを表示し、密集している所は件数の丸にまとめる（<Map> の中に置く）
export function ClusteredPins({ machines, selectedId, onSelect }: Props) {
  const map = useMap()
  // 表示中のピン（Google Maps のマーカー）を id ごとに覚えておき、まとめ表示に渡す
  const [markers, setMarkers] = useState<Record<number, MarkerElement>>({})

  const setMarkerRef = useCallback<SetMarkerRef>((marker, id) => {
    setMarkers((prev) => {
      if (marker) return prev[id] === marker ? prev : { ...prev, [id]: marker }
      if (!(id in prev)) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  // ピンが増減したら作り直す（件数が少ないため、差分更新より単純さを優先）
  useEffect(() => {
    if (!map) return
    const clusterer = new MarkerClusterer({ map, markers: Object.values(markers), renderer: clusterRenderer })
    return () => clusterer.setMap(null)
  }, [map, markers])

  return machines.map((m) => (
    <Pin
      key={m.id}
      machine={m}
      selected={m.id === selectedId}
      onSelect={onSelect}
      setMarkerRef={setMarkerRef}
    />
  ))
}

type PinProps = {
  machine: VendingMachine
  selected: boolean
  onSelect?: (machine: VendingMachine) => void
  setMarkerRef: SetMarkerRef
}

function Pin({ machine, selected, onSelect, setMarkerRef }: PinProps) {
  // ref 関数を毎回作り直すと登録・解除が繰り返されるため、固定しておく
  const ref = useCallback((marker: MarkerElement | null) => setMarkerRef(marker, machine.id), [setMarkerRef, machine.id])
  const size = selected ? SELECTED_PIN_SIZE_PX : MAP_ICON_SIZE_PX

  return (
    <AdvancedMarker
      ref={ref}
      position={{ lat: machine.lat, lng: machine.lng }}
      onClick={() => onSelect?.(machine)}
      // ピンの先端（画像の下端中央）が登録位置を指す
      anchorLeft="-50%"
      anchorTop="-100%"
      // 選択中のピンを他のピンより手前に出す
      zIndex={selected ? 1 : 0}
    >
      <img className="map-pin" src={PIN_ICON_URL} width={size} alt="" />
    </AdvancedMarker>
  )
}
