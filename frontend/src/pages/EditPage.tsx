import { useState } from 'react'
import { Link } from 'react-router'
import { deleteVendingMachine } from '../api/vendingMachines'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Layout } from '../components/Layout'
import { MapNotice } from '../components/MapNotice'
import { MapView } from '../components/MapView'
import { PhotoPanel } from '../components/PhotoPanel'
import { useToast } from '../contexts/toast'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'
import { errorMessage } from '../utils/errorMessage'

export function EditPage() {
  const { machines, error, loading, reload } = useVendingMachines()
  const showToast = useToast()
  const [selected, setSelected] = useState<VendingMachine | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function handleSelect(machine: VendingMachine) {
    setSelected(machine)
    setPanelOpen(true)
  }

  async function handleDelete(machine: VendingMachine) {
    setDeleting(true)
    try {
      await deleteVendingMachine(machine.id)
      setSelected(null)
      showToast('削除しました')
      reload()
    } catch (e) {
      showToast(`削除できませんでした：${errorMessage(e)}`, 'error')
    } finally {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <Layout
      mapTitle="編集・削除するピンを選択"
      map={
        <MapView machines={machines} selectedId={selected?.id} onSelect={handleSelect}>
          <MapNotice loading={loading} isEmpty={!error && machines.length === 0} />
        </MapView>
      }
      panelTitle="商品"
      panel={
        <PhotoPanel machine={selected}>
          {selected && (
            <>
              <div className="panel-actions">
                <Link to={`/edit/${selected.id}`} className="button primary">
                  編集する
                </Link>
                <button type="button" className="button danger" onClick={() => setConfirming(true)}>
                  削除
                </button>
              </div>
              <ConfirmDialog
                open={confirming}
                title="このピンを削除しますか？"
                confirmLabel="削除する"
                busy={deleting}
                onConfirm={() => handleDelete(selected)}
                onCancel={() => setConfirming(false)}
              >
                <p>{selected.name || `${selected.date} の登録`}</p>
                <img className="photo confirm-photo" src={selected.image_url} alt={`${selected.date} の自販機`} />
                <p className="muted">削除すると元に戻せません。</p>
              </ConfirmDialog>
            </>
          )}
        </PhotoPanel>
      }
      panelOpen={panelOpen}
      onPanelOpenChange={setPanelOpen}
      error={error}
    />
  )
}
