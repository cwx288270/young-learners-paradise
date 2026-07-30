import type { MathData } from '../../types'

// 凑十法教学
// 核心口诀：一九一九好朋友，二八二八手拉手，三七三七真亲密，四六四六一起走，五五凑成一双手

export const COU_SHI_FA: MathData[] = [
  {
    id: 'cou_intro', type: 'addition', title: '什么是凑十法', level: 5,
    question: '凑十法就是把一个数分成两个数，使其中一个数和另一个数凑成10，再相加。',
    options: [], answer: '',
    method: '凑十法',
    rhyme: '一九一九好朋友，二八二八手拉手，三七三七真亲密，四六四六一起走，五五凑成一双手',
    explanation: '看到9想到1，看到8想到2，看到7想到3，看到6想到4，看到5想到5。先把小数拆开，和另一个数凑成10，10再加剩下的数。',
  },
]

// 凑十法练习题：9 + ? 型
for (let b = 1; b <= 9; b++) {
  const sum = 9 + b
  COU_SHI_FA.push({
    id: `cou_9_${b}`, type: 'addition', title: `9 + ${b} = ?`, level: 5,
    question: `9 + ${b} = ? （用凑十法：把${b}分成1和${b - 1}，9+1=10，10+${b - 1}=${sum}）`,
    options: [String(sum), String(sum - 1), String(sum + 1), String(9)],
    answer: sum,
    method: '凑十法',
    explanation: `把${b}分成1和${b - 1}，9+1=10，10+${b - 1}=${sum}`,
    visualType: 'blocks',
  })
}

// 凑十法练习题：8 + ? 型
for (let b = 2; b <= 9; b++) {
  const sum = 8 + b
  COU_SHI_FA.push({
    id: `cou_8_${b}`, type: 'addition', title: `8 + ${b} = ?`, level: 5,
    question: `8 + ${b} = ? （用凑十法：把${b}分成2和${b - 2}，8+2=10，10+${b - 2}=${sum}）`,
    options: [String(sum), String(sum - 1), String(sum + 1), String(8)],
    answer: sum,
    method: '凑十法',
    explanation: `把${b}分成2和${b - 2}，8+2=10，10+${b - 2}=${sum}`,
    visualType: 'blocks',
  })
}

// 凑十法练习题：7 + ? 型
for (let b = 3; b <= 9; b++) {
  const sum = 7 + b
  COU_SHI_FA.push({
    id: `cou_7_${b}`, type: 'addition', title: `7 + ${b} = ?`, level: 5,
    question: `7 + ${b} = ? （用凑十法：把${b}分成3和${b - 3}，7+3=10，10+${b - 3}=${sum}）`,
    options: [String(sum), String(sum + 1), String(Math.max(1, sum - 1)), String(7)],
    answer: sum,
    method: '凑十法',
    explanation: `把${b}分成3和${b - 3}，7+3=10，10+${b - 3}=${sum}`,
    visualType: 'blocks',
  })
}
