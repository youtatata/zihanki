import { useCallback, useEffect, useState } from 'react'

// 選んだ画像ファイルと、そのプレビュー用URLを管理する
export function useImageFile() {
  const [image, setImageState] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // 古いプレビューURLは差し替え時・画面を離れる時に解放する
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const setImage = useCallback((file: File) => {
    setImageState(file)
    setPreviewUrl(URL.createObjectURL(file))
  }, [])

  return { image, previewUrl, setImage }
}
