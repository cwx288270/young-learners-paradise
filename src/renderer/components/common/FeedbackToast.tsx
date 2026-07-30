import React, { useEffect, useRef } from 'react'

type FeedbackType = 'correct' | 'error' | 'info'

interface FeedbackToastProps {
  type: FeedbackType
  message?: string
  duration?: number
  onComplete?: () => void
}

const DEFAULT_MESSAGES: Record<FeedbackType, string> = {
  correct: '太棒了！你真厉害！',
  error: '没关系，再试一次吧！',
  info: '提示',
}

const STYLES: Record<
  FeedbackType,
  { bg: string; icon: string; iconColor: string; animation: string }
> = {
  correct: {
    bg: '#E8F8E8',
    icon: '✓',
    iconColor: '#52C41A',
    animation: 'correct-bounce 0.4s ease-out',
  },
  error: {
    bg: '#FFF0F0',
    icon: '♡',
    iconColor: '#FF6B6B',
    animation: 'gentle-shake 0.4s ease-out',
  },
  info: {
    bg: '#E8F0FE',
    icon: '💡',
    iconColor: '#5B8DEF',
    animation: 'none',
  },
}

function FeedbackToast({
  type,
  message,
  duration = 3000,
  onComplete,
}: FeedbackToastProps) {
  const text = message ?? DEFAULT_MESSAGES[type]
  const style = STYLES[type]
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteRef.current?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div
        className="px-8 py-6 rounded-xl shadow-lg flex items-center gap-4"
        style={{
          backgroundColor: style.bg,
          animation: style.animation,
        }}
      >
        <span className="text-4xl font-bold" style={{ color: style.iconColor }}>
          {style.icon}
        </span>
        <span className="text-lg font-medium text-text">{text}</span>
      </div>
    </div>
  )
}

export default FeedbackToast
