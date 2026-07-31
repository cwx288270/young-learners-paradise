# 项目上下文 — 幼小衔接学习乐园

> 自动维护，每次重要变更后更新。新对话开始时读取此文件即可恢复上下文。

## 一、基本信息

- **项目路径**: `C:\Pisx_work\gitlab\ai_learn\young-learners`
- **GitHub**: `https://github.com/cwx288270/young-learners-paradise`
- **GitHub Token**: `<your-github-token>`（被墙时网页操作）
- **默认密码**: `1234`
- **家长模式密码**: `1234`

## 二、技术栈

| 层 | 技术 |
|----|------|
| 框架 | React 18 + TypeScript 5.6 |
| 构建 | Vite 6 (Web) / electron-vite (桌面) / Capacitor 8 (Android) |
| 路由 | react-router-dom BrowserRouter |
| 状态管理 | Zustand 5 (4 stores) |
| UI | Tailwind CSS 3 |
| 动画 | Framer Motion 11 |
| 语音 | @capacitor-community/text-to-speech (Android 原生 TTS 静态导入) + Web Speech API (web fallback) |
| 数据库 | capacitor-community/sqlite (Android) / better-sqlite3 (Electron) / localStorage (fallback) |
| CI/CD | GitHub Actions → 自动构建 APK |

## 三、目录结构要点

```
src/renderer/
├── pages/           # 22 个路由页面
│   ├── Home.tsx, Login.tsx
│   ├── pinyin/      # Index(6关地图), Learn(三阶段), Play(3模式)
│   ├── math/        # Index(10关地图), Learn(口诀+选择), Play(登山挑战)
│   ├── character/   # Index(30关), Learn(四步), Practice, Writing, Test
│   ├── reading/     # Index(3级书架), Story(单页+答题)
│   ├── writing/     # Index(字卡网格), Draw(Canvas描红)
│   └── parent/      # Index(仪表盘), Report, Unlock(PIN)
├── components/
│   ├── layout/AppShell.tsx    # 主布局: 顶栏+内容+底导
│   ├── common/PinyinText.tsx  # 拼音标注组件
│   └── learning/Celebration.tsx
├── content/         # 静态学习内容数据
│   ├── characters.ts    # 3000 汉字
│   ├── pinyin.ts        # 63拼音 + 94音节 + 20声调 + 6儿歌
│   ├── reading.ts       # 22篇故事, 88道理解题
│   └── math/            # 11文件, 10关, 572题
├── stores/          # Zustand stores
│   ├── useUserStore.ts      # 孩子档案 (SQLite+localStorage)
│   ├── useProgressStore.ts  # 学习进度 (SQLite+localStorage)
│   ├── useAdminStore.ts     # 管理员模式 (localStorage)
│   └── useAppStore.ts       # UI状态 (内存)
├── utils/
│   ├── sqliteAdapter.ts     # 统一数据库适配层
│   ├── helpers.ts           # TTS, 艾宾浩斯, 工具函数
│   └── dataAccess.ts        # 旧数据访问层 (Electron IPC)
└── types/index.ts       # 15 个类型定义

android/             # Capacitor Android 原生项目
.github/workflows/   # GitHub Actions APK 构建
```

## 四、Store 使用规范

**Zustand selector 铁律**: 绝不能从 selector 返回新对象/数组（会导致无限循环）：
```typescript
// ✅ 正确
const progress = useProgressStore(s => s.progress)
const isAdmin = useAdminStore(s => s.isAdmin)
const learnedIds = useMemo(() => new Set(...), [progress])

// ❌ 错误 — 每次返回新数组
const items = useProgressStore(s => s.progress.filter(...))
```

## 五、模块色彩

```
拼音 #00B894→#00CEC9  数学 #E17055→#FDCB6E  识字 #5B8DEF→#74B9FF
阅读 #6C5CE7→#A29BFE  写字 #FD79A8→#FAB1D0
```

## 六、已修复的 Bug 记录

