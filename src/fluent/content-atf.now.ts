/**
 * Wave G · MVP-G1 (M21) — ATF suite for the MVP core thread.
 * Server-side lifecycle + sanitizer checks (atf.server.runServerSideScript).
 * This is authoring only — execution runs post-deploy via ATF (UI/scheduler/CI).
 * Follow-ups to add after deploy: REST contract assertions (atf.rest.*) against
 * the /v1/cms endpoints, and a last-admin-guard form/server test (US-02d-02).
 */
import { Test, TestSuite } from '@servicenow/sdk/core'

export const coreThreadTest = Test(
    {
        $id: Now.ID['atf_core_thread'],
        name: 'CMS core thread (lifecycle + sanitizer)',
        description: 'Publish/unpublish/remove/restore flags, versioning, and HTML sanitization.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf_core_thread_step'],
            script: Now.include('../server/atf-lifecycle.script.js'),
        })
    }
)

export const mvpSuite = TestSuite({
    $id: Now.ID['atf_mvp_suite'],
    name: 'CMS MVP Suite',
    description: 'MVP definition-of-done coverage (M21). Expand with REST + last-admin tests.',
    tests: [coreThreadTest],
})
