import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { ALL_PINYIN, SYLLABLES } from '../../content/pinyin'
import { speakText } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'
import type { PinyinData, SyllableData } from '../../types'

type Phase = 'recognize' | 'repeat' | 'spell'

const PHASE_CONFIG: Record<Phase, { label: string; icon: string; color: string }> = {
  recognize: { label: '认识发音', icon: '👀', color: '#00B894' },
  repeat: { label: '跟读模仿', icon: '🎤', color: '#00CEC9' },
  spell: { label: '拼读尝试', icon: '🧩', color: '#0984E3' },
}

function findSyllableForPinyin(p: PinyinData): SyllableData | null {
  if (p.type === 'shengmu') {
    const syl = SYLLABLES.find(s => s.initial === p.pinyin)
    return syl || null
  }
  if (p.type === 'yunmu') {
    const final = p.pinyin.replace('ü', 'v')
    const syl = SYLLABLES.find(s => s.final === p.pinyin || s.final === final)
    return syl || null
  }
  const syl = SYLLABLES.find(s => s.syllable === p.pinyin)
  return syl || null
}

function getUnitItems(pinyinId?: string): { list: PinyinData[]; startIdx: number } {
  if (pinyinId) {
    const target = ALL_PINYIN.find(p => p.id === pinyinId)
    if (target) {
      const list = ALL_PINYIN.filter(p => p.unit === target.unit && p.type === target.type)
      const startIdx = list.findIndex(p => p.id === pinyinId)
      return { list, startIdx: Math.max(0, startIdx) }
    }
  }
  return { list: ALL_PINYIN.filter(p => p.unit === 1 && p.type === 'shengmu'), startIdx: 0 }
}

