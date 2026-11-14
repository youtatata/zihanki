import { useState } from 'react'
import { deleteVendingMachine } from '../api/vendingMachines'
import { Layout } from '../components/Layout'
import { MapView } from '../components/MapView'
import { PhotoPanel } from '../components/PhotoPanel'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'
import { errorMessage } from '../utils/errorMessage'

export function EditPage() {
  const { machines, error, reload } = useVendingMachines()
  const [selected, setSelected] = useState<VendingMachine | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(machine: VendingMachine) {
    if (!window.confirm('このピンを削除してもよろしいですか？')) return

    setDeleting(true)
    try {
      await deleteVendingMachine(machine.id)
      setSelected(null)
      setDeleteError(null)
      reload()
    } catch (e) {
      setDeleteError(errorMessage(e))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Layout
      mapTitle="削除するピンを選択"
      map={<MapView machines={machines} onSelect={setSelected} />}
      panelTitle="商品"
      panel={
        <PhotoPanel machine={selected}>
          {selected && (
            <button
              type="button"
              className="button danger"
              disabled={deleting}
              onClick={() => handleDelete(selected)}
            >
              削除
            </button>
          )}
        </PhotoPanel>
      }
      links={[{ to: '/', label: 'ホーム' }]}
      error={error ?? deleteError}
    />
  )
}
