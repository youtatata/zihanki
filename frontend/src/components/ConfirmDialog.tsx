import type { ReactNode } from 'react'
import { Modal } from './Modal'

type Props = {
  open: boolean
  title: string
  confirmLabel: string
  busy?: boolean
  onConfirm: () => void
  onCancel: () => void
  children?: ReactNode // 確認対象の内容（写真など）
}

// 取り消せない操作の前に出す確認モーダル
export function ConfirmDialog({ open, title, confirmLabel, busy = false, onConfirm, onCancel, children }: Props) {
  return (
    <Modal open={open} onClose={() => !busy && onCancel()}>
      <div className="modal-body">
        <h2 className="modal-title">{title}</h2>
        {children}
        <div className="modal-actions">
          <button type="button" className="button" disabled={busy} onClick={onCancel}>
            キャンセル
          </button>
          <button type="button" className="button danger" disabled={busy} onClick={onConfirm}>
            {busy ? '処理中…' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
