# Phase 3 Design — Content Lifecycle & Business Logic

Status: **design (pre-build)** · depends on Phase 2 tables.
Covers: EPIC-04 (04b/04c), EPIC-15 lifecycle, validation US-04d-*, pruning (ENT-14), audit (EPIC-38).

---

## 1. Objective
Implement the content state machine, transition operations, validation, version pruning, and audit using **Flow Designer + a shared Script Include + Business Rules/Data Policies** — not a bespoke engine.

## 2. State model (ENT-04.state)
`Draft → Published → Removed`, with restore/discard paths (per `inputs/architecture.md` flow 5):

| Operation | Effect | Permission | Story |
|---|---|---|---|
| Save draft | new `content_item_version`, is_latest=true, is_published=false | EditContent | US-04b-03, US-15a-02 |
| Publish | is_published=true, is_latest=true, state=Published | PublishContent (cms_editor) | US-04c-01, US-15a-03 |
| Unpublish | is_published=false, state=Draft | PublishContent | US-04c-02 |
| Clone | new content_item, Draft copy | EditContent | US-04c-03, US-15a-06 |
| Remove | clear latest/published, state=Removed (no delete) | DeleteContent (cms_moderator) | US-04c-04, US-15a-04 |
| Restore | reinstate latest, state=Draft | EditContent | US-04c-05 |
| Discard draft | drop pending draft, revert to published | EditContent | US-04c-06, US-15a-06 |

## 3. Implementation
- **Script Include** `ContentLifecycle` (scoped) — pure functions for each transition, reused by Phase 4 APIs and UI actions. Sets version pointers atomically.
- **Flow Designer** actions wrap the Script Include for no-code triggers where useful.
- **Business Rules** enforce the version-pointer invariants on `content_item` insert/update.

## 4. Validation (BR-07/08/09/11, US-04d-*)
- Title required (US-04d-05) → mandatory + data policy.
- priority_level 1–10 (US-04d-04) → business rule / dictionary min-max.
- tags leaf-terms-only + multi-select (US-04d-03) → business rule.
- content_type must reference existing type (BR-07/11) → reference integrity.
- System-defined field delete block (US-05b-05, US-44b-04) → business rule on `content_field`.

Return the exact spec messages (e.g. `A value is required for Title.`, `Priority Level must be between 1 and 10.`).

## 5. Version pruning (NFR-10/22, US-14a-08)
Scheduled Job reads `content_version_pruning`; for each content type prunes `content_item_version` beyond `versions_to_keep` / older than `retention_days`. No type configured ⇒ nothing pruned.

## 6. Audit (EPIC-38)
Audit signals on create/update/delete already captured by OOTB auditing (Phase 2); US-38a-03 review uses OOTB history.

## 7. Acceptance
ATF automating EPIC-04c / EPIC-15 Gherkin (publish, unpublish, remove/restore, discard, clone) + validation scenarios.