export default function PinyinLearn() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const statePinyinId = (location.state as any)?.pinyinId as string | undefined
  const { list: pinyinList, startIdx } = useMemo(() => getUnitItems(statePinyinId), [statePinyinId])

  const [currentIdx, setCurrentIdx] = useState(startIdx)
  const [phase, setPhase] = useState<Phase>('recognize')
  const [showSyllable, setShowSyllable] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const current = pinyinList[currentIdx]
  const syllable = useMemo(() => current ? findSyllableForPinyin(current) : null, [current])
  const typeLabel = current?.type === 'shengmu' ? '声母' : current?.type === 'yunmu' ? '韵母' : '整体认读音节'
  const totalItems = pinyinList.length
  const phaseCfg = PHASE_CONFIG[phase]

  useEffect(() => {
    if (!current) return
    if (phase === 'recognize') {
      speakText(current.sound, 0.6)
    } else if (phase === 'repeat') {
      setTimeout(() => speakText(current.sound, 0.6), 400)
    } else if (phase === 'spell' && syllable) {
      setTimeout(() => {
        setShowSyllable(true)
        speakText(syllable.exampleWord, 0.7)
      }, 500)
    }
  }, [current, phase, animKey])

  useEffect(() => {
    setPhase('recognize')
    setShowSyllable(false)
    setAnimKey(k => k + 1)
  }, [currentIdx])

  const handleRecognized = () => {
    if (currentChild) {
      saveProgress({
        child_id: currentChild.id, module: 'pinyin', item_id: current.id,
        status: 'learning', mastery_level: 15, review_stage: 0,
        consecutive_correct: 0, next_review_date: Date.now() + 5 * 60 * 1000,
      })
    }
    setPhase('repeat')
  }

  const handleRepeated = () => {
    if (currentChild) {
      saveProgress({
        child_id: currentChild.id, module: 'pinyin', item_id: current.id,
        status: 'learning', mastery_level: 30, review_stage: 0,
        consecutive_correct: 1, next_review_date: Date.now() + 30 * 60 * 1000,
      })
    }
    setPhase('spell')
  }

  const handleNext = () => {
    if (currentChild) {
      saveProgress({
        child_id: currentChild.id, module: 'pinyin', item_id: current.id,
        status: 'practicing', mastery_level: 40, review_stage: 1,
        consecutive_correct: 0, next_review_date: Date.now() + 60 * 60 * 1000,
      })
    }
    if (currentIdx < totalItems - 1) {
      setCurrentIdx(currentIdx + 1)
    } else {
      navigate('/pinyin')
    }
  }

  if (!current) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-gray-400 text-lg">暂无学习内容</div>
        <button onClick={() => navigate('/pinyin')} className="btn-child px-4 bg-white border text-gray-500">返回</button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #E8FFF8 0%, #FFFFFF 100%)' }}>
      {/* 顶部导航 */}
      <div className="flex items-center gap-3 px-5 py-3 shrink-0">
        <button onClick={() => navigate('/pinyin')} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: phaseCfg.color }}>
              {phaseCfg.icon} {phaseCfg.label}
            </span>
            <span className="text-xs text-gray-400">{typeLabel} · 第{current.unit}单元</span>
          </div>
        </div>
        <span className="text-xs text-gray-400">{currentIdx + 1}/{totalItems}</span>
      </div>

      {/* 进度条 */}
      <div className="px-5 mb-2">
        <div className="flex gap-1.5 justify-center">
          {pinyinList.slice(0, Math.min(totalItems, 12)).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all" style={{
              backgroundColor: i === currentIdx ? phaseCfg.color : i < currentIdx ? '#52C41A' : '#E8ECF1',
              transform: i === currentIdx ? 'scale(1.3)' : 'scale(1)',
            }} />
          ))}
        </div>
      </div>

      {/* 三阶段指示器 */}
      <div className="flex justify-center gap-2 px-5 mb-6">
        {(['recognize', 'repeat', 'spell'] as Phase[]).map((p, i) => {
          const cfg = PHASE_CONFIG[p]
          const isActive = phase === p
          const isDone = (phase === 'repeat' && i === 0) || (phase === 'spell' && i <= 1)
          return (
            <div key={p} className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  backgroundColor: isActive ? cfg.color : isDone ? '#52C41A' : '#F0F0F0',
                  color: isActive || isDone ? '#fff' : '#B2BEC3',
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                }}>
                {isDone ? '✓' : i + 1}
              </div>
              {i < 2 && <div className="w-6 h-0.5 rounded" style={{ backgroundColor: isDone ? '#52C41A' : '#E8ECF1' }} />}
            </div>
          )
        })}
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6" key={animKey}>
        {/* Phase 1: 认识发音 */}
        {phase === 'recognize' && (
          <div className="flex flex-col items-center animate-[slide-in_0.4s_ease-out]">
            <div className="text-sm text-gray-400 mb-2">看一看，听一听</div>
            <button
              onClick={() => speakText(current.sound, 0.6)}
              className="mb-4 rounded-3xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              style={{
                width: '140px', height: '140px',
                background: 'linear-gradient(135deg, #E8FFF8, #DFFFD6)',
                border: '3px solid #00B894',
                boxShadow: '0 8px 32px rgba(0,184,148,0.15)',
              }}>
              <span style={{ fontSize: '64px', fontFamily: 'Arial, sans-serif', color: '#00B894', fontWeight: 'bold' }}>
                {current.pinyin}
              </span>
            </button>
            <div className="text-xl font-bold text-gray-700 mb-1">读作 "{current.sound}"</div>
            <div className="flex items-center gap-3 mt-3 mb-6">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                <span className="text-xs text-gray-400">例字</span>
                <div className="text-center">
                  <span style={{ fontSize: '36px', fontFamily: '"KaiTi", serif' }}>{current.exampleChar}</span>
                </div>
                <div className="text-xs text-gray-400 font-mono">{current.examplePinyin}</div>
              </div>
              {current.moreExamples?.map((ex, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                  <div className="text-center">
                    <span style={{ fontSize: '36px', fontFamily: '"KaiTi", serif' }}>{ex.char}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono text-center">{ex.pinyin}</div>
                </div>
              ))}
            </div>
            <button
              onClick={handleRecognized}
              className="px-8 py-3 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #00B894, #00CEC9)', boxShadow: '0 4px 16px rgba(0,184,148,0.3)' }}>
              👍 我听懂了
            </button>
          </div>
        )}

        {/* Phase 2: 跟读模仿 */}
        {phase === 'repeat' && (
          <div className="flex flex-col items-center animate-[slide-in_0.4s_ease-out]">
            <div className="text-sm text-gray-400 mb-3">跟着读一读</div>
            <button
              onClick={() => speakText(current.sound, 0.6)}
              className="mb-6 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              style={{
                width: '120px', height: '120px',
                background: 'linear-gradient(135deg, #E0F7FA, #E0F2F1)',
                border: '3px solid #00CEC9',
                boxShadow: '0 8px 32px rgba(0,206,201,0.15)',
              }}>
              <span style={{ fontSize: '48px' }}>🎤</span>
            </button>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold mb-2" style={{ color: '#00B894' }}>
                {current.pinyin}
              </div>
              <div className="text-lg text-gray-600">读作 "{current.sound}"</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-3 mb-6 text-center">
              <div className="text-sm text-yellow-700">
                小朋友，大声跟着读出来吧！
              </div>
              <div className="text-xs text-yellow-500 mt-1">点击 🎤 可以再听一遍</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => speakText(current.sound, 0.5)}
                className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
                🔊 再听一次
              </button>
              <button
                onClick={handleRepeated}
                className="px-8 py-2.5 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #00CEC9, #0984E3)', boxShadow: '0 4px 16px rgba(0,206,201,0.3)' }}>
                ✅ 我读完了
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: 拼读尝试 */}
        {phase === 'spell' && (
          <div className="flex flex-col items-center animate-[slide-in_0.4s_ease-out]">
            <div className="text-sm text-gray-400 mb-3">拼一拼，读一读</div>
            {syllable && showSyllable ? (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border-2 text-center"
                    style={{ borderColor: '#00B894' }}>
                    <div className="text-xs text-gray-400 mb-1">{current.type === 'shengmu' ? '声母' : '韵母'}</div>
                    <span style={{ fontSize: '40px', fontFamily: 'Arial', color: '#00B894', fontWeight: 'bold' }}>
                      {current.pinyin}
                    </span>
                  </div>
                  <span className="text-2xl text-gray-300">+</span>
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border-2 text-center"
                    style={{ borderColor: '#00CEC9' }}>
                    <div className="text-xs text-gray-400 mb-1">{current.type === 'shengmu' ? '韵母' : '声母'}</div>
                    <span style={{ fontSize: '40px', fontFamily: 'Arial', color: '#00CEC9', fontWeight: 'bold' }}>
                      {current.type === 'shengmu' ? syllable.final : syllable.initial}
                    </span>
                  </div>
                  <span className="text-2xl text-gray-300">=</span>
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border-2 text-center"
                    style={{ borderColor: '#0984E3' }}>
                    <div className="text-xs text-gray-400 mb-1">读音</div>
                    <span style={{ fontSize: '40px', fontFamily: 'Arial', color: '#0984E3', fontWeight: 'bold' }}>
                      {syllable.syllable}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => speakText(syllable.exampleWord, 0.7)}
                  className="mb-4 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 transition-all">
                  🔊 {syllable.exampleChar}（{syllable.exampleWord}）
                </button>
                <div className="text-sm text-gray-500 mb-6">
                  前音轻短后音重，两音相连猛一碰！
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center mb-6">
                <div className="text-4xl mb-3">🔤</div>
                <div className="text-gray-500 text-lg mb-2">
                  {current.type === 'zhengti' ? `"${current.pinyin}" 是整体认读音节` : `"${current.pinyin}" 可以和其他拼音组合`}
                </div>
                <div className="text-sm text-gray-400">直接读出来，不用拼！</div>
              </div>
            )}
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #0984E3, #74B9FF)', boxShadow: '0 4px 16px rgba(9,132,227,0.3)' }}>
              {currentIdx < totalItems - 1 ? '➡️ 下一个' : '🎉 完成学习'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
