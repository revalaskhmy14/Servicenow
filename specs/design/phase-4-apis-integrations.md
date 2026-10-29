# Phase 4 Design — APIs & Integrations

Status: **design (pre-build)** · depends on Phase 2 (data) + Phase 3 (lifecycle).
Covers: EPIC-12/27/28/30, EPIC-41; INT-03/04/05/06/07/08/09/10/12; background EPIC-10.

---

## 1. Objective
Expose the `inputs/api.md` contracts and wire integrations using OOTB platform services. Reuse the Phase 3 `ContentLifecycle` Script Include so API and UI share one implementation.

## 2. REST API (Scripted REST, INT-09)
Base: a scoped **Scripted REST API** exposing the `/v1/*` resources. Auth via session/Bearer; gate each resource with ACLs + an API-access role (`cms_api`, maps AccessContentApi/ApiViewContent). Return exact status codes + error codes/messages from `inputs/api.md`.

| Resource group | Endpoints | Stories |
|---|---|---|
| Content items | list/get/create/update (API-22..25) | US-04a/04b, US-15a-05 |
| Lifecycle | publish/unpublish/clone/remove/restore/discard/import (API-26..32) | US-04c, US-15a |
| Content types & fields | API-33..39 | US-05, US-14a |
| External content API | /v1/api/content (API) | US-12a, US-27a |
| Admin config | tenants/features/queries/security-settings/pruning (API-40..56) | US-01/07/09/16/17/18/40 |

## 3. Integrations (OOTB)
| Concern | OOTB mechanism | Refs |
|---|---|---|
| Search | **AI Search** index on `content_item` (replaces Lucene/Elasticsearch) | INT-05/06, EPIC-23/24/41 |
| Media | **Attachments** on `content_item` (replaces Blob/S3); resolves `featured_image` | INT-07/08, EPIC-06/25/26 |
| Email | **Notifications** (verification, password reset, welcome) | INT-03, EPIC-21 |
| SMS | Notification/connector gated by ManageSmsSettings | INT-04, EPIC-22/39 |
| Background | **Scheduled Jobs** / `sys_trigger` (polling, pruning) | EPIC-10, INT-14 |

## 4. Deferred (Phase 0 D4)
- **GraphQL** (INT-10, US-12b-01/02) → OOTB GraphQL schema, later.
- **MetaWeblog/XML-RPC** (INT-12, US-12b-03) → optional Scripted REST shim, last.

## 5. Acceptance
API contract tests vs `inputs/openapi.json` (status + shape + error codes); AI Search returns published content; attachment upload/retrieve; notification dispatch verified. ATF API suite.
