import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../../stores/useProgressStore'
import { useAdminStore } from '../../stores/useAdminStore'
import { SHENGMU, YUNMU, ZHENGTI } from '../../content/pinyin'
import { speakText, checkChineseTTS, openTTSInstall } from '../../utils/helpers'

function TTSDebugPanel() {
  const [logs, setLogs] = useState<string[]>([])
  const [ttsStatus, setTtsStatus] = useState<{ available: boolean; reason: string } | null>(null)
  const [testing, setTesting] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const diag = (window as any).__ttsDiag as string[] | undefined
      if (diag && diag.length > 0) setLogs([...diag].reverse().slice(0, 8))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleCheckTTS = async () => {
    setTesting(true)
    try {
      const result = await checkChineseTTS()
      setTtsStatus(result)
    } catch (e: any) {
      setTtsStatus({ available: false, reason: `检查异常: ${e?.message || e}` })
    }
    setTesting(false)
  }

  const handleTestSpeak = async () => {
    setTesting(true)
    try {
      await speakText('你好小朋友', 0.8)
    } catch {}
    setTesting(false)
  }

  const handleInstall = async () => {
    await openTTSInstall()
  }

  return (
    <div className="mb-4 rounded-xl border overflow-hidden" style={{ borderColor: '#FF6B6B', backgroundColor: '#FFF5F5' }}>
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <span className="text-sm font-bold" style={{ color: '#E17055' }}>🔧 TTS 诊断面板</span>
        <span className="text-xs text-gray-400">{expanded ? '收起 ▲' : '展开 ▼'}</span>
      </button>
      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          {/* 状态检查按钮 */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleCheckTTS} disabled={testing}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border font-bold"
              style={{ borderColor: '#E17055', color: '#E17055' }}>
              {testing ? '...' : '🔍 检查中文TTS'}
            </button>
            <button onClick={handleTestSpeak} disabled={testing}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border font-bold"
              style={{ borderColor: '#0984E3', color: '#0984E3' }}>
              {testing ? '...' : '🔊 测试发音'}
            </button>
            <button onClick={handleInstall}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border font-bold"
              style={{ borderColor: '#00B894', color: '#00B894' }}>
              📦 安装TTS数据
            </button>
          </div>
          {/* 状态显示 */}
          {ttsStatus && (
            <div className={`text-xs px-3 py-1.5 rounded-lg font-mono ${ttsStatus.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {ttsStatus.available ? '✅ ' : '❌ '}{ttsStatus.reason}
            </div>
          )}
          {/* 日志 */}
          {logs.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-2 max-h-40 overflow-y-auto">
              {logs.map((line, i) => (
                <div key={i} className="text-xs text-green-400 font-mono leading-relaxed">{line}</div>
              ))}
            </div>
          )}
          {logs.length === 0 && (
            <div className="text-xs text-gray-400 text-center py-2">还没有 TTS 调用记录，点击测试按钮开始诊断</div>
          )}
        </div>
      )}
    </div>
  )
}

const LEVELS = [
  { name: '声母上', desc: 'b p m f · d t n l', items: SHENGMU.filter(p => ['b','p','m','f','d','t','n','l'].includes(p.pinyin)) },
  { name: '声母下', desc: 'g k h · j q x', items: SHENGMU.filter(p => ['g','k','h','j','q','x'].includes(p.pinyin)) },
  { name: '翘舌音', desc: 'zh ch sh r · z c s · y w', items: SHENGMU.filter(p => ['zh','ch','sh','r','z','c','s','y','w'].includes(p.pinyin)) },
  { name: '单韵母', desc: 'a o e · i u ü', items: YUNMU.filter(p => ['a','o','e','i','u','ü'].includes(p.pinyin)) },
  { name: '复韵母+鼻韵母', desc: 'ai ei ui ao ou iu ie üe er an en in un ün ang eng ing ong', items: YUNMU.filter(p => !['a','o','e','i','u','ü'].includes(p.pinyin)) },
  { name: '整体认读', desc: 'zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying', items: ZHENGTI },
]

export default function PinyinMap() {
  const navigate = useNavigate()
  const allProgress = useProgressStore(s => s.progress)
  const pinyinProgress = useMemo(() => allProgress.filter(p => p.module === 'pinyin'), [allProgress])
  const learnedIds = useMemo(() => new Set(pinyinProgress.filter(p => p.status !== 'new').map(p => p.item_id)), [pinyinProgress])
  const masteredIds = useMemo(() => new Set(pinyinProgress.filter(p => p.status === 'mastered').map(p => p.item_id)), [pinyinProgress])
  const totalLearned = learnedIds.size
  const total = SHENGMU.length + YUNMU.length + ZHENGTI.length

  const isAdmin = useAdminStore(s => s.isAdmin)

  const levels = LEVELS.map((lv, i) => {
    const learned = lv.items.filter(p => learnedIds.has(p.id)).length
    const mastered = lv.items.filter(p => masteredIds.has(p.id)).length
    const prevDone = isAdmin || i === 0 || LEVELS[i - 1].items.every(p => learnedIds.has(p.id))
    const stars = mastered === lv.items.length ? 3 : learned >= lv.items.length * 0.6 ? 2 : learned > 0 ? 1 : 0
    return { ...lv, learned, mastered, total: lv.items.length, isUnlocked: prevDone, stars }
  })

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #E8FFF8 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3 px-5 py-4 shrink-0">
        <button onClick={() => navigate('/')} className="btn-child px-3 bg-white/80 text-gray-600">←</button>
        <h1 className="text-lg font-bold" style={{ color: '#00B894' }}>🏝️ 拼音岛</h1>
        {isAdmin && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-bold animate-pulse">管理员</span>}
        <span className="ml-auto text-xs text-gray-400">已学 {totalLearned}/{total}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <div className="card-soft p-4 mb-4">
          <div className="text-sm text-gray-500 mb-1">探险进度</div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${(totalLearned/total)*100}%`, background: 'linear-gradient(90deg, #00B894, #00CEC9)' }} />
          </div>
        </div>

        {/* TTS 诊断面板（仅管理员） */}
        {isAdmin && <TTSDebugPanel />}

        <h2 className="text-sm font-bold text-gray-700 mb-3">拼音关卡</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 mb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {levels.map((lv, i) => (
            <button key={i}
              onClick={() => lv.isUnlocked && navigate('/pinyin/learn', { state: { levelIndex: i } })}
              disabled={!lv.isUnlocked}
              className="shrink-0 flex flex-col items-center rounded-2xl p-4 transition-all hover:scale-105"
              style={{
                width: '110px', scrollSnapAlign: 'start',
                background: lv.isUnlocked ? 'rgba(255,255,255,0.9)' : '#F5F5F5',
                boxShadow: lv.isUnlocked ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                border: lv.stars >= 3 ? '2px solid #FFD700' : lv.isUnlocked ? '1px solid #E8ECF1' : '1px solid #eee',
                opacity: lv.isUnlocked ? 1 : 0.45,
              }}>
              <span style={{ fontSize: '28px' }}>{lv.stars >= 3 ? '🏆' : lv.isUnlocked ? '🔤' : '🔒'}</span>
              <span className="text-xs font-bold mt-1 text-gray-700">第{i + 1}关</span>
              <span className="text-xs font-medium mt-0.5" style={{ color: '#00B894' }}>{lv.name}</span>
              {lv.isUnlocked ? (
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3].map(s => <span key={s} style={{ fontSize:'12px', opacity: lv.stars >= s ? 1 : 0.2 }}>⭐</span>)}
                </div>
              ) : (
                <span className="text-xs text-gray-400 mt-1">{lv.learned}/{lv.total}</span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => navigate('/pinyin/learn')} className="btn-child text-white font-bold py-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #00B894, #00CEC9)' }}>🔤 开始探险</button>
          <button onClick={() => navigate('/pinyin/play')} className="btn-child bg-white border font-bold py-3 rounded-xl"
            style={{ borderColor: '#00B894', color: '#00B894' }}>🎮 拼音游戏</button>
        </div>
      </div>
    </div>
  )
}
