/**
 * MVP-A5 / P1-03 — BR-01 last-enabled-admin guard (server logic).
 * Stories: US-02d-02, US-19a-04.
 * Legacy business-rule script (ambient globals: current, previous, gs, GlideRecord).
 * Runs before update on sys_user when active changes to false. If the user being
 * disabled is a CMS admin and no other ENABLED cms_admin remains, the transaction
 * is aborted with the exact message from inputs/api.md (/v1/users/{id}/disable → 422).
 */
(function executeRule(current, previous) {
    var CMS_ADMIN_ROLE = 'x_1863391_cms_now.cms_admin';

    // Does the user being disabled hold the CMS admin role?
    var held = new GlideRecord('sys_user_has_role');
    held.addQuery('user', current.getUniqueValue());
    held.addQuery('role.name', CMS_ADMIN_ROLE);
    held.setLimit(1);
    held.query();
    if (!held.hasNext()) {
        return; // not a CMS admin — nothing to guard
    }

    // Count OTHER still-enabled users holding the CMS admin role.
    var others = new GlideRecord('sys_user_has_role');
    others.addQuery('role.name', CMS_ADMIN_ROLE);
    others.addQuery('user.active', true);
    others.addQuery('user', '!=', current.getUniqueValue());
    others.query();

    if (others.getRowCount() === 0) {
        gs.addErrorMessage('Cannot disable this user This is the last remaining enabled administrator account. At least one enabled administrator is required.');
        current.setAbortAction(true);
    }
})(current, previous);
