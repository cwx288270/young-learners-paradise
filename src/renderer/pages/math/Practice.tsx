import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { ALL_MATH, NUMBERS, ADDITION_10, SUBTRACTION_10 } from '../../content/math'
import { speakText } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'

interface Question {
  id: string
  question: string
  options: string[]
  answer: string | number
  type: string
}

function generateQuestions(): Question[] {
  // 从各类型中随机选择5题
  const pool = [...NUMBERS.slice(0, 5), ...ADDITION_10.slice(0, 5), ...SUBTRACTION_10.slice(0, 5)]
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5)
  return shuffled.map(q => ({
    id: q.id,
    question: q.question || q.title,
    options: q.options,
    answer: q.answer,
    type: q.type,
  }))
}

export default function MathPractice() {
  const navigate = useNavigate()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const [questions] = useState(() => generateQuestions())
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  const q = questions[currentQ]

  const handleSelect = useCallback((option: string) => {
    if (selected) return
    setSelected(option)

    const isCorrect = option === String(q.answer)
    setFeedback(isCorrect ? 'correct' : 'error')

    if (isCorrect) {
      setCorrectCount(c => c + 1)
      if (currentChild) {
        saveProgress({
          child_id: currentChild.id,
          module: 'math',
          item_id: q.id,
          status: 'practicing',
          mastery_level: 50,
          review_stage: 0,
          consecutive_correct: 1,
          next_review_date: Date.now() + 30 * 60 * 1000,
        })
      }
    }

    setTimeout(() => {
      setSelected(null)
      setFeedback(null)
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1)
      } else {
        const finalScore = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100)
        navigate('/math', { state: { practiceScore: finalScore } })
      }
    }, 1200)
  }, [selected, q, currentQ, correctCount])

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="text-sm [color:#636E72] mb-4">
        第 {currentQ + 1} / {questions.length} 题
      </div>

      {/* 题目 */}
      <div className="text-2xl font-bold mb-8 text-center" style={{ color: '#E17055' }}>
        <PinyinText text={q.question} pinyinSize={13} charSize={26} />
      </div>

      {/* 选项 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {q.options.map((option, i) => {
          const isSelected = selected === option
          const isCorrectOption = option === String(q.answer)
          let borderColor = '#E8ECF1'
          let bgColor = '#FFFFFF'
          if (isSelected && feedback === 'correct') { borderColor = '#52C41A'; bgColor = '#F0FFF0' }
          if (isSelected && feedback === 'error') { borderColor = '#FF6B6B'; bgColor = '#FFF0F0' }
          if (feedback && !isSelected && isCorrectOption) { borderColor = '#52C41A'; bgColor = '#F0FFF0' }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={`btn-child border-2 ${isSelected && feedback === 'correct' ? 'correct-bounce' : ''} ${isSelected && feedback === 'error' ? 'gentle-shake' : ''}`}
              style={{ borderColor, backgroundColor: bgColor, minHeight: '48px', fontSize: '18px' }}
            >
              <PinyinText text={option} pinyinSize={12} charSize={22} />
            </button>
          )
        })}
      </div>

      {feedback === 'correct' && <div className="[color:#52C41A] text-lg mt-4">✓ 太棒了！</div>}
      {feedback === 'error' && <div className="text-sm mt-4" style={{ color: '#FF6B6B' }}>再试一次哦 ♡</div>}
    </div>
  )
}
