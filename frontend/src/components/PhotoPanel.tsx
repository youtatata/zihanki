import { useState, type ReactNode } from 'react'
import type { VendingMachine } from '../types'
import { PhotoLightbox } from './PhotoLightbox'

type Props = {
  machine: VendingMachine | null
  children?: ReactNode // 写真の下に置く操作ボタンなど
}

export function PhotoPanel({ machine, children }: Props) {
  const [zoomed, setZoomed] = useState(false)

  if (!machine) {
    return <p className="muted">地図のピンを選択すると写真が表示されます</p>
  }

  const alt = `${machine.date} の自販機`
  return (
    <div className="photo-panel">
      <span className="date-badge">{machine.date}</span>
      <button type="button" className="photo-button" title="クリックで拡大" onClick={() => setZoomed(true)}>
        <img className="photo" src={machine.image_url} alt={alt} />
      </button>
      {children}
      <PhotoLightbox open={zoomed} src={machine.image_url} alt={alt} onClose={() => setZoomed(false)} />
    </div>
  )
}
