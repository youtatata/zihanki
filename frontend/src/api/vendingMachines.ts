import type { LatLng, VendingMachine } from '../types'

const BASE_URL = '/api/vending-machines'

// FastAPI のエラーレスポンス { detail } からメッセージを取り出して例外にする
async function throwIfError(res: Response): Promise<void> {
  if (res.ok) return
  const body = await res.json().catch(() => null)
  const detail = typeof body?.detail === 'string' ? body.detail : `通信エラー (${res.status})`
  throw new Error(detail)
}

export async function fetchVendingMachines(): Promise<VendingMachine[]> {
  const res = await fetch(BASE_URL)
  await throwIfError(res)
  return res.json()
}

export async function createVendingMachine(
  position: LatLng,
  date: string,
  image: File,
): Promise<VendingMachine> {
  const form = new FormData()
  form.append('lat', String(position.lat))
  form.append('lng', String(position.lng))
  form.append('date', date)
  form.append('image', image)

  const res = await fetch(BASE_URL, { method: 'POST', body: form })
  await throwIfError(res)
  return res.json()
}

export async function deleteVendingMachine(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  await throwIfError(res)
}
