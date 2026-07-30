import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { MODULES } from '../../content/index'
import { getTodayStr } from '../../utils/helpers'
import { useAdminStore } from '../../stores/useAdminStore'

const DAILY_LIMIT_OPTIONS = [10, 15, 20, 30]

const MODULE_COLORS: Record<string, string> = {
  pinyin: '#00B894', math: '#E17055', character: '#5B8DEF',
  reading: '#6C5CE7', writing: '#FD79A8',
}

interface DayRecord {
  label: string
  minutes: number
  score: number
}

const ParentIndex: React.FC = () => {
  const navigate = useNavigate()
  const { children, currentChild, setCurrentChild } = useUserStore()
  const {
    progress, dailyStats, loadProgress, loadDailyStats,
    consecutiveDays
  } = useProgressStore()
  const [selectedChildId, setSelectedChildId] = useState(currentChild?.id ?? '')
  const [dailyLimit, setDailyLimit] = useState(15)
  const { isAdmin, toggleAdmin } = useAdminStore()

  useEffect(() => {
    if (!selectedChildId && children.length > 0) {
      setSelectedChildId(children[0].id)
    }
  }, [children, selectedChildId])

  useEffect(() => {
    if (selectedChildId) {
      loadProgress(selectedChildId)
      loadDailyStats(selectedChildId)
    }
  }, [selectedChildId, loadProgress, loadDailyStats])

  const selectedChild = children.find(c => c.id === selectedChildId) ?? currentChild

  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId)
    const child = children.find(c => c.id === childId)
    if (child) setCurrentChild(child)
  }

  const handleExportData = () => {
    try {
      const data = localStorage.getItem('yl_progress')
      if (data) {
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `learning-data-${selectedChildId}.json`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error('导出数据失败:', err)
    }
  }

  const handleImportData = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        try {
          localStorage.setItem('yl_progress', reader.result as string)
          if (selectedChildId) loadProgress(selectedChildId)
        } catch (err) {
          console.error('导入数据失败:', err)
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  // 统计各模块进度
  const moduleStats = MODULES.map(mod => {
    const modProgress = progress.filter(p => p.module === mod.type)
    const learned = modProgress.filter(p => p.status !== 'new').length
    const mastered = modProgress.filter(p => p.status === 'mastered').length
    const total = { pinyin: 63, math: 572, character: 3000, reading: 22, writing: 100 }[mod.type] || 30
    return { ...mod, learned, mastered, total, pct: Math.round((learned / total) * 100) }
  })

  // 最近7天
  const recentDays: DayRecord[] = (() => {
    const days: DayRecord[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const label = `${d.getMonth() + 1}/${d.getDate()}`
      if (i === 0 && dailyStats) {
        days.push({
          label,
          minutes: Math.round(dailyStats.total_time / 60),
          score: dailyStats.avg_score || 0,
        })
      } else {
        days.push({ label, minutes: 0, score: 0 })
      }
    }
    return days
  })()

  const todayLearned = dailyStats?.items_learned || 0
  const todayReviewed = dailyStats?.items_reviewed || 0
  const todayMinutes = dailyStats ? Math.round(dailyStats.total_time / 60) : 0
  const totalLearnedAll = progress.filter(p => p.status !== 'new').length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-700">📊 家长中心</h1>
          {isAdmin && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-bold animate-pulse">管理员</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportData}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-xs hover:bg-gray-50">
            📤 导出
          </button>
          <button onClick={handleImportData}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-xs hover:bg-gray-50">
            📥 导入
          </button>
          <button onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: '#5B8DEF' }}>
            ← 回到学习
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full p-5 space-y-5">
        {/* 孩子选择 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">👶 选择孩子</h3>
          <div className="flex gap-3 flex-wrap">
            {children.map(child => (
              <button key={child.id}
                onClick={() => handleSelectChild(child.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
                style={{
                  backgroundColor: selectedChildId === child.id ? '#EBF0FF' : '#F5F5F5',
                  border: selectedChildId === child.id ? '2px solid #5B8DEF' : '2px solid transparent',
                }}>
                <span className="text-xl">{child.avatar}</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-700">{child.name}</div>
                  <div className="text-xs text-gray-400">{child.age}岁</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 今天概况 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">📅 今日学习概况</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '学习时长', value: `${todayMinutes}分钟`, icon: '⏱️', color: '#E17055' },
              { label: '新学项目', value: `${todayLearned}项`, icon: '🆕', color: '#00B894' },
              { label: '已复习', value: `${todayReviewed}项`, icon: '🔄', color: '#0984E3' },
              { label: '连续天数', value: `${consecutiveDays}天`, icon: '🔥', color: '#FAAD14' },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: '#F8F9FA' }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 模块进度 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">📈 各模块学习进度</h3>
          <div className="space-y-3">
            {moduleStats.map(ms => (
              <div key={ms.type} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{ms.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{ms.name}</span>
                    <span className="text-xs text-gray-400">{ms.learned}/{ms.total}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${Math.min(100, ms.pct)}%`,
                      backgroundColor: MODULE_COLORS[ms.type] || '#5B8DEF',
                    }} />
                  </div>
                </div>
                <span className="text-xs font-bold w-10 text-right" style={{ color: MODULE_COLORS[ms.type] }}>
                  {ms.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7天趋势 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">📊 最近7天</h3>
          <div className="flex items-end gap-2 h-32">
            {recentDays.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg transition-all" style={{
                  height: `${Math.max(4, (day.minutes / 30) * 100)}%`,
                  backgroundColor: day.minutes > 0 ? '#5B8DEF' : '#E8ECF1',
                  minHeight: '4px',
                }} />
                <span className="text-xs text-gray-400">{day.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>总学习: {recentDays.reduce((s, d) => s + d.minutes, 0)}分钟</span>
            <span>累计已学: {totalLearnedAll}项</span>
          </div>
        </div>

        {/* 管理员设置 — 独立醒目卡片 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 transition-all"
          style={{ borderColor: isAdmin ? '#E17055' : '#E8ECF1' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{isAdmin ? '🔓' : '🔧'}</span>
              <div>
                <h3 className="text-base font-bold" style={{ color: isAdmin ? '#E17055' : '#2D3436' }}>管理员模式</h3>
                <p className="text-xs text-gray-400">
                  {isAdmin ? '当前：管理模式已开启' : '当前：正常学习模式'}
                </p>
              </div>
            </div>
            <button onClick={toggleAdmin}
              className="relative w-14 h-8 rounded-full transition-all duration-300"
              style={{ backgroundColor: isAdmin ? '#E17055' : '#D0D0D0', boxShadow: isAdmin ? '0 0 12px rgba(225,112,85,0.4)' : 'none' }}>
              <div className="absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all duration-300"
                style={{ left: isAdmin ? '28px' : '4px' }} />
            </button>
          </div>
          <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-xl p-3">
            <div className="font-bold mb-1">开启后的效果：</div>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>所有模块的关卡全部解锁，无需逐关完成</li>
              <li>阅读和写字内容无需识字量门槛</li>
              <li>首页快速点击 ⭐ 5次也能切换</li>
              <li>关闭后恢复原始锁定状态，不丢失进度</li>
            </ul>
          </div>
        </div>

        {/* 基本设置 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">⚙️ 基本设置</h3>

          <div>
            <label className="block text-sm text-gray-600 mb-2">每日学习时长限制</label>
            <div className="flex gap-2">
              {DAILY_LIMIT_OPTIONS.map(limit => (
                <button key={limit}
                  onClick={() => setDailyLimit(limit)}
                  className="px-4 py-2 rounded-xl font-medium transition-all text-sm"
                  style={{
                    backgroundColor: dailyLimit === limit ? '#5B8DEF' : '#F5F5F5',
                    color: dailyLimit === limit ? '#fff' : '#636E72',
                  }}>
                  {limit}分钟
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentIndex
