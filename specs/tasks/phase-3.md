# Phase 3 Tasks (detailed, per story) — Content Lifecycle & Business Logic

Granular ServiceNow subtasks per story. Depends on Phase 2 tables. Design: `specs/design/phase-3-content-lifecycle.md`.

**Conventions**: artifacts `Script Include` (`sys_script_include`), `BusinessRule()`, `Data Policy` (`sys_data_policy`), `UI Policy`, Flow Designer `Action`/`Flow`, Scheduled Script Execution (`sysauto_script`), ATF `Test()`. Subtask IDs `T-<story>-<n>`.

---

## EPIC-15 — Shared transition logic (owning task P3-01)

### US-15a-03 Publish/unpublish (core) — **Build**
- [ ] T-15a03-1 `Script Include` `ContentLifecycle` (scoped) with methods: `createDraft`, `saveDraft`, `publish`, `unpublish`, `clone`, `remove`, `restore`, `discardDraft`. Each sets `state`, `is_latest`, `is_published`, and writes a `content_item_version` row atomically.
- [ ] T-15a03-2 Unit ATF on each method’s version-pointer invariants. Tag `@US-15a-03`.

## EPIC-04 / EPIC-15 — Publish & unpublish (owning task P3-02)

### US-04c-01 Publish · US-04a-02 Publish from list · US-15a-03 — **Build**
- [ ] T-04c01-1 Flow/UI Action "Publish" → `ContentLifecycle.publish`; gate PublishContent (cms_editor).
- [ ] T-04c01-2 Index signal to AI Search (wired in P4-06), non-fatal.
- [ ] T-04c01-3 ATF: publish sets is_published/is_latest=true, state=Published; permission denial for non-editor. Tags `@US-04c-01 @US-04a-02 @US-15a-03`.

### US-04c-02 Unpublish · US-04a-03 Unpublish from list — **Build**
- [ ] T-04c02-1 "Unpublish" action → `ContentLifecycle.unpublish` (state=Draft, is_published=false).
- [ ] T-04c02-2 ATF. Tags `@US-04c-02 @US-04a-03`.

## EPIC-04 / EPIC-15 — Clone / remove / restore / discard (owning task P3-03)

### US-04c-03 Clone · US-04a-05 Clone from list · US-15a-06 Clone/discard — **Build**
- [ ] T-04c03-1 "Clone" action → `ContentLifecycle.clone` (new content_item_id, Draft copy).
- [ ] T-04c03-2 ATF. Tags `@US-04c-03 @US-04a-05 @US-15a-06`.

### US-04c-04 Remove · US-04a-04 Remove/restore · US-15a-04 — **Build**
- [ ] T-04c04-1 "Remove" action → `ContentLifecycle.remove` (clear latest/published, state=Removed, no delete); gate DeleteContent (cms_moderator).
- [ ] T-04c04-2 ATF. Tags `@US-04c-04 @US-04a-04 @US-15a-04`.

### US-04c-05 Restore — **Build**
- [ ] T-04c05-1 "Restore" action → `ContentLifecycle.restore` (reinstate latest, state=Draft). Dep US-04c-04.
- [ ] T-04c05-2 ATF. Tag `@US-04c-05`.

### US-04c-06 Discard draft — **Build**
- [ ] T-04c06-1 "Discard draft" action → `ContentLifecycle.discardDraft` (revert to published).
- [ ] T-04c06-2 ATF. Tag `@US-04c-06`.

## EPIC-04 / EPIC-15 — Draft versioning on save (owning task P3-04)

### US-04b-03 Save new draft version · US-15a-02 Update draft — **Build**
- [ ] T-04b03-1 `BusinessRule()` (before update, content_item): on edit create a new `content_item_version`, set is_latest, bump `content_item_version_id`, update `modified_date`.
- [ ] T-04b03-2 ATF: each save produces a new version row. Tags `@US-04b-03 @US-15a-02`.

## EPIC-04 / EPIC-05 — Validation & integrity (owning task P3-05)

### US-04d-05 Required title — **Build**
- [ ] T-04d05-1 `title` mandatory + `Data Policy`; message `A value is required for Title.`
- [ ] T-04d05-2 ATF. Tag `@US-04d-05`.

### US-04d-04 Priority range — **Build**
- [ ] T-04d04-1 `priority_level` min 1/max 10 via dictionary + `BusinessRule()`; message `Priority Level must be between 1 and 10.`
- [ ] T-04d04-2 ATF. Tag `@US-04d-04`.

### US-04d-03 Taxonomy leaf/multi — **Build**
- [ ] T-04d03-1 `BusinessRule()`: tags accept leaf terms only, multi-select allowed; message `Select leaf terms only. Multiple selections allowed.`
- [ ] T-04d03-2 ATF. Tag `@US-04d-03`.

### US-05b-05 Remove user field · US-05c-02 Remove non-system field · US-44b-04 System-part integrity — **Build**
- [ ] T-05b05-1 `BusinessRule()` (before delete, content_field): block when `is_system_defined=true`; message `system-defined fields cannot be removed`.
- [ ] T-05b05-2 ATF: system field delete blocked, user field allowed. Tags `@US-05b-05 @US-05c-02 @US-44b-04`.

### BR-07/11 content-type reference integrity — **Build**
- [ ] T-brref-1 `BusinessRule()`: `content_item.content_type` must reference an existing type.
- [ ] T-brref-2 ATF. Tag `@US-15a-01` (integrity).

## EPIC-14 / EPIC-42 — Version pruning job (owning task P3-06)

### US-14a-08 · US-42a-04 — **Build**
- [ ] T-prunejob-1 Scheduled Script Execution (`sysauto_script`) reading `content_version_pruning`; for each content type prune `content_item_version` beyond `versions_to_keep` / older than `retention_days`. No config ⇒ no prune.
- [ ] T-prunejob-2 Interval from `cms.background.polling_time` property.
- [ ] T-prunejob-3 ATF: pruning respects limits; unconfigured type untouched. Tags `@US-14a-08 @US-42a-04`.

## EPIC-38 — Audit review (owning task P3-07)

### US-38a-02 Emit signals · US-38a-03 Review audit trail — **Configure**
- [ ] T-38a03-1 Confirm audit history on content_item create/update/delete (Phase 2 audit).
- [ ] T-38a03-2 Expose history view / related list for admin review.
- [ ] T-38a03-3 ATF: audit entries present + reviewable. Tags `@US-38a-02 @US-38a-03`.

## Phase 3 exit (P3-08, P3-09)
- [ ] T-P3-exit-1 Phase 3 `TestSuite()` (lifecycle + validation Gherkin).
- [ ] T-P3-exit-2 Flip `specs/design/phase-3-content-lifecycle.md` to as-built.
