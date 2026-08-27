/**
 * @apform-ui/plugins/permission — 权限指令插件
 */
import { ref, type App, type InjectionKey, inject, type Directive } from 'vue'

export interface PermissionOptions {
  /** 获取当前用户权限列表 */
  getPermissions: () => string[] | Promise<string[]>
}

const PERM_KEY: InjectionKey<ReturnType<typeof createPermissionPlugin>> = Symbol('schema-permission')

export function createPermissionPlugin(options: PermissionOptions) {
  const permissions = ref<string[]>([])

  async function loadPermissions() {
    permissions.value = await options.getPermissions()
  }

  function hasPermission(code: string): boolean {
    return permissions.value.includes(code) || permissions.value.includes('*')
  }

  function hasAnyPermission(codes: string[]): boolean {
    return codes.some((code) => hasPermission(code))
  }

  function hasAllPermissions(codes: string[]): boolean {
    return codes.every((code) => hasPermission(code))
  }

  return {
    permissions,
    loadPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    install(app: App) {
      app.provide(PERM_KEY, this)

      // v-permission="'code'"
      // v-permission="['code1', 'code2']"
      app.directive('permission', {
        mounted(el, binding) {
          const codes = Array.isArray(binding.value) ? binding.value : [binding.value]
          if (!hasAnyPermission(codes)) {
            el.parentNode?.removeChild(el)
          }
        },
      } as Directive)
    },
  }
}

export function usePermission() {
  const perm = inject(PERM_KEY)
  if (!perm) throw new Error('[apform-ui] usePermission() 必须在 createPermissionPlugin() 之后使用')
  return perm
}

/** v-permission 指令 */
export const vPermission: Directive = {
  mounted(_el, _binding) {
    // 实际逻辑在 install 中注册
  },
}
