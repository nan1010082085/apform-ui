/**
 * permission 插件单测 — 通吃 / 按码 / reload
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createApp, nextTick } from 'vue'
import {
  createPermissionPlugin,
  subjectHasAny,
  subjectHasAll,
  isPlatformAdmin,
  type PermissionSubject,
} from './permission'

describe('subjectHasAny / subjectHasAll', () => {
  it('platform_admin 通吃', () => {
    const s: PermissionSubject = { platformRole: 'platform_admin', permissions: [] }
    expect(subjectHasAny(s, ['tenant:delete'])).toBe(true)
    expect(subjectHasAll(s, ['a', 'b'])).toBe(true)
  })

  it('isPlatformAdmin 标记通吃', () => {
    expect(isPlatformAdmin({ isPlatformAdmin: true })).toBe(true)
    expect(subjectHasAny({ isPlatformAdmin: true, permissions: [] }, ['x'])).toBe(true)
  })

  it('isAdmin 租管通吃', () => {
    const s: PermissionSubject = { isAdmin: true, permissions: [] }
    expect(subjectHasAny(s, ['tenant:delete'])).toBe(true)
  })

  it('普通用户按码 OR', () => {
    const s: PermissionSubject = { permissions: ['user:view', 'user:edit'] }
    expect(subjectHasAny(s, ['user:edit', 'user:delete'])).toBe(true)
    expect(subjectHasAny(s, ['user:delete'])).toBe(false)
  })

  it('普通用户按码 AND', () => {
    const s: PermissionSubject = { permissions: ['user:view', 'user:edit'] }
    expect(subjectHasAll(s, ['user:view', 'user:edit'])).toBe(true)
    expect(subjectHasAll(s, ['user:view', 'user:delete'])).toBe(false)
  })

  it('展示访客只有 view', () => {
    const s: PermissionSubject = { permissions: ['ai:workflow:view', 'chengyu:access'] }
    expect(subjectHasAny(s, ['ai:workflow:view'])).toBe(true)
    expect(subjectHasAny(s, ['ai:workflow'])).toBe(false)
    expect(subjectHasAny(s, ['chengyu:chat'])).toBe(false)
  })

  it('* 通配', () => {
    expect(subjectHasAny({ permissions: ['*'] }, ['anything'])).toBe(true)
  })

  it('空 required 为 true；无 subject 为 false', () => {
    expect(subjectHasAny(null, [])).toBe(true)
    expect(subjectHasAny(null, ['a'])).toBe(false)
  })
})

describe('createPermissionPlugin', () => {
  let current: PermissionSubject | null

  beforeEach(() => {
    current = null
  })

  it('reload 后 has 反映 getSubject', async () => {
    const perm = createPermissionPlugin({
      getSubject: () => current,
    })
    current = { permissions: ['user:view'] }
    await perm.reload()
    expect(perm.has('user:view')).toBe(true)
    expect(perm.has('user:delete')).toBe(false)

    current = { isAdmin: true, permissions: [] }
    await perm.reload()
    expect(perm.has('tenant:delete')).toBe(true)
  })

  it('兼容 getPermissions', async () => {
    const perm = createPermissionPlugin({
      getPermissions: async () => ['a:1'],
    })
    await perm.reload()
    expect(perm.hasAny(['a:1'])).toBe(true)
  })

  it('v-permission 在 reload 后更新显隐', async () => {
    current = { permissions: [] }
    const perm = createPermissionPlugin({ getSubject: () => current })
    const app = createApp({
      template: `<button id="btn" v-permission="'user:delete'">删</button>`,
    })
    app.use(perm)
    const root = document.createElement('div')
    document.body.appendChild(root)
    app.mount(root)
    await perm.reload()
    await nextTick()

    const btn = root.querySelector('#btn') as HTMLElement
    expect(btn).toBeTruthy()
    expect(btn.style.display).toBe('none')

    current = { permissions: ['user:delete'] }
    await perm.reload()
    await nextTick()
    expect(btn.style.display).not.toBe('none')

    app.unmount()
    root.remove()
  })
})
