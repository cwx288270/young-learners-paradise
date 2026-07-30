import type { MathData } from '../../types'

// 10以内加法
export const ADDITION_10: MathData[] = []
for (let a = 1; a <= 9; a++) {
  for (let b = 1; b <= 9 - a; b++) {
    ADDITION_10.push({
      id: `add_${a}_${b}`,
      type: 'addition',
      title: `${a} + ${b} = ?`,
      level: 2,
      question: `${a} 加 ${b} 等于多少？`,
      options: [String(a + b), String(a + b + 1), String(Math.max(1, a + b - 1)), String(a)],
      answer: a + b,
      visualType: 'blocks',
    })
  }
}
