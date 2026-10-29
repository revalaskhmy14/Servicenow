/**
 * Wave B · MVP-B1 / P2-01 — `content_type` table (ENT-05 ContentTypeDefinition).
 * Features: M6 (mvp/features.md). Stories: US-14a-01/02/03, US-05a.
 * Content types are modeled as DATA (decision D3). This file defines only the
 * table + columns + indexes; name-normalization / uniqueness business rules
 * (BR-12/BR-13) belong to a later wave and are intentionally omitted here.
 */
import { Table, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1863391_cms_now_content_type = Table({
    name: 'x_1863391_cms_now_content_type',
    label: 'Content Type',
    display: 'display_name',
    schema: {
        // Human-friendly label — required, max 1024 chars (ENT-05 displayName).
        display_name: StringColumn({ label: 'Display Name', mandatory: true, maxLength: 1024 }),
        // Technical name — required, unique (ENT-05 name; ToSafeName/uniqueness BRs deferred).
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 255 }),
        creatable: BooleanColumn({ label: 'Creatable' }),
        listable: BooleanColumn({ label: 'Listable' }),
        draftable: BooleanColumn({ label: 'Draftable' }),
        versionable: BooleanColumn({ label: 'Versionable' }),
        securable: BooleanColumn({ label: 'Securable' }),
        // Free-form JSON settings blob.
        settings: StringColumn({ label: 'Settings', maxLength: 4000 }),
    },
    index: [{ name: 'content_type_name', unique: true, element: 'name' }],
})
