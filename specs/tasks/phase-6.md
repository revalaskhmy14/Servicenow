# Phase 6 Tasks (detailed, per story) — Quality, NFRs & Operations

Granular ServiceNow subtasks per story. Cross-cuts all phases. Design: `specs/design/phase-6-quality-nfrs.md`.

**Conventions**: ATF `Test()`/`TestSuite()`, System Properties, platform security/logging/backup. Subtask IDs `T-<story>-<n>`.

---

## EPIC-44 / EPIC-33 / EPIC-35 / EPIC-36 — Test & build quality (owning task P6-01)

### US-33a-03 Lint/format · US-35a-01 CI/CD · US-35a-02 Build gates · US-35a-03 Cross-platform tests · US-36a-01 Unit harness — **Configure (remap)**
- [ ] T-p601-1 Master `TestSuite()` aggregating all phase ATF suites; coverage map story→ATF.
- [ ] T-p601-2 Build quality via `now-sdk build` (warnings resolved) = quality gate (remaps GitHub Actions/xUnit).
- [ ] T-p601-3 Document that Now SDK build/install replaces the .NET CI pipeline (US-35a-*). Tags `@US-33a-03 @US-35a-01/02/03 @US-36a-01`.

## EPIC-44 — Security (owning task P6-02)

### US-44a-02 Headers · US-44a-03 Rate limit · US-44b-01 Rate-limit enforcement · US-44b-02 Headers config · US-44b-05 PII privacy — **Configure**
- [ ] T-p602-1 Security response headers (CSP, Referrer-Policy, Permissions-Policy) via platform config / properties.
- [ ] T-p602-2 External-auth rate limiting verified (with Phase 1 P1-10).
- [ ] T-p602-3 PII privacy: field encryption/security + no plaintext PII in logs (US-44b-05).
- [ ] T-p602-4 ATF/verify. Tags `@US-44a-02 @US-44a-03 @US-44b-01 @US-44b-02 @US-44b-05`.

## EPIC-44 — Performance (owning task P6-03)

### US-44a-08 Performance targets · US-44c-01 Page response perf — **Configure**
- [ ] T-p603-1 Confirm `content_item` indexes; AI Search for content search; list query tuning.
- [ ] T-p603-2 Measure admin page response (<2s target, NFR-18).
- [ ] T-p603-3 Document results. Tags `@US-44a-08 @US-44c-01`.

## EPIC-43 — Observability (owning task P6-04)

### US-43a-01 XML-RPC/route/migration errors · US-43a-03 Observability/logging — **Configure**
- [ ] T-p604-1 Structured scoped logging for auth, lifecycle, migration, deployment events.
- [ ] T-p604-2 Scoped error handling for API/admin routes + migration (Now SDK) errors.
- [ ] T-p604-3 ATF/verify logs emitted. Tags `@US-43a-01 @US-43a-03`.

## EPIC-43 — Backup & recovery (owning task P6-05)

### US-43a-04 Backup/recovery — **Configure**
- [ ] T-p605-1 Document platform backup/clone strategy + RTO/RPO; map ENT data to backup scope.
- [ ] T-p605-2 Recovery runbook. Tag `@US-43a-04`.

## EPIC-44 — Accessibility & compatibility (owning task P6-06)

### US-44a-07 WCAG AA · US-44c-03 WCAG AA · US-44c-04 Browser/device — **Configure**
- [ ] T-p606-1 Full WCAG 2.1 AA audit across screens (ties to P5-07/P5-08).
- [ ] T-p606-2 Browser/device compatibility matrix verified.
- [ ] T-p606-3 Remediate + re-test. Tags `@US-44a-07 @US-44c-03 @US-44c-04`.

## EPIC-33 / release (owning task P6-07)

### US-33a-04 App README · Definition of Done — **Configure**
- [ ] T-p607-1 App README (purpose, scope, build/install, OOTB mappings).
- [ ] T-p607-2 Release checklist against Definition of Done (all Gherkin green; endpoints pass contract; NFRs met; installed).
- [ ] T-p607-3 Final pass over all phase as-built docs + coverage matrix completeness. Tag `@US-33a-04`.
