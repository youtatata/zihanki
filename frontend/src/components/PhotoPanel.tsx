import type { ReactNode } from 'react'
import type { VendingMachine } from '../types'

type Props = {
  machine: VendingMachine | null
  children?: ReactNode // 写真の下に置く操作ボタンなど
}

export function PhotoPanel({ machine, children }: Props) {
  if (!machine) {
    return <p className="muted">地図のピンを選択すると写真が表示されます</p>
  }

  return (
    <div className="photo-panel">
      <p>{machine.date}</p>
      <img className="photo" src={machine.image_url} alt={`${machine.date} の自販機`} />
      {children}
    </div>
  )
}
