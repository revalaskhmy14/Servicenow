# Phase 2 Tasks (detailed, per story) — Content Domain Data Model

Granular ServiceNow subtasks per story. Depends on ratified D1–D5 (`specs/design/phase-0-decisions.md`). Design: `specs/design/phase-2-content-data-model.md`. A story is done when its subtasks ship and its Gherkin passes as ATF.

**Conventions**: scope `x_1863391_now_app`; Fluent under `src/fluent/`. Artifacts: `Table()`, columns (`string`, `glide_date_time`, `glide_date`, `integer`, `boolean`, `reference`, `choice`, `url`, `html`, `glide_list`), `ChoiceSet()`, `Acl()`, `BusinessRule()`, dictionary attributes (index/unique/max_length/min_max). Subtask IDs `T-<story>-<n>`.

---

## EPIC-14 / EPIC-05 — Content types (owning task P2-01)

### US-14a-01 List types · US-05a-01 View types list — **Build**
- [ ] T-14a01-1 `Table()` `content_type`: `display_name` (string, mandatory, max_length 1024), `name` (string, mandatory, unique index), `creatable`/`listable`/`draftable`/`versionable`/`securable` (boolean), `settings` (string/JSON).
- [ ] T-14a01-2 Default list layout (`sys_ui_list`) + module under CMS app menu.
- [ ] T-14a01-3 ATF: insert + query returns rows. Tags `@US-14a-01 @US-05a-01`.

### US-14a-02 Create type · US-05a-02 Create a content type — **Build**
- [ ] T-14a02-1 `BusinessRule()` (before insert): `name` must start with ASCII letter, normalize via ToSafeName, enforce uniqueness; messages `Name must start with an ASCII letter.` / `A content type with this name already exists.`
- [ ] T-14a02-2 `display_name` mandatory + max 1024 (`Display name is required and must not exceed 1024 characters.`).
- [ ] T-14a02-3 ATF: create success; duplicate/invalid rejected. Tags `@US-14a-02 @US-05a-02`.

### US-14a-03 Update type · US-05b-03 Update settings — **Build**
- [ ] T-14a03-1 Form layout (`sys_ui_form`/section); write `Acl()` → `cms_admin` (EditContentTypes).
- [ ] T-14a03-2 ATF update. Tags `@US-14a-03 @US-05b-03`.

## EPIC-14 / EPIC-05 — Content fields (owning task P2-02)

### US-14a-04 List fields · US-05b-01 View field list — **Build**
- [ ] T-14a04-1 `Table()` `content_field`: `content_type` (reference→content_type, mandatory), `field_name` (string, mandatory), `field_type` (`ChoiceSet`: TextField, DateField, CustomBooleanField, ContentPicker, Numeric, Boolean, Date, Link, Html, Markdown, Media), `position` (integer, default 0), `is_system_defined` (boolean, default false), `settings` (string). Index `content_type`.
- [ ] T-14a04-2 Related list on `content_type` form.
- [ ] T-14a04-3 ATF list fields for a type. Tags `@US-14a-04 @US-05b-01`.

### US-14a-05 Add field · US-05b-04 — **Build**
- [ ] T-14a05-1 `field_name` mandatory (`Field name is required.`); default `position` = max+1.
- [ ] T-14a05-2 ATF add field. Tags `@US-14a-05 @US-05b-04`.

### US-14a-06 Reorder fields · US-05b-02 · US-05c-03 ordering rules — **Build**
- [ ] T-14a06-1 `BusinessRule()` to persist `position` ordering; validate order covers all fields.
- [ ] T-14a06-2 ATF reorder. Tags `@US-14a-06 @US-05b-02 @US-05c-03`.

## EPIC-15 / EPIC-04 — Content item (owning task P2-03)

### US-15a-01 Create draft · US-04b-02 Create draft — **Build**
- [ ] T-15a01-1 `Table()` `content_item`: `content_item_id` (string, indexed business key), `content_item_version_id` (string), `content_type` (reference, mandatory), `title` (string, mandatory), `body_text` (html), `priority_level` (integer, min 1/max 10), `featured` (boolean), `publication_date` (glide_date), `related_link` (url), `custom_html` (string), `tags` (glide_list/string), `notes` (string), `author` (reference→sys_user), `state` (`ChoiceSet` Draft/Published/Removed, default Draft), `modified_date` (glide_date_time), `is_latest` (boolean), `is_published` (boolean).
- [ ] T-15a01-2 Indexes: content_type, state, author, modified_date, (is_latest,is_published).
- [ ] T-15a01-3 ATF: create draft defaults state=Draft, is_latest=true. Tags `@US-15a-01 @US-04b-02`.

### US-15a-05 List/get items — **Build**
- [ ] T-15a05-1 List layout + filters (content type/status/author/search).
- [ ] T-15a05-2 ATF list/get by id. Tag `@US-15a-05`.

## Versioning (D2, owning task P2-04)

### US-15a-02/03 versioning support — **Build**
- [ ] T-ver-1 `Table()` `content_item_version` (child of content_item): `content_item` (reference), `version_id` (string), snapshot columns, `is_published`, `is_latest`, `created` (glide_date_time). Index content_item.
- [ ] T-ver-2 ATF: version row created per draft/publish. Tags `@US-15a-02 @US-15a-03` (full flow in Phase 3).

## EPIC-14 / EPIC-42 — Version pruning (owning task P2-05)

