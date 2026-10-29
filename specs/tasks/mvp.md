# MVP Execution Tasks — Orchard Core CMS on ServiceNow

> **Source of truth for scope:** `mvp/features.md` (features **M1–M27**). This file turns those 27 features into **ordered, deployable, testable ServiceNow tasks**. Each task = one `build → install → validate` unit tagged with the story IDs it satisfies. Acceptance = the story's Gherkin in `inputs/backlog.md`, automated as ATF.
>
> **Relationship to the full plan:** `specs/TASKS.md` tracks all 281 stories across Phases 1–6. This MVP sheet is the **critical-path subset** plus a **net-new Phase 7 (public delivery)**. Task IDs below reuse the parent `Pn-xx` IDs where one exists, and add `MVP-*` / `P7-*` IDs for net-new work. Deferred items (S1–S5, DEFERRED table in `mvp/features.md`) are explicitly **out of scope here**.
>
> **Scope:** `x_1863391_service_now_agent_cms` (per `CLAUDE.md`; note the older `specs/tasks/phase-*.md` drafts say `x_1863391_now_app` — the authoritative scope is `x_1863391_service_now_agent_cms`).
> **Fluent / Now SDK:** `4.14.0`. Artifacts: `Table()`, `ChoiceSet()`, `Acl()`, `BusinessRule()`, `ScriptInclude()`, `ScriptedRestApi()`, `UiPage()`/UX, `Role()`, `Record()`, `TestSuite()`. **Discover exact Fluent signatures from the SDK docs before coding — never from memory** (`CLAUDE.md` §5).

Legend: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked

---

## 0. Build order (dependency waves)

```text
Wave A — Access         M1 M2 M3 M4 M5           (roles install, login, seed admin, ACLs, last-admin guard)
   │
Wave B — Data model     M6 M7 M8 M9 + M23(slug)   (content_type, content_field, content_item, version child, slug)
   │
Wave C — Lifecycle      M10 M11 M12 M13 M14        (ContentLifecycle SI, publish verbs, versioning, validation)
   │
   ├────────────┬──────────────────────┐
   ▼            ▼                      ▼
Wave D — API   Wave E — Admin UI     Wave F — Public delivery  (D6 ⚠ ratify first)
 M15 M16 M17    M18 M19 M20            M24 M25 M26 M23(route)
   │            │                      │
   └────────────┴──────────┬───────────┘
                           ▼
Wave G — Quality gate   M21 M22 M27    (ATF core thread, a11y+ui_diagnostics on editor + public pages)
```

**Gating decisions before build:**
- **D1–D5** already ratified (`specs/design/phase-0-decisions.md`).
- **D6 (public delivery mechanism) — NOT yet ratified.** `mvp/features.md` §6 recommends **Public UI Page(s) in app scope**. Wave F (M24–M27) and the slug *route* assume that option. **Confirm D6 before starting Wave F.**

---

## Wave A — Identity & Access (gate the thread)

### MVP-A1 · Install CMS roles + contains hierarchy — **M1** (parent P1-01)
Stories: US-37a-06, US-37b-01/02, US-13a-06, US-37c-03
- [~] Already built in `src/fluent/roles.now.ts` (cms_admin→editor→moderator→author→contributor→reader). **Install pending.**
- [ ] `build` + `install`; verify the 6 roles + `contains` graph exist in-scope.
- [ ] ATF: a user granted `cms_admin` inherits the subordinate roles. Tag `@US-37b-01 @US-37b-02`.

### MVP-A2 · Local login / authentication policy — **M2** (parent P1-08, configure OOTB)
Stories: US-02a-*, US-37a-01
- [ ] Configure platform local login + lockout/password policy. SSO/OIDC/2FA **deferred** (not MVP).
- [ ] Preserve verbatim auth error strings from `inputs/api.md` `/v1/auth/login` where surfaced.
- [ ] ATF: valid login succeeds; disabled user → `USER_NOT_ALLOWED`.

### MVP-A3 · Seed default admin role assignment — **M3** (parent P1-05)
Stories: US-34a-03, US-37a-06
- [ ] `Record()` seed (installMethod `first install`) granting `cms_admin` to the bootstrap admin user so a fresh install is operable.
- [ ] ATF: seeded admin can reach CMS admin modules.

### MVP-A4 · ACLs on content & content-type tables — **M4** (parent P2-09)
> Depends on Wave B tables existing; **author ACLs alongside the tables** (co-deploy). Realizes the permission matrix — no custom claim engine.
Stories: US-04a-08, US-37b-*, US-05, US-44b-04
- [ ] `Acl()` `content_item`: read→cms_reader; create/write→cms_author, cms_contributor, cms_editor; delete(remove)→cms_moderator; publish operation→cms_editor.
- [ ] `Acl()` `content_type` / `content_field`: write→cms_admin; read→cms_reader+.
- [ ] Map `/v1/*` `FORBIDDEN (403)` behavior to these ACLs (see Wave D).
- [ ] ATF: per-role allow/deny matrix (author cannot publish; reader cannot write; moderator can remove). Tag `@US-37b-01 @US-37b-02 @US-04a-08`.

