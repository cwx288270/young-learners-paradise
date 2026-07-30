import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface CelebrationProps {
  stars: number
  message: string
  onContinue?: () => void
  level?: 'medium' | 'large'
}

const COLORS = ['#5B8DEF', '#52C41A', '#FAAD14', '#FF6B6B', '#6C5CE7', '#00B894', '#FD79A8', '#E17055']

function Confetti({ count }: { count: number }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i, left: Math.random() * 100,
    delay: Math.random() * 1.5, duration: 2 + Math.random() * 2,
    color: COLORS[i % COLORS.length], size: 6 + Math.random() * 10,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map(p => (
        <div key={p.id} className="absolute rounded-sm"
          style={{
            left: `${p.left}%`, top: '-20px', width: p.size, height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ${p.delay}s linear forwards`,
          }} />
      ))}
    </div>
  )
}

export default function Celebration({ stars, message, onContinue, level = 'large' }: CelebrationProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: level === 'large' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)' }}>
      {level === 'large' && <Confetti count={50} />}
      <div className="relative bg-white rounded-3xl px-10 py-8 shadow-2xl flex flex-col items-center gap-5 max-w-sm mx-4">
        <div className="text-4xl">{level === 'large' ? '🎉' : '🌟'}</div>
        <h2 className="text-xl font-bold text-gray-800">{message}</h2>
        {stars > 0 && (
          <div className="flex gap-3">
            {[0, 1, 2].map(i => (
              <span key={i} className="text-4xl star-pop"
                style={{ animationDelay: `${i * 0.2}s`, filter: i < stars ? 'none' : 'grayscale(1)', opacity: i < stars ? 1 : 0.2 }}>⭐</span>
            ))}
          </div>
        )}
        {onContinue && (
          <button onClick={onContinue}
            className="btn-child px-6 text-white font-bold rounded-xl"
            style={{ background: 'linear-gradient(135deg, #5B8DEF, #74B9FF)' }}>继续</button>
        )}
      </div>
    </div>
  )
}
