// 数学内容聚合导出
import type { MathData } from '../../types'
import { NUMBERS } from './numbers'
import { ADDITION_10 } from './addition10'
import { SUBTRACTION_10 } from './subtraction10'
import { COU_SHI_FA } from './cou10'
import { ADD_20 } from './add20'
import { PO_SHI_FA } from './po10'
import { SUB_20 } from './sub20'
import { ADD_SUB_50 } from './addSub50'
import { SHAPES } from './shapes'
import { PATTERNS } from './patterns'
import { WORD_PROBLEMS } from './wordProblems'

export { NUMBERS, ADDITION_10, SUBTRACTION_10, COU_SHI_FA, ADD_20, PO_SHI_FA, SUB_20, ADD_SUB_50, SHAPES, PATTERNS, WORD_PROBLEMS }

// 全部数学题目
export const ALL_MATH: MathData[] = [
  ...NUMBERS,
  ...ADDITION_10,
  ...SUBTRACTION_10,
  ...COU_SHI_FA.filter(m => m.options.length > 0), // 排除纯教学内容
  ...ADD_20,
  ...PO_SHI_FA.filter(m => m.options.length > 0),
  ...SUB_20,
  ...ADD_SUB_50,
  ...SHAPES,
  ...PATTERNS,
  ...WORD_PROBLEMS,
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
  { name: '10以内加法', icon: '➕', level: 1, desc: '10以内的加法运算', items: ADDITION_10 },
  { name: '10以内减法', icon: '➖', level: 2, desc: '10以内的减法运算', items: SUBTRACTION_10 },
  { name: '凑十法', icon: '🤝', level: 3, desc: '把两个数凑成10再计算', items: COU_SHI_FA.filter(m => m.options.length > 0),
    method: '凑十法', rhyme: '一九一九好朋友，二八二八手拉手，三七三七真亲密，四六四六一起走，五五凑成一双手' },
  { name: '20以内进位加法', icon: '📈', level: 4, desc: '用凑十法计算进位加法', items: ADD_20, method: '凑十法' },
  { name: '破十法', icon: '💡', level: 5, desc: '个位不够减从十位借', items: PO_SHI_FA.filter(m => m.options.length > 0),
    method: '破十法', rhyme: '减九加一，减八加二，减七加三，减六加四，减五加五' },
  { name: '20以内退位减法', icon: '📉', level: 6, desc: '用破十法计算退位减法', items: SUB_20, method: '破十法' },
  { name: '50以内加减法', icon: '🧮', level: 7, desc: '综合加减法运算', items: ADD_SUB_50 },
  { name: '图形与空间', icon: '🔷', level: 8, desc: '认识常见图形', items: SHAPES },
  { name: '规律与逻辑', icon: '🔄', level: 9, desc: '找规律，练思维', items: PATTERNS },
  { name: '生活应用题', icon: '🛒', level: 10, desc: '生活中的数学问题', items: WORD_PROBLEMS },
]

export function getMathByLevel(level: number): MathData[] {
  return ALL_MATH.filter(m => m.level <= level)
}

export function getMathByCategory(categoryName: string): MathCategory | undefined {
  return MATH_CATEGORIES.find(c => c.name === categoryName)
}
