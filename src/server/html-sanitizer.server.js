/**
 * Wave F · MVP-F3 (M26) — HtmlSanitizer Script Include (ship-blocking XSS guard).
 * Allowlist-based sanitizer for custom_html / rich-text before public rendering.
 * Removes <script>/<style>, inline on* event handlers, and javascript: URIs, and
 * strips any tag not on the allowlist. Glide APIs are auto-available in class files.
 */
var HtmlSanitizer = Class.create();
HtmlSanitizer.prototype = {
    initialize: function () {},

    // Tags permitted in published content.
    ALLOWED: 'p|br|b|strong|i|em|u|ul|ol|li|a|h1|h2|h3|h4|h5|h6|blockquote|code|pre|img|figure|figcaption|span|div|table|thead|tbody|tr|td|th',

    sanitize: function (html) {
        if (!html) { return ''; }
        var out = '' + html;
        // Drop script/style blocks entirely.
        out = out.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
        // Drop inline event handlers (on*="...").
        out = out.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '');
        out = out.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '');
        // Neutralize javascript: and data: URIs in href/src.
        out = out.replace(/(href|src)\s*=\s*("|')\s*(javascript|data):[^"']*\2/gi, '$1=$2#$2');
        // Strip any tag not on the allowlist (keep its inner text).
        var allowed = this.ALLOWED.split('|');
        var self = this;
        out = out.replace(/<\s*\/?\s*([a-zA-Z0-9]+)[^>]*>/g, function (match, tag) {
            return self._contains(allowed, tag.toLowerCase()) ? match : '';
        });
        return out;
    },

    // Escape plain text for safe HTML output.
    escape: function (text) {
        if (text === null || text === undefined) { return ''; }
        return ('' + text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },

    _contains: function (arr, v) {
        for (var i = 0; i < arr.length; i++) { if (arr[i] === v) { return true; } }
        return false;
    },

    type: 'HtmlSanitizer',
};
