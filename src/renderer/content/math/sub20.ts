import type { MathData } from '../../types'

// 20以内退位减法（破十法应用）
export const SUB_20: MathData[] = []

for (let a = 11; a <= 19; a++) {
  for (let b = 2; b <= 9; b++) {
    if (a % 10 < b) {
      // 只有个位不够减时才需要退位
      const result = a - b
      SUB_20.push({
        id: `sub20_${a}_${b}`, type: 'subtraction', title: `${a} - ${b} = ?`, level: 8,
        question: `${a} - ${b} = ?`,
        options: [String(result), String(result + 1), String(Math.max(1, result - 1)), String(b)],
        answer: result,
        method: '破十法',
        explanation: `${a} - ${b} = ? 破十法：10-${b}=${10 - b}，${10 - b}+${a - 10}=${result}`,
        visualType: 'blocks',
      })
    }
  }
}
