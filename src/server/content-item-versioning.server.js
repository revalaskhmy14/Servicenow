/**
 * Wave C · MVP-C4 (M13) — content_item after insert/update: draft versioning on save.
 * Creates a new content_item_version per ordinary save via the shared Script Include.
 * ContentLifecycle transitions set setWorkflow(false), so this rule does not
 * double-version publish/unpublish/remove/etc.
 */
(function executeRule(current, previous) {
    new x_1863391_cms_now.ContentLifecycle().createVersion(current);
})(current, previous);
