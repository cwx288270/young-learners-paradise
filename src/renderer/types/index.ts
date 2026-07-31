// 学习模块类型
export type ModuleType = 'character' | 'pinyin' | 'math' | 'reading' | 'writing'

// 学习状态
export type LearningStatus = 'new' | 'learning' | 'practicing' | 'mastered' | 'review'

// 儿童档案
export interface ChildProfile {
  id: string
  name: string
  avatar: string
  age: number
  createdAt: number
}

// 学习进度
export interface LearningProgress {
  child_id: string
  module: ModuleType
  item_id: string
  status: LearningStatus
  first_learned: number | null
  last_reviewed: number | null
  review_count: number
  consecutive_correct: number
  mastery_level: number
  next_review_date: number | null
  review_stage: number
}

// 每日统计
export interface DailyStats {
  child_id: string
  date: string
  total_time: number
  items_learned: number
  items_reviewed: number
  avg_score: number
}

// 学习日志
export interface LearningLog {
  child_id: string
  module: ModuleType
  item_id: string
  action: 'learn' | 'practice' | 'test' | 'review'
  score: number
  timestamp: number
}

// 家长设置
export interface ParentSettings {
  password: string
  dailyLimit: number // 分钟
}

// 模块信息
export interface ModuleInfo {
  type: ModuleType
  name: string
  icon: string
  color: string
  description: string
}

// 汉字内容
export interface CharacterData {
  id: string
  char: string
  pinyin: string
  strokeCount: number
  words: { word: string; pinyin: string; meaning: string }[]
  order: number // 学习顺序
  difficulty: number // 1-5
}

// 拼音内容
export interface PinyinData {
  id: string
  pinyin: string
  type: 'shengmu' | 'yunmu' | 'zhengti'
  sound: string // 发音描述
  exampleChar: string
  examplePinyin: string
  unit: number
  moreExamples?: { char: string; pinyin: string }[]
  imageHint?: string // 图片提示
}

// 拼音音节
export interface SyllableData {
  id: string
  syllable: string
  initial: string // 声母
  final: string // 韵母
  tone: number // 声调 1-4
  exampleChar: string
  exampleWord: string
  level: number
}

// 声调练习
export interface TonePractice {
  id: string
  baseSyllable: string // 不带声调的音节
  tones: string[] // 四个声调的拼音
  examples: string[] // 四个声调的例字
}

// 数学内容
export interface MathData {
  id: string
  type: 'number' | 'counting' | 'addition' | 'subtraction' | 'shape' | 'pattern' | 'word' | 'comparison' | 'decomposition' | 'multiplication' | 'time' | 'money' | 'measurement'
  title: string
  level: number
  question: string
  options: string[]
  answer: string | number
  visualType?: 'blocks' | 'fingers' | 'abacus' | 'shapes'
  method?: string
  explanation?: string
  rhyme?: string
}

// 阅读内容
export interface ReadingData {
  id: string
  title: string
  level: number // 需要识字量级别
  content: string[]
  questions: { question: string; options: string[]; answer: number }[]
}

// 写字内容
export interface WritingData {
  char: string
  strokes: number[][] // 笔顺路径数据
  strokeOrder: string[] // 笔顺名称
}
