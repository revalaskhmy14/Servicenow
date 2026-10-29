# Phase 6 Design — Quality, NFRs & Operations

Status: **design (pre-build)** · cross-cuts all phases.
Covers: EPIC-43/44; NFR-01…NFR-24.

---

## 1. Objective
Prove the system meets its non-functional requirements and wire operations to OOTB platform capabilities. No bespoke infrastructure.

## 2. Quality / testing (EPIC-44, EPIC-36 analogue)
- Aggregate per-phase ATF tests into a master **ATF suite**; each user story's Gherkin scenarios = its acceptance.
- Contract tests for every endpoint vs `inputs/openapi.json`.
- Accessibility + browser/device checks (NFR-20/21, US-44a-07, US-44c-03/04).

## 3. Security (EPIC-44)
- Security response headers (CSP, Referrer-Policy, Permissions-Policy) → platform config / properties (NFR-05, US-44a-02/b-02).
- External-auth rate limiting (NFR-04, US-44a-03/b-01) → OOTB auth protections.
- Timing-attack normalization (NFR-03, US-44a-01) → OOTB login handling.
- PII privacy + secure storage (NFR-17, US-44b-05) → platform encryption/field security.
- Admin-role immutability / system-role protection (US-44a-04/05) → Phase 1 guards.

## 4. Performance & availability (NFR-18/19)
- List/index tuning on `content_item` (Phase 2 indexes); AI Search for content search.
- Availability/HA (NFR-19, US-44c-02) → instance infrastructure; no custom Redis.

## 5. Observability & operations (EPIC-43)
- Structured logging + events (NFR-24, US-43a-03) → platform logging.
- Background lock enforcement (US-43a-02) → scheduled-job coordination.
- Backup/DR (NFR-23, US-43a-04) → platform-provided backups/clone; document RTO/RPO.
- Migration/error handling (US-43a-01) → Now SDK install + scoped error handling.

## 6. Acceptance
Master ATF suite green on clean install; NFR checklist (NFR-01…24) signed off; accessibility + performance + security checks documented.
