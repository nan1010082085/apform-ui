/**
 * AppUserPanel 展示用的用户信息（去业务耦合）
 */
export interface AppUserPanelUser {
  username: string
  displayName?: string
  email?: string | null
  phone?: string | null
  tenantId?: string
}
