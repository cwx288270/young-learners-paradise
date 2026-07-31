import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import { useProgressStore } from '../stores/useProgressStore'
import { useAdminStore } from '../stores/useAdminStore'
import { MODULES } from '../content/index'
import { checkForUpdate, installUpdate, type UpdateInfo } from '../utils/updater'

const MODULE_ROUTES: Record<string, string> = {
  character: "/character", pinyin: "/pinyin",
  math: "/math", reading: "/reading", writing: "/writing",
}

const ISLAND_STYLES: Record<string, { bg: string; icon: string; label: string }> = {
  pinyin: { bg: 'linear-gradient(135deg, #00B894, #00CEC9)', icon: '🏝️', label: '拼音岛' },
  math: { bg: 'linear-gradient(135deg, #E17055, #FDCB6E)', icon: '🏔️', label: '数学山' },
  character: { bg: 'linear-gradient(135deg, #5B8DEF, #74B9FF)', icon: '🌳', label: '识字森林' },
  reading: { bg: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', icon: '📚', label: '阅读谷' },
  writing: { bg: 'linear-gradient(135deg, #FD79A8, #FAB1D0)', icon: '✏️', label: '写字坊' },
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { currentChild } = useUserStore()
  const { loadProgress, loadDailyStats, dailyStats, progress, totalStars, consecutiveDays } = useProgressStore()
  const { isAdmin, toggleAdmin } = useAdminStore()
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null)
  const [updating, setUpdating] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    if (!currentChild) { navigate('/login'); return }
    loadProgress(currentChild.id)
    loadDailyStats(currentChild.id)
  }, [currentChild, navigate, loadProgress, loadDailyStats])

  useEffect(() => {
    if (!isAdmin) return
    checkForUpdate().then(info => {
      if (info.hasUpdate) setUpdateInfo(info)
    })
  }, [isAdmin])

  const handleUpdate = async () => {
    if (!updateInfo?.downloadUrl || updating) return
    setUpdating(true)
    try {
      await installUpdate(updateInfo.downloadUrl, (progress) => {
        setDownloadProgress(progress)
      })
    } catch (e: any) {
      console.error('Update failed:', e)
      setUpdating(false)
    }
  }

  const learnedCount = useMemo(() => progress.filter(p => p.status !== 'new').length, [progress])
  const totalSeconds = dailyStats?.total_time ?? 0
  const getModuleLearned = (type: string) => progress.filter(p => p.module === type && p.status !== 'new').length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'

  return (
    <div className="h-full flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #FFF5F5 50%, #F0FFF8 100%)' }}>

      {/* 管理员横幅 */}
      {isAdmin && (
        <div className="mx-5 mt-3 px-4 py-2.5 rounded-xl flex items-center justify-between shrink-0"
          style={{ background: 'linear-gradient(135deg, #E17055, #FDCB6E)', boxShadow: '0 2px 12px rgba(225,112,85,0.3)' }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔧</span>
            <div>
              <div className="text-white text-sm font-bold">管理员模式已开启</div>
              <div className="text-white/70 text-xs">所有关卡已解锁，可自由跳转</div>
            </div>
          </div>
          <button onClick={toggleAdmin}
            className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-bold hover:bg-white/30 transition-all border border-white/30">
            退出
          </button>
        </div>
      )}

      {/* 版本更新横幅 */}
      {isAdmin && updateInfo?.hasUpdate && (
        <div className="mx-5 mt-3 px-4 py-3 rounded-xl flex items-center justify-between shrink-0"
          style={{ background: 'linear-gradient(135deg, #0984E3, #74B9FF)', boxShadow: '0 2px 12px rgba(9,132,227,0.3)' }}>
          <div>
            <div className="text-white text-sm font-bold">发现新版本 {updateInfo.latestVersion}</div>
            {updating ? (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${downloadProgress}%` }} />
                </div>
                <span className="text-white/70 text-xs">{downloadProgress}%</span>
              </div>
            ) : (
              <div className="text-white/70 text-xs mt-0.5">点击更新下载最新版本</div>
            )}
          </div>
          <button onClick={handleUpdate} disabled={updating}
            className="px-4 py-1.5 rounded-lg bg-white text-blue-500 text-sm font-bold hover:bg-blue-50 transition-all disabled:opacity-50">
            {updating ? '下载中...' : '立即更新'}
          </button>
        </div>
      )}

      <div className="px-5 py-6">
        {/* 顶栏 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, #5B8DEF, #74B9FF)', boxShadow: '0 2px 8px rgba(91,141,239,0.3)' }}>
              {currentChild?.avatar || '👦'}
            </div>
            <div>
              <p className="font-bold text-base text-gray-700">{greeting}，{currentChild?.name || '小朋友'}！</p>
              <p className="text-xs text-gray-400">今天已学习 {Math.round(totalSeconds / 60)} 分钟</p>
            </div>
          </div>
        </div>

        {/* 学习岛屿 */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {MODULES.map(mod => {
            const st = ISLAND_STYLES[mod.type]
            const learned = getModuleLearned(mod.type)
            return (
              <button key={mod.type} onClick={() => navigate(MODULE_ROUTES[mod.type])}
                className="relative overflow-hidden rounded-2xl p-5 text-left transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: st.bg, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minHeight: '120px' }}>
                <div className="absolute -right-3 -bottom-3 text-6xl opacity-30">{st.icon}</div>
                <div className="relative z-10">
                  <p className="text-white text-lg font-bold">{st.label}</p>
                  <p className="text-white/80 text-sm mt-1">{mod.description}</p>
                  <div className="mt-3 inline-block bg-white/25 rounded-full px-3 py-0.5 text-white text-xs font-medium">
                    已学 {learned}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* 今日报告 */}
        <div className="card-soft p-4" style={{ background: 'rgba(255,255,255,0.9)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <span className="font-bold text-sm text-gray-700">今日学习报告</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#E8F0FE' }}>📖</span>
              <span>学了 <b style={{ color: '#5B8DEF' }}>{learnedCount}</b> 个新内容</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#FFF8E1' }}>⭐</span>
              <span>获得 <b style={{ color: '#FAAD14' }}>{totalStars}</b> 颗星星</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#E8F8F0' }}>🕐</span>
              <span>学习 <b style={{ color: '#00B894' }}>{Math.round(totalSeconds / 60)}</b> 分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#FCE4EC' }}>🔥</span>
              <span>连续 <b style={{ color: '#FD79A8' }}>{consecutiveDays}</b> 天打卡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
