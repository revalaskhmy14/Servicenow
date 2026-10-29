/**
 * Navigator ("All") menu for the CMS app: editor, public site, and admin table lists.
 */
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

export const cmsMenu = ApplicationMenu({
    $id: Now.ID['cms_now_menu'],
    title: 'CMS Now',
    hint: 'Content management',
    roles: ['admin', 'x_1863391_cms_now.cms_admin'],
    active: true,
})

export const cmsModuleContentEditor = Record({
    $id: Now.ID['cms_now_module_content_editor'],
    table: 'sys_app_module',
    data: {
        title: 'Content Editor',
        application: cmsMenu,
        link_type: 'DIRECT',
        query: 'x_1863391_cms_now_content_editor.do',
        roles: ['admin', 'x_1863391_cms_now.cms_admin'],
        active: true,
        order: 100,
    },
})

export const cmsModulePublicSite = Record({
    $id: Now.ID['cms_now_module_public_site'],
    table: 'sys_app_module',
    data: {
        title: 'Public Site',
        application: cmsMenu,
        link_type: 'DIRECT',
        query: 'x_1863391_cms_now_public.do',
        roles: ['admin', 'x_1863391_cms_now.cms_admin'],
        active: true,
        order: 200,
    },
})

export const cmsModuleContentItems = Record({
    $id: Now.ID['cms_now_module_content_items'],
    table: 'sys_app_module',
    data: {
        title: 'Content Items',
        application: cmsMenu,
        link_type: 'LIST',
        name: 'x_1863391_cms_now_content_item',
        roles: ['admin', 'x_1863391_cms_now.cms_admin'],
        active: true,
        order: 300,
    },
})

export const cmsModuleContentTypes = Record({
    $id: Now.ID['cms_now_module_content_types'],
    table: 'sys_app_module',
    data: {
        title: 'Content Types',
        application: cmsMenu,
        link_type: 'LIST',
        name: 'x_1863391_cms_now_content_type',
        roles: ['admin', 'x_1863391_cms_now.cms_admin'],
        active: true,
        order: 400,
    },
})

export const cmsModuleContentFields = Record({
    $id: Now.ID['cms_now_module_content_fields'],
    table: 'sys_app_module',
    data: {
        title: 'Content Fields',
        application: cmsMenu,
        link_type: 'LIST',
        name: 'x_1863391_cms_now_content_field',
        roles: ['admin', 'x_1863391_cms_now.cms_admin'],
        active: true,
        order: 500,
    },
})
