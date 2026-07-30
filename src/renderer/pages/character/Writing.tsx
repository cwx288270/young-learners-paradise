import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { CHARACTERS } from '../../content/characters'

// 笔顺提示
const STROKE_NOTES: Record<string, string> = {
  '一': '\u4ECE\u5DE6\u5230\u53F3\uFF0C\u4E00\u7B14\u5199\u6210',
  '二': '\u5148\u5199\u4E0A\u6A2A\uFF0C\u518D\u5199\u4E0B\u6A2A\uFF0C\u51712\u7B14',
  '三': '\u5148\u4E0A\u6A2A\uFF0C\u518D\u4E2D\u6A2A\uFF0C\u540E\u4E0B\u6A2A\uFF0C\u51713\u7B14',
  '十': '\u5148\u5199\u6A2A\uFF0C\u540E\u5199\u7AD6\uFF0C\u51712\u7B14',
  '人': '\u5148\u6487\u540E\u6377\uFF0C\u51712\u7B14',
  '大': '\u5148\u6A2A\uFF0C\u518D\u6487\uFF0C\u540E\u6377\uFF0C\u51713\u7B14',
  '小': '\u5148\u7AD6\u94A9\uFF0C\u518D\u6487\uFF0C\u540E\u70B9\uFF0C\u51713\u7B14',
  '上': '\u5148\u7AD6\uFF0C\u518D\u6A2A\uFF0C\u540E\u77ED\u6A2A\uFF0C\u51713\u7B14',
  '下': '\u5148\u6A2A\uFF0C\u518D\u7AD6\uFF0C\u540E\u70B9\uFF0C\u51713\u7B14',
  '山': '\u5148\u4E2D\u7AD6\uFF0C\u518D\u7AD6\u6298\uFF0C\u540E\u7AD6\uFF0C\u51713\u7B14',
  '水': '\u5148\u7AD6\u94A9\uFF0C\u518D\u6A2A\u6487\uFF0C\u540E\u6487\u6377\uFF0C\u51714\u7B14',
  '火': '\u5148\u70B9\uFF0C\u518D\u6487\uFF0C\u540E\u6487\u6377\uFF0C\u51714\u7B14',
  '天': '\u5148\u6A2A\uFF0C\u518D\u6A2A\uFF0C\u540E\u6487\u6377\uFF0C\u51714\u7B14',
  '日': '\u5148\u7AD6\uFF0C\u518D\u6A2A\u6298\uFF0C\u540E\u6A2A\uFF0C\u6700\u540E\u6A2A\uFF0C\u51714\u7B14',
  '月': '\u5148\u6487\uFF0C\u518D\u6A2A\u6298\u94A9\uFF0C\u540E\u6A2A\uFF0C\u6700\u540E\u6A2A\uFF0C\u51714\u7B14',
  '木': '\u5148\u6A2A\uFF0C\u518D\u7AD6\uFF0C\u540E\u6487\u6377\uFF0C\u51714\u7B14',
  '口': '\u5148\u7AD6\uFF0C\u518D\u6A2A\u6298\uFF0C\u540E\u6A2A\uFF0C\u51713\u7B14',
  '手': '\u5148\u6487\uFF0C\u518D\u6A2A\uFF0C\u540E\u6A2A\uFF0C\u6700\u540E\u7AD6\u94A9\uFF0C\u51714\u7B14',
  '目': '\u5148\u7AD6\uFF0C\u518D\u6A2A\u6298\uFF0C\u540E\u6A2A\u3001\u6A2A\u3001\u6A2A\uFF0C\u51715\u7B14',
  '田': '\u5148\u7AD6\uFF0C\u518D\u6A2A\u6298\uFF0C\u540E\u6A2A\u3001\u7AD6\u3001\u6A2A\uFF0C\u51715\u7B14',
}

function getStrokeNote(char: string): string {
  return STROKE_NOTES[char] || `${char}\uFF1A\u6309\u7B14\u987A\u4ECE\u4E0A\u5230\u4E0B\u3001\u4ECE\u5DE6\u5230\u53F3\u4E66\u5199`
}

export default function CharacterWriting() {
  const navigate = useNavigate()
  const { currentChild } = useUserStore()
  const { getLearnedCount } = useProgressStore()

  // 获取当前要写的字
  const learnedCount = getLearnedCount('character')
  const currentChar = CHARACTERS[learnedCount] || CHARACTERS[0]

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showStrokeOrder, setShowStrokeOrder] = useState(false)

  // 初始化Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#5B8DEF'
    ctxRef.current = ctx
  }, [])

  const getEventPos = (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0]
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const ctx = ctxRef.current
    if (!ctx) return
    const pos = getEventPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
  }

  const draw = (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const ctx = ctxRef.current
    if (!ctx) return
    const pos = getEventPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleDone = () => {
    sessionStorage.setItem('char_write', 'done')
    navigate('/character/test')
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* 顶部标题栏 */}
      <div className="flex items-center gap-4 px-6 py-4 bg-white shadow-sm">
        <button
          onClick={() => navigate('/character/practice')}
          className="btn-child px-4 text-gray-600 bg-gray-100"
        >
          {'\u2190'}
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-literacy)' }}>
          {'\u5199\u4E00\u5199'}
        </h1>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 字符信息 */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="char-medium"
            style={{ fontSize: 40, color: 'var(--color-literacy)' }}
          >
            {currentChar.char}
          </span>
          <span
            className="text-xl text-gray-400"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {currentChar.pinyin}
          </span>
          <span className="text-sm text-gray-400">
            {currentChar.strokeCount}{'\u7B14'}
          </span>
        </div>

        {/* 笔顺提示 */}
        {showStrokeOrder && (
          <div
            className="mb-4 px-6 py-3 rounded-xl text-sm text-center max-w-sm"
            style={{
              background: 'var(--color-primary-light)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {getStrokeNote(currentChar.char)}
          </div>
        )}

        {/* 米字格描红区域 */}
        <div className="relative" style={{ width: 200, height: 200 }}>
          {/* 米字格背景 */}
          <div className="absolute inset-0 mi-grid rounded-lg bg-white border-2 border-gray-200"></div>
          {/* 灰色参考字 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              style={{
                fontSize: 160,
                fontFamily: '"KaiTi", "STKaiti", "\u6977\u4F53", serif',
                color: '#E0E0E0',
                lineHeight: 1,
              }}
            >
              {currentChar.char}
            </span>
          </div>
          {/* 绘画Canvas */}
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="absolute inset-0 rounded-lg"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{ touchAction: 'none' }}
          />
        </div>

        <p className="text-sm text-gray-400 mt-4">
          {'\u5728\u7C73\u5B57\u683C\u4E2D\u63CF\u7EA2\u7EC3\u4E60\u5199\u5B57'}
        </p>
      </div>

      {/* 底部操作按钮 */}
      <div className="flex justify-center gap-4 py-4 bg-white shadow-sm">
        <button
          onClick={() => setShowStrokeOrder(!showStrokeOrder)}
          className="btn-child px-6 bg-gray-100 text-gray-600"
        >
          {showStrokeOrder ? '\u9690\u85CF\u7B14\u987A' : '\u770B\u7B14\u987A'}
        </button>
        <button
          onClick={clearCanvas}
          className="btn-child px-6 bg-gray-100 text-gray-600"
        >
          {'\u6E05\u9664\u91CD\u5199'}
        </button>
        <button
          onClick={handleDone}
          className="btn-child px-4 text-white font-bold"
          style={{ background: 'var(--color-literacy)' }}
        >
          {'\u5199\u597D\u4E86'}
        </button>
      </div>
    </div>
  )
}
