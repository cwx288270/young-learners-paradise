import React from 'react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  rounded?: string
  className?: string
}

export default function Skeleton({
  width = '100%',
  height = 20,
  rounded = '8px',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={'animate-pulse bg-gray-200 ' + className}
      style={{
        width: typeof width === 'number' ? width + 'px' : width,
        height: typeof height === 'number' ? height + 'px' : height,
        borderRadius: rounded,
      }}
    />
  )
}

export function ModuleCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm">
      <Skeleton width={96} height={96} rounded="50%" />
      <Skeleton width={60} height={20} />
      <Skeleton width={140} height={14} />
      <Skeleton width="100%" height={8} rounded="4px" />
    </div>
  )
}

export function CharacterLearnSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 px-6">
      <Skeleton width={200} height={200} rounded="16px" />
      <Skeleton width={100} height={40} />
      <Skeleton width={250} height={60} rounded="12px" />
      <Skeleton width={180} height={56} rounded="12px" />
    </div>
  )
}
