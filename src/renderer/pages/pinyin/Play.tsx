import { useState, useMemo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { ALL_PINYIN, SHENGMU, YUNMU, SYLLABLES } from '../../content/pinyin'
import { speakText, getEncouragement, calculateStars } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'
import Celebration from '../../components/learning/Celebration'

type GameMode = 'listen' | 'seeChar' | 'spell'

const MODES: { mode: GameMode; icon: string; title: string; desc: string; color: string; bg: string }[] = [
  { mode: 'listen', icon: '👂', title: '听音辨音', desc: '听发音，选出正确的拼音', color: '#00B894', bg: '#E8FFF8' },
  { mode: 'seeChar', icon: '👀', title: '看字选拼音', desc: '看汉字，选出对应的拼音', color: '#0984E3', bg: '#E8F4FD' },
  { mode: 'spell', icon: '🧩', title: '拼读组合', desc: '把声母和韵母拼在一起', color: '#6C5CE7', bg: '#F0ECFD' },
]

interface Question {
  prompt: string
  speakText: string
  options: string[]
  correctIndex: number
}

function generateListenQuestions(pool: typeof ALL_PINYIN, count: number): Question[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const qs: Question[] = []
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const target = shuffled[i]
    const others = pool.filter(p => p.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3)
    const options = [target.pinyin, ...others.map(o => o.pinyin)].sort(() => Math.random() - 0.5)
    qs.push({
      prompt: '听一听，选出正确的拼音',
      speakText: target.sound,
      options,
      correctIndex: options.indexOf(target.pinyin),
    })
  }
  return qs
}

function generateSeeCharQuestions(pool: typeof ALL_PINYIN, count: number): Question[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const qs: Question[] = []
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const target = shuffled[i]
    const others = pool.filter(p => p.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3)
    const options = [target.examplePinyin, ...others.map(o => o.examplePinyin)].sort(() => Math.random() - 0.5)
    qs.push({
      prompt: `这个字"${target.exampleChar}"的拼音是什么？`,
      speakText: `这个字的拼音是什么`,
      options,
      correctIndex: options.indexOf(target.examplePinyin),
    })
  }
  return qs
}

function generateSpellQuestions(pool: typeof SYLLABLES, count: number): Question[] {
  const withTone = pool.filter(s => s.tone > 0)
  const shuffled = [...withTone].sort(() => Math.random() - 0.5)
  const qs: Question[] = []
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const target = shuffled[i]
    const initials = [...new Set(pool.map(s => s.initial))].sort(() => Math.random() - 0.5).slice(0, 4)
    const finals = [...new Set(pool.map(s => s.final))].sort(() => Math.random() - 0.5).slice(0, 4)
    const fakeOptions = [
      target.syllable,
      initials[0] + finals[0],
      initials[1] + finals[1],
      initials[2] + finals[2],
    ].filter((v, idx, arr) => arr.indexOf(v) === idx).slice(0, 4)
    if (fakeOptions.length < 4) {
      const extras = ['ba', 'ma', 'da', 'la', 'ta', 'na', 'pa', 'fa']
      for (const ex of extras) {
        if (fakeOptions.length >= 4) break
        if (!fakeOptions.includes(ex)) fakeOptions.push(ex)
      }
    }
    const options = fakeOptions.sort(() => Math.random() - 0.5)
    qs.push({
      prompt: `${target.initial} + ${target.final} 拼出来是什么？`,
      speakText: `${target.initial}加上${target.final}拼出来是什么`,
      options,
      correctIndex: options.indexOf(target.syllable),
    })
  }
  return qs
}

const TOTAL_QUESTIONS = 15

