// 认识时间与货币
import type { MathData } from '../../types'

export const TIME_MONEY: MathData[] = [
  // === 认识钟表 ===
  // 整点
  { id: 'time_1', type: 'time', title: '认识整点', level: 1, question: '钟面上，时针指向3，分针指向12，是几点？', options: ['3点', '12点', '6点', '9点'], answer: '3点', explanation: '分针指向12表示整点，时针指向3就是3点' },
  { id: 'time_2', type: 'time', title: '认识整点', level: 1, question: '钟面上，时针指向8，分针指向12，是几点？', options: ['8点', '12点', '4点', '10点'], answer: '8点', explanation: '分针指向12表示整点，时针指向8就是8点' },
  { id: 'time_3', type: 'time', title: '认识整点', level: 1, question: '早上起床，钟面上时针指向7，分针指向12，这是几点？', options: ['7点', '6点', '8点', '12点'], answer: '7点', explanation: '早上7点起床啦！' },
  { id: 'time_4', type: 'time', title: '认识整点', level: 1, question: '中午吃饭，时针指向12，分针指向12，是几点？', options: ['12点', '6点', '1点', '11点'], answer: '12点', explanation: '中午12点吃午饭！' },
  { id: 'time_5', type: 'time', title: '认识整点', level: 1, question: '下午放学，时针指向4，分针指向12，是几点？', options: ['4点', '3点', '5点', '12点'], answer: '4点', explanation: '下午4点放学啦！' },

  // 半点
  { id: 'time_6', type: 'time', title: '认识半点', level: 2, question: '分针指向6，时针在2和3之间，是几点半？', options: ['2点半', '3点半', '6点半', '2点'], answer: '2点半', explanation: '分针指向6表示半点，时针刚过2就是2点半' },
  { id: 'time_7', type: 'time', title: '认识半点', level: 2, question: '分针指向6，时针在8和9之间，是几点半？', options: ['8点半', '9点半', '6点半', '8点'], answer: '8点半', explanation: '分针指向6表示半点，时针刚过8就是8点半' },
  { id: 'time_8', type: 'time', title: '认识半点', level: 2, question: '晚上看动画片，分针指向6，时针在5和6之间，是几点半？', options: ['5点半', '6点半', '5点', '6点'], answer: '5点半', explanation: '傍晚5点半看动画片！' },
  { id: 'time_9', type: 'time', title: '认识半点', level: 2, question: '分针指向6，时针在10和11之间，是几点半？', options: ['10点半', '11点半', '9点半', '10点'], answer: '10点半', explanation: '10点半，快要吃午饭啦！' },
  { id: 'time_10', type: 'time', title: '认识半点', level: 2, question: '分针指向6，时针刚过1还没到2，是几点半？', options: ['1点半', '2点半', '12点半', '1点'], answer: '1点半', explanation: '下午1点半，午休结束了！' },

  // 综合识钟
  { id: 'time_11', type: 'time', title: '时间先后', level: 3, question: '小明早上7点起床，8点到学校，他在路上花了多少时间？', options: ['1小时', '2小时', '半小时', '15分钟'], answer: '1小时', explanation: '8点 - 7点 = 1小时' },
  { id: 'time_12', type: 'time', title: '时间先后', level: 3, question: '一节课40分钟，从8点开始上课，什么时候下课？', options: ['8点40', '9点', '8点半', '8点20'], answer: '8点40', explanation: '8:00 + 40分钟 = 8:40' },
  { id: 'time_13', type: 'time', title: '认识钟面', level: 3, question: '钟面上一共有多少个大格？', options: ['12个', '10个', '24个', '6个'], answer: '12个', explanation: '钟面上有12个大格，每个大格代表1小时' },
  { id: 'time_14', type: 'time', title: '认识钟面', level: 3, question: '分针走一圈是多少分钟？', options: ['60分钟', '30分钟', '12分钟', '24分钟'], answer: '60分钟', explanation: '分针走一圈是60分钟，也就是1小时' },
  { id: 'time_15', type: 'time', title: '认识钟面', level: 3, question: '时针走一个大格是多少时间？', options: ['1小时', '5分钟', '半小时', '10分钟'], answer: '1小时', explanation: '时针走一个大格是1小时' },

  // === 认识人民币 ===
  { id: 'money_1', type: 'money', title: '认识人民币', level: 1, question: '一张1元和一张5角合起来是多少钱？', options: ['1元5角', '6角', '2元', '1元'], answer: '1元5角', explanation: '1元 + 5角 = 1元5角' },
  { id: 'money_2', type: 'money', title: '认识人民币', level: 1, question: '一张5元可以换几张1元？', options: ['5张', '4张', '10张', '3张'], answer: '5张', explanation: '5元 = 5个1元' },
  { id: 'money_3', type: 'money', title: '认识人民币', level: 1, question: '一张10元可以换几张5元？', options: ['2张', '5张', '3张', '4张'], answer: '2张', explanation: '10元 = 2个5元' },
  { id: 'money_4', type: 'money', title: '认识人民币', level: 1, question: '1元等于多少角？', options: ['10角', '5角', '20角', '100角'], answer: '10角', explanation: '1元 = 10角' },
  { id: 'money_5', type: 'money', title: '认识人民币', level: 1, question: '1角等于多少分？', options: ['10分', '5分', '100分', '1分'], answer: '10分', explanation: '1角 = 10分' },

  { id: 'money_6', type: 'money', title: '人民币计算', level: 2, question: '小红有2张5元，一共有多少元？', options: ['10元', '7元', '5元', '15元'], answer: '10元', explanation: '5元 + 5元 = 10元' },
  { id: 'money_7', type: 'money', title: '人民币计算', level: 2, question: '一支铅笔8角，一块橡皮5角，一共多少钱？', options: ['1元3角', '13元', '3角', '8角'], answer: '1元3角', explanation: '8角 + 5角 = 13角 = 1元3角' },
  { id: 'money_8', type: 'money', title: '人民币计算', level: 2, question: '小明有2元，买了一个1元5角的笔记本，还剩多少钱？', options: ['5角', '1元', '5元', '1元5角'], answer: '5角', explanation: '2元 - 1元5角 = 5角' },
  { id: 'money_9', type: 'money', title: '人民币计算', level: 2, question: '一个面包3元，一瓶牛奶2元5角，一共多少钱？', options: ['5元5角', '5元', '6元', '4元5角'], answer: '5元5角', explanation: '3元 + 2元5角 = 5元5角' },
  { id: 'money_10', type: 'money', title: '人民币计算', level: 2, question: '妈妈有20元，买菜花了12元，还剩多少元？', options: ['8元', '7元', '18元', '10元'], answer: '8元', explanation: '20元 - 12元 = 8元' },

  { id: 'money_11', type: 'money', title: '人民币换算', level: 3, question: '一张20元可以换几张10元？', options: ['2张', '4张', '3张', '5张'], answer: '2张', explanation: '20元 = 2个10元' },
  { id: 'money_12', type: 'money', title: '人民币换算', level: 3, question: '一张50元可以换几张10元？', options: ['5张', '10张', '3张', '4张'], answer: '5张', explanation: '50元 = 5个10元' },
  { id: 'money_13', type: 'money', title: '购物计算', level: 3, question: '小华带了15元，买了一个文具盒花了8元，又买了一支笔花了2元，还剩多少钱？', options: ['5元', '7元', '10元', '3元'], answer: '5元', explanation: '15 - 8 - 2 = 5元' },
  { id: 'money_14', type: 'money', title: '购物计算', level: 3, question: '一本书8元5角，付了10元，应该找回多少钱？', options: ['1元5角', '2元5角', '1元', '5角'], answer: '1元5角', explanation: '10元 - 8元5角 = 1元5角' },
  { id: 'money_15', type: 'money', title: '购物计算', level: 3, question: '一斤苹果4元，妈妈买了3斤，需要付多少钱？', options: ['12元', '7元', '10元', '8元'], answer: '12元', explanation: '4元 × 3 = 12元' },

  // 时间与生活
  { id: 'time_16', type: 'time', title: '认识时间', level: 1, question: '一天有多少个小时？', options: ['24小时', '12小时', '10小时', '20小时'], answer: '24小时', explanation: '一天有24小时' },
  { id: 'time_17', type: 'time', title: '认识时间', level: 1, question: '一小时有多少分钟？', options: ['60分钟', '30分钟', '100分钟', '50分钟'], answer: '60分钟', explanation: '1小时 = 60分钟' },
  { id: 'time_18', type: 'time', title: '时间概念', level: 2, question: '早上太阳升起的时候大概是几点？', options: ['6点左右', '12点', '下午3点', '晚上8点'], answer: '6点左右', explanation: '太阳一般在早上6点左右升起' },
  { id: 'time_19', type: 'time', title: '时间概念', level: 2, question: '晚上睡觉的时间一般是几点？', options: ['9点左右', '中午12点', '早上6点', '下午3点'], answer: '9点左右', explanation: '小朋友们晚上9点左右睡觉最好！' },
  { id: 'time_20', type: 'time', title: '时间排序', level: 3, question: '以下哪个时间最早？', options: ['早上6点', '上午10点', '下午2点', '晚上8点'], answer: '早上6点', explanation: '早上6点是一天中最早的时间' },
]
