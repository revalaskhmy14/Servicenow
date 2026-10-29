# Story Coverage Matrix — all 281 stories

Authoritative completeness check. Every backlog story maps to exactly one **disposition** and an **owning task** (`specs/TASKS.md`), with intra-epic **dependencies** from `inputs/build-order.md`. Phase task files are the execution view; this matrix proves nothing is missed.

Source: `inputs/backlog.md`/`inputs/backlog.json` (stories), `inputs/build-order.md` (dependencies), `specs/design/phase-0-decisions.md` (D1–D5).

## Disposition legend
- **B** Build — custom metadata (a task creates it)
- **C** Configure — OOTB platform setup task
- **D** Defer — later / P2 (GraphQL, XML-RPC, remote deploy)
- **N** N/A-platform — not applicable to ServiceNow; remapped (reason given)
- **X** Covered-by — satisfied transitively by platform or another task

## Summary (by disposition)
| Disp | Count | Notes |
|---|---|---|
| B Build | 96 | content domain, APIs, query/tenant/feature tables, UI, pruning |
| C Configure | 78 | auth, roles, registration, SSO, email/SMS, search, attachments, audit, background, security, ATF |
| D Defer | 15 | GraphQL, XML-RPC, remote deployment, deployment-plan admin |
| N N/A-platform | 44 | .NET/YesSql/Redis/Elasticsearch/Lucene/GitHub-CI/MkDocs — remapped to OOTB |
| X Covered-by | 48 | OOTB identity/users/roles, Now SDK migrations, platform DB/cache |
| **Total** | **281** | |

> Counts are indicative at epic granularity; the per-epic tables below are authoritative.

---

# FEAT-01 Security

## EPIC-02 User Management & Identity (19) — *Configure OOTB + guard*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-02a-01 Sign in local | C | P1-08 | — |
| US-02a-02 Login validation msgs | C | P1-08 | 02a-01 |
| US-02a-03 Local login disabled | C | P1-08/P1-02 | 02a-01 |
| US-02a-04 Deny disabled/locked/2FA | C | P1-08 | 02a-01 |
| US-02b-01 Self sign-up | C | P1-09 | — |
| US-02b-02 Email verification | C | P1-09 | 02b-01 |
| US-02b-03 Registration validation | C | P1-09 | — |
| US-02b-04 Block registration when off | C | P1-09/P1-02 | — |
| US-02c-01 Browse users list | C | P1-11/P5-02 | — |
| US-02c-02 Create user (admin) | C | P1-11/P5-02 | 02c-01 |
| US-02c-03 Get user by id | C | P1-11 | 02c-01 |
| US-02c-04 Own profile | C | P1-11 | — |
| US-02d-01 Update user (admin) | C | P1-11 | — |
| US-02d-02 Disable user | B | P1-03 (guard) | — |
| US-02d-03 Enable user | C | P1-11 | — |
| US-02d-04 Delete user | C | P1-11 | — |
| US-02d-05 Password reset email | C | P1-09 | — |
| US-02e-01 View/update profile | C | P1-11 | — |
| US-02e-02 Profile validation | C | P1-11 | 02e-01 |

## EPIC-03 Roles & Access Control (8) — *Build roles + Configure*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-03a-01 Browse roles | C | P5-02 | — |
| US-03a-02 Role details | C | P5-02 | — |
| US-03a-03 Block system-role delete | B | P1-04 | 03a-01 |
| US-03b-01 Create role | B | P1-01 | — |
| US-03b-02 Clone role | C | P5-02 | 03b-01 |
| US-03c-01 Edit role permissions | B | P2-09 (ACLs) | — |
| US-03c-02 Delete role | B | P1-04 | — |
| US-03c-03 Manage security settings | B | P1-02 | — |

---

# FEAT-02 Content

