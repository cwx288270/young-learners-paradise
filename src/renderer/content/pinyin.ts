import type { PinyinData } from '../types'

// 声母 23个
export const SHENGMU: PinyinData[] = [
  { id: 'sm_b', pinyin: 'b', type: 'shengmu', sound: '玻', exampleChar: '爸', examplePinyin: 'bà', unit: 1 },
  { id: 'sm_p', pinyin: 'p', type: 'shengmu', sound: '坡', exampleChar: '婆', examplePinyin: 'pó', unit: 1 },
  { id: 'sm_m', pinyin: 'm', type: 'shengmu', sound: '摸', exampleChar: '妈', examplePinyin: 'mā', unit: 1 },
  { id: 'sm_f', pinyin: 'f', type: 'shengmu', sound: '佛', exampleChar: '飞', examplePinyin: 'fēi', unit: 1 },
  { id: 'sm_d', pinyin: 'd', type: 'shengmu', sound: '得', exampleChar: '大', examplePinyin: 'dà', unit: 2 },
  { id: 'sm_t', pinyin: 't', type: 'shengmu', sound: '特', exampleChar: '他', examplePinyin: 'tā', unit: 2 },
  { id: 'sm_n', pinyin: 'n', type: 'shengmu', sound: '讷', exampleChar: '你', examplePinyin: 'nǐ', unit: 2 },
  { id: 'sm_l', pinyin: 'l', type: 'shengmu', sound: '勒', exampleChar: '乐', examplePinyin: 'lè', unit: 2 },
  { id: 'sm_g', pinyin: 'g', type: 'shengmu', sound: '哥', exampleChar: '哥', examplePinyin: 'gē', unit: 3 },
  { id: 'sm_k', pinyin: 'k', type: 'shengmu', sound: '科', exampleChar: '看', examplePinyin: 'kàn', unit: 3 },
  { id: 'sm_h', pinyin: 'h', type: 'shengmu', sound: '喝', exampleChar: '好', examplePinyin: 'hǎo', unit: 3 },
  { id: 'sm_j', pinyin: 'j', type: 'shengmu', sound: '基', exampleChar: '家', examplePinyin: 'jiā', unit: 4 },
  { id: 'sm_q', pinyin: 'q', type: 'shengmu', sound: '欺', exampleChar: '去', examplePinyin: 'qù', unit: 4 },
  { id: 'sm_x', pinyin: 'x', type: 'shengmu', sound: '希', exampleChar: '小', examplePinyin: 'xiǎo', unit: 4 },
  { id: 'sm_zh', pinyin: 'zh', type: 'shengmu', sound: '知', exampleChar: '中', examplePinyin: 'zhōng', unit: 5 },
  { id: 'sm_ch', pinyin: 'ch', type: 'shengmu', sound: '蚩', exampleChar: '吃', examplePinyin: 'chī', unit: 5 },
  { id: 'sm_sh', pinyin: 'sh', type: 'shengmu', sound: '诗', exampleChar: '山', examplePinyin: 'shān', unit: 5 },
  { id: 'sm_r', pinyin: 'r', type: 'shengmu', sound: '日', exampleChar: '人', examplePinyin: 'rén', unit: 5 },
  { id: 'sm_z', pinyin: 'z', type: 'shengmu', sound: '资', exampleChar: '字', examplePinyin: 'zì', unit: 6 },
  { id: 'sm_c', pinyin: 'c', type: 'shengmu', sound: '次', exampleChar: '草', examplePinyin: 'cǎo', unit: 6 },
  { id: 'sm_s', pinyin: 's', type: 'shengmu', sound: '思', exampleChar: '三', examplePinyin: 'sān', unit: 6 },
  { id: 'sm_y', pinyin: 'y', type: 'shengmu', sound: '衣', exampleChar: '月', examplePinyin: 'yuè', unit: 5 },
  { id: 'sm_w', pinyin: 'w', type: 'shengmu', sound: '乌', exampleChar: '我', examplePinyin: 'wǒ', unit: 5 },
]

