import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.younglearners.paradise',
  appName: '幼小衔接学习乐园',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    // 边到边显示，让 WebView 内容延伸到状态栏和导航栏下方
    webContentsDebuggingEnabled: true,
  }
};

export default config;
