import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { createVendingMachine } from '../api/vendingMachines'
import { ImageDropZone } from '../components/ImageDropZone'
import { Layout } from '../components/Layout'
import { MapView } from '../components/MapView'
import { StepGuide } from '../components/StepGuide'
import { COORD_DISPLAY_DIGITS, MAP_DEFAULT_CENTER } from '../constants'
import { useToast } from '../contexts/toast'
import type { LatLng } from '../types'
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
  const [position, setPosition] = useState<LatLng>(MAP_DEFAULT_CENTER)
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // 追加画面はフォームが主役なので、スマホ表示でも最初からパネルを開いておく
  const [panelOpen, setPanelOpen] = useState(true)
  const date = todayString()

  // 古いプレビューURLは差し替え時・画面を離れる時に解放する
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleImageChange(file: File) {
    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!image) return

    setSubmitting(true)
    try {
      await createVendingMachine(position, date, image)
      showToast('保存しました')
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
        <form className="create-form" onSubmit={handleSubmit}>
          <StepGuide steps={steps} />
          <dl className="create-info">
            <dt>登録日</dt>
            <dd>{date}</dd>
            <dt>緯度</dt>
            <dd>{position.lat.toFixed(COORD_DISPLAY_DIGITS)}</dd>
            <dt>経度</dt>
            <dd>{position.lng.toFixed(COORD_DISPLAY_DIGITS)}</dd>
          </dl>
          <ImageDropZone previewUrl={previewUrl} onFileChange={handleImageChange} />
          <button type="submit" className="button primary" disabled={!image || submitting}>
            {submitting ? '保存中…' : '保存'}
          </button>
        </form>
      }
      panelOpen={panelOpen}
      onPanelOpenChange={setPanelOpen}
    />
  )
}
