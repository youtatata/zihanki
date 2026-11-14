import type { Area, LatLng, MachineDetails, VendingMachine } from '../types'

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

// 登録・更新で送るフォームを組み立てる。画像は指定されたときだけ送る
function toFormData(position: LatLng, details: MachineDetails, area: Area, image: File | null): FormData {
  const form = new FormData()
  form.append('lat', String(position.lat))
  form.append('lng', String(position.lng))
  form.append('date', details.date)
  form.append('name', details.name)
  form.append('memo', details.memo)
  // 複数選択は同じ名前で繰り返し送る
  for (const method of details.payment_methods) form.append('payment_methods', method)
  form.append('prefecture', area.prefecture)
  form.append('city', area.city)
  if (image) form.append('image', image)
  return form
}

export async function createVendingMachine(
  position: LatLng,
  details: MachineDetails,
  area: Area,
  image: File,
): Promise<VendingMachine> {
  const res = await fetch(BASE_URL, { method: 'POST', body: toFormData(position, details, area, image) })
  await throwIfError(res)
  return res.json()
}

// 位置と詳細情報を更新する。image が null なら写真はそのまま
export async function updateVendingMachine(
  id: number,
  position: LatLng,
  details: MachineDetails,
  area: Area,
  image: File | null,
): Promise<VendingMachine> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: toFormData(position, details, area, image) })
  await throwIfError(res)
  return res.json()
}

export async function deleteVendingMachine(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  await throwIfError(res)
}
