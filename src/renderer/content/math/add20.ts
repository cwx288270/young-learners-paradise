import type { MathData } from '../../types'

// 20以内进位加法（凑十法应用）
export const ADD_20: MathData[] = []

// 9 + ? (2-9)
for (let b = 2; b <= 9; b++) {
  ADD_20.push({
    id: `add20_9_${b}`, type: 'addition', title: `9 + ${b} = ?`, level: 6,
    question: `9 + ${b} = ?`,
    options: [String(9 + b), String(9 + b - 1), String(9 + b + 1), String(b)],
    answer: 9 + b,
    method: '凑十法',
    explanation: `9 + ${b} = ? 用凑十法：${b}分成1和${b - 1}，9+1=10，10+${b - 1}=${9 + b}`,
    visualType: 'blocks',
  })
}

// 8 + ? (3-9)
for (let b = 3; b <= 9; b++) {
  ADD_20.push({
    id: `add20_8_${b}`, type: 'addition', title: `8 + ${b} = ?`, level: 6,
    question: `8 + ${b} = ?`,
    options: [String(8 + b), String(8 + b - 1), String(8 + b + 1), String(b)],
    answer: 8 + b,
    method: '凑十法',
    explanation: `8 + ${b} = ? 用凑十法：${b}分成2和${b - 2}，8+2=10，10+${b - 2}=${8 + b}`,
    visualType: 'blocks',
  })
}

// 7 + ? (4-9)
for (let b = 4; b <= 9; b++) {
  ADD_20.push({
    id: `add20_7_${b}`, type: 'addition', title: `7 + ${b} = ?`, level: 6,
    question: `7 + ${b} = ?`,
    options: [String(7 + b), String(7 + b - 1), String(7 + b + 1), String(b)],
    answer: 7 + b,
    method: '凑十法',
    explanation: `7 + ${b} = ? 用凑十法：${b}分成3和${b - 3}，7+3=10，10+${b - 3}=${7 + b}`,
    visualType: 'blocks',
  })
}

// 6 + ? (5-9)
for (let b = 5; b <= 9; b++) {
  ADD_20.push({
    id: `add20_6_${b}`, type: 'addition', title: `6 + ${b} = ?`, level: 6,
    question: `6 + ${b} = ?`,
    options: [String(6 + b), String(6 + b - 1), String(6 + b + 1), String(b)],
    answer: 6 + b,
    method: '凑十法',
    explanation: `6 + ${b} = ? 用凑十法：${b}分成4和${b - 4}，6+4=10，10+${b - 4}=${6 + b}`,
    visualType: 'blocks',
  })
}
