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

  // === 新增30道应用题 ===

  // 10以内加减混合
  { id: 'wp_n1', type: 'word', title: '停车场', level: 2, question: '停车场有6辆车，开走了2辆，又开来3辆，现在有几辆车？', options: ['5辆', '7辆', '8辆', '6辆'], answer: '7辆', explanation: '6 - 2 + 3 = 7，现在有7辆车' },
  { id: 'wp_n2', type: 'word', title: '气球', level: 2, question: '小红有4个气球，小明给了她3个，她放飞了2个，还剩几个？', options: ['5个', '4个', '7个', '3个'], answer: '5个', explanation: '4 + 3 - 2 = 5，还剩5个气球' },
  { id: 'wp_n3', type: 'word', title: '公交车', level: 3, question: '公交车上有8个人，到站下了3人，又上了2人，现在车上有几人？', options: ['6人', '7人', '8人', '5人'], answer: '7人', explanation: '8 - 3 + 2 = 7，现在有7人' },
  { id: 'wp_n4', type: 'word', title: '鱼', level: 3, question: '池塘里有5条红鱼和4条花鱼，捞走了3条，还剩几条？', options: ['5条', '6条', '7条', '9条'], answer: '6条', explanation: '5 + 4 - 3 = 6，还剩6条鱼' },
  { id: 'wp_n5', type: 'word', title: '玩具', level: 2, question: '弟弟有3辆玩具车，哥哥又给他2辆，他一共有几辆玩具车？', options: ['4辆', '5辆', '6辆', '7辆'], answer: '5辆', explanation: '3 + 2 = 5，一共有5辆' },

  // 20以内加减
  { id: 'wp_n6', type: 'word', title: '图书角', level: 5, question: '图书角原来有16本书，同学们借走了8本，又还回来3本，现在有几本？', options: ['10本', '11本', '12本', '9本'], answer: '11本', explanation: '16 - 8 + 3 = 11，现在有11本' },
  { id: 'wp_n7', type: 'word', title: '跳绳比赛', level: 5, question: '小明跳了9下，小红跳了7下，小华跳了5下，三人一共跳了多少下？', options: ['20下', '21下', '22下', '19下'], answer: '21下', explanation: '9 + 7 + 5 = 21，一共跳了21下' },
  { id: 'wp_n8', type: 'word', title: '分糖果', level: 5, question: '妈妈买了18颗糖，分给姐姐7颗，分给弟弟6颗，还剩几颗？', options: ['4颗', '5颗', '6颗', '7颗'], answer: '5颗', explanation: '18 - 7 - 6 = 5，还剩5颗' },
  { id: 'wp_n9', type: 'word', title: '排队', level: 5, question: '小明排第8，他后面还有6个人，这一队一共有多少人？', options: ['13人', '14人', '15人', '12人'], answer: '14人', explanation: '8 + 6 = 14，一共有14人' },
  { id: 'wp_n10', type: 'word', title: '摘苹果', level: 6, question: '树上有15个苹果，爸爸摘了6个，妈妈摘了4个，树上还剩几个？', options: ['4个', '5个', '6个', '7个'], answer: '5个', explanation: '15 - 6 - 4 = 5，还剩5个' },

  // 比较问题
  { id: 'wp_n11', type: 'word', title: '比身高', level: 3, question: '哥哥身高120厘米，弟弟身高100厘米，哥哥比弟弟高多少厘米？', options: ['10厘米', '20厘米', '30厘米', '15厘米'], answer: '20厘米', explanation: '120 - 100 = 20，哥哥比弟弟高20厘米' },
  { id: 'wp_n12', type: 'word', title: '集邮', level: 4, question: '小华有25张邮票，小明有18张邮票，小华比小明多几张？', options: ['5张', '6张', '7张', '8张'], answer: '7张', explanation: '25 - 18 = 7，小华比小明多7张' },
  { id: 'wp_n13', type: 'word', title: '跑步', level: 4, question: '小红跑了400米，小刚跑了350米，谁跑得远？远多少米？', options: ['小红远50米', '小刚远50米', '一样远', '小红远100米'], answer: '小红远50米', explanation: '400 - 350 = 50，小红比小刚多跑50米' },

  // 购物问题
  { id: 'wp_n14', type: 'word', title: '买水果', level: 4, question: '苹果每斤5元，妈妈买了2斤苹果，一共花了多少钱？', options: ['7元', '10元', '8元', '12元'], answer: '10元', explanation: '5 + 5 = 10，两斤苹果10元' },
  { id: 'wp_n15', type: 'word', title: '超市购物', level: 5, question: '一盒牛奶4元，一个面包3元，小明各买一个，付了10元，应找回多少钱？', options: ['1元', '2元', '3元', '4元'], answer: '3元', explanation: '4 + 3 = 7，10 - 7 = 3，应找回3元' },
  { id: 'wp_n16', type: 'word', title: '零食', level: 5, question: '一包薯片6元，一瓶饮料3元，小华有15元，买了这两样后还剩多少元？', options: ['5元', '6元', '7元', '4元'], answer: '6元', explanation: '6 + 3 = 9，15 - 9 = 6，还剩6元' },
  { id: 'wp_n17', type: 'word', title: '文具店', level: 6, question: '一个文具盒12元，一本笔记本5元，一支铅笔1元，一共需要多少钱？', options: ['17元', '18元', '19元', '16元'], answer: '18元', explanation: '12 + 5 + 1 = 18，一共18元' },
  { id: 'wp_n18', type: 'word', title: '买菜', level: 6, question: '妈妈带了20元去菜场，买肉花了12元，买青菜花了3元，还剩多少钱？', options: ['4元', '5元', '6元', '7元'], answer: '5元', explanation: '20 - 12 - 3 = 5，还剩5元' },

  // 分组与分配
  { id: 'wp_n19', type: 'word', title: '分蛋糕', level: 3, question: '一块蛋糕切成8块，小明吃了2块，小红吃了3块，还剩几块？', options: ['2块', '3块', '4块', '5块'], answer: '3块', explanation: '8 - 2 - 3 = 3，还剩3块' },
  { id: 'wp_n20', type: 'word', title: '分组', level: 4, question: '24个小朋友做游戏，每6人一组，可以分成几组？', options: ['3组', '4组', '5组', '6组'], answer: '4组', explanation: '24个小朋友，6人一组，可以分4组' },
  { id: 'wp_n21', type: 'word', title: '分苹果', level: 5, question: '有12个苹果，平均分给3个小朋友，每人分到几个？', options: ['3个', '4个', '5个', '6个'], answer: '4个', explanation: '12 ÷ 3 = 4，每人分到4个苹果' },
  { id: 'wp_n22', type: 'word', title: '摆桌子', level: 5, question: '教室里有4张桌子，每张桌子坐6个小朋友，一共可以坐多少人？', options: ['20人', '22人', '24人', '26人'], answer: '24人', explanation: '4 × 6 = 24，一共坐24人' },

  // 时间和年龄
  { id: 'wp_n23', type: 'word', title: '几岁', level: 4, question: '小明今年7岁，哥哥比他大5岁，哥哥今年几岁？', options: ['10岁', '11岁', '12岁', '13岁'], answer: '12岁', explanation: '7 + 5 = 12，哥哥今年12岁' },
  { id: 'wp_n24', type: 'word', title: '几年后', level: 5, question: '小红今年6岁，3年后小红几岁？', options: ['8岁', '9岁', '10岁', '7岁'], answer: '9岁', explanation: '6 + 3 = 9，3年后小红9岁' },
  { id: 'wp_n25', type: 'word', title: '年龄差', level: 5, question: '爸爸今年35岁，小明今年6岁，爸爸比小明大多少岁？5年后爸爸还比小明大多少岁？', options: ['29岁和29岁', '29岁和34岁', '30岁和30岁', '28岁和33岁'], answer: '29岁和29岁', explanation: '35 - 6 = 29，年龄差永远不变，5年后还是差29岁' },
  { id: 'wp_n26', type: 'word', title: '看钟表', level: 4, question: '动画片4点开始，一集30分钟，什么时候结束？', options: ['4点半', '5点', '4点30', '5点半'], answer: '4点半', explanation: '4点 + 30分钟 = 4点半' },

  // 综合拓展
  { id: 'wp_n27', type: 'word', title: '养蚕', level: 6, question: '小明养了20条蚕，送给小红5条，送给小华比小红多2条，还剩几条？', options: ['7条', '8条', '9条', '10条'], answer: '8条', explanation: '小红得5条，小华得5+2=7条，20-5-7=8条' },
  { id: 'wp_n28', type: 'word', title: '折纸', level: 6, question: '一张纸对折1次变成2层，对折2次变成4层，对折3次变成几层？', options: ['6层', '8层', '9层', '7层'], answer: '8层', explanation: '每次对折层数翻倍：1→2→4→8' },
  { id: 'wp_n29', type: 'word', title: '数小鸡', level: 4, question: '鸡窝里有8只小鸡，又孵出5只，后来跑了3只，现在有几只小鸡？', options: ['9只', '10只', '11只', '8只'], answer: '10只', explanation: '8 + 5 - 3 = 10，现在有10只小鸡' },
  { id: 'wp_n30', type: 'word', title: '浇花', level: 5, question: '花园里有15盆花，上午浇了6盆，下午浇了比上午少2盆，还剩几盆没浇？', options: ['4盆', '5盆', '6盆', '3盆'], answer: '5盆', explanation: '下午浇6-2=4盆，共浇6+4=10盆，15-10=5盆没浇' },
]
