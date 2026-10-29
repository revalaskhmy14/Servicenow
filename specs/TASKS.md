# TASKS.md — Execution Tracker

Living, ordered checklist across all phases. Each task = one deployable, testable unit, tagged with the story IDs it satisfies. Acceptance = the story's Gherkin scenarios in `inputs/backlog.md`, automated as ATF.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked

References: `specs/DESIGN.md` (solution design) · `specs/PLAN.md` (strategy) · `specs/design/phase-N-*.md` (per-phase design) · `specs/design/phase-0-decisions.md` (D1–D5) · **`specs/design/coverage-matrix.md`** (all 281 stories → disposition → task → deps; authoritative completeness check).

> Phases 2–6 depend on Phase 0 decisions D1–D5 (assumed defaults documented; ratify before Phase 2 build).

> **MVP fast path:** For the ship-blocking critical thread (author → publish → anonymous visitor browses) see **`specs/tasks/mvp.md`** (features M1–M27 from `mvp/features.md`, sequenced into Waves A–G). It is the critical-path subset of the phases below, plus a **net-new Phase 7 — Public Content Delivery** (requires ratifying **D6**).

---

## Phase 0 — Foundation & decisions

- [x] P0-01 Ingest specs; author `CLAUDE.md`, `specs/PLAN.md`
- [x] P0-02 Author design docs (phases 1–6) + this tracker
- [x] P0-03 Ratify decisions D1–D5 — **ratified (user-approved)**; see `specs/design/phase-0-decisions.md`

---

## Phase 1 — Identity & Access
Design: `specs/design/phase-1-identity-access.md` · **Per-story subtasks: `specs/tasks/phase-1.md`**

- [~] P1-01 Create CMS roles + contains hierarchy (built; **install pending**) — US-37a-06, US-37b-01/02/03/04, US-13a-06, US-37c-03
- [ ] P1-02 Create CMS security-settings system properties (`cms.*`) — US-18a-01/02, US-40a-02/03
- [ ] P1-03 BR-01 last-enabled-admin guard — US-02d-02 (REQ-02d-013), US-19a-04
- [ ] P1-04 System-role protection / admin-role immutability — US-44a-04/05, US-37a-05, US-03a-03
- [ ] P1-05 Seed default admin role assignment — US-34a-03, US-37a-06
- [ ] P1-08 Configure authentication & login policy (local login, lockout, 2FA, timing) — US-02a-*, US-37a-01/03, US-19a-02, US-44a-01
- [ ] P1-09 Configure self-service registration + email verification + password reset — US-02b-*, US-02d-05, US-21a-*
- [ ] P1-10 Configure external SSO/OIDC providers + rate limiting — US-20a-*, US-37a-02, US-07b-03, US-44a-03
- [ ] P1-11 Configure user self-profile + OOTB user admin CRUD — US-02c-*, US-02d-01/03/04, US-02e-*
- [ ] P1-06 ATF tests for Phase 1 — US-02d-02, US-44a-04/05, US-37b-01/02
- [ ] P1-07 Flip Phase 1 design doc to as-built

---

## Phase 2 — Content domain data model
Design: `specs/design/phase-2-content-data-model.md` · **Per-story subtasks: `specs/tasks/phase-2.md`**

- [ ] P2-01 `content_type` table + choices (ENT-05) — US-14a-01/02/03, US-05a
- [ ] P2-02 `content_field` table + field_type choices (ENT-06) — US-14a-04/05/06/07, US-05b
- [ ] P2-03 `content_item` table + state choices (ENT-04) — US-15a-01, US-04b-02
- [ ] P2-04 `content_item_version` table (D2) — US-15a-02/03
- [ ] P2-05 `content_version_pruning` table (ENT-14) — US-14a-08, US-05c-01
- [ ] P2-06 `tenant` table + choices (ENT-07, D1) — US-16a-01/02/03/04, US-01
- [ ] P2-07 `feature` table + choices (ENT-08) — US-16a-05/06/07, US-07
- [ ] P2-08 `query` table + choices (ENT-11, D5) — US-17a-06..10, US-09
- [ ] P2-09 ACLs for content/config tables (realize Phase 1 matrix) — US-04a-08, US-37b-*, US-05, US-44b-04
- [ ] P2-10 Enable audit on `content_item` / `content_type` — US-38a-01, NFR-09
- [ ] P2-11 ATF: CRUD + ACL + schema parity — US-14a-*, US-15a-05, US-16a-*
- [ ] P2-12 Flip Phase 2 design doc to as-built

---

