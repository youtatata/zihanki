import { useCallback, useEffect, useState } from 'react'
import { fetchVendingMachines } from '../api/vendingMachines'
import type { VendingMachine } from '../types'
import { errorMessage } from '../utils/errorMessage'

// 自販機一覧の取得と再読み込み
export function useVendingMachines() {
  const [machines, setMachines] = useState<VendingMachine[]>([])
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    // 画面遷移などで古いリクエストの結果が後から届いても反映しない
    let ignore = false
    fetchVendingMachines().then(
      (data) => {
        if (ignore) return
        setMachines(data)
        setError(null)
      },
      (e) => {
        if (!ignore) setError(errorMessage(e))
      },
    )
    return () => {
      ignore = true
    }
  }, [version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  return { machines, error, reload }
}