// 韵母 24个（单韵母+复韵母+鼻韵母）
export const YUNMU: PinyinData[] = [
  { id: 'ym_a', pinyin: 'a', type: 'yunmu', sound: '啊', exampleChar: '大', examplePinyin: 'dà', unit: 1 },
  { id: 'ym_o', pinyin: 'o', type: 'yunmu', sound: '喔', exampleChar: '婆', examplePinyin: 'pó', unit: 1 },
  { id: 'ym_e', pinyin: 'e', type: 'yunmu', sound: '鹅', exampleChar: '鹅', examplePinyin: 'é', unit: 1 },
  { id: 'ym_i', pinyin: 'i', type: 'yunmu', sound: '衣', exampleChar: '一', examplePinyin: 'yī', unit: 2 },
  { id: 'ym_u', pinyin: 'u', type: 'yunmu', sound: '乌', exampleChar: '木', examplePinyin: 'mù', unit: 2 },
  { id: 'ym_v', pinyin: 'ü', type: 'yunmu', sound: '迂', exampleChar: '鱼', examplePinyin: 'yú', unit: 2 },
  { id: 'ym_ai', pinyin: 'ai', type: 'yunmu', sound: '爱', exampleChar: '白', examplePinyin: 'bái', unit: 3 },
  { id: 'ym_ei', pinyin: 'ei', type: 'yunmu', sound: '诶', exampleChar: '飞', examplePinyin: 'fēi', unit: 3 },
  { id: 'ym_ui', pinyin: 'ui', type: 'yunmu', sound: '威', exampleChar: '水', examplePinyin: 'shuǐ', unit: 3 },
  { id: 'ym_ao', pinyin: 'ao', type: 'yunmu', sound: '凹', exampleChar: '好', examplePinyin: 'hǎo', unit: 3 },
  { id: 'ym_ou', pinyin: 'ou', type: 'yunmu', sound: '欧', exampleChar: '手', examplePinyin: 'shǒu', unit: 3 },
  { id: 'ym_iu', pinyin: 'iu', type: 'yunmu', sound: '优', exampleChar: '六', examplePinyin: 'liù', unit: 3 },
  { id: 'ym_ie', pinyin: 'ie', type: 'yunmu', sound: '耶', exampleChar: '写', examplePinyin: 'xiě', unit: 4 },
  { id: 'ym_ve', pinyin: 'üe', type: 'yunmu', sound: '约', exampleChar: '月', examplePinyin: 'yuè', unit: 4 },
  { id: 'ym_er', pinyin: 'er', type: 'yunmu', sound: '耳', exampleChar: '二', examplePinyin: 'èr', unit: 4 },
  { id: 'ym_an', pinyin: 'an', type: 'yunmu', sound: '安', exampleChar: '山', examplePinyin: 'shān', unit: 5 },
  { id: 'ym_en', pinyin: 'en', type: 'yunmu', sound: '恩', exampleChar: '人', examplePinyin: 'rén', unit: 5 },
  { id: 'ym_in', pinyin: 'in', type: 'yunmu', sound: '因', exampleChar: '心', examplePinyin: 'xīn', unit: 5 },
  { id: 'ym_un', pinyin: 'un', type: 'yunmu', sound: '温', exampleChar: '文', examplePinyin: 'wén', unit: 5 },
  { id: 'ym_vn', pinyin: 'ün', type: 'yunmu', sound: '晕', exampleChar: '云', examplePinyin: 'yún', unit: 5 },
  { id: 'ym_ang', pinyin: 'ang', type: 'yunmu', sound: '昂', exampleChar: '王', examplePinyin: 'wáng', unit: 6 },
  { id: 'ym_eng', pinyin: 'eng', type: 'yunmu', sound: '鞥', exampleChar: '风', examplePinyin: 'fēng', unit: 6 },
  { id: 'ym_ing', pinyin: 'ing', type: 'yunmu', sound: '英', exampleChar: '星', examplePinyin: 'xīng', unit: 6 },
  { id: 'ym_ong', pinyin: 'ong', type: 'yunmu', sound: '翁的韵母', exampleChar: '中', examplePinyin: 'zhōng', unit: 6 },
]

