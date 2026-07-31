import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { CHARACTERS } from '../../content/characters'
import { speakText } from '../../utils/helpers'
import type { CharacterData } from '../../types'
import PinyinText from '../../components/common/PinyinText'
import { getEvolutionNote } from '../../content/writing'

function getInitialState(stateCharId: string | undefined, learnedCount: number) {
  if (stateCharId) {
    const target = CHARACTERS.find(c => c.id === stateCharId)
    if (target) {
      const startIdx = Math.max(0, target.order - 1)
      const chars = CHARACTERS.slice(startIdx, startIdx + 3)
      const idx = chars.findIndex(c => c.id === stateCharId)
      return { chars, currentIdx: idx >= 0 ? idx : 0 }
    }
  }
  return {
    chars: CHARACTERS.slice(learnedCount, learnedCount + 3),
    currentIdx: 0,
  }
}

export default function CharacterLearn() {
  const navigate = useNavigate()
  const location = useLocation()
  const stateCharId = (location.state as any)?.charId as string | undefined
  const { currentChild } = useUserStore()
  const { getLearnedCount, saveProgress } = useProgressStore()

  const learnedCount = getLearnedCount('character')

  const init = getInitialState(stateCharId, learnedCount)
  const [learnChars] = useState<CharacterData[]>(() => init.chars)
  const [currentIndex, setCurrentIndex] = useState(() => init.currentIdx)
  const currentChar = learnChars[currentIndex]

  const playSound = useCallback(() => {
    if (currentChar) {
      speakText(currentChar.char)
    }
  }, [currentChar])

  useEffect(() => {
    playSound()
  }, [playSound, currentIndex])

  const handleLearned = async () => {
    if (!currentChar) return

    if (currentChild) {
      saveProgress({
        child_id: currentChild.id,
        module: 'character',
        item_id: currentChar.id,
        status: 'learning',
        mastery_level: 20,
        review_stage: 0,
        consecutive_correct: 0,
        next_review_date: Date.now() + 5 * 60 * 1000,
      })
    }

    if (currentIndex < learnChars.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      try { sessionStorage.setItem("char_learn", "done") } catch (e) {}
      navigate("/character/play")
    }
  }

  if (!currentChar) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">全部汉字已学完！</p>
          <button
            onClick={() => navigate('/character')}
            className="btn-child px-8 text-white"
            style={{ background: 'var(--color-literacy)' }}
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* 顶部进度 */}
      <div className="flex items-center justify-center gap-3 py-4 bg-white shadow-sm">
        {learnChars.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === currentIndex ? 24 : 10,
              height: 10,
              background:
                i === currentIndex
                  ? 'var(--color-literacy)'
                  : i < currentIndex
                    ? 'var(--color-success)'
                    : '#E8ECF1',
            }}
          />
        ))}
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto">
        <div
          className="char-display cursor-pointer"
          style={{ color: 'var(--color-text)' }}
          onClick={playSound}
        >
          {currentChar.char}
        </div>

        <div
          className="mt-4"
          style={{
            fontSize: 40,
            fontFamily: 'Arial, sans-serif',
            color: 'var(--color-text-secondary)',
          }}
        >
          {currentChar.pinyin}
        </div>

        <div
          className="mt-6 px-6 py-3 rounded-xl text-sm text-center max-w-md"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-text-secondary)' }}
        >
          {getEvolutionNote(currentChar.char)}
        </div>

        <div className="flex gap-3 mt-6 flex-wrap justify-center">
          {currentChar.words.map((w) => (
            <div
              key={w.word}
              className="flex flex-col items-center justify-center px-4 py-3 rounded-xl bg-white shadow-sm cursor-pointer"
              style={{ minWidth: 80 }}
              onClick={() => speakText(w.word)}
            >
              <PinyinText text={w.word} pinyinSize={10} charSize={22} />
            </div>
          ))}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="flex justify-center gap-4 py-4 bg-white shadow-sm">
        <button onClick={playSound} className="btn-child px-3 bg-gray-100 text-gray-600">🔊</button>
        <button onClick={handleLearned} className="btn-child px-4 text-white font-bold"
          style={{ background: 'var(--color-literacy)' }}>认识</button>
      </div>
    </div>
  )
}