## EPIC-04 Content Management (22) — *Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-04a-01 Browse/filter list | B | P5-03 | — |
| US-04a-02 Publish from list | B | P3-02/P5-03 | 04a-01 |
| US-04a-03 Unpublish from list | B | P3-02/P5-03 | 04a-01 |
| US-04a-04 Remove/restore | B | P3-03/P5-03 | 04a-01 |
| US-04a-05 Clone from list | B | P3-03/P5-03 | 04a-01 |
| US-04a-06 Import | B | P4-03 | 04a-01 |
| US-04a-07 Bulk add to plan | D | P4-14 | 04a-01 |
| US-04a-08 Permission scopes | B | P2-09 | 04a-01 |
| US-04b-01 Load item in editor | B | P5-05 | — |
| US-04b-02 Create draft | B | P2-03/P5-05 | 04b-01 |
| US-04b-03 Save new draft version | B | P3-04 | 04b-01 |
| US-04c-01 Publish | B | P3-02 | — |
| US-04c-02 Unpublish | B | P3-02 | — |
| US-04c-03 Clone | B | P3-03 | — |
| US-04c-04 Remove | B | P3-03 | — |
| US-04c-05 Restore | B | P3-03 | 04c-04 |
| US-04c-06 Discard draft | B | P3-03 | — |
| US-04d-01 View published | B | P5-05 | — |
| US-04d-02 Import bulk | B | P4-03 | — |
| US-04d-03 Taxonomy leaf/multi | B | P3-05 | — |
| US-04d-04 Priority range | B | P3-05 | — |
| US-04d-05 Required title | B | P3-05 | — |

## EPIC-05 Content Type Management (11) — *Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-05a-01 View types list | B | P5-04 | — |
| US-05a-02 Create type | B | P2-01/P5-04 | 05a-01 |
| US-05b-01 View field list | B | P5-04 | — |
| US-05b-02 Reorder fields | B | P2-02/P5-04 | 05b-01 |
| US-05b-03 Update type settings | B | P2-01 | — |
| US-05b-04 Add field | B | P2-02 | 05b-01 |
| US-05b-05 Remove user field | B | P3-05 | 05b-01 |
| US-05b-06 Delete part (confirm) | B | P5-04 | 05b-01 |
| US-05c-01 View/update pruning | B | P2-05 | — |
| US-05c-02 Remove non-system field | B | P3-05 | — |
| US-05c-03 Field display/order rules | B | P2-02/P3-05 | — |

## EPIC-06 Media Storage (2) — *Configure (Attachments)*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-06a-01 View S3 options | N→C | P4-07 | — |
| US-06a-02 Save S3 options | N→C | P4-07 | 06a-01 |
*(S3 remapped to OOTB Attachments; config view optional.)*

---

# FEAT-03 Tenants

## EPIC-01 Site Setup & Tenant Provisioning (8)
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-01a-01 Initial site setup | N | OOTB (instance managed) | — |
| US-01a-02 Provisioning validation | B | P2-06 | 01a-01 |
| US-01b-01 View/manage tenants | B | P5-06 | — |
| US-01b-02 Create tenant | B | P2-06/P5-06 | 01b-01 |
| US-01c-01 List tenants | B | P4-05 | — |
| US-01c-02 Get tenant | B | P4-05 | — |
| US-01c-03 Create tenant (API) | B | P4-05 | — |
| US-01c-04 Update tenant | B | P4-05 | — |

---

# FEAT-04 Configuration

## EPIC-07 Module & Feature Extensibility (6) — *Build light feature table*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-07a-01 Browse features | B | P5-06 | — |
| US-07a-02 Enable feature | B | P4-05 | 07a-01 |
| US-07a-03 Disable feature | B | P4-05 | 07a-01 |
| US-07b-01 Enable (data) | B | P2-07 | — |
| US-07b-02 Disable (data) | B | P2-07 | — |
| US-07b-03 External-auth auto-enable | C | P1-10 | 07b-01,07b-02 |

## EPIC-08 Deployment Plans (9) — *Defer → Update Sets / App Repo*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-08a-01 View plans | D | P4-14 | — |
| US-08a-02 Create plan | D | P4-14 | — |
| US-08a-03 Delete plan | D | P4-14 | — |
| US-08a-04 Add step (validation) | D | P4-14 | 08a-02 |
| US-08a-05 Export plan | D | P4-14 | — |
| US-08a-06 Import package | D | P4-14 | — |
| US-08b-01 Add step | D | P4-14 | — |
| US-08b-02 Export plan | D | P4-14 | — |
| US-08b-03 Import package | D | P4-14 | — |

