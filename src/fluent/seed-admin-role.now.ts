/**
 * Phase 1 · P1-05 / MVP-A3 — Seed default admin role assignment.
 * Features: M3 (mvp/features.md). Stories: US-34a-03, US-37a-06.
 * Bootstraps a usable instance by granting the CMS admin role to the OOTB
 * System Administrator ('admin') user on first install, so the CMS is
 * operable immediately after deployment.
 */
import { Record } from '@servicenow/sdk/core'
import { cmsAdmin } from './roles.now'

// OOTB System Administrator (user_name = 'admin'); stable platform sys_id.
const ADMIN_USER_SYS_ID = '6816f79cc0a8016401c5a33be04be441'

export const seedCmsAdminGrant = Record({
    $id: Now.ID['seed_cms_admin_grant'],
    $meta: { installMethod: 'first install' },
    table: 'sys_user_has_role',
    data: {
        user: ADMIN_USER_SYS_ID,
        role: cmsAdmin, // same-app Role() record → resolves to its hashed sys_id
    },
})
