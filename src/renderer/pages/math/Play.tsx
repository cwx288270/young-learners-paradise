import { useState, useMemo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { ALL_MATH } from '../../content/math'
import { speakText, calculateStars, getEncouragement } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'
import Celebration from '../../components/learning/Celebration'
import type { MathData } from '../../types'

const TOTAL = 15

function pickQuestions(pool: MathData[], count: number): MathData[] {
  const withOptions = pool.filter(m => m.options && m.options.length > 0)
  const shuffled = [...withOptions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function MathPlay() {
  const navigate = useNavigate()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)
  const learnedIds = useMemo(() => {
    const prog = useProgressStore.getState().progress
    return new Set(prog.filter(p => p.module === 'math' && p.status !== 'new').map(p => p.item_id))
  }, [])

  const learnedPool = useMemo(() => {
    const pool = ALL_MATH.filter(m => learnedIds.has(m.id) && m.options.length > 0)
    return pool.length >= TOTAL ? pool : ALL_MATH.filter(m => m.options.length > 0)
  }, [learnedIds])

  const [questions] = useState(() => pickQuestions(learnedPool, TOTAL))
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)
  const [score, setScore] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [shuffledOpts, setShuffledOpts] = useState<string[]>([])

  const q = questions[currentQ]

  useEffect(() => {
    if (q?.options?.length > 0) {
      setShuffledOpts([...q.options].sort(() => Math.random() - 0.5))
    }
  }, [currentQ, q])

  const handleSelect = useCallback((option: string) => {
    if (selected !== null) return
    setSelected(option)

    const isCorrect = option === String(q.answer)
    setFeedback(isCorrect ? 'correct' : 'error')

    if (isCorrect) {
      setScore(s => s + 1)
      if (currentChild) {
        saveProgress({
          child_id: currentChild.id, module: 'math', item_id: q.id,
          status: 'practicing', mastery_level: 60, review_stage: 1,
          consecutive_correct: 1, next_review_date: Date.now() + 60 * 60 * 1000,
        })
      }
    } else {
      setWrongAnswers(w => w + 1)
    }

    setTimeout(() => {
      setSelected(null)
      setFeedback(null)
      if (currentQ < TOTAL - 1) {
        setCurrentQ(c => c + 1)
      } else {
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / TOTAL) * 100)
        setScore(finalScore)
        setShowResult(true)
        if (finalScore >= 90) setShowCelebration(true)
      }
    }, isCorrect ? 800 : 1800)
  }, [selected, q, currentQ, score, currentChild, saveProgress])

  const handleReplay = () => {
    navigate(0) // reload to get new questions
  }

  // Result screen
  if (showResult) {
    const stars = calculateStars(score)
    const heightReached = Math.round((score / 100) * 5)
    return (
      <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 100%)' }}>
        {showCelebration && <Celebration stars={calculateStars(score)} message={getEncouragement(score)} level="large" />}
        <div className="text-6xl mb-4">{stars >= 3 ? '🏆' : stars >= 2 ? '⛰️' : '🧗'}</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">{getEncouragement(score)}</h2>
        <div className="flex gap-1.5 mb-3">
          {[1, 2, 3].map(s => (
            <span key={s} style={{ fontSize: '32px', opacity: stars >= s ? 1 : 0.2 }}>⭐</span>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-1">答对 {Math.round(score * TOTAL / 100)}/{TOTAL} 题</div>
        <div className="text-sm text-gray-500 mb-2">正确率 {score}%</div>
        {/* Mountain visualization */}
        <div className="flex flex-col items-center mb-6">
          {[5, 4, 3, 2, 1].map(h => (
            <div key={h} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-16 text-right">
                {h === 5 ? '🏔️顶峰' : h === 4 ? '山腰' : h === 3 ? '山脚' : h === 2 ? '起点' : ''}
              </span>
              <div className="w-32 h-4 rounded-full border border-gray-200 bg-white overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: h <= heightReached ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #E17055, #FDCB6E)',
                }} />
              </div>
              <span className="text-xs text-gray-400">{h === heightReached && stars < 3 ? '← 到达' : ''}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={handleReplay}
            className="px-6 py-2.5 rounded-xl bg-white border-2 font-bold transition-all hover:scale-105"
            style={{ borderColor: '#E17055', color: '#E17055' }}>
            🔄 再次挑战
          </button>
          <button onClick={() => navigate('/math')}
            className="px-6 py-2.5 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ background: '#E17055' }}>
            ← 返回
          </button>
        </div>
      </div>
    )
  }

  // Mountain height based on current progress
  const climbProgress = Math.round((currentQ / TOTAL) * 5)
  const mountainEmoji = climbProgress >= 5 ? '🏔️' : climbProgress >= 3 ? '⛰️' : climbProgress >= 1 ? '🏔️' : '🧗'

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 100%)' }}>
      {/* 顶部 */}
      <div className="flex items-center gap-3 px-5 py-3 shrink-0">
        <button onClick={() => navigate('/math')} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
        <div className="flex-1 flex items-center gap-2">
          <span style={{ fontSize: '20px' }}>{mountainEmoji}</span>
          <span className="text-sm font-bold" style={{ color: '#E17055' }}>登山挑战</span>
        </div>
        <span className="text-xs text-gray-400">{currentQ + 1}/{TOTAL}</span>
      </div>

      {/* 登山进度可视化 */}
      <div className="px-5 mb-3">
        <div className="flex items-end justify-center gap-1 h-16">
          {[1, 2, 3, 4, 5].map(h => (
            <div key={h} className="flex flex-col items-center">
              <span style={{ fontSize: climbProgress >= h ? '24px' : '16px', opacity: climbProgress >= h ? 1 : 0.3 }}>
                {h === 5 ? '🏆' : '⭐'}
              </span>
              <div className="w-12 rounded-t-lg transition-all" style={{
                height: `${h * 10}px`,
                backgroundColor: climbProgress >= h ? '#E17055' : '#E8ECF1',
                opacity: climbProgress >= h ? 1 : 0.5,
              }} />
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentQ / TOTAL) * 100}%`, background: 'linear-gradient(90deg, #E17055, #FDCB6E)' }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 题目 */}
        <div className="text-center mb-6">
          {(q.type === 'addition' || q.type === 'subtraction') ? (
            <div className="mb-3">
              <div className="font-bold cursor-pointer mb-2"
                style={{ fontSize: '56px', fontFamily: 'Arial', color: '#E17055' }}
                onClick={() => speakText(q.question, 0.7)}>
                {q.title}
              </div>
              <PinyinText text={q.question} pinyinSize={12} charSize={20} />
            </div>
          ) : (
            <div className="mb-3">
              <PinyinText text={q.question} pinyinSize={13} charSize={24} />
            </div>
          )}
        </div>

        {/* 选项 */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {shuffledOpts.map((option, i) => {
            let borderColor = '#E8ECF1'
            let bgColor = '#fff'
            let anim = ''
            if (selected === option && feedback === 'correct') {
              borderColor = '#52C41A'; bgColor = '#F0FFF0'; anim = 'correct-bounce'
            } else if (selected === option && feedback === 'error') {
              borderColor = '#FF6B6B'; bgColor = '#FFF0F0'; anim = 'gentle-shake'
            } else if (feedback && option === String(q.answer)) {
              borderColor = '#52C41A'; bgColor = '#F0FFF0'
            }
            return (
              <button key={i}
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={`btn-child border-2 min-h-[52px] transition-all ${anim}`}
                style={{ borderColor, backgroundColor: bgColor }}>
                <span style={{ fontSize: '22px', fontFamily: 'Arial', fontWeight: 'bold', color: '#2D3436' }}>
                  {option}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3" style={{ minHeight: '36px' }}>
          {feedback === 'correct' && (
            <div className="text-[#52C41A] text-lg font-bold animate-[star-pop_0.3s_ease-out]">
              ✓ 太棒了！往上爬！
            </div>
          )}
          {feedback === 'error' && (
            <div className="text-center animate-[slide-in_0.3s_ease-out]">
              <div className="text-sm font-bold mb-1" style={{ color: '#FF6B6B' }}>哎呀，滑了一下！</div>
              <div className="text-xs text-gray-500">
                正确答案：<span className="font-bold" style={{ color: '#52C41A' }}>{String(q.answer)}</span>
              </div>
            </div>
          )}
        </div>

        {/* 计分 */}
        <div className="flex gap-3 mt-6">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div key={i} className="w-3 h-3 rounded-full transition-all" style={{
              backgroundColor: i < currentQ ? (questions[i] ? '#52C41A' : '#E8ECF1') : '#E8ECF1',
              border: i === currentQ ? '2px solid #E17055' : 'none',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
