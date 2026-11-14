import { useState } from 'react'
import { Layout } from '../components/Layout'
import { MapView } from '../components/MapView'
import { PhotoPanel } from '../components/PhotoPanel'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'

export function HomePage() {
  const { machines, error } = useVendingMachines()
  const [selected, setSelected] = useState<VendingMachine | null>(null)

  return (
    <Layout
      mapTitle="自動販売機"
      map={<MapView machines={machines} onSelect={setSelected} />}
      panelTitle="商品"
      panel={<PhotoPanel machine={selected} />}
      links={[
        { to: '/create', label: '追加' },
        { to: '/edit', label: '編集' },
      ]}
      error={error}
    />
  )
}
