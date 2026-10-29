/**
 * Wave E · MVP-E3 (M20) — Content Item Editor UI Page (SCR-content-edit, US-04b-01/02/03).
 * React + @servicenow/react-components; list (NowRecordListConnected) + create/edit
 * (RecordProvider + FormActionBar + FormColumnLayout) with URLSearchParams routing.
 * Theming/accessibility come from the Horizon-based react-components. Saving a draft
 * creates a new version via the Wave C business rule. Runtime a11y/ui_diagnostics
 * validation (M22) runs after deploy.
 */
import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import page from '../../client/index.html'

export const contentEditorPage = UiPage({
    $id: Now.ID['ui_content_editor'],
    endpoint: 'x_1863391_cms_now_content_editor.do',
    html: page,
    direct: true,
})
