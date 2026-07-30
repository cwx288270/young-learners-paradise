import { useEffect, useRef } from 'react'
import { useUserStore } from '../stores/useUserStore'
import { useProgressStore } from '../stores/useProgressStore'

const SAVE_INTERVAL = 30_000 // 每30秒保存一次

export function useLearningTimer() {
  const currentChild = useUserStore(s => s.currentChild)
  const dailyStats = useProgressStore(s => s.dailyStats)
  const loadDailyStats = useProgressStore(s => s.loadDailyStats)
  const saveDailyStats = useProgressStore(s => s.saveDailyStats)
  const startTimeRef = useRef<number>(Date.now())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!currentChild) return

    startTimeRef.current = Date.now()

    // 每30秒持久化累计时长
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const currentTotal = dailyStats?.total_time ?? 0
      saveDailyStats(currentChild.id, currentTotal + elapsed)
      startTimeRef.current = Date.now()
    }, SAVE_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      // 页面退出前最后一次保存
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      if (elapsed > 0 && currentChild) {
        const currentTotal = dailyStats?.total_time ?? 0
        saveDailyStats(currentChild.id, currentTotal + elapsed)
      }
    }
  }, [currentChild?.id])

  // 每天首次加载时刷新dailyStats
  useEffect(() => {
    if (currentChild) {
      loadDailyStats(currentChild.id)
    }
  }, [currentChild?.id])
}