// 整体认读音节 16个
export const ZHENGTI: PinyinData[] = [
  { id: 'zt_zhi', pinyin: 'zhi', type: 'zhengti', sound: '枝', exampleChar: '知', examplePinyin: 'zhī', unit: 5 },
  { id: 'zt_chi', pinyin: 'chi', type: 'zhengti', sound: '吃', exampleChar: '吃', examplePinyin: 'chī', unit: 5 },
  { id: 'zt_shi', pinyin: 'shi', type: 'zhengti', sound: '狮', exampleChar: '十', examplePinyin: 'shí', unit: 5 },
  { id: 'zt_ri', pinyin: 'ri', type: 'zhengti', sound: '日', exampleChar: '日', examplePinyin: 'rì', unit: 5 },
  { id: 'zt_zi', pinyin: 'zi', type: 'zhengti', sound: '资', exampleChar: '字', examplePinyin: 'zì', unit: 6 },
  { id: 'zt_ci', pinyin: 'ci', type: 'zhengti', sound: '次', exampleChar: '词', examplePinyin: 'cí', unit: 6 },
  { id: 'zt_si', pinyin: 'si', type: 'zhengti', sound: '思', exampleChar: '四', examplePinyin: 'sì', unit: 6 },
  { id: 'zt_yi', pinyin: 'yi', type: 'zhengti', sound: '衣', exampleChar: '一', examplePinyin: 'yī', unit: 2 },
  { id: 'zt_wu', pinyin: 'wu', type: 'zhengti', sound: '乌', exampleChar: '五', examplePinyin: 'wǔ', unit: 2 },
  { id: 'zt_yu', pinyin: 'yu', type: 'zhengti', sound: '鱼', exampleChar: '鱼', examplePinyin: 'yú', unit: 2 },
  { id: 'zt_ye', pinyin: 'ye', type: 'zhengti', sound: '叶', exampleChar: '叶', examplePinyin: 'yè', unit: 4 },
  { id: 'zt_yue', pinyin: 'yue', type: 'zhengti', sound: '月', exampleChar: '月', examplePinyin: 'yuè', unit: 4 },
  { id: 'zt_yuan', pinyin: 'yuan', type: 'zhengti', sound: '圆', exampleChar: '圆', examplePinyin: 'yuán', unit: 5 },
  { id: 'zt_yin', pinyin: 'yin', type: 'zhengti', sound: '因', exampleChar: '因', examplePinyin: 'yīn', unit: 5 },
  { id: 'zt_yun', pinyin: 'yun', type: 'zhengti', sound: '云', exampleChar: '云', examplePinyin: 'yún', unit: 5 },
  { id: 'zt_ying', pinyin: 'ying', type: 'zhengti', sound: '鹰', exampleChar: '鹰', examplePinyin: 'yīng', unit: 6 },
]

export const ALL_PINYIN = [...SHENGMU, ...YUNMU, ...ZHENGTI]

export function getPinyinByUnit(unit: number): PinyinData[] {
  return ALL_PINYIN.filter(p => p.unit === unit)
}

// ===== 拼读音节表 =====
import type { SyllableData, TonePractice } from '../types'

