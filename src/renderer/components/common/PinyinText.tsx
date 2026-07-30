import { addPinyinToText } from '../../content/pinyinMap'

interface PinyinTextProps {
  text: string
  pinyinSize?: number
  charSize?: number
  color?: string
}

export default function PinyinText({
  text,
  pinyinSize = 12,
  charSize = 20,
  color = '#2D3436',
}: PinyinTextProps) {
  const chars = addPinyinToText(text)

  return (
    <>
      {chars.map((ch, i) => (
        <span key={i} className="inline-flex flex-col items-center mx-0.5" style={{ verticalAlign: 'bottom' }}>
          <span
            style={{
              fontSize: `${pinyinSize}px`,
              color,
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.1',
              minHeight: `${pinyinSize + 2}px`,
              fontWeight: 500,
            }}
          >
            {ch.pinyin}
          </span>
          <span
            style={{
              fontSize: `${charSize}px`,
              fontFamily: '"KaiTi", "STKaiti", serif',
              lineHeight: '1.3',
            }}
          >
            {ch.char}
          </span>
        </span>
      ))}
    </>
  )
}
