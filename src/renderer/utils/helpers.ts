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

function getChineseVoice(): SpeechSynthesisVoice | null {
  if (zhVoice) return zhVoice
  const voices = window.speechSynthesis.getVoices()
  // 优先 zh-CN，其次 zh，再找包含"中文"或"Chinese"的
  zhVoice = voices.find(v => v.lang === 'zh-CN')
    || voices.find(v => v.lang.startsWith('zh'))
    || voices.find(v => v.name.includes('中文') || v.name.includes('Chinese'))
    || null
  return zhVoice
}

// 确保语音列表已加载（Chrome 异步加载）
function ensureVoices(): Promise<SpeechSynthesisVoice[]> {
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) return Promise.resolve(voices)
  return new Promise(resolve => {
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices())
    }
  })
}

export async function speakText(text: string, rate = 0.8): Promise<void> {
  if (!('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()

  // 数学符号转中文读法
  const spoken = text
    .replace(/ - /g, '减')
    .replace(/ \+ /g, '加')
    .replace(/ = /g, '等于')
    .replace(/\?/g, '多少')

  await ensureVoices()
  const voice = getChineseVoice()

  const utterance = new SpeechSynthesisUtterance(spoken)
  utterance.lang = 'zh-CN'
  utterance.rate = rate
  utterance.pitch = 1.1
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
