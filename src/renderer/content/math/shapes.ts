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

  // 更多2D图形
  { id: 'shape_trapezoid', type: 'shape', title: '认识梯形', level: 11, question: '哪个是梯形？', options: ['梯形', '长方形', '正方形', '三角形'], answer: '梯形', visualType: 'shapes', explanation: '梯形只有一组对边平行' },
  { id: 'shape_pentagon', type: 'shape', title: '认识五边形', level: 11, question: '五边形有几条边？', options: ['4条', '5条', '6条', '3条'], answer: '5条', explanation: '五边形有5条边' },
  { id: 'shape_hexagon', type: 'shape', title: '认识六边形', level: 11, question: '六边形有几条边？', options: ['5条', '6条', '7条', '4条'], answer: '6条', explanation: '六边形有6条边' },
  { id: 'shape_semi_circle', type: 'shape', title: '认识半圆形', level: 11, question: '一个圆形从中间切开，变成什么形状？', options: ['半圆形', '三角形', '椭圆形', '扇形'], answer: '半圆形', explanation: '圆形切成两半就是半圆形' },

  // 更多生活中的形状
  { id: 'shape_life_window', type: 'shape', title: '窗户的形状', level: 11, question: '教室里的窗户通常是什么形状的？', options: ['长方形', '圆形', '三角形', '梯形'], answer: '长方形', explanation: '窗户大多是长方形的' },
  { id: 'shape_life_plate', type: 'shape', title: '盘子的形状', level: 11, question: '吃饭用的盘子是什么形状的？', options: ['圆形', '正方形', '三角形', '长方形'], answer: '圆形', explanation: '盘子通常是圆形的' },
  { id: 'shape_life_tent', type: 'shape', title: '帐篷的形状', level: 11, question: '帐篷的侧面像什么图形？', options: ['三角形', '正方形', '圆形', '长方形'], answer: '三角形', explanation: '帐篷侧面是三角形的' },
  { id: 'shape_life_tv', type: 'shape', title: '电视的形状', level: 11, question: '电视机屏幕通常是什么形状的？', options: ['长方形', '圆形', '三角形', '梯形'], answer: '长方形', explanation: '电视屏幕是长方形的' },
  { id: 'shape_life_stop', type: 'shape', title: '停车标志', level: 11, question: '路边的停车标志牌通常是什么形状的？', options: ['圆形', '三角形', '八边形', '正方形'], answer: '圆形', explanation: '停车标志是圆形的' },

  // 3D图形属性深入
  { id: 'shape_3d_cube_edges', type: 'shape', title: '正方体有几条棱', level: 11, question: '正方体有几条棱（边）？', options: ['8条', '10条', '12条', '6条'], answer: '12条', explanation: '正方体有12条一样长的棱' },
  { id: 'shape_3d_cube_vertices', type: 'shape', title: '正方体有几个顶点', level: 11, question: '正方体有几个顶点（角）？', options: ['6个', '8个', '12个', '4个'], answer: '8个', explanation: '正方体有8个顶点' },
  { id: 'shape_3d_cylinder_faces', type: 'shape', title: '圆柱体有几个面', level: 11, question: '圆柱体有几个面？', options: ['2个', '3个', '4个', '1个'], answer: '3个', explanation: '圆柱体有2个圆形底面和1个侧面，共3个面' },
  { id: 'shape_3d_sphere_faces', type: 'shape', title: '球体有几个面', level: 11, question: '球体有几个平面？', options: ['0个', '1个', '2个', '很多个'], answer: '0个', explanation: '球体表面是弯曲的，没有平面' },
  { id: 'shape_3d_cone_faces', type: 'shape', title: '圆锥体有几个面', level: 11, question: '圆锥体有几个面？', options: ['1个', '2个', '3个', '4个'], answer: '2个', explanation: '圆锥体有1个圆形底面和1个锥面' },

  // 图形分类
  { id: 'shape_class_1', type: 'shape', title: '图形分类', level: 11, question: '正方形和长方形有什么共同点？', options: ['都有4条边', '都是圆的', '都有3条边', '都没有角'], answer: '都有4条边', explanation: '正方形和长方形都有4条边，都是四边形' },
  { id: 'shape_class_2', type: 'shape', title: '图形分类', level: 11, question: '下面哪个图形没有角？', options: ['圆形', '三角形', '正方形', '长方形'], answer: '圆形', explanation: '圆形是一条连续的曲线，没有角' },
  { id: 'shape_class_3', type: 'shape', title: '图形分类', level: 11, question: '正方体和正方形最大的区别是什么？', options: ['正方体是立体的', '正方体更小', '正方形有面', '没有区别'], answer: '正方体是立体的', explanation: '正方形是平面的，正方体是立体的' },
]
