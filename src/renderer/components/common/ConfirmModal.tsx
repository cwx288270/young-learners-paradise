import React from 'react'
import BigButton from './BigButton'

interface ConfirmModalProps {
  title: string
  message: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = '确认',
  cancelLabel = '取消',
}: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-card rounded-xl shadow-xl p-8 max-w-md w-full mx-8 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 大文字标题 */}
        <h2 className="text-xl font-bold text-text mb-4 text-center">{title}</h2>

        {/* 说明文字 */}
        <p className="text-md text-text-secondary mb-8 text-center leading-relaxed">
          {message}
        </p>

        {/* 两个大按钮 */}
        <div className="flex gap-4">
          {/* 取消 - 描边样式 */}
          <button
            onClick={onCancel}
            className={[
              'inline-flex items-center justify-center',
              'rounded-md font-primary font-medium text-text-secondary',
              'border-2 border-border',
              'transition-all duration-200 ease-out',
              'hover:scale-105 active:scale-95 cursor-pointer',
            ].join(' ')}
            style={{
              minHeight: '56px',
              minWidth: '56px',
              padding: '0 24px',
              fontSize: '18px',
            }}
          >
            {cancelLabel}
          </button>

          {/* 确认 - 填充样式 */}
          <BigButton
            label={confirmLabel}
            color="primary"
            size="md"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
