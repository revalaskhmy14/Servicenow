/**
 * Wave C · MVP-C5 (M14 validation) + MVP-B5/M23 (slug) — content_item before insert/update.
 * Legacy business-rule script (ambient current/previous/gs/GlideRecord).
 * Validation messages are VERBATIM from inputs/api.md (POST/PUT /v1/content-items).
 * Runs on ordinary saves only; ContentLifecycle transitions use setWorkflow(false).
 */
(function executeRule(current, previous) {
    var ITEM = 'x_1863391_cms_now_content_item';
    var CTYPE = 'x_1863391_cms_now_content_type';

    // --- defaults on insert ---
    if (current.operation() === 'insert') {
        if (!current.getValue('state')) { current.state = 'Draft'; }
        if (current.getValue('is_latest') === '' || current.getValue('is_latest') === null) { current.is_latest = true; }
        if (!current.getValue('content_item_id')) { current.content_item_id = gs.generateGUID(); }
    }

    // --- BR-07: title required ---
    var title = (current.getValue('title') || '').trim();
    if (!title) {
        gs.addErrorMessage('A value is required for Title.');
        current.setAbortAction(true);
        return;
    }

    // --- BR-08: priority 1..10 ---
    var plRaw = current.getValue('priority_level');
    if (plRaw !== null && plRaw !== '') {
        var pl = parseInt(plRaw, 10);
        if (isNaN(pl) || pl < 1 || pl > 10) {
            gs.addErrorMessage('Priority Level must be between 1 and 10.');
            current.setAbortAction(true);
            return;
        }
    }

    // --- BR-09: tags must be leaf terms only (reject hierarchical "a/b" entries) ---
    var tags = current.getValue('tags') || '';
    if (tags) {
        var parts = tags.split(',');
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].indexOf('/') > -1) {
                gs.addErrorMessage('Select leaf terms only. Multiple selections allowed.');
                current.setAbortAction(true);
                return;
            }
        }
    }

    // --- BR-11: content_type reference integrity (message not specified in api.md) ---
    var ct = current.getValue('content_type');
    if (ct) {
        var g = new GlideRecord(CTYPE);
        if (!g.get(ct)) {
            gs.addErrorMessage('The selected content type does not exist.');
            current.setAbortAction(true);
            return;
        }
    }

    // --- M23 slug: auto-generate only when empty (stable across retitles) ---
    if (!current.getValue('slug')) {
        var base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        if (!base) { base = 'item'; }
        var selfId = current.getUniqueValue();
        var slug = base;
        var n = 2;
        while (__publishedSlugExists(ITEM, slug, selfId)) {
            slug = base + '-' + n;
            n++;
        }
        current.slug = slug;
    }

    current.modified_date = new GlideDateTime().getValue();
})(current, previous);

// Uniqueness is enforced among PUBLISHED items only (per MVP-B5/M23).
function __publishedSlugExists(table, slug, selfId) {
    var g = new GlideRecord(table);
    g.addQuery('slug', slug);
    g.addQuery('is_published', true);
    if (selfId) { g.addQuery('sys_id', '!=', selfId); }
    g.setLimit(1);
    g.query();
    return g.hasNext();
}
