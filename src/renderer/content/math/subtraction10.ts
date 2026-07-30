import type { MathData } from '../../types'

// 10以内减法
export const SUBTRACTION_10: MathData[] = []
for (let a = 2; a <= 10; a++) {
  for (let b = 1; b <= a - 1; b++) {
    SUBTRACTION_10.push({
      id: `sub_${a}_${b}`,
      type: 'subtraction',
      title: `${a} - ${b} = ?`,
      level: 3,
      question: `${a} 减 ${b} 等于多少？`,
      options: [String(a - b), String(a - b + 1), String(Math.max(0, a - b - 1)), String(b)],
      answer: a - b,
      visualType: 'blocks',
    })
  }
}
