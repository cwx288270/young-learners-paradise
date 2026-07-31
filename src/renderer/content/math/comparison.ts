// 比大小 — 数字比较和算式比较
import type { MathData } from '../../types'

export const COMPARISON: MathData[] = []

// 10以内数字比较
for (let a = 1; a <= 9; a++) {
  for (let b = 1; b <= 9; b++) {
    if (a === b) continue
    const relation = a > b ? '>' : '<'
    COMPARISON.push({
      id: `cmp_${a}_${b}`,
      type: 'comparison',
      title: `${a} 和 ${b} 比大小`,
      level: 1,
      question: `${a} 和 ${b}，哪个大？`,
      options: [`${a}大`, `${b}大`, '一样大', relation === '>' ? `${b}大` : `${a}大`],
      answer: relation === '>' ? `${a}大` : `${b}大`,
    })
  }
}

// 10以内算式结果比较
const ops = ['+', '-'] as const
for (let a = 2; a <= 8; a++) {
  for (let b = 1; b <= 3; b++) {
    for (const op of ops) {
      const result = op === '+' ? a + b : a - b
      if (result <= 0 || result > 10) continue
      const compareVal = result + (Math.random() > 0.5 ? 1 : -1)
      if (compareVal <= 0 || compareVal > 10 || compareVal === result) continue
      const expr = `${a} ${op} ${b}`
      COMPARISON.push({
        id: `cmp_expr_${a}${op}${b}_${compareVal}`,
        type: 'comparison',
        title: `${expr} 和 ${compareVal}`,
        level: 2,
        question: `${expr} 的结果和 ${compareVal} 比，哪个大？`,
        options: [`${expr}=${result}大`, `${compareVal}大`, '一样大', '不知道'],
        answer: result > compareVal ? `${expr}=${result}大` : `${compareVal}大`,
      })
    }
  }
}

// 20以内数字比较
for (let a = 11; a <= 19; a++) {
  for (const diff of [1, 2, 3, -1, -2, -3]) {
    const b = a + diff
    if (b < 11 || b > 20) continue
    const relation = a > b ? '>' : '<'
    COMPARISON.push({
      id: `cmp20_${a}_${b}`,
      type: 'comparison',
      title: `${a} 和 ${b}`,
      level: 3,
      question: `${a} 和 ${b}，哪个更大？`,
      options: [`${a}`, `${b}`, '一样大', '不知道'],
      answer: relation === '>' ? `${a}` : `${b}`,
    })
  }
}

// 50以内数字比较（整十数）
for (let a = 10; a <= 40; a += 10) {
  for (let b = 10; b <= 50; b += 10) {
    if (a === b) continue
    const relation = a > b ? '>' : '<'
    COMPARISON.push({
      id: `cmp50_${a}_${b}`,
      type: 'comparison',
      title: `${a} 和 ${b}`,
      level: 4,
      question: `${a} 和 ${b}，哪个更大？`,
      options: [`${a}`, `${b}`, '一样大', '不知道'],
      answer: relation === '>' ? `${a}` : `${b}`,
    })
  }
}

// 算式与数字比较
for (let a = 1; a <= 5; a++) {
  for (let b = 1; b <= 5; b++) {
    const sum = a + b
    const compareNums = [sum - 1, sum + 1, sum - 2, sum + 2].filter(n => n > 0 && n <= 20)
    for (const cn of compareNums.slice(0, 2)) {
      const expr = `${a} + ${b}`
      COMPARISON.push({
        id: `cmp_expr2_${a}p${b}_${cn}`,
        type: 'comparison',
        title: `${expr} 和 ${cn}`,
        level: 5,
        question: `${expr} 的结果和 ${cn}，谁更大？`,
        options: [`${expr}=${sum}`, `${cn}`, '一样大', '算不出来'],
        answer: sum > cn ? `${expr}=${sum}` : `${cn}`,
      })
    }
  }
}
