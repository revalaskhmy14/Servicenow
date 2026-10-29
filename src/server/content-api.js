/**
 * Wave D · MVP-D2/D3 — Content REST handlers (features M16, M17).
 * Shapes/messages follow inputs/api.md (/v1/content-items + /v1/api/content).
 * Lifecycle operations delegate to the ContentLifecycle Script Include (M10).
 * Imported by src/fluent/content-rest-api.now.ts route definitions.
 * Runs server-side where gs / GlideRecord / the app scope namespace are global.
 */
var ITEM = 'x_1863391_cms_now_content_item'

function lifecycle() {
    return new x_1863391_cms_now.ContentLifecycle()
}

function toDTO(gr) {
    return {
        contentItemId: gr.getValue('content_item_id') || gr.getUniqueValue(),
        contentItemVersionId: gr.getValue('content_item_version_id'),
        contentType: gr.getDisplayValue('content_type'),
        title: gr.getValue('title'),
        status: gr.getValue('state'),
        modifiedDate: gr.getValue('modified_date'),
        isLatest: gr.getValue('is_latest') == '1',
        isPublished: gr.getValue('is_published') == '1',
        slug: gr.getValue('slug'),
    }
}

function sendError(response, status, code, message) {
    response.setStatus(status)
    response.setBody({ error: { message: message, detail: code }, status: 'failure' })
}

// Resolve a content item by business key (content_item_id) or sys_id.
function findItem(id) {
    var gr = new GlideRecord(ITEM)
    gr.addQuery('content_item_id', id).addOrCondition('sys_id', id)
    gr.setLimit(1)
    gr.query()
    return gr.next() ? gr : null
}

function applyWritableFields(gr, body) {
    var map = ['title', 'body_text', 'priority_level', 'featured', 'publication_date',
        'related_link', 'custom_html', 'tags', 'notes', 'featured_image_path']
    // API field names -> column names
    var apiMap = {
        title: 'title', bodyText: 'body_text', priorityLevel: 'priority_level',
        featured: 'featured', publicationDate: 'publication_date', relatedLink: 'related_link',
        customHtml: 'custom_html', tags: 'tags', notes: 'notes', featuredImagePath: 'featured_image_path',
    }
    for (var apiKey in apiMap) {
        if (body[apiKey] !== undefined && body[apiKey] !== null) {
            var val = body[apiKey]
            if (apiKey === 'tags' && val instanceof Array) { val = val.join(',') }
            gr.setValue(apiMap[apiKey], val)
        }
    }
    return map
}

// Shared create-time validation returning the exact api.md messages, or null if OK.
function validateCreate(body) {
    if (!body || !body.title || ('' + body.title).trim() === '') {
        return { status: 400, code: 'TITLE_REQUIRED', message: 'Validation errors A value is required for Title.' }
    }
    if (body.priorityLevel !== undefined && body.priorityLevel !== null && body.priorityLevel !== '') {
        var pl = parseInt(body.priorityLevel, 10)
        if (isNaN(pl) || pl < 1 || pl > 10) {
            return { status: 400, code: 'PRIORITY_RANGE', message: 'Priority Level must be between 1 and 10.' }
        }
    }
    return null
}

// GET /content-items — list with filters + pagination.
export function listItems(request, response) {
    var q = request.queryParams || {}
    var limit = parseInt((q.limit && q.limit[0]) || q.limit || 20, 10)
    var offset = parseInt((q.offset && q.offset[0]) || q.offset || 0, 10)
    var search = (q.search && q.search[0]) || q.search
    var contentType = (q.contentType && q.contentType[0]) || q.contentType
    var status = (q.status && q.status[0]) || q.status
    var author = (q.author && q.author[0]) || q.author

    var gr = new GlideRecord(ITEM)
    if (search) { gr.addQuery('title', 'CONTAINS', search) }
    if (contentType) { gr.addQuery('content_type.name', contentType) }
    if (status) { gr.addQuery('state', status) }
    if (author) { gr.addQuery('author.user_name', author) }
    gr.orderByDesc('modified_date')
    gr.query()
    var total = gr.getRowCount()
    gr.chooseWindow(offset, offset + limit)
    var items = []
    while (gr.next()) { items.push(toDTO(gr)) }
    response.setStatus(200)
    response.setBody({ total: total, items: items })
}

// GET /content-items/{contentItemId}
export function getItem(request, response) {
    var id = request.pathParams.id
    var gr = findItem(id)
    if (!gr) {
        return sendError(response, 404, 'NOT_FOUND', 'Content not found The requested content item does not exist.')
    }
    response.setStatus(200)
    response.setBody(toDTO(gr))
}

