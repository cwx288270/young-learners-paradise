import React, { useRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { CHARACTERS, getCharacterByChar } from '../../content/characters'
import PinyinText from '../../components/common/PinyinText'

export default function WritingPractice() {
  const navigate = useNavigate()
  const { char: charParam } = useParams()
  const currentChild = useUserStore(s => s.currentChild)
  const saveProgress = useProgressStore(s => s.saveProgress)

  const charData = getCharacterByChar(charParam || '人') || CHARACTERS[0]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // 初始化Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置Canvas尺寸
    const size = 200
    canvas.width = size * 2  // 2x for retina
    canvas.height = size * 2
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(2, 2)

    // 绘制米字格背景
    drawGrid(ctx, size)
    // 绘制描红字
    drawTraceChar(ctx, charData.char, size)
  }, [charData])

  function drawGrid(ctx: CanvasRenderingContext2D, size: number) {
    ctx.clearRect(0, 0, size, size)

    // 外框
    ctx.strokeStyle = '#E8ECF1'
    ctx.lineWidth = 1

    // 横中线
    ctx.beginPath()
    ctx.moveTo(0, size / 2)
    ctx.lineTo(size, size / 2)
    ctx.stroke()

    // 竖中线
    ctx.beginPath()
    ctx.moveTo(size / 2, 0)
    ctx.lineTo(size / 2, size)
    ctx.stroke()

    // 对角线
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(size, size)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(size, 0)
    ctx.lineTo(0, size)
    ctx.stroke()
  }

  function drawTraceChar(ctx: CanvasRenderingContext2D, char: string, size: number) {
    // 描红字：浅灰色大字作为参考
    ctx.fillStyle = '#E0E0E0'
    ctx.font = `${size * 0.8}px KaiTi, STKaiti, 楷体, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(char, size / 2, size / 2)
  }

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    setIsDrawing(true)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x * 2, pos.y * 2) // retina scaling
    ctx.strokeStyle = '#2D3436'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e)
    ctx.lineTo(pos.x * 2, pos.y * 2)
    ctx.stroke()
  }

  function endDraw() {
    setIsDrawing(false)
  }

  function handleClear() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const size = 200
    ctx.setTransform(2, 0, 0, 2, 0, 0) // reset transform
    drawGrid(ctx, size)
    drawTraceChar(ctx, charData.char, size)
  }

  function handleComplete() {
    if (currentChild) {
      saveProgress({
        child_id: currentChild.id,
        module: 'writing',
        item_id: charData.id,
        status: 'practicing',
        mastery_level: 40,
        review_stage: 0,
        consecutive_correct: 0,
        next_review_date: Date.now() + 30 * 60 * 1000,
      })
    }
    navigate('/writing')
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      {/* 目标字信息 */}
      <div className="text-center mb-3">
        <div className="text-lg mb-1" style={{ color: '#FD79A8' }}>✏️ 练习写</div>
        <PinyinText text={charData.char} pinyinSize={14} charSize={60} />
      </div>
      <div className="text-sm text-text-secondary mb-2">
        笔画数: {charData.strokeCount} · 拼音: {charData.pinyin}
      </div>

      {/* 参考大字 */}
      <div className="mb-4">
        <PinyinText text={charData.char} pinyinSize={14} charSize={80} />
      </div>

      {/* Canvas描红区 */}
      <div className="border-2 border-border rounded-lg p-2 mb-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
          className="cursor-crosshair touch-none"
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button onClick={handleClear} className="btn-child px-3 bg-white border [border-color:#E8ECF1] [color:#636E72]">🗑 清除</button>
        <button onClick={handleComplete} className="btn-child px-4 text-white" style={{ backgroundColor: '#FD79A8' }}>完成</button>
      </div>
    </div>
  )
}
