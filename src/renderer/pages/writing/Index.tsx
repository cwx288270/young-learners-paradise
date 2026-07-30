import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../../stores/useProgressStore'
import { useAdminStore } from '../../stores/useAdminStore'
import { CHARACTERS, getCommonFirst } from '../../content/characters'

export default function WritingGrid() {
  const navigate = useNavigate()
  const allProgress = useProgressStore(s => s.progress)
  const learnedIds = useMemo(() => new Set(allProgress.filter(p => p.module === 'character' && p.status !== 'new').map(p => p.item_id)), [allProgress])
  const writeIds = useMemo(() => new Set(allProgress.filter(p => p.module === 'writing' && p.status !== 'new').map(p => p.item_id)), [allProgress])
  const isAdmin = useAdminStore(s => s.isAdmin)
  const commonChars = useMemo(() => getCommonFirst().slice(0, 100), [])

  const unlocked = useMemo(() => isAdmin ? commonChars : commonChars.filter(c => learnedIds.has(c.id)), [commonChars, learnedIds, isAdmin])

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-4 shrink-0">
        <button onClick={() => navigate('/')} className="btn-child px-3 bg-white/80 text-gray-600">←</button>
        <h1 className="text-lg font-bold" style={{ color: '#FD79A8' }}>✏️ 写字坊</h1>
        <span className="ml-auto text-xs text-gray-400">已练 {writeIds.size} 字 · 可写 {unlocked.length} 字</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <div className="card-soft p-4 mb-4">
          <div className="text-sm text-gray-500 mb-1">练字进度</div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{
              width: `${unlocked.length > 0 ? (writeIds.size / unlocked.length) * 100 : 0}%`,
              background: 'linear-gradient(90deg, #FD79A8, #FAB1D0)',
            }} />
          </div>
          <div className="text-xs text-gray-400 mt-1">先在"识字森林"学过的字，才能来这里练习书写</div>
        </div>

        <h2 className="text-sm font-bold text-gray-700 mb-3">可练习的字（{unlocked.length} 个）</h2>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {commonChars.slice(0, 50).map(char => {
            const isUnlocked = isAdmin || learnedIds.has(char.id)
            const isWritten = writeIds.has(char.id)
            return (
              <button key={char.id}
                onClick={() => isUnlocked && navigate(`/writing/draw/${char.char}`)}
                disabled={!isUnlocked}
                className="flex flex-col items-center py-2 rounded-xl transition-all hover:scale-105"
                style={{
                  background: isWritten ? '#F0FFF0' : isUnlocked ? 'rgba(255,255,255,0.9)' : '#F5F5F5',
                  border: isWritten ? '2px solid #52C41A' : isUnlocked ? '1px solid #FD79A8' : '1px solid #eee',
                  opacity: isUnlocked ? 1 : 0.4,
                }}>
                <span style={{ fontSize: '28px', fontFamily: '"KaiTi",serif', color: isWritten ? '#52C41A' : '#2D3436' }}>
                  {char.char}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{isWritten ? '✓' : isUnlocked ? '可练' : '🔒'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
