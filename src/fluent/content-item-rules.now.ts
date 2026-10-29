/**
 * Wave C · content_item business rules.
 *  - MVP-C5 (M14) validation + MVP-B5/M23 slug/defaults — before insert/update.
 *  - MVP-C4 (M13) draft versioning on save — after insert/update.
 */
import { BusinessRule } from '@servicenow/sdk/core'

const CONTENT_ITEM = 'x_1863391_cms_now_content_item'

export const contentItemValidation = BusinessRule({
    $id: Now.ID['br_content_item_validation'],
    name: 'CMS Content Item Validation',
    table: CONTENT_ITEM,
    when: 'before',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    description: 'M14 validation (title/priority/tags/type) + M23 slug + defaults.',
    script: Now.include('../server/content-item-validation.server.js'),
})

export const contentItemVersioning = BusinessRule({
    $id: Now.ID['br_content_item_versioning'],
    name: 'CMS Content Item Versioning',
    table: CONTENT_ITEM,
    when: 'after',
    action: ['insert', 'update'],
    order: 200,
    active: true,
    description: 'M13 draft versioning on save via ContentLifecycle.createVersion.',
    script: Now.include('../server/content-item-versioning.server.js'),
})
