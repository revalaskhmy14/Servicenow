/**
 * Wave B · MVP-B3 / P2-03 — `content_item` table (ENT-04 ContentItem) + MVP-B5 slug (M23).
 * Features: M8, M23 (mvp/features.md). Stories: US-15a-01, US-04b-02.
 * Defines the authored content record: business keys, snapshot/editable fields,
 * lifecycle flags, and the public URL slug. Lifecycle transitions, slug
 * auto-generation/uniqueness, and validation rules are deferred to Waves C/F.
 */
import {
    Table,
    StringColumn,
    ReferenceColumn,
    HtmlColumn,
    IntegerColumn,
    BooleanColumn,
    DateColumn,
    DateTimeColumn,
    UrlColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

export const x_1863391_cms_now_content_item = Table({
    name: 'x_1863391_cms_now_content_item',
    label: 'Content Item',
    display: 'title',
    schema: {
        // Stable business key for the logical item (ENT-04 contentItemId).
        content_item_id: StringColumn({ label: 'Content Item Id', maxLength: 255 }),
        // Identifier of the current version (ENT-04 contentItemVersionId).
        content_item_version_id: StringColumn({ label: 'Content Item Version Id', maxLength: 255 }),
        content_type: ReferenceColumn({
            label: 'Content Type',
            referenceTable: 'x_1863391_cms_now_content_type',
            mandatory: true,
            cascadeRule: 'restrict',
        }),
        title: StringColumn({ label: 'Title', mandatory: true, maxLength: 255 }),
        body_text: HtmlColumn({ label: 'Body Text' }),
        // Priority 1..10 (ENT-04 priorityLevel; range validation BR deferred to Wave C).
        priority_level: IntegerColumn({ label: 'Priority Level', min: 1, max: 10 }),
        featured: BooleanColumn({ label: 'Featured' }),
        publication_date: DateColumn({ label: 'Publication Date' }),
        related_link: UrlColumn({ label: 'Related Link' }),
        // Raw HTML stored as string (sanitized by the public renderer in Wave F/M26).
        custom_html: StringColumn({ label: 'Custom HTML', maxLength: 8000 }),
        // Leaf taxonomy terms (ENT-04 tags) — stored as string at MVP.
        tags: StringColumn({ label: 'Tags', maxLength: 4000 }),
        notes: StringColumn({ label: 'Notes', maxLength: 4000 }),
        featured_image_path: StringColumn({ label: 'Featured Image Path', maxLength: 1024 }),
        author: ReferenceColumn({ label: 'Author', referenceTable: 'sys_user', cascadeRule: 'none' }),
        // Lifecycle state (ENT-04 status) — Draft/Published/Removed, defaults to Draft.
        state: ChoiceColumn({
            label: 'State',
            choices: {
                Draft: { label: 'Draft' },
                Published: { label: 'Published' },
                Removed: { label: 'Removed' },
            },
            default: 'Draft',
        }),
        modified_date: DateTimeColumn({ label: 'Modified Date' }),
        is_latest: BooleanColumn({ label: 'Is Latest' }),
        is_published: BooleanColumn({ label: 'Is Published' }),
        // Friendly, stable public URL key (M23). Auto-generation/uniqueness deferred.
        slug: StringColumn({ label: 'Slug', maxLength: 255 }),
    },
    index: [
        { name: 'content_item_ciid', unique: false, element: 'content_item_id' },
        { name: 'content_item_ctype', unique: false, element: 'content_type' },
        { name: 'content_item_state', unique: false, element: 'state' },
        { name: 'content_item_author', unique: false, element: 'author' },
        { name: 'content_item_moddate', unique: false, element: 'modified_date' },
        { name: 'content_item_latest_pub', unique: false, element: ['is_latest', 'is_published'] },
        { name: 'content_item_slug', unique: false, element: 'slug' },
    ],
})
