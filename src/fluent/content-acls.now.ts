/**
 * Wave B · MVP-A4 (M4) + MVP-F1 (M24) — ACLs for the CMS content data model.
 * Design: specs/tasks/phase-2.md P2-09; mvp/features.md §2.1 / §2.7 / §6.
 * Realizes the permission matrix on the Wave B tables using the CMS roles from
 * roles.now.ts (no custom claim engine). One ACL per operation per the security
 * guide. Role hierarchy (cms_admin contains editor→…→reader) means higher roles
 * inherit the access granted to the roles they contain.
 */
import { Acl } from '@servicenow/sdk/core'
import { cmsAdmin, cmsEditor, cmsModerator, cmsAuthor, cmsContributor, cmsReader } from './roles.now'

const CONTENT_ITEM = 'x_1863391_cms_now_content_item'
const CONTENT_TYPE = 'x_1863391_cms_now_content_type'
const CONTENT_FIELD = 'x_1863391_cms_now_content_field'
const CONTENT_ITEM_VERSION = 'x_1863391_cms_now_content_item_version'

/* ───────────────────────── content_item ───────────────────────── */

// Read: any authenticated CMS reader (and, by containment, every higher role).
export const aclContentItemRead = Acl({
    $id: Now.ID['acl_content_item_read'],
    type: 'record',
    table: CONTENT_ITEM,
    operation: 'read',
    decisionType: 'allow',
    roles: [cmsReader],
    adminOverrides: true,
    description: 'M4: authenticated read of content items (cms_reader+).',
})

// Create: authors, contributors, editors.
export const aclContentItemCreate = Acl({
    $id: Now.ID['acl_content_item_create'],
    type: 'record',
    table: CONTENT_ITEM,
    operation: 'create',
    decisionType: 'allow',
    roles: [cmsAuthor, cmsContributor, cmsEditor],
    adminOverrides: true,
    description: 'M4: create content items (author/contributor/editor).',
})

// Write: authors, contributors, editors.
export const aclContentItemWrite = Acl({
    $id: Now.ID['acl_content_item_write'],
    type: 'record',
    table: CONTENT_ITEM,
    operation: 'write',
    decisionType: 'allow',
    roles: [cmsAuthor, cmsContributor, cmsEditor],
    adminOverrides: true,
    description: 'M4: edit content items (author/contributor/editor).',
})

// Delete: moderators only (remove is a moderation action).
export const aclContentItemDelete = Acl({
    $id: Now.ID['acl_content_item_delete'],
    type: 'record',
    table: CONTENT_ITEM,
    operation: 'delete',
    decisionType: 'allow',
    roles: [cmsModerator],
    adminOverrides: true,
    description: 'M4: delete/remove content items (cms_moderator).',
})

// ⚠ SHIP-BLOCKING OVER-EXPOSURE GUARD (mvp/features.md §6, M24).
// Anonymous/unauthenticated read of a content item is granted ONLY when the row
// is both published (is_published=true) AND in the Published state. Drafts and
// Removed items can never be read by the public. The `public` role represents
// unauthenticated visitors; the encoded-query `condition` is the documented ACL
// mechanism and is AND-ed with the role per the ACL "Trinity". Do NOT relax this
// condition — it is the only thing standing between drafts and the public web.
export const aclContentItemPublicRead = Acl({
    $id: Now.ID['acl_content_item_public_read'],
    type: 'record',
    table: CONTENT_ITEM,
    operation: 'read',
    decisionType: 'allow',
    roles: ['public'],
    condition: 'is_published=true^state=Published',
    adminOverrides: true,
    description: 'M24 ship-blocking guard: anonymous read of PUBLISHED items only (is_published=true AND state=Published).',
})

/* ───────────────────────── content_type ───────────────────────── */

export const aclContentTypeRead = Acl({
    $id: Now.ID['acl_content_type_read'],
    type: 'record',
    table: CONTENT_TYPE,
    operation: 'read',
    decisionType: 'allow',
    roles: [cmsReader],
    adminOverrides: true,
    description: 'M4: read content types (cms_reader+).',
})

export const aclContentTypeCreate = Acl({
    $id: Now.ID['acl_content_type_create'],
    type: 'record',
    table: CONTENT_TYPE,
    operation: 'create',
    decisionType: 'allow',
    roles: [cmsAdmin],
    adminOverrides: true,
    description: 'M4: create content types (cms_admin).',
})

export const aclContentTypeWrite = Acl({
    $id: Now.ID['acl_content_type_write'],
    type: 'record',
    table: CONTENT_TYPE,
    operation: 'write',
    decisionType: 'allow',
    roles: [cmsAdmin],
    adminOverrides: true,
    description: 'M4: edit content types (cms_admin).',
})

/* ───────────────────────── content_field ───────────────────────── */

export const aclContentFieldRead = Acl({
    $id: Now.ID['acl_content_field_read'],
    type: 'record',
    table: CONTENT_FIELD,
    operation: 'read',
    decisionType: 'allow',
    roles: [cmsReader],
    adminOverrides: true,
    description: 'M4: read content fields (cms_reader+).',
})

export const aclContentFieldCreate = Acl({
    $id: Now.ID['acl_content_field_create'],
    type: 'record',
    table: CONTENT_FIELD,
    operation: 'create',
    decisionType: 'allow',
    roles: [cmsAdmin],
    adminOverrides: true,
    description: 'M4: create content fields (cms_admin).',
})

export const aclContentFieldWrite = Acl({
    $id: Now.ID['acl_content_field_write'],
    type: 'record',
    table: CONTENT_FIELD,
    operation: 'write',
    decisionType: 'allow',
    roles: [cmsAdmin],
    adminOverrides: true,
    description: 'M4: edit content fields (cms_admin).',
})

/* ─────────────────────── content_item_version ─────────────────────── */

export const aclContentItemVersionRead = Acl({
    $id: Now.ID['acl_content_item_version_read'],
    type: 'record',
    table: CONTENT_ITEM_VERSION,
    operation: 'read',
    decisionType: 'allow',
    roles: [cmsReader],
    adminOverrides: true,
    description: 'M4: read content item versions (cms_reader+).',
})

export const aclContentItemVersionCreate = Acl({
    $id: Now.ID['acl_content_item_version_create'],
    type: 'record',
    table: CONTENT_ITEM_VERSION,
    operation: 'create',
    decisionType: 'allow',
    roles: [cmsAdmin],
    adminOverrides: true,
    description: 'M4: create content item versions (cms_admin).',
})

export const aclContentItemVersionWrite = Acl({
    $id: Now.ID['acl_content_item_version_write'],
    type: 'record',
    table: CONTENT_ITEM_VERSION,
    operation: 'write',
    decisionType: 'allow',
    roles: [cmsAdmin],
    adminOverrides: true,
    description: 'M4: edit content item versions (cms_admin).',
})
