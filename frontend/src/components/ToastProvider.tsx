import { useCallback, useRef, useState, type ReactNode } from 'react'
import { TOAST_DURATION_MS } from '../constants'
import { ToastContext, type ShowToast, type ToastKind } from '../contexts/toast'

type Toast = { id: number; message: string; kind: ToastKind }

// 画面下部にトースト通知を表示し、一定時間後に自動で消す
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)

  const showToast = useCallback<ShowToast>((message, kind = 'success') => {
    const id = nextId.current++
    setToasts((current) => [...current, { id, message, kind }])
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, TOAST_DURATION_MS)
  }, [])

  return (
    <ToastContext value={showToast}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.kind}`} role={t.kind === 'error' ? 'alert' : 'status'}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext>
  )
}
