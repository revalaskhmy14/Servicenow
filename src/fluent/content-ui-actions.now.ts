/**
 * Wave E · MVP-E1 (M18) — content_item list/form row actions.
 * Buttons delegate to the ContentLifecycle Script Include (M10) and are role-gated
 * per inputs/api.md (publish/unpublish/clone -> editor; remove -> moderator;
 * restore -> admin). State-based conditions control visibility.
 */
import { UiAction } from '@servicenow/sdk/core'
import { cmsEditor, cmsModerator, cmsAdmin } from './roles.now'

const CONTENT_ITEM = 'x_1863391_cms_now_content_item'

export const uaPublish = UiAction({
    $id: Now.ID['ua_publish'],
    table: CONTENT_ITEM,
    name: 'Publish',
    actionName: 'cms_publish',
    active: true,
    order: 100,
    showUpdate: true,
    condition: "current.state != 'Published'",
    roles: [cmsEditor],
    form: { showButton: true, style: 'primary' },
    list: { showButton: true, showContextMenu: true },
    script: "new x_1863391_cms_now.ContentLifecycle().publish(current.getUniqueValue());\ngs.addInfoMessage('Content published.');\naction.setRedirectURL(current);",
})

export const uaUnpublish = UiAction({
    $id: Now.ID['ua_unpublish'],
    table: CONTENT_ITEM,
    name: 'Unpublish',
    actionName: 'cms_unpublish',
    active: true,
    order: 110,
    showUpdate: true,
    condition: 'current.is_published == true',
    roles: [cmsEditor],
    form: { showButton: true },
    list: { showContextMenu: true },
    script: "new x_1863391_cms_now.ContentLifecycle().unpublish(current.getUniqueValue());\ngs.addInfoMessage('Content unpublished.');\naction.setRedirectURL(current);",
})

export const uaClone = UiAction({
    $id: Now.ID['ua_clone'],
    table: CONTENT_ITEM,
    name: 'Clone',
    actionName: 'cms_clone',
    active: true,
    order: 120,
    showUpdate: true,
    roles: [cmsEditor],
    form: { showButton: true },
    list: { showContextMenu: true },
    script: "new x_1863391_cms_now.ContentLifecycle().clone(current.getUniqueValue());\ngs.addInfoMessage('Draft copy created.');\naction.setRedirectURL(current);",
})

export const uaRemove = UiAction({
    $id: Now.ID['ua_remove'],
    table: CONTENT_ITEM,
    name: 'Remove',
    actionName: 'cms_remove',
    active: true,
    order: 130,
    showUpdate: true,
    condition: "current.state != 'Removed'",
    roles: [cmsModerator],
    form: { showButton: true, style: 'destructive' },
    list: { showContextMenu: true },
    script: "new x_1863391_cms_now.ContentLifecycle().remove(current.getUniqueValue());\ngs.addInfoMessage('Content removed.');\naction.setRedirectURL(current);",
})

export const uaRestore = UiAction({
    $id: Now.ID['ua_restore'],
    table: CONTENT_ITEM,
    name: 'Restore',
    actionName: 'cms_restore',
    active: true,
    order: 140,
    showUpdate: true,
    condition: "current.state == 'Removed'",
    roles: [cmsAdmin],
    form: { showButton: true },
    list: { showContextMenu: true },
    script: "new x_1863391_cms_now.ContentLifecycle().restore(current.getUniqueValue());\ngs.addInfoMessage('Content restored.');\naction.setRedirectURL(current);",
})
