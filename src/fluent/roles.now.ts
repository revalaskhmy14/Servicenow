/**
 * Phase 1 · P1-01 — CMS roles and contains hierarchy.
 * Design: specs/design/phase-1-identity-access.md §3
 * Maps spec personas PER-01..PER-06 / built-in roles to scoped ServiceNow roles.
 * Identity, auth, and permission enforcement stay OOTB; only role records are created here.
 */
import { Role } from '@servicenow/sdk/core'

// PER-05 Contributor — draft-only content (create/edit, no publish). US-37b-02
export const cmsContributor = Role({
    name: 'x_1863391_cms_now.cms_contributor',
    description: 'CMS Contributor: create and edit draft content only (no publish).',
})

// PER-04 Author — create and edit content. US-37b-01
export const cmsAuthor = Role({
    name: 'x_1863391_cms_now.cms_author',
    description: 'CMS Author: create and edit content.',
})

// PER-02 Editor — edit and publish content. US-37a-06
export const cmsEditor = Role({
    name: 'x_1863391_cms_now.cms_editor',
    description: 'CMS Editor: edit and publish content.',
})

// PER-03 Moderator — remove/restore (delete) content. US-37a-06
export const cmsModerator = Role({
    name: 'x_1863391_cms_now.cms_moderator',
    description: 'CMS Moderator: moderate content, including remove and restore.',
})

// PER-06 (authenticated) Reader — view content, edit own profile. US-37b-04
export const cmsReader = Role({
    name: 'x_1863391_cms_now.cms_reader',
    description: 'CMS Reader: view published content and manage own profile.',
})

// PER-01 Administrator — full access; aggregates all CMS roles. US-37a-06
export const cmsAdmin = Role({
    name: 'x_1863391_cms_now.cms_admin',
    description: 'CMS Administrator: full administrative access to the CMS application.',
    scopedAdmin: true,
    containsRoles: [cmsEditor, cmsModerator, cmsAuthor, cmsContributor, cmsReader],
})
