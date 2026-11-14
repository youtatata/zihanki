import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createVendingMachine } from '../api/vendingMachines'
import { Layout } from '../components/Layout'
import { MachineForm } from '../components/MachineForm'
import { MapView } from '../components/MapView'
import { StepGuide } from '../components/StepGuide'
import { COORD_DISPLAY_DIGITS, EMPTY_AREA, MAP_DEFAULT_CENTER } from '../constants'
import { useToast } from '../contexts/toast'
import { useImageFile } from '../hooks/useImageFile'
import { useReverseGeocode } from '../hooks/useReverseGeocode'
import type { LatLng, MachineDetails } from '../types'
import { errorMessage } from '../utils/errorMessage'

// ローカル時刻での今日の日付（YYYY-MM-DD）。toISOString は UTC になるため使わない
function todayString(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

// 表示桁数で比べて、地図を初期位置から動かしたかを判定する
function isMoved(position: LatLng): boolean {
  const format = (p: LatLng) => `${p.lat.toFixed(COORD_DISPLAY_DIGITS)},${p.lng.toFixed(COORD_DISPLAY_DIGITS)}`
  return format(position) !== format(MAP_DEFAULT_CENTER)
}

export function CreatePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const reverseGeocode = useReverseGeocode()
  const [position, setPosition] = useState<LatLng>(MAP_DEFAULT_CENTER)
  const [details, setDetails] = useState<MachineDetails>(() => ({
    date: todayString(),
    name: '',
    memo: '',
    payment_methods: [],
  }))
  const { image, previewUrl, setImage } = useImageFile()
  const [submitting, setSubmitting] = useState(false)
  // 追加画面はフォームが主役なので、狭い画面でも最初からパネルを開いておく
  const [panelOpen, setPanelOpen] = useState(true)

  async function handleSubmit() {
    if (!image) return
    setSubmitting(true)
    try {
      const area = await reverseGeocode(position)
      await createVendingMachine(position, details, area ?? EMPTY_AREA, image)
      showToast(area ? '保存しました' : '保存しました（地域は取得できませんでした）')
      navigate('/')
    } catch (err) {
      showToast(`保存できませんでした：${errorMessage(err)}`, 'error')
      setSubmitting(false)
    }
  }

  const steps = [
    { label: '地図を動かして照準を自販機に合わせる', done: isMoved(position) },
    { label: '写真を選ぶ', done: image !== null },
    { label: '保存する', done: false },
  ]

  return (
    <Layout
      mapTitle="自動販売機の位置に照準を合わせてください"
      map={<MapView onCenterChange={setPosition} />}
      panelTitle="写真登録"
      panel={
        <MachineForm
          guide={<StepGuide steps={steps} />}
          position={position}
          details={details}
          onDetailsChange={setDetails}
          imageUrl={previewUrl}
          onImageChange={setImage}
          submitLabel="保存"
          canSubmit={image !== null}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      }
      panelOpen={panelOpen}
      onPanelOpenChange={setPanelOpen}
    />
  )
}
