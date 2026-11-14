import { Modal } from './Modal'

type Props = {
  open: boolean
  src: string
  alt: string
  onClose: () => void
}

// 写真を画面いっぱいに拡大表示する
export function PhotoLightbox({ open, src, alt, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} className="lightbox">
      <button type="button" className="lightbox-close" aria-label="閉じる" onClick={onClose}>
        ×
      </button>
      <img className="lightbox-image" src={src} alt={alt} />
    </Modal>
  )
}