### MVP-A5 · Last-enabled-admin guard (BR-01) — **M5** (parent P1-03)
Stories: US-02d-02, US-19a-04
- [ ] `BusinessRule()` (before update/delete on `sys_user` / role assignment) blocking disable/removal of the **last enabled `cms_admin`**.
- [ ] Message verbatim: `Cannot disable this user This is the last remaining enabled administrator account. At least one enabled administrator is required.` (`/v1/users/{id}/disable` → 422 `LAST_ADMIN_GUARD`).
- [ ] ATF: disabling last admin → blocked; disabling a non-last admin → allowed. Tag `@US-02d-02`.

---

## Wave B — Content data model (custom core)

### MVP-B1 · `content_type` table + choices — **M6** (parent P2-01)
Stories: US-14a-01/02/03, US-05a · Rules BR-12, BR-13
- [ ] `Table()` `content_type`: `display_name` (string, mandatory, max 1024), `name` (string, mandatory, **unique**), `creatable`/`listable`/`draftable`/`versionable`/`securable` (boolean), `settings` (string/JSON).
- [ ] `BusinessRule()` before insert: `name` starts with ASCII letter + ToSafeName normalize + uniqueness. Messages: `Name must start with an ASCII letter.` / `A content type with this name already exists.` / `Display name is required and must not exceed 1024 characters.`
- [ ] ATF: create ok; duplicate/invalid rejected. Tag `@US-14a-02 @US-05a-02`.

### MVP-B2 · `content_field` table + field-type choices — **M7** (parent P2-02)
Stories: US-14a-04/05/06, US-05b
- [ ] `Table()` `content_field`: `content_type` (reference→content_type, mandatory, indexed), `field_name` (string, mandatory), `field_type` (`ChoiceSet`: TextField, DateField, CustomBooleanField, ContentPicker, Numeric, Boolean, Date, Link, Html, Markdown, Media), `position` (integer, default 0), `is_system_defined` (boolean, default false), `settings` (string).
- [ ] Related list on `content_type`; default `position` = max+1. Message `Field name is required.`
- [ ] ATF: add/list/reorder fields. Tag `@US-14a-04 @US-14a-05 @US-05b-04`.

### MVP-B3 · `content_item` table + state choices — **M8** (parent P2-03)
Stories: US-15a-01, US-04b-02 · Data: ENT-04
- [ ] `Table()` `content_item`: `content_item_id` (string, indexed business key), `content_item_version_id` (string), `content_type` (reference, mandatory), `title` (string, mandatory), `body_text` (html), `priority_level` (integer, min 1/max 10), `featured` (boolean), `publication_date` (glide_date), `related_link` (url), `custom_html` (string), `tags` (glide_list/string), `notes` (string), `featured_image_path` (string), `author` (reference→sys_user), `state` (`ChoiceSet` Draft/Published/Removed, default Draft), `modified_date` (glide_date_time), `is_latest` (boolean), `is_published` (boolean).
- [ ] Indexes: content_type, state, author, modified_date, (is_latest, is_published).
- [ ] ATF: create draft → state=Draft, is_latest=true. Tag `@US-15a-01 @US-04b-02`.

### MVP-B4 · `content_item_version` child table — **M9** (parent P2-04, D2)
Stories: US-15a-02/03
- [ ] `Table()` `content_item_version` (child of content_item): `content_item` (reference), `version_id` (string), snapshot columns, `is_published`, `is_latest`, `created` (glide_date_time). Index content_item.
- [ ] ATF: version row created per draft/publish (full flow asserted in Wave C). Tag `@US-15a-02 @US-15a-03`.

### MVP-B5 · URL slug on content item — **M23** (net-new, parent P2-03 extension)
> Required for public delivery (Wave F). Safe to add now even if D6 is still open.
Stories: ENT-04 extension (no slug in source model)
- [ ] Add `slug` (string, indexed) to `content_item`; auto-generate from `title` on insert if empty.
- [ ] `BusinessRule()`: **uniqueness among published items** (`is_published=true`); keep slug **stable on retitle**.
- [ ] ATF: slug auto-generated, unique across published, stable after title change.

### MVP-B6 · Audit on content tables — **(S1 is deferred; minimal enable only if cheap)**
> `mvp/features.md` lists field-level audit as **SHOULD (S1)**, not ship-blocking. Skip unless time allows.