export default function PinyinPlay() {
  const navigate = useNavigate()
  const { mode: routeMode } = useParams()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)
  const learnedIds = useMemo(() => {
    const prog = useProgressStore.getState().progress
    return new Set(prog.filter(p => p.module === 'pinyin' && p.status !== 'new').map(p => p.item_id))
  }, [])

  const [gameMode, setGameMode] = useState<GameMode | null>((routeMode as GameMode) || null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const learnedPool = useMemo(() => {
    const pool = ALL_PINYIN.filter(p => learnedIds.has(p.id))
    return pool.length >= 4 ? pool : ALL_PINYIN.slice(0, 10)
  }, [learnedIds])

  const questions = useMemo(() => {
    if (!gameMode) return []
    if (gameMode === 'listen') return generateListenQuestions(learnedPool, TOTAL_QUESTIONS)
    if (gameMode === 'seeChar') return generateSeeCharQuestions(learnedPool, TOTAL_QUESTIONS)
    return generateSpellQuestions(SYLLABLES, TOTAL_QUESTIONS)
  }, [gameMode, learnedPool])

  const q = questions[currentQ]
  const modeCfg = gameMode ? MODES.find(m => m.mode === gameMode)! : null

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return
    setSelected(idx)

    const isCorrect = idx === q.correctIndex
    setFeedback(isCorrect ? 'correct' : 'error')

    if (isCorrect) {
      setScore(s => s + 1)
      if (currentChild && gameMode === 'listen') {
        const poolItem = learnedPool.find(p => p.pinyin === q.options[q.correctIndex])
        if (poolItem) {
          saveProgress({
            child_id: currentChild.id, module: 'pinyin', item_id: poolItem.id,
            status: 'practicing', mastery_level: 60, review_stage: 1,
            consecutive_correct: 1, next_review_date: Date.now() + 60 * 60 * 1000,
          })
        }
      }
    }

    setTimeout(() => {
      setSelected(null)
      setFeedback(null)
      if (currentQ < TOTAL_QUESTIONS - 1) {
        setCurrentQ(c => c + 1)
      } else {
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / TOTAL_QUESTIONS) * 100)
        setScore(finalScore)
        setShowResult(true)
        if (finalScore >= 90) setShowCelebration(true)
      }
    }, isCorrect ? 800 : 1500)
  }, [selected, q, currentQ, score, currentChild, gameMode, learnedPool, saveProgress])

  const handleReplay = () => {
    setCurrentQ(0)
    setSelected(null)
    setFeedback(null)
    setScore(0)
    setShowResult(false)
    setShowCelebration(false)
  }

  // Mode selection screen
  if (!gameMode) {
    return (
      <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #E8FFF8 0%, #FFFFFF 100%)' }}>
        <div className="flex items-center gap-3 px-5 py-4 shrink-0">
          <button onClick={() => navigate('/pinyin')} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
          <h1 className="text-lg font-bold" style={{ color: '#00B894' }}>🎮 拼音游戏</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">选择游戏模式</h2>
            <p className="text-sm text-gray-400">每种模式 {TOTAL_QUESTIONS} 道题，看看你能得几颗星！</p>
          </div>
          <div className="grid gap-4 w-full max-w-sm">
            {MODES.map(m => (
              <button key={m.mode}
                onClick={() => setGameMode(m.mode)}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 text-left"
                style={{ borderColor: m.color, backgroundColor: m.bg }}>
                <span style={{ fontSize: '40px' }}>{m.icon}</span>
                <div>
                  <div className="text-base font-bold" style={{ color: m.color }}>{m.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{m.desc}</div>
                </div>
                <span className="ml-auto text-gray-300">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResult) {
    const stars = calculateStars(score)
    return (
      <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #E8FFF8 0%, #FFFFFF 100%)' }}>
        {showCelebration && <Celebration stars={stars} message={getEncouragement(score)} level="large" />}
        <div className="text-5xl mb-4">{stars >= 3 ? '🏆' : stars >= 2 ? '🎉' : '💪'}</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">{getEncouragement(score)}</h2>
        <div className="flex gap-1.5 mb-2">
          {[1, 2, 3].map(s => (
            <span key={s} style={{ fontSize: '32px', opacity: stars >= s ? 1 : 0.2 }}>⭐</span>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-2">正确率 {score}%</div>
        <div className="text-xs text-gray-400 mb-8">{score >= 80 ? '你太厉害了，拼音小达人！' : '再练习一下会更好哦！'}</div>
        <div className="flex gap-3">
          <button onClick={handleReplay}
            className="px-6 py-2.5 rounded-xl bg-white border-2 font-bold transition-all hover:scale-105"
            style={{ borderColor: modeCfg?.color, color: modeCfg?.color }}>
            🔄 再来一次
          </button>
          <button onClick={() => navigate('/pinyin')}
            className="px-6 py-2.5 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ background: modeCfg?.color }}>
            ← 返回
          </button>
        </div>
      </div>
    )
  }

  // Game play screen
  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #E8FFF8 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-3 shrink-0">
        <button onClick={() => setGameMode(null)} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
        <div className="flex-1 flex items-center gap-2">
          <span style={{ fontSize: '20px' }}>{modeCfg?.icon}</span>
          <span className="text-sm font-bold" style={{ color: modeCfg?.color }}>{modeCfg?.title}</span>
        </div>
        <span className="text-xs text-gray-400">{currentQ + 1}/{TOTAL_QUESTIONS}</span>
      </div>

      {/* 进度条 */}
      <div className="px-5 mb-4">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentQ) / TOTAL_QUESTIONS) * 100}%`, background: modeCfg?.color }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 问题 */}
        <div className="text-center mb-6">
          <div className="mb-3"><PinyinText text={q.prompt} pinyinSize={12} charSize={20} /></div>
          {gameMode === 'listen' && (
            <button onClick={() => speakText(q.speakText, 0.6)}
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform"
              style={{ background: 'linear-gradient(135deg, #E8FFF8, #DFFFD6)', border: '3px solid #00B894' }}>
              <span style={{ fontSize: '32px' }}>🔊</span>
            </button>
          )}
          {gameMode === 'seeChar' && (
            <div className="mb-4">
              <span style={{ fontSize: '64px', fontFamily: '"KaiTi", serif', color: '#2D3436' }}>
                {q.prompt.match(/"(.+?)"/)?.[1]}
              </span>
            </div>
          )}
          {gameMode === 'spell' && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-green-50 border-2 border-green-200 rounded-xl px-4 py-2 text-2xl font-bold text-green-600 font-mono">
                {q.prompt.split(' + ')[0]}
              </span>
              <span className="text-xl text-gray-400">+</span>
              <span className="bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-2 text-2xl font-bold text-blue-600 font-mono">
                {q.prompt.split(' + ')[1]?.split(' 拼')[0]}
              </span>
              <span className="text-xl text-gray-400">= ?</span>
            </div>
          )}
        </div>

        {/* 选项 */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.options.map((option, i) => {
            let borderColor = '#E8ECF1'
            let bgColor = '#fff'
            let animation = ''
            if (selected === i && feedback === 'correct') {
              borderColor = '#52C41A'; bgColor = '#F0FFF0'; animation = 'correct-bounce'
            } else if (selected === i && feedback === 'error') {
              borderColor = '#FF6B6B'; bgColor = '#FFF0F0'; animation = 'gentle-shake'
            } else if (feedback !== null && i === q.correctIndex) {
              borderColor = '#52C41A'; bgColor = '#F0FFF0'
            }

            return (
              <button key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`btn-child border-2 min-h-[52px] transition-all ${animation}`}
                style={{ borderColor, backgroundColor: bgColor }}>
                {gameMode === 'spell' ? (
                  <span style={{ fontSize: '22px', fontFamily: 'Arial, monospace', fontWeight: 'bold', color: '#2D3436' }}>
                    {option}
                  </span>
                ) : (
                  <span style={{ fontSize: gameMode === 'listen' ? '20px' : '18px', fontFamily: 'Arial, monospace' }}>
                    {option}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* 反馈 */}
        {feedback === 'correct' && (
          <div className="mt-4 text-[#52C41A] text-lg font-bold animate-[star-pop_0.3s_ease-out]">✓ 太棒了！</div>
        )}
        {feedback === 'error' && (
          <div className="mt-4 text-center animate-[slide-in_0.3s_ease-out]">
            <div className="text-sm font-bold mb-1" style={{ color: '#FF6B6B' }}>再想想哦～</div>
            <div className="text-xs text-gray-500">
              正确答案：<span className="font-bold" style={{ color: '#52C41A' }}>{q.options[q.correctIndex]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
