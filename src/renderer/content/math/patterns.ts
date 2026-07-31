import type { MathData } from '../../types'

export const PATTERNS: MathData[] = [
  // 数字规律
  { id: 'pat_num_1', type: 'pattern', title: '找规律-加1', level: 12, question: '1, 2, 3, ?, 5', options: ['4', '6', '3', '7'], answer: '4', explanation: '每次加1：1,2,3,4,5' },
  { id: 'pat_num_2', type: 'pattern', title: '找规律-加2', level: 12, question: '2, 4, 6, ?, 10', options: ['7', '8', '9', '5'], answer: '8', explanation: '每次加2：2,4,6,8,10' },
  { id: 'pat_num_3', type: 'pattern', title: '找规律-奇数', level: 12, question: '1, 3, 5, ?, 9', options: ['6', '7', '4', '8'], answer: '7', explanation: '每次加2：1,3,5,7,9' },
  { id: 'pat_num_4', type: 'pattern', title: '找规律-减2', level: 12, question: '10, 8, 6, ?, 2', options: ['4', '5', '7', '3'], answer: '4', explanation: '每次减2：10,8,6,4,2' },
  { id: 'pat_num_5', type: 'pattern', title: '找规律-加5', level: 12, question: '5, 10, 15, ?, 25', options: ['20', '18', '22', '16'], answer: '20', explanation: '每次加5：5,10,15,20,25' },
  { id: 'pat_num_6', type: 'pattern', title: '找规律-加3', level: 12, question: '3, 6, 9, ?, 15', options: ['12', '11', '13', '10'], answer: '12', explanation: '每次加3：3,6,9,12,15' },

  // 更多数字规律
  { id: 'pat_num_7', type: 'pattern', title: '找规律-加10', level: 12, question: '10, 20, 30, ?, 50', options: ['40', '35', '45', '25'], answer: '40', explanation: '每次加10：10,20,30,40,50' },
  { id: 'pat_num_8', type: 'pattern', title: '找规律-减1', level: 12, question: '9, 8, 7, ?, 5, 4', options: ['6', '10', '5', '8'], answer: '6', explanation: '每次减1：9,8,7,6,5,4' },
  { id: 'pat_num_9', type: 'pattern', title: '找规律-减3', level: 12, question: '15, 12, 9, ?, 3', options: ['8', '6', '7', '5'], answer: '6', explanation: '每次减3：15,12,9,6,3' },
  { id: 'pat_num_10', type: 'pattern', title: '找规律-偶数', level: 12, question: '2, 4, 6, 8, ?, 12', options: ['9', '10', '11', '13'], answer: '10', explanation: '双数规律：2,4,6,8,10,12' },
  { id: 'pat_num_11', type: 'pattern', title: '找规律-五个五个', level: 12, question: '5, 10, ?, 20, 25', options: ['12', '15', '18', '13'], answer: '15', explanation: '每次加5' },
  { id: 'pat_num_12', type: 'pattern', title: '找规律-整十', level: 12, question: '0, 10, 20, ?, 40, 50', options: ['25', '30', '35', '15'], answer: '30', explanation: '每次加10的整十数' },

  // 图形规律
  { id: 'pat_shape_1', type: 'pattern', title: '图形规律-交替', level: 12, question: '○△○△○？', options: ['△', '○', '□', '☆'], answer: '△', explanation: '圆形三角形交替出现' },
  { id: 'pat_shape_2', type: 'pattern', title: '图形规律-重复', level: 12, question: '□○○□○○？', options: ['□', '○', '△', '☆'], answer: '□', explanation: '一个正方形两个圆形重复' },
  { id: 'pat_shape_3', type: 'pattern', title: '图形规律-三色', level: 12, question: '🔴🔵🔴🔵🔴？', options: ['🔵', '🔴', '🟡', '🟢'], answer: '🔵', explanation: '红色蓝色交替' },
  { id: 'pat_shape_4', type: 'pattern', title: '图形规律-递增', level: 12, question: '★, ★★, ★★★, ?, ★★★★★', options: ['★★', '★★★★', '★', '★★★'], answer: '★★★★', explanation: '星星每次多一颗：1,2,3,4,5' },
  { id: 'pat_shape_5', type: 'pattern', title: '图形规律-对称', level: 12, question: '□△○ ? ○△□', options: ['☆', '△', '□', '○'], answer: '□', explanation: '两边对称，中间是○' },
  { id: 'pat_shape_6', type: 'pattern', title: '图形规律-三色循环', level: 12, question: '🔴🟡🔵🔴🟡？', options: ['🔵', '🔴', '🟡', '🟢'], answer: '🔵', explanation: '红黄蓝三色循环' },

  // 大小规律
  { id: 'pat_size_1', type: 'pattern', title: '大小规律', level: 12, question: '小大大小小大大？', options: ['小', '大', '中', '高'], answer: '小', explanation: '两个小一个大重复' },
  { id: 'pat_size_2', type: 'pattern', title: '大小规律-递增', level: 12, question: '小小中中大？', options: ['大', '中', '小', '超大'], answer: '大', explanation: '两个小、两个中、两个大' },
  { id: 'pat_size_3', type: 'pattern', title: '大小规律-变化', level: 12, question: '小中大? 小中大', options: ['小', '中', '大', '小小'], answer: '小', explanation: '小中大循环' },

  // 逻辑推理
  { id: 'pat_logic_1', type: 'pattern', title: '数字推理1', level: 12, question: '2+3=5, 3+4=7, 4+5=?, 5+6=11', options: ['9', '10', '8', '11'], answer: '9', explanation: '每道题都是相邻两个数相加，4+5=9' },
  { id: 'pat_logic_2', type: 'pattern', title: '数字推理2', level: 12, question: '1→3, 2→6, 3→9, 4→?', options: ['10', '11', '12', '8'], answer: '12', explanation: '每个数乘以3：1×3=3, 2×3=6, 3×3=9, 4×3=12' },
  { id: 'pat_logic_3', type: 'pattern', title: '数字推理3', level: 12, question: '10→5, 8→4, 6→3, 4→?', options: ['1', '2', '3', '0'], answer: '2', explanation: '每个数除以2：10÷2=5, 8÷2=4, 6÷2=3, 4÷2=2' },
  { id: 'pat_logic_4', type: 'pattern', title: '数字推理4', level: 12, question: '1→1, 2→4, 3→9, 4→?', options: ['12', '16', '8', '10'], answer: '16', explanation: '平方关系：1²=1, 2²=4, 3²=9, 4²=16' },

  // ABB和复杂模式
  { id: 'pat_abb_1', type: 'pattern', title: 'ABB规律', level: 12, question: '🔴🔵🔵🔴🔵🔵🔴？', options: ['🔵', '🔴', '🟡', '🟢'], answer: '🔵', explanation: '红蓝蓝 红蓝蓝 红蓝蓝...下一个是蓝' },
  { id: 'pat_abb_2', type: 'pattern', title: 'ABB规律', level: 12, question: '★●●★●●★？', options: ['●', '★', '▲', '■'], answer: '●', explanation: '星圆圆 星圆圆 星圆圆...下一个是圆' },
  { id: 'pat_aab_1', type: 'pattern', title: 'AAB规律', level: 12, question: '🔴🔴🔵🔴🔴🔵？', options: ['🔴', '🔵', '🟡', '🟢'], answer: '🔴', explanation: '红红蓝 红红蓝...下一个是红' },
  { id: 'pat_aabb_1', type: 'pattern', title: 'AABB规律', level: 12, question: '□ □ △ △ □ □ △ △ □？', options: ['□', '△', '○', '☆'], answer: '□', explanation: '方方三角三角 方方三角三角 方...下一个是方' },

  // 递增模式
  { id: 'pat_grow_1', type: 'pattern', title: '递增规律', level: 12, question: '1, 4, 7, 10, ?, 16', options: ['12', '13', '14', '11'], answer: '13', explanation: '每次加3：1+3=4, 4+3=7, 7+3=10, 10+3=13, 13+3=16' },
  { id: 'pat_grow_2', type: 'pattern', title: '递增规律', level: 12, question: '2, 6, 10, 14, ?', options: ['16', '18', '20', '15'], answer: '18', explanation: '每次加4：2+4=6, 6+4=10, 10+4=14, 14+4=18' },
  { id: 'pat_grow_3', type: 'pattern', title: '递增规律', level: 12, question: '50, 45, 40, ?, 30, 25', options: ['38', '35', '32', '37'], answer: '35', explanation: '每次减5：50-5=45, 45-5=40, 40-5=35, 35-5=30' },
  { id: 'pat_grow_4', type: 'pattern', title: '倍增规律', level: 12, question: '1, 2, 4, 8, ?', options: ['12', '16', '10', '14'], answer: '16', explanation: '每次翻倍：1×2=2, 2×2=4, 4×2=8, 8×2=16' },

  // 颜色形状组合规律
  { id: 'pat_combo_1', type: 'pattern', title: '颜色形状', level: 12, question: '红方 蓝圆 红方 蓝圆 ？', options: ['红方', '蓝圆', '红圆', '蓝方'], answer: '红方', explanation: '红方和蓝圆交替，接下来是红方' },
  { id: 'pat_combo_2', type: 'pattern', title: '颜色形状', level: 12, question: '大圆 小圆 大圆 小圆 ？', options: ['大圆', '小圆', '中方', '大方'], answer: '大圆', explanation: '大小交替出现' },
  { id: 'pat_combo_3', type: 'pattern', title: '双层规律', level: 12, question: '🔴① 🟡② 🔵③ 🔴④ ？', options: ['🟡⑤', '🔴⑤', '🔵④', '🟡④'], answer: '🟡⑤', explanation: '颜色：红黄蓝循环，编号递增：①②③④⑤' },

  // 逻辑推理扩展
  { id: 'pat_logic_5', type: 'pattern', title: '数字推理', level: 12, question: '3→7, 5→9, 8→12, 10→?', options: ['12', '13', '14', '15'], answer: '14', explanation: '每个数加4：3+4=7, 5+4=9, 8+4=12, 10+4=14' },
  { id: 'pat_logic_6', type: 'pattern', title: '数字推理', level: 12, question: '2→1, 4→2, 6→3, 10→?', options: ['4', '5', '6', '3'], answer: '5', explanation: '每个数除以2：2÷2=1, 4÷2=2, 6÷2=3, 10÷2=5' },
  { id: 'pat_logic_7', type: 'pattern', title: '数字推理', level: 12, question: '1+2=3, 3+4=7, 5+6=11, 7+8=?', options: ['15', '13', '17', '14'], answer: '15', explanation: '连续两数相加：7+8=15' },
  { id: 'pat_logic_8', type: 'pattern', title: '数字推理', level: 12, question: '1, 1, 2, 3, 5, 8, ?', options: ['10', '13', '11', '9'], answer: '13', explanation: '前两个数相加：1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13（兔子数列）' },

  // 位置规律
  { id: 'pat_pos_1', type: 'pattern', title: '位置规律', level: 12, question: '上 中 下 上 中 ？', options: ['下', '上', '中', '左'], answer: '下', explanation: '上中下循环，下一个是下' },
  { id: 'pat_pos_2', type: 'pattern', title: '方向规律', level: 12, question: '↑ → ↓ ← ↑ → ↓ ？', options: ['←', '↑', '→', '↓'], answer: '←', explanation: '顺时针方向循环：上右下左...' },
]
