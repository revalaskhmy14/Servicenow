/**
 * Wave B · MVP-B4 / P2-04 — `content_item_version` child table (ENT-04 versioning, D2).
 * Features: M9 (mvp/features.md). Stories: US-15a-02/03.
 * Immutable snapshots of a content_item at each draft/publish. Columns mirror the
 * editable content_item fields plus version/lifecycle flags. Version-row creation
 * logic (per save/publish) lives in Wave C (ContentLifecycle).
 */
import {
    Table,
    ReferenceColumn,
    StringColumn,
    HtmlColumn,
    IntegerColumn,
    BooleanColumn,
    DateColumn,
    DateTimeColumn,
    UrlColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

export const x_1863391_cms_now_content_item_version = Table({
    name: 'x_1863391_cms_now_content_item_version',
    label: 'Content Item Version',
    display: 'version_id',
    schema: {
        // Parent content item.
        content_item: ReferenceColumn({
            label: 'Content Item',
            referenceTable: 'x_1863391_cms_now_content_item',
            cascadeRule: 'delete',
        }),
        version_id: StringColumn({ label: 'Version Id', maxLength: 255 }),
        // --- snapshot of the editable content_item fields ---
        content_type: ReferenceColumn({
            label: 'Content Type',
            referenceTable: 'x_1863391_cms_now_content_type',
            cascadeRule: 'restrict',
        }),
        title: StringColumn({ label: 'Title', maxLength: 255 }),
        body_text: HtmlColumn({ label: 'Body Text' }),
        priority_level: IntegerColumn({ label: 'Priority Level', min: 1, max: 10 }),
        featured: BooleanColumn({ label: 'Featured' }),
        publication_date: DateColumn({ label: 'Publication Date' }),
        related_link: UrlColumn({ label: 'Related Link' }),
        custom_html: StringColumn({ label: 'Custom HTML', maxLength: 8000 }),
        tags: StringColumn({ label: 'Tags', maxLength: 4000 }),
        notes: StringColumn({ label: 'Notes', maxLength: 4000 }),
        featured_image_path: StringColumn({ label: 'Featured Image Path', maxLength: 1024 }),
        author: ReferenceColumn({ label: 'Author', referenceTable: 'sys_user', cascadeRule: 'none' }),
        state: ChoiceColumn({
            label: 'State',
            choices: {
                Draft: { label: 'Draft' },
                Published: { label: 'Published' },
                Removed: { label: 'Removed' },
            },
        }),
        slug: StringColumn({ label: 'Slug', maxLength: 255 }),
        // --- version / lifecycle flags ---
        is_published: BooleanColumn({ label: 'Is Published' }),
        is_latest: BooleanColumn({ label: 'Is Latest' }),
        created: DateTimeColumn({ label: 'Created' }),
    },
    index: [{ name: 'content_item_version_ci', unique: false, element: 'content_item' }],
})
