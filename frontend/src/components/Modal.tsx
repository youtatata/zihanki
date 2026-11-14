import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  className?: string
  children: ReactNode
}

// ブラウザ標準の <dialog> を使ったモーダル。Esc キーと背景クリックで閉じる
export function Modal({ open, onClose, className = '', children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      onClose={onClose}
      // 背景（dialog 自身）をクリックしたときだけ閉じる。中身のクリックでは閉じない
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {open && children}
    </dialog>
  )
}
