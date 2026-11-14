import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { createVendingMachine } from '../api/vendingMachines'
import { Layout } from '../components/Layout'
import { MapView } from '../components/MapView'
import { COORD_DISPLAY_DIGITS, MAP_DEFAULT_CENTER } from '../constants'
import type { LatLng } from '../types'
import { errorMessage } from '../utils/errorMessage'

const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp'

// ローカル時刻での今日の日付（YYYY-MM-DD）。toISOString は UTC になるため使わない
function todayString(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function CreatePage() {
  const navigate = useNavigate()
  const [position, setPosition] = useState<LatLng>(MAP_DEFAULT_CENTER)
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const date = todayString()

  // 古いプレビューURLは差し替え時・画面を離れる時に解放する
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleImageChange(file: File | null) {
    setImage(file)
    setPreviewUrl(file ? URL.createObjectURL(file) : null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!image) return

    setSubmitting(true)
    try {
      await createVendingMachine(position, date, image)
      navigate('/')
    } catch (err) {
      setError(errorMessage(err))
      setSubmitting(false)
    }
  }

  return (
    <Layout
      mapTitle="自動販売機の位置に照準を合わせてください"
      map={<MapView onCenterChange={setPosition} />}
      panelTitle="写真登録"
      panel={
        <form className="create-form" onSubmit={handleSubmit}>
          <p>{date}</p>
          <p>緯度: {position.lat.toFixed(COORD_DISPLAY_DIGITS)}</p>
          <p>経度: {position.lng.toFixed(COORD_DISPLAY_DIGITS)}</p>
          <input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            required
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
          />
          {previewUrl && <img className="photo" src={previewUrl} alt="プレビュー" />}
          <button type="submit" className="button primary" disabled={!image || submitting}>
            保存
          </button>
        </form>
      }
      links={[{ to: '/', label: 'ホーム' }]}
      error={error}
    />
  )
}
