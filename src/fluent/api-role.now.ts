/**
 * Wave D · MVP-D1 — cms_api role + REST endpoint ACL (feature M15, US-27a-01, INT-09).
 * The role gates headless/integration access; the rest_endpoint ACL is enforced
 * on the Scripted REST service so every route requires an authenticated caller
 * holding a CMS role (cms_reader+ for reads, cms_api for integration access).
 */
import { Role, Acl } from '@servicenow/sdk/core'

// Integration/API access role (INT-09 AccessContentApi).
export const cmsApi = Role({
    name: 'x_1863391_cms_now.cms_api',
    description: 'CMS API: access the headless Content REST API.',
})

// REST endpoint ACL — caller must hold any CMS role (reader and up) or the API role.
export const cmsRestAccess = Acl({
    $id: Now.ID['acl_cms_rest_access'],
    type: 'rest_endpoint',
    name: 'x_1863391_cms_now.cms_rest_access',
    operation: 'execute',
    script: `answer = gs.hasRole('x_1863391_cms_now.cms_reader') || gs.hasRole('x_1863391_cms_now.cms_api');`,
})
