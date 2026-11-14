import { useState, type DragEvent } from 'react'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from '../constants'
import { useToast } from '../contexts/toast'

const BYTES_PER_MB = 1024 * 1024

type Props = {
  previewUrl: string | null
  onFileChange: (file: File) => void
}

// 選ばれたファイルが登録できない場合、その理由を返す
function validateImage(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'JPEG・PNG・WebP の画像を選んでください'
  if (file.size > MAX_IMAGE_BYTES) return `画像は ${MAX_IMAGE_BYTES / BYTES_PER_MB}MB 以下にしてください`
  return null
}

// クリックでの選択とドラッグ＆ドロップの両方で写真を受け付ける
export function ImageDropZone({ previewUrl, onFileChange }: Props) {
  const showToast = useToast()
  const [dragging, setDragging] = useState(false)

  function acceptFile(file: File | undefined) {
    if (!file) return
    const problem = validateImage(file)
    if (problem) {
      showToast(problem, 'error')
      return
    }
    onFileChange(file)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault() // ブラウザがファイルを開いてしまうのを防ぐ
    setDragging(false)
    acceptFile(e.dataTransfer.files[0])
  }

  return (
    <label
      className={`drop-zone${dragging ? ' dragging' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="visually-hidden"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={(e) => {
          acceptFile(e.target.files?.[0])
          e.target.value = '' // 同じファイルを選び直しても反応するようにする
        }}
      />
      {previewUrl ? (
        <>
          <img className="photo" src={previewUrl} alt="選んだ写真のプレビュー" />
          <span className="muted">クリックまたはドロップで写真を変更</span>
        </>
      ) : (
        <span>
          ここに写真をドロップ
          <br />
          またはクリックして選択
        </span>
      )}
    </label>
  )
}
