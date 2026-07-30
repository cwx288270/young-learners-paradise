import React, { useEffect, useState } from 'react'

interface ProgressRingProps {
  percentage: number
  size?: number
  color?: string
  strokeWidth?: number
}

function ProgressRing({
  percentage,
  size = 120,
  color = '#5B8DEF',
  strokeWidth = 8,
}: ProgressRingProps) {
  const [animated, setAnimated] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(percentage), 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8ECF1"
          strokeWidth={strokeWidth}
        />
        {/* 进度圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      {/* 中央百分比文字 */}
      <span
        className="absolute font-semibold text-text"
        style={{ fontSize: size * 0.22 }}
      >
        {Math.round(percentage)}%
      </span>
    </div>
  )
}

export default ProgressRing
