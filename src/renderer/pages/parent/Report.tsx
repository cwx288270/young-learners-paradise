import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProgressStore } from '../../stores/useProgressStore'
import { useUserStore } from '../../stores/useUserStore'
import { MODULES } from '../../content/index'
import type { ModuleType, LearningProgress } from '../../types'

const Report: React.FC = () => {
  const { childId } = useParams<{ childId: string }>()
  const navigate = useNavigate()
  const { children } = useUserStore()
  const { progress, loadProgress, getModuleProgress, getLearnedCount, getMasteredCount } = useProgressStore()
  const [activeTab, setActiveTab] = useState<ModuleType>('character')

  useEffect(() => {
    if (childId) {
      loadProgress(childId)
    }
  }, [childId, loadProgress])

  const child = children.find(c => c.id === childId)
  const moduleProgress = getModuleProgress(activeTab)
  const learnedCount = getLearnedCount(activeTab)
  const masteredCount = getMasteredCount(activeTab)

  // 生成近30天学习日历
  const calendarDays = (() => {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      // 检查当天是否有学习记录
      const hasActivity = progress.some(
        (p) => p.first_learned && new Date(p.first_learned).toISOString().slice(0, 10) === dateStr
          || p.last_reviewed && new Date(p.last_reviewed).toISOString().slice(0, 10) === dateStr
      )
      days.push({
        date: d.getDate(),
        month: d.getMonth() + 1,
        hasActivity,
        isToday: i === 0,
      })
    }
    return days
  })()

  // 掌握程度分级
  const getMasteryLabel = (level: number): string => {
    if (level >= 80) return '已掌握'
    if (level >= 60) return '基本掌握'
    if (level >= 30) return '初步了解'
    return '刚接触'
  }

  const getReviewLabel = (stage: number): string => {
    if (stage >= 7) return '长期记忆'
    if (stage >= 4) return '巩固阶段'
    if (stage >= 1) return '复习阶段'
    return '待复习'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/parent')}
            className="min-h-[56px] px-4 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
          >
            ← 返回
          </button>
          <h1 className="text-lg font-bold text-gray-700">
            {child?.avatar} {child?.name} 的学习报告
          </h1>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {/* Module Tabs */}
        <div className="flex gap-2 mb-6">
          {MODULES.map((mod) => (
            <button
              key={mod.type}
              onClick={() => setActiveTab(mod.type)}
              className={`min-h-[56px] px-4 rounded-xl font-medium transition-all ${
                activeTab === mod.type
                  ? `bg-[${mod.color}] text-white shadow-md`
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
              style={activeTab === mod.type ? { backgroundColor: mod.color } : {}}
            >
              {mod.icon} {mod.name}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#5B8DEF]">{learnedCount}</p>
              <p className="text-xs text-gray-400">已学习</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00B894]">{masteredCount}</p>
              <p className="text-xs text-gray-400">已掌握</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#E17055]">{learnedCount - masteredCount}</p>
              <p className="text-xs text-gray-400">待巩固</p>
            </div>
          </div>
        </div>

        {/* Learned Items List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            {MODULES.find(m => m.type === activeTab)?.name} - 学习项目列表
          </h3>
          {moduleProgress.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">还没有开始学习这个模块哦</p>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-auto">
              {moduleProgress.map((item: LearningProgress) => (
                <div
                  key={item.item_id}
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50"
                >
                  <div>
                    <span className="text-sm text-gray-700 font-medium">{item.item_id}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      item.status === 'mastered' ? 'bg-green-100 text-green-600' :
                      item.status === 'practicing' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {getMasteryLabel(item.mastery_level)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">{getReviewLabel(item.review_stage)}</span>
                    <span className="text-xs text-gray-300 ml-2">复习{item.review_count}次</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Learning Calendar - 30 days */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">近30天学习日历</h3>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => (
              <div
                key={`${day.month}-${day.date}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm transition-all ${
                  day.hasActivity
                    ? 'bg-[#5B8DEF]/20 text-[#5B8DEF] font-bold'
                    : 'bg-gray-50 text-gray-300'
                } ${day.isToday ? 'ring-2 ring-[#5B8DEF]' : ''}`}
              >
                {day.date}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            <span className="inline-block w-3 h-3 rounded bg-[#5B8DEF]/20 mr-1" /> 有学习记录
            <span className="inline-block w-3 h-3 rounded bg-gray-50 mr-1 ml-3" /> 无记录
            <span className="inline-block w-3 h-3 rounded ring-2 ring-[#5B8DEF] mr-1 ml-3" /> 今天
          </p>
        </div>
      </div>
    </div>
  )
}

export default Report
