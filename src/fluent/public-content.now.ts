/**
 * Wave F · MVP-F2/F3 (M25/M26) — public content delivery.
 * Two Script Includes (sanitizer + renderer) and a server-rendered public UI Page.
 * The page runs a Jelly processing block that reads ?slug and calls the renderer,
 * which returns only published content. Anonymous data exposure is additionally
 * constrained by the M24 published-only read ACL (src/fluent/content-acls.now.ts).
 *
 * POST-DEPLOY (cannot be validated at build time here):
 *  - Register the endpoint as a Public Page so anonymous visitors can reach it.
 *  - Run ui_diagnostics + WCAG 2.1 AA checks (M27) on the live page.
 */
import { ScriptInclude, UiPage } from '@servicenow/sdk/core'

export const htmlSanitizer = ScriptInclude({
    $id: Now.ID['si_html_sanitizer'],
    name: 'HtmlSanitizer',
    apiName: 'x_1863391_cms_now.HtmlSanitizer',
    active: true,
    accessibleFrom: 'package_private',
    description: 'M26: allowlist HTML sanitizer for public rendering (XSS guard).',
    script: Now.include('../server/html-sanitizer.server.js'),
})

export const publicContentRenderer = ScriptInclude({
    $id: Now.ID['si_public_renderer'],
    name: 'PublicContentRenderer',
    apiName: 'x_1863391_cms_now.PublicContentRenderer',
    active: true,
    accessibleFrom: 'package_private',
    description: 'M25: renders published-only public index + detail-by-slug HTML.',
    script: Now.include('../server/public-content-renderer.server.js'),
})

export const publicContentPage = UiPage({
    $id: Now.ID['ui_public_content'],
    endpoint: 'x_1863391_cms_now_public.do',
    category: 'general',
    direct: true,
    description: 'Public published-content index + detail-by-slug (anonymous visitors).',
    html: Now.include('../server/public-content.html'),
})