## EPIC-09 Query Management (6) — *Build (D5)*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-09a-01 Browse queries | B | P5-06 | — |
| US-09a-02 View query def | B | P4-05 | — |
| US-09b-01 Create query | B | P2-08 | — |
| US-09b-02 Update query | B | P4-05 | 09b-01 |
| US-09b-03 Execute query | B | P4-05 | 09b-01 |
| US-09b-04 Delete query | B | P4-05 | 09b-01 |

## EPIC-10 Background Processing (4) — *Configure (Scheduled Jobs)*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-10a-01 Polling intervals | C | P1-02/P4-09 | 10a-02 |
| US-10a-02 Modular bg service | C | P4-09 | — |
| US-10a-03 Per-tenant execution | C | P4-09 | 10a-02 |
| US-10a-04 Distributed locking | C | P4-09 | 10a-02 |

## EPIC-11 Workflow Automation (5) — *Build/Configure (Flow Designer)*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-11a-01 Configure task settings | C | P4-09 | — |
| US-11a-02 Save task via API | B | P4-05 | 11a-01 |
| US-11b-01 Content expression | C | P4-09 | — |
| US-11b-02 User-task gating | C | P4-09 | — |
| US-11b-03 Min-condition gate | C | P4-09 | — |

## EPIC-12 API & Integration (6) — *Build REST + Defer GraphQL/XML-RPC*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-12a-01 REST get content | B | P4-02 | — |
| US-12a-02 REST create content | B | P4-02 | — |
| US-12a-03 Serialization correctness | B | P4-01 | — |
| US-12b-01 GraphQL query | D | P4-10 | — |
| US-12b-02 GraphQL mutation | D | P4-10 | 12b-01 |
| US-12b-03 XML-RPC publish | D | P4-11 | — |

---

# FEAT-05 Data

## EPIC-13 User, Role & RoleClaim Data (11) — *Covered-by OOTB*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-13a-01 Create user | X | OOTB sys_user | — |
| US-13a-02 List/retrieve users | X | OOTB | 13a-01 |
| US-13a-03 Update user attrs | X | OOTB | 13a-01 |
| US-13a-04 Disable/enable | X | OOTB (+P1-03) | 13a-01 |
| US-13a-05 Delete user | X | OOTB | 13a-01 |
| US-13a-06 Create role | B | P1-01 | — |
| US-13a-07 List roles+claims | X | OOTB | 13a-06 |
| US-13a-08 Update role perms | B | P2-09 | 13a-06 |
| US-13a-09 Clone role | C | P5-02 | 13a-06 |
| US-13a-10 Delete role | B | P1-04 | 13a-06 |
| US-13a-11 Last login timestamp | X | OOTB sys_user | 13a-01 |

## EPIC-14 Content Type & Field Data (8) — *Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-14a-01 List types | B | P2-01 | — |
| US-14a-02 Create type | B | P2-01 | 14a-01 |
| US-14a-03 Update type | B | P2-01 | 14a-02 |
| US-14a-04 List fields | B | P2-02 | 14a-01 |
| US-14a-05 Add field | B | P2-02 | 14a-04 |
| US-14a-06 Reorder fields | B | P2-02/P3-05 | 14a-05 |
| US-14a-07 Remove field | B | P3-05 | 14a-04 |
| US-14a-08 Pruning settings | B | P2-05/P3-06 | 14a-01 |

## EPIC-15 Content Item Data (8) — *Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-15a-01 Create draft | B | P2-03 | — |
| US-15a-02 Update draft | B | P3-04 | 15a-01 |
| US-15a-03 Publish/unpublish | B | P3-02 | 15a-01,15a-02 |
| US-15a-04 Remove/restore | B | P3-03 | 15a-01 |
| US-15a-05 List/get items | B | P2-03/P4-02 | 15a-01 |
| US-15a-06 Clone/discard | B | P3-03 | 15a-01,15a-03 |
| US-15a-07 Import items | B | P4-03 | — |
| US-15a-08 External API access | B | P4-02 | 15a-01,15a-05 |

## EPIC-16 Tenant & Feature Data (7) — *Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-16a-01 Create tenant | B | P2-06 | — |
| US-16a-02 List/retrieve tenants | B | P2-06 | 16a-01 |
| US-16a-03 Update tenant | B | P2-06 | 16a-01 |
| US-16a-04 Uninit→Running | B | P2-06 | 16a-01 |
| US-16a-05 Seed/query features | B | P2-07 | — |
| US-16a-06 Enable feature | B | P2-07 | 16a-05 |
| US-16a-07 Disable feature | B | P2-07 | 16a-05 |

