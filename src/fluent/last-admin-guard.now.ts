/**
 * MVP-A5 / P1-03 — BR-01 last-enabled-admin guard (business rule definition).
 * Features: M5 (mvp/features.md). Stories: US-02d-02, US-19a-04.
 * Prevents disabling the last enabled CMS administrator. Logic lives in
 * ../server/last-admin-guard.server.js (legacy script, ambient Glide globals).
 */
import { BusinessRule } from '@servicenow/sdk/core'

export const lastAdminGuard = BusinessRule({
    $id: Now.ID['br_last_admin_guard'],
    name: 'CMS Last Admin Guard',
    table: 'sys_user',
    when: 'before',
    action: ['update'],
    order: 100,
    active: true,
    condition: 'current.active.changesTo(false)',
    abortAction: true,
    description: 'BR-01: block disabling the last enabled cms_admin (US-02d-02).',
    script: Now.include('../server/last-admin-guard.server.js'),
})
