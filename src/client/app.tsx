import React, { useCallback, useEffect, useState } from 'react'
import { NowRecordListConnected } from '@servicenow/react-components/NowRecordListConnected'
import { RecordProvider } from '@servicenow/react-components/RecordContext'
import { FormActionBar } from '@servicenow/react-components/FormActionBar'
import { FormColumnLayout } from '@servicenow/react-components/FormColumnLayout'

const TABLE = 'x_1863391_cms_now_content_item'
const COLUMNS = 'title,content_type,state,is_published,modified_date'

interface ViewState {
    view: string
    id: string | null
}

function getView(): ViewState {
    const p = new URLSearchParams(window.location.search)
    return { view: p.get('view') || 'list', id: p.get('id') }
}

export default function App() {
    const [state, setState] = useState<ViewState>(getView)

    useEffect(() => {
        const onPop = () => setState(getView())
        window.addEventListener('popstate', onPop)
        return () => window.removeEventListener('popstate', onPop)
    }, [])

    const navigate = useCallback((view: string, id?: string | null, title = 'CMS Content Editor') => {
        const params = new URLSearchParams({ view })
        if (id) params.set('id', id)
        const path = `${window.location.pathname}?${params}`
        if (window.self !== window.top) {
            ;(window as any).CustomEvent.fireTop('magellanNavigator.permalink.set', { relativePath: path, title })
        }
        window.history.pushState({ view, id }, '', path)
        document.title = title
        setState({ view, id: id || null })
    }, [])

    const backToList = () => navigate('list', null, 'Content Items')

    if (state.view === 'create') {
        return (
            <RecordProvider table={TABLE} sysId="-1" isReadOnly={false}>
                <FormActionBar onSubmit={backToList} />
                <FormColumnLayout />
            </RecordProvider>
        )
    }

    if (state.view === 'detail' && state.id) {
        return (
            <RecordProvider table={TABLE} sysId={state.id} isReadOnly={false}>
                <FormActionBar onSubmit={backToList} />
                <FormColumnLayout />
            </RecordProvider>
        )
    }

    return (
        <NowRecordListConnected
            key="is_latest=true"
            table={TABLE}
            listTitle="Content Items"
            columns={COLUMNS}
            limit={25}
            onRowClicked={(e: any) => navigate('detail', e.detail.payload.sys_id, 'Edit Content Item')}
            onNewActionClicked={() => navigate('create', null, 'New Content Item')}
        />
    )
}