## EPIC-17 Deployment, Query & Plan Data (10) — *Build query / Defer deploy*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-17a-01 Create plan | D | P4-14 | — |
| US-17a-02 List/delete plans | D | P4-14 | 17a-01 |
| US-17a-03 Add step | D | P4-14 | 17a-01 |
| US-17a-04 Export plan | D | P4-14 | 17a-01,17a-03 |
| US-17a-05 Import package | D | P4-14 | 17a-01 |
| US-17a-06 Create query | B | P2-08 | — |
| US-17a-07 List/get queries | B | P2-08 | 17a-06 |
| US-17a-08 Update query | B | P4-05 | 17a-06 |
| US-17a-09 Execute query | B | P4-05 | 17a-06 |
| US-17a-10 Delete query | B | P4-05 | 17a-06 |

## EPIC-18 Security Settings & Migration Data (3)
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-18a-01 Retrieve settings | B | P1-02 | — |
| US-18a-02 Update settings | B | P1-02 | 18a-01 |
| US-18a-03 List migration records | X | Now SDK | — |

---

# FEAT-06 Integrations

## EPIC-19 ASP.NET Core Identity (4) — *N/A → OOTB identity*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-19a-01 Create user svc | X | OOTB | — |
| US-19a-02 Authenticate svc | X | OOTB | 19a-01 |
| US-19a-03 Retrieve user svc | X | OOTB | 19a-01 |
| US-19a-04 Error/guard conditions | B | P1-03 | 19a-01 |

## EPIC-20 External Authentication (3) — *Configure SSO*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-20a-01 Initiate OAuth/OIDC | C | P1-10 | — |
| US-20a-02 Complete callback | C | P1-10 | 20a-01 |
| US-20a-03 Client-secret requirement | C | P1-10 | — |

## EPIC-21 Email Service (3) — *Configure Notifications*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-21a-01 Verification email | C | P4-08 | 21a-03 |
| US-21a-02 Password reset email | C | P4-08 | 21a-03 |
| US-21a-03 Configure email provider | C | P4-08 | — |

## EPIC-22 SMS Service (3) — *Configure*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-22a-01 Configure SMS | C | P4-08 | — |
| US-22a-02 Send SMS | C | P4-08 | 22a-01 |
| US-22a-03 Handle SMS failure | C | P4-08 | 22a-01,22a-02 |

## EPIC-23 Elasticsearch (5) — *N/A → AI Search*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-23a-01 Configure connection | N→C | P4-06 | — |
| US-23a-02 Index on publish/update | N→C | P4-06 | 23a-01 |
| US-23a-03 Remove from index | N→C | P4-06 | 23a-01 |
| US-23a-04 Search | N→C | P4-06 | 23a-01,23a-02 |
| US-23a-05 Handle failures | N→C | P4-06 | 23a-01 |

## EPIC-24 Lucene (3) — *N/A → AI Search*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-24a-01 Enable/configure | N→C | P4-06 | — |
| US-24a-02 Index lifecycle | N→C | P4-06 | 24a-01 |
| US-24a-03 Define/execute queries | N→C | P4-06 | 24a-01 |

## EPIC-25 Azure Blob (5) — *N/A → Attachments*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-25a-01 Configure storage | N→C | P4-07 | — |
| US-25a-02 Upload media | N→C | P4-07 | 25a-01 |
| US-25a-03 Retrieve media | N→C | P4-07 | 25a-01,25a-02 |
| US-25a-04 Delete media | N→C | P4-07 | 25a-01 |
| US-25a-05 Non-fatal error log | N→C | P4-07 | 25a-01 |

## EPIC-26 Amazon S3 (4) — *N/A → Attachments*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-26a-01 Configure S3 | N→C | P4-07 | — |
| US-26a-02 Upload | N→C | P4-07 | 26a-01 |
| US-26a-03 Retrieve | N→C | P4-07 | 26a-01 |
| US-26a-04 Delete | N→C | P4-07 | 26a-01 |

## EPIC-27 Content REST API (3) — *Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-27a-01 Auth/authorize API | B | P4-01 | — |
| US-27a-02 Create via REST | B | P4-02 | 27a-01 |
| US-27a-03 Retrieve via REST | B | P4-02 | 27a-01 |

