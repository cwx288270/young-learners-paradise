// 数字认知 51-100
import type { MathData } from '../../types'

export const NUMBERS_100: MathData[] = []

// 51-100 数字识别
for (let n = 51; n <= 100; n++) {
  const tens = Math.floor(n / 10)
  const ones = n % 10

  // 生成干扰项（+-1, +-2, 交换十位个位）
  const distractors = new Set<number>()
  distractors.add(n + 1 > 100 ? n - 3 : n + 1)
  distractors.add(n - 1 < 51 ? n + 3 : n - 1)
  distractors.add(n + 2 > 100 ? n - 4 : n + 2)
  distractors.add(ones * 10 + tens) // 交换十位个位

  const opts = [...new Set([n, ...distractors])].slice(0, 4)

  NUMBERS_100.push({
    id: `num_${n}`,
    type: 'number',
    title: `认识数字 ${n}`,
    level: 11,
    question: `这是数字几？`,
    options: opts.map(String),
    answer: n,
    visualType: tens >= 8 ? 'abacus' : 'blocks',
  })
}

// 整十数认知强化
for (let n = 60; n <= 100; n += 10) {
  NUMBERS_100.push({
    id: `num_tens_${n}`,
    type: 'number',
    title: `整十数 ${n}`,
    level: 11,
    question: `${n} 是由几个十组成的？`,
    options: [`${n / 10}个十`, `${n / 10 - 1}个十`, `${n / 10 + 1}个十`, `${n}个一`],
    answer: `${n / 10}个十`,
    explanation: `${n} = ${n / 10} × 10，所以是 ${n / 10} 个十`,
  })
}
