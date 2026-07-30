import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../../stores/useProgressStore'
import { useAdminStore } from '../../stores/useAdminStore'
import { READINGS } from '../../content/reading'

const LEVEL_CONFIG = [
  { level: 1, label: '🌱 入门', minChars: 0, color: '#52C41A' },
  { level: 2, label: '🌿 进阶', minChars: 80, color: '#FAAD14' },
  { level: 3, label: '🌳 高手', minChars: 200, color: '#6C5CE7' },
]

export default function ReadingShelf() {
  const navigate = useNavigate()
  const allProgress = useProgressStore(s => s.progress)
  const charLearned = useMemo(() => new Set(allProgress.filter(p => p.module === 'character' && p.status !== 'new').map(p => p.item_id)).size, [allProgress])
  const readIds = useMemo(() => new Set(allProgress.filter(p => p.module === 'reading' && p.status !== 'new').map(p => p.item_id)), [allProgress])
  const isAdmin = useAdminStore(s => s.isAdmin)

  const readingsByLevel = useMemo(() => {
    return LEVEL_CONFIG.map(lc => {
      const stories = READINGS.filter(r => r.level === lc.level)
      return { ...lc, stories }
    })
  }, [])

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-4 shrink-0">
        <button onClick={() => navigate('/')} className="btn-child px-3 bg-white/80 text-gray-600">←</button>
        <h1 className="text-lg font-bold" style={{ color: '#6C5CE7' }}>📚 阅读谷</h1>
        <span className="ml-auto text-xs text-gray-400">已读 {readIds.size} 篇 · 识字 {charLearned} 字</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {readingsByLevel.map((lc, li) => {
          const unlocked = lc.stories.filter(s => !readIds.has(s.id))
          const locked = lc.stories.filter(s => readIds.has(s.id))
          const canAccess = isAdmin || charLearned >= lc.minChars

          return (
            <div key={lc.level} className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-bold" style={{ color: lc.color }}>{lc.label}</h2>
                <span className="text-xs text-gray-400">（需识字 {lc.minChars} 字）</span>
                {!canAccess && <span className="text-xs text-red-400">还差 {lc.minChars - charLearned} 字解锁</span>}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory' }}>
                {lc.stories.map(story => {
                  const isRead = readIds.has(story.id)
                  const isLocked = !canAccess && !isRead
                  return (
                    <button key={story.id}
                      onClick={() => !isLocked && navigate(`/reading/story/${story.id}`)}
                      disabled={isLocked}
                      className="shrink-0 rounded-2xl p-4 transition-all hover:scale-105 flex flex-col items-center"
                      style={{
                        width: '120px', scrollSnapAlign: 'start',
                        background: isRead ? '#F0FFF0' : isLocked ? '#F5F5F5' : 'rgba(255,255,255,0.9)',
                        boxShadow: isLocked ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
                        border: isRead ? '2px solid #52C41A' : isLocked ? '1px solid #eee' : '1px solid #E8ECF1',
                        opacity: isLocked ? 0.5 : 1,
                      }}>
                      <span style={{ fontSize: '28px' }}>{isRead ? '✅' : isLocked ? '🔒' : '📖'}</span>
                      <span className="text-sm font-bold mt-2 text-gray-700">{story.title}</span>
                      <span className="text-xs text-gray-400 mt-1">{story.content.length} 句 · {story.questions.length} 题</span>
                      <span className="text-xs text-gray-300 mt-0.5 truncate w-full text-center">{story.content[0].substring(0, 15)}...</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
