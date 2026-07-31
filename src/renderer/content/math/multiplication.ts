// 乘法启蒙 — 连加概念 + 九九乘法表 + 应用题
import type { MathData } from '../../types'

export const MULTIPLICATION: MathData[] = []

// 连加转乘法概念题（手写）
const repeatedAddition: MathData[] = [
  { id: 'mul_conc_1', type: 'multiplication', title: '连加转乘法', level: 1, question: '2 + 2 + 2 = ? 也就是 3 个 2 相加', options: ['6', '5', '7', '4'], answer: 6, explanation: '3个2相加等于6，也可以写成 3 × 2 = 6' },
  { id: 'mul_conc_2', type: 'multiplication', title: '连加转乘法', level: 1, question: '3 + 3 + 3 + 3 = ? 也就是 4 个 3 相加', options: ['12', '9', '15', '10'], answer: 12, explanation: '4个3相加等于12，也就是 4 × 3 = 12' },
  { id: 'mul_conc_3', type: 'multiplication', title: '连加转乘法', level: 1, question: '5 + 5 + 5 = ? 也就是 3 个 5 相加', options: ['15', '10', '20', '12'], answer: 15, explanation: '3个5相加等于15，也就是 3 × 5 = 15' },
  { id: 'mul_conc_4', type: 'multiplication', title: '连加转乘法', level: 1, question: '4 + 4 = ? 也就是 2 个 4 相加', options: ['8', '6', '10', '7'], answer: 8, explanation: '2个4相加等于8，也就是 2 × 4 = 8' },
  { id: 'mul_conc_5', type: 'multiplication', title: '连加转乘法', level: 1, question: '6 + 6 = ? 也就是 2 个 6 相加', options: ['12', '10', '14', '8'], answer: 12, explanation: '2个6相加等于12，也就是 2 × 6 = 12' },
  { id: 'mul_conc_6', type: 'multiplication', title: '连加转乘法', level: 1, question: '2 + 2 + 2 + 2 = ? 也就是 4 个 2 相加', options: ['8', '6', '10', '7'], answer: 8, explanation: '4个2相加等于8，也就是 4 × 2 = 8' },
  { id: 'mul_conc_7', type: 'multiplication', title: '看图列式', level: 1, question: '每组有3个苹果，有4组，一共有多少个苹果？', options: ['12个', '7个', '9个', '15个'], answer: '12个', explanation: '4组 × 每组3个 = 12个苹果' },
  { id: 'mul_conc_8', type: 'multiplication', title: '看图列式', level: 1, question: '每排有5个小朋友，有3排，一共有多少个小朋友？', options: ['15个', '8个', '12个', '10个'], answer: '15个', explanation: '3排 × 每排5人 = 15个小朋友' },
  { id: 'mul_conc_9', type: 'multiplication', title: '看图列式', level: 1, question: '每盒有6支铅笔，有2盒，一共有多少支铅笔？', options: ['12支', '8支', '10支', '14支'], answer: '12支', explanation: '2盒 × 每盒6支 = 12支铅笔' },
  { id: 'mul_conc_10', type: 'multiplication', title: '看图列式', level: 1, question: '每个花瓶有4朵花，有3个花瓶，一共有多少朵花？', options: ['12朵', '7朵', '10朵', '9朵'], answer: '12朵', explanation: '3个花瓶 × 每个4朵 = 12朵花' },
]
MULTIPLICATION.push(...repeatedAddition)

// 九九乘法表 — 程序化生成（1×1 到 9×9）
for (let a = 1; a <= 9; a++) {
  for (let b = 1; b <= 9; b++) {
    const product = a * b
    const distractors = new Set<number>()
    distractors.add(product + 1)
    distractors.add(product - 1 > 0 ? product - 1 : product + 2)
    distractors.add(product + a)
    distractors.add(product + b)

    MULTIPLICATION.push({
      id: `mul_${a}_${b}`,
      type: 'multiplication',
      title: `${a} × ${b} = ?`,
      level: Math.max(a, b),
      question: `${a} 乘 ${b} 等于多少？`,
      options: [String(product), ...([...distractors].filter(d => d !== product && d > 0).slice(0, 3).map(String))],
      answer: product,
    })
  }
}

