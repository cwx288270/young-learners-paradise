// 模块信息定义
import type { ModuleInfo } from '../types'

export const MODULES: ModuleInfo[] = [
  {
    type: 'pinyin',
    name: '拼音',
    icon: '🔤',
    color: '#00B894',
    description: '学习声母韵母，掌握拼读规律'
  },
  {
    type: 'math',
    name: '数学思维',
    icon: '🔢',
    color: '#E17055',
    description: '数感启蒙，加减法与图形空间'
  },
  {
    type: 'character',
    name: '识字',
    icon: '📖',
    color: '#5B8DEF',
    description: '认识常用汉字，从认到写步步进阶'
  },
  {
    type: 'reading',
    name: '阅读',
    icon: '📚',
    color: '#6C5CE7',
    description: '分级阅读，培养阅读理解能力'
  },
  {
    type: 'writing',
    name: '写字',
    icon: '✏️',
    color: '#FD79A8',
    description: '描红临写，养成正确书写习惯'
  }
]
