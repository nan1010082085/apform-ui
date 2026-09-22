import { describe, expect, it } from 'vitest'
import { SCHEMA_UI_VERSION } from '../version'
import pkg from '../../package.json'

describe('SCHEMA_UI_VERSION', () => {
  it('与 package.json version 一致', () => {
    expect(SCHEMA_UI_VERSION).toBe(pkg.version)
  })
})