// 常见音节组合（两拼法）
export const SYLLABLES: SyllableData[] = [
  // b + 单韵母
  { id: 'syl_ba', syllable: 'ba', initial: 'b', final: 'a', tone: 1, exampleChar: '八', exampleWord: '八个', level: 1 },
  { id: 'syl_bo', syllable: 'bo', initial: 'b', final: 'o', tone: 1, exampleChar: '波', exampleWord: '波浪', level: 1 },
  { id: 'syl_bi', syllable: 'bi', initial: 'b', final: 'i', tone: 3, exampleChar: '笔', exampleWord: '铅笔', level: 1 },
  { id: 'syl_bu', syllable: 'bu', initial: 'b', final: 'u', tone: 4, exampleChar: '不', exampleWord: '不是', level: 1 },
  // p + 单韵母
  { id: 'syl_pa', syllable: 'pa', initial: 'p', final: 'a', tone: 4, exampleChar: '怕', exampleWord: '害怕', level: 1 },
  { id: 'syl_po', syllable: 'po', initial: 'p', final: 'o', tone: 2, exampleChar: '婆', exampleWord: '外婆', level: 1 },
  { id: 'syl_pi', syllable: 'pi', initial: 'p', final: 'i', tone: 2, exampleChar: '皮', exampleWord: '皮肤', level: 1 },
  { id: 'syl_pu', syllable: 'pu', initial: 'p', final: 'u', tone: 3, exampleChar: '普', exampleWord: '普通', level: 1 },
  // m + 单韵母
  { id: 'syl_ma', syllable: 'ma', initial: 'm', final: 'a', tone: 1, exampleChar: '妈', exampleWord: '妈妈', level: 1 },
  { id: 'syl_mo', syllable: 'mo', initial: 'm', final: 'o', tone: 1, exampleChar: '摸', exampleWord: '摸一摸', level: 1 },
  { id: 'syl_mi', syllable: 'mi', initial: 'm', final: 'i', tone: 3, exampleChar: '米', exampleWord: '大米', level: 1 },
  { id: 'syl_mu', syllable: 'mu', initial: 'm', final: 'u', tone: 4, exampleChar: '木', exampleWord: '木头', level: 1 },
  // f + 单韵母
  { id: 'syl_fa', syllable: 'fa', initial: 'f', final: 'a', tone: 1, exampleChar: '发', exampleWord: '发现', level: 1 },
  { id: 'syl_fo', syllable: 'fo', initial: 'f', final: 'o', tone: 2, exampleChar: '佛', exampleWord: '佛像', level: 1 },
  { id: 'syl_fu', syllable: 'fu', initial: 'f', final: 'u', tone: 4, exampleChar: '父', exampleWord: '父亲', level: 1 },
  // d + 单韵母
  { id: 'syl_da', syllable: 'da', initial: 'd', final: 'a', tone: 4, exampleChar: '大', exampleWord: '大小', level: 1 },
  { id: 'syl_de', syllable: 'de', initial: 'd', final: 'e', tone: 2, exampleChar: '得', exampleWord: '得到', level: 1 },
  { id: 'syl_di', syllable: 'di', initial: 'd', final: 'i', tone: 4, exampleChar: '地', exampleWord: '大地', level: 1 },
  { id: 'syl_du', syllable: 'du', initial: 'd', final: 'u', tone: 2, exampleChar: '读', exampleWord: '读书', level: 1 },
  // t + 单韵母
  { id: 'syl_ta', syllable: 'ta', initial: 't', final: 'a', tone: 1, exampleChar: '他', exampleWord: '他们', level: 1 },
  { id: 'syl_te', syllable: 'te', initial: 't', final: 'e', tone: 4, exampleChar: '特', exampleWord: '特别', level: 1 },
  { id: 'syl_ti', syllable: 'ti', initial: 't', final: 'i', tone: 3, exampleChar: '体', exampleWord: '身体', level: 1 },
  { id: 'syl_tu', syllable: 'tu', initial: 't', final: 'u', tone: 3, exampleChar: '土', exampleWord: '土地', level: 1 },
  // n + 单韵母
  { id: 'syl_na', syllable: 'na', initial: 'n', final: 'a', tone: 2, exampleChar: '拿', exampleWord: '拿来', level: 1 },
  { id: 'syl_ne', syllable: 'ne', initial: 'n', final: 'e', tone: 0, exampleChar: '呢', exampleWord: '你呢', level: 1 },
  { id: 'syl_ni', syllable: 'ni', initial: 'n', final: 'i', tone: 3, exampleChar: '你', exampleWord: '你好', level: 1 },
  { id: 'syl_nu', syllable: 'nu', initial: 'n', final: 'u', tone: 3, exampleChar: '努', exampleWord: '努力', level: 1 },
  { id: 'syl_nv', syllable: 'nü', initial: 'n', final: 'ü', tone: 3, exampleChar: '女', exampleWord: '女孩', level: 2 },
  // l + 单韵母
  { id: 'syl_la', syllable: 'la', initial: 'l', final: 'a', tone: 1, exampleChar: '拉', exampleWord: '拉手', level: 1 },
  { id: 'syl_le', syllable: 'le', initial: 'l', final: 'e', tone: 4, exampleChar: '乐', exampleWord: '快乐', level: 1 },
  { id: 'syl_li', syllable: 'li', initial: 'l', final: 'i', tone: 4, exampleChar: '力', exampleWord: '力气', level: 1 },
  { id: 'syl_lu', syllable: 'lu', initial: 'l', final: 'u', tone: 4, exampleChar: '路', exampleWord: '马路', level: 1 },
  { id: 'syl_lv', syllable: 'lü', initial: 'l', final: 'ü', tone: 4, exampleChar: '绿', exampleWord: '绿色', level: 2 },
  // g k h + 单韵母
  { id: 'syl_ga', syllable: 'ga', initial: 'g', final: 'a', tone: 1, exampleChar: '嘎', exampleWord: '嘎嘎叫', level: 2 },
  { id: 'syl_ge', syllable: 'ge', initial: 'g', final: 'e', tone: 1, exampleChar: '歌', exampleWord: '唱歌', level: 1 },
  { id: 'syl_gu', syllable: 'gu', initial: 'g', final: 'u', tone: 3, exampleChar: '古', exampleWord: '古代', level: 2 },
  { id: 'syl_ka', syllable: 'ka', initial: 'k', final: 'a', tone: 3, exampleChar: '卡', exampleWord: '卡片', level: 2 },
  { id: 'syl_ke', syllable: 'ke', initial: 'k', final: 'e', tone: 3, exampleChar: '可', exampleWord: '可以', level: 1 },
  { id: 'syl_ku', syllable: 'ku', initial: 'k', final: 'u', tone: 1, exampleChar: '哭', exampleWord: '哭了', level: 2 },
  { id: 'syl_ha', syllable: 'ha', initial: 'h', final: 'a', tone: 1, exampleChar: '哈', exampleWord: '哈哈笑', level: 1 },
  { id: 'syl_he', syllable: 'he', initial: 'h', final: 'e', tone: 1, exampleChar: '喝', exampleWord: '喝水', level: 1 },
  { id: 'syl_hu', syllable: 'hu', initial: 'h', final: 'u', tone: 3, exampleChar: '虎', exampleWord: '老虎', level: 2 },
  // j q x + i
  { id: 'syl_ji', syllable: 'ji', initial: 'j', final: 'i', tone: 1, exampleChar: '鸡', exampleWord: '小鸡', level: 2 },
  { id: 'syl_qi', syllable: 'qi', initial: 'q', final: 'i', tone: 1, exampleChar: '七', exampleWord: '七个', level: 2 },
  { id: 'syl_xi', syllable: 'xi', initial: 'x', final: 'i', tone: 3, exampleChar: '洗', exampleWord: '洗手', level: 2 },
  // j q x + ü (u上两点省略)
  { id: 'syl_ju', syllable: 'ju', initial: 'j', final: 'ü', tone: 3, exampleChar: '举', exampleWord: '举手', level: 3 },
  { id: 'syl_qu', syllable: 'qu', initial: 'q', final: 'ü', tone: 4, exampleChar: '去', exampleWord: '出去', level: 2 },
  { id: 'syl_xu', syllable: 'xu', initial: 'x', final: 'ü', tone: 1, exampleChar: '需', exampleWord: '需要', level: 3 },
  // zh ch sh r + i (整体认读)
  { id: 'syl_zhi', syllable: 'zhi', initial: 'zh', final: 'i', tone: 1, exampleChar: '知', exampleWord: '知道', level: 3 },
  { id: 'syl_chi', syllable: 'chi', initial: 'ch', final: 'i', tone: 1, exampleChar: '吃', exampleWord: '吃饭', level: 2 },
  { id: 'syl_shi', syllable: 'shi', initial: 'sh', final: 'i', tone: 4, exampleChar: '是', exampleWord: '是的', level: 2 },
  { id: 'syl_ri', syllable: 'ri', initial: 'r', final: 'i', tone: 4, exampleChar: '日', exampleWord: '日子', level: 3 },
  // z c s + i (整体认读)
  { id: 'syl_zi', syllable: 'zi', initial: 'z', final: 'i', tone: 4, exampleChar: '字', exampleWord: '写字', level: 3 },
  { id: 'syl_ci', syllable: 'ci', initial: 'c', final: 'i', tone: 2, exampleChar: '词', exampleWord: '词语', level: 3 },
  { id: 'syl_si', syllable: 'si', initial: 's', final: 'i', tone: 4, exampleChar: '四', exampleWord: '四个', level: 3 },
  // 复韵母组合
  { id: 'syl_bai', syllable: 'bai', initial: 'b', final: 'ai', tone: 2, exampleChar: '白', exampleWord: '白色', level: 3 },
  { id: 'syl_mei', syllable: 'mei', initial: 'm', final: 'ei', tone: 3, exampleChar: '美', exampleWord: '美丽', level: 3 },
  { id: 'syl_hao', syllable: 'hao', initial: 'h', final: 'ao', tone: 3, exampleChar: '好', exampleWord: '你好', level: 2 },
  { id: 'syl_gou', syllable: 'gou', initial: 'g', final: 'ou', tone: 3, exampleChar: '狗', exampleWord: '小狗', level: 2 },
  { id: 'syl_xie', syllable: 'xie', initial: 'x', final: 'ie', tone: 3, exampleChar: '写', exampleWord: '写字', level: 3 },
  { id: 'syl_yue', syllable: 'yue', initial: 'y', final: 'üe', tone: 4, exampleChar: '月', exampleWord: '月亮', level: 3 },
  // 鼻韵母组合
  { id: 'syl_kan', syllable: 'kan', initial: 'k', final: 'an', tone: 4, exampleChar: '看', exampleWord: '看见', level: 3 },
  { id: 'syl_men', syllable: 'men', initial: 'm', final: 'en', tone: 2, exampleChar: '门', exampleWord: '大门', level: 3 },
  { id: 'syl_xin', syllable: 'xin', initial: 'x', final: 'in', tone: 1, exampleChar: '心', exampleWord: '开心', level: 3 },
  { id: 'syl_chang', syllable: 'chang', initial: 'ch', final: 'ang', tone: 4, exampleChar: '唱', exampleWord: '唱歌', level: 4 },
  { id: 'syl_feng', syllable: 'feng', initial: 'f', final: 'eng', tone: 1, exampleChar: '风', exampleWord: '大风', level: 4 },
  { id: 'syl_ming', syllable: 'ming', initial: 'm', final: 'ing', tone: 2, exampleChar: '明', exampleWord: '明天', level: 4 },
  { id: 'syl_zhong', syllable: 'zhong', initial: 'zh', final: 'ong', tone: 1, exampleChar: '中', exampleWord: '中国', level: 4 },
  // 更多复韵母组合
  { id: 'syl_bao', syllable: 'bao', initial: 'b', final: 'ao', tone: 3, exampleChar: '宝', exampleWord: '宝贝', level: 3 },
  { id: 'syl_pao', syllable: 'pao', initial: 'p', final: 'ao', tone: 3, exampleChar: '跑', exampleWord: '跑步', level: 3 },
  { id: 'syl_mao', syllable: 'mao', initial: 'm', final: 'ao', tone: 1, exampleChar: '猫', exampleWord: '小猫', level: 2 },
  { id: 'syl_dao', syllable: 'dao', initial: 'd', final: 'ao', tone: 4, exampleChar: '到', exampleWord: '到达', level: 3 },
  { id: 'syl_tao', syllable: 'tao', initial: 't', final: 'ao', tone: 2, exampleChar: '桃', exampleWord: '桃子', level: 3 },
  { id: 'syl_nao', syllable: 'nao', initial: 'n', final: 'ao', tone: 3, exampleChar: '脑', exampleWord: '大脑', level: 3 },
  { id: 'syl_lao', syllable: 'lao', initial: 'l', final: 'ao', tone: 3, exampleChar: '老', exampleWord: '老师', level: 2 },
  { id: 'syl_gao', syllable: 'gao', initial: 'g', final: 'ao', tone: 1, exampleChar: '高', exampleWord: '高大', level: 3 },
  { id: 'syl_kao', syllable: 'kao', initial: 'k', final: 'ao', tone: 3, exampleChar: '考', exampleWord: '考试', level: 4 },
  { id: 'syl_zhao', syllable: 'zhao', initial: 'zh', final: 'ao', tone: 3, exampleChar: '找', exampleWord: '找到', level: 3 },
  { id: 'syl_shao', syllable: 'shao', initial: 'sh', final: 'ao', tone: 3, exampleChar: '少', exampleWord: '多少', level: 3 },
  { id: 'syl_yao', syllable: 'yao', initial: 'y', final: 'ao', tone: 4, exampleChar: '要', exampleWord: '需要', level: 2 },
  // ai/ei/ui 更多组合
  { id: 'syl_pai', syllable: 'pai', initial: 'p', final: 'ai', tone: 2, exampleChar: '排', exampleWord: '排队', level: 3 },
  { id: 'syl_mai', syllable: 'mai', initial: 'm', final: 'ai', tone: 3, exampleChar: '买', exampleWord: '买东西', level: 2 },
  { id: 'syl_dai', syllable: 'dai', initial: 'd', final: 'ai', tone: 4, exampleChar: '带', exampleWord: '带领', level: 3 },
  { id: 'syl_tai', syllable: 'tai', initial: 't', final: 'ai', tone: 4, exampleChar: '太', exampleWord: '太阳', level: 2 },
  { id: 'syl_nai', syllable: 'nai', initial: 'n', final: 'ai', tone: 3, exampleChar: '奶', exampleWord: '牛奶', level: 2 },
  { id: 'syl_lai', syllable: 'lai', initial: 'l', final: 'ai', tone: 2, exampleChar: '来', exampleWord: '过来', level: 1 },
  { id: 'syl_kai', syllable: 'kai', initial: 'k', final: 'ai', tone: 1, exampleChar: '开', exampleWord: '开门', level: 2 },
  { id: 'syl_hai', syllable: 'hai', initial: 'h', final: 'ai', tone: 2, exampleChar: '还', exampleWord: '还有', level: 2 },
  { id: 'syl_zhai', syllable: 'zhai', initial: 'zh', final: 'ai', tone: 1, exampleChar: '摘', exampleWord: '摘花', level: 4 },
  { id: 'syl_chai', syllable: 'chai', initial: 'ch', final: 'ai', tone: 1, exampleChar: '拆', exampleWord: '拆开', level: 4 },
  { id: 'syl_zai', syllable: 'zai', initial: 'z', final: 'ai', tone: 4, exampleChar: '在', exampleWord: '现在', level: 2 },
  { id: 'syl_cai', syllable: 'cai', initial: 'c', final: 'ai', tone: 4, exampleChar: '菜', exampleWord: '白菜', level: 3 },
  { id: 'syl_sai', syllable: 'sai', initial: 's', final: 'ai', tone: 1, exampleChar: '塞', exampleWord: '塞住', level: 4 },
  { id: 'syl_fei', syllable: 'fei', initial: 'f', final: 'ei', tone: 1, exampleChar: '飞', exampleWord: '飞机', level: 2 },
  { id: 'syl_gei', syllable: 'gei', initial: 'g', final: 'ei', tone: 3, exampleChar: '给', exampleWord: '送给', level: 2 },
  { id: 'syl_hei', syllable: 'hei', initial: 'h', final: 'ei', tone: 1, exampleChar: '黑', exampleWord: '黑色', level: 3 },
  { id: 'syl_wei', syllable: 'wei', initial: 'w', final: 'ei', tone: 4, exampleChar: '为', exampleWord: '因为', level: 2 },
  { id: 'syl_hui', syllable: 'hui', initial: 'h', final: 'ui', tone: 4, exampleChar: '会', exampleWord: '开会', level: 2 },
  { id: 'syl_shui', syllable: 'shui', initial: 'sh', final: 'ui', tone: 3, exampleChar: '水', exampleWord: '喝水', level: 2 },
  // 更多鼻韵母组合
  { id: 'syl_ban', syllable: 'ban', initial: 'b', final: 'an', tone: 1, exampleChar: '班', exampleWord: '班级', level: 3 },
  { id: 'syl_pan', syllable: 'pan', initial: 'p', final: 'an', tone: 2, exampleChar: '盘', exampleWord: '盘子', level: 3 },
  { id: 'syl_man', syllable: 'man', initial: 'm', final: 'an', tone: 4, exampleChar: '慢', exampleWord: '慢慢', level: 2 },
  { id: 'syl_fan', syllable: 'fan', initial: 'f', final: 'an', tone: 4, exampleChar: '饭', exampleWord: '吃饭', level: 1 },
  { id: 'syl_dan', syllable: 'dan', initial: 'd', final: 'an', tone: 4, exampleChar: '蛋', exampleWord: '鸡蛋', level: 2 },
  { id: 'syl_tan', syllable: 'tan', initial: 't', final: 'an', tone: 1, exampleChar: '天', exampleWord: '天气', level: 3 },
  { id: 'syl_nan', syllable: 'nan', initial: 'n', final: 'an', tone: 2, exampleChar: '男', exampleWord: '男孩', level: 2 },
  { id: 'syl_lan', syllable: 'lan', initial: 'l', final: 'an', tone: 2, exampleChar: '蓝', exampleWord: '蓝色', level: 2 },
  { id: 'syl_gan', syllable: 'gan', initial: 'g', final: 'an', tone: 3, exampleChar: '感', exampleWord: '感谢', level: 3 },
  { id: 'syl_han', syllable: 'han', initial: 'h', final: 'an', tone: 4, exampleChar: '汗', exampleWord: '出汗', level: 3 },
  { id: 'syl_zhan', syllable: 'zhan', initial: 'zh', final: 'an', tone: 4, exampleChar: '站', exampleWord: '站立', level: 2 },
  { id: 'syl_shan', syllable: 'shan', initial: 'sh', final: 'an', tone: 1, exampleChar: '山', exampleWord: '大山', level: 1 },
  { id: 'syl_ran', syllable: 'ran', initial: 'r', final: 'an', tone: 2, exampleChar: '然', exampleWord: '然后', level: 3 },
  { id: 'syl_san', syllable: 'san', initial: 's', final: 'an', tone: 1, exampleChar: '三', exampleWord: '三个', level: 1 },
  ]

