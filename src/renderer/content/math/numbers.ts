import type { MathData } from '../../types'

// 数字认知 1-50
export const NUMBERS: MathData[] = []

// 1-10 基础数字
for (let i = 1; i <= 10; i++) {
  NUMBERS.push({
    id: `num_${i}`,
    type: 'number',
    title: `认识数字 ${i}`,
    level: 1,
    question: `这是数字几？`,
    options: [String(i), String(i + 1 > 10 ? i : i + 1), String(Math.max(1, i - 1)), String(Math.min(10, i + 2))],
    answer: i,
    visualType: i <= 5 ? 'fingers' : 'blocks',
  })
}

// 11-20 数字
for (let i = 11; i <= 20; i++) {
  NUMBERS.push({
    id: `num_${i}`,
    type: 'number',
    title: `认识数字 ${i}`,
    level: 4,
    question: `这是数字几？`,
    options: [String(i), String(i + 1 > 20 ? i : i + 1), String(i - 1), String(i - 2)],
    answer: i,
    visualType: 'abacus',
  })
}

// 21-50 数字认知
for (let i = 21; i <= 50; i += 1) {
  NUMBERS.push({
    id: `num_${i}`,
    type: 'number',
    title: `认识数字 ${i}`,
    level: 9,
    question: `${i} 读作什么？`,
    options: [String(i), String(i + 1), String(i - 1), String(i + 2)],
    answer: i,
  })
}
