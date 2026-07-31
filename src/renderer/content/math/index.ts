// 数学内容聚合导出
import type { MathData } from '../../types'
import { NUMBERS } from './numbers'
import { NUMBERS_100 } from './numbers100'
import { ADDITION_10 } from './addition10'
import { SUBTRACTION_10 } from './subtraction10'
import { COMPARISON } from './comparison'
import { DECOMPOSITION } from './decomposition'
import { COU_SHI_FA } from './cou10'
import { ADD_20 } from './add20'
import { PO_SHI_FA } from './po10'
import { SUB_20 } from './sub20'
import { ADD_SUB_50 } from './addSub50'
import { SHAPES } from './shapes'
import { PATTERNS } from './patterns'
import { WORD_PROBLEMS } from './wordProblems'
import { MULTIPLICATION } from './multiplication'
import { TIME_MONEY } from './timeMoney'
import { MEASUREMENT } from './measurement'

export {
  NUMBERS, NUMBERS_100, ADDITION_10, SUBTRACTION_10, COMPARISON,
  DECOMPOSITION, COU_SHI_FA, ADD_20, PO_SHI_FA, SUB_20, ADD_SUB_50,
  SHAPES, PATTERNS, WORD_PROBLEMS, MULTIPLICATION, TIME_MONEY, MEASUREMENT,
}

// 全部数学题目
export const ALL_MATH: MathData[] = [
  ...NUMBERS,
  ...NUMBERS_100,
  ...ADDITION_10,
  ...SUBTRACTION_10,
  ...COMPARISON,
  ...DECOMPOSITION,
  ...COU_SHI_FA.filter(m => m.options.length > 0),
  ...ADD_20,
  ...PO_SHI_FA.filter(m => m.options.length > 0),
  ...SUB_20,
  ...ADD_SUB_50,
  ...SHAPES,
  ...PATTERNS,
  ...WORD_PROBLEMS,
  ...MULTIPLICATION,
  ...TIME_MONEY,
  ...MEASUREMENT,
]

// 按教学层级分类
export interface MathCategory {
  name: string
  icon: string
  level: number
  desc: string
  items: MathData[]
  method?: string
  rhyme?: string
}

export const MATH_CATEGORIES: MathCategory[] = [
  // 基础认知
  { name: '数字认知1-10', icon: '🔢', level: 1, desc: '认识数字1到10', items: NUMBERS.filter(m => parseInt(m.id.split('_')[1]) <= 10) },
  { name: '5以内加法', icon: '➕', level: 2, desc: '5以内的加法入门', items: ADDITION_10.filter(m => m.id.startsWith('add5_')) },
  { name: '10以内加法', icon: '➕', level: 3, desc: '10以内的加法运算', items: ADDITION_10.filter(m => !m.id.startsWith('add5_')) },
  { name: '5以内减法', icon: '➖', level: 4, desc: '5以内的减法入门', items: SUBTRACTION_10.filter(m => m.id.startsWith('sub5_')) },
  { name: '10以内减法', icon: '➖', level: 5, desc: '10以内的减法运算', items: SUBTRACTION_10.filter(m => !m.id.startsWith('sub5_')) },

  // 比较与分成
  { name: '比大小', icon: '⚖️', level: 6, desc: '比较数字和算式的大小', items: COMPARISON },
  { name: '数的分成', icon: '✂️', level: 7, desc: '2-10各数的分解组合', items: DECOMPOSITION },

  // 凑十法与破十法
  { name: '凑十法', icon: '🤝', level: 8, desc: '把两个数凑成10再计算', items: COU_SHI_FA.filter(m => m.options.length > 0),
    method: '凑十法', rhyme: '一九一九好朋友，二八二八手拉手，三七三七真亲密，四六四六一起走，五五凑成一双手' },
  { name: '20以内进位加法', icon: '📈', level: 9, desc: '用凑十法计算进位加法', items: ADD_20, method: '凑十法' },
  { name: '破十法', icon: '💡', level: 10, desc: '个位不够减从十位借', items: PO_SHI_FA.filter(m => m.options.length > 0),
    method: '破十法', rhyme: '减九加一，减八加二，减七加三，减六加四，减五加五' },
  { name: '20以内退位减法', icon: '📉', level: 11, desc: '用破十法计算退位减法', items: SUB_20, method: '破十法' },

  // 大数运算
  { name: '数字认知11-50', icon: '🔢', level: 12, desc: '认识数字11到50', items: NUMBERS.filter(m => parseInt(m.id.split('_')[1]) >= 11) },
  { name: '50以内加减法', icon: '🧮', level: 13, desc: '综合加减法运算（50以内）', items: ADD_SUB_50.filter(m => m.level === 10) },
  { name: '数字认知51-100', icon: '🔢', level: 14, desc: '认识数字51到100', items: NUMBERS_100 },
  { name: '100以内加减法', icon: '🧮', level: 15, desc: '综合加减法运算（100以内）', items: ADD_SUB_50.filter(m => m.level === 12) },

  // 图形、规律、应用
  { name: '图形与空间', icon: '🔷', level: 16, desc: '认识平面和立体图形', items: SHAPES },
  { name: '规律与逻辑', icon: '🔄', level: 17, desc: '找规律，练思维', items: PATTERNS },
  { name: '生活应用题', icon: '🛒', level: 18, desc: '生活中的数学问题', items: WORD_PROBLEMS },

  // 进阶内容
  { name: '乘法启蒙', icon: '✖️', level: 19, desc: '九九乘法表和乘法概念', items: MULTIPLICATION },
  { name: '认识时间与货币', icon: '🕐', level: 20, desc: '认识钟表和人民币', items: TIME_MONEY },
  { name: '测量与比较', icon: '📏', level: 21, desc: '长度、重量、容量', items: MEASUREMENT },
]

export function getMathByLevel(level: number): MathData[] {
  return ALL_MATH.filter(m => m.level <= level)
}

export function getMathByCategory(categoryName: string): MathCategory | undefined {
  return MATH_CATEGORIES.find(c => c.name === categoryName)
}