// 乘法应用题（手写）
const mulWordProblems: MathData[] = [
  { id: 'mul_wp_1', type: 'multiplication', title: '买文具', level: 2, question: '每本笔记本3元，小华买了4本，一共花了多少元？', options: ['12元', '7元', '9元', '10元'], answer: '12元', explanation: '3 × 4 = 12元' },
  { id: 'mul_wp_2', type: 'multiplication', title: '分糖果', level: 2, question: '有5个小朋友，每人分到2颗糖，一共需要多少颗糖？', options: ['10颗', '7颗', '8颗', '12颗'], answer: '10颗', explanation: '5 × 2 = 10颗' },
  { id: 'mul_wp_3', type: 'multiplication', title: '排队', level: 2, question: '同学们排队做操，每行站8人，站了3行，一共有多少人？', options: ['24人', '11人', '16人', '20人'], answer: '24人', explanation: '8 × 3 = 24人' },
  { id: 'mul_wp_4', type: 'multiplication', title: '摆花盆', level: 2, question: '教室窗台上摆了6排花盆，每排3盆，一共有多少盆花？', options: ['18盆', '9盆', '15盆', '12盆'], answer: '18盆', explanation: '6 × 3 = 18盆' },
  { id: 'mul_wp_5', type: 'multiplication', title: '数腿', level: 2, question: '一张桌子有4条腿，5张桌子一共有多少条腿？', options: ['20条', '9条', '15条', '12条'], answer: '20条', explanation: '4 × 5 = 20条' },
  { id: 'mul_wp_6', type: 'multiplication', title: '数车轮', level: 2, question: '一辆小汽车有4个轮子，7辆小汽车一共有多少个轮子？', options: ['28个', '11个', '21个', '24个'], answer: '28个', explanation: '4 × 7 = 28个' },
  { id: 'mul_wp_7', type: 'multiplication', title: '数手指', level: 2, question: '一只手有5根手指，6只手一共有多少根手指？', options: ['30根', '11根', '25根', '20根'], answer: '30根', explanation: '5 × 6 = 30根' },
  { id: 'mul_wp_8', type: 'multiplication', title: '买包子', level: 3, question: '每个包子2元，妈妈买了9个包子，一共花了多少元？', options: ['18元', '11元', '16元', '20元'], answer: '18元', explanation: '2 × 9 = 18元' },
  { id: 'mul_wp_9', type: 'multiplication', title: '数格子', level: 3, question: '田字格本每页有8行，每行有7个格子，一页有多少个格子？', options: ['56个', '15个', '48个', '42个'], answer: '56个', explanation: '8 × 7 = 56个' },
  { id: 'mul_wp_10', type: 'multiplication', title: '数鸡蛋', level: 3, question: '一个鸡蛋盒装6个鸡蛋，4盒一共有多少个鸡蛋？', options: ['24个', '10个', '18个', '20个'], answer: '24个', explanation: '6 × 4 = 24个' },
  { id: 'mul_wp_11', type: 'multiplication', title: '植树', level: 3, question: '同学们植树，每行种9棵树，种了5行，一共种了多少棵树？', options: ['45棵', '14棵', '36棵', '40棵'], answer: '45棵', explanation: '9 × 5 = 45棵' },
  { id: 'mul_wp_12', type: 'multiplication', title: '分饼干', level: 3, question: '一袋饼干有8块，3袋一共有多少块饼干？', options: ['24块', '11块', '16块', '20块'], answer: '24块', explanation: '8 × 3 = 24块' },
  { id: 'mul_wp_13', type: 'multiplication', title: '教室桌椅', level: 3, question: '教室里有4组桌椅，每组有6套，一共有多少套桌椅？', options: ['24套', '10套', '18套', '20套'], answer: '24套', explanation: '4 × 6 = 24套' },
  { id: 'mul_wp_14', type: 'multiplication', title: '买贴纸', level: 3, question: '一张贴纸7角钱，买3张需要多少钱？', options: ['21角', '10角', '14角', '17角'], answer: '21角', explanation: '7 × 3 = 21角 = 2元1角' },
  { id: 'mul_wp_15', type: 'multiplication', title: '分小组', level: 3, question: '班上有36个同学，每9人分一组，可以分成几组？', options: ['4组', '3组', '5组', '6组'], answer: '4组', explanation: '36 ÷ 9 = 4组（这是除法的初步认识）' },
]
MULTIPLICATION.push(...mulWordProblems)
