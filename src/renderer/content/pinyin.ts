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

  // === 扩充满音节表 ===

  // b + 复韵母/鼻韵母
  { id: 'syl_bei', syllable: 'bei', initial: 'b', final: 'ei', tone: 4, exampleChar: '被', exampleWord: '被子', level: 2 },
  { id: 'syl_bie', syllable: 'bie', initial: 'b', final: 'ie', tone: 2, exampleChar: '别', exampleWord: '别人', level: 3 },
  { id: 'syl_biao', syllable: 'biao', initial: 'b', final: 'iao', tone: 3, exampleChar: '表', exampleWord: '手表', level: 3 },
  { id: 'syl_bian', syllable: 'bian', initial: 'b', final: 'ian', tone: 4, exampleChar: '变', exampleWord: '变化', level: 3 },
  { id: 'syl_bin', syllable: 'bin', initial: 'b', final: 'in', tone: 1, exampleChar: '宾', exampleWord: '宾馆', level: 4 },
  { id: 'syl_bing', syllable: 'bing', initial: 'b', final: 'ing', tone: 1, exampleChar: '冰', exampleWord: '冰雪', level: 3 },
  { id: 'syl_bang', syllable: 'bang', initial: 'b', final: 'ang', tone: 1, exampleChar: '帮', exampleWord: '帮助', level: 3 },
  { id: 'syl_beng', syllable: 'beng', initial: 'b', final: 'eng', tone: 4, exampleChar: '蹦', exampleWord: '蹦跳', level: 4 },
  { id: 'syl_ben', syllable: 'ben', initial: 'b', final: 'en', tone: 3, exampleChar: '本', exampleWord: '书本', level: 2 },

  // p + 复韵母/鼻韵母
  { id: 'syl_pei', syllable: 'pei', initial: 'p', final: 'ei', tone: 2, exampleChar: '陪', exampleWord: '陪伴', level: 3 },
  { id: 'syl_pie', syllable: 'pie', initial: 'p', final: 'ie', tone: 3, exampleChar: '撇', exampleWord: '撇开', level: 4 },
  { id: 'syl_piao', syllable: 'piao', initial: 'p', final: 'iao', tone: 4, exampleChar: '票', exampleWord: '车票', level: 3 },
  { id: 'syl_pian', syllable: 'pian', initial: 'p', final: 'ian', tone: 4, exampleChar: '片', exampleWord: '一片', level: 3 },
  { id: 'syl_pin', syllable: 'pin', initial: 'p', final: 'in', tone: 2, exampleChar: '苹', exampleWord: '苹果', level: 3 },
  { id: 'syl_ping', syllable: 'ping', initial: 'p', final: 'ing', tone: 2, exampleChar: '平', exampleWord: '平安', level: 3 },
  { id: 'syl_pang', syllable: 'pang', initial: 'p', final: 'ang', tone: 4, exampleChar: '胖', exampleWord: '胖子', level: 3 },
  { id: 'syl_peng', syllable: 'peng', initial: 'p', final: 'eng', tone: 2, exampleChar: '朋', exampleWord: '朋友', level: 2 },
  { id: 'syl_pen', syllable: 'pen', initial: 'p', final: 'en', tone: 2, exampleChar: '盆', exampleWord: '花盆', level: 3 },
  { id: 'syl_pou', syllable: 'pou', initial: 'p', final: 'ou', tone: 3, exampleChar: '剖', exampleWord: '解剖', level: 5 },

  // m + 复韵母/鼻韵母
  { id: 'syl_mie', syllable: 'mie', initial: 'm', final: 'ie', tone: 4, exampleChar: '灭', exampleWord: '灭火', level: 3 },
  { id: 'syl_miao', syllable: 'miao', initial: 'm', final: 'iao', tone: 4, exampleChar: '妙', exampleWord: '美妙', level: 3 },
  { id: 'syl_miu', syllable: 'miu', initial: 'm', final: 'iu', tone: 4, exampleChar: '谬', exampleWord: '错误', level: 5 },
  { id: 'syl_mian', syllable: 'mian', initial: 'm', final: 'ian', tone: 4, exampleChar: '面', exampleWord: '面条', level: 2 },
  { id: 'syl_min', syllable: 'min', initial: 'm', final: 'in', tone: 2, exampleChar: '民', exampleWord: '人民', level: 3 },
  { id: 'syl_ming2', syllable: 'ming', initial: 'm', final: 'ing', tone: 4, exampleChar: '命', exampleWord: '生命', level: 4 },
  { id: 'syl_mang', syllable: 'mang', initial: 'm', final: 'ang', tone: 2, exampleChar: '忙', exampleWord: '帮忙', level: 3 },
  { id: 'syl_meng', syllable: 'meng', initial: 'm', final: 'eng', tone: 4, exampleChar: '梦', exampleWord: '做梦', level: 3 },
  { id: 'syl_men2', syllable: 'men', initial: 'm', final: 'en', tone: 0, exampleChar: '们', exampleWord: '我们', level: 1 },
  { id: 'syl_mou', syllable: 'mou', initial: 'm', final: 'ou', tone: 3, exampleChar: '某', exampleWord: '某个', level: 4 },

  // f + 复韵母/鼻韵母
  { id: 'syl_fou', syllable: 'fou', initial: 'f', final: 'ou', tone: 3, exampleChar: '否', exampleWord: '否定', level: 4 },
  { id: 'syl_fen', syllable: 'fen', initial: 'f', final: 'en', tone: 1, exampleChar: '分', exampleWord: '分开', level: 3 },
  { id: 'syl_fang', syllable: 'fang', initial: 'f', final: 'ang', tone: 2, exampleChar: '房', exampleWord: '房子', level: 2 },
  { id: 'syl_fan2', syllable: 'fan', initial: 'f', final: 'an', tone: 1, exampleChar: '翻', exampleWord: '翻开', level: 3 },

  // d + 复韵母/鼻韵母
  { id: 'syl_dei', syllable: 'dei', initial: 'd', final: 'ei', tone: 3, exampleChar: '得', exampleWord: '得去', level: 4 },
  { id: 'syl_dui', syllable: 'dui', initial: 'd', final: 'ui', tone: 4, exampleChar: '对', exampleWord: '不对', level: 2 },
  { id: 'syl_diu', syllable: 'diu', initial: 'd', final: 'iu', tone: 1, exampleChar: '丢', exampleWord: '丢失', level: 3 },
  { id: 'syl_die', syllable: 'die', initial: 'd', final: 'ie', tone: 1, exampleChar: '爹', exampleWord: '爹爹', level: 3 },
  { id: 'syl_diao', syllable: 'diao', initial: 'd', final: 'iao', tone: 4, exampleChar: '掉', exampleWord: '掉下', level: 3 },
  { id: 'syl_dian', syllable: 'dian', initial: 'd', final: 'ian', tone: 3, exampleChar: '点', exampleWord: '一点', level: 2 },
  { id: 'syl_duan', syllable: 'duan', initial: 'd', final: 'uan', tone: 3, exampleChar: '短', exampleWord: '长短', level: 3 },
  { id: 'syl_dun', syllable: 'dun', initial: 'd', final: 'un', tone: 1, exampleChar: '蹲', exampleWord: '蹲下', level: 3 },
  { id: 'syl_dang', syllable: 'dang', initial: 'd', final: 'ang', tone: 1, exampleChar: '当', exampleWord: '当然', level: 3 },
  { id: 'syl_deng', syllable: 'deng', initial: 'd', final: 'eng', tone: 1, exampleChar: '灯', exampleWord: '灯光', level: 2 },
  { id: 'syl_ding', syllable: 'ding', initial: 'd', final: 'ing', tone: 1, exampleChar: '丁', exampleWord: '园丁', level: 3 },
  { id: 'syl_dong', syllable: 'dong', initial: 'd', final: 'ong', tone: 1, exampleChar: '东', exampleWord: '东方', level: 2 },

  // t + 复韵母/鼻韵母
  { id: 'syl_tui', syllable: 'tui', initial: 't', final: 'ui', tone: 1, exampleChar: '推', exampleWord: '推开', level: 3 },
  { id: 'syl_tie', syllable: 'tie', initial: 't', final: 'ie', tone: 3, exampleChar: '铁', exampleWord: '钢铁', level: 3 },
  { id: 'syl_tiao', syllable: 'tiao', initial: 't', final: 'iao', tone: 4, exampleChar: '跳', exampleWord: '跳舞', level: 2 },
  { id: 'syl_tian2', syllable: 'tian', initial: 't', final: 'ian', tone: 2, exampleChar: '甜', exampleWord: '甜蜜', level: 2 },
  { id: 'syl_tuan', syllable: 'tuan', initial: 't', final: 'uan', tone: 2, exampleChar: '团', exampleWord: '团结', level: 3 },
  { id: 'syl_tun', syllable: 'tun', initial: 't', final: 'un', tone: 1, exampleChar: '吞', exampleWord: '吞下', level: 4 },
  { id: 'syl_tang', syllable: 'tang', initial: 't', final: 'ang', tone: 2, exampleChar: '糖', exampleWord: '糖果', level: 2 },
  { id: 'syl_teng', syllable: 'teng', initial: 't', final: 'eng', tone: 2, exampleChar: '疼', exampleWord: '疼痛', level: 3 },
  { id: 'syl_ting', syllable: 'ting', initial: 't', final: 'ing', tone: 1, exampleChar: '听', exampleWord: '听见', level: 1 },
  { id: 'syl_tong', syllable: 'tong', initial: 't', final: 'ong', tone: 2, exampleChar: '同', exampleWord: '同学', level: 2 },

  // n + 复韵母/鼻韵母
  { id: 'syl_nei', syllable: 'nei', initial: 'n', final: 'ei', tone: 4, exampleChar: '内', exampleWord: '里面', level: 3 },
  { id: 'syl_niao', syllable: 'niao', initial: 'n', final: 'iao', tone: 3, exampleChar: '鸟', exampleWord: '小鸟', level: 2 },
  { id: 'syl_niu', syllable: 'niu', initial: 'n', final: 'iu', tone: 2, exampleChar: '牛', exampleWord: '水牛', level: 2 },
  { id: 'syl_nie', syllable: 'nie', initial: 'n', final: 'ie', tone: 1, exampleChar: '捏', exampleWord: '捏住', level: 4 },
  { id: 'syl_nian', syllable: 'nian', initial: 'n', final: 'ian', tone: 2, exampleChar: '年', exampleWord: '过年', level: 2 },
  { id: 'syl_niang', syllable: 'niang', initial: 'n', final: 'iang', tone: 2, exampleChar: '娘', exampleWord: '姑娘', level: 3 },
  { id: 'syl_ning', syllable: 'ning', initial: 'n', final: 'ing', tone: 2, exampleChar: '宁', exampleWord: '安宁', level: 4 },
  { id: 'syl_nong', syllable: 'nong', initial: 'n', final: 'ong', tone: 2, exampleChar: '农', exampleWord: '农民', level: 3 },
  { id: 'syl_nuan', syllable: 'nuan', initial: 'n', final: 'uan', tone: 3, exampleChar: '暖', exampleWord: '温暖', level: 3 },

  // l + 复韵母/鼻韵母
  { id: 'syl_lei', syllable: 'lei', initial: 'l', final: 'ei', tone: 4, exampleChar: '累', exampleWord: '累了', level: 2 },
  { id: 'syl_liao', syllable: 'liao', initial: 'l', final: 'iao', tone: 3, exampleChar: '了', exampleWord: '了解', level: 3 },
  { id: 'syl_liu', syllable: 'liu', initial: 'l', final: 'iu', tone: 2, exampleChar: '流', exampleWord: '流水', level: 3 },
  { id: 'syl_lie', syllable: 'lie', initial: 'l', final: 'ie', tone: 4, exampleChar: '列', exampleWord: '排列', level: 3 },
  { id: 'syl_lian', syllable: 'lian', initial: 'l', final: 'ian', tone: 4, exampleChar: '练', exampleWord: '练习', level: 3 },
  { id: 'syl_lin', syllable: 'lin', initial: 'l', final: 'in', tone: 2, exampleChar: '林', exampleWord: '树林', level: 3 },
  { id: 'syl_liang', syllable: 'liang', initial: 'l', final: 'iang', tone: 4, exampleChar: '亮', exampleWord: '月亮', level: 2 },
  { id: 'syl_ling', syllable: 'ling', initial: 'l', final: 'ing', tone: 2, exampleChar: '铃', exampleWord: '铃声', level: 3 },
  { id: 'syl_long', syllable: 'long', initial: 'l', final: 'ong', tone: 2, exampleChar: '龙', exampleWord: '飞龙', level: 3 },
  { id: 'syl_luan', syllable: 'luan', initial: 'l', final: 'uan', tone: 4, exampleChar: '乱', exampleWord: '乱了', level: 3 },
  { id: 'syl_lun', syllable: 'lun', initial: 'l', final: 'un', tone: 2, exampleChar: '轮', exampleWord: '车轮', level: 3 },

  // g/k/h + 复韵母/鼻韵母
  { id: 'syl_gai', syllable: 'gai', initial: 'g', final: 'ai', tone: 3, exampleChar: '改', exampleWord: '改变', level: 3 },
  { id: 'syl_gua', syllable: 'gua', initial: 'g', final: 'ua', tone: 1, exampleChar: '瓜', exampleWord: '西瓜', level: 2 },
  { id: 'syl_guo', syllable: 'guo', initial: 'g', final: 'uo', tone: 3, exampleChar: '果', exampleWord: '苹果', level: 2 },
  { id: 'syl_guai', syllable: 'guai', initial: 'g', final: 'uai', tone: 1, exampleChar: '乖', exampleWord: '乖巧', level: 3 },
  { id: 'syl_gui', syllable: 'gui', initial: 'g', final: 'ui', tone: 1, exampleChar: '龟', exampleWord: '乌龟', level: 3 },
  { id: 'syl_guan', syllable: 'guan', initial: 'g', final: 'uan', tone: 1, exampleChar: '关', exampleWord: '关门', level: 2 },
  { id: 'syl_gun', syllable: 'gun', initial: 'g', final: 'un', tone: 3, exampleChar: '滚', exampleWord: '滚动', level: 3 },
  { id: 'syl_guang', syllable: 'guang', initial: 'g', final: 'uang', tone: 1, exampleChar: '光', exampleWord: '阳光', level: 3 },
  { id: 'syl_gang', syllable: 'gang', initial: 'g', final: 'ang', tone: 1, exampleChar: '刚', exampleWord: '刚才', level: 3 },
  { id: 'syl_geng', syllable: 'geng', initial: 'g', final: 'eng', tone: 4, exampleChar: '更', exampleWord: '更好', level: 3 },
  { id: 'syl_gong', syllable: 'gong', initial: 'g', final: 'ong', tone: 1, exampleChar: '工', exampleWord: '工人', level: 2 },
  { id: 'syl_kua', syllable: 'kua', initial: 'k', final: 'ua', tone: 1, exampleChar: '夸', exampleWord: '夸奖', level: 3 },
  { id: 'syl_kuo', syllable: 'kuo', initial: 'k', final: 'uo', tone: 4, exampleChar: '阔', exampleWord: '宽阔', level: 4 },
  { id: 'syl_kuai', syllable: 'kuai', initial: 'k', final: 'uai', tone: 4, exampleChar: '快', exampleWord: '快乐', level: 2 },
  { id: 'syl_kui', syllable: 'kui', initial: 'k', final: 'ui', tone: 1, exampleChar: '亏', exampleWord: '吃亏', level: 4 },
  { id: 'syl_kuan', syllable: 'kuan', initial: 'k', final: 'uan', tone: 1, exampleChar: '宽', exampleWord: '宽大', level: 3 },
  { id: 'syl_kun', syllable: 'kun', initial: 'k', final: 'un', tone: 4, exampleChar: '困', exampleWord: '困难', level: 3 },
  { id: 'syl_kuang', syllable: 'kuang', initial: 'k', final: 'uang', tone: 4, exampleChar: '况', exampleWord: '情况', level: 4 },
  { id: 'syl_kang', syllable: 'kang', initial: 'k', final: 'ang', tone: 4, exampleChar: '抗', exampleWord: '抗日', level: 4 },
  { id: 'syl_keng', syllable: 'keng', initial: 'k', final: 'eng', tone: 1, exampleChar: '坑', exampleWord: '水坑', level: 4 },
  { id: 'syl_kong', syllable: 'kong', initial: 'k', final: 'ong', tone: 1, exampleChar: '空', exampleWord: '天空', level: 3 },
  { id: 'syl_hua', syllable: 'hua', initial: 'h', final: 'ua', tone: 1, exampleChar: '花', exampleWord: '花朵', level: 2 },
  { id: 'syl_huo', syllable: 'huo', initial: 'h', final: 'uo', tone: 3, exampleChar: '火', exampleWord: '大火', level: 2 },
  { id: 'syl_huai', syllable: 'huai', initial: 'h', final: 'uai', tone: 4, exampleChar: '坏', exampleWord: '好坏', level: 3 },
  { id: 'syl_huan', syllable: 'huan', initial: 'h', final: 'uan', tone: 1, exampleChar: '欢', exampleWord: '喜欢', level: 2 },
  { id: 'syl_hun', syllable: 'hun', initial: 'h', final: 'un', tone: 1, exampleChar: '婚', exampleWord: '结婚', level: 4 },
  { id: 'syl_huang', syllable: 'huang', initial: 'h', final: 'uang', tone: 2, exampleChar: '黄', exampleWord: '黄色', level: 2 },
  { id: 'syl_hang', syllable: 'hang', initial: 'h', final: 'ang', tone: 2, exampleChar: '航', exampleWord: '航行', level: 4 },
  { id: 'syl_heng', syllable: 'heng', initial: 'h', final: 'eng', tone: 2, exampleChar: '横', exampleWord: '横行', level: 4 },
  { id: 'syl_hong', syllable: 'hong', initial: 'h', final: 'ong', tone: 2, exampleChar: '红', exampleWord: '红色', level: 1 },

  // j/q/x + 复韵母/鼻韵母
  { id: 'syl_jia', syllable: 'jia', initial: 'j', final: 'ia', tone: 1, exampleChar: '家', exampleWord: '大家', level: 2 },
  { id: 'syl_jie', syllable: 'jie', initial: 'j', final: 'ie', tone: 3, exampleChar: '姐', exampleWord: '姐姐', level: 2 },
  { id: 'syl_jiao', syllable: 'jiao', initial: 'j', final: 'iao', tone: 4, exampleChar: '叫', exampleWord: '叫喊', level: 2 },
  { id: 'syl_jiu', syllable: 'jiu', initial: 'j', final: 'iu', tone: 3, exampleChar: '九', exampleWord: '九个', level: 2 },
  { id: 'syl_jian', syllable: 'jian', initial: 'j', final: 'ian', tone: 4, exampleChar: '见', exampleWord: '看见', level: 2 },
  { id: 'syl_jin', syllable: 'jin', initial: 'j', final: 'in', tone: 1, exampleChar: '今', exampleWord: '今天', level: 2 },
  { id: 'syl_jiang', syllable: 'jiang', initial: 'j', final: 'iang', tone: 1, exampleChar: '江', exampleWord: '长江', level: 3 },
  { id: 'syl_jing', syllable: 'jing', initial: 'j', final: 'ing', tone: 1, exampleChar: '京', exampleWord: '北京', level: 3 },
  { id: 'syl_jiong', syllable: 'jiong', initial: 'j', final: 'iong', tone: 3, exampleChar: '窘', exampleWord: '窘迫', level: 5 },
  { id: 'syl_jue', syllable: 'jue', initial: 'j', final: 'üe', tone: 2, exampleChar: '觉', exampleWord: '觉得', level: 3 },
  { id: 'syl_juan', syllable: 'juan', initial: 'j', final: 'üan', tone: 4, exampleChar: '卷', exampleWord: '试卷', level: 3 },
  { id: 'syl_jun', syllable: 'jun', initial: 'j', final: 'ün', tone: 1, exampleChar: '军', exampleWord: '军人', level: 3 },
  { id: 'syl_qia', syllable: 'qia', initial: 'q', final: 'ia', tone: 4, exampleChar: '恰', exampleWord: '恰当', level: 4 },
  { id: 'syl_qie', syllable: 'qie', initial: 'q', final: 'ie', tone: 1, exampleChar: '切', exampleWord: '切开', level: 3 },
  { id: 'syl_qiao', syllable: 'qiao', initial: 'q', final: 'iao', tone: 2, exampleChar: '桥', exampleWord: '大桥', level: 3 },
  { id: 'syl_qiu', syllable: 'qiu', initial: 'q', final: 'iu', tone: 2, exampleChar: '球', exampleWord: '打球', level: 2 },
  { id: 'syl_qian', syllable: 'qian', initial: 'q', final: 'ian', tone: 2, exampleChar: '前', exampleWord: '前面', level: 2 },
  { id: 'syl_qin', syllable: 'qin', initial: 'q', final: 'in', tone: 1, exampleChar: '亲', exampleWord: '亲人', level: 3 },
  { id: 'syl_qiang', syllable: 'qiang', initial: 'q', final: 'iang', tone: 2, exampleChar: '强', exampleWord: '强大', level: 3 },
  { id: 'syl_qing', syllable: 'qing', initial: 'q', final: 'ing', tone: 1, exampleChar: '青', exampleWord: '青蛙', level: 2 },
  { id: 'syl_qiong', syllable: 'qiong', initial: 'q', final: 'iong', tone: 2, exampleChar: '穷', exampleWord: '贫穷', level: 4 },
  { id: 'syl_que', syllable: 'que', initial: 'q', final: 'üe', tone: 4, exampleChar: '却', exampleWord: '却是', level: 3 },
  { id: 'syl_quan', syllable: 'quan', initial: 'q', final: 'üan', tone: 1, exampleChar: '圈', exampleWord: '圆圈', level: 3 },
  { id: 'syl_qun', syllable: 'qun', initial: 'q', final: 'ün', tone: 2, exampleChar: '群', exampleWord: '群众', level: 3 },
  { id: 'syl_xia', syllable: 'xia', initial: 'x', final: 'ia', tone: 4, exampleChar: '下', exampleWord: '下雨', level: 1 },
  { id: 'syl_xiao', syllable: 'xiao', initial: 'x', final: 'iao', tone: 3, exampleChar: '小', exampleWord: '大小', level: 1 },
  { id: 'syl_xiu', syllable: 'xiu', initial: 'x', final: 'iu', tone: 1, exampleChar: '休', exampleWord: '休息', level: 3 },
  { id: 'syl_xian', syllable: 'xian', initial: 'x', final: 'ian', tone: 4, exampleChar: '现', exampleWord: '现在', level: 2 },
  { id: 'syl_xiang', syllable: 'xiang', initial: 'x', final: 'iang', tone: 3, exampleChar: '想', exampleWord: '想法', level: 2 },
  { id: 'syl_xing', syllable: 'xing', initial: 'x', final: 'ing', tone: 1, exampleChar: '星', exampleWord: '星星', level: 2 },
  { id: 'syl_xiong', syllable: 'xiong', initial: 'x', final: 'iong', tone: 2, exampleChar: '熊', exampleWord: '熊猫', level: 3 },
  { id: 'syl_xue', syllable: 'xue', initial: 'x', final: 'üe', tone: 2, exampleChar: '学', exampleWord: '学习', level: 2 },
  { id: 'syl_xuan', syllable: 'xuan', initial: 'x', final: 'üan', tone: 3, exampleChar: '选', exampleWord: '选择', level: 3 },
  { id: 'syl_xun', syllable: 'xun', initial: 'x', final: 'ün', tone: 2, exampleChar: '寻', exampleWord: '寻找', level: 3 },

  // zh/ch/sh/r + 复韵母/鼻韵母
  { id: 'syl_zha', syllable: 'zha', initial: 'zh', final: 'a', tone: 1, exampleChar: '扎', exampleWord: '扎针', level: 3 },
  { id: 'syl_zhe', syllable: 'zhe', initial: 'zh', final: 'e', tone: 4, exampleChar: '这', exampleWord: '这个', level: 1 },
  { id: 'syl_zhu', syllable: 'zhu', initial: 'zh', final: 'u', tone: 1, exampleChar: '猪', exampleWord: '小猪', level: 2 },
  { id: 'syl_zhua', syllable: 'zhua', initial: 'zh', final: 'ua', tone: 1, exampleChar: '抓', exampleWord: '抓住', level: 3 },
  { id: 'syl_zhuo', syllable: 'zhuo', initial: 'zh', final: 'uo', tone: 1, exampleChar: '桌', exampleWord: '桌子', level: 2 },
  { id: 'syl_zhui', syllable: 'zhui', initial: 'zh', final: 'ui', tone: 1, exampleChar: '追', exampleWord: '追赶', level: 3 },
  { id: 'syl_zhuan', syllable: 'zhuan', initial: 'zh', final: 'uan', tone: 1, exampleChar: '专', exampleWord: '专心', level: 3 },
  { id: 'syl_zhun', syllable: 'zhun', initial: 'zh', final: 'un', tone: 3, exampleChar: '准', exampleWord: '准备', level: 3 },
  { id: 'syl_zhuang', syllable: 'zhuang', initial: 'zh', final: 'uang', tone: 1, exampleChar: '装', exampleWord: '服装', level: 3 },
  { id: 'syl_zhang', syllable: 'zhang', initial: 'zh', final: 'ang', tone: 3, exampleChar: '长', exampleWord: '长大', level: 2 },
  { id: 'syl_zheng', syllable: 'zheng', initial: 'zh', final: 'eng', tone: 4, exampleChar: '正', exampleWord: '正在', level: 2 },
  { id: 'syl_cha', syllable: 'cha', initial: 'ch', final: 'a', tone: 2, exampleChar: '茶', exampleWord: '喝茶', level: 2 },
  { id: 'syl_che', syllable: 'che', initial: 'ch', final: 'e', tone: 1, exampleChar: '车', exampleWord: '汽车', level: 2 },
  { id: 'syl_chu', syllable: 'chu', initial: 'ch', final: 'u', tone: 1, exampleChar: '出', exampleWord: '出去', level: 2 },
  { id: 'syl_chuo', syllable: 'chuo', initial: 'ch', final: 'uo', tone: 1, exampleChar: '戳', exampleWord: '戳破', level: 5 },
  { id: 'syl_chui', syllable: 'chui', initial: 'ch', final: 'ui', tone: 1, exampleChar: '吹', exampleWord: '吹风', level: 3 },
  { id: 'syl_chuan', syllable: 'chuan', initial: 'ch', final: 'uan', tone: 2, exampleChar: '船', exampleWord: '小船', level: 2 },
  { id: 'syl_chun', syllable: 'chun', initial: 'ch', final: 'un', tone: 1, exampleChar: '春', exampleWord: '春天', level: 2 },
  { id: 'syl_chuang', syllable: 'chuang', initial: 'ch', final: 'uang', tone: 1, exampleChar: '窗', exampleWord: '窗户', level: 2 },
  { id: 'syl_cheng', syllable: 'cheng', initial: 'ch', final: 'eng', tone: 2, exampleChar: '成', exampleWord: '成功', level: 3 },
  { id: 'syl_sha', syllable: 'sha', initial: 'sh', final: 'a', tone: 1, exampleChar: '沙', exampleWord: '沙子', level: 3 },
  { id: 'syl_she', syllable: 'she', initial: 'sh', final: 'e', tone: 4, exampleChar: '社', exampleWord: '社会', level: 3 },
  { id: 'syl_shu', syllable: 'shu', initial: 'sh', final: 'u', tone: 1, exampleChar: '书', exampleWord: '书本', level: 1 },
  { id: 'syl_shua', syllable: 'shua', initial: 'sh', final: 'ua', tone: 1, exampleChar: '刷', exampleWord: '刷牙', level: 3 },
  { id: 'syl_shuo', syllable: 'shuo', initial: 'sh', final: 'uo', tone: 1, exampleChar: '说', exampleWord: '说话', level: 2 },
  { id: 'syl_shuai', syllable: 'shuai', initial: 'sh', final: 'uai', tone: 1, exampleChar: '摔', exampleWord: '摔倒', level: 3 },
  { id: 'syl_shuan', syllable: 'shuan', initial: 'sh', final: 'uan', tone: 1, exampleChar: '拴', exampleWord: '拴住', level: 5 },
  { id: 'syl_shun', syllable: 'shun', initial: 'sh', final: 'un', tone: 4, exampleChar: '顺', exampleWord: '顺利', level: 3 },
  { id: 'syl_shuang', syllable: 'shuang', initial: 'sh', final: 'uang', tone: 1, exampleChar: '双', exampleWord: '一双', level: 3 },
  { id: 'syl_sheng', syllable: 'sheng', initial: 'sh', final: 'eng', tone: 1, exampleChar: '声', exampleWord: '声音', level: 2 },
  { id: 'syl_ru', syllable: 'ru', initial: 'r', final: 'u', tone: 4, exampleChar: '入', exampleWord: '进入', level: 3 },
  { id: 'syl_re', syllable: 're', initial: 'r', final: 'e', tone: 4, exampleChar: '热', exampleWord: '热爱', level: 2 },
  { id: 'syl_ruo', syllable: 'ruo', initial: 'r', final: 'uo', tone: 4, exampleChar: '若', exampleWord: '假若', level: 4 },
  { id: 'syl_rui', syllable: 'rui', initial: 'r', final: 'ui', tone: 4, exampleChar: '瑞', exampleWord: '瑞雪', level: 4 },
  { id: 'syl_ruan', syllable: 'ruan', initial: 'r', final: 'uan', tone: 3, exampleChar: '软', exampleWord: '柔软', level: 3 },
  { id: 'syl_run', syllable: 'run', initial: 'r', final: 'un', tone: 4, exampleChar: '润', exampleWord: '湿润', level: 4 },
  { id: 'syl_rang', syllable: 'rang', initial: 'r', final: 'ang', tone: 4, exampleChar: '让', exampleWord: '让开', level: 3 },
  { id: 'syl_reng', syllable: 'reng', initial: 'r', final: 'eng', tone: 1, exampleChar: '扔', exampleWord: '扔掉', level: 3 },
  { id: 'syl_rong', syllable: 'rong', initial: 'r', final: 'ong', tone: 2, exampleChar: '容', exampleWord: '容易', level: 3 },

  // z/c/s + 复韵母/鼻韵母
  { id: 'syl_za', syllable: 'za', initial: 'z', final: 'a', tone: 2, exampleChar: '杂', exampleWord: '杂志', level: 3 },
  { id: 'syl_ze', syllable: 'ze', initial: 'z', final: 'e', tone: 2, exampleChar: '则', exampleWord: '规则', level: 3 },
  { id: 'syl_zu', syllable: 'zu', initial: 'z', final: 'u', tone: 2, exampleChar: '足', exampleWord: '足球', level: 3 },
  { id: 'syl_zuo', syllable: 'zuo', initial: 'z', final: 'uo', tone: 4, exampleChar: '做', exampleWord: '做事', level: 1 },
  { id: 'syl_zui', syllable: 'zui', initial: 'z', final: 'ui', tone: 4, exampleChar: '最', exampleWord: '最好', level: 2 },
  { id: 'syl_zuan', syllable: 'zuan', initial: 'z', final: 'uan', tone: 1, exampleChar: '钻', exampleWord: '钻石', level: 4 },
  { id: 'syl_zun', syllable: 'zun', initial: 'z', final: 'un', tone: 1, exampleChar: '尊', exampleWord: '尊敬', level: 4 },
  { id: 'syl_zang', syllable: 'zang', initial: 'z', final: 'ang', tone: 1, exampleChar: '脏', exampleWord: '脏了', level: 3 },
  { id: 'syl_zeng', syllable: 'zeng', initial: 'z', final: 'eng', tone: 1, exampleChar: '增', exampleWord: '增加', level: 4 },
  { id: 'syl_zong', syllable: 'zong', initial: 'z', final: 'ong', tone: 3, exampleChar: '总', exampleWord: '总是', level: 3 },
  { id: 'syl_ca', syllable: 'ca', initial: 'c', final: 'a', tone: 1, exampleChar: '擦', exampleWord: '擦掉', level: 3 },
  { id: 'syl_ce', syllable: 'ce', initial: 'c', final: 'e', tone: 4, exampleChar: '册', exampleWord: '手册', level: 3 },
  { id: 'syl_cu', syllable: 'cu', initial: 'c', final: 'u', tone: 1, exampleChar: '粗', exampleWord: '粗细', level: 3 },
  { id: 'syl_cuo', syllable: 'cuo', initial: 'c', final: 'uo', tone: 4, exampleChar: '错', exampleWord: '错误', level: 3 },
  { id: 'syl_cui', syllable: 'cui', initial: 'c', final: 'ui', tone: 4, exampleChar: '翠', exampleWord: '翠绿', level: 4 },
  { id: 'syl_cuan', syllable: 'cuan', initial: 'c', final: 'uan', tone: 2, exampleChar: '攒', exampleWord: '攒钱', level: 4 },
  { id: 'syl_cun', syllable: 'cun', initial: 'c', final: 'un', tone: 1, exampleChar: '村', exampleWord: '村庄', level: 3 },
  { id: 'syl_cang', syllable: 'cang', initial: 'c', final: 'ang', tone: 2, exampleChar: '藏', exampleWord: '躲藏', level: 3 },
  { id: 'syl_ceng', syllable: 'ceng', initial: 'c', final: 'eng', tone: 2, exampleChar: '层', exampleWord: '楼层', level: 3 },
  { id: 'syl_cong', syllable: 'cong', initial: 'c', final: 'ong', tone: 1, exampleChar: '聪', exampleWord: '聪明', level: 3 },
  { id: 'syl_sa', syllable: 'sa', initial: 's', final: 'a', tone: 3, exampleChar: '洒', exampleWord: '洒水', level: 3 },
  { id: 'syl_se', syllable: 'se', initial: 's', final: 'e', tone: 4, exampleChar: '色', exampleWord: '颜色', level: 2 },
  { id: 'syl_su', syllable: 'su', initial: 's', final: 'u', tone: 4, exampleChar: '速', exampleWord: '速度', level: 3 },
  { id: 'syl_suo', syllable: 'suo', initial: 's', final: 'uo', tone: 3, exampleChar: '所', exampleWord: '所以', level: 3 },
  { id: 'syl_sui', syllable: 'sui', initial: 's', final: 'ui', tone: 4, exampleChar: '岁', exampleWord: '几岁', level: 2 },
  { id: 'syl_suan', syllable: 'suan', initial: 's', final: 'uan', tone: 1, exampleChar: '酸', exampleWord: '酸的', level: 3 },
  { id: 'syl_sun', syllable: 'sun', initial: 's', final: 'un', tone: 1, exampleChar: '孙', exampleWord: '孙子', level: 3 },
  { id: 'syl_sang', syllable: 'sang', initial: 's', final: 'ang', tone: 1, exampleChar: '桑', exampleWord: '桑树', level: 4 },
  { id: 'syl_seng', syllable: 'seng', initial: 's', final: 'eng', tone: 1, exampleChar: '僧', exampleWord: '僧人', level: 5 },
  { id: 'syl_song', syllable: 'song', initial: 's', final: 'ong', tone: 4, exampleChar: '送', exampleWord: '送给', level: 2 },

  // y/w 开头音节
  { id: 'syl_ya', syllable: 'ya', initial: 'y', final: 'a', tone: 1, exampleChar: '鸭', exampleWord: '鸭子', level: 2 },
  { id: 'syl_yan', syllable: 'yan', initial: 'y', final: 'ian', tone: 3, exampleChar: '眼', exampleWord: '眼睛', level: 2 },
  { id: 'syl_yang', syllable: 'yang', initial: 'y', final: 'iang', tone: 2, exampleChar: '羊', exampleWord: '山羊', level: 2 },
  { id: 'syl_yao2', syllable: 'yao', initial: 'y', final: 'iao', tone: 2, exampleChar: '摇', exampleWord: '摇头', level: 3 },
  { id: 'syl_ye', syllable: 'ye', initial: 'y', final: 'ie', tone: 4, exampleChar: '夜', exampleWord: '夜晚', level: 2 },
  { id: 'syl_you', syllable: 'you', initial: 'y', final: 'iu', tone: 3, exampleChar: '有', exampleWord: '没有', level: 1 },
  { id: 'syl_yin2', syllable: 'yin', initial: 'y', final: 'in', tone: 1, exampleChar: '音', exampleWord: '音乐', level: 3 },
  { id: 'syl_ying2', syllable: 'ying', initial: 'y', final: 'ing', tone: 1, exampleChar: '英', exampleWord: '英雄', level: 3 },
  { id: 'syl_yong', syllable: 'yong', initial: 'y', final: 'iong', tone: 4, exampleChar: '用', exampleWord: '不用', level: 2 },
  { id: 'syl_wa', syllable: 'wa', initial: 'w', final: 'a', tone: 2, exampleChar: '娃', exampleWord: '娃娃', level: 2 },
  { id: 'syl_wo', syllable: 'wo', initial: 'w', final: 'uo', tone: 3, exampleChar: '我', exampleWord: '我们', level: 1 },
  { id: 'syl_wai', syllable: 'wai', initial: 'w', final: 'uai', tone: 4, exampleChar: '外', exampleWord: '外面', level: 2 },
  { id: 'syl_wan', syllable: 'wan', initial: 'w', final: 'uan', tone: 2, exampleChar: '玩', exampleWord: '玩耍', level: 2 },
  { id: 'syl_wen', syllable: 'wen', initial: 'w', final: 'en', tone: 4, exampleChar: '问', exampleWord: '问题', level: 2 },
  { id: 'syl_wang', syllable: 'wang', initial: 'w', final: 'uang', tone: 2, exampleChar: '王', exampleWord: '国王', level: 2 },
  { id: 'syl_weng', syllable: 'weng', initial: 'w', final: 'eng', tone: 1, exampleChar: '翁', exampleWord: '老翁', level: 4 },
  { id: 'syl_wu2', syllable: 'wu', initial: 'w', final: 'u', tone: 4, exampleChar: '物', exampleWord: '动物', level: 2 },

  // 三拼法音节（介母 i/u/ü）
  { id: 'syl_bian2', syllable: 'bian', initial: 'b', final: 'ian', tone: 1, exampleChar: '边', exampleWord: '旁边', level: 3 },
  { id: 'syl_pian2', syllable: 'pian', initial: 'p', final: 'ian', tone: 1, exampleChar: '偏', exampleWord: '偏心', level: 4 },
  { id: 'syl_mian2', syllable: 'mian', initial: 'm', final: 'ian', tone: 2, exampleChar: '棉', exampleWord: '棉花', level: 3 },
  { id: 'syl_dian2', syllable: 'dian', initial: 'd', final: 'ian', tone: 4, exampleChar: '电', exampleWord: '电话', level: 2 },
  { id: 'syl_tian3', syllable: 'tian', initial: 't', final: 'ian', tone: 1, exampleChar: '天', exampleWord: '天空', level: 1 },
  { id: 'syl_nian2', syllable: 'nian', initial: 'n', final: 'ian', tone: 2, exampleChar: '年', exampleWord: '新年', level: 2 },
  { id: 'syl_lian2', syllable: 'lian', initial: 'l', final: 'ian', tone: 2, exampleChar: '连', exampleWord: '连接', level: 3 },
  { id: 'syl_jian2', syllable: 'jian', initial: 'j', final: 'ian', tone: 1, exampleChar: '间', exampleWord: '时间', level: 2 },
  { id: 'syl_qian2', syllable: 'qian', initial: 'q', final: 'ian', tone: 1, exampleChar: '千', exampleWord: '一千', level: 3 },
  { id: 'syl_xian2', syllable: 'xian', initial: 'x', final: 'ian', tone: 1, exampleChar: '先', exampleWord: '首先', level: 2 },
  { id: 'syl_duan2', syllable: 'duan', initial: 'd', final: 'uan', tone: 1, exampleChar: '端', exampleWord: '端正', level: 3 },
  { id: 'syl_tuan2', syllable: 'tuan', initial: 't', final: 'uan', tone: 2, exampleChar: '团', exampleWord: '团结', level: 3 },
  { id: 'syl_nuan2', syllable: 'nuan', initial: 'n', final: 'uan', tone: 3, exampleChar: '暖', exampleWord: '暖和', level: 3 },
  { id: 'syl_luan2', syllable: 'luan', initial: 'l', final: 'uan', tone: 2, exampleChar: '峦', exampleWord: '山峦', level: 4 },
  { id: 'syl_guan2', syllable: 'guan', initial: 'g', final: 'uan', tone: 3, exampleChar: '管', exampleWord: '管理', level: 3 },
  { id: 'syl_kuan2', syllable: 'kuan', initial: 'k', final: 'uan', tone: 1, exampleChar: '宽', exampleWord: '宽大', level: 3 },
  { id: 'syl_huan2', syllable: 'huan', initial: 'h', final: 'uan', tone: 2, exampleChar: '环', exampleWord: '环境', level: 3 },
  { id: 'syl_zhuan2', syllable: 'zhuan', initial: 'zh', final: 'uan', tone: 3, exampleChar: '转', exampleWord: '转动', level: 3 },
  { id: 'syl_chuan2', syllable: 'chuan', initial: 'ch', final: 'uan', tone: 2, exampleChar: '传', exampleWord: '传说', level: 3 },
  { id: 'syl_suan2', syllable: 'suan', initial: 's', final: 'uan', tone: 4, exampleChar: '算', exampleWord: '计算', level: 3 },
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

  // === 声调练习扩展 ===
  { id: 'tone_bo', baseSyllable: 'bo', tones: ['bō', 'bó', 'bǒ', 'bò'], examples: ['波', '脖', '跛', '薄'] },
  { id: 'tone_po', baseSyllable: 'po', tones: ['pō', 'pó', 'pǒ', 'pò'], examples: ['泼', '婆', '叵', '破'] },
  { id: 'tone_mo', baseSyllable: 'mo', tones: ['mō', 'mó', 'mǒ', 'mò'], examples: ['摸', '磨', '抹', '末'] },
  { id: 'tone_fo', baseSyllable: 'fo', tones: ['fō', 'fó', 'fǒ', 'fò'], examples: ['佛', '佛', '否', '佛'] },
  { id: 'tone_de', baseSyllable: 'de', tones: ['dē', 'dé', 'dě', 'dè'], examples: ['得', '德', '得', '的'] },
  { id: 'tone_te', baseSyllable: 'te', tones: ['tē', 'té', 'tě', 'tè'], examples: ['特', '特', '特', '特'] },
  { id: 'tone_ne', baseSyllable: 'ne', tones: ['nē', 'né', 'ně', 'nè'], examples: ['呢', '哪', '哪', '讷'] },
  { id: 'tone_le', baseSyllable: 'le', tones: ['lē', 'lé', 'lě', 'lè'], examples: ['肋', '乐', '了', '乐'] },
  { id: 'tone_ge', baseSyllable: 'ge', tones: ['gē', 'gé', 'gě', 'gè'], examples: ['歌', '格', '葛', '个'] },
  { id: 'tone_ke', baseSyllable: 'ke', tones: ['kē', 'ké', 'kě', 'kè'], examples: ['科', '壳', '可', '课'] },
  { id: 'tone_he', baseSyllable: 'he', tones: ['hē', 'hé', 'hě', 'hè'], examples: ['喝', '河', '喝', '贺'] },
  { id: 'tone_ji', baseSyllable: 'ji', tones: ['jī', 'jí', 'jǐ', 'jì'], examples: ['鸡', '急', '几', '记'] },
  { id: 'tone_qi', baseSyllable: 'qi', tones: ['qī', 'qí', 'qǐ', 'qì'], examples: ['七', '骑', '起', '气'] },
  { id: 'tone_xi', baseSyllable: 'xi', tones: ['xī', 'xí', 'xǐ', 'xì'], examples: ['西', '习', '洗', '戏'] },
  { id: 'tone_gu', baseSyllable: 'gu', tones: ['gū', 'gú', 'gǔ', 'gù'], examples: ['姑', '骨', '古', '故'] },
  { id: 'tone_ku', baseSyllable: 'ku', tones: ['kū', 'kú', 'kǔ', 'kù'], examples: ['哭', '苦', '苦', '库'] },
  { id: 'tone_hu', baseSyllable: 'hu', tones: ['hū', 'hú', 'hǔ', 'hù'], examples: ['呼', '湖', '虎', '护'] },
  { id: 'tone_du', baseSyllable: 'du', tones: ['dū', 'dú', 'dǔ', 'dù'], examples: ['都', '读', '赌', '度'] },
  { id: 'tone_tu', baseSyllable: 'tu', tones: ['tū', 'tú', 'tǔ', 'tù'], examples: ['突', '图', '土', '兔'] },
  { id: 'tone_nu', baseSyllable: 'nu', tones: ['nū', 'nú', 'nǔ', 'nù'], examples: ['奴', '奴', '努', '怒'] },

  // 易混淆声调对比组
  { id: 'tone_cmp_ma', baseSyllable: 'ma', tones: ['mā', 'má', 'mǎ', 'mà'], examples: ['妈（妈妈）', '麻（麻烦）', '马（马上）', '骂（骂人）'] },
  { id: 'tone_cmp_tang', baseSyllable: 'tang', tones: ['tāng', 'táng', 'tǎng', 'tàng'], examples: ['汤（喝汤）', '糖（糖果）', '躺（躺下）', '烫（烫手）'] },
  { id: 'tone_cmp_wan', baseSyllable: 'wan', tones: ['wān', 'wán', 'wǎn', 'wàn'], examples: ['弯（弯曲）', '玩（玩耍）', '晚（晚上）', '万（一万）'] },
  { id: 'tone_cmp_zhong', baseSyllable: 'zhong', tones: ['zhōng', 'zhóng', 'zhǒng', 'zhòng'], examples: ['中（中国）', '种', '种（种子）', '重（重要）'] },
  { id: 'tone_cmp_chang', baseSyllable: 'chang', tones: ['chāng', 'cháng', 'chǎng', 'chàng'], examples: ['昌', '长（长短）', '厂（工厂）', '唱（唱歌）'] },
  { id: 'tone_cmp_feng', baseSyllable: 'feng', tones: ['fēng', 'féng', 'fěng', 'fèng'], examples: ['风（大风）', '缝（缝衣）', '讽', '凤（凤凰）'] },

  // 双音节声调模式
  { id: 'tone_pair_11', baseSyllable: 'gāogāo', tones: ['gāo', 'gāo', '', ''], examples: ['高高的一一', '春天花开', '', ''] },
  { id: 'tone_pair_24', baseSyllable: 'értóng', tones: ['ér', 'tóng', '', ''], examples: ['儿童', '二声+二声', '', ''] },
  { id: 'tone_pair_33', baseSyllable: 'yǒuhǎo', tones: ['yǒu', 'hǎo', '', ''], examples: ['友好→níhǎo', '三声变调：33→23', '', ''] },
  { id: 'tone_pair_44', baseSyllable: 'kuàilè', tones: ['kuài', 'lè', '', ''], examples: ['快乐', '四声+四声', '', ''] },
  { id: 'tone_pair_14', baseSyllable: 'yīnyuè', tones: ['yīn', 'yuè', '', ''], examples: ['音乐', '一声+四声', '', ''] },
  { id: 'tone_pair_42', baseSyllable: 'tàiyáng', tones: ['tài', 'yáng', '', ''], examples: ['太阳', '四声+二声', '', ''] },
  { id: 'tone_pair_32', baseSyllable: 'yǔyán', tones: ['yǔ', 'yán', '', ''], examples: ['语言→yúyán', '三声变调：32→22', '', ''] },
  { id: 'tone_pair_21', baseSyllable: 'guójiā', tones: ['guó', 'jiā', '', ''], examples: ['国家', '二声+一声', '', ''] },

  // 轻声练习
  { id: 'tone_neutral_1', baseSyllable: 'māma', tones: ['mā', 'ma', '', ''], examples: ['妈妈', '第二个字轻声', '', ''] },
  { id: 'tone_neutral_2', baseSyllable: 'bàba', tones: ['bà', 'ba', '', ''], examples: ['爸爸', '第二个字轻声', '', ''] },
  { id: 'tone_neutral_3', baseSyllable: 'yéye', tones: ['yé', 'ye', '', ''], examples: ['爷爷', '第二个字轻声', '', ''] },
  { id: 'tone_neutral_4', baseSyllable: 'wǒmen', tones: ['wǒ', 'men', '', ''], examples: ['我们', '后缀men轻声', '', ''] },
  { id: 'tone_neutral_5', baseSyllable: 'xièxie', tones: ['xiè', 'xie', '', ''], examples: ['谢谢', '重叠词尾字轻声', '', ''] },
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

  // === 新增儿歌 ===
  {
    id: 'song_tone_mark',
    title: '标调歌',
    content: `有 a 不放过
没 a 找 o e
i u 并列标在后
单个韵母不必说
ā á ǎ à 声调要记牢`,
  },
  {
    id: 'song_spell_two',
    title: '两拼法歌',
    content: `前音轻短后音重
两音相连猛一碰
b—a → ba
声母韵母手拉手
快速拼出好声音`,
  },
  {
    id: 'song_spell_three',
    title: '三拼法歌',
    content: `声轻介快韵母响
三音连读很顺畅
g—u—a → gua
声母短，介母快
韵母响亮拼出来`,
  },
  {
    id: 'song_jqx_uv',
    title: 'jqx与ü的歌',
    content: `j q x 真有趣
从来不和 u 做游戏
小 ü 小 ü 有礼貌
见了 j q x 就摘帽
ju qu xu 记住啦
ü 上两点不见了`,
  },
  {
    id: 'song_nasal',
    title: '前后鼻音歌',
    content: `an en in un ün
五个前鼻音要分清
ang eng ing ong
四个后鼻音记心中
前鼻舌头抵上颚
后鼻舌根往后缩`,
  },
  {
    id: 'song_neutral',
    title: '轻声歌',
    content: `妈妈 爸爸 爷爷 奶奶
后面那个字读轻一些
我们 他们 小朋友们
后缀要读轻声才对
的 地 得 了 着 过 呢 吗
虚词统统读轻声`,
  },
  {
    id: 'song_apostrophe',
    title: '隔音符号歌',
    content: `a o e 开头的音节
连在其他音节后
要用隔音符号 ' 隔开
pí'ǎo 皮袄不读 piáo
xī'ān 西安不读 xiān
隔音符号很重要`,
  },
  {
    id: 'song_erhua',
    title: '儿化音歌',
    content: `花儿 huār 鸟儿 niǎor
儿化音真有趣
舌尖轻轻卷起来
加上 r 变成儿化音
哪儿 这儿 一会儿
北京话里常听见`,
  },
  {
    id: 'song_write',
    title: '拼音书写歌',
    content: `四线三格要看清
拼音字母住哪里
中格写 a o e
上格写 b d f h k l t
下格写 g p q y
写满格子真好看`,
  },
  {
    id: 'song_season',
    title: '四季拼音歌',
    content: `春天 chūntiān 花开了
夏天 xiàtiān 真热闹
秋天 qiūtiān 叶落了
冬天 dōngtiān 雪花飘
一年四季多美好
学好拼音读世界`,
  },
]

// 按学习层级获取音节
export function getSyllablesByLevel(level: number): SyllableData[] {
  return SYLLABLES.filter(s => s.level <= level)
}
