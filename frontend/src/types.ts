export type LatLng = {
  lat: number
  lng: number
}

// 支払い方法：現金／交通系IC・電子マネー／QRコード／クレジット
export type PaymentMethod = 'cash' | 'ic' | 'qr' | 'credit'

// 利用者が入力する詳細情報（位置と写真を除く）
export type MachineDetails = {
  date: string // YYYY-MM-DD
  name: string
  memo: string
  payment_methods: PaymentMethod[]
}

// 位置から調べた地域。調べられなかった場合は空文字
export type Area = {
  prefecture: string
  city: string
}

export type VendingMachine = LatLng &
  MachineDetails &
  Area & {
    id: number
    image_url: string
    created_at: string
  }
