import { createContext, useContext } from 'react'

export type ToastKind = 'success' | 'error'
export type ShowToast = (message: string, kind?: ToastKind) => void

export const ToastContext = createContext<ShowToast>(() => {})

// どの画面からでもトースト通知を出すための関数を返す
export function useToast(): ShowToast {
  return useContext(ToastContext)
}
