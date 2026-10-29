# Phase 0 Decisions — Assumed Defaults

Status: **ratified (user-approved, Oct 2026).** These resolve the five open decisions in `specs/PLAN.md`. If a decision is later overridden, the affected phase design + tasks must be revised before building that phase.

| # | Decision | Chosen default | Rationale | Impact if changed |
|---|---|---|---|---|
| D1 | **Tenancy (ENT-07)** | Logical **`tenant` table + reference field** on content; **not** Domain Separation | Simpler, reversible, no platform-wide domain config; spec only needs logical separation | Switching to Domain Separation reshapes every table + ACL (Phase 2/3) |
| D2 | **Content versioning (ENT-04)** | Dedicated **`content_item_version` child table** keyed by business `content_item_id` | Gives explicit draft/published version rows the spec lifecycle needs (isLatest/isPublished); OOTB field history is insufficient for version restore | Alters Phase 2 tables + Phase 3 lifecycle logic |
| D3 | **Dynamic content types (ENT-05/06)** | Model content types/fields as **data records**; do **NOT** generate physical tables at runtime | End users must not create platform tables; keeps the app safe and installable | Changing to generated tables is a major architecture shift |
| D4 | **GraphQL & XML-RPC scope** | **Defer** (P2): build REST now; GraphQL via OOTB later; XML-RPC optional/last | Lowest-value, highest-effort integrations; REST satisfies most stories | Pulling them earlier adds Phase 4 scope |
| D5 | **Named queries (ENT-11)** | Thin custom **`query` table** + small execution Script Include (GlideQuery/encoded query), reusing content ACLs | OOTB saved filters don't expose the named-execution API the spec requires; keep it minimal | Dropping the table means re-mapping EPIC-09/41 query stories to OOTB reports |

**Ratification:** confirm with the product owner before Phase 2 build begins. Phase 1 is unaffected.
