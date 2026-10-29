# Phase 4 Tasks (detailed, per story) — APIs & Integrations

Granular ServiceNow subtasks per story. Depends on Phase 2 (data) + Phase 3 (lifecycle). Design: `specs/design/phase-4-apis-integrations.md`.

**Conventions**: Scripted REST API (`sys_ws_definition` + `sys_ws_operation`), `Acl()`/`Role()` for API access, AI Search (`ais_*`), Attachments (`sys_attachment` API), Notification (`sysevent_email_action`), Scheduled Script Execution (`sysauto_script`), Flow Designer. Error codes/messages must match `inputs/api.md`/`inputs/openapi.json`. Subtask IDs `T-<story>-<n>`.

---

## EPIC-27 / EPIC-12 — REST base & auth (owning task P4-01)

### US-27a-01 Auth/authorize API · US-12a-03 Serialization — **Build**
- [ ] T-27a01-1 `Role()` `cms_api` (AccessContentApi / ApiViewContent); create Scripted REST API definition `/api/x_1863391_now_app/v1`.
- [ ] T-27a01-2 Base auth/ACL filter; standard error envelope (401 UNAUTHORIZED / 403 FORBIDDEN / 404 NOT_FOUND) + JSON serialization helper.
- [ ] T-27a01-3 ATF REST: unauthenticated→401, unauthorized→403. Tags `@US-27a-01 @US-12a-03`.

## EPIC-15 / EPIC-04 / EPIC-12 / EPIC-27 — Content item endpoints (owning task P4-02)

### US-15a-05 List/get · US-15a-08 External API · US-12a-01 REST get · US-12a-02 REST create · US-27a-02 Create · US-27a-03 Retrieve — **Build**
- [ ] T-p402-1 `sys_ws_operation` GET `/content-items` (list; limit/offset/search/contentType/status/author) — API-22.
- [ ] T-p402-2 GET `/content-items/{id}` (version=Published/Draft/Latest) — API-23; 404 NOT_FOUND.
- [ ] T-p402-3 POST `/content-items` create draft — API-24; TITLE_REQUIRED/PRIORITY_RANGE/LEAF_TERMS_ONLY.
- [ ] T-p402-4 PUT `/content-items/{id}` save draft — API-25.
- [ ] T-p402-5 External `/api/content` + `/api/content/{id}` (gate cms_api) — INT-09.
- [ ] T-p402-6 ATF contract tests per endpoint. Tags `@US-15a-05 @US-15a-08 @US-12a-01 @US-12a-02 @US-27a-02 @US-27a-03`.

## EPIC-04 / EPIC-15 — Lifecycle endpoints (owning task P4-03)

### US-04c-* (API) · US-04a-06 Import · US-04d-02 · US-15a-07 Import — **Build**
- [ ] T-p403-1 POST publish/unpublish/clone/remove/restore/discard-draft → `ContentLifecycle` (API-26..31); permission + 404 handling.
- [ ] T-p403-2 POST `/content-items/import` (file) — API-32; INVALID_FILE; gate Import.
- [ ] T-p403-3 ATF contract tests. Tags `@US-04c-01..06 @US-04a-06 @US-04d-02 @US-15a-07`.

## EPIC-05 / EPIC-14 — Content types & fields endpoints (owning task P4-04)

### US-05* (API) · US-14a-* (API) — **Build**
- [ ] T-p404-1 GET/POST `/content-types`, PUT `/content-types/{name}` — API-33..35.
- [ ] T-p404-2 GET/POST `/content-types/{name}/fields`, PUT `/fields/order`, DELETE `/fields/{name}` — API-36..39; SYSTEM_DEFINED_FIELD 422.
- [ ] T-p404-3 ATF contract tests. Tags `@US-05a-02 @US-05b-02/04 @US-14a-02/03/05/06/07`.

## EPIC-01/07/09/16/17/18/40/11 — Admin config endpoints (owning task P4-05)

### US-01c-01..04 · US-07a-02/03 · US-09a-02/09b-02/03/04 · US-16a-* · US-17a-08/09/10 · US-18a-01/02 · US-40a-02/03 · US-41a-05 · US-11a-02 — **Build**
- [ ] T-p405-1 Tenant endpoints GET/POST/PUT `/tenants` + setup transition — API-40..43.
- [ ] T-p405-2 Feature endpoints list/enable/disable (force) — API-44..46.
- [ ] T-p405-3 Query endpoints list/get/create/update/execute/delete — API-53..56 + execute; QUERY_NULL 422.
- [ ] T-p405-4 Security-settings GET/PUT (reads/writes Phase 1 properties) — gate ManageSecuritySettings.
- [ ] T-p405-5 Deployment/migration/pruning read endpoints as applicable.
- [ ] T-p405-6 Workflow task PUT `/workflow-tasks/{id}` — US-11a-02.
- [ ] T-p405-7 ATF contract tests. Tags `@US-01c-01..04 @US-07a-02/03 @US-09a-02 @US-09b-02/03/04 @US-16a-* @US-17a-08/09/10 @US-18a-01/02 @US-40a-02/03 @US-41a-05 @US-11a-02`.

