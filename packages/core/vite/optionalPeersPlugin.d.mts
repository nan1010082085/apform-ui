/**
 * 宿主 Vite 插件：可选 peer 未安装时解析到空模块，已安装时使用真实包。
 * 返回结构类型，避免把组件库自己的 Vite 类型带进宿主工程。
 */
export function apformOptionalPeers(): {
  name: string
  enforce: 'pre'
}

/**
 * 命中可选 peer 时返回包名
 * @param id 模块说明符
 */
export function matchOptionalPeer(id: string): string | null

/**
 * 未安装时的占位文件绝对路径
 * @param id 模块说明符
 */
export function optionalPeerStubPath(id: string): string
