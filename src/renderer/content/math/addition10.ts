import type { MathData } from '../../types'

// 10以内加法 — 包含所有 a+b≤10 的组合及交换律对偶
export const ADDITION_10: MathData[] = []

// 所有 a+b≤10 的组合（含a=b的情况）
for (let a = 1; a <= 9; a++) {
  for (let b = 1; b <= 10 - a; b++) {
    const sum = a + b
    // 生成更好的干扰项
    const distractors = new Set<number>()
    distractors.add(sum + 1)
    distractors.add(Math.max(1, sum - 1))
    distractors.add(a)
    distractors.add(b)
    // 确保有4个选项
    const opts = [sum, ...([...distractors].filter(d => d !== sum).slice(0, 3))]
    while (opts.length < 4) opts.push(sum + opts.length)

    ADDITION_10.push({
      id: `add_${a}_${b}`,
      type: 'addition',
      title: `${a} + ${b} = ?`,
      level: 1,
      question: `${a} 加 ${b} 等于多少？`,
      options: opts.map(String),
      answer: sum,
      visualType: 'blocks',
    })
  }
}

// 5以内加法专项（适合刚开始学加法的孩子）
for (let a = 1; a <= 4; a++) {
  for (let b = 1; b <= 5 - a; b++) {
    const sum = a + b
    ADDITION_10.push({
      id: `add5_${a}_${b}`,
      type: 'addition',
      title: `${a} + ${b} = ?`,
      level: 1,
      question: `${a} 加 ${b} 等于多少？`,
      options: [String(sum), String(sum + 1), String(Math.max(1, sum - 1)), String(a + 1)],
      answer: sum,
      visualType: 'fingers',
    })
  }
}