---

## Wave C — Content lifecycle & validation (the differentiator)

### MVP-C1 · `ContentLifecycle` Script Include — **M10** (parent P3-01)
Stories: US-15a-03
- [ ] `ScriptInclude()` `ContentLifecycle` = single source of truth for transitions; sets `is_latest`/`is_published`/`state` and writes version rows. Consumed by UI (Wave E) and REST (Wave D).
- [ ] ATF (unit-level) via a thin test harness; full assertions in C2/C3.

### MVP-C2 · Publish / Unpublish — **M11** (parent P3-02)
Stories: US-04c-01/02, US-15a-03 · API `/v1/content-items/{id}/publish|unpublish`
- [ ] Operations call `ContentLifecycle`: publish → state=Published, is_published=true, is_latest=true; unpublish → state=Draft, is_published=false.
- [ ] ATF: flag correctness both directions. Tag `@US-04c-01 @US-04c-02 @US-15a-03`.

### MVP-C3 · Clone / Remove / Restore / Discard-draft — **M12** (parent P3-03)
Stories: US-04c-03/04/05/06, US-15a-04/06 · Rules BR-10
- [ ] clone → new Draft copy; remove → clear is_latest/is_published (state=Removed, record retained); restore → reinstate latest (state=Draft); discard-draft → revert to last published.
- [ ] ATF each verb; removed item is restorable. Tag `@US-04c-03 @US-04c-04 @US-04c-05 @US-04c-06`.

### MVP-C4 · Draft versioning on save — **M13** (parent P3-04)
Stories: US-04b-03, US-15a-02
- [ ] On content_item save, create a new `content_item_version` row; mark previous not-latest.
- [ ] ATF: N saves → N versions; only one is_latest. Tag `@US-04b-03 @US-15a-02`.

### MVP-C5 · Core validation rules — **M14** (parent P3-05)
Stories: US-04d-03/04/05 · Rules BR-07/08/09/11
- [ ] Data Policies / Business Rules: title required (`A value is required for Title.`), priority 1–10 (`Priority Level must be between 1 and 10.`), tags leaf-terms-only (`Select leaf terms only. Multiple selections allowed.`), content_type reference integrity.
- [ ] ATF: each rule rejects/accepts correctly, messages verbatim. Tag `@US-04d-03 @US-04d-04 @US-04d-05`.

---

## Wave D — Content REST API (headless)

### MVP-D1 · Scripted REST base + auth/ACL + `cms_api` role — **M15** (parent P4-01)
Stories: US-27a-01, INT-09
- [ ] `Role()` `cms_api` (API access); `ScriptedRestApi()` base namespace; gate every resource with ACLs + `cms_api`.
- [ ] 401 `Authentication required.` / 403 `Insufficient permissions.` verbatim.
- [ ] ATF: unauthenticated→401, authenticated-without-role→403.

### MVP-D2 · Content-items endpoints: list / get / create / update — **M16** (parent P4-02)
Stories: US-04a/04b, US-12a-01/02, US-15a-05/08 · API-exact shapes from `inputs/api.md`
- [ ] `GET /v1/content-items` (filters: search, contentType, status, author; paginated).
- [ ] `GET /v1/content-items/{contentItemId}` (`version` = Published|Draft|Latest) — 404 `Content not found The requested content item does not exist.`
- [ ] `POST /v1/content-items` (create Draft) — 400 TITLE_REQUIRED/PRIORITY_RANGE/LEAF_TERMS_ONLY.
- [ ] `PUT /v1/content-items/{contentItemId}` (save as new draft version) — reuse MVP-C4.
- [ ] Also expose integration reads `GET /v1/api/content/{id}` + `POST /v1/api/content` (US-12a) gated by `cms_api`.
- [ ] ATF: contract tests vs `inputs/openapi.json` (status + body + messages). Tag `@US-15a-05 @US-12a-01 @US-12a-02 @US-27a-01`.

### MVP-D3 · Lifecycle endpoints — **M17** (parent P4-03)
Stories: US-04c, US-15a · reuse **M10** Script Include
- [ ] `POST .../publish`, `.../unpublish`, `.../clone`, `.../remove`, `.../restore`, `.../discard-draft` — all delegate to `ContentLifecycle`.
- [ ] Role gates per `api.md` (publish/unpublish → ROL-01/02 = cms_admin/editor; remove → ROL-01/03; restore → ROL-01).
- [ ] ATF: each endpoint returns documented status/body and enforces role gate. Tag `@US-04c-01..06 @US-15a-03/04/06`.

---

## Wave E — Authoring & admin UI (minimum operable surface)

