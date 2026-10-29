# Phase 1 Tasks (detailed, per story) — Identity & Access

Granular, ServiceNow-specific subtasks for every Phase 1 story. Each subtask is a concrete platform artifact or configuration step. A story is **done** only when all its subtasks ship and its Gherkin scenarios pass as ATF.

Design: `specs/design/phase-1-identity-access.md` · Coverage: `specs/design/coverage-matrix.md` · Summary tracker: `specs/TASKS.md`.

**Conventions**
- Scope: `x_1863391_now_app`. Fluent files under `src/fluent/`.
- Artifact types (Fluent): `Role()`, `Acl()`, `BusinessRule()`, `Property()`, `Record()` (seed), `Test()`/`TestSuite()` (ATF). Auth/SSO/MFA = OOTB instance config.
- Subtask IDs: `T-<story>-<n>`. Check `[ ]→[x]` as shipped.
- "OOTB verify" subtasks confirm platform behavior + add an ATF guard rather than building new metadata.

---

## EPIC-37 / EPIC-13 / EPIC-03 — Roles & RBAC foundation (owning task P1-01, P1-04)

### US-13a-06 Create Role · US-37a-06 Built-in roles · US-03b-01 Create role  — **Build**
- [~] T-37a06-1 Create six `Role()` records in `src/fluent/roles.now.ts`: `cms_admin`, `cms_editor`, `cms_moderator`, `cms_author`, `cms_contributor`, `cms_reader` (done).
- [~] T-37a06-2 Set `cms_admin.containsRoles = [cms_editor, cms_moderator, cms_author, cms_contributor, cms_reader]` (role contains / `sys_user_role_contains`); set `scopedAdmin: true` (done).
- [ ] T-37a06-3 `build` then `install`; verify six `sys_user_role` rows + contains edges on the instance.
- [ ] T-37a06-4 ATF `Test()`: assert each role exists; assert a user granted `cms_admin` resolves (contains) the other five roles. Tags `@US-37a-06`.

### US-37b-01 Author role · US-37b-02 Contributor role — **Build** (realized via role + Phase 2 ACLs)
- [ ] T-37b01-1 Confirm `cms_author` / `cms_contributor` descriptions encode intent (author = create+edit; contributor = draft-only).
- [ ] T-37b01-2 Record the permission intent in the Phase 2 ACL matrix row (content_item create/write both; publish neither). Cross-ref `specs/design/phase-2-content-data-model.md §3`.
- [ ] T-37b01-3 ATF (deferred to Phase 2): author can create/edit, contributor cannot publish. Tags `@US-37b-01 @US-37b-02` (placeholder until content_item exists).

### US-37b-04 Authenticated base role — **Configure**
- [ ] T-37b04-1 Map "Authenticated" to `cms_reader`; document that all logged-in CMS users receive `cms_reader` (via user provisioning / default role grant).
- [ ] T-37b04-2 ATF: an authenticated user without elevated roles has read-only content access + own-profile edit. Tag `@US-37b-04`.

### US-37c-03 ViewRoles implied by ManageRoles — **Build**
- [ ] T-37c03-1 Model as role contains: `cms_admin` (ManageRoles) aggregates role-viewing capability; document in design §3.
- [ ] T-37c03-2 ATF: holder of admin can view roles. Tag `@US-37c-03`.

### US-37a-04 RBAC framework — **Build** (spans to Phase 2 ACLs)
- [ ] T-37a04-1 Establish the ACL strategy doc row: operations (read/create/write/delete) × roles on content tables. (Realized P2-09.)
- [ ] T-37a04-2 Placeholder ATF for role-gated access. Tag `@US-37a-04`.

### US-37a-05 Role lifecycle · US-03a-03 Block system-role delete · US-03c-02 Delete role · US-13a-10 Delete role · US-44a-04 Admin-role immutability · US-44a-05 System-role delete block — **Build** (owning task P1-04)
- [ ] T-44a05-1 `BusinessRule()` on `sys_user_role` (before delete): abort if the role is a CMS system role (`cms_*`), with message `System roles cannot be deleted.` Tags `@US-44a-05 @US-03a-03`.
- [ ] T-44a04-1 `BusinessRule()` / `Acl()` preventing modification of `cms_admin` granted permissions through app surfaces; surface admin-role-immutable notice. Tag `@US-44a-04`.
- [ ] T-44a04-2 Allow delete of non-system CMS roles (US-03c-02/13a-10) — verify guard does not over-block.
- [ ] T-44a05-2 ATF: delete of `cms_admin`/system role blocked with exact message; delete of a custom role succeeds. Tags `@US-44a-05 @US-03c-02`.