### 6.1 安卓适配相关
| 问题 | 根因 | 修复 |
|------|------|------|
| 状态栏遮挡顶部按钮 | WebView 未适配安全区域 | styles.xml 透明状态栏 + CSS `env(safe-area-inset-*)` |
| 导航栏遮挡底部按钮 | 同上 | MainActivity.java `setDecorFitsSystemWindows(false)` |
| 屏幕旋转内容错乱 | 未锁定方向 | AndroidManifest.xml `screenOrientation="portrait"` + Java 代码双保险 |
| 语音朗读失效 | Web Speech API 在 Android WebView 不可用 | 改用 `@capacitor-community/text-to-speech` 原生 TTS 静态导入 |
| TTS 动态 import 代码分割 | Vite 将动态 import 分离为独立 chunk，WebView 可能加载失败 | 改为静态 import，TTS 插件直接打包进主 bundle |
| MuMu 模拟器拼音无声 | MuMu 12 无 TTS 引擎 + WebView 不支持 speechSynthesis | 真机测试正常；添加 `checkChineseTTS()` 和 `openTTSInstall()` 兜底 |

### 6.2 交互相关
| 问题 | 根因 | 修复 |
|------|------|------|
| 答案总是第一个 | useEffect 异步设置导致 | 改为 useMemo 同步随机化 shuffle |
| 正确反馈导致页面抖动 | 反馈文字动态插入布局 | 反馈区加 `minHeight: 36px` 占位 |
| 识字按钮乱码 | 文件中 `\uXXXX` 写成字面文本 | 改为实际中文字符 |
| 家长页面 TS 类型错误 | recentDays 类型不匹配 | 重写 ParentIndex |

### 6.3 数学内容相关
| 问题 | 根因 | 修复 |
|------|------|------|
| 图形题无可视化 | 只有文字选项 | 添加 ShapeVisual/PatternVisual 组件 |
| 应用题标题泄露答案 | title 写了算式 | 改为描述性标题，type 改 'word' |
| 凑十法/破十法功能异常 | 3阶段流程太复杂 | 简化为口诀横幅+直接答题 |

### 6.4 之前修复的
- Zustand 无限循环（PinyinIndex）- selector 返回新数组
- 拼音读英文 - 改用 `currentPinyin.sound` + 中文 voice 选择
- 减法读 "gang" - 数学符号预处理（-→减，+→加）

## 七、Android 构建流程

```bash
# 本地构建
npm run build:web              # 构建 Web → dist/
npx cap sync                   # 同步到 android/
npx cap open android           # Android Studio 打开

# CI 自动构建 (GitHub Actions)
git push origin main           # 推送触发
# → .github/workflows/build-apk.yml
# → Actions 页面下载 artifact
```

**构建参数**: Node 22, Java 21, compileSdk 36, minSdk 24

## 八、关键组件模式

### PinyinText 拼音标注组件
```tsx
<PinyinText text="你好世界" pinyinSize={12} charSize={20} color="#2D3436" />
// 自动查找拼音，在汉字上方显示
```

### 选项随机化模式（必须遵守）
```typescript
// ✅ 用 useMemo 同步计算，首次渲染就是随机顺序
const shuffled = useMemo(() =>
  [...options].sort(() => Math.random() - 0.5), [question]
)
```

### 反馈防抖模式（必须遵守）
```tsx
<div style={{ minHeight: '36px' }}>
  {feedback === 'correct' && <div>✓ 太棒了！</div>}
  {feedback === 'error' && <div>错误提示</div>}
</div>
```

### voice 调用
```typescript
import { speakText } from '../../utils/helpers'
speakText(text, rate) // Android 用原生 TTS(静态导入), Web 用 Web Speech API
```

**TTS 架构**（helpers.ts）:
- 静态导入 `import { TextToSpeech } from '@capacitor-community/text-to-speech'`（不再动态 import，避免代码分割）
- `speakText()`: 先尝试原生 TTS → 失败则走 Web Speech API
- `warmUpSpeech()`: 首次点击时预热引擎
- `checkChineseTTS()`: 检测 zh-CN 语言是否可用
- `openTTSInstall()`: 引导安装系统 TTS 语音数据
- 诊断日志: `window.__ttsDiag` 数组记录完整 TTS 调用链路

