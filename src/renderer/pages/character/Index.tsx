import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../../stores/useProgressStore'
import { useUserStore } from '../../stores/useUserStore'
import { CHARACTERS, getCommonFirst } from '../../content/characters'
import { useAdminStore } from '../../stores/useAdminStore'

const TASK_SIZE = 10

function ProgressRing({ progress, size = 80, stroke = 7 }: { progress: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E8ECF1" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#5B8DEF" strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold" style={{ color: '#5B8DEF' }}>{progress}%</span>
      </div>
    </div>
  )
}

export default function CharacterIndex() {
  const navigate = useNavigate()
  const { currentChild } = useUserStore()
  const { loadProgress, getReviewItems } = useProgressStore()
  const allProgress = useProgressStore(s => s.progress)
  const [reviewCount, setReviewCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const charProgress = useMemo(() => allProgress.filter(p => p.module === 'character'), [allProgress])
  const learnedIds = useMemo(() => new Set(charProgress.filter(p => p.status !== 'new').map(p => p.item_id)), [charProgress])
  const masteredIds = useMemo(() => new Set(charProgress.filter(p => p.status === 'mastered').map(p => p.item_id)), [charProgress])
  const isAdmin = useAdminStore(s => s.isAdmin)

  const commonChars = useMemo(() => getCommonFirst(), [])
  const learnedCount = learnedIds.size
  const totalCount = CHARACTERS.length
  const progressPercent = Math.round(Math.min(100, (learnedCount / Math.min(totalCount, 3000)) * 100))

  const totalTasks = Math.ceil(commonChars.length / TASK_SIZE)
  const tasks = useMemo(() => {
    return Array.from({ length: totalTasks }, (_, i) => {
      const start = i * TASK_SIZE
      const chars = commonChars.slice(start, start + TASK_SIZE)
      const learned = chars.filter(c => learnedIds.has(c.id)).length
      const mastered = chars.filter(c => masteredIds.has(c.id)).length
      const isUnlocked = isAdmin || i === 0 || (() => {
        const prevChars = commonChars.slice((i - 1) * TASK_SIZE, i * TASK_SIZE)
        return prevChars.every(c => learnedIds.has(c.id))
      })()
      const stars = mastered === chars.length ? 3 : learned >= chars.length * 0.6 ? 2 : learned > 0 ? 1 : 0
      return { index: i, chars, learned, mastered, total: chars.length, isUnlocked, stars }
    })
  }, [commonChars, learnedIds, masteredIds, totalTasks])

  const todayNewChars = useMemo(() => commonChars.filter(c => !learnedIds.has(c.id)).slice(0, 3), [commonChars, learnedIds])

  useEffect(() => {
    if (currentChild) {
      loadProgress(currentChild.id).then(async () => {
        const items = await getReviewItems(currentChild.id)
        setReviewCount(items.filter((r: { module: string }) => r.module === 'character').length)
      })
    }
  }, [currentChild, loadProgress, getReviewItems])

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)' }}>
      {/* 顶栏 */}
      <div className="flex items-center gap-3 px-5 py-4 shrink-0">
        <button onClick={() => navigate('/')} className="btn-child px-3 bg-white/80 text-gray-600">←</button>
        <h1 className="text-lg font-bold" style={{ color: '#5B8DEF' }}>识字森林</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {/* 进度 */}
        <div className="card-soft p-4 mb-4 flex items-center gap-4">
          <ProgressRing progress={progressPercent} />
          <div>
            <div className="text-sm text-gray-500">学习进度</div>
            <div className="text-lg font-bold" style={{ color: '#5B8DEF' }}>已学 {learnedCount} / {totalCount} 字</div>
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: '认字', icon: '📖', path: '/character/learn', color: '#5B8DEF' },
            { label: '练习', icon: '📝', path: '/character/practice', color: '#00B894' },
            { label: '写字', icon: '✏️', path: '/character/write', color: '#FD79A8' },
            { label: '听音', icon: '👂', path: '/character/test', color: '#E17055' },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all hover:scale-105"
              style={{ background: item.color + '12' }}>
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <span className="text-xs font-medium" style={{ color: item.color }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* 横向滑动关卡 */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-700">学习关卡</h2>
            <span className="text-xs text-gray-400">← 左右滑动 →</span>
          </div>
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory' }}>
            {tasks.slice(0, 30).map(task => (
              <button key={task.index}
                onClick={() => task.isUnlocked && navigate('/character/learn', { state: { charId: task.chars[0].id } })}
                disabled={!task.isUnlocked}
                className="shrink-0 flex flex-col items-center rounded-2xl p-4 transition-all hover:scale-105"
                style={{
                  width: '100px', scrollSnapAlign: 'start',
                  background: task.isUnlocked ? 'rgba(255,255,255,0.9)' : '#F5F5F5',
                  boxShadow: task.isUnlocked ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                  border: task.stars >= 3 ? '2px solid #FFD700' : task.isUnlocked ? '1px solid #E8ECF1' : '1px solid #E8ECF1',
                  opacity: task.isUnlocked ? 1 : 0.5,
                }}>
                <span style={{ fontSize: '28px' }}>{task.isUnlocked ? (task.stars >= 3 ? '🏆' : '📖') : '🔒'}</span>
                <span className="text-xs font-bold mt-1 text-gray-700">第{task.index + 1}关</span>
                {task.isUnlocked ? (
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3].map(s => (
                      <span key={s} style={{ fontSize: '12px', opacity: task.stars >= s ? 1 : 0.2 }}>⭐</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 mt-1">{task.learned}/{task.total}</span>
                )}
                <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">
                  {task.chars[0]?.char}~{task.chars[task.chars.length - 1]?.char}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 今日推荐 */}
        {todayNewChars.length > 0 && (
          <div className="card-soft p-4 mb-4">
            <h2 className="text-sm font-bold text-gray-700 mb-3">今日推荐</h2>
            <div className="flex gap-3">
              {todayNewChars.map(char => (
                <div key={char.id} onClick={() => navigate('/character/learn', { state: { charId: char.id } })}
                  className="flex-1 flex flex-col items-center py-3 rounded-xl cursor-pointer hover:scale-105 transition-all"
                  style={{ background: '#E8F0FE' }}>
                  <span style={{ fontSize: '40px', fontFamily: '"KaiTi",serif', color: '#5B8DEF' }}>{char.char}</span>
                  <span className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Arial' }}>{char.pinyin}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 复习 */}
        <div className="card-soft p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-700">复习</h2>
              <p className="text-xs text-gray-500">{reviewCount > 0 ? `待复习 ${reviewCount} 字` : '暂无复习任务'}</p>
            </div>
            <button onClick={() => navigate('/character/practice')}
              className="btn-child px-4 text-white text-xs" style={{ background: '#FAAD14' }}>去复习</button>
          </div>
        </div>
      </div>
    </div>
  )
}
