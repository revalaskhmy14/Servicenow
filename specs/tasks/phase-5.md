# Phase 5 Tasks (detailed, per story) — Admin & Authoring UI

Granular ServiceNow subtasks per story. Depends on Phase 2–4. Design: `specs/design/phase-5-admin-ui.md`.

**Conventions**: OOTB UI first — Application Menu (`sys_app_application`) + Modules (`sys_app_module`), list/form layouts (`sys_ui_list`/`sys_ui_form`/`sys_ui_section`), UI Actions. Custom UI via UI Builder experience (`sys_ux_*` macroponent) with `@servicenow/react-components`. Horizon `--now-*` tokens (verify via `css_variable_explorer`), WCAG 2.1 AA. Preserve verbatim spec messages. Subtask IDs `T-<story>-<n>`.

---

## Workspace shell (owning task P5-01)

### Navigation & app menu — supports all screens
- [ ] T-p501-1 Application Menu + Modules: Security, Content, Tenants, Configuration, Account (per `inputs/ui.md` shell).
- [ ] T-p501-2 Workspace/landing + breadcrumb pattern (per `inputs/ux.md`).
- [ ] T-p501-3 ATF/`ui_diagnostics`: nav loads. (shell)

## EPIC-02 / EPIC-03 / EPIC-44 — Users & roles (OOTB views, owning task P5-02)

### US-02c-01 Browse users · US-02c-02 Create user · US-03a-01 Browse roles · US-03a-02 Role details · US-13a-09 Clone role · US-44a-06 Security-critical flagging — **Configure**
- [ ] T-p502-1 `sys_user` list view + filters (status/search) + slide-in create form (SCR-users-admin); verbatim validation messages.
- [ ] T-p502-2 Roles list/detail views; clone-role UI action (US-13a-09).
- [ ] T-p502-3 Flag security-critical permission categories in role edit UI (US-44a-06).
- [ ] T-p502-4 ATF UI: list renders, create/validation, role views. Tags `@US-02c-01 @US-02c-02 @US-03a-01 @US-03a-02 @US-13a-09 @US-44a-06`.

## EPIC-04 — Content admin list (owning task P5-03)

### US-04a-01..08 — **Build**
- [ ] T-p503-1 `content_item` list view with filters: search, content type, status, author (SCR-content-admin-list); empty-state message.
- [ ] T-p503-2 Row/bulk UI Actions: Publish, Unpublish, Clone, Remove, Restore, Import, Add-to-plan → call Phase 3/4.
- [ ] T-p503-3 Permission-scoped actions per role (US-04a-08).
- [ ] T-p503-4 ATF UI: filter + each action. Tags `@US-04a-01..08`.

## EPIC-05 — Content types & fields UI (owning task P5-04)

### US-05a-01 List · US-05a-02 Create · US-05b-01 Field list · US-05b-02 Reorder · US-05b-06 Delete part — **Build**
- [ ] T-p504-1 `content_type` list + inline create/edit forms (SCR-content-types).
- [ ] T-p504-2 `content_field` related list with drag reorder (position) + add-field screen.
- [ ] T-p504-3 Delete-part confirmation modal naming the item (US-05b-06).
- [ ] T-p504-4 ATF UI. Tags `@US-05a-01/02 @US-05b-01/02/06`.

## EPIC-04 — Content Item Editor (custom UX, owning task P5-05)

### US-04b-01 Load · US-04b-02 Create · US-04b-03 Save draft · US-04d-01 View published — **Build**
- [ ] T-p505-1 UI Builder experience + page for content editor; include `?uxpcb=` cache-bust on scripts.
- [ ] T-p505-2 Fields per SCR-content-edit (title, body, priority, featured, publication date, related link, custom HTML, tags chip input, notes, media picker → attachments, related content picker).
- [ ] T-p505-3 Actions: Save draft / Publish / Unpublish / Discard / Preview → Phase 4 API; Draft/Published state badges.
- [ ] T-p505-4 Verbatim validation + not-found + unauthorized messages.
- [ ] T-p505-5 `ui_diagnostics` clean; ATF UI editor save/publish. Tags `@US-04b-01/02/03 @US-04d-01`.

## EPIC-01/07/09/40 + config — Admin pages (owning task P5-06)

### US-01b-01 Tenants · US-07a-01 Features · US-09a-01 Queries · US-40a-* + deployment/security/pruning/SMS/S3 — **Build/Configure**
- [ ] T-p506-1 Tenant admin list + create/edit (SCR-tenant-admin/create); setup action for Uninitialized.
- [ ] T-p506-2 Features admin list with enable/enable+/disable/disable+ (SCR-features) + success banners.
- [ ] T-p506-3 Queries admin list + execute/run/edit/delete (SCR-queries-admin).
- [ ] T-p506-4 Security settings form (SCR-security-settings) bound to Phase 1 properties; saved banner.
- [ ] T-p506-5 Deployment plans, content version pruning, SMS, S3 option pages.
- [ ] T-p506-6 ATF UI. Tags `@US-01b-01 @US-07a-01 @US-09a-01 @US-40a-01/02/03/04`.

## EPIC-44 — Theming & accessibility (owning task P5-07)

### US-44a-07 WCAG AA · US-44c-03 WCAG AA — **Configure**
- [ ] T-p507-1 Map brand `#0F62FE` / IBM Plex to `--now-*` tokens (verify via `css_variable_explorer`), light+dark, viewports.
- [ ] T-p507-2 Accessibility: labels, focus mgmt for slide-ins/modals, ARIA live regions, 4.5:1 / 3:1 contrast.
- [ ] T-p507-3 ATF/manual a11y audit. Tags `@US-44a-07 @US-44c-03`.

## EPIC-35/36/44 — UI test harness (owning task P5-08)

### US-35a-04 Browser tests · US-36a-04 Browser harness · US-44c-04 Browser/device compat — **Configure (remap to ATF UI)**
- [ ] T-p508-1 ATF UI test suite for key screens (list actions, editor, admin forms).
- [ ] T-p508-2 `ui_diagnostics` run on all custom pages; resolve console/network issues.
- [ ] T-p508-3 Document supported browsers/viewports. Tags `@US-35a-04 @US-36a-04 @US-44c-04`.

## Phase 5 exit (P5-09)
- [ ] T-P5-exit-1 Flip `specs/design/phase-5-admin-ui.md` to as-built (experience/page/view sys_ids).
