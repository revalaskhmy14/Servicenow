# Phase 1 Design — Identity & Access

Status: **design (pre-build)** · Flip to **as-built** after Phase 1 ships.
Covers: EPIC-37, EPIC-03, EPIC-13 (role/user data), EPIC-02 (access rules), EPIC-18/40 (security settings).
Read with `CLAUDE.md` and `specs/PLAN.md`.

---

## 1. Objective

Realize the spec's identity, role, and permission model on ServiceNow **by configuring OOTB** (`sys_user`, roles, ACLs, auth, properties) and building only the small custom guards the platform does not provide. No custom User, Role, or RoleClaim tables (ENT-01/02/03 map to platform metadata).

---

## 2. OOTB vs custom for this phase

| Spec capability | Refs | Decision |
|---|---|---|
| User accounts, profile, registration, login, SSO/OIDC, 2FA, lockout, password reset, timing-normalization | ENT-01, EPIC-02/19/37, INT-01/02, NFR-03/04 | **OOTB** — configure; do not build |
| Roles & permission enforcement | ENT-02/03, EPIC-03/37 | **OOTB** roles + **ACLs** |
| Security settings store | ENT-12, EPIC-18/40 | **OOTB** `sys_properties` (+ note OOTB auth config) |
| Last-enabled-admin guard | BR-01, US-02d-02 | **Custom** business rule |
| System-role delete protection / admin-role immutability | US-44a-04/05, US-37a-05 | **Custom** business rule |
| `ViewRoles` implied by `ManageRoles` | US-37c-03 | **Custom** via role *contains* |

---

## 3. Role model (persona → ServiceNow role)

Spec personas PER-01…PER-06 and built-in roles (Administrator, Editor, Moderator, Author, Contributor, Anonymous, Authenticated) map to scoped roles:

| ServiceNow role | Persona | Built-in role | Notes |
|---|---|---|---|
| `x_1863391_now_app.cms_admin` | PER-01 | Administrator (system, admin) | Superset; **contains** all roles below |
| `x_1863391_now_app.cms_editor` | PER-02 | Editor | Edit + publish content |
| `x_1863391_now_app.cms_moderator` | PER-03 | Moderator | Edit + remove/restore content |
| `x_1863391_now_app.cms_author` | PER-04 | Author | Create + edit content |
| `x_1863391_now_app.cms_contributor` | PER-05 | Contributor | Draft-only (create/edit, no publish) |
| `x_1863391_now_app.cms_reader` | PER-06 (authenticated) | Authenticated | View content; edit own profile |
| *(unauthenticated)* | PER-06 (visitor) | Anonymous | No role; public ACLs only |

**Contains hierarchy:** `cms_admin` contains `cms_editor`, `cms_moderator`, `cms_author`, `cms_contributor`, `cms_reader`. The middle roles are **siblings** (Editor has publish but not delete; Moderator has delete but not publish), so they are not a single linear chain — only admin aggregates all. `ViewRoles ⊂ ManageRoles` (US-37c-03) is modeled by admin containing the viewer capability.

---

## 4. Permission → role → ACL matrix

Spec permissions (from SCR-role-edit and `inputs/api.md` role gates ROL-01…07) become **ACLs** on the content tables created in **Phase 2**. This matrix is the contract Phase 2 implements; only the role records and guards land physically in Phase 1.

| Spec permission | API role gate | Granted to | ServiceNow realization (Phase 2) |
|---|---|---|---|
| ViewContent | ROL-01,02,03,04,05 | reader+ | `content_item` **read** ACL |
| EditContent | ROL-01,02,04,05 | author, contributor, editor | `content_item` **create/write** ACL |
| PublishContent | ROL-01,02 | editor (+admin) | publish operation gated to `cms_editor` |
| DeleteContent | ROL-01,03 | moderator (+admin) | `content_item` **delete**/remove gated to `cms_moderator` |
| EditContentTypes | ROL-01 | admin | `content_type` / `content_field` write ACL |
| ManageUsers / EditUsers / DeleteUsers | ROL-01 | admin | OOTB user admin (no broad re-ACL of `sys_user`) |
| ManageRoles / ViewRoles | ROL-01 | admin | OOTB role admin |
| ManageTenants, ManageFeatures, ManageQueries, ExecuteQueries, ManageDeploymentPlan, Export, Import | ROL-01 | admin | ACLs on respective Phase 2/4 tables |
| ManageSecuritySettings | ROL-01 | admin | property write gate |
| EditOwnProfile | ROL-07 | reader+ | OOTB self profile |
| AccessContentApi / ApiViewContent | ROL-01..05 | integration (PER-07) | API ACL + integration role (Phase 4) |

> Phase 1 produces this matrix as the authoritative design input; Phase 2 attaches the ACLs when the content tables exist.

---

## 5. Security settings (ENT-12) → system properties

Scoped properties `x_1863391_now_app.cms.*`. Settings with a true OOTB home are configured there instead of duplicated.

| ENT-12 field | Target | Type / default |
|---|---|---|
| adminRoleName | property `cms.admin_role_name` | string, `Administrator` |
| enableSelfServiceRegistration | property `cms.registration.self_service` | bool, false |
| requireEmailVerification | property `cms.registration.require_email_verification` | bool, false |
| requireAdministratorApproval | property `cms.registration.require_admin_approval` | bool, false |
| disableLocalLogin | **OOTB** auth config (note in doc) | — |
| requireTwoFactorAuthentication | **OOTB** MFA policy (note in doc) | — |
| disableNewExternalRegistrations | property `cms.registration.disable_external` | bool, false |
| contentSecurityPolicy / permissionsPolicy / referrerPolicy | **OOTB** platform security headers | — |
| backgroundServicePollingTime / MinimumIdleTime | properties (consumed by Phase 3 scheduled jobs) | string, `00:01:00` / `00:00:10` |

> Use the `update-system-property` workflow for any property that already exists OOTB; create new app-scoped `Property()` records for the CMS-specific ones.

---

## 6. Custom guards (the only code in this phase)

### BR-01 — last-enabled-admin guard (US-02d-02, REQ-02d-013)
- **Trigger:** `before` update of `sys_user` when `active` transitions true→false; also `before` delete of a `sys_user_has_role` row removing `cms_admin`.
- **Logic:** if the affected user holds `cms_admin` and the count of *other* active users with `cms_admin` is 0 → abort with the exact message: `Cannot disable this user This is the last remaining enabled administrator account. At least one enabled administrator is required.`
- **Done when:** disabling the sole admin returns the guard message; disabling a non-last admin succeeds.

### System-role protection / admin-role immutability (US-44a-04/05, US-37a-05)
- Block deletion/mutation of the CMS system roles and prevent editing the admin role's aggregated permissions through app surfaces.
- Return the spec messages (`System roles cannot be deleted.`, admin-role-immutable notice).

---

## 7. Assumptions & dependencies

- Content ACLs depend on Phase 2 tables; Phase 1 delivers role records, properties, and guards + the ACL matrix as design.
- Default admin user: the bootstrap/install admin is granted `cms_admin` (seed/fixture).
- Does not depend on the 5 open Phase 0 decisions.

## 8. Acceptance (Gherkin → ATF)

Each task's done-ness = its story's Gherkin scenarios (see `inputs/backlog.md`), automated as ATF. Primary tags: `@US-02d-02 @REQ-02d-013`, `@US-37a-06`, `@US-37b-01/02/03/04`, `@US-13a-06`, `@US-44a-04`, `@US-44a-05`.
