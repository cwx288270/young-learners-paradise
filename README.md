# 幼小衔接学习乐园 🎒

面向 3-8 岁儿童的幼小衔接学习应用，涵盖拼音、数学、识字、阅读、写字五大模块。基于 React + Capacitor 构建，支持 Android 真机和 Web 浏览器。

## 功能模块

| 模块 | 内容量 | 说明 |
|------|--------|------|
| 🏝️ 拼音岛 | 63个拼音 + 350音节 + 60声调 | 声母/韵母/整体认读三阶段学习，两拼法/三拼法拼读 |
| 🏔️ 数学山 | 1800+ 道题 | 21个关卡，从数数到100以内加减、乘法启蒙、图形规律、应用题 |
| 🌳 识字森林 | 3000 汉字 | 含字源演变说明，支持看字选拼音/听音选字等测验模式 |
| 📚 阅读谷 | 41 篇故事 | 四个难度级别，每篇附带选择题，含成语故事和寓言 |
| ✏️ 写字坊 | 100 字笔画指导 | Canvas 描红 + 笔画笔顺提示 + 字源演变 |

## 技术栈

| 层 | 技术 |
|----|------|
| 框架 | React 18 + TypeScript 5.6 |
| 构建 | Vite 6 (Web) / Capacitor 8 (Android) |
| 状态管理 | Zustand 5 |
| UI | Tailwind CSS 3 + Framer Motion 11 |
| 语音 | @capacitor-community/text-to-speech (Android 原生 TTS) |
| 数据库 | capacitor-community/sqlite (Android) / localStorage (Web fallback) |
| CI/CD | GitHub Actions → 自动构建 APK + Release |

## 家长功能

- **多孩子档案**：支持多个孩子独立学习进度
- **学习报告**：每日学习时长、掌握内容、获得星星、连续打卡天数
- **管理员模式**（密码 1234）：解锁全部关卡、检查版本更新

## 开发指南

```bash
# 安装依赖
npm install

# Web 开发
npm run dev

# Android 构建
npm run build:web
npx cap sync
npx cap open android
```

## 更新机制

App 启动时自动检查 GitHub Releases 最新版本。管理员模式下首页会显示更新横幅，点击"立即更新"即可下载并安装最新 APK，无需手动下载安装。

## 版本号管理

`package.json` 的 `version` 字段为唯一版本源。发版前同步更新 `src/renderer/utils/updater.ts` 中的 `APP_VERSION` 常量。推送后 CI 自动构建 APK 并发布 Release。

## 项目文档

- `CONTEXT.md` — 完整项目上下文（技术细节、架构、约定、已知问题）
- `docs/` — 产品需求、技术设计等详细文档