// ===== 声调练习组 =====
export const TONE_PRACTICE: TonePractice[] = [
  { id: 'tone_a', baseSyllable: 'a', tones: ['ā', 'á', 'ǎ', 'à'], examples: ['阿姨', '啊？', '啊！', '啊。'] },
  { id: 'tone_o', baseSyllable: 'o', tones: ['ō', 'ó', 'ǒ', 'ò'], examples: ['喔！', '哦？', '我？', '哦～'] },
  { id: 'tone_e', baseSyllable: 'e', tones: ['ē', 'é', 'ě', 'è'], examples: ['阿胶', '鹅', '恶心', '饿'] },
  { id: 'tone_i', baseSyllable: 'i', tones: ['ī', 'í', 'ǐ', 'ì'], examples: ['一', '阿姨', '椅子', '意思'] },
  { id: 'tone_u', baseSyllable: 'u', tones: ['ū', 'ú', 'ǔ', 'ù'], examples: ['乌', '无用', '五', '雾'] },
  { id: 'tone_v', baseSyllable: 'ü', tones: ['ǖ', 'ǘ', 'ǚ', 'ǜ'], examples: ['迂', '鱼', '雨', '玉'] },
  { id: 'tone_ma', baseSyllable: 'ma', tones: ['mā', 'má', 'mǎ', 'mà'], examples: ['妈妈', '麻烦', '马上', '骂人'] },
  { id: 'tone_ba', baseSyllable: 'ba', tones: ['bā', 'bá', 'bǎ', 'bà'], examples: ['八', '拔', '把', '爸爸'] },
  { id: 'tone_da', baseSyllable: 'da', tones: ['dā', 'dá', 'dǎ', 'dà'], examples: ['搭', '答案', '打', '大'] },
  { id: 'tone_fa', baseSyllable: 'fa', tones: ['fā', 'fá', 'fǎ', 'fà'], examples: ['发', '罚', '法', '发卡'] },
  { id: 'tone_ta', baseSyllable: 'ta', tones: ['tā', 'tá', 'tǎ', 'tà'], examples: ['他', '塔？', '塔', '踏'] },
  { id: 'tone_na', baseSyllable: 'na', tones: ['nā', 'ná', 'nǎ', 'nà'], examples: ['那吗', '拿', '哪里', '那'] },
  { id: 'tone_la', baseSyllable: 'la', tones: ['lā', 'lá', 'lǎ', 'là'], examples: ['拉', '辣？', '喇叭', '辣'] },
  { id: 'tone_gao', baseSyllable: 'gao', tones: ['gāo', 'gáo', 'gǎo', 'gào'], examples: ['高', '稿？', '稿', '告诉'] },
  { id: 'tone_kan', baseSyllable: 'kan', tones: ['kān', 'kán', 'kǎn', 'kàn'], examples: ['看门', '砍？', '砍', '看见'] },
  { id: 'tone_shu', baseSyllable: 'shu', tones: ['shū', 'shú', 'shǔ', 'shù'], examples: ['书', '熟', '数', '树'] },
  { id: 'tone_hua', baseSyllable: 'hua', tones: ['huā', 'huá', 'huǎ', 'huà'], examples: ['花', '滑', '话？', '画'] },
  { id: 'tone_tian', baseSyllable: 'tian', tones: ['tiān', 'tián', 'tiǎn', 'tiàn'], examples: ['天', '甜', '舔', '添'] },
  { id: 'tone_san', baseSyllable: 'san', tones: ['sān', 'sán', 'sǎn', 'sàn'], examples: ['三', '伞？', '伞', '散'] },
  { id: 'tone_yu', baseSyllable: 'yu', tones: ['yū', 'yú', 'yǔ', 'yù'], examples: ['迂', '鱼', '雨', '玉'] },
]

