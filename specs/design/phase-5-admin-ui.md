# Phase 5 Design — Admin & Authoring UI

Status: **design (pre-build)** · depends on Phase 2–4.
Covers: screens in `inputs/screens.md`/`inputs/ux.md`; EPIC-04 (list), EPIC-05 UI, EPIC-07/09 admin.

---

## 1. Objective
Deliver the admin/authoring experience **OOTB-first**: standard list/form views and a UI Builder workspace for CRUD; custom UX only for the differentiated content editor. Horizon design system, WCAG 2.1 AA.

## 2. OOTB vs custom
| Screen(s) | Approach |
|---|---|
| Users admin (SCR-users-admin) | OOTB `sys_user` list/form + roles |
| Roles (SCR-roles-*) | OOTB role admin |
| Content admin list + filters (SCR-content-admin-list) | OOTB list view with filters on `content_item`; UI actions call `ContentLifecycle` |
| Content types / fields (SCR-content-types, edit-part, add-field) | OOTB list/form on `content_type`/`content_field` |
| Tenants, features, queries, deployment, security settings, pruning, SMS/S3 | OOTB forms/lists + config pages |
| **Content Item Editor (SCR-content-edit)** | **Custom UX page** (UI Builder) — the one differentiated authoring surface |

## 3. Custom content editor
UI Builder experience using `@servicenow/react-components`; fields per SCR-content-edit (title, body, priority, featured, publication date, related link, custom HTML, tags, notes, media picker → attachments, related content). Draft/Published state badges; Save draft / Publish / Unpublish / Discard / Preview actions → `ContentLifecycle`. Preserve verbatim validation + error strings.

## 4. Design & accessibility
- Map brand `#0F62FE` and IBM Plex to documented `--now-*` tokens (verify with `css_variable_explorer`; include fallbacks). No hardcoded design values where a token exists.
- Works light + dark, supported viewports. WCAG 2.1 AA (labels, focus mgmt for slide-ins/modals, live regions, 4.5:1 / 3:1 contrast) per NFR-20.
- Workspace shell: header + left nav (Security, Content, Tenants, Configuration, Account); breadcrumb trail.

## 5. Acceptance
`ui_diagnostics` clean on the editor; keyboard + contrast checks; ATF UI tests for content list actions and editor save/publish. Screens match `inputs/screens.md` states/messages.
