import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { Layout } from '../components/Layout'
import { MapNotice } from '../components/MapNotice'
import { MapView } from '../components/MapView'
import { PhotoPanel } from '../components/PhotoPanel'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'

export function HomePage() {
  const { machines, error, loading } = useVendingMachines()
  // 一覧や編集画面から ?id=123 付きで来たら、そのピンを選んだ状態で開く
  const [searchParams] = useSearchParams()
  const focusId = Number(searchParams.get('id')) || null
  const [selectedId, setSelectedId] = useState<number | null>(focusId)
  const [panelOpen, setPanelOpen] = useState(focusId !== null)

  const selected = machines.find((m) => m.id === selectedId) ?? null
  const focusMachine = machines.find((m) => m.id === focusId)

  function handleSelect(machine: VendingMachine) {
    setSelectedId(machine.id)
    setPanelOpen(true)
  }

  return (
    <Layout
      mapTitle="自動販売機"
      map={
        <MapView machines={machines} selectedId={selected?.id} onSelect={handleSelect} focus={focusMachine}>
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
