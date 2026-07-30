import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../../stores/useProgressStore'
import { useAdminStore } from '../../stores/useAdminStore'
import { MATH_CATEGORIES } from '../../content/math'

export default function MathMap() {
  const navigate = useNavigate()
  const allProgress = useProgressStore(s => s.progress)
  const mathProgress = useMemo(() => allProgress.filter(p => p.module === 'math'), [allProgress])
  const learnedIds = useMemo(() => new Set(mathProgress.filter(p => p.status !== 'new').map(p => p.item_id)), [mathProgress])
  const masteredIds = useMemo(() => new Set(mathProgress.filter(p => p.status === 'mastered').map(p => p.item_id)), [mathProgress])
  const isAdmin = useAdminStore(s => s.isAdmin)

  const levels = MATH_CATEGORIES.map((cat, i) => {
    const learned = cat.items.filter(item => learnedIds.has(item.id)).length
    const mastered = cat.items.filter(item => masteredIds.has(item.id)).length
    const prevCat = i > 0 ? MATH_CATEGORIES[i - 1] : null
    const prevDone = isAdmin || !prevCat || prevCat.items.length === 0 || prevCat.items.filter(item => learnedIds.has(item.id)).length >= prevCat.items.length * 0.5
    const stars = cat.items.length > 0 && mastered === cat.items.length ? 3 : learned >= (cat.items.length || 1) * 0.5 ? 2 : learned > 0 ? 1 : 0
    return { ...cat, learned, mastered, isUnlocked: prevDone, stars }
  })

  const totalLearned = mathProgress.filter(p => p.status !== 'new').length

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-4 shrink-0">
        <button onClick={() => navigate('/')} className="btn-child px-3 bg-white/80 text-gray-600">←</button>
        <h1 className="text-lg font-bold" style={{ color: '#E17055' }}>🏔️ 数学山</h1>
        {isAdmin && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-bold animate-pulse">管理员</span>}
        <span className="ml-auto text-xs text-gray-400">已学 {totalLearned} 题</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <div className="card-soft p-4 mb-4">
          <div className="text-sm text-gray-500 mb-1">攀登进度</div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (levels.filter(l => l.stars >= 3).length / levels.length) * 100)}%`, background: 'linear-gradient(90deg, #E17055, #FDCB6E)' }} />
          </div>
        </div>

        <h2 className="text-sm font-bold text-gray-700 mb-3">登山关卡 · 左右滑动</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 mb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {levels.map((lv, i) => (
            <button key={i}
              onClick={() => lv.isUnlocked && lv.items.length > 0 && navigate('/math/learn', { state: { category: lv.name } })}
              disabled={!lv.isUnlocked || lv.items.length === 0}
              className="shrink-0 flex flex-col items-center rounded-2xl p-4 transition-all hover:scale-105"
              style={{
                width: '110px', scrollSnapAlign: 'start',
                background: lv.isUnlocked ? 'rgba(255,255,255,0.9)' : '#F5F5F5',
                boxShadow: lv.isUnlocked ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                border: lv.stars >= 3 ? '2px solid #FFD700' : lv.isUnlocked ? '1px solid #E8ECF1' : '1px solid #eee',
                opacity: lv.isUnlocked ? 1 : 0.45,
              }}>
              <span style={{ fontSize: '28px' }}>{lv.stars >= 3 ? '🏆' : lv.isUnlocked ? lv.icon : '🔒'}</span>
              <span className="text-xs font-bold mt-1 text-gray-700">第{i + 1}关</span>
              <span className="text-xs font-medium mt-0.5" style={{ color: '#E17055' }}>{lv.name}</span>
              {lv.method && <span className="text-xs text-gray-400">{lv.method}</span>}
              {lv.isUnlocked ? (
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3].map(s => <span key={s} style={{ fontSize:'12px', opacity: lv.stars >= s ? 1 : 0.2 }}>⭐</span>)}
                </div>
              ) : (
                <span className="text-xs text-gray-400 mt-1">{lv.learned}/{lv.items.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => navigate('/math/learn')} className="btn-child text-white font-bold py-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #E17055, #FDCB6E)' }}>🧗 开始攀登</button>
          <button onClick={() => navigate('/math/play')} className="btn-child bg-white border font-bold py-3 rounded-xl"
            style={{ borderColor: '#E17055', color: '#E17055' }}>🏆 登山挑战</button>
        </div>
      </div>
    </div>
  )
}
