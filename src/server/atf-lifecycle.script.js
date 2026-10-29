// Wave G · MVP-G1 (M21) — server-side Jasmine checks for the core thread.
// Runs inside atf.server.runServerSideScript. Covers the content lifecycle
// (publish/unpublish/remove/restore + flags) and the M26 HTML sanitizer.
describe('CMS core thread', function () {
    var ITEM = 'x_1863391_cms_now_content_item';
    var lc = new x_1863391_cms_now.ContentLifecycle();

    // Fixture: a content type + a draft content item.
    var ct = new GlideRecord('x_1863391_cms_now_content_type');
    ct.initialize();
    ct.display_name = 'ATF Type';
    ct.name = 'AtfType' + new GlideDateTime().getNumericValue();
    var ctId = ct.insert();

    var ci = new GlideRecord(ITEM);
    ci.initialize();
    ci.content_type = ctId;
    ci.title = 'ATF Content';
    var ciId = ci.insert();

    function reload() {
        var g = new GlideRecord(ITEM);
        g.get(ciId);
        return g;
    }

    it('creates a draft with defaults', function () {
        var g = reload();
        expect(g.getValue('state')).toBe('Draft');
        expect(g.getValue('is_latest')).toBe('1');
        expect(g.getValue('slug')).not.toBe('');
    });

    it('publishes with correct flags', function () {
        lc.publish(ciId);
        var g = reload();
        expect(g.getValue('state')).toBe('Published');
        expect(g.getValue('is_published')).toBe('1');
        expect(g.getValue('is_latest')).toBe('1');
    });

    it('unpublishes back to draft', function () {
        lc.unpublish(ciId);
        var g = reload();
        expect(g.getValue('is_published')).toBe('0');
        expect(g.getValue('state')).toBe('Draft');
    });

    it('removes then restores', function () {
        lc.remove(ciId);
        expect(reload().getValue('state')).toBe('Removed');
        lc.restore(ciId);
        expect(reload().getValue('state')).toBe('Draft');
    });

    it('creates version rows on save', function () {
        var v = new GlideRecord('x_1863391_cms_now_content_item_version');
        v.addQuery('content_item', ciId);
        v.query();
        expect(v.getRowCount() > 0).toBe(true);
    });

    it('sanitizes script tags out of custom html (M26)', function () {
        var san = new x_1863391_cms_now.HtmlSanitizer();
        var out = san.sanitize('<p>ok</p><script>alert(1)</script><a href="javascript:evil()">x</a>');
        expect(out.indexOf('<script')).toBe(-1);
        expect(out.toLowerCase().indexOf('javascript:')).toBe(-1);
    });
});
