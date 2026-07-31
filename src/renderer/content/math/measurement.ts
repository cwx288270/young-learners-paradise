// 测量与比较 — 长度、重量、容量
import type { MathData } from '../../types'

export const MEASUREMENT: MathData[] = [
  // === 长度比较 ===
  { id: 'meas_len_1', type: 'measurement', title: '比长短', level: 1, question: '一支铅笔和一根粉笔，哪个更长？', options: ['铅笔更长', '粉笔更长', '一样长', '不知道'], answer: '铅笔更长', explanation: '铅笔通常比粉笔长' },
  { id: 'meas_len_2', type: 'measurement', title: '比长短', level: 1, question: '一根筷子和一根牙签，哪个更短？', options: ['牙签更短', '筷子更短', '一样短', '不知道'], answer: '牙签更短', explanation: '牙签比筷子短很多' },
  { id: 'meas_len_3', type: 'measurement', title: '比高矮', level: 1, question: '长颈鹿和小狗，哪个更高？', options: ['长颈鹿更高', '小狗更高', '一样高', '不知道'], answer: '长颈鹿更高', explanation: '长颈鹿是陆地上最高的动物！' },
  { id: 'meas_len_4', type: 'measurement', title: '比高矮', level: 1, question: '爸爸和上幼儿园的小朋友，谁更高？', options: ['爸爸更高', '小朋友更高', '一样高', '不知道'], answer: '爸爸更高', explanation: '大人比小朋友高' },
  { id: 'meas_len_5', type: 'measurement', title: '比高矮', level: 1, question: '一棵大树和一棵小草，谁更高？', options: ['大树更高', '小草更高', '一样高', '不知道'], answer: '大树更高', explanation: '大树比小草高很多很多' },

  { id: 'meas_len_6', type: 'measurement', title: '排序', level: 2, question: '铅笔(15cm)、橡皮(3cm)、尺子(20cm)，从短到长排列，中间的是？', options: ['铅笔', '橡皮', '尺子', '都一样'], answer: '铅笔', explanation: '橡皮(3cm) < 铅笔(15cm) < 尺子(20cm)，铅笔在中间' },
  { id: 'meas_len_7', type: 'measurement', title: '排序', level: 2, question: '蚂蚁、蝴蝶、小鸟，从大到小排列，最大的是？', options: ['小鸟', '蝴蝶', '蚂蚁', '都一样'], answer: '小鸟', explanation: '小鸟 > 蝴蝶 > 蚂蚁' },
  { id: 'meas_len_8', type: 'measurement', title: '比远近', level: 2, question: '小明家到学校要走10分钟，到公园要走5分钟，哪个更近？', options: ['公园更近', '学校更近', '一样近', '不知道'], answer: '公园更近', explanation: '5分钟比10分钟近' },
  { id: 'meas_len_9', type: 'measurement', title: '比远近', level: 2, question: '小猫离家3米远，小狗离家8米远，谁离家更近？', options: ['小猫更近', '小狗更近', '一样近', '不知道'], answer: '小猫更近', explanation: '3米 < 8米，所以小猫离家更近' },
  { id: 'meas_len_10', type: 'measurement', title: '长度单位', level: 2, question: '量教室的长度，应该用什么单位？', options: ['米（m）', '厘米（cm）', '毫米（mm）', '千米（km）'], answer: '米（m）', explanation: '教室的长度用米来量比较合适' },

  // === 重量比较 ===
  { id: 'meas_wt_1', type: 'measurement', title: '比轻重', level: 1, question: '一个苹果和一个西瓜，哪个更重？', options: ['西瓜更重', '苹果更重', '一样重', '不知道'], answer: '西瓜更重', explanation: '西瓜比苹果重很多' },
  { id: 'meas_wt_2', type: 'measurement', title: '比轻重', level: 1, question: '一张纸和一本书，哪个更轻？', options: ['纸更轻', '书更轻', '一样轻', '不知道'], answer: '纸更轻', explanation: '一张纸非常轻，书更重' },
  { id: 'meas_wt_3', type: 'measurement', title: '比轻重', level: 1, question: '一个铅球和一个气球，哪个更重？', options: ['铅球更重', '气球更重', '一样重', '不知道'], answer: '铅球更重', explanation: '铅球很重，气球很轻' },
  { id: 'meas_wt_4', type: 'measurement', title: '比轻重', level: 1, question: '一袋大米和一袋棉花，都是10斤，谁更重？', options: ['一样重', '大米更重', '棉花更重', '不知道'], answer: '一样重', explanation: '都是10斤，一样重！大小不一样不代表重量不一样' },
  { id: 'meas_wt_5', type: 'measurement', title: '比轻重', level: 1, question: '大象和老鼠，哪个更重？', options: ['大象更重', '老鼠更重', '一样重', '不知道'], answer: '大象更重', explanation: '大象是陆地上最重的动物之一' },

  { id: 'meas_wt_6', type: 'measurement', title: '重量排序', level: 2, question: '羽毛、鸡蛋、西瓜，从轻到重排列，最轻的是？', options: ['羽毛', '鸡蛋', '西瓜', '都一样'], answer: '羽毛', explanation: '羽毛 < 鸡蛋 < 西瓜' },
  { id: 'meas_wt_7', type: 'measurement', title: '重量估算', level: 2, question: '一个鸡蛋大约重多少？', options: ['50克左右', '1克左右', '500克左右', '5千克左右'], answer: '50克左右', explanation: '一个鸡蛋大约重50克' },
  { id: 'meas_wt_8', type: 'measurement', title: '重量单位', level: 2, question: '称一个人的体重，应该用什么单位？', options: ['千克（kg）', '克（g）', '吨（t）', '毫克（mg）'], answer: '千克（kg）', explanation: '人的体重通常用千克来表示' },
  { id: 'meas_wt_9', type: 'measurement', title: '重量单位', level: 2, question: '1千克等于多少克？', options: ['1000克', '100克', '10克', '500克'], answer: '1000克', explanation: '1千克 = 1000克' },
  { id: 'meas_wt_10', type: 'measurement', title: '重量比较', level: 2, question: '一袋盐500克，两袋盐重多少克？', options: ['1000克', '500克', '250克', '1500克'], answer: '1000克', explanation: '500克 + 500克 = 1000克 = 1千克' },

  // === 容量比较 ===
  { id: 'meas_cap_1', type: 'measurement', title: '比容量', level: 1, question: '一个水桶和一个水杯，哪个装水更多？', options: ['水桶更多', '水杯更多', '一样多', '不知道'], answer: '水桶更多', explanation: '水桶比水杯大，装的水更多' },
  { id: 'meas_cap_2', type: 'measurement', title: '比容量', level: 1, question: '一瓶矿泉水和一瓶眼药水，哪个装的液体更多？', options: ['矿泉水更多', '眼药水更多', '一样多', '不知道'], answer: '矿泉水更多', explanation: '矿泉水瓶比眼药水瓶大多了' },
  { id: 'meas_cap_3', type: 'measurement', title: '比容量', level: 1, question: '一个游泳池和一个浴缸，哪个装水更多？', options: ['游泳池更多', '浴缸更多', '一样多', '不知道'], answer: '游泳池更多', explanation: '游泳池非常大，能装很多很多水' },
  { id: 'meas_cap_4', type: 'measurement', title: '比容量', level: 1, question: '喝汤用的小勺和盛饭用的大勺，哪个装的更多？', options: ['大勺更多', '小勺更多', '一样多', '不知道'], answer: '大勺更多', explanation: '大勺比小勺大，装的更多' },
  { id: 'meas_cap_5', type: 'measurement', title: '比容量', level: 2, question: '一瓶可乐500毫升，两瓶可乐是多少毫升？', options: ['1000毫升', '500毫升', '250毫升', '750毫升'], answer: '1000毫升', explanation: '500毫升 + 500毫升 = 1000毫升 = 1升' },

  // === 综合比较 ===
  { id: 'meas_mix_1', type: 'measurement', title: '综合比较', level: 2, question: '下面哪个描述是正确的？', options: ['大象比小猫重', '小猫比大象重', '大象和小猫一样重', '不一定'], answer: '大象比小猫重', explanation: '大象是大型动物，猫是小型动物' },
  { id: 'meas_mix_2', type: 'measurement', title: '综合比较', level: 2, question: '一栋楼的高度大概是多少？', options: ['几十米', '几厘米', '几毫米', '几千米'], answer: '几十米', explanation: '楼房一般有几十米高' },
  { id: 'meas_mix_3', type: 'measurement', title: '综合比较', level: 3, question: '1米等于多少厘米？', options: ['100厘米', '10厘米', '1000厘米', '50厘米'], answer: '100厘米', explanation: '1米 = 100厘米' },
  { id: 'meas_mix_4', type: 'measurement', title: '综合比较', level: 3, question: '1升等于多少毫升？', options: ['1000毫升', '100毫升', '10毫升', '500毫升'], answer: '1000毫升', explanation: '1升 = 1000毫升' },
  { id: 'meas_mix_5', type: 'measurement', title: '综合比较', level: 3, question: '小明身高120厘米，也就是多少米？', options: ['1.2米', '12米', '0.12米', '120米'], answer: '1.2米', explanation: '120厘米 = 1.2米' },
]
