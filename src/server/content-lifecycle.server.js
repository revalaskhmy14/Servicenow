/**
 * Wave C · MVP-C1 — ContentLifecycle Script Include (feature M10, US-15a-03).
 * Single source of truth for content_item state transitions + versioning.
 * Called by Wave D REST endpoints and Wave E UI actions, and by the
 * versioning business rule (createVersion). Glide APIs are auto-available in
 * Script Include class files (do not import them).
 *
 * Flag/state semantics come from inputs/data-model.md (ENT-04) and inputs/api.md:
 *  publish  -> state=Published, is_published=true, is_latest=true (+ version snapshot)
 *  unpublish-> state=Draft, is_published=false
 *  clone    -> new Draft copy (new ids), is_latest=true, is_published=false
 *  remove   -> is_latest=false, is_published=false, state=Removed (record retained; BR-10)
 *  restore  -> is_latest=true, state=Draft (BR-10)
 *  discardDraft -> revert item to last published version snapshot, state=Published
 */
var ContentLifecycle = Class.create();
ContentLifecycle.prototype = {
    ITEM: 'x_1863391_cms_now_content_item',
    VERSION: 'x_1863391_cms_now_content_item_version',

    initialize: function () {},

    _now: function () {
        return new GlideDateTime().getValue();
    },

    // Editable fields mirrored into a version snapshot.
    _snapshotFields: [
        'content_type', 'title', 'body_text', 'priority_level', 'featured',
        'publication_date', 'related_link', 'custom_html', 'tags', 'notes',
        'featured_image_path', 'author', 'state', 'slug',
    ],

    // Write a new version row. Unsets is_latest (and is_published when this is a
    // publish) on prior versions of the same item, then inserts the snapshot.
    _writeVersion: function (itemGR, isPublished, isLatest) {
        var itemId = itemGR.getUniqueValue();
        if (isLatest) {
            var prior = new GlideRecord(this.VERSION);
            prior.addQuery('content_item', itemId);
            prior.query();
            while (prior.next()) {
                var changed = false;
                if (prior.is_latest == true) { prior.is_latest = false; changed = true; }
                if (isPublished && prior.is_published == true) { prior.is_published = false; changed = true; }
                if (changed) { prior.update(); }
            }
        }
        var v = new GlideRecord(this.VERSION);
        v.initialize();
        v.content_item = itemId;
        v.version_id = gs.generateGUID();
        for (var i = 0; i < this._snapshotFields.length; i++) {
            var f = this._snapshotFields[i];
            v.setValue(f, itemGR.getValue(f));
        }
        v.is_published = isPublished;
        v.is_latest = isLatest;
        v.created = this._now();
        return v.insert();
    },

    // Quietly stamp the current version id on the item (no business rules).
    _setItemVersionId: function (itemGR, versionId) {
        if (!versionId) { return; }
        var it = new GlideRecord(this.ITEM);
        if (it.get(itemGR.getUniqueValue())) {
            it.setWorkflow(false);
            it.content_item_version_id = versionId;
            it.update();
        }
    },

    // M13 save-path versioning: invoked by the after insert/update business rule
    // for ordinary draft saves. A new version becomes latest; it carries the
    // item's current is_published flag.
    createVersion: function (itemGR) {
        var isPub = (itemGR.is_published == true);
        var vid = this._writeVersion(itemGR, isPub, true);
        this._setItemVersionId(itemGR, vid);
        return vid;
    },

    publish: function (sysId) {
        var it = new GlideRecord(this.ITEM);
        if (!it.get(sysId)) { return null; }
        it.setWorkflow(false);
        it.state = 'Published';
        it.is_published = true;
        it.is_latest = true;
        it.modified_date = this._now();
        it.update();
        var vid = this._writeVersion(it, true, true);
        this._setItemVersionId(it, vid);
        return it;
    },

    unpublish: function (sysId) {
        var it = new GlideRecord(this.ITEM);
        if (!it.get(sysId)) { return null; }
        it.setWorkflow(false);
        it.state = 'Draft';
        it.is_published = false;
        it.is_latest = true;
        it.modified_date = this._now();
        it.update();
        var vid = this._writeVersion(it, false, true);
        this._setItemVersionId(it, vid);
        return it;
    },

    // Draft copy. Inserted WITH business rules so slug + first version are created.
    clone: function (sysId) {
        var src = new GlideRecord(this.ITEM);
        if (!src.get(sysId)) { return null; }
        var n = new GlideRecord(this.ITEM);
        n.initialize();
        for (var i = 0; i < this._snapshotFields.length; i++) {
            var f = this._snapshotFields[i];
            n.setValue(f, src.getValue(f));
        }
        n.content_item_id = gs.generateGUID();
        n.state = 'Draft';
        n.is_published = false;
        n.is_latest = true;
        n.slug = ''; // regenerated (unique) by the slug business rule
        n.insert();
        return n;
    },

    remove: function (sysId) {
        var it = new GlideRecord(this.ITEM);
        if (!it.get(sysId)) { return null; }
        it.setWorkflow(false);
        it.is_latest = false;
        it.is_published = false;
        it.state = 'Removed';
        it.modified_date = this._now();
        it.update();
        var v = new GlideRecord(this.VERSION);
        v.addQuery('content_item', sysId);
        v.query();
        while (v.next()) {
            v.is_latest = false;
            v.is_published = false;
            v.update();
        }
        return it;
    },

    restore: function (sysId) {
        var it = new GlideRecord(this.ITEM);
        if (!it.get(sysId)) { return null; }
        it.setWorkflow(false);
        it.is_latest = true;
        it.is_published = false;
        it.state = 'Draft';
        it.modified_date = this._now();
        it.update();
        return it;
    },

    discardDraft: function (sysId) {
        var it = new GlideRecord(this.ITEM);
        if (!it.get(sysId)) { return null; }
        var v = new GlideRecord(this.VERSION);
        v.addQuery('content_item', sysId);
        v.addQuery('is_published', true);
        v.orderByDesc('created');
        v.setLimit(1);
        v.query();
        if (v.next()) {
            it.setWorkflow(false);
            for (var i = 0; i < this._snapshotFields.length; i++) {
                var f = this._snapshotFields[i];
                if (f === 'state' || f === 'slug') { continue; } // keep slug stable
                it.setValue(f, v.getValue(f));
            }
            it.state = 'Published';
            it.is_published = true;
            it.is_latest = true;
            it.modified_date = this._now();
            it.update();
        }
        return it;
    },

    type: 'ContentLifecycle',
};
