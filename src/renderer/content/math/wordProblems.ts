import type { MathData } from '../../types'

// 生活应用题 — 标题不含答案，答案通过 explanation 在答错后展示
export const WORD_PROBLEMS: MathData[] = [
  // 10以内加法应用题
  { id: 'wp_add1', type: 'word', title: '分苹果', level: 2, question: '小明有3个苹果，妈妈又给了他2个，小明一共有几个苹果？', options: ['4个', '5个', '6个', '3个'], answer: '5个', explanation: '3 + 2 = 5，小明一共有5个苹果' },
  { id: 'wp_add2', type: 'word', title: '数小鸟', level: 2, question: '树上有4只小鸟，又飞来3只，现在树上有几只小鸟？', options: ['5只', '6只', '7只', '8只'], answer: '7只', explanation: '4 + 3 = 7，现在有7只小鸟' },
  { id: 'wp_add3', type: 'word', title: '铅笔', level: 2, question: '小花有5支铅笔，小红也有5支，她们一共有几支铅笔？', options: ['8支', '9支', '10支', '12支'], answer: '10支', explanation: '5 + 5 = 10，一共有10支铅笔' },
  { id: 'wp_add4', type: 'word', title: '金鱼', level: 2, question: '鱼缸里有2条金鱼，爸爸又买了6条，鱼缸里现在有几条？', options: ['7条', '8条', '9条', '6条'], answer: '8条', explanation: '2 + 6 = 8，现在有8条金鱼' },
  { id: 'wp_add5', type: 'word', title: '花朵', level: 2, question: '院子里有7朵花，又开了1朵，现在一共有几朵花？', options: ['7朵', '8朵', '9朵', '6朵'], answer: '8朵', explanation: '7 + 1 = 8，一共有8朵花' },

  // 10以内减法应用题
  { id: 'wp_sub1', type: 'word', title: '饼干', level: 3, question: '桌子上有8块饼干，小明吃了3块，还剩几块？', options: ['4块', '5块', '6块', '3块'], answer: '5块', explanation: '8 - 3 = 5，还剩5块饼干' },
  { id: 'wp_sub2', type: 'word', title: '蝴蝶', level: 3, question: '花园里有10只蝴蝶，飞走了4只，还剩几只？', options: ['5只', '6只', '7只', '4只'], answer: '6只', explanation: '10 - 4 = 6，还剩6只蝴蝶' },
  { id: 'wp_sub3', type: 'word', title: '糖果', level: 3, question: '小华有6颗糖，送给弟弟2颗，小华还有几颗？', options: ['3颗', '4颗', '5颗', '2颗'], answer: '4颗', explanation: '6 - 2 = 4，小华还有4颗糖' },
  { id: 'wp_sub4', type: 'word', title: '书本', level: 3, question: '书架上有9本书，借出去5本，书架上还剩几本？', options: ['3本', '4本', '5本', '6本'], answer: '4本', explanation: '9 - 5 = 4，还剩4本书' },
  { id: 'wp_sub5', type: 'word', title: '鸡蛋', level: 3, question: '篮子里有7个鸡蛋，做饭用了3个，还剩几个？', options: ['3个', '4个', '5个', '2个'], answer: '4个', explanation: '7 - 3 = 4，还剩4个鸡蛋' },

  // 20以内应用题
  { id: 'wp_add6', type: 'word', title: '跳绳', level: 5, question: '操场上有9个小朋友在跳绳，又来了3个小朋友，现在一共有几个小朋友？', options: ['11个', '12个', '13个', '10个'], answer: '12个', explanation: '9 + 3 = 12，现在有12个小朋友' },
  { id: 'wp_add7', type: 'word', title: '做题', level: 5, question: '小明上午做了8道题，下午做了7道题，一天一共做了几道题？', options: ['14道', '15道', '16道', '17道'], answer: '15道', explanation: '8 + 7 = 15，一共做了15道题' },
  { id: 'wp_sub6', type: 'word', title: '课间', level: 6, question: '教室里有15个同学，下课走了7个，还剩几个同学？', options: ['7个', '8个', '9个', '6个'], answer: '8个', explanation: '15 - 7 = 8，还剩8个同学' },
  { id: 'wp_sub7', type: 'word', title: '橘子', level: 6, question: '妈妈买了13个橘子，吃了6个，还剩几个？', options: ['6个', '7个', '8个', '5个'], answer: '7个', explanation: '13 - 6 = 7，还剩7个橘子' },

  // 比较应用题
  { id: 'wp_cmp1', type: 'word', title: '贴纸', level: 3, question: '小红有9张贴纸，小明有4张贴纸，小红比小明多几张？', options: ['3张', '4张', '5张', '6张'], answer: '5张', explanation: '9 - 4 = 5，小红比小明多5张' },
  { id: 'wp_cmp2', type: 'word', title: '果树', level: 6, question: '大树有12个果子，小树有8个果子，大树比小树多几个果子？', options: ['3个', '4个', '5个', '6个'], answer: '4个', explanation: '12 - 8 = 4，大树比小树多4个果子' },
  { id: 'wp_cmp3', type: 'word', title: '积木', level: 2, question: '弟弟有5块积木，哥哥比他多3块，哥哥有几块积木？', options: ['7块', '8块', '9块', '6块'], answer: '8块', explanation: '5 + 3 = 8，哥哥有8块积木' },

  // 综合应用题
  { id: 'wp_mix1', type: 'word', title: '草莓', level: 4, question: '小明先吃了4颗草莓，又吃了4颗，最后吃了2颗，一共吃了多少颗？', options: ['8颗', '9颗', '10颗', '12颗'], answer: '10颗', explanation: '4 + 4 + 2 = 10，一共吃了10颗草莓' },
  { id: 'wp_mix2', type: 'word', title: '教室', level: 7, question: '班上有20个小朋友，5个去上厕所，3个去喝水，教室里还剩几个？', options: ['10个', '11个', '12个', '13个'], answer: '12个', explanation: '20 - 5 - 3 = 12，教室里还剩12个' },
  { id: 'wp_mix3', type: 'word', title: '买文具', level: 4, question: '一支铅笔2元，一块橡皮1元，买1支铅笔和1块橡皮要多少钱？', options: ['2元', '3元', '4元', '5元'], answer: '3元', explanation: '2 + 1 = 3，一共3元' },
]
