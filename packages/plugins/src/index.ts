/**
 * @apform-ui/plugins — 插件扩展
 *
 * 提供国际化、埋点、权限等 Vue 插件。
 */

export { createI18nPlugin, useI18n } from './i18n'
export { createAnalyticsPlugin, track } from './analytics'
export { createPermissionPlugin, usePermission, vPermission } from './permission'
