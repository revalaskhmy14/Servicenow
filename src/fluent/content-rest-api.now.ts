/**
 * Wave D · MVP-D2/D3 — Content REST API (features M15/M16/M17).
 * Scripted REST service 'cms', v1, ACL-gated by cms_rest_access. Routes mirror
 * inputs/api.md /v1/content-items + /v1/api/content. Handlers in
 * ../server/content-api.js delegate lifecycle ops to ContentLifecycle (M10).
 * Platform URI: /api/x_1863391_cms_now/v1/cms/<path>.
 */
import { RestApi } from '@servicenow/sdk/core'
import { cmsRestAccess } from './api-role.now'
import {
    listItems, getItem, createItem, updateItem,
    publishItem, unpublishItem, cloneItem, removeItem, restoreItem, discardDraftItem,
    apiGetContent, apiCreateContent,
} from '../server/content-api.js'

export const contentRestApi = RestApi({
    $id: Now.ID['rest_cms'],
    name: 'CMS Content API',
    serviceId: 'cms',
    active: true,
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [cmsRestAccess],
    versions: [{ $id: Now.ID['rest_cms_v1'], version: 1, isDefault: true, active: true }],
    routes: [
        { $id: Now.ID['r_items_list'], name: 'list content items', method: 'GET', path: '/content-items', version: 1, script: listItems },
        { $id: Now.ID['r_items_get'], name: 'get content item', method: 'GET', path: '/content-items/{id}', version: 1, script: getItem },
        { $id: Now.ID['r_items_create'], name: 'create content item', method: 'POST', path: '/content-items', version: 1, script: createItem },
        { $id: Now.ID['r_items_update'], name: 'update content item', method: 'PUT', path: '/content-items/{id}', version: 1, script: updateItem },
        { $id: Now.ID['r_items_publish'], name: 'publish', method: 'POST', path: '/content-items/{id}/publish', version: 1, script: publishItem },
        { $id: Now.ID['r_items_unpublish'], name: 'unpublish', method: 'POST', path: '/content-items/{id}/unpublish', version: 1, script: unpublishItem },
        { $id: Now.ID['r_items_clone'], name: 'clone', method: 'POST', path: '/content-items/{id}/clone', version: 1, script: cloneItem },
        { $id: Now.ID['r_items_remove'], name: 'remove', method: 'POST', path: '/content-items/{id}/remove', version: 1, script: removeItem },
        { $id: Now.ID['r_items_restore'], name: 'restore', method: 'POST', path: '/content-items/{id}/restore', version: 1, script: restoreItem },
        { $id: Now.ID['r_items_discard'], name: 'discard draft', method: 'POST', path: '/content-items/{id}/discard-draft', version: 1, script: discardDraftItem },
        { $id: Now.ID['r_api_get'], name: 'integration get content', method: 'GET', path: '/api/content/{id}', version: 1, script: apiGetContent },
        { $id: Now.ID['r_api_create'], name: 'integration create content', method: 'POST', path: '/api/content', version: 1, script: apiCreateContent },
    ],
})
