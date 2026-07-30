import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { CHARACTERS, getCharacterByChar } from '../../content/characters'
import { speakText } from '../../utils/helpers'
import PinyinText from '../../components/common/PinyinText'

const STROKE_NOTES: Record<string, string> = {
  '一': '从左到右，一笔写成',
  '二': '先写上横，再写下横，共2笔',
  '三': '先上横，再中横，后下横，共3笔',
  '十': '先写横，后写竖，共2笔',
  '人': '先撇后捺，共2笔',
  '大': '先横，再撇，后捺，共3笔',
  '小': '先竖钩，再撇，后点，共3笔',
  '上': '先竖，再横，后短横，共3笔',
  '下': '先横，再竖，后点，共3笔',
  '山': '先中竖，再竖折，后竖，共3笔',
  '水': '先竖钩，再横撇，后撇捺，共4笔',
  '火': '先点，再撇，后撇捺，共4笔',
  '天': '先横，再横，后撇捺，共4笔',
  '日': '先竖，再横折，后横，最后横，共4笔',
  '月': '先撇，再横折钩，后横，最后横，共4笔',
  '木': '先横，再竖，后撇捺，共4笔',
  '口': '先竖，再横折，后横，共3笔',
  '手': '先撇，再横，后横，最后竖钩，共4笔',
  '目': '先竖，再横折，后横、横、横，共5笔',
  '田': '先竖，再横折，后横、竖、横，共5笔',
}

function getStrokeNote(char: string): string {
  return STROKE_NOTES[char] || `${char}：按笔顺从上到下、从左到右书写`
}

export default function WritingDraw() {
  const navigate = useNavigate()
  const { char: charParam } = useParams()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const charData = getCharacterByChar(charParam || '人') || CHARACTERS[0]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(0)
  const [showGuide, setShowGuide] = useState(true)
  const totalStrokes = charData.strokeCount || 1

  const CANVAS_SIZE = 260
  const SCALE = 2

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = CANVAS_SIZE * SCALE
    canvas.height = CANVAS_SIZE * SCALE
    canvas.style.width = `${CANVAS_SIZE}px`
    canvas.style.height = `${CANVAS_SIZE}px`
    ctx.scale(SCALE, SCALE)

    drawBackground(ctx)
  }, [charData])

  function drawBackground(ctx: CanvasRenderingContext2D) {
    const s = CANVAS_SIZE
    ctx.clearRect(0, 0, s, s)

    // Outer border
    ctx.strokeStyle = '#E17055'
    ctx.lineWidth = 2
    ctx.strokeRect(2, 2, s - 4, s - 4)

    // Inner dashed border
    ctx.strokeStyle = '#FDCB6E'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.strokeRect(8, 8, s - 16, s - 16)
    ctx.setLineDash([])

    // Cross lines (mi-zi-ge)
    ctx.strokeStyle = '#FFE0D0'
    ctx.lineWidth = 0.5

    // Horizontal center
    ctx.beginPath(); ctx.moveTo(0, s / 2); ctx.lineTo(s, s / 2); ctx.stroke()
    // Vertical center
    ctx.beginPath(); ctx.moveTo(s / 2, 0); ctx.lineTo(s / 2, s); ctx.stroke()
    // Diagonals
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s, s); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(s, 0); ctx.lineTo(0, s); ctx.stroke()

    // Trace character (light gray reference)
    ctx.fillStyle = '#F0E0D0'
    ctx.font = `${s * 0.7}px "KaiTi", "STKaiti", "楷体", serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(charData.char, s / 2, s / 2)
  }

  function getCanvasPos(e: React.MouseEvent | React.TouchEvent): { x: number; y: number } {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * (CANVAS_SIZE / rect.width),
      y: (clientY - rect.top) * (CANVAS_SIZE / rect.height),
    }
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    setIsDrawing(true)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.save()
    const pos = getCanvasPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    ctx.strokeStyle = '#2D3436'
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getCanvasPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  function endDraw() {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.restore()
    if (currentStroke < totalStrokes - 1) {
      setCurrentStroke(s => s + 1)
    }
  }

  function handleClear() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    drawBackground(ctx)
    setCurrentStroke(0)
  }

  function handleComplete() {
    if (currentChild) {
      saveProgress({
        child_id: currentChild.id, module: 'writing', item_id: charData.id,
        status: 'practicing', mastery_level: 50, review_stage: 0,
        consecutive_correct: 1, next_review_date: Date.now() + 60 * 60 * 1000,
      })
    }
    navigate('/writing')
  }

  const strokeNote = getStrokeNote(charData.char)

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 shrink-0">
        <button onClick={() => navigate('/writing')} className="btn-child px-3 bg-white/80 text-gray-500">←</button>
        <div className="flex-1">
          <span className="text-sm font-bold" style={{ color: '#FD79A8' }}>✏️ 练字</span>
        </div>
        <button onClick={() => speakText(charData.char, 0.6)}
          className="btn-child px-2 bg-white/80 text-gray-500 text-xs">
          🔊
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
        {/* Character display */}
        <div className="text-center">
          <div style={{ fontSize: '72px', fontFamily: '"KaiTi", "STKaiti", serif', color: '#FD79A8', lineHeight: '1' }}>
            {charData.char}
          </div>
          <div className="text-sm text-gray-400 mt-1">{charData.pinyin} · {totalStrokes}画</div>
        </div>

        {/* Stroke guidance */}
        {showGuide && (
          <div className="bg-pink-50 border border-pink-200 rounded-xl px-4 py-2.5 text-center max-w-xs animate-[slide-in_0.3s_ease-out]">
            <div className="text-xs text-pink-600 font-bold mb-1">
              🖊️ 第{Math.min(currentStroke + 1, totalStrokes)}笔
            </div>
            <div className="text-xs text-pink-500">{strokeNote}</div>
          </div>
        )}

        {/* Stroke progress */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalStrokes }, (_, i) => (
            <div key={i} className="w-3 h-3 rounded-full transition-all" style={{
              backgroundColor: i < currentStroke ? '#52C41A' : i === currentStroke ? '#FD79A8' : '#E8ECF1',
              transform: i === currentStroke ? 'scale(1.2)' : 'scale(1)',
              boxShadow: i === currentStroke ? '0 0 6px rgba(253,121,168,0.4)' : 'none',
            }} />
          ))}
        </div>

        {/* Canvas */}
        <div className="rounded-2xl p-2 bg-white shadow-sm" style={{ border: '2px solid #FD79A8' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
            className="cursor-crosshair touch-none rounded-xl"
          />
        </div>

        {/* Hint */}
        <div className="text-xs text-gray-400 text-center">
          照着底部的浅色字迹描红，写完一笔自动换下一笔
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-all">
            {showGuide ? '🙈 隐藏引导' : '👁️ 显示引导'}
          </button>
          <button onClick={handleClear}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-all">
            🗑️ 清除重写
          </button>
          <button onClick={handleComplete}
            className="px-4 py-2 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #FD79A8, #FAB1D0)', boxShadow: '0 4px 12px rgba(253,121,168,0.3)' }}>
            ✅ 写好了
          </button>
        </div>
      </div>
    </div>
  )
}