### US-05c-01 · US-14a-08 · US-42a-03 View · US-42a-04 Configure — **Build**
- [ ] T-prune-1 `Table()` `content_version_pruning`: `content_type` (reference), `retention_days` (integer, min 0), `versions_to_keep` (integer, min 0).
- [ ] T-prune-2 Form/list + write `Acl()` → `cms_admin` (ManageContentVersionPruning).
- [ ] T-prune-3 ATF CRUD + min-0 validation (`when no content type is selected, nothing is pruned`). Tags `@US-05c-01 @US-14a-08 @US-42a-03 @US-42a-04`.

## EPIC-16 / EPIC-01 / EPIC-40 — Tenant (D1, owning task P2-06)

### US-16a-01 Create · US-16a-02 List/get · US-16a-03 Update · US-16a-04 Uninit→Running · US-01a-02 · US-01b-01/02 · US-40a-04 — **Build**
- [ ] T-tenant-1 `Table()` `tenant`: `name` (string, mandatory, unique), `description`, `request_url_prefix` (string), `recipe_name` (`ChoiceSet` Blog/Headless/Agency/Blank), `database_provider` (`ChoiceSet` Sqlite/SqlConnection/Postgres/MySql — modeled for fidelity, non-functional), `table_prefix` (string), `status` (`ChoiceSet` Running/Uninitialized, default Uninitialized).
- [ ] T-tenant-2 `BusinessRule()`: name letters-only; root tenant must be `Default` (`The single 'Default' tenant should be provided.`); uniqueness.
- [ ] T-tenant-3 Write `Acl()` → `cms_admin` (ManageTenants).
- [ ] T-tenant-4 ATF: create/list/update/status transition + validation. Tags `@US-16a-01..04 @US-01a-02 @US-01b-01 @US-01b-02 @US-40a-04`.

## EPIC-16 / EPIC-07 — Feature (owning task P2-07)

### US-07b-01 Enable (data) · US-07b-02 Disable (data) · US-16a-05 Seed/query · US-16a-06 Enable · US-16a-07 Disable — **Build**
- [ ] T-feat-1 `Table()` `feature`: `feature_name` (string), `module` (string), `category` (`ChoiceSet` Infrastructure/Content Management), `is_enabled` (boolean, default false), `dependencies` (glide_list/string), state flags.
- [ ] T-feat-2 Seed feature catalogue via `Record()` (`installMethod: 'first install'`).
- [ ] T-feat-3 `BusinessRule()` dependency resolution on enable/disable (force flag semantics).
- [ ] T-feat-4 ATF enable/disable + dependency. Tags `@US-07b-01 @US-07b-02 @US-16a-05 @US-16a-06 @US-16a-07`.

## EPIC-17 / EPIC-09 / EPIC-41 — Query (D5, owning task P2-08)

### US-09b-01 Create query · US-17a-06 Create · US-17a-07 List/get · US-41a-04 Manage named queries — **Build**
- [ ] T-query-1 `Table()` `query`: `query_name` (string, mandatory, unique), `query_type` (`ChoiceSet` Lucene/SQL/GraphQL — mapped to ServiceNow execution at runtime), `parameters` (string/JSON).
- [ ] T-query-2 `BusinessRule()` uniqueness (`A query with this name already exists.`).
- [ ] T-query-3 ATF create/list/get. Tags `@US-09b-01 @US-17a-06 @US-17a-07 @US-41a-04`.

## EPIC-37 / EPIC-04 / EPIC-13 / EPIC-40 — ACLs (owning task P2-09)

### US-37a-04 RBAC · US-03c-01 Edit permissions · US-04a-08 Permission scopes · US-13a-08 Update role perms · US-37b-01/02/03/05 · US-37c-02 · US-40a-01 Admin gating · US-44b-04 System-part integrity — **Build**
- [ ] T-acl-1 `Acl()` `content_item`: read→cms_reader; create/write→cms_author, cms_contributor, cms_editor; delete→cms_moderator; publish operation→cms_editor.
- [ ] T-acl-2 `Acl()` `content_type`/`content_field`/`content_version_pruning`/`tenant`/`feature`/`query`: write→cms_admin.
- [ ] T-acl-3 Anonymous role: `IsAuthenticated=false` → public read only where applicable (US-37c-02, US-37b-03).
- [ ] T-acl-4 System-defined field/part integrity guard reference (built in P3-05); admin-route gating (US-40a-01, US-37b-05).
- [ ] T-acl-5 ATF: each role’s allowed/denied operations. Tags `@US-37a-04 @US-03c-01 @US-04a-08 @US-13a-08 @US-37b-01 @US-37b-02 @US-37b-03 @US-37b-05 @US-37c-02 @US-40a-01 @US-44b-04`.

## EPIC-38 — Audit (owning task P2-10)

### US-38a-01 Provision audit · US-38a-02 Emit signals — **Configure**
- [ ] T-audit-1 Enable dictionary auditing on `content_item` and `content_type` (field history / `sys_audit`).
- [ ] T-audit-2 ATF: update generates audit history. Tags `@US-38a-01 @US-38a-02` (review in Phase 3).

## Phase 2 exit (P2-11, P2-12)
- [ ] T-P2-exit-1 Phase 2 `TestSuite()` (CRUD + ACL + schema parity with `inputs/data-model.md`).
- [ ] T-P2-exit-2 Flip `specs/design/phase-2-content-data-model.md` to as-built (table/column/choice/ACL sys_ids).
