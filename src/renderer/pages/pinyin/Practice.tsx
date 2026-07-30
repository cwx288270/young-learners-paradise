import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { ALL_PINYIN, SHENGMU, YUNMU } from '../../content/pinyin'
import { speakText } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'

type PracticeType = 'listenSelect' | 'seeCharSelectPinyin' | 'seePinyinSelectChar'

interface Question {
  type: PracticeType
  target: any // PinyinData
  options: string[]
  correctAnswer: string
}

function generateQuestions(count: number): Question[] {
  const learned = ALL_PINYIN.slice(0, 10)
  const questions: Question[] = []

  for (let i = 0; i < count; i++) {
    const target = learned[Math.floor(Math.random() * learned.length)]
    const type: PracticeType = ['listenSelect', 'seeCharSelectPinyin', 'seePinyinSelectChar'][i % 3] as PracticeType

    let options: string[] = []
    let correctAnswer: string = ''

    if (type === 'listenSelect') {
      correctAnswer = target.pinyin
      const distractors = learned.filter(p => p.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3).map(p => p.pinyin)
      options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5)
    } else if (type === 'seeCharSelectPinyin') {
      correctAnswer = target.examplePinyin
      const distractors = learned.filter(p => p.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3).map(p => p.examplePinyin)
      options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5)
    } else {
      correctAnswer = target.exampleChar
      const distractors = learned.filter(p => p.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3).map(p => p.exampleChar)
      options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5)
    }

    questions.push({ type, target, options, correctAnswer })
  }

  return questions
}

export default function PinyinPractice() {
  const navigate = useNavigate()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const [questions] = useState(() => generateQuestions(5))
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)
  const [score, setScore] = useState(0)

  const q = questions[currentQ]

  const handleSelect = useCallback((option: string) => {
    if (selected) return
    setSelected(option)

    const isCorrect = option === q.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'error')

    if (isCorrect) {
      setScore(s => s + 1)
      if (currentChild) {
        saveProgress({
          child_id: currentChild.id,
          module: 'pinyin',
          item_id: q.target.id,
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
        // 完成所有题目
        const finalScore = Math.round((score + (isCorrect ? 1 : 0)) / questions.length * 100)
        navigate('/pinyin', { state: { practiceScore: finalScore } })
      }
    }, 1200)
  }, [selected, q, currentQ, score, currentChild])

  const questionLabel =
    q.type === 'listenSelect' ? '听一听，选出正确的拼音' :
    q.type === 'seeCharSelectPinyin' ? `这个字"${q.target.exampleChar}"的拼音是什么？` :
    `拼音"${q.target.pinyin}"对应的字是什么？`

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      {/* 进度 */}
      <div className="text-sm [color:#636E72] mb-4">
        第 {currentQ + 1} / {questions.length} 题
      </div>

      {/* 题目 */}
      <div className="text-xl font-bold mb-8 text-center"><PinyinText text={questionLabel} pinyinSize={13} charSize={22} /></div>

      {/* 播放按钮（听音辨字模式） */}
      {q.type === 'listenSelect' && (
        <button
          onClick={() => speakText(q.target.sound, 0.6)}
          className="btn-child bg-white border-2 mb-6"
          style={{ borderColor: '#00B894', width: '80px', height: '80px', fontSize: '36px' }}
        >
          🔊
        </button>
      )}

      {/* 展示目标字（看字选拼音模式） */}
      {q.type === 'seeCharSelectPinyin' && (
        <div className="char-medium text-text mb-6">{q.target.exampleChar}</div>
      )}

      {/* 展示拼音（看拼音选字模式） */}
      {q.type === 'seePinyinSelectChar' && (
        <div className="char-medium mb-6" style={{ fontFamily: 'Arial', color: '#00B894' }}>{q.target.pinyin}</div>
      )}

      {/* 选项 */}
      <div className="grid grid-cols-2 gap-4">
        {q.options.map((option, i) => {
          const isSelected = selected === option
          const isCorrectOption = option === q.correctAnswer
          let bgClass = 'bg-white [border-color:#E8ECF1]'
          if (isSelected && feedback === 'correct') bgClass = '[background-color:#F0FDF4] [border-color:#52C41A]'
          if (isSelected && feedback === 'error') bgClass = '[background-color:#FEF2F2] [border-color:#FF6B6B]'
          if (feedback && !isSelected && isCorrectOption) bgClass = '[background-color:#F0FDF4] [border-color:#52C41A]'

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={`btn-child border-2 ${bgClass} ${isSelected ? 'correct-bounce' : ''} ${isSelected && feedback === 'error' ? 'gentle-shake' : ''}`}
              style={{ minHeight: '48px', fontSize: q.type === 'seePinyinSelectChar' ? '26px' : '18px' }}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* 反馈提示 */}
      {feedback === 'correct' && <div className="[color:#52C41A] text-lg mt-4">✓ 太棒了！</div>}
      {feedback === 'error' && <div className="text-sm mt-4" style={{ color: '#FF6B6B' }}>再试一次哦 ♡</div>}
    </div>
  )
}
