import { useState, type ReactNode } from 'react'
import type { VendingMachine } from '../types'
import { PaymentChips } from './PaymentChips'
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

  const alt = `${machine.name || machine.date} の自販機`
  return (
    <div className="photo-panel">
      {machine.name && <h3 className="machine-name">{machine.name}</h3>}
      <span className="date-badge">{machine.date}</span>
      <button type="button" className="photo-button" title="クリックで拡大" onClick={() => setZoomed(true)}>
        <img className="photo" src={machine.image_url} alt={alt} />
      </button>
      <PaymentChips methods={machine.payment_methods} />
      {machine.memo && <p className="memo">{machine.memo}</p>}
      {children}
      <PhotoLightbox open={zoomed} src={machine.image_url} alt={alt} onClose={() => setZoomed(false)} />
    </div>
  )
}
