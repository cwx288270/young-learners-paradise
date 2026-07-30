import React from 'react'

export type ButtonColor =
  | 'primary'
  | 'success'
  | 'literacy'
  | 'pinyin'
  | 'math'
  | 'reading'
  | 'writing'
  | 'error'

export type ButtonSize = 'sm' | 'md' | 'lg'

interface BigButtonProps {
  label: string
  icon?: string
  color?: ButtonColor
  onClick?: () => void
  disabled?: boolean
  size?: ButtonSize
}

const COLOR_MAP: Record<ButtonColor, string> = {
  primary: '#5B8DEF',
  success: '#52C41A',
  literacy: '#5B8DEF',
  pinyin: '#00B894',
  math: '#E17055',
  reading: '#6C5CE7',
  writing: '#FD79A8',
  error: '#FF6B6B',
}

const SIZE_MAP: Record<
  ButtonSize,
  { minSize: string; fontSize: string; padding: string; iconSize: string; gap: string }
> = {
  sm: { minSize: '48px', fontSize: '14px', padding: '0 16px', iconSize: '20px', gap: '6px' },
  md: { minSize: '56px', fontSize: '18px', padding: '0 24px', iconSize: '28px', gap: '8px' },
  lg: { minSize: '72px', fontSize: '24px', padding: '0 32px', iconSize: '36px', gap: '12px' },
}

function BigButton({
  label,
  icon,
  color = 'primary',
  onClick,
  disabled = false,
  size = 'md',
}: BigButtonProps) {
  const bgColor = COLOR_MAP[color]
  const s = SIZE_MAP[size]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center',
        'rounded-md font-primary font-medium text-white',
        'transition-all duration-200 ease-out',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        'select-none cursor-pointer',
      ].join(' ')}
      style={{
        minHeight: s.minSize,
        minWidth: s.minSize,
        fontSize: s.fontSize,
        padding: s.padding,
        gap: s.gap,
        backgroundColor: bgColor,
      }}
    >
      {icon && (
        <span style={{ fontSize: s.iconSize, lineHeight: 1 }}>{icon}</span>
      )}
      <span>{label}</span>
    </button>
  )
}

export default BigButton
