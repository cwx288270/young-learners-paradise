import React from 'react'
import type { ModuleInfo } from '../../types'

interface ModuleCardProps {
  module: ModuleInfo
  learnedCount?: number
  totalCount?: number
  onClick?: () => void
}

function ModuleCard({
  module,
  learnedCount = 0,
  totalCount = 0,
  onClick,
}: ModuleCardProps) {
  const percentage =
    totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0

  return (
    <button
      onClick={onClick}
      className={[
        'w-full bg-card rounded-lg shadow-sm',
        'p-6 flex flex-col items-center text-center',
        'transition-all duration-200 ease-out',
        'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        'cursor-pointer',
      ].join(' ')}
    >
      {/* 顶部大emoji图标 + 模块专属色背景圆圈 */}
      <div
        className="flex items-center justify-center rounded-full mb-4"
        style={{
          width: '96px',
          height: '96px',
          backgroundColor: module.color + '20',
        }}
      >
        <span style={{ fontSize: '64px', lineHeight: 1 }}>{module.icon}</span>
      </div>

      {/* 模块名称 */}
      <h3 className="text-lg font-semibold text-text mb-1">{module.name}</h3>

      {/* 简介 */}
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {module.description}
      </p>

      {/* 学习进度 */}
      <div className="w-full flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: module.color }}
          />
        </div>
        <span className="text-xs text-text-secondary whitespace-nowrap font-medium">
          {learnedCount}/{totalCount}
        </span>
      </div>
    </button>
  )
}

export default ModuleCard
