import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { READINGS } from '../../content/reading'
import { speakText, calculateStars, getEncouragement } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'
import Celebration from '../../components/learning/Celebration'

export default function ReadingStory() {
  const navigate = useNavigate()
  const { id } = useParams()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const story = READINGS.find(r => r.id === id) || READINGS[0]

  const [page, setPage] = useState(0)
  const [phase, setPhase] = useState<'reading' | 'questions'>('reading')
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showCele, setShowCele] = useState(false)

  // 同步随机打乱选项
  const { shuffledOpts, correctIdx } = useMemo(() => {
    if (phase !== 'questions') return { shuffledOpts: [] as string[], correctIdx: 0 }
    const q = story.questions[currentQ]
    if (!q) return { shuffledOpts: [] as string[], correctIdx: 0 }
    const pairs = q.options.map((opt, i) => ({ opt, i }))
    pairs.sort(() => Math.random() - 0.5)
    return {
      shuffledOpts: pairs.map(p => p.opt),
      correctIdx: pairs.findIndex(p => p.i === q.answer),
    }
  }, [phase, currentQ, story.questions])

  const totalPages = story.content.length
  const totalQuestions = story.questions.length

  // Auto-read current page
  useEffect(() => {
    if (phase === 'reading' && page < totalPages) {
      const timer = setTimeout(() => speakText(story.content[page], 0.75), 300)
      return () => clearTimeout(timer)
    }
  }, [page, phase])

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return
    setSelected(idx)

    const q = story.questions[currentQ]
    const isCorrect = idx === correctIdx
    setFeedback(isCorrect ? 'correct' : 'error')
    if (isCorrect) setScore(s => s + 1)

    setTimeout(() => {
      setSelected(null)
      setFeedback(null)
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(c => c + 1)
      } else {
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / totalQuestions) * 100)
        setScore(finalScore)
        setShowResult(true)
        if (finalScore >= 80) setShowCele(true)
        if (currentChild) {
          saveProgress({
            child_id: currentChild.id, module: 'reading', item_id: story.id,
            status: finalScore >= 70 ? 'mastered' : 'practicing',
            mastery_level: finalScore, review_stage: finalScore >= 70 ? 2 : 0,
            consecutive_correct: 0,
            next_review_date: Date.now() + (finalScore >= 70 ? 24 : 2) * 60 * 60 * 1000,
          })
        }
      }
    }, isCorrect ? 1000 : 1800)
  }, [selected, currentQ, score, story, totalQuestions, currentChild, saveProgress])

  // Result screen
  if (showResult) {
    const stars = calculateStars(score)
    return (
      <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)' }}>
        {showCele && <Celebration stars={calculateStars(score)} message={getEncouragement(score)} level="large" />}
        <div className="text-5xl mb-4">{stars >= 3 ? '🏆' : stars >= 2 ? '📚' : '📖'}</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">{getEncouragement(score)}</h2>
        <div className="flex gap-1.5 mb-2">
          {[1, 2, 3].map(s => (
            <span key={s} style={{ fontSize: '32px', opacity: stars >= s ? 1 : 0.2 }}>⭐</span>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-1">答对 {Math.round(score * totalQuestions / 100)}/{totalQuestions} 题</div>
        <div className="text-sm text-gray-400 mb-8">《{story.title}》读完了！</div>
        <div className="flex gap-3">
          <button onClick={() => { setPhase('reading'); setPage(0); setCurrentQ(0); setScore(0); setShowResult(false); setShowCele(false); }}
            className="px-6 py-2.5 rounded-xl bg-white border-2 font-bold transition-all hover:scale-105"
            style={{ borderColor: '#6C5CE7', color: '#6C5CE7' }}>
            🔄 再读一遍
          </button>
          <button onClick={() => navigate('/reading')}
            className="px-6 py-2.5 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ background: '#6C5CE7' }}>
            ← 回书架
          </button>
        </div>
      </div>
    )
  }

  // Reading phase
  if (phase === 'reading') {
    const progressPct = ((page + 1) / totalPages) * 100

    return (
      <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFEF5 50%, #FFFFFF 100%)' }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 shrink-0">
          <button onClick={() => navigate('/reading')} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
          <div className="flex-1">
            <div className="text-sm font-bold" style={{ color: '#6C5CE7' }}>📖 {story.title}</div>
          </div>
          <span className="text-xs text-gray-400">{page + 1}/{totalPages} 页</span>
        </div>

        {/* Progress */}
        <div className="px-5 mb-3">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
          </div>
        </div>

        {/* All sentences on one page */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="max-w-lg mx-auto space-y-3">
            {story.content.map((line, i) => (
              <div key={i}
                className={`px-5 py-3 rounded-xl transition-all cursor-pointer ${
                  i === page ? 'bg-yellow-50 ring-2 ring-yellow-200 shadow-sm' : 'bg-white/70'
                }`}
                style={{ lineHeight: '2.4' }}
                onClick={() => { setPage(i); speakText(line, 0.75) }}>
                <PinyinText text={line} pinyinSize={14} charSize={24} color="#2D3436" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center gap-4 px-5 py-3 shrink-0 border-t border-gray-100">
          <button onClick={() => { const prev = Math.max(0, page - 1); setPage(prev); speakText(story.content[prev], 0.75); }}
            disabled={page === 0}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            ← 上一句
          </button>
          <button onClick={() => speakText(story.content[page], 0.75)}
            className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center hover:bg-purple-100 transition-all">
            🔊
          </button>
          <button onClick={() => {
            if (page < totalPages - 1) { const next = page + 1; setPage(next); speakText(story.content[next], 0.75); }
            else setPhase('questions');
          }}
            className="px-4 py-2 rounded-xl text-white font-bold text-sm transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
            {page < totalPages - 1 ? '下一句 →' : '开始答题 ✓'}
          </button>
        </div>
      </div>
    )
  }

  // Questions phase
  const q = story.questions[currentQ]
  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-3 shrink-0">
        <button onClick={() => setPhase('reading')} className="btn-child px-3 bg-white/80 text-gray-500">← 回故事</button>
        <div className="flex-1 text-sm font-bold" style={{ color: '#6C5CE7' }}>📝 阅读理解</div>
        <span className="text-xs text-gray-400">{currentQ + 1}/{totalQuestions}</span>
      </div>

      <div className="px-5 mb-3">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentQ / totalQuestions) * 100}%`, background: '#6C5CE7' }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-6 max-w-md">
          <div style={{ lineHeight: '2.2' }}>
            <PinyinText text={q.question} pinyinSize={14} charSize={24} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {shuffledOpts.map((option, i) => {
            let borderColor = '#E8ECF1'
            let bgColor = '#fff'
            let anim = ''
            if (selected === i && feedback === 'correct') {
              borderColor = '#52C41A'; bgColor = '#F0FFF0'; anim = 'correct-bounce'
            } else if (selected === i && feedback === 'error') {
              borderColor = '#FF6B6B'; bgColor = '#FFF0F0'; anim = 'gentle-shake'
            } else if (feedback !== null && i === correctIdx) {
              borderColor = '#52C41A'; bgColor = '#F0FFF0'
            }
            return (
              <button key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`btn-child border-2 min-h-[48px] transition-all ${anim}`}
                style={{ borderColor, backgroundColor: bgColor }}>
                <PinyinText text={option} pinyinSize={11} charSize={18} />
              </button>
            )
          })}
        </div>

        <div className="mt-3" style={{ minHeight: '36px' }}>
          {feedback === 'correct' && (
            <div className="text-[#52C41A] text-lg font-bold animate-[star-pop_0.3s_ease-out]">✓ 太棒了！</div>
          )}
          {feedback === 'error' && (
            <div className="text-center animate-[slide-in_0.3s_ease-out]">
              <div className="text-sm font-bold mb-1" style={{ color: '#FF6B6B' }}>再想想哦～</div>
              <div className="text-xs text-gray-500">
                正确答案：<span className="font-bold" style={{ color: '#52C41A' }}>{shuffledOpts[correctIdx]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
