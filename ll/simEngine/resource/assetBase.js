// simEngine/resource/assetBase.js
// 资源层 —— 资源根路径推断。
// 根据当前页面 URL 自动推断部署所在目录，作为所有静态资源（images/audio/…）
// 的公共前缀。例如部署到 /ll/ 时得到 '/ll/'，部署到根目录时得到 '/'。
//
// 结果写入 window.__ASSET_BASE__，供全项目按 `window.__ASSET_BASE__ + 'images/...'`
// 方式拼接资源 URL。此模块在被 import 时立即执行（副作用），需在任何读取
// __ASSET_BASE__ 的模块之前加载。

/**
 * 计算资源根前缀。
 * @returns {string} 以 '/' 结尾的目录路径
 */
export function computeAssetBase() {
    if (typeof window === 'undefined' || !window.location) return '/'
    const path = window.location.pathname
    return path.substring(0, path.lastIndexOf('/') + 1) || '/'
}

/**
 * 计算并写入 window.__ASSET_BASE__（幂等）。
 * @returns {string} 已设置的资源根前缀
 */
export function setupAssetBase() {
    const base = computeAssetBase()
    if (typeof window !== 'undefined') {
        window.__ASSET_BASE__ = base
    }
    return base
}

// 导入即生效
const ASSET_BASE = setupAssetBase()

export default ASSET_BASE
