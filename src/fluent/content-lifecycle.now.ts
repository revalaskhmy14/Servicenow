/**
 * Wave C · MVP-C1 — ContentLifecycle Script Include registration (feature M10).
 * Server logic in ../server/content-lifecycle.server.js. Callable in-scope as
 * new ContentLifecycle() and cross-scope as the apiName below.
 */
import { ScriptInclude } from '@servicenow/sdk/core'

export const contentLifecycle = ScriptInclude({
    $id: Now.ID['si_content_lifecycle'],
    name: 'ContentLifecycle',
    apiName: 'x_1863391_cms_now.ContentLifecycle',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Shared content_item lifecycle + versioning transitions (M10).',
    script: Now.include('../server/content-lifecycle.server.js'),
})
