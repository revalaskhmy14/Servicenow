import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '6ba416861f304e1a94d1bc4b94c41e26'
                    }
                    br0: {
                        table: 'sys_script'
                        id: '86963322cbd04e7b938293326c16a80e'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: '24fa1e2dc083478e92eae6a171b943c0'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'bf774f384c2d4544ab717325ad3f81f1'
                    }
                    src_server_script_js: {
                        table: 'sys_module'
                        id: '3df60e82f95b454f924eac745a6d8274'
                    }
                }
            }
        }
    }
}
