import { TextToSpeech } from '@capacitor-community/text-to-speech'

// TTS 诊断日志（可通过 Chrome DevTools 查看 window.__ttsDiag）
const ttsDiag: string[] = []
function ttsLog(msg: string) {
  const ts = new Date().toISOString().slice(11, 23)
  const line = `[${ts}] ${msg}`
  console.log('[TTS]', line)
  ttsDiag.push(line)
  if (ttsDiag.length > 100) ttsDiag.shift()
}
;(window as any).__ttsDiag = ttsDiag

// 艾宾浩斯复习间隔算法
// 复习间隔（毫秒）
const INTERVALS = [
  5 * 60 * 1000,       // 5分钟
  30 * 60 * 1000,      // 30分钟
  12 * 60 * 60 * 1000, // 12小时
  1 * 24 * 60 * 60 * 1000, // 1天
  2 * 24 * 60 * 60 * 1000, // 2天
  4 * 24 * 60 * 60 * 1000, // 4天
  7 * 24 * 60 * 60 * 1000, // 7天
  15 * 24 * 60 * 60 * 1000, // 15天（长期记忆）
]

export function getNextReviewDate(currentStage: number, score: number): {
  nextStage: number
  nextReviewDate: number
} {
  let nextStage = currentStage

  if (score >= 80) {
    // 进入下一阶段
    nextStage = Math.min(currentStage + 1, INTERVALS.length)
  } else if (score < 60) {
    // 回退前一阶段
    nextStage = Math.max(currentStage - 1, 0)
  }
  // score 60-79: 当前阶段重新计算

  const intervalIndex = Math.min(nextStage, INTERVALS.length - 1)
  const nextReviewDate = Date.now() + INTERVALS[intervalIndex]

  return { nextStage, nextReviewDate }
}

// 评分/评星逻辑
export function calculateStars(score: number): number {
  if (score >= 90) return 3
  if (score >= 70) return 2
  if (score >= 50) return 1
  return 0
}

export function getEncouragement(score: number): string {
  if (score >= 90) return '太棒了！你真厉害！'
  if (score >= 70) return '做得好！继续加油！'
  if (score >= 50) return '不错的进步！再练习一下吧！'
  return '没关系，我们再来一次！'
}

// Web Speech API封装

// 获取中文语音
let zhVoice: SpeechSynthesisVoice | null = null
let voicesLoaded = false

function getChineseVoice(): SpeechSynthesisVoice | null {
  if (zhVoice && voicesLoaded) return zhVoice
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) voicesLoaded = true
  // 优先 zh-CN，其次 zh，再找包含"中文"或"Chinese"的
  zhVoice = voices.find(v => v.lang === 'zh-CN')
    || voices.find(v => v.lang.startsWith('zh'))
    || voices.find(v => v.name.includes('中文') || v.name.includes('Chinese'))
    || null
  return zhVoice
}

// 确保语音列表已加载（Chrome/Android WebView 异步加载）
async function ensureVoices(): Promise<SpeechSynthesisVoice[]> {
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0 && !voicesLoaded) {
    voicesLoaded = true
  }
  if (voices.length > 0) return voices

  return new Promise(resolve => {
    let attempts = 0
    const maxAttempts = 20
    const check = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length > 0) {
        voicesLoaded = true
        ttsLog(`ensureVoices: got ${v.length} voices after ${attempts * 100}ms`)
        resolve(v)
        return
      }
      attempts++
      if (attempts >= maxAttempts) {
        voicesLoaded = true
        ttsLog(`ensureVoices: TIMEOUT after 2s, ${v.length} voices available`)
        resolve(v)
        return
      }
      setTimeout(check, 100)
    }
    window.speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true
      const v = window.speechSynthesis.getVoices()
      ttsLog(`ensureVoices: onvoiceschanged fired, ${v.length} voices`)
      resolve(v)
    }
    check()
  })
}

// 检测运行环境
function isCapacitor(): boolean {
  return typeof (window as any)?.Capacitor !== 'undefined'
}

