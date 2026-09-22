/**
 * 库版本 — 唯一真相源为 packages/core/package.json
 * 文档顶栏 / SCHEMA_UI_VERSION 均从此导出，禁止再手写字面量。
 */
import pkg from '../package.json'

/** 与 npm 包 `@apform-ui/core` version 同步 */
export const SCHEMA_UI_VERSION: string = pkg.version

/** Element Plus fork 基准 */
export const EP_FORK_BASE = '2.14.2'

/** Fork 基准日期 */
export const EP_FORK_DATE = '2026-08-27'