**平台兼容性**:
| 环境 | 原生 TTS | Web Speech | 结果 |
|------|---------|------------|------|
| 国产真机(小米/华为/OPPO) | ✅ 预装讯飞引擎 | ❌ WebView 不支持 | ✅ 正常 |
| MuMu 模拟器 | ❌ 无 TTS 引擎 | ❌ WebView 不支持 | ❌ 需装 Google TTS |
| 海外真机/原生Android | ⚠️ 需装引擎 | ❌ WebView 不支持 | ⚠️ 引导安装 |
| 桌面浏览器 | — | ✅ Chrome/Edge 支持 | ✅ 正常 |

## 九、数据流

```
App启动 → initDatabase()
  ├── Capacitor? → capacitor-community/sqlite → data.db(私有目录)
  ├── Electron?  → better-sqlite3 (IPC bridge) → data.db(appData)
  └── 浏览器     → localStorage (yl_progress, yl_daily_*, yl_profiles)

Stores 优先级: SQLite → localStorage → 内存
```

## 十、下次工作备忘

- 需要时读取 `docs/01-prd/产品功能文档.md` 和 `docs/03-architecture/技术设计文档.md`
- APK 下载: GitHub Actions → Artifacts
- 测试: MuMu 模拟器拖拽 APK 安装（注意：MuMu 缺少 TTS 引擎，需装 Google TTS APK 才能测试语音）
- 真机: 国产手机（小米/华为/OPPO）自带 TTS 引擎，语音功能正常
- 拼音岛 `/pinyin` TTS 诊断面板已移除（2026-07-31）
- GitHub Push 注意: CONTEXT.md 中勿含真实 Token（会触发 secret scanning 拦截）

## 十一、内容扩充记录（2026-07-31）

### 11.1 数学模块（~576 → ~1800+ 题）
- 新增6个内容文件：`comparison.ts`（比大小）、`decomposition.ts`（数的分成）、`multiplication.ts`（乘法启蒙）、`numbers100.ts`（数字51-100）、`timeMoney.ts`（时间货币）、`measurement.ts`（测量比较）
- 扩展7个现有文件：补全加减法组合、addSub50扩展至100以内、图形+15题、规律+20题、应用题+30题
- `math/index.ts` 关卡从10级重组为21级
- `types/index.ts` MathData.type 新增6个值

### 11.2 拼音模块
- 音节表：113 → ~350个（按声母×韵母矩阵系统性补全）
- 声调练习：20 → ~60个（新增混淆对比组、双音节模式、轻声）
- 儿歌：6 → 15首

### 11.3 阅读模块
- 22篇 → 41篇故事，88 → ~180道理解题
- 新增一级6篇、二级5篇、三级4篇、四级4篇（进阶成语寓言）

### 11.4 识字模块
- `COMMON_FIRST` 从150字扩充至300字

### 11.5 写字模块
- 新建 `content/writing.ts`，笔画/字源数据从组件移入内容层
- 笔画指导：~20 → ~100字，字源演变：~26 → 50字
- `Draw.tsx` 和 `Learn.tsx` 改为从 content/writing 导入

## 十二、APK 自动更新功能（2026-07-31）

- 自定义 Capacitor 插件 `AppUpdaterPlugin.java`：下载 APK 到缓存并通过 FileProvider 调起系统安装器
- `utils/updater.ts`：调用 GitHub Releases API 检查最新版本，对比本地版本号
- 首页（`Home.tsx`）：管理员模式下自动检测更新，显示下载进度横幅
- CI（`build-apk.yml`）：push 时自动构建 APK 并发布 GitHub Release
- 版本号在 `package.json` 和 `updater.ts` 的 `APP_VERSION` 中同步
- 新增权限：`REQUEST_INSTALL_PACKAGES`（Android 8+ 安装 APK 必须）
- FileProvider 已配置，APK 通过 `content://` URI 共享给安装器
