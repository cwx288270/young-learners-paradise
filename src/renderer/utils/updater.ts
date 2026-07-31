import { registerPlugin } from '@capacitor/core'

// AppUpdater 原生插件接口
interface AppUpdaterPlugin {
  install(options: { url: string }): Promise<{ installing: boolean }>
  addListener(eventName: 'downloadProgress', callback: (data: { progress: number }) => void): Promise<void>
}

const AppUpdater = registerPlugin<AppUpdaterPlugin>('AppUpdater')

// 当前 App 版本 — 发版时需要同步更新 package.json 中的 version
export const APP_VERSION = '1.0.0'

export interface UpdateInfo {
  hasUpdate: boolean
  latestVersion: string
  downloadUrl: string
  body: string
}

function compareVersions(a: string, b: string): number {
  const partsA = a.replace(/^v/, '').split('.').map(Number)
  const partsB = b.replace(/^v/, '').split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    const diff = (partsA[i] || 0) - (partsB[i] || 0)
    if (diff !== 0) return diff
  }
  return 0
}

export async function checkForUpdate(): Promise<UpdateInfo> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/cwx288270/young-learners-paradise/releases/latest',
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    )
    if (!res.ok) return { hasUpdate: false, latestVersion: '', downloadUrl: '', body: '' }

    const release = await res.json()
    const latestVersion = release.tag_name
    const hasUpdate = compareVersions(latestVersion, APP_VERSION) > 0

    const asset = release.assets?.find((a: any) => a.name?.endsWith('.apk'))

    return {
      hasUpdate,
      latestVersion,
      downloadUrl: asset?.browser_download_url || '',
      body: release.body || '',
    }
  } catch {
    return { hasUpdate: false, latestVersion: '', downloadUrl: '', body: '' }
  }
}

export async function installUpdate(
  url: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  if (onProgress) {
    await AppUpdater.addListener('downloadProgress', (data) => {
      onProgress(data.progress)
    })
  }
  await AppUpdater.install({ url })
}
