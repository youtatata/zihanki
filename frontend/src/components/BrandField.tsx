import { useState } from 'react'
import { MACHINE_BRANDS, NAME_MAX_LENGTH } from '../constants'

const UNSELECTED = ''
const OTHER = '__other__'

type Props = {
  value: string // 保存する機種名（未選択なら空文字）
  onChange: (value: string) => void
}

// 機種名を選択肢から選ぶ。「その他」のときだけ自由入力欄を出す
export function BrandField({ value, onChange }: Props) {
  // 選択肢にない名前が保存されていたら「その他」として開く
  const [isOther, setIsOther] = useState(() => value !== '' && !MACHINE_BRANDS.includes(value))

  function handleSelect(selected: string) {
    const other = selected === OTHER
    setIsOther(other)
    onChange(other ? '' : selected)
  }

  return (
    <div className="field">
      <label className="field-label" htmlFor="brand-select">
        機種名（任意）
      </label>
      <select id="brand-select" value={isOther ? OTHER : value} onChange={(e) => handleSelect(e.target.value)}>
        <option value={UNSELECTED}>未選択</option>
        {MACHINE_BRANDS.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
        <option value={OTHER}>その他</option>
      </select>
      {isOther && (
        <input
          type="text"
          aria-label="機種名（その他）"
          maxLength={NAME_MAX_LENGTH}
          placeholder="機種名を入力"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      )}
    </div>
  )
}
