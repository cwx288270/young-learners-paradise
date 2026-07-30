import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { MATH_CATEGORIES, getMathByCategory, NUMBERS } from '../../content/math'
import { speakText } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'
import type { MathData } from '../../types'

// 图形可视化
const SHAPE_STYLES: Record<string, React.CSSProperties> = {
  '圆形': { width: 80, height: 80, borderRadius: '50%', background: '#FF6B6B' },
  '正方形': { width: 70, height: 70, borderRadius: 8, background: '#5B8DEF' },
  '三角形': { width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: '70px solid #52C41A', background: 'none' },
  '长方形': { width: 100, height: 55, borderRadius: 4, background: '#FAAD14' },
  '椭圆形': { width: 90, height: 60, borderRadius: '50%', background: '#E17055' },
  '菱形': { width: 55, height: 55, borderRadius: 4, background: '#6C5CE7', transform: 'rotate(45deg)' },
  '五角星': { fontSize: 70, color: '#FFD700', background: 'none', width: 'auto', height: 'auto' },
  '心形': { fontSize: 70, background: 'none', width: 'auto', height: 'auto' },
}

const SHAPE_EMOJI: Record<string, string> = {
  '五角星': '★', '心形': '♥',
  '正方体': '🧊', '球体': '⚽', '圆柱体': '🥫', '圆锥体': '📐', '角锥体': '🔺',
}

function ShapeVisual({ title }: { title: string; question: string }) {
  const shapeName = title.replace('认识', '').replace('是什么形状', '').replace('是什么立体图形', '')
  const emoji = SHAPE_EMOJI[shapeName]
  const style = SHAPE_STYLES[shapeName]

  if (emoji) {
    return (
      <div className="mb-3 flex items-center justify-center" style={{ height: 100, fontSize: emoji === '♥' || emoji === '★' ? 72 : 64 }}>
        {emoji === '♥' ? <span style={{ color: '#FF6B6B', fontSize: 72 }}>♥</span> :
         emoji === '★' ? <span style={{ color: '#FFD700', fontSize: 72 }}>★</span> :
         <span style={{ fontSize: 72 }}>{emoji}</span>}
      </div>
    )
  }

  if (shapeName === '三角形') {
    return (
      <div className="mb-3 flex items-center justify-center" style={{ height: 90 }}>
        <div style={{ width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: '70px solid #52C41A' }} />
      </div>
    )
  }

  if (style && style.width && style.height) {
    return (
      <div className="mb-3 flex items-center justify-center" style={{ height: 100 }}>
        <div style={style} />
      </div>
    )
  }

  return null
}

// 规律可视化
function PatternVisual({ question }: { question: string }) {
  const display = question.replace(/\?/g, '❓')
  if (!display.includes('🔴') && !display.includes('○') && !display.includes('★') && !display.includes('□')) {
    return <div className="mb-3 text-2xl tracking-wider font-bold text-gray-700">{display}</div>
  }
  return <div className="mb-3 text-3xl tracking-wider">{display}</div>
}

