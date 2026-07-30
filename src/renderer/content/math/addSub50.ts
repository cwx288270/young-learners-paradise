import type { MathData } from '../../types'

// 50以内加减法
export const ADD_SUB_50: MathData[] = []

// 加法：整十数 + 整十数
for (let a = 10; a <= 40; a += 10) {
  for (let b = 10; b <= 50 - a; b += 10) {
    ADD_SUB_50.push({
      id: `add50_${a}_${b}`, type: 'addition', title: `${a} + ${b} = ?`, level: 10,
      question: `${a} + ${b} = ?`,
      options: [String(a + b), String(a + b + 10), String(a + b - 10), String(a)],
      answer: a + b,
      explanation: `${a} + ${b} = ? 先算十位：${a / 10} + ${b / 10} = ${(a + b) / 10}，所以是${a + b}`,
    })
  }
}

// 减法：整十数 - 整十数
for (let a = 20; a <= 50; a += 10) {
  for (let b = 10; b < a; b += 10) {
    ADD_SUB_50.push({
      id: `sub50_${a}_${b}`, type: 'subtraction', title: `${a} - ${b} = ?`, level: 10,
      question: `${a} - ${b} = ?`,
      options: [String(a - b), String(a - b + 10), String(Math.max(0, a - b - 10)), String(b)],
      answer: a - b,
      explanation: `${a} - ${b} = ? 先算十位：${a / 10} - ${b / 10} = ${(a - b) / 10}，所以是${a - b}`,
    })
  }
}

// 加法：两位数 + 一位数（不进位）
for (let a = 21; a <= 48; a++) {
  const ones = a % 10
  if (ones < 9) {
    const b = 1
    const result = a + b
    if (result <= 50) {
      ADD_SUB_50.push({
        id: `add50_${a}_${b}`, type: 'addition', title: `${a} + ${b} = ?`, level: 10,
        question: `${a} + ${b} = ?`,
        options: [String(result), String(result + 1), String(result - 1), String(a + 2)],
        answer: result,
        explanation: `${a} + ${b} = ? 个位：${ones}+${b}=${ones + b}，十位不变，结果是${result}`,
      })
    }
  }
}

// 减法：两位数 - 一位数（不退位）
for (let a = 22; a <= 50; a++) {
  const ones = a % 10
  if (ones >= 2) {
    for (let b = 1; b <= ones; b++) {
      ADD_SUB_50.push({
        id: `sub50_${a}_${b}`, type: 'subtraction', title: `${a} - ${b} = ?`, level: 10,
        question: `${a} - ${b} = ?`,
        options: [String(a - b), String(a - b + 1), String(Math.max(0, a - b - 1)), String(b)],
        answer: a - b,
        explanation: `${a} - ${b} = ? 个位：${ones}-${b}=${ones - b}，十位不变，结果是${a - b}`,
      })
    }
  }
}

// 加法：两位数 + 一位数（进位）
for (let a = 25; a <= 49; a++) {
  const ones = a % 10
  if (ones >= 6 && ones <= 9) {
    for (let b = 10 - ones; b <= 9 - ones + 5; b++) {
      const result = a + b
      if (result <= 50 && b >= 1 && b <= 9) {
        ADD_SUB_50.push({
          id: `add50c_${a}_${b}`, type: 'addition', title: `${a} + ${b} = ?`, level: 10,
          question: `${a} + ${b} = ?（个位相加满十要进位）`,
          options: [String(result), String(result - 1), String(result + 1), String(a + 10)],
          answer: result,
          explanation: `${a} + ${b} = ? 个位：${ones}+${b}=${ones + b}，满十进一，十位多1，结果是${result}`,
        })
      }
    }
  }
}

// 减法：两位数 - 一位数（退位）
for (let a = 21; a <= 50; a++) {
  const ones = a % 10
  if (ones < 5) {
    for (let b = ones + 1; b <= Math.min(9, ones + 3); b++) {
      ADD_SUB_50.push({
        id: `sub50t_${a}_${b}`, type: 'subtraction', title: `${a} - ${b} = ?`, level: 10,
        question: `${a} - ${b} = ?（个位不够减要退位）`,
        options: [String(a - b), String(a - b + 1), String(Math.max(0, a - b - 1)), String(b)],
        answer: a - b,
        explanation: `${a} - ${b} = ? 个位${ones}不够减${b}，从十位借1，10+${ones}=${10 + ones}，${10 + ones}-${b}=${10 + ones - b}，结果是${a - b}`,
      })
    }
  }
}
