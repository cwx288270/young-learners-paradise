import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { CHARACTERS, getDistractors } from '../../content/characters'
import {
  speakText,
  calculateStars,
  getNextReviewDate,
  getEncouragement,
  getTodayStr,
} from '../../utils/helpers'
import Celebration from '../../components/learning/Celebration'
import FeedbackToast from '../../components/learning/FeedbackToast'
import type { CharacterData } from '../../types'

type TestType = 'see-char-choose-pinyin' | 'listen-choose'

interface TestQuestion {
  type: TestType
  target: CharacterData
  options: CharacterData[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function generateTestQuestions(): TestQuestion[] {
  const pool = CHARACTERS.slice(0, 10)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, 5)

  const questions: TestQuestion[] = selected.map((target, i) => {
    const distractors = getDistractors(target.id, 3)
    const options = shuffle([target, ...distractors])
    const type: TestType = i < 3 ? 'see-char-choose-pinyin' : 'listen-choose'
    return { type, target, options }
  })

  return shuffle(questions)
}

export default function CharacterTest() {
  const navigate = useNavigate()
  const { currentChild } = useUserStore()
  const { saveProgress, loadProgress } = useProgressStore()

  const [questions] = useState<TestQuestion[]>(() => generateTestQuestions())
  const [currentIdx, setCurrentIdx] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'error'
    message?: string
  } | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState(0)
  const savedRef = useRef(false)

  const currentQuestion = questions[currentIdx]

  // 自动播放听音选字
  useEffect(() => {
    if (currentQuestion?.type === 'listen-choose' && !showResults) {
      speakText(currentQuestion.target.char)
    }
  }, [currentIdx, currentQuestion, showResults])

  // 测试完成后保存进度
  useEffect(() => {
    if (showResults && currentChild && !savedRef.current) {
      savedRef.current = true
      handleSaveProgress()
    }
  }, [showResults, currentChild])

  const handleSaveProgress = async () => {
    if (!currentChild) return

    const finalScore = Math.round((correctCount / questions.length) * 100)
    const finalStars = calculateStars(finalScore)

    // 保存每个测试字的进度
    for (const q of questions) {
      const { nextStage, nextReviewDate } = getNextReviewDate(0, finalScore)
      await saveProgress({
        child_id: currentChild.id,
        module: 'character',
        item_id: q.target.id,
        status: finalScore >= 80 ? 'mastered' : 'practicing',
        mastery_level: finalStars,
        last_reviewed: Date.now(),
        consecutive_correct: 1,
        review_count: 1,
        next_review_date: nextReviewDate,
        review_stage: nextStage,
      })
    }

    // 保存每日统计（用localStorage）
    const todayKey = `yl_daily_${currentChild.id}_${getTodayStr()}`
    localStorage.setItem(todayKey, JSON.stringify({
      child_id: currentChild.id,
      date: getTodayStr(),
      total_time: 0,
      items_learned: 0,
      items_reviewed: questions.length,
      avg_score: finalScore,
    }))

    // 标记测试步骤完成
    sessionStorage.setItem('char_test', 'done')

    // 重新加载进度
    await loadProgress(currentChild.id)
  }

  const handleSelect = (option: CharacterData) => {
    if (feedback) return

    setSelectedId(option.id)
    const isCorrect = option.id === currentQuestion.target.id

    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setFeedback({ type: 'correct' })
    } else {
      setFeedback({
        type: 'error',
        message: `\u6B63\u786E\u7B54\u6848\u662F\u300C${currentQuestion.target.char}\u300D`,
      })
    }
  }

  const handleFeedbackComplete = () => {
    setFeedback(null)
    setSelectedId(null)

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1)
    } else {
      // 计算最终成绩
      const finalScore = Math.round((correctCount / questions.length) * 100)
      setScore(finalScore)
      setStars(calculateStars(finalScore))
      setShowResults(true)
    }
  }

  const getOptionStyle = (option: CharacterData): string => {
    if (selectedId === option.id) {
      if (option.id === currentQuestion.target.id) {
        return 'bg-green-100 border-green-400 correct-bounce'
      }
      return 'bg-orange-100 border-orange-400 gentle-shake'
    }
    // 答错后高亮正确答案
    if (feedback?.type === 'error' && option.id === currentQuestion.target.id) {
      return 'bg-green-100 border-green-400 correct-bounce'
    }
    return 'bg-white border-gray-200 hover:bg-blue-50'
  }

  // 结果页面
  if (showResults) {
    return (
      <div className="h-full flex flex-col items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <Celebration
          stars={stars}
          message={getEncouragement(score)}
          onContinue={() => navigate('/character')}
        />
        <div className="text-center">
          <div
            className="text-5xl font-bold mb-2"
            style={{ color: 'var(--color-literacy)' }}
          >
            {score}{'%'}
          </div>
          <div className="text-lg text-gray-500">
            {'\u7B54\u5BF9 '}{correctCount}{' / '}{questions.length}{' \u9898'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* 顶部题号 */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <button
          onClick={() => navigate('/character')}
          className="btn-child px-4 text-gray-600 bg-gray-100"
        >
          {'\u2190'}
        </button>
        <div className="text-lg font-bold text-gray-700">
          {'\u6D4B\u8BD5 \u7B2C '}{currentIdx + 1}{' / '}{questions.length}{' \u9898'}
        </div>
        <div
          className="px-3 py-1 rounded-full text-sm text-white"
          style={{ background: 'var(--color-literacy)' }}
        >
          {currentQuestion.type === 'listen-choose'
            ? '\u542C\u97F3\u9009\u5B57'
            : '\u770B\u5B57\u9009\u97F3'}
        </div>
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {currentQuestion.type === 'listen-choose' && (
          <div className="flex flex-col items-center gap-6 mb-8">
            <p className="text-lg text-gray-500">
              {'\u542C\u4E00\u542C\uFF0C\u9009\u51FA\u6B63\u786E\u7684\u5B57'}
            </p>
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
            <p className="text-lg text-gray-500">
              {'\u8FD9\u4E2A\u5B57\u600E\u4E48\u8BFB\uFF1F'}
            </p>
            <div
              className="char-display cursor-pointer"
              style={{ fontSize: 140 }}
              onClick={() => speakText(currentQuestion.target.char)}
            >
              {currentQuestion.target.char}
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
              disabled={!!feedback}
            >
              {currentQuestion.type === 'see-char-choose-pinyin' ? (
                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 24 }}>
                  {option.pinyin}
                </span>
              ) : (
                <span className="char-medium" style={{ fontSize: 48 }}>
                  {option.char}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 反馈提示 */}
      {feedback && (
        <FeedbackToast
          type={feedback.type}
          message={feedback.message}
          duration={2000}
          onComplete={handleFeedbackComplete}
        />
      )}
    </div>
  )
}