export default function MathLearn() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const categoryName = (location.state as any)?.category as string | undefined
  const category = categoryName ? getMathByCategory(categoryName) : undefined
  const items: MathData[] = category?.items?.length ? category.items : NUMBERS.slice(0, 10)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)
  const [wrongCount, setWrongCount] = useState(0)
  const [showRhyme, setShowRhyme] = useState(!!category?.rhyme)

  const current = items[currentIdx]
  const totalItems = items.length
  const hasOptions = current?.options && current.options.length > 0

  // Auto-speak
  useEffect(() => {
    if (!current) return
    setWrongCount(0)
    const text = current.question || current.title
    setTimeout(() => speakText(text, 0.7), 300)
  }, [currentIdx, current])

  const handleSelect = useCallback((option: string) => {
    if (selected) return
    setSelected(option)

    // Compare as strings for consistency
    const correctAnswer = String(current.answer)
    const isCorrect = option === correctAnswer

    if (isCorrect) {
      setFeedback('correct')
      if (currentChild) {
        saveProgress({
          child_id: currentChild.id, module: 'math', item_id: current.id,
          status: 'learning', mastery_level: 30, review_stage: 0,
          consecutive_correct: wrongCount === 0 ? 1 : 0,
          next_review_date: Date.now() + 5 * 60 * 1000,
        })
      }
    } else {
      setFeedback('error')
      setWrongCount(c => c + 1)
    }

    setTimeout(() => {
      setSelected(null)
      setFeedback(null)
      if (isCorrect) {
        if (currentIdx < totalItems - 1) {
          setCurrentIdx(c => c + 1)
        } else {
          navigate('/math')
        }
      }
    }, isCorrect ? 1000 : 1800)
  }, [selected, current, currentIdx, totalItems, wrongCount, currentChild, saveProgress, navigate])

  const handleNext = () => {
    if (currentChild) {
      saveProgress({
        child_id: currentChild.id, module: 'math', item_id: current.id,
        status: 'learning', mastery_level: 15, review_stage: 0,
        consecutive_correct: 0, next_review_date: Date.now() + 5 * 60 * 1000,
      })
    }
    if (currentIdx < totalItems - 1) {
      setCurrentIdx(c => c + 1)
    } else {
      navigate('/math')
    }
  }

  const handleDismissRhyme = () => {
    setShowRhyme(false)
  }

  if (!current) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-gray-400 text-lg">暂无学习内容</div>
        <button onClick={() => navigate('/math')} className="btn-child px-4 bg-white border text-gray-500">返回</button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 100%)' }}>
      {/* 顶部 */}
      <div className="flex items-center gap-3 px-5 py-3 shrink-0">
        <button onClick={() => navigate('/math')} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
        <div className="flex-1">
          <span className="text-sm font-bold" style={{ color: '#E17055' }}>
            {category?.icon} {category?.name || '数学学习'}
          </span>
          {category?.method && <span className="text-xs text-orange-400 ml-1">· {category.method}</span>}
        </div>
        <span className="text-xs text-gray-400">{currentIdx + 1}/{totalItems}</span>
      </div>

      {/* 口诀/概念横幅（仅首次显示） */}
      {showRhyme && category?.rhyme && (
        <div className="mx-5 mb-3 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 relative">
          <button onClick={handleDismissRhyme} className="absolute top-2 right-3 text-yellow-400 hover:text-yellow-600 text-lg">✕</button>
          <div className="text-2xl mb-2">📝</div>
          <div className="text-sm font-bold text-yellow-800 mb-1">记忆口诀</div>
          <div className="text-xs text-yellow-700 leading-relaxed">{category.rhyme}</div>
          <button onClick={() => speakText(category.rhyme!, 0.7)}
            className="mt-2 text-xs text-yellow-600 underline">🔊 听口诀</button>
        </div>
      )}

      {/* 进度 */}
      <div className="px-5 mb-3">
        <div className="flex gap-1 justify-center">
          {items.slice(0, Math.min(totalItems, 15)).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all" style={{
              backgroundColor: i === currentIdx ? '#E17055' : i < currentIdx ? '#52C41A' : '#E8ECF1',
              transform: i === currentIdx ? 'scale(1.3)' : 'scale(1)',
            }} />
          ))}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto">
        {/* 题目 */}
        <div className="text-center mb-6 w-full max-w-md">
          {/* 算式大字 — 仅对加减法且标题含数字 */}
          {(current.type === 'addition' || current.type === 'subtraction') && /\d/.test(current.title) && (
            <div className="font-bold mb-2 cursor-pointer"
              style={{ fontSize: '52px', fontFamily: 'Arial', color: '#E17055' }}
              onClick={() => speakText(current.question, 0.7)}>
              {current.title}
            </div>
          )}

          {/* 图形可视化 */}
          {current.type === 'shape' && (
            <ShapeVisual title={current.title} question={current.question} />
          )}

          {/* 规律可视化 */}
          {current.type === 'pattern' && (
            <PatternVisual question={current.question} />
          )}

          {/* 题目文字 */}
          {hasOptions ? (
            <div className="mt-2"><PinyinText text={current.question} pinyinSize={12} charSize={20} /></div>
          ) : current.type === 'shape' || current.type === 'pattern' ? (
            <div className="mt-2"><PinyinText text={current.question} pinyinSize={13} charSize={24} /></div>
          ) : (
            <div>
              <div style={{ fontSize: '80px', fontFamily: '"KaiTi",serif', color: '#E17055' }}>{current.answer}</div>
              <div className="text-sm text-gray-400 mt-2"><PinyinText text={current.question} pinyinSize={11} charSize={16} /></div>
            </div>
          )}

          {/* 解释提示 — 只在答错后显示 */}
          {current.explanation && feedback === 'error' && wrongCount >= 2 && (
            <div className="mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 animate-[slide-in_0.3s_ease-out]">
              💡 {current.explanation}
            </div>
          )}
        </div>

        {/* 选项 */}
        {hasOptions ? (
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {current.options.map((option, i) => {
              let borderColor = '#E8ECF1'
              let bgColor = '#fff'
              let anim = ''
              if (selected === option && feedback === 'correct') {
                borderColor = '#52C41A'; bgColor = '#F0FFF0'; anim = 'correct-bounce'
              } else if (selected === option && feedback === 'error') {
                borderColor = '#FF6B6B'; bgColor = '#FFF0F0'; anim = 'gentle-shake'
              } else if (feedback && option === String(current.answer)) {
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
        ) : (
          <button onClick={handleNext}
            className="px-8 py-3 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #E17055, #FDCB6E)', boxShadow: '0 4px 16px rgba(225,112,85,0.3)' }}>
            {currentIdx < totalItems - 1 ? '➡️ 下一个' : '🎉 完成'}
          </button>
        )}

        {/* 反馈 */}
        {feedback === 'correct' && (
          <div className="mt-4 text-[#52C41A] text-lg font-bold animate-[star-pop_0.3s_ease-out]">✓ 太棒了！</div>
        )}
        {feedback === 'error' && (
          <div className="mt-4 text-center animate-[slide-in_0.3s_ease-out]">
            <div className="text-sm font-bold mb-1" style={{ color: '#FF6B6B' }}>
              {wrongCount >= 2 ? `正确答案是 ${String(current.answer)}` : '再想想哦～'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