---

## EPIC-18 / EPIC-40 / EPIC-03 — Security settings (owning task P1-02)

### US-18a-01 Retrieve settings · US-18a-02 Update settings · US-03c-03 Manage security settings · US-40a-02 Retrieve · US-40a-03 Update — **Build (property store)**
- [ ] T-18a-1 Create `Property()` records (`sys_properties`) for CMS-specific settings per design §5: `x_1863391_now_app.cms.admin_role_name`, `cms.registration.self_service`, `cms.registration.require_email_verification`, `cms.registration.require_admin_approval`, `cms.registration.disable_external`, `cms.background.polling_time`, `cms.background.minimum_idle_time` (types + defaults).
- [ ] T-18a-2 For settings with an OOTB home (local-login disable, 2FA, CSP/Referrer/Permissions headers), record the OOTB target in the as-built doc instead of creating duplicate properties.
- [ ] T-18a-3 `Acl()` gating property read/write to `cms_admin` (ManageSecuritySettings).
- [ ] T-18a-4 Note: GET/PUT `/v1/security-settings` endpoints are built in Phase 4 (P4-05); Phase 1 delivers the store only. Cross-ref.
- [ ] T-18a-5 ATF: properties exist with correct defaults; non-admin cannot write. Tags `@US-18a-01 @US-18a-02 @US-40a-02 @US-40a-03`.

---

## EPIC-02 / EPIC-19 — Last-admin & user-service guards (owning task P1-03)

### US-02d-02 Disable user (guard) · US-19a-04 UserService error/guard conditions — **Build**
- [ ] T-02d02-1 `BusinessRule()` on `sys_user` (before update): when `active` true→false and the user holds `cms_admin`, count other active users with `cms_admin`; if 0, abort with `Cannot disable this user This is the last remaining enabled administrator account. At least one enabled administrator is required.` Tag `@US-02d-02 @REQ-02d-013`.
- [ ] T-02d02-2 `BusinessRule()` on `sys_user_has_role` (before delete): block removing `cms_admin` from the last active admin (same guard).
- [ ] T-02d02-3 Extract shared count logic into a scoped `Script Include` (`CmsAdminGuard`) reused by both rules.
- [ ] T-02d02-4 ATF: disabling sole admin blocked with exact message; disabling a non-last admin succeeds; removing admin role from last admin blocked. Tags `@US-02d-02 @US-19a-04`.

---

## EPIC-34 — Seed data (owning task P1-05)

### US-34a-03 Apply foundation seed data — **Build**
- [ ] T-34a03-1 `Record()` seed granting `cms_admin` to the bootstrap admin `sys_user` (`$meta.installMethod: 'first install'`).
- [ ] T-34a03-2 ATF: fresh install has ≥1 active user holding `cms_admin`. Tag `@US-34a-03`.

---

## EPIC-02 / EPIC-37 / EPIC-19 — Authentication & login policy (owning task P1-08, **Configure OOTB**)

### US-02a-01 Sign in · US-37a-01 Local login · US-19a-02 Authenticate — **Configure**
- [ ] T-02a01-1 OOTB verify: local login active; username/email resolution order (username first, email fallback).
- [ ] T-02a01-2 ATF: valid credentials authenticate; username precedence over email. Tags `@US-02a-01 @US-37a-01`.

### US-02a-02 Login validation messages — **Configure**
- [ ] T-02a02-1 OOTB verify / configure login error messages to match spec strings (missing username/password, invalid credentials).
- [ ] T-02a02-2 ATF: each error message rendered. Tag `@US-02a-02`.

### US-02a-03 Local login disabled — **Configure** (wired to property)
- [ ] T-02a03-1 Wire `cms`/OOTB disable-local-login so sign-in is refused with `Local login is disabled.`
- [ ] T-02a03-2 ATF. Tag `@US-02a-03`.

### US-02a-04 Deny disabled/locked/2FA · US-37a-03 2FA + local login policy — **Configure**
- [ ] T-02a04-1 Configure lockout policy: lock after 3 failed attempts within 15 min (REQ-02a-014); message `Too many attempts. Try again in 15 minutes.`
- [ ] T-02a04-2 Configure MFA/2FA policy (global or role-scoped per security settings).
- [ ] T-02a04-3 ATF: disabled, locked-out, and 2FA-required accounts denied with correct messages. Tags `@US-02a-04 @US-37a-03`.

### US-44a-01 Timing-attack normalization — **Covered-by OOTB**
- [ ] T-44a01-1 OOTB verify: login does not leak user existence (uniform response). Document in as-built. ATF where feasible. Tag `@US-44a-01`.

