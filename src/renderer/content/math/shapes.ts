import type { MathData } from '../../types'

export const SHAPES: MathData[] = [
  // 基本2D图形
  { id: 'shape_circle', type: 'shape', title: '认识圆形', level: 11, question: '哪个是圆形？', options: ['圆形', '三角形', '正方形', '长方形'], answer: '圆形', visualType: 'shapes' },
  { id: 'shape_square', type: 'shape', title: '认识正方形', level: 11, question: '哪个是正方形？', options: ['圆形', '三角形', '正方形', '长方形'], answer: '正方形', visualType: 'shapes' },
  { id: 'shape_triangle', type: 'shape', title: '认识三角形', level: 11, question: '哪个是三角形？', options: ['圆形', '三角形', '正方形', '长方形'], answer: '三角形', visualType: 'shapes' },
  { id: 'shape_rect', type: 'shape', title: '认识长方形', level: 11, question: '哪个是长方形？', options: ['圆形', '三角形', '正方形', '长方形'], answer: '长方形', visualType: 'shapes' },
  { id: 'shape_oval', type: 'shape', title: '认识椭圆形', level: 11, question: '哪个是椭圆形？', options: ['椭圆形', '圆形', '正方形', '三角形'], answer: '椭圆形', visualType: 'shapes' },
  { id: 'shape_diamond', type: 'shape', title: '认识菱形', level: 11, question: '哪个是菱形？', options: ['菱形', '正方形', '三角形', '圆形'], answer: '菱形', visualType: 'shapes' },
  { id: 'shape_star', type: 'shape', title: '认识五角星', level: 11, question: '哪个是五角星形？', options: ['五角星', '三角形', '圆形', '正方形'], answer: '五角星', visualType: 'shapes' },
  { id: 'shape_heart', type: 'shape', title: '认识心形', level: 11, question: '哪个是心形？', options: ['心形', '圆形', '三角形', '菱形'], answer: '心形', visualType: 'shapes' },

  // 3D图形
  { id: 'shape_cube', type: 'shape', title: '认识正方体', level: 11, question: '哪个是正方体？', options: ['正方体', '正方形', '圆形', '长方形'], answer: '正方体', visualType: 'shapes' },
  { id: 'shape_sphere', type: 'shape', title: '认识球体', level: 11, question: '哪个是球体？', options: ['球体', '圆形', '椭圆形', '圆柱体'], answer: '球体', visualType: 'shapes' },
  { id: 'shape_cylinder', type: 'shape', title: '认识圆柱体', level: 11, question: '哪个是圆柱体？', options: ['圆柱体', '球体', '正方体', '圆形'], answer: '圆柱体', visualType: 'shapes' },
  { id: 'shape_cone', type: 'shape', title: '认识圆锥体', level: 11, question: '哪个是圆锥体？', options: ['圆锥体', '圆柱体', '球体', '三角形'], answer: '圆锥体', visualType: 'shapes' },

  // 生活中的形状
  { id: 'shape_life_clock', type: 'shape', title: '钟表是什么形状', level: 11, question: '墙上的钟表通常是什么形状的？', options: ['圆形', '三角形', '正方形', '菱形'], answer: '圆形', explanation: '钟表大多数是圆形的' },
  { id: 'shape_life_book', type: 'shape', title: '书本是什么形状', level: 11, question: '课本是什么形状的？', options: ['圆形', '长方形', '三角形', '椭圆形'], answer: '长方形', explanation: '书本是长方形的' },
  { id: 'shape_life_ball', type: 'shape', title: '足球是什么形状', level: 11, question: '足球是什么形状的？', options: ['圆形', '球体', '圆柱体', '正方体'], answer: '球体', explanation: '足球是一个球体，立体的圆' },
  { id: 'shape_life_dice', type: 'shape', title: '骰子是什么形状', level: 11, question: '骰子是什么形状的？', options: ['正方形', '正方体', '圆形', '球体'], answer: '正方体', explanation: '骰子是正方体' },
  { id: 'shape_life_egg', type: 'shape', title: '鸡蛋是什么形状', level: 11, question: '鸡蛋像什么形状？', options: ['圆形', '椭圆形', '三角形', '正方形'], answer: '椭圆形', explanation: '鸡蛋是椭圆形的' },
  { id: 'shape_life_pyramid', type: 'shape', title: '金字塔是什么形状', level: 11, question: '金字塔像什么立体图形？', options: ['正方体', '圆锥体', '角锥体', '球体'], answer: '角锥体', explanation: '金字塔是角锥体' },
  { id: 'shape_life_can', type: 'shape', title: '易拉罐是什么形状', level: 11, question: '易拉罐像什么立体图形？', options: ['球体', '正方体', '圆柱体', '圆锥体'], answer: '圆柱体', explanation: '易拉罐是圆柱体' },
  { id: 'shape_life_flag', type: 'shape', title: '红领巾是什么形状', level: 11, question: '红领巾是什么形状的？', options: ['三角形', '长方形', '正方形', '圆形'], answer: '三角形', explanation: '红领巾是三角形的' },

  // 图形属性
  { id: 'shape_prop_square_sides', type: 'shape', title: '正方形有几条边', level: 11, question: '正方形有几条边？', options: ['3条', '4条', '5条', '6条'], answer: '4条', explanation: '正方形有4条一样长的边' },
  { id: 'shape_prop_triangle_sides', type: 'shape', title: '三角形有几条边', level: 11, question: '三角形有几条边？', options: ['2条', '3条', '4条', '5条'], answer: '3条', explanation: '三角形有3条边' },
  { id: 'shape_prop_circle_sides', type: 'shape', title: '圆形有几条边', level: 11, question: '圆形有几条边？', options: ['0条', '1条', '2条', '很多条'], answer: '0条', explanation: '圆形没有边，是一条弯弯的线' },
  { id: 'shape_prop_rect_sides', type: 'shape', title: '长方形有几条边', level: 11, question: '长方形有几条边？', options: ['3条', '4条', '5条', '6条'], answer: '4条', explanation: '长方形也有4条边，对边一样长' },
  { id: 'shape_prop_cube_faces', type: 'shape', title: '正方体有几个面', level: 11, question: '正方体有几个面？', options: ['4个', '5个', '6个', '8个'], answer: '6个', explanation: '正方体有6个一样大的正方形面' },
]