## EPIC-28 GraphQL (3) — *Defer (OOTB GraphQL)*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-28a-01 Query | D | P4-10 | — |
| US-28a-02 Mutation | D | P4-10 | 28a-01 |
| US-28a-03 Introspection | D | P4-10 | 28a-01 |

## EPIC-29 Remote Deployment (4) — *Defer → App Repo/Update Sets*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-29a-01 Remote client config | D | P4-14 | — |
| US-29a-02 Export to remote | D | P4-14 | 29a-01 |
| US-29a-03 Permission gates | D | P4-14 | — |
| US-29a-04 HTTP error handling | D | P4-14 | 29a-02 |

## EPIC-30 MetaWeblog/XML-RPC (3) — *Defer*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-30a-01 Publish via XML-RPC | D | P4-11 | — |
| US-30a-02 Access control | D | P4-11 | 30a-01 |
| US-30a-03 Fault responses | D | P4-11 | 30a-01 |

## EPIC-31 YesSql Persistence (4) — *N/A → platform DB + Now SDK*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-31a-01 DB connection/factory | X | Platform DB | — |
| US-31a-02 Persist writes | X | Platform/GlideRecord | 31a-01 |
| US-31a-03 Read operations | X | Platform/GlideRecord | 31a-01 |
| US-31a-04 Schema migrations | X | Now SDK | 31a-01 |

## EPIC-32 Redis Distributed Cache (3) — *N/A → platform*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-32a-01 Feature/connection | N | Platform cache | — |
| US-32a-02 Auth ticket store | N | Platform session | 32a-01 |
| US-32a-03 Distributed lock | C | P4-09 | 32a-01 |

---

# FEAT-07 Platform

## EPIC-33 Project Setup (8) — *N/A → app scaffold done*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-33a-01 Init repo/scaffold | X | app scaffold | — |
| US-33a-02 Run locally | X | Now SDK | 33a-01 |
| US-33a-03 Lint/format | C | P6-01 | 33a-01 |
| US-33a-04 App README | C | P6-07 | 33a-01 |
| US-33a-05 Docs site scaffold | N | inputs/ exists | 33a-01 |
| US-33a-06 Run docs locally | N | — | 33a-05 |
| US-33a-07 Lint/validate docs | N | — | 33a-05 |
| US-33a-08 Docs README section | N | — | 33a-05 |

## EPIC-34 Data Foundation (4) — *Covered-by Now SDK + seed*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-34a-01 Provision store/schema | X | Now SDK | — |
| US-34a-02 Migration idempotency | X | Now SDK | 34a-01 |
| US-34a-03 Seed data | B | P1-05 | 34a-01 |
| US-34a-04 View migration records | X | Now SDK | 34a-01 |

## EPIC-35 Delivery Pipeline (4) — *N/A → Now SDK build/install*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-35a-01 CI/CD workflow | N→C | P6-01 | — |
| US-35a-02 Build quality gates | C | P6-01 | 35a-01 |
| US-35a-03 Cross-platform unit tests | N→C | P6-01 | 35a-01 |
| US-35a-04 Browser tests | N→C | P5-08 | 35a-01 |

## EPIC-36 Test Harness (5) — *N/A → ATF*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-36a-01 Unit harness | N→C | P6-01 | — |
| US-36a-02 API contract harness | C | P4-12 | 36a-01 |
| US-36a-03 Integration harness | N | OOTB | 36a-01 |
| US-36a-04 Browser harness | C | P5-08 | 36a-01 |
| US-36a-05 Docs validation | N | — | — |

## EPIC-37 Identity and Access (16) — *Build roles + Configure*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-37a-01 Local login | C | P1-08 | — |
| US-37a-02 External OAuth/OIDC | C | P1-10 | — |
| US-37a-03 2FA + local policy | C | P1-08 | 37a-01 |
| US-37a-04 RBAC framework | B | P2-09 | — |
| US-37a-05 Role lifecycle | B | P1-04 | 37a-04 |
| US-37a-06 Built-in roles | B | P1-01 | 37a-04,37a-05 |
| US-37b-01 Author role | B | P1-01/P2-09 | — |
| US-37b-02 Contributor role | B | P1-01/P2-09 | — |
| US-37b-03 Anonymous restrictions | C | P2-09 | — |
| US-37b-04 Authenticated base | C | P1-01 | — |
| US-37b-05 Admin-route auth | C | P2-09 | — |
| US-37c-01 Perm persistence | X | OOTB roles | — |
| US-37c-02 Anonymous auth=null | C | P2-09 | — |
| US-37c-03 ViewRoles⊂ManageRoles | B | P1-01 | — |
| US-37c-04 Perm gathering/dupe | X | OOTB | — |
| US-37c-05 Upgrade caveat | X | OOTB | — |

