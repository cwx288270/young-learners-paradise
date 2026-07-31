import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MODULES } from '../../content'
import ErrorBoundary from '../common/ErrorBoundary'
import { useLearningTimer } from '../../hooks/useLearningTimer'
import { useProgressStore } from '../../stores/useProgressStore'
import { useUserStore } from '../../stores/useUserStore'
import { useAdminStore } from '../../stores/useAdminStore'
import { warmUpSpeech } from '../../utils/helpers'
import type { ModuleType } from '../../types'

const MODULE_ROUTES: Record<ModuleType, string> = {
  pinyin: '/pinyin',
  math: '/math',
  character: '/character',
  reading: '/reading',
  writing: '/writing',
}

function AppShell() {
  useLearningTimer()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentChild } = useUserStore()
  const { totalStars, consecutiveDays } = useProgressStore()
  const { isAdmin, toggleAdmin } = useAdminStore()

  const activeModule = MODULES.find(m => location.pathname.startsWith(`/${m.type}`))

  // 预热语音引擎（Android 需要用户手势后语音才可用）
  useEffect(() => {
    const warmup = () => { warmUpSpeech(); document.removeEventListener('click', warmup) }
    document.addEventListener('click', warmup)
    return () => document.removeEventListener('click', warmup)
  }, [])

  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* 极简顶栏 — 安全区域适配 */}
      <div className="app-header flex items-center justify-between px-4 shrink-0"
        style={{ minHeight: '44px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <span className="text-sm font-semibold text-gray-700">幼小衔接学习乐园</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleAdmin}
            className="text-xs px-2 py-1 rounded font-bold transition-all"
            style={{
              backgroundColor: isAdmin ? '#E17055' : '#E8ECF1',
              color: isAdmin ? '#fff' : '#636E72',
            }}>
            {isAdmin ? '用户' : '管理'}
          </button>
          <span className="text-xs font-bold" style={{ color: '#FAAD14' }}>⭐ {totalStars}</span>
          <span className="text-xs text-gray-400">🔥 {consecutiveDays}天</span>
          <button onClick={() => navigate('/parent/unlock')}
            className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-0.5">🔒 家长</button>
        </div>
      </div>

      {/* 主内容 */}
      <div className="flex-1 overflow-hidden">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>

      {/* 底部导航 — 安全区域适配 */}
      <div className="app-bottom-nav flex items-center justify-around px-2 py-1.5 shrink-0"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        {MODULES.map(module => {
          const isActive = activeModule?.type === module.type
          return (
            <button key={module.type} onClick={() => navigate(MODULE_ROUTES[module.type])}
              className="flex flex-col items-center gap-0.5 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ minWidth: '52px' }}>
              <div className="flex items-center justify-center rounded-full transition-all"
                style={{ width: '38px', height: '38px', backgroundColor: isActive ? module.color : module.color + '15' }}>
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{module.icon}</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: isActive ? 700 : 400, color: isActive ? module.color : '#636E72' }}>
                {module.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AppShell
