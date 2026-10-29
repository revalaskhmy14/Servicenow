/**
 * Wave B · MVP-B2 / P2-02 — `content_field` table (ENT-06 ContentPartFieldDefinition).
 * Features: M7 (mvp/features.md). Stories: US-14a-04/05/06, US-05b.
 * Field definitions as data, ordered by `position`. field_type is an app-owned
 * choice field (inline choices — ChoiceSet is only for fields the app does not own).
 * position max+1 defaulting and reorder business rules are deferred to later waves.
 */
import { Table, ReferenceColumn, StringColumn, ChoiceColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1863391_cms_now_content_field = Table({
    name: 'x_1863391_cms_now_content_field',
    label: 'Content Field',
    display: 'field_name',
    schema: {
        // Owning content type — required, indexed (ENT-06 contentTypeId).
        content_type: ReferenceColumn({
            label: 'Content Type',
            referenceTable: 'x_1863391_cms_now_content_type',
            mandatory: true,
            cascadeRule: 'delete',
        }),
        field_name: StringColumn({ label: 'Field Name', mandatory: true, maxLength: 255 }),
        // ENT-06 fieldType enum (data-model.md Reference data).
        field_type: ChoiceColumn({
            label: 'Field Type',
            choices: {
                TextField: { label: 'Text Field' },
                DateField: { label: 'Date Field' },
                CustomBooleanField: { label: 'Custom Boolean Field' },
                ContentPicker: { label: 'Content Picker' },
                Numeric: { label: 'Numeric' },
                Boolean: { label: 'Boolean' },
                Date: { label: 'Date' },
                Link: { label: 'Link' },
                Html: { label: 'Html' },
                Markdown: { label: 'Markdown' },
                Media: { label: 'Media' },
            },
        }),
        position: IntegerColumn({ label: 'Position', default: '0' }),
        is_system_defined: BooleanColumn({ label: 'Is System Defined', default: false }),
        settings: StringColumn({ label: 'Settings', maxLength: 4000 }),
    },
    index: [{ name: 'content_field_type', unique: false, element: 'content_type' }],
})