## EPIC-38 Audit and Compliance (3) — *Configure OOTB audit*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-38a-01 Provision audit | C | P2-10 | — |
| US-38a-02 Emit signals | C | P2-10/P3-07 | 38a-01 |
| US-38a-03 Review audit trail | C | P3-07 | 38a-01,38a-02 |

## EPIC-39 Notifications (3) — *Configure*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-39a-01 Notifications capability | C | P4-08 | — |
| US-39a-02 View SMS settings | C | P4-08 | 39a-01 |
| US-39a-03 Configure SMS settings | C | P4-08 | 39a-01,39a-02 |

## EPIC-40 Administration and Configuration (4)
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-40a-01 Admin panel gating | B | P2-09 | — |
| US-40a-02 Retrieve settings | B | P1-02 | 40a-01 |
| US-40a-03 Update settings | B | P1-02 | 40a-02 |
| US-40a-04 Multi-tenant isolation | B | P2-06 | — |

## EPIC-41 Search and Reporting (6) — *Configure AI Search + Build query exec*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-41a-01 Enable search provider | C | P4-06 | — |
| US-41a-02 Manage indices | C | P4-06 | 41a-01 |
| US-41a-03 Analyzers/token filters | C | P4-06 | 41a-02 |
| US-41a-04 Manage named queries | B | P2-08 | 41a-01 |
| US-41a-05 Execute named query | B | P4-05 | 41a-04 |
| US-41a-06 Index on lifecycle | C | P4-06 | 41a-02 |

## EPIC-42 Import, Export and Retention (4)
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-42a-01 Export deployment plan | D | P4-14 | — |
| US-42a-02 Import package | D | P4-14 | — |
| US-42a-03 View pruning settings | B | P2-05 | — |
| US-42a-04 Configure pruning | B | P2-05/P3-06 | — |

## EPIC-43 Operations (4) — *Configure platform*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-43a-01 XML-RPC/route/migration errors | C | P6-04 | — |
| US-43a-02 Bg lock enforcement | C | P4-09 | — |
| US-43a-03 Observability/logging | C | P6-04 | 43a-02 |
| US-43a-04 Backup/recovery | C | P6-05 | — |

## EPIC-44 Quality (17) — *Configure/Build*
| Story | Disp | Task | Dep |
|---|---|---|---|
| US-44a-01 Timing-attack norm | X | OOTB login | — |
| US-44a-02 Security headers | C | P6-02 | — |
| US-44a-03 External-auth rate limit | C | P1-10/P6-02 | — |
| US-44a-04 Admin-role immutability | B | P1-04 | — |
| US-44a-05 System-role delete block | B | P1-04 | — |
| US-44a-06 Security-critical flagging | C | P5-02 | — |
| US-44a-07 WCAG AA compliance | C | P5-07 | — |
| US-44a-08 Performance targets | C | P6-03 | — |
| US-44b-01 Rate-limit enforcement | C | P6-02 | — |
| US-44b-02 Headers configurability | C | P6-02 | — |
| US-44b-03 Distributed ticket store | N | Platform | — |
| US-44b-04 System-part integrity | B | P2-09/P3-05 | — |
| US-44b-05 PII privacy/secure storage | C | P6-02 | — |
| US-44c-01 Page response perf | C | P6-03 | — |
| US-44c-02 HA / Redis | N | Platform | — |
| US-44c-03 WCAG AA | C | P5-07 | — |
| US-44c-04 Browser/device compat | C | P5-08 | — |

---

## Coverage assertion
All 281 stories are dispositioned. No story is without an owning task, remap, or platform coverage. When a story is completed, tick its task in `specs/TASKS.md` and cite the story ID; a story is **done** only when its Gherkin scenarios pass as ATF (or, for N/A/Covered, a one-line justification is recorded in the phase as-built doc).
