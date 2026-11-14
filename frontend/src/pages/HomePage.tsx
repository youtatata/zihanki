import { useState } from 'react'
import { Layout } from '../components/Layout'
import { MapNotice } from '../components/MapNotice'
import { MapView } from '../components/MapView'
import { PhotoPanel } from '../components/PhotoPanel'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'

export function HomePage() {
  const { machines, error, loading } = useVendingMachines()
  const [selected, setSelected] = useState<VendingMachine | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  function handleSelect(machine: VendingMachine) {
    setSelected(machine)
    setPanelOpen(true)
  }

  return (
    <Layout
      mapTitle="自動販売機"
      map={
        <MapView machines={machines} selectedId={selected?.id} onSelect={handleSelect}>
          <MapNotice loading={loading} isEmpty={!error && machines.length === 0} />
        </MapView>
      }
      panelTitle="商品"
      panel={<PhotoPanel machine={selected} />}
      panelOpen={panelOpen}
      onPanelOpenChange={setPanelOpen}
      error={error}
    />
  )
}
