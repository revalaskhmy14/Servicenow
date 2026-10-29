# Phase 2 Design — Content Domain Data Model

Status: **design (pre-build)** · depends on Phase 0 decisions D1–D5 (`phase-0-decisions.md`).
Covers: ENT-04/05/06/07/08/11/14; EPIC-14/15/16 (data), supports EPIC-04/05/07/09.
OOTB reused: identity (ENT-01/02/03 = `sys_user`/`sys_user_role`), migrations (ENT-13 = Now SDK), security settings (ENT-12 = properties, Phase 1), deployment (ENT-09/10 = Update Sets).

---

## 1. Objective

Create the custom content-domain tables, choices, ACLs, and audit. Everything the platform already provides stays OOTB. All tables are scoped `x_1863391_now_app`. Column types follow `inputs/data-model.md` / `inputs/schema.json`.

## 2. Tables

### `content_type` (ENT-05) — EPIC-14/05
| Column | Type | Notes |
|---|---|---|
| display_name | String(1024) | required; not empty |
| name | String | required, unique, starts with ASCII letter (ToSafeName) |
| creatable / listable / draftable / versionable / securable | True/False | — |
| settings | String (JSON) | optional |

### `content_field` (ENT-06) — EPIC-14/05
| Column | Type | Notes |
|---|---|---|
| content_type | Reference → content_type | required |
| field_name | String | required |
| field_type | Choice | TextField, DateField, CustomBooleanField, ContentPicker, Numeric, Boolean, Date, Link, Html, Markdown, Media |
| position | Integer | default 0 |
| is_system_defined | True/False | default false; blocks delete (Phase 3) |
| settings | String (JSON) | optional |

### `content_item` (ENT-04) — EPIC-15/04
| Column | Type | Notes |
|---|---|---|
| content_item_id | String | business key (indexed) |
| content_item_version_id | String | current version pointer |
| content_type | Reference → content_type | required |
| title | String | required |
| body_text | String (HTML) | — |
| priority_level | Integer | 1–10 (validated Phase 3) |
| featured | True/False | — |
| publication_date | Date | — |
| related_link | URL | — |
| custom_html | String | — |
| tags | List/String | leaf terms only |
| notes | String | — |
| featured_image | (Attachment) | media via OOTB attachments (D: Phase 4) |
| author | Reference → sys_user | — |
| state | Choice | Draft / Published / Removed (default Draft) |
| modified_date | GlideDateTime | — |
| is_latest / is_published | True/False | — |

Indexes: content_type, state, author, modified_date, (is_latest, is_published).

### `content_item_version` (D2) — supports EPIC-15 versioning
Child of `content_item` (reference), snapshot of versioned fields + `version_id`, `is_published`, `is_latest`, `created`.

### `content_version_pruning` (ENT-14) — EPIC-14/05c
| Column | Type | Notes |
|---|---|---|
| content_type | Reference → content_type | — |
| retention_days | Integer | min 0 |
| versions_to_keep | Integer | min 0 |

### `tenant` (ENT-07, D1) — EPIC-16/01
name (unique, letters-only; root must be `Default`), description, request_url_prefix, recipe_name (Choice Blog/Headless/Agency/Blank), database_provider (Choice — modeled for spec fidelity, non-functional on ServiceNow), table_prefix, status (Choice Running/Uninitialized, default Uninitialized).

### `feature` (ENT-08) — EPIC-16/07
feature_name, module, category (Choice Infrastructure/Content Management), is_enabled (bool), dependencies (list), state flags.

### `query` (ENT-11, D5) — EPIC-17/09/41
query_name (unique), query_type (Choice — mapped to ServiceNow execution at runtime), parameters (JSON). Execution logic in Phase 4.

## 3. ACLs (realize Phase 1 permission matrix)

Attach `sys_security_acl` per `specs/design/phase-1-identity-access.md §4`:
- `content_item` read → cms_reader (+contained); create/write → cms_author, cms_contributor, cms_editor; delete → cms_moderator; publish operation → cms_editor. (US-04a-08, US-37b-*)
- `content_type` / `content_field` write → cms_admin (EditContentTypes). (US-05, US-44b-04 system-field protection)
- `tenant` / `feature` / `query` / pruning → cms_admin.
- Admin role immutability respected (US-44a-04) via Phase 1 guard.

## 4. Audit (NFR-09, EPIC-38)
Enable OOTB auditing on `content_item` and `content_type` (ENT audit:true for User/Role already OOTB).

## 5. Open items
- Confirm D1/D2/D5 before build.
- `featured_image` resolves in Phase 4 (attachments).

## 6. Acceptance
Gherkin for EPIC-14/15/16 data stories (US-14a-*, US-15a-01/04/05, US-16a-*) + schema parity with `inputs/data-model.md`; ATF CRUD + ACL tests.
