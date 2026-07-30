import React, { useEffect, useRef, useState } from 'react'

type CelebrationType = 'stars' | 'complete' | 'milestone'

interface CelebrationProps {
  type: CelebrationType
  stars?: number
  onComplete?: () => void
}

const CONFETTI_COLORS = [
  '#5B8DEF',
  '#00B894',
  '#E17055',
  '#6C5CE7',
  '#FD79A8',
  '#FDCB6E',
  '#52C41A',
  '#74B9FF',
]

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
  rounded: boolean
}

function Celebration({
  type,
  stars = 3,
  onComplete,
}: CelebrationProps) {
  const [visible, setVisible] = useState(true)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const duration = type === 'milestone' ? 4000 : 3000
    const timer = setTimeout(() => {
      setVisible(false)
      onCompleteRef.current?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [type])

  if (!visible) return null

  const confettiCount = type === 'milestone' ? 60 : 30
  const confettiPieces: ConfettiPiece[] = Array.from(
    { length: confettiCount },
    (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 1.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 8 + Math.random() * 8,
      rounded: Math.random() > 0.5,
    })
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/10" />

      {/* 彩带飞落 */}
      {(type === 'complete' || type === 'milestone') && (
        <div className="absolute inset-0 overflow-hidden">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute top-0"
              style={{
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                borderRadius: piece.rounded ? '50%' : '2px',
                animation: `confetti-fall ${piece.duration}s ${piece.delay}s ease-in forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* 中心内容 */}
      <div className="relative flex flex-col items-center">
        {/* 星星依次弹出 */}
        {(type === 'stars' || type === 'milestone') && (
          <div className="flex gap-4 mb-6">
            {Array.from({ length: stars }, (_, i) => (
              <div
                key={i}
                style={{
                  fontSize: type === 'milestone' ? '80px' : '64px',
                  lineHeight: 1,
                  animation: `star-pop 0.4s ease-out ${i * 0.2}s both`,
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        )}

        {/* 庆祝文字 */}
        {type === 'complete' && (
          <div
            className="text-xxl font-bold text-primary"
            style={{ animation: 'correct-bounce 0.5s ease-out 0.3s both' }}
          >
            完成啦！🎉
          </div>
        )}
        {type === 'milestone' && (
          <div
            className="text-xxl font-bold text-primary"
            style={{ animation: 'correct-bounce 0.5s ease-out 0.6s both' }}
          >
            里程碑达成！🏆
          </div>
        )}
      </div>
    </div>
  )
}

export default Celebration
