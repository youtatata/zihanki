import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { updateVendingMachine } from '../api/vendingMachines'
import { Layout } from '../components/Layout'
import { MachineForm } from '../components/MachineForm'
import { MapView } from '../components/MapView'
import { PageShell } from '../components/PageShell'
import { useToast } from '../contexts/toast'
import { useImageFile } from '../hooks/useImageFile'
import { useReverseGeocode } from '../hooks/useReverseGeocode'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { LatLng, MachineDetails, VendingMachine } from '../types'
import { errorMessage } from '../utils/errorMessage'

// /edit/:id 登録済みのピンを編集する画面
export function EditMachinePage() {
  const { id } = useParams()
  const { machines, loading, error } = useVendingMachines()
  const machine = machines.find((m) => m.id === Number(id))

  // 入力欄の初期値に使うため、データがそろってからフォームを表示する
  if (machine) return <EditMachineForm key={machine.id} machine={machine} />

  return (
    <PageShell>
      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <p className="muted">読み込み中…</p>
      ) : (
        <div className="empty-state">
          <p>指定の自販機が見つかりません</p>
          <Link to="/edit" className="button">
            編集画面へ戻る
          </Link>
        </div>
      )}
    </PageShell>
  )
}

function EditMachineForm({ machine }: { machine: VendingMachine }) {
  const navigate = useNavigate()
  const showToast = useToast()
  const reverseGeocode = useReverseGeocode()
  const original: LatLng = { lat: machine.lat, lng: machine.lng }
  const [position, setPosition] = useState<LatLng>(original)
  const [details, setDetails] = useState<MachineDetails>({
    date: machine.date,
    name: machine.name,
    memo: machine.memo,
    payment_methods: machine.payment_methods,
  })
  const { image, previewUrl, setImage } = useImageFile()
  const [submitting, setSubmitting] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)

  async function handleSubmit() {
    setSubmitting(true)
    try {
      // 調べられなかったときは、登録済みの地域をそのまま残す
      const area = (await reverseGeocode(position)) ?? { prefecture: machine.prefecture, city: machine.city }
      await updateVendingMachine(machine.id, position, details, area, image)
      showToast('更新しました')
      navigate(`/?id=${machine.id}`)
    } catch (err) {
      showToast(`更新できませんでした：${errorMessage(err)}`, 'error')
      setSubmitting(false)
    }
  }

  return (
    <Layout
      mapTitle="位置を直す場合は、照準を合わせ直してください"
      map={<MapView focus={original} onCenterChange={setPosition} />}
      panelTitle="登録内容の編集"
      panel={
        <>
          <MachineForm
            position={position}
            details={details}
            onDetailsChange={setDetails}
            imageUrl={previewUrl ?? machine.image_url}
            onImageChange={setImage}
            submitLabel="更新"
            canSubmit
            submitting={submitting}
            onSubmit={handleSubmit}
          />
          <Link to="/edit" className="form-cancel">
            キャンセル
          </Link>
        </>
      }
      panelOpen={panelOpen}
      onPanelOpenChange={setPanelOpen}
    />
  )
}