---

## EPIC-02 / EPIC-21 — Registration, verification & reset (owning task P1-09, **Configure**)

### US-02b-01 Sign up · US-02b-03 Registration validation · US-02b-04 Block when disabled — **Configure**
- [ ] T-02b01-1 Configure OOTB self-registration, toggled by `cms.registration.self_service`.
- [ ] T-02b03-1 Configure field validation + duplicate rejection (username/email) with spec messages.
- [ ] T-02b04-1 When disabled, return `Self-service registration is not enabled.` (HTTP 403).
- [ ] T-02b01-2 ATF: register success → login; duplicates/invalid rejected; disabled path blocks. Tags `@US-02b-01 @US-02b-03 @US-02b-04`.

### US-02b-02 Email verification — **Configure**
- [ ] T-02b02-1 Configure email-verification requirement (toggle `cms.registration.require_email_verification`).
- [ ] T-02b02-2 Configure verification `Notification` (depends on provider, EPIC-21).
- [ ] T-02b02-3 ATF: unverified user blocked from login; verification notice shown. Tag `@US-02b-02`.

### US-02d-05 Password reset email · US-21a-01/02/03 Email provider — **Configure**
- [ ] T-21a03-1 Configure email provider / `sys_email_account` (maps ACS email).
- [ ] T-21a-2 Configure `Notification` records: email verification, password reset, welcome.
- [ ] T-02d05-1 ATF/manual: password-reset email dispatched. Tags `@US-02d-05 @US-21a-01 @US-21a-02 @US-21a-03`.

---

## EPIC-20 / EPIC-37 / EPIC-07 — External SSO (owning task P1-10, **Configure**)

### US-20a-01 Initiate OAuth/OIDC · US-20a-02 Callback · US-37a-02 External auth — **Configure**
- [ ] T-20a01-1 Configure Multi-Provider SSO (OIDC/SAML) identity providers (Google, Microsoft/Entra, others per security settings).
- [ ] T-20a01-2 Map external identities to `sys_user`; default role grant (`cms_reader`).
- [ ] T-20a01-3 Verify (often manual) consent redirect + callback sign-in. Tags `@US-20a-01 @US-20a-02 @US-37a-02`.

### US-20a-03 Client-secret requirement · US-44a-03 Rate limiting · US-07b-03 Auto-enable rule — **Configure**
- [ ] T-20a03-1 Enforce confidential-client secret requirement in provider config.
- [ ] T-44a03-1 Configure external-auth rate limiting (OOTB protections).
- [ ] T-07b03-1 Ensure enabling an external provider auto-enables its dependency (feature rule, cross-ref EPIC-07).
- [ ] T-20a03-2 ATF/manual verify. Tags `@US-20a-03 @US-44a-03 @US-07b-03`.

---

## EPIC-02 / EPIC-13 — User profile & admin CRUD (owning task P1-11, **Configure / Covered-by OOTB**)

### US-02c-01..04, US-02d-01/03/04, US-02e-01/02 — **Configure** (admin UI lands in Phase 5 P5-02)
- [ ] T-02c-1 Grant CMS admins the ability to manage `sys_user` (role/ACL alignment, e.g. `user_admin` or scoped equivalent).
- [ ] T-02c-2 OOTB verify user list/search/get; create user; update; enable; delete; own-profile view/update.
- [ ] T-02c-3 Note: slide-in create form + list UI delivered in Phase 5 (SCR-users-admin).
- [ ] T-02c-4 ATF: admin CRUD happy-path + 401/403/404 behaviors. Tags `@US-02c-01..04 @US-02d-01 @US-02d-03 @US-02d-04 @US-02e-01 @US-02e-02`.

### US-13a-01..05, US-13a-07, US-13a-11 — **Covered-by OOTB** (sys_user / sys_user_has_role)
- [ ] T-13a-1 OOTB verify create/list/update/disable/enable/delete user; list roles with claims; last-login timestamp (`sys_user.last_login_time`).
- [ ] T-13a-2 Record justification in as-built (no custom build). ATF guards where valuable. Tags `@US-13a-01..05 @US-13a-07 @US-13a-11`.

---

## Phase 1 exit (owning tasks P1-06, P1-07)
- [ ] T-P1-exit-1 Assemble a Phase 1 `TestSuite()` aggregating all `@US-*` ATF tests above; green on clean install.
- [ ] T-P1-exit-2 Flip `specs/design/phase-1-identity-access.md` to **as-built** (role names, property keys, business-rule + ACL sys_ids, OOTB justifications).
