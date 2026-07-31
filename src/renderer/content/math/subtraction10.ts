import type { MathData } from '../../types'

// 10以内减法
export const SUBTRACTION_10: MathData[] = []

for (let a = 2; a <= 10; a++) {
  for (let b = 1; b <= a - 1; b++) {
    const diff = a - b
    const distractors = new Set<number>()
    distractors.add(diff + 1)
    distractors.add(Math.max(0, diff - 1))
    distractors.add(b)
    distractors.add(a)

    const opts = [diff, ...([...distractors].filter(d => d !== diff).slice(0, 3))]
    while (opts.length < 4) opts.push(diff + opts.length)

    SUBTRACTION_10.push({
      id: `sub_${a}_${b}`,
      type: 'subtraction',
      title: `${a} - ${b} = ?`,
      level: 2,
      question: `${a} 减 ${b} 等于多少？`,
      options: opts.map(String),
      answer: diff,
      visualType: 'blocks',
    })
  }
}

// 5以内减法专项
for (let a = 2; a <= 5; a++) {
  for (let b = 1; b <= a - 1; b++) {
    const diff = a - b
    SUBTRACTION_10.push({
      id: `sub5_${a}_${b}`,
      type: 'subtraction',
      title: `${a} - ${b} = ?`,
      level: 2,
      question: `${a} 减 ${b} 等于多少？`,
      options: [String(diff), String(diff + 1), String(Math.max(0, diff - 1)), String(b)],
      answer: diff,
      visualType: 'fingers',
    })
  }
}
