# Implementation Plan — Orchard Core CMS on ServiceNow

A phased roadmap that implements the `inputs/` specification on ServiceNow by **maximizing out-of-the-box (OOTB) platform capabilities** and building custom metadata only for the genuine content domain. Read alongside `CLAUDE.md`.

---

## Guiding principle: configure OOTB, build only the content domain

The spec describes a .NET app that re-implements things ServiceNow already provides. We do **not** rebuild those. We map them to the platform and spend custom effort only where the product is actually differentiated: **content items, content types/fields as data, the publishing lifecycle, and the admin experience.**

### Do NOT build (use OOTB instead)

| Spec area | Spec refs | OOTB replacement |
|---|---|---|
| User accounts & profile | ENT-01, EPIC-02/19 | `sys_user`, user profile, self-registration |
| Auth: login, SSO, OAuth/OIDC, 2FA, lockout, password reset, timing-normalization | EPIC-37, INT-01/02, NFR-03/04 | Platform login, Multi-Provider SSO (SAML/OIDC), MFA, password policy, lockout |
| Roles, permissions, RBAC | ENT-02/03, EPIC-03/37 | `sys_user_role`, role contains, **ACLs** |
| Schema migrations | ENT-13, EPIC-31/34 | Now SDK build/install + app versioning |
| Deployment plans / export / import | ENT-09/10, EPIC-08/29 | Update Sets, Application Repo, Now SDK install |
| Full-text search / indexing | ENT (search), INT-05/06, EPIC-23/24/41 | **AI Search** / Zing text indexing |
| Media/file storage (Blob/S3) | INT-07/08, EPIC-06/25/26 | **Attachments** (`sys_attachment`) |
| Email / SMS | INT-03/04, EPIC-21/22/39 | **Notifications** + email; SMS via connector |
| Audit trail | NFR-09, EPIC-38 | OOTB field **auditing** + history |
| Background polling / distributed locks | EPIC-10, INT-14 | **Scheduled Jobs**, `sys_trigger` |
| Security settings store | ENT-12, EPIC-18/40 | **System Properties** (`sys_properties`) |
| Redis distributed cache | INT-14, NFR-06 | Platform caching / instance infra |

### DO build (custom)

- **Content domain tables**: content type, content field definition, content item (+ versioning).
- **Publishing lifecycle & validation** (state model + rules + flows).
- **Content-facing REST/GraphQL API** matching `api.md` contracts.
- **Admin/authoring UX** (workspace + content editor).
- A **thin config layer** (feature toggles, named queries, tenant representation) — only where OOTB config records don't already suffice.

---

## Phase 0 — Foundation & governance

**Goal:** lock decisions so later phases don't churn.

- Confirm scope `x_1863391_now_app`, module/folder structure, and naming conventions (entity → table map documented in `CLAUDE.md`).
- Ratify the OOTB mapping above with stakeholders (esp. **tenancy** and **content versioning** strategy — see open decisions below).
- Establish git branch strategy and ATF test conventions.
- No code beyond project scaffolding.

**Exit:** agreed mapping + naming doc; clean `build`.

---

## Phase 1 — Identity & Access (configure OOTB, minimal custom)

Covers: EPIC-02, EPIC-03, EPIC-37, EPIC-13 (user/role data), EPIC-18/40 (security settings).

- **Roles** → create custom roles: `cms_admin`, `cms_editor`, `cms_moderator`, `cms_author`, `cms_contributor`, `cms_reader`, mapped to PER-01…PER-06. Use role *contains* for inheritance (e.g. admin contains all).
- **Users/profile/registration/login/2FA/password reset** → configure OOTB; do not model a User table.
- **Permissions** → express every spec permission (ViewContent, EditContent, PublishContent, etc.) as **ACLs** on the content tables (Phase 2), not a custom claim engine.
- **Security settings** → `sys_properties` (use the `update-system-property` workflow for existing props). Only the registration/login toggles that have no OOTB equivalent become app properties.
- **Genuinely custom bits** (small, cite stories):
  - **BR-01 last-enabled-admin guard** → business rule preventing deactivation of the last `cms_admin`.
  - Admin-role immutability / system-role delete protection → ACL + business rule.

**Exit:** roles installed; ACL model drafted; last-admin guard tested via ATF.

---

## Phase 2 — Content domain data model (custom core)

Covers: ENT-04/05/06/14, EPIC-14/15; tenancy ENT-07; config ENT-08/11.

- **Tables** (Fluent `Table()`), enums as choice lists, honoring `schema.json` required/unique/index rules:
  - `content_type` (ENT-05), `content_field` (ENT-06, ref → content_type), `content_item` (ENT-04, ref → content_type + author `sys_user`).
  - Content statuses `Draft/Published/Removed` as a choice `state` field.
  - `content_version_pruning` (ENT-14) config.
