/**
 * @apform-ui/plugins/permission — 权限指令与组合式 API
 *
 * 语义与 platform-shared `hasPermission` 对齐：platform_admin / isAdmin 通吃；否则按码 OR；`*` 通配。
 * 无权限策略：display:none（保留节点以便 subject 变化后 updated/reload 可恢复）。
 */
import {
  ref,
  h,
  defineComponent,
  type App,
  type InjectionKey,
  inject,
  type Directive,
  type PropType,
} from 'vue'

/** 可参与权限判定的用户摘要（与 platform-shared PermissionSubject 对齐） */
export interface PermissionSubject {
  permissions?: string[] | null
  isAdmin?: boolean | null
  platformRole?: 'none' | 'platform_admin' | string | null
  isPlatformAdmin?: boolean | null
}

export interface PermissionOptions {
  /** 返回当前用户主体 */
  getSubject?: () => PermissionSubject | null | undefined | Promise<PermissionSubject | null | undefined>
  /** @deprecated 使用 getSubject */
  getPermissions?: () => string[] | Promise<string[]>
}

const PERM_KEY: InjectionKey<ReturnType<typeof createPermissionPlugin>> = Symbol('schema-permission')

/**
 * 是否超级管理员
 * @param subject - 用户主体
 */
export function isPlatformAdmin(subject: PermissionSubject | null | undefined): boolean {
  if (!subject) return false
  if (subject.isPlatformAdmin === true) return true
  return subject.platformRole === 'platform_admin'
}

/**
 * 是否通吃（超管或租户管理员）
 * @param subject - 用户主体
 */
function isElevated(subject: PermissionSubject): boolean {
  return isPlatformAdmin(subject) || subject.isAdmin === true
}

/**
 * 是否具备任一所需权限码（OR）
 * @param subject - 用户主体
 * @param required - 权限码列表；空数组视为不要求 → true
 */
export function subjectHasAny(
  subject: PermissionSubject | null | undefined,
  required: string[],
): boolean {
  if (required.length === 0) return true
  if (!subject) return false
  if (isElevated(subject)) return true
  const owned = new Set(subject.permissions || [])
  if (owned.has('*')) return true
  return required.some((code) => owned.has(code))
}

/**
 * 是否具备全部所需权限码（AND）
 * @param subject - 用户主体
 * @param required - 权限码列表
 */
export function subjectHasAll(
  subject: PermissionSubject | null | undefined,
  required: string[],
): boolean {
  if (required.length === 0) return true
  if (!subject) return false
  if (isElevated(subject)) return true
  const owned = new Set(subject.permissions || [])
  if (owned.has('*')) return true
  return required.every((code) => owned.has(code))
}

type BoundEl = HTMLElement & {
  __apformPermDisplay?: string
  __apformPermCodes?: string[]
  __apformPermAll?: boolean
}

/**
 * 创建权限插件
 * @param options - getSubject 或兼容 getPermissions
 */
export function createPermissionPlugin(options: PermissionOptions) {
  const subject = ref<PermissionSubject | null>(null)
  const boundElements = new Set<BoundEl>()

  /**
   * 从 options 解析主体
   */
  async function resolveSubject(): Promise<PermissionSubject | null> {
    if (options.getSubject) {
      const s = await options.getSubject()
      return s ?? null
    }
    if (options.getPermissions) {
      const permissions = await options.getPermissions()
      return { permissions }
    }
    return null
  }

  /**
   * 重新拉取主体并刷新已绑定节点
   */
  async function reload() {
    subject.value = await resolveSubject()
    for (const el of boundElements) {
      applyElement(el)
    }
  }

  /** @deprecated 使用 reload */
  async function loadPermissions() {
    await reload()
  }

  function has(code: string): boolean {
    return subjectHasAny(subject.value, [code])
  }

  function hasAny(codes: string[]): boolean {
    return subjectHasAny(subject.value, codes)
  }

  function hasAll(codes: string[]): boolean {
    return subjectHasAll(subject.value, codes)
  }

  function hasPermission(code: string): boolean {
    return has(code)
  }

  function hasAnyPermission(codes: string[]): boolean {
    return hasAny(codes)
  }

  function hasAllPermissions(codes: string[]): boolean {
    return hasAll(codes)
  }

  /**
   * 按绑定状态显隐节点
   * @param el - DOM 元素
   */
  function applyElement(el: BoundEl) {
    const codes = el.__apformPermCodes || []
    const ok = el.__apformPermAll ? hasAll(codes) : hasAny(codes)
    if (el.__apformPermDisplay === undefined) {
      el.__apformPermDisplay = el.style.display
    }
    el.style.display = ok ? (el.__apformPermDisplay || '') : 'none'
  }

  /**
   * 解析指令值为码列表
   * @param value - 指令值
   */
  function normalizeCodes(value: unknown): string[] {
    if (value == null || value === '') return []
    return Array.isArray(value) ? value.map(String) : [String(value)]
  }

  /**
   * 绑定元素权限检查
   * @param el - 元素
   * @param binding - 指令绑定
   */
  /**
   * 绑定元素权限检查
   * @param el - 元素
   * @param value - 指令值
   * @param modifiers - 指令修饰符
   */
  function bindElement(
    el: BoundEl,
    value: unknown,
    modifiers: Partial<Record<string, boolean>>,
  ) {
    el.__apformPermCodes = normalizeCodes(value)
    el.__apformPermAll = !!modifiers.all
    boundElements.add(el)
    applyElement(el)
  }

  const directive: Directive = {
    mounted(el, binding) {
      bindElement(el as BoundEl, binding.value, binding.modifiers)
    },
    updated(el, binding) {
      bindElement(el as BoundEl, binding.value, binding.modifiers)
    },
    unmounted(el) {
      boundElements.delete(el as BoundEl)
    },
  }

  const api = {
    subject,
    reload,
    loadPermissions,
    has,
    hasAny,
    hasAll,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    install(app: App) {
      app.provide(PERM_KEY, api)
      app.directive('permission', directive)
      app.component('PermissionButton', PermissionButton)
    },
  }

  return api
}

/**
 * 注入权限 API
 */
export function usePermission() {
  const perm = inject(PERM_KEY)
  if (!perm) throw new Error('[apform-ui] usePermission() 必须在 createPermissionPlugin() 之后使用')
  return perm
}

/** 独立导出的指令壳（实际逻辑在 install 注册） */
export const vPermission: Directive = {
  mounted() {},
}

/**
 * 权限按钮：无权限不渲染；有权限渲染原生 button
 */
export const PermissionButton = defineComponent({
  name: 'PermissionButton',
  inheritAttrs: false,
  props: {
    code: { type: String, default: undefined },
    codes: { type: Array as PropType<string[]>, default: undefined },
    all: { type: Boolean, default: false },
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    const perm = usePermission()
    return () => {
      const list = props.codes?.length ? props.codes : props.code ? [props.code] : []
      const ok = props.all ? perm.hasAll(list) : perm.hasAny(list)
      if (!ok) return null
      return h(
        'button',
        {
          type: props.type,
          disabled: props.disabled,
          ...attrs,
        },
        slots.default?.(),
      )
    }
  },
})
