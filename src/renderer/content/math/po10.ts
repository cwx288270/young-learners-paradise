import type { MathData } from '../../types'

// 破十法教学
// 核心口诀：减九加一，减八加二，减七加三，减六加四，减五加五

export const PO_SHI_FA: MathData[] = [
  {
    id: 'po_intro', type: 'subtraction', title: '什么是破十法', level: 7,
    question: '破十法：当个位不够减时，从十位借1当10来减，剩下的数和个位上的数相加。',
    options: [], answer: '',
    method: '破十法',
    rhyme: '减九加一，减八加二，减七加三，减六加四，减五加五，减四加六，减三加七，减二加八',
    explanation: '十几减几，个位不够减，先用10减，再加上剩下的数。如13-5，个位3-5不够，10-5=5，5+3=8。',
  },
]

// 破十法：十几减9
for (let a = 11; a <= 18; a++) {
  const result = a - 9
  PO_SHI_FA.push({
    id: `po_${a}_9`, type: 'subtraction', title: `${a} - 9 = ?`, level: 7,
    question: `${a} - 9 = ? （用破十法）`,
    options: [String(result), String(result + 1), String(result - 1 > 0 ? result - 1 : result + 2), String(9)],
    answer: result,
    method: '破十法',
    explanation: `${a} - 9 = ? 破十法：10-9=1，1+${a - 10}=${result}（减九加一）`,
    visualType: 'blocks',
  })
}

// 破十法：十几减8
for (let a = 11; a <= 17; a++) {
  const result = a - 8
  PO_SHI_FA.push({
    id: `po_${a}_8`, type: 'subtraction', title: `${a} - 8 = ?`, level: 7,
    question: `${a} - 8 = ? （用破十法）`,
    options: [String(result), String(result + 1), String(Math.max(1, result - 1)), String(8)],
    answer: result,
    method: '破十法',
    explanation: `${a} - 8 = ? 破十法：10-8=2，2+${a - 10}=${result}（减八加二）`,
    visualType: 'blocks',
  })
}

// 破十法：十几减7
for (let a = 11; a <= 16; a++) {
  const result = a - 7
  PO_SHI_FA.push({
    id: `po_${a}_7`, type: 'subtraction', title: `${a} - 7 = ?`, level: 7,
    question: `${a} - 7 = ? （用破十法）`,
    options: [String(result), String(result + 1), String(Math.max(1, result - 1)), String(7)],
    answer: result,
    method: '破十法',
    explanation: `${a} - 7 = ? 破十法：10-7=3，3+${a - 10}=${result}（减七加三）`,
    visualType: 'blocks',
  })
}