// ===== 拼音儿歌 =====
export const PINYIN_SONGS = [
  {
    id: 'song_shengmu',
    title: '声母歌',
    content: `b p m f d t n l
g k h j q x
zh ch sh r z c s
y w 二十三个声母
记住它们学拼音`,
  },
  {
    id: 'song_yunmu',
    title: '韵母歌',
    content: `a o e i u ü
六个单韵母先记住
ai ei ui ao ou iu
ie üe er 复韵母要熟练
an en in un ün
ang eng ing ong 鼻韵母记心中`,
  },
  {
    id: 'song_zhengti',
    title: '整体认读音节歌',
    content: `zhi chi shi ri
zi ci si 还有 yi wu yu
ye yue yuan yin yun ying
十六个整体认读音节
不拼直接读出来`,
  },
  {
    id: 'song_tone',
    title: '声调歌',
    content: `一声高高平又平 —
二声上山爬上坡 /
三声下坡又上坡 V
四声下山直落下 \\`,
  },
  {
    id: 'song_spell',
    title: '拼读歌',
    content: `前音轻短后音重
两音相连猛一碰
声母轻，韵母重
快速拼读别放松`,
  },
  {
    id: 'song_uv',
    title: 'ü 字歌',
    content: `小 ü 小 ü 有礼貌
见到 j q x 就摘帽
j q x 真淘气
见到 ü 点就去掉
还有 y 也一样
ü 和 y 在一起
去掉两点读 ü 音`,
  },
]

// 按学习层级获取音节
export function getSyllablesByLevel(level: number): SyllableData[] {
  return SYLLABLES.filter(s => s.level <= level)
}
