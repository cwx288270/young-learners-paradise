// 数的分成 — 2-10各数的分解组合
import type { MathData } from '../../types'

export const DECOMPOSITION: MathData[] = []

// 2-10每个数的分成
for (let n = 2; n <= 10; n++) {
  for (let part = 1; part < n; part++) {
    const other = n - part
    // 只保留 part <= other 避免重复（交换律）
    if (part > other) continue

    const distractors = new Set<number>([other])
    // 添加合理干扰项
    for (const d of [other + 1, other - 1, part, n, n - part - 1]) {
      if (d > 0 && d < n && d !== other) distractors.add(d)
    }
    const distractorArr = [...distractors].slice(0, 3)
    while (distractorArr.length < 3) distractorArr.push(distractorArr[0] + 2)

    DECOMPOSITION.push({
      id: `decomp_${n}_${part}`,
      type: 'decomposition',
      title: `${n} 的分成`,
      level: Math.min(n, 8),
      question: `${n} 可以分成 ${part} 和几？`,
      options: [String(other), ...distractorArr.map(String)],
      answer: other,
      visualType: 'blocks',
    })
  }
}

// 10的组成专项练习
for (let i = 1; i <= 9; i++) {
  const j = 10 - i
  DECOMPOSITION.push({
    id: `decomp10_${i}`,
    type: 'decomposition',
    title: `10 的组成`,
    level: 8,
    question: `10 可以分成 ${i} 和几？`,
    options: [String(j), String(j + 1), String(Math.abs(j - 2)), String(i)],
    answer: j,
    visualType: 'fingers',
    rhyme: '一九一九好朋友，二八二八手拉手，三七三七真亲密，四六四六一起走，五五凑成一双手',
  })
}