## Phase 3 — Content lifecycle & business logic
Design: `specs/design/phase-3-content-lifecycle.md` · **Per-story subtasks: `specs/tasks/phase-3.md`**

- [ ] P3-01 `ContentLifecycle` Script Include (shared transition logic) — US-15a-03
- [ ] P3-02 Publish / Unpublish operations + flow — US-04c-01/02, US-15a-03
- [ ] P3-03 Clone / Remove / Restore / Discard-draft — US-04c-03/04/05/06, US-15a-04/06
- [ ] P3-04 Draft versioning on save — US-04b-03, US-15a-02
- [ ] P3-05 Validation rules (title/priority/tags/type ref/system-field) — US-04d-03/04/05, US-05b-05, BR-07/08/09/11
- [ ] P3-06 Version pruning scheduled job — US-14a-08, NFR-10/22
- [ ] P3-07 Audit review wiring — US-38a-02/03
- [ ] P3-08 ATF: lifecycle + validation — EPIC-04c, EPIC-15
- [ ] P3-09 Flip Phase 3 design doc to as-built

---

## Phase 4 — APIs & integrations
Design: `specs/design/phase-4-apis-integrations.md` · **Per-story subtasks: `specs/tasks/phase-4.md`**

- [ ] P4-01 Scripted REST API base + auth/ACL + `cms_api` role — US-27a-01, INT-09
- [ ] P4-02 Content-items endpoints (list/get/create/update) — US-04a/04b, US-15a-05 (API-22..25)
- [ ] P4-03 Lifecycle endpoints (publish/unpublish/clone/remove/restore/discard/import) — US-04c, US-15a (API-26..32)
- [ ] P4-04 Content-types + fields endpoints — US-05, US-14a (API-33..39)
- [ ] P4-05 Admin config endpoints (tenants/features/queries/security-settings/pruning) — US-01/07/09/16/17/18/40 (API-40..56)
- [ ] P4-06 AI Search index on content — US-23/24/41, INT-05/06
- [ ] P4-07 Attachments for media (resolves featured_image) — US-06/25/26, INT-07/08
- [ ] P4-08 Notifications: email + SMS — US-21/22/39, INT-03/04
- [ ] P4-09 Background scheduled jobs config — EPIC-10
- [ ] P4-10 GraphQL via OOTB (**deferred, D4**) — US-12b-01/02, INT-10
- [ ] P4-11 MetaWeblog/XML-RPC shim (**deferred, D4**) — US-12b-03, INT-12
- [ ] P4-14 Deployment via Update Sets / App Repo (**configure/defer**) — US-08*, US-17a-01..05, US-29a-*, US-42a-01/02
- [ ] P4-12 ATF: API contract tests vs `openapi.json` — US-12a, US-27a
- [ ] P4-13 Flip Phase 4 design doc to as-built

---

## Phase 5 — Admin & authoring UI
Design: `specs/design/phase-5-admin-ui.md` · **Per-story subtasks: `specs/tasks/phase-5.md`**

- [ ] P5-01 CMS workspace shell + navigation — screens/ux
- [ ] P5-02 OOTB list/form views: users, roles — SCR-users-admin, SCR-roles-*
- [ ] P5-03 Content admin list view + filters + row actions — US-04a-01..08
- [ ] P5-04 Content types / fields admin UI — US-05a, US-05b
- [ ] P5-05 Custom Content Item Editor UX page — US-04b-01/02/03, SCR-content-edit
- [ ] P5-06 Admin config pages (tenant/features/queries/deployment/security/pruning/SMS/S3) — US-01/07/09/40
- [ ] P5-07 Design tokens/theming + accessibility pass — NFR-20, US-44a-07
- [ ] P5-08 `ui_diagnostics` + ATF UI tests
- [ ] P5-09 Flip Phase 5 design doc to as-built

---

## Phase 6 — Quality, NFRs & operations
Design: `specs/design/phase-6-quality-nfrs.md` · **Per-story subtasks: `specs/tasks/phase-6.md`**

- [ ] P6-01 Master ATF suite + Gherkin coverage mapping — EPIC-44
- [ ] P6-02 Security headers / rate limiting / privacy config — NFR-04/05/17, US-44a-01/02/03/b-01/02/05
- [ ] P6-03 Performance tuning (indexes, AI Search) — NFR-18, US-44a-08/c-01
- [ ] P6-04 Observability / structured logging / audit — NFR-24, US-43a-03
- [ ] P6-05 Backup/DR + migration error handling docs — NFR-23, US-43a-01/04
- [ ] P6-06 Accessibility + browser/device compliance — NFR-20/21, US-44c-03/04
- [ ] P6-07 Final as-built + release checklist (Definition of Done)
