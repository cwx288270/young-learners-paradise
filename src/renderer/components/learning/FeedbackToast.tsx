import { useEffect, useRef, useState } from 'react'

interface FeedbackToastProps {
  type: 'correct' | 'error'
  message?: string
  onComplete?: () => void
  duration?: number
}

export default function FeedbackToast({
  type,
  message,
  onComplete,
  duration = 1500,
}: FeedbackToastProps) {
  const [visible, setVisible] = useState(true)
  const callbackRef = useRef(onComplete)
  callbackRef.current = onComplete

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      callbackRef.current?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const isCorrect = type === 'correct'

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`flex flex-col items-center gap-3 px-10 py-8 rounded-3xl shadow-xl border-2 ${
          isCorrect
            ? 'bg-green-50 border-green-200'
            : 'bg-orange-50 border-orange-200'
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold ${
            isCorrect
              ? 'correct-bounce bg-green-100 text-green-600'
              : 'gentle-shake bg-orange-100 text-orange-500'
          }`}
        >
          {isCorrect ? '\u2713' : '\u2717'}
        </div>
        <div
          className={`text-xl font-bold ${
            isCorrect ? 'text-green-600' : 'text-orange-500'
          }`}
        >
          {message || (isCorrect ? '\u7B54\u5BF9\u4E86\uFF01' : '\u518D\u8BD5\u4E00\u6B21')}
        </div>
      </div>
    </div>
  )
}