// POST /content-items — create draft.
export function createItem(request, response) {
    var body = request.body.data || {}
    var err = validateCreate(body)
    if (err) { return sendError(response, err.status, err.code, err.message) }
    var gr = new GlideRecord(ITEM)
    gr.initialize()
    gr.setValue('content_type', body.contentType)
    applyWritableFields(gr, body)
    gr.setValue('state', 'Draft')
    var sysId = gr.insert()
    if (!sysId) {
        return sendError(response, 400, 'VALIDATION_ERROR', 'Validation errors A value is required for Title.')
    }
    var saved = new GlideRecord(ITEM)
    saved.get(sysId)
    response.setStatus(201)
    response.setBody({
        contentItemId: saved.getValue('content_item_id'),
        contentItemVersionId: saved.getValue('content_item_version_id'),
        status: 'Draft',
    })
}

// PUT /content-items/{contentItemId} — save as new draft version.
export function updateItem(request, response) {
    var id = request.pathParams.id
    var body = request.body.data || {}
    var gr = findItem(id)
    if (!gr) { return sendError(response, 404, 'NOT_FOUND', 'Content not found The requested content item does not exist.') }
    var err = validateCreate(body)
    if (err) { return sendError(response, err.status, err.code, err.message) }
    applyWritableFields(gr, body)
    gr.update()
    response.setStatus(200)
    response.setBody({
        contentItemId: gr.getValue('content_item_id'),
        contentItemVersionId: gr.getValue('content_item_version_id'),
        status: gr.getValue('state'),
    })
}

// Shared lifecycle handler (explicit exported functions below so the Fluent
// analyzer can resolve each route script reference).
function runLifecycle(op, okStatus, request, response) {
    var id = request.pathParams.id
    var gr = findItem(id)
    if (!gr) { return sendError(response, 404, 'NOT_FOUND', 'Content not found The requested content item does not exist.') }
    var result = lifecycle()[op](gr.getUniqueValue())
    if (!result) { return sendError(response, 404, 'NOT_FOUND', 'Content not found The requested content item does not exist.') }
    response.setStatus(okStatus)
    response.setBody({ contentItemId: result.getValue('content_item_id'), status: result.getValue('state') })
}

export function publishItem(request, response) { runLifecycle('publish', 200, request, response) }
export function unpublishItem(request, response) { runLifecycle('unpublish', 200, request, response) }
export function removeItem(request, response) { runLifecycle('remove', 200, request, response) }
export function restoreItem(request, response) { runLifecycle('restore', 200, request, response) }
export function discardDraftItem(request, response) { runLifecycle('discardDraft', 200, request, response) }

// POST /content-items/{id}/clone — 201 with the new draft.
export function cloneItem(request, response) {
    var id = request.pathParams.id
    var gr = findItem(id)
    if (!gr) { return sendError(response, 404, 'NOT_FOUND', 'Content not found The requested content item does not exist.') }
    var created = lifecycle().clone(gr.getUniqueValue())
    response.setStatus(201)
    response.setBody({
        contentItemId: created.getValue('content_item_id'),
        contentItemVersionId: created.getValue('content_item_version_id'),
        status: created.getValue('state'),
    })
}

// GET /api/content/{id} — integration read (published visibility).
export function apiGetContent(request, response) {
    var id = request.pathParams.id
    var gr = findItem(id)
    if (!gr) { return sendError(response, 404, 'NOT_FOUND', 'Content not found.') }
    response.setStatus(200)
    response.setBody({
        contentItemId: gr.getValue('content_item_id'),
        title: gr.getValue('title'),
        contentType: gr.getDisplayValue('content_type'),
        status: gr.getValue('state'),
    })
}

// POST /api/content — integration create; draft=false publishes immediately.
export function apiCreateContent(request, response) {
    var body = request.body.data || {}
    if (!body.title || ('' + body.title).trim() === '') {
        return sendError(response, 400, 'VALIDATION_ERROR', 'Validation errors A value is required for Title.')
    }
    var gr = new GlideRecord(ITEM)
    gr.initialize()
    gr.setValue('content_type', body.contentType)
    gr.setValue('title', body.title)
    gr.setValue('state', 'Draft')
    var sysId = gr.insert()
    var status = 'Draft'
    if (sysId && body.draft === false) {
        var published = lifecycle().publish(sysId)
        if (published) { status = 'Published' }
    }
    var saved = new GlideRecord(ITEM)
    saved.get(sysId)
    response.setStatus(201)
    response.setBody({ contentItemId: saved.getValue('content_item_id'), status: status })
}
