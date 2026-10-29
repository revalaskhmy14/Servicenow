/**
 * Wave F · MVP-F2 (M25) — PublicContentRenderer Script Include.
 * Server-side renders the anonymous public pages: an index of published items and
 * a detail page by slug. Queries ONLY published content (is_published=true AND
 * state=Published) — defence in depth alongside the M24 anonymous ACL. All output
 * is escaped/sanitized via HtmlSanitizer (M26). Horizon --now-* tokens with fallbacks.
 */
var PublicContentRenderer = Class.create();
PublicContentRenderer.prototype = {
    ITEM: 'x_1863391_cms_now_content_item',

    initialize: function () {
        this.san = new x_1863391_cms_now.HtmlSanitizer();
    },

    _css: function () {
        return (
            '<style>' +
            ':root{--cms-bg:var(--now-color--neutral-0,#fff);--cms-fg:var(--now-color--neutral-18,#16181d);' +
            '--cms-link:var(--now-color--interactive,#0f62fe);--cms-muted:var(--now-color--neutral-11,#5b6168);}' +
            'body{background:var(--cms-bg);color:var(--cms-fg);font-family:"IBM Plex Sans",-apple-system,Arial,sans-serif;' +
            'line-height:1.5;margin:0;padding:2rem;max-width:48rem;margin:0 auto;}' +
            'a{color:var(--cms-link);}main{outline:none;}img{max-width:100%;height:auto;}' +
            '.cms-meta{color:var(--cms-muted);font-size:.875rem;margin-bottom:1.5rem;}' +
            '.cms-list{list-style:none;padding:0;}.cms-list li{margin:.75rem 0;}' +
            '@media (prefers-color-scheme:dark){:root{--cms-bg:#16181d;--cms-fg:#f0f1f3;--cms-muted:#9fa4ab;}}' +
            '</style>'
        );
    },

    _doc: function (title, body) {
        return (
            '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>' +
            '<meta name="viewport" content="width=device-width, initial-scale=1"/>' +
            '<title>' + this.san.escape(title) + '</title>' + this._css() +
            '</head><body><main role="main" tabindex="-1">' + body + '</main></body></html>'
        );
    },

    render: function (slug) {
        if (slug) { return this.renderDetail('' + slug); }
        return this.renderIndex();
    },

    _publishedQuery: function () {
        var gr = new GlideRecord(this.ITEM);
        gr.addQuery('is_published', true);
        gr.addQuery('state', 'Published');
        return gr;
    },

    renderIndex: function () {
        var gr = this._publishedQuery();
        gr.orderByDesc('modified_date');
        gr.query();
        var items = '';
        while (gr.next()) {
            var slug = gr.getValue('slug') || gr.getUniqueValue();
            items += '<li><a href="?slug=' + encodeURIComponent(slug) + '">' +
                this.san.escape(gr.getValue('title')) + '</a></li>';
        }
        if (!items) { items = '<li>No published content yet.</li>'; }
        var body = '<h1>Published content</h1><ul class="cms-list">' + items + '</ul>';
        return this._doc('Published content', body);
    },

    renderDetail: function (slug) {
        var gr = this._publishedQuery();
        gr.addQuery('slug', slug);
        gr.setLimit(1);
        gr.query();
        if (!gr.next()) {
            return this._doc('Not found',
                '<h1>Not found</h1><p>The requested content is not available.</p>' +
                '<p><a href="?">Back to all content</a></p>');
        }
        var title = this.san.escape(gr.getValue('title'));
        var meta = '';
        if (gr.getValue('publication_date')) { meta += 'Published ' + this.san.escape(gr.getValue('publication_date')); }
        if (gr.getValue('tags')) { meta += (meta ? ' · ' : '') + this.san.escape(gr.getValue('tags')); }
        var img = '';
        if (gr.getValue('featured_image_path')) {
            img = '<img src="' + this.san.escape(gr.getValue('featured_image_path')) +
                '" alt="' + title + '"/>';
        }
        var body =
            '<article><h1>' + title + '</h1>' +
            (meta ? '<p class="cms-meta">' + meta + '</p>' : '') +
            img +
            this.san.sanitize(gr.getValue('body_text')) +
            this.san.sanitize(gr.getValue('custom_html')) +
            '</article><p><a href="?">Back to all content</a></p>';
        return this._doc(gr.getValue('title'), body);
    },

    type: 'PublicContentRenderer',
};
