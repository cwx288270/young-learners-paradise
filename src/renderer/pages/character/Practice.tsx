import { useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { CHARACTERS, getDistractors } from '../../content/characters'
import { speakText } from '../../utils/helpers'
import FeedbackToast from '../../components/learning/FeedbackToast'
import type { CharacterData } from '../../types'

type PracticeType = 'listen-choose' | 'see-char-choose-pinyin' | 'see-pinyin-choose-char'

interface PracticeQuestion {
  type: PracticeType
  target: CharacterData
  options: CharacterData[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function generateQuestions(count: number): PracticeQuestion[] {
  const types: PracticeType[] = [
    'listen-choose',
    'see-char-choose-pinyin',
    'see-pinyin-choose-char',
  ]
  const pool = CHARACTERS.slice(0, 10)
  const used = new Set<string>()
  const questions: PracticeQuestion[] = []

  for (let i = 0; i < count; i++) {
    let target = pool[Math.floor(Math.random() * pool.length)]
    let attempts = 0
    while (used.has(target.id) && attempts < 20) {
      target = pool[Math.floor(Math.random() * pool.length)]
      attempts++
    }
    used.add(target.id)
    const distractors = getDistractors(target.id, 3)
    const options = shuffle([target, ...distractors])
    const type = types[i % types.length]
    questions.push({ type, target, options })
  }

  return questions
}

const TYPE_LABELS: Record<PracticeType, string> = {
  'listen-choose': '\u542C\u97F3\u8FA8\u5B57',
  'see-char-choose-pinyin': '\u770B\u5B57\u9009\u62FC\u97F3',
  'see-pinyin-choose-char': '\u770B\u62FC\u97F3\u9009\u5B57',
}

export default function CharacterPractice() {
  const navigate = useNavigate()
  const { currentChild } = useUserStore()

  const [questions] = useState<PracticeQuestion[]>(() => generateQuestions(5))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const wrongCountRef = useRef(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showCorrect, setShowCorrect] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'error'
    message?: string
  } | null>(null)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentIdx]

  // 自动播放听音辨字
  useEffect(() => {
    if (currentQuestion?.type === 'listen-choose') {
      speakText(currentQuestion.target.char)
    }
  }, [currentIdx, currentQuestion])

  const handleSelect = (option: CharacterData) => {
    if (feedback || showCorrect) return

    setSelectedId(option.id)
    const isCorrect = option.id === currentQuestion.target.id

    if (isCorrect) {
      if (wrongCount === 0) {
        setCorrectCount((c) => c + 1)
      }
      setFeedback({ type: 'correct' })
    } else {
      const newWrong = wrongCountRef.current + 1
      wrongCountRef.current = newWrong
      setWrongCount(newWrong)
      if (newWrong >= 2) {
        setShowCorrect(true)
        setFeedback({ type: 'error', message: '\u6CA1\u5173\u7CFB\uFF0C\u7EE7\u7EED\u52A0\u6CB9' })
      } else {
        setFeedback({ type: 'error', message: '\u518D\u8BD5\u4E00\u6B21' })
      }
    }
  }

  const handleFeedbackComplete = useCallback(() => {
    const wasCorrect = selectedId === currentQuestion.target.id
    setFeedback(null)

    if (wasCorrect || showCorrect) {

      // 进入下一题
      setSelectedId(null)
      setShowCorrect(false)
      setWrongCount(0)

      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1)
      } else {
        setShowResult(true)
      }
    } else {
      // 第一次答错，允许重试
      setSelectedId(null)
    }
  }, [selectedId, showCorrect, currentQuestion, currentChild, currentIdx, questions.length, wrongCount])

  const getOptionStyle = (option: CharacterData): string => {
    if (selectedId === option.id) {
      if (option.id === currentQuestion.target.id) {
        return 'bg-green-100 border-green-400 correct-bounce'
      }
      return 'bg-orange-100 border-orange-400 gentle-shake'
    }
    if (showCorrect && option.id === currentQuestion.target.id) {
      return 'bg-green-100 border-green-400 correct-bounce'
    }
    return 'bg-white border-gray-200 hover:bg-blue-50'
  }

  const renderOption = (option: CharacterData): ReactNode => {
    if (currentQuestion.type === 'see-char-choose-pinyin') {
      return (
        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 24 }}>
          {option.pinyin}
        </span>
      )
    }
    return (
      <span className="char-medium" style={{ fontSize: 48 }}>
        {option.char}
      </span>
    )
  }

  // 结果页面
  if (showResult) {
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= 80

    return (
      <div
        className="h-full flex flex-col items-center justify-center px-6"
        style={{ background: 'var(--color-bg)' }}
      >
        <div
          className="text-6xl font-bold"
          style={{ color: passed ? 'var(--color-success)' : 'var(--color-warning)' }}
        >
          {score}%
        </div>
        <div className="text-xl text-gray-600 mt-4 text-center">
          {passed
            ? '\u592A\u68D2\u4E86\uFF01\u53EF\u4EE5\u8FDB\u5165\u4E0B\u4E00\u6B65\u4E86'
            : '\u7EE7\u7EED\u7EC3\u4E60\uFF0C\u4F60\u4F1A\u66F4\u68D2\u7684\uFF01'}
        </div>
        <div className="text-sm text-gray-400 mt-2">
          {'\u7B54\u5BF9 '}{correctCount}{' / '}{questions.length}{' \u9898'}
        </div>
        <button
          onClick={() => {
            if (passed) {
              sessionStorage.setItem('char_practice', 'done')
              navigate('/character/write')
            } else {
              navigate('/character/learn')
            }
          }}
          className="btn-child px-4 text-white font-bold mt-8"
          style={{ background: 'var(--color-literacy)' }}
        >
          {passed ? '\u53BB\u5199\u5B57' : '\u518D\u5B66\u4E00\u5B66'}
        </button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* 顶部：题号 + 玩法标签 */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <button
          onClick={() => navigate('/character')}
          className="btn-child px-4 text-gray-600 bg-gray-100"
        >
          {'\u2190'}
        </button>
        <div className="text-lg font-bold text-gray-700">
          {'\u7B2C '}{currentIdx + 1}{' / '}{questions.length}{' \u9898'}
        </div>
        <div
          className="px-3 py-1 rounded-full text-sm text-white"
          style={{ background: 'var(--color-literacy)' }}
        >
          {TYPE_LABELS[currentQuestion.type]}
        </div>
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 题目内容 */}
        {currentQuestion.type === 'listen-choose' && (
          <div className="flex flex-col items-center gap-6 mb-8">
            <p className="text-lg text-gray-500">{'\u542C\u4E00\u542C\uFF0C\u9009\u51FA\u6B63\u786E\u7684\u5B57'}</p>
            <button
              onClick={() => speakText(currentQuestion.target.char)}
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl text-white shadow-lg transition-all hover:scale-110"
              style={{ background: 'var(--color-literacy)' }}
            >
              {'\u266B'}
            </button>
          </div>
        )}

        {currentQuestion.type === 'see-char-choose-pinyin' && (
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-lg text-gray-500">{'\u8FD9\u4E2A\u5B57\u600E\u4E48\u8BFB\uFF1F'}</p>
            <div
              className="char-display cursor-pointer"
              style={{ fontSize: 140 }}
              onClick={() => speakText(currentQuestion.target.char)}
            >
              {currentQuestion.target.char}
            </div>
          </div>
        )}

        {currentQuestion.type === 'see-pinyin-choose-char' && (
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-lg text-gray-500">{'\u54EA\u4E2A\u5B57\u8BFB\u8FD9\u4E2A\u97F3\uFF1F'}</p>
            <div
              className="font-bold"
              style={{
                fontSize: 56,
                fontFamily: 'Arial, sans-serif',
                color: 'var(--color-literacy)',
              }}
            >
              {currentQuestion.target.pinyin}
            </div>
          </div>
        )}

        {/* 选项 */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`btn-child px-4 py-3 rounded-xl border-2 transition-all ${getOptionStyle(option)}`}
              disabled={!!feedback || showCorrect}
            >
              {renderOption(option)}
            </button>
          ))}
        </div>
      </div>

      {/* 底部：跳过按钮（完成至少3题后出现） */}
      <div className="flex justify-center py-4 bg-white shadow-sm">
        {currentIdx >= 2 && (
          <button
            onClick={() => {
              sessionStorage.setItem('char_practice', 'done')
              navigate('/character/write')
            }}
            className="btn-child px-6 bg-gray-100 text-gray-500"
          >
            {'\u8DF3\u8FC7\u7EC3\u4E60'}
          </button>
        )}
      </div>

      {/* 反馈提示 */}
      {feedback && (
        <FeedbackToast
          type={feedback.type}
          message={feedback.message}
          onComplete={handleFeedbackComplete}
        />
      )}
    </div>
  )
}