- **Versioning decision** (see open decisions): either a `content_item_version` child table or OOTB field history; default recommendation = lightweight version child table keyed by `contentItemId`.
- **Tenancy decision**: default = a `tenant` field/table (ENT-07) for logical separation; use **Domain Separation** only if hard isolation is required.
- **Config as data (minimal)**: `feature` (ENT-08) and `query` (ENT-11) tables only if the OOTB equivalents (plugins / saved filters / GlideQuery) don't cover the stories; prefer OOTB first.
- **ACLs** attach to these tables, realizing Phase 1 permissions. **Audit** enabled per NFR-09 (ENT-01/02/04).

**Exit:** tables + choices + ACLs + audit installed; CRUD works through OOTB list/form; schema matches `data-model.md`.

---

## Phase 3 — Content lifecycle & business logic (custom)

Covers: EPIC-04 (04b/04c), EPIC-15, validation stories US-04d-*.

- **State transitions** publish / unpublish / clone / remove / restore / discard-draft → **Flow Designer** actions + a Script Include for shared logic; set `isLatest`/`isPublished` per `architecture.md` flow 5.
- **Validation (BR-07/08/09/11, etc.)** → **Data Policies** / business rules: title required, priority 1–10, leaf-terms-only, content-type reference integrity.
- **Version pruning** → **Scheduled Job** honoring `retentionDays`/`versionsToKeep` (NFR-10/22).
- **Audit review** (US-38a-03) → OOTB history/activity.

**Exit:** full lifecycle passes ATF tests derived from the Gherkin scenarios.

---

## Phase 4 — APIs & integrations (OOTB-backed)

Covers: EPIC-12/27/28/30, INT-03/04/05/06/07/08/09/10, EPIC-41.

- **Content REST API** (`/v1/content-items`, `/v1/content`, etc.) → **Scripted REST API** resources returning the exact shapes and error codes in `api.md`; reuse Phase 3 Script Include. Gate with ACLs + API access roles.
- **GraphQL** → platform **GraphQL** schema where supported; confirm scope before building.
- **MetaWeblog/XML-RPC** → evaluate; likely a Scripted REST endpoint or deferred (low priority P2).
- **Search** → **AI Search** index on content tables (replaces Lucene/Elasticsearch).
- **Media** → **Attachments** on content items (replaces Blob/S3).
- **Email/SMS** → **Notifications** for verification/reset/SMS events.
- **Background** → Scheduled Jobs (already used in Phase 3).

**Exit:** API contract tests green against `openapi.json`; search returns content; attachments + notifications verified.

---

## Phase 5 — Admin & authoring UI (OOTB-first, custom where needed)

Covers: screens in `screens.md` / `ux.md`, EPIC-05 UI, EPIC-07/09.

- **Most admin CRUD** (users, roles, content list with filters, content types, features, queries, deployment) → OOTB **list/form views**, UI Builder **workspace**, and configuration pages. Avoid custom pages for standard CRUD.
- **Custom UX only** for the differentiated **Content Item Editor** (SCR-content-edit) and any authoring dashboards — built in **UI Builder** with `@servicenow/react-components`, Horizon design tokens (map brand `#0F62FE`), WCAG 2.1 AA.
- Preserve verbatim user-facing messages/validation strings from the specs.

**Exit:** navigable workspace; content editor passes `ui_diagnostics` + accessibility checks.

---

## Phase 6 — Quality, NFRs & operations

Covers: EPIC-43/44, NFR-01…NFR-24.

- **ATF suite** mapping Gherkin scenarios per story; wire into the definition of done.
- **Security headers / rate limiting / privacy** → platform config + properties (NFR-04/05/17).
- **Performance & availability** (NFR-18/19) → list/index tuning; rely on instance HA.
- **Observability** → platform logs, events, and audit.
- **Backup/DR** → platform-provided (no custom work).

**Exit:** ATF suite green; NFR checklist signed off.

---

## Build order alignment

Follows `inputs/build-order.md`:

`Foundation → Identity/Access → Content data → Content lifecycle → APIs → UI → Quality`

maps to the spec critical path `EPIC-33 → EPIC-31/34 → EPIC-13 → EPIC-37 → EPIC-04/15`, with the understanding that EPIC-31/34 (data persistence/migration) are **largely satisfied by the Now SDK**, not rebuilt.

---

## Open decisions (resolve in Phase 0)

1. **Tenancy (ENT-07):** logical `tenant` field vs. full **Domain Separation**? (Affects every table + ACL.)
2. **Content versioning (ENT-04):** dedicated version child table vs. OOTB field history?
3. **Dynamic content types (ENT-05/06):** model as data records (recommended) vs. generating real tables? We will **not** let end users create physical tables.
4. **GraphQL & XML-RPC scope:** build now, or defer the P2 integration stories?
5. **Named queries (ENT-11):** OOTB saved filters/GlideQuery vs. a custom query table?

---

## Status

- [x] Specs ingested; `CLAUDE.md` + this plan created.
- [ ] Phase 0 decisions ratified.
- [ ] Phases 1–6 execution (tracked per-phase via the planning tool when started).