// 检查中文 TTS 是否可用（Android 原生）
export async function checkChineseTTS(): Promise<{
  available: boolean
  reason: string
  languages?: string[]
}> {
  if (!isCapacitor()) {
    return { available: ('speechSynthesis' in window), reason: 'web fallback' }
  }
  try {
    const result = await TextToSpeech.isLanguageSupported({ lang: 'zh-CN' })
    ttsLog(`checkChineseTTS: supported=${result.supported}`)
    if (!result.supported) {
      // 获取支持的语言列表帮助诊断
      try {
        const langs = await TextToSpeech.getSupportedLanguages()
        ttsLog(`checkChineseTTS: available languages: ${JSON.stringify(langs.languages)}`)
        return {
          available: false,
          reason: `zh-CN 不支持。可用语言: ${(langs.languages || []).join(', ') || '无'}`,
          languages: langs.languages,
        }
      } catch {
        return { available: false, reason: 'zh-CN 不支持，无法获取语言列表' }
      }
    }
    return { available: true, reason: 'native TTS supports zh-CN' }
  } catch (err: any) {
    ttsLog(`checkChineseTTS: error — ${err?.message || err}`)
    return { available: false, reason: `TTS 检查失败: ${err?.message || err}` }
  }
}

// 打开 TTS 语音数据安装界面（Android）
export async function openTTSInstall(): Promise<void> {
  if (!isCapacitor()) return
  try {
    await TextToSpeech.openInstall()
    ttsLog('openTTSInstall: opened')
  } catch (err: any) {
    ttsLog(`openTTSInstall: error — ${err?.message || err}`)
  }
}

// 预热语音引擎 — 在用户首次交互时调用（Android 需要）
let speechWarmedUp = false
export async function warmUpSpeech(): Promise<void> {
  if (speechWarmedUp) return
  speechWarmedUp = true

  ttsLog(`warmUpSpeech start: isCapacitor=${isCapacitor()}, hasSpeech=${('speechSynthesis' in window)}`)

  if (isCapacitor()) {
    try {
      await TextToSpeech.speak({ text: ' ', lang: 'zh-CN', rate: 1.0, pitch: 1.0 })
      ttsLog('warmUpSpeech: native TTS OK')
    } catch (err: any) {
      ttsLog(`warmUpSpeech: native TTS FAILED — ${err?.message || err}`)
    }
    return
  }

  // Web Speech API 预热
  if (!('speechSynthesis' in window)) {
    ttsLog('warmUpSpeech: speechSynthesis not available')
    return
  }
  const utterance = new SpeechSynthesisUtterance('')
  utterance.volume = 0
  try {
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    ttsLog('warmUpSpeech: Web Speech warmup OK')
  } catch (err: any) {
    ttsLog(`warmUpSpeech: Web Speech warmup FAILED — ${err?.message || err}`)
  }
}

export async function speakText(text: string, rate = 0.8): Promise<void> {
  // 数学符号转中文读法
  const spoken = text
    .replace(/ - /g, '减')
    .replace(/ \+ /g, '加')
    .replace(/ = /g, '等于')
    .replace(/\?/g, '多少')

  ttsLog(`speakText: "${spoken.slice(0, 30)}" rate=${rate} isCapacitor=${isCapacitor()}`)

  // Android/Capacitor：使用原生 TTS（最可靠）
  if (isCapacitor()) {
    try {
      await TextToSpeech.speak({
        text: spoken,
        lang: 'zh-CN',
        rate: rate,
        pitch: 1.1,
      })
      ttsLog('speakText: native TTS OK')
      return
    } catch (err: any) {
      ttsLog(`speakText: native TTS FAILED — ${err?.message || err}`)
      console.warn('Native TTS failed, falling back to Web Speech:', err)
    }
  }

  // Web Speech API fallback
  if (!('speechSynthesis' in window)) {
    ttsLog('speakText: speechSynthesis not available, giving up')
    return
  }
  window.speechSynthesis.cancel()

  await ensureVoices()
  const voice = getChineseVoice()
  ttsLog(`speakText: Web Speech voice=${voice?.name || 'none'}, voicesLoaded=${voicesLoaded}`)

  const utterance = new SpeechSynthesisUtterance(spoken)
  utterance.lang = 'zh-CN'
  utterance.rate = rate
  utterance.pitch = 1.1
  utterance.volume = 1
  if (voice) utterance.voice = voice

  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

// 日期工具
export function formatDate(timestamp: number): string {
  const d = new Date(timestamp)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getTodayStr(): string {
  return formatDate(Date.now())
}

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