## EPIC-23 / EPIC-24 / EPIC-41 — Search via AI Search (owning task P4-06; N→C remap)

### US-23a-* · US-24a-* · US-41a-01/02/03/06 — **Configure**
- [ ] T-p406-1 Create AI Search indexed source over `content_item` (published scope).
- [ ] T-p406-2 Search profile + analyzers/token filters (US-41a-03).
- [ ] T-p406-3 Index on publish/update; remove on unpublish/remove (hook from `ContentLifecycle`); non-fatal failures logged (US-23a-05).
- [ ] T-p406-4 Search query endpoint/integration (US-23a-04, US-24a-03).
- [ ] T-p406-5 ATF/verify: published content searchable; removed content de-indexed. Tags `@US-23a-01..05 @US-24a-01/02/03 @US-41a-01/02/03/06`.

## EPIC-06 / EPIC-25 / EPIC-26 — Media via Attachments (owning task P4-07; N→C remap)

### US-06a-01/02 · US-25a-* · US-26a-* — **Configure**
- [ ] T-p407-1 Enable `sys_attachment` on `content_item`; wire `featured_image` to attachment reference.
- [ ] T-p407-2 Upload/retrieve/delete via OOTB attachment API; non-fatal error logging (US-25a-05).
- [ ] T-p407-3 Optional S3/Blob config view mapped to attachment store settings (US-06a-01/02 view/save).
- [ ] T-p407-4 ATF: attach/retrieve/delete on a content item. Tags `@US-06a-01/02 @US-25a-01..05 @US-26a-01..04`.

## EPIC-21 / EPIC-22 / EPIC-39 — Email & SMS via Notifications (owning task P4-08)

### US-21a-* · US-22a-* · US-39a-* — **Configure**
- [ ] T-p408-1 Email provider (`sys_email_account`) + `Notification` records: verification, password reset, welcome (US-21a-01/02/03).
- [ ] T-p408-2 SMS settings + send + failure handling (US-22a-01/02/03) via notification/connector; gate ManageSmsSettings.
- [ ] T-p408-3 Notifications capability + SMS settings view/configure (US-39a-01/02/03).
- [ ] T-p408-4 ATF/manual: dispatch verified. Tags `@US-21a-* @US-22a-* @US-39a-*`.

## EPIC-10 / EPIC-11 / EPIC-32 / EPIC-43 — Background & workflow (owning task P4-09)

### US-10a-* · US-11a-01/11b-* · US-32a-03 · US-43a-02 — **Configure/Build**
- [ ] T-p409-1 Background service as Scheduled Script Execution; polling/idle from `cms.background.*` properties (US-10a-01/02).
- [ ] T-p409-2 Per-tenant execution + distributed lock (platform; US-10a-03/04, US-32a-03, US-43a-02).
- [ ] T-p409-3 Workflow tasks via Flow Designer: content expression, publish-on-create, user-task gating, min-condition (US-11a-01, US-11b-01/02/03).
- [ ] T-p409-4 ATF/verify. Tags `@US-10a-* @US-11a-01 @US-11b-01/02/03 @US-32a-03 @US-43a-02`.

## Deferred integrations (D4)

### US-12b-01/02 · US-28a-* GraphQL (owning task P4-10) — **Defer**
- [ ] T-p410-1 OOTB GraphQL schema for content read/mutation; introspection. Gate ExecuteGraphQL(Mutations). Tags `@US-12b-01/02 @US-28a-01/02/03`.

### US-12b-03 · US-30a-* XML-RPC (owning task P4-11) — **Defer**
- [ ] T-p411-1 MetaWeblog/XML-RPC shim (Scripted REST); access control + fault responses. Tags `@US-12b-03 @US-30a-01/02/03`.

### US-08* · US-17a-01..05 · US-29a-* · US-42a-01/02 Deployment (owning task P4-14) — **Defer → Update Sets/App Repo**
- [ ] T-p414-1 Document deployment-plan stories as OOTB Update Sets / Application Repository; map export/import to Now SDK + Update Set XML; remote deploy to instance-to-instance transfer. Tags `@US-08a-* @US-08b-* @US-17a-01..05 @US-29a-* @US-42a-01/02`.

## Phase 4 exit (P4-12, P4-13)
- [ ] T-P4-exit-1 API contract `TestSuite()` vs `inputs/openapi.json` (status + shape + error codes).
- [ ] T-P4-exit-2 Flip `specs/design/phase-4-apis-integrations.md` to as-built.