### MVP-E1 · Content admin list view + row actions — **M18** (parent P5-03)
Stories: US-04a-01..05/08
- [ ] OOTB list view on `content_item` with filters (type/status/author/search) + UI actions: publish/unpublish/remove/restore/clone (call `ContentLifecycle`).
- [ ] ATF (UI or server): row actions transition state correctly.

### MVP-E2 · Content types / fields admin UI — **M19** (parent P5-04)
Stories: US-05a, US-05b
- [ ] OOTB list/form views for `content_type` + related `content_field` list, respecting write→cms_admin ACL.

### MVP-E3 · Content Item Editor (custom authoring page) — **M20** (parent P5-05)
Stories: US-04b-01/02/03, SCR-content-edit
- [ ] The one differentiated UX. Read `ui-page-guide` + `ui-page-theming-guide` **before** building. UI Builder + `@servicenow/react-components`, Horizon `--now-*` tokens (brand `#0F62FE` mapped via tokens, verified with `css_variable_explorer`), WCAG 2.1 AA.
- [ ] Save → draft version (MVP-C4); surface validation messages verbatim (MVP-C5).
- [ ] Include `?uxpcb=...` cache-bust on script includes; run `ui_diagnostics` after install.

---

## Wave F — Public content delivery (anonymous visitors) · ⚠ requires **D6** ratification

### MVP-F1 · Anonymous read ACL (published-only) — **M24** (net-new, parent P2-09 extension)
Stories: public actor (`inputs/architecture.md`)
- [ ] Read `Acl()` on `content_item` granting role `public`/`snc_external` **only when `is_published=true` AND `state=Published`**; drafts/removed never exposed.
- [ ] Public read of the featured-image **attachment** only for published items.
- [ ] ATF: anonymous can read a published item; draft/removed → not found/forbidden; attachment of a draft is not reachable. **Ship-blocking security check.**

### MVP-F2 · Public delivery page(s) — **M25** + slug route (**M23**) (net-new P7-01)
- [ ] Per **D6 recommendation**: in-scope **UI Page(s)** — a published-content **index/list** + **detail-by-slug**, flagged public, server-side fetch of the published version, Horizon-themed.
- [ ] Register page as public **without** widening anonymous access to any other table.
- [ ] ATF/manual: visiting a published slug renders; unknown/unpublished slug → not-found.

### MVP-F3 · Field renderer + HTML sanitization — **M26** (net-new P7-02)
- [ ] Map content-type fields (title, body/markdown, `customHtml`, featured image, publication date, tags) to safe markup.
- [ ] **Sanitize/allowlist `customHtml` + rich text** to prevent stored XSS. **Ship-blocking.**
- [ ] ATF: a crafted `<script>`/on-event payload in `customHtml` is neutralized on the public page.

---

## Wave G — Minimal quality gate

### MVP-G1 · ATF coverage for the core thread — **M21** (parent P3-08, P4-12 subset)
Stories: EPIC-04c, EPIC-15, US-12a, US-27a
- [ ] `TestSuite()` chaining lifecycle (Wave C) + content API contract (Wave D) tests; wire as MVP definition of done.

### MVP-G2 · Accessibility + `ui_diagnostics` on the editor — **M22** (parent P5-07/08 subset)
Stories: US-44a-07
- [ ] `ui_diagnostics` clean on the custom editor (MVP-E3); WCAG AA (labels, focus, contrast 4.5:1 / 3:1), light + dark.

### MVP-G3 · Public-page accessibility + diagnostics — **M27** (net-new P7-03)
- [ ] `ui_diagnostics` + WCAG 2.1 AA on public pages (semantic landmarks, headings, alt text, contrast), light/dark + responsive.

---

## MVP Definition of Done (from `mvp/features.md` §5)

1. Admin creates a content **type** with **fields** (MVP-B1/B2, E2).
2. Author creates/saves a **draft**, producing **versions** (MVP-B3/B4, C4, E3).
3. Item **published/unpublished/cloned/removed/restored/discarded**, flags correct, validation enforced (MVP-C*, E1).
4. Item **retrievable + creatable via REST** with exact `api.md` contracts/errors, role-gated (MVP-A4, D*).
5. **Published item browsable by anonymous visitor at its slug**; drafts/removed → not-found/forbidden (MVP-B5, F*).
6. All **permission-gated**; **last-admin guard** holds (MVP-A*).
7. Core thread passes **ATF**; editor + public pages pass **a11y + `ui_diagnostics`** (MVP-G*).

---

## Open item to confirm before Wave F

- **D6 — public delivery mechanism.** Recommended: **Public UI Page(s)** (smallest correct footprint). Alternatives: Service Portal, or Next Experience public experience. Confirm so Wave F (M24–M27) and the slug route proceed on the right foundation, and so `specs/` gains a consistent **Phase 7**.
