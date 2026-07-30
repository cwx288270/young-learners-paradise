import React from 'react'

interface DayData {
  label: string
  minutes: number
  score: number
}

interface LearningChartProps {
  data: DayData[]
}

export default function LearningChart({ data }: LearningChartProps) {
  const maxMinutes = Math.max(...data.map(d => d.minutes), 1)
  const chartHeight = 120
  const barWidth = Math.min(40, (600 - 60) / data.length)

  return (
    <div className="w-full">
      <svg
        width="100%"
        height={chartHeight + 30}
        viewBox={'0 0 ' + Math.max(300, data.length * 50 + 40) + ' ' + (chartHeight + 30)}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Y axis */}
        <line x1="30" y1="0" x2="30" y2={chartHeight} stroke="#E8ECF1" strokeWidth="1" />
        <line x1="30" y1={chartHeight} x2="1000" y2={chartHeight} stroke="#E8ECF1" strokeWidth="1" />

        {/* Bars and labels */}
        {data.map((day, i) => {
          const x = 40 + i * (barWidth + 10)
          const barH = (day.minutes / maxMinutes) * (chartHeight - 10)
          const y = chartHeight - barH
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barH, 2)}
                rx="4"
                fill="#5B8DEF"
                opacity="0.7"
              >
                <title>{day.minutes + '分钟'}</title>
              </rect>
              <text
                x={x + barWidth / 2}
                y={chartHeight + 14}
                textAnchor="middle"
                fontSize="10"
                fill="#9CA3AF"
              >
                {day.label}
              </text>
              {day.minutes > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#6B7280"
                >
                  {day.minutes + 'm'}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
