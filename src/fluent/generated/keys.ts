import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acl_cms_rest_access: {
                        table: 'sys_security_acl'
                        id: '6d86d30f103348749326341f196efa04'
                    }
                    acl_content_field_create: {
                        table: 'sys_security_acl'
                        id: 'c2080fe6edb44205a9ca68ea6dc698f5'
                    }
                    acl_content_field_read: {
                        table: 'sys_security_acl'
                        id: '6a60ee0e6ca14305a3a4cca94808c205'
                    }
                    acl_content_field_write: {
                        table: 'sys_security_acl'
                        id: '114792385bca4543a3f050db59bc2454'
                    }
                    acl_content_item_create: {
                        table: 'sys_security_acl'
                        id: '16f5cf9531044284ba1d99a7ab5d2922'
                    }
                    acl_content_item_delete: {
                        table: 'sys_security_acl'
                        id: '8050ad13617c4517aea137d26c565bb2'
                    }
                    acl_content_item_public_read: {
                        table: 'sys_security_acl'
                        id: '69b6cd52ad2e433db1e1ef6b35451a1c'
                    }
                    acl_content_item_read: {
                        table: 'sys_security_acl'
                        id: '5af30442b5f84a68bbdc3d61963ecf98'
                    }
                    acl_content_item_version_create: {
                        table: 'sys_security_acl'
                        id: '6d8accaebe914ad5be1233c01eff5fc4'
                    }
                    acl_content_item_version_read: {
                        table: 'sys_security_acl'
                        id: 'a50f322fdcac4ca8af77eef1f68f2d53'
                    }
                    acl_content_item_version_write: {
                        table: 'sys_security_acl'
                        id: '3a95d552a4944e0ca63d0b771df877d9'
                    }
                    acl_content_item_write: {
                        table: 'sys_security_acl'
                        id: 'bdd3263b25ed474eb691b6d6fc5a92f8'
                    }
                    acl_content_type_create: {
                        table: 'sys_security_acl'
                        id: '367851c46c70436db249852988873ad6'
                    }
                    acl_content_type_read: {
                        table: 'sys_security_acl'
                        id: '51bb2b1fe7c543bf996cf46c4fa628a9'
                    }
                    acl_content_type_write: {
                        table: 'sys_security_acl'
                        id: 'c38806b2ae894bb0b432e2f307671abe'
                    }
                    atf_core_thread: {
                        table: 'sys_atf_test'
                        id: 'eadfef9df52f4ce3bbf8f967828939b3'
                    }
                    atf_core_thread_step: {
                        table: 'sys_atf_step'
                        id: '4fdadb86e7464bbcbe7b550725be8b45'
                    }
                    atf_mvp_suite: {
                        table: 'sys_atf_test_suite'
                        id: '7e1744eb78cc49d3ac74bdfe2c14241f'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'cef4e8af8eaf4578a3bffd9304d6fb78'
                    }
                    br_content_item_validation: {
                        table: 'sys_script'
                        id: '41608d45663246ed9f1e9bc7f51ab88a'
                    }
                    br_content_item_versioning: {
                        table: 'sys_script'
                        id: '7e449cf9372e473b9078ee17dafd99e6'
                    }
                    br_last_admin_guard: {
                        table: 'sys_script'
                        id: 'f203f9a3f0034c16b22a14443b116ed0'
                        deleted: false
                    }
                    cms_now_menu: {
                        table: 'sys_app_application'
                        id: '4c5ce8a2eb2d4b1b968c02c4c024cc50'
                    }
                    cms_now_module_content_editor: {
                        table: 'sys_app_module'
                        id: '88697df8ec304e2398c8a756f8be7b4a'
                    }
                    cms_now_module_content_fields: {
                        table: 'sys_app_module'
                        id: 'de23d2fdd60741bab5e297ebad6feea3'
                    }
                    cms_now_module_content_items: {
                        table: 'sys_app_module'
                        id: 'fabd8943978d46a5a065d42ae88c37df'
                    }
                    cms_now_module_content_types: {
                        table: 'sys_app_module'
                        id: '90275e0a7e6a416eaef5909e592963a1'
                    }
                    cms_now_module_public_site: {
                        table: 'sys_app_module'
                        id: '333ae6bc7732458dbc1cd9bc6fa4dc7e'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '8653abe2c238408d8236dc7aa5da794f'
                    }
                    r_api_create: {
                        table: 'sys_ws_operation'
                        id: '55df6aa29c8543d0b00e51bb3efa01ef'
                    }
                    r_api_get: {
                        table: 'sys_ws_operation'
                        id: 'af6afe1cb20c43c2a131ba8300fdc1fc'
                    }
                    r_items_clone: {
                        table: 'sys_ws_operation'
                        id: '4a4f7aa51f11471ebea9340ec127ea82'
                    }
                    r_items_create: {
                        table: 'sys_ws_operation'
                        id: '646dfa82c32c4aefa893c1ec505492b5'
                    }
                    r_items_discard: {
                        table: 'sys_ws_operation'
                        id: '92bb54d84b2a4c909ecd15b1a03db30a'
                    }
                    r_items_get: {
                        table: 'sys_ws_operation'
                        id: '9d058db36df9406a92adcb36d971a232'
                    }
                    r_items_list: {
                        table: 'sys_ws_operation'
                        id: '0cdc78134de545bb9139b348ed098276'
                    }
                    r_items_publish: {
                        table: 'sys_ws_operation'
                        id: 'c8483e9fff764bfdac11c58a1c5de44c'
                    }
                    r_items_remove: {
                        table: 'sys_ws_operation'
                        id: '23ccfc131c0846728ef42d8c1e1de966'
                    }
                    r_items_restore: {
                        table: 'sys_ws_operation'
                        id: '0afa4bc6d69c4112900cabb703808463'
                    }
                    r_items_unpublish: {
                        table: 'sys_ws_operation'
                        id: 'c39660eb6eb440d380a0cb024cb1a196'
                    }
                    r_items_update: {
                        table: 'sys_ws_operation'
                        id: '7bc62dc57d5d4e5f9f081c05770877ae'
                    }
                    rest_cms: {
                        table: 'sys_ws_definition'
                        id: 'ee4940c4d5744dcba84e736a3c45d5d1'
                    }
                    rest_cms_v1: {
                        table: 'sys_ws_version'
                        id: '82f2a16a45204f6f87c83d48cfc33854'
                    }
                    seed_cms_admin_grant: {
                        table: 'sys_user_has_role'
                        id: '705f72894c16420797a7de8fdd045ae1'
                        deleted: false
                    }
                    si_content_lifecycle: {
                        table: 'sys_script_include'
                        id: '92985c3f239e4f939e3c186dc644698b'
                    }
                    si_html_sanitizer: {
                        table: 'sys_script_include'
                        id: '3040e2909cfe479488f6d680952b6cf6'
                    }
                    si_public_renderer: {
                        table: 'sys_script_include'
                        id: '64cb740e779b4cad93e04606a78b23cc'
                    }
                    'src_server_atf-lifecycle_script_js': {
                        table: 'sys_module'
                        id: 'd8f6edf5a6e14a0eaa342f19ba975cbc'
                    }
                    'src_server_content-api_js': {
                        table: 'sys_module'
                        id: '9a4273e351e84f44832c7e0d71b8333c'
                    }
                    'src_server_content-item-validation_server_js': {
                        table: 'sys_module'
                        id: 'f43c6686a7ba4b049a8d3c2b85e3b90e'
                    }
                    'src_server_content-item-versioning_server_js': {
                        table: 'sys_module'
                        id: '2db5300d2525441cb4e02d820a36d4e7'
                    }
                    'src_server_content-lifecycle_server_js': {
                        table: 'sys_module'
                        id: '1dfd9c960925494bbc7b051534851549'
                    }
                    'src_server_html-sanitizer_server_js': {
                        table: 'sys_module'
                        id: 'c2fd7ca9de464d03a4b3b37ee4d7ad1d'
                    }
                    'src_server_last-admin-guard_server_js': {
                        table: 'sys_module'
                        id: '68f4e3c6e2da47df85381e25c25cb416'
                    }
                    'src_server_public-content-renderer_server_js': {
                        table: 'sys_module'
                        id: '78fe2d7b8c474a5a8a795c24a2a40b58'
                    }
                    ua_clone: {
                        table: 'sys_ui_action'
                        id: 'be81bcdeee224d87a657e3c90c918b54'
                    }
                    ua_publish: {
                        table: 'sys_ui_action'
                        id: '06f4e896a0f6425b9b8ddf9df1eb1f23'
                    }
                    ua_remove: {
                        table: 'sys_ui_action'
                        id: '0ac3abab52c842c2a3c91c5efef4d08c'
                    }
                    ua_restore: {
                        table: 'sys_ui_action'
                        id: 'd84e85bb37334a53bf27faec1bb87cf4'
                    }
                    ua_unpublish: {
                        table: 'sys_ui_action'
                        id: 'ac6d80a721d44db89cc72763b429ad1f'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '03aa7f7049184fd9890321f574e97465'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'draftable'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '0418dba49b53468d9743a11428d75fff'
                        key: {
                            name: 'x_1863391_cms_now.cms_editor'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0bb566d0d7aa44ccab206a3fef4b9fdf'
                        key: {
                            application_file: '28d3bd453b084db4a83750254c6ada74'
                            source_artifact: '29e46ee119e44572ad52e3634d10ce8a'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0d07339c63ee40269da8103b4fb3fb3f'
                        key: {
                            sys_security_acl: '6a60ee0e6ca14305a3a4cca94808c205'
                            sys_user_role: {
                                id: '18b2ec2f2e4741c4b047dbb71aecae44'
                                key: {
                                    name: 'x_1863391_cms_now.cms_reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0fe53348745d4f97b13669e3f59ccaaa'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'TextField'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1445de4f81094a6e9b9641011fb81b5c'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'priority_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '151a457539724398a1a68fd1adad3475'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'author'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '15337ed2e64e4297b4834abb77474936'
                        key: {
                            sys_security_acl: '8050ad13617c4517aea137d26c565bb2'
                            sys_user_role: {
                                id: '25097d59d4c848f6a93030ca6f3673ca'
                                key: {
                                    name: 'x_1863391_cms_now.cms_moderator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '1562afe3a3534bf88c06a853bb2e4350'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'slug'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '17f6c803df39402daa440641c00cfec0'
                        key: {
                            sys_security_acl: 'bdd3263b25ed474eb691b6d6fc5a92f8'
                            sys_user_role: {
                                id: '8c08e1a3bcf24ddbb6a0f9348b5b49ce'
                                key: {
                                    name: 'x_1863391_cms_now.cms_contributor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18334f6ef699455fa1fe9950e5e36272'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'custom_html'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18378514e7324993ae7512c6220ca690'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '18a840a984684901a4ab3bceaaa35d10'
                        key: {
                            sys_security_acl: '5af30442b5f84a68bbdc3d61963ecf98'
                            sys_user_role: {
                                id: '18b2ec2f2e4741c4b047dbb71aecae44'
                                key: {
                                    name: 'x_1863391_cms_now.cms_reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '18b2ec2f2e4741c4b047dbb71aecae44'
                        key: {
                            name: 'x_1863391_cms_now.cms_reader'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a0cd152339a40259ba749078c885b4d'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'listable'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b57eb137e7a48b88e0d72d158d4d8ef'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'featured_image_path'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c0245898f4846fa8400db34dda8715a'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'author'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1ce3140185f0417687197d2ade25871a'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'state'
                            value: 'Draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d1aa21ff3d44b66abb6a624a1631167'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'slug'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d5454cd223c4bc28f9b0029e1e5b035'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '1e7c9c30874f417d811ed0536f176da2'
                        key: {
                            sys_ui_action: 'be81bcdeee224d87a657e3c90c918b54'
                            sys_user_role: {
                                id: '0418dba49b53468d9743a11428d75fff'
                                key: {
                                    name: 'x_1863391_cms_now.cms_editor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '200c074b13fd4657a9e60345d3856d8e'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '20ae814640e04ef3a55fc1df9701f2c6'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'tags'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '222c2a1856394853a5a9bd989c521376'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '238843b9820b4ebaabfe546ab59770c9'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'state'
                            value: 'Published'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '23fe06cc7cd74a4588a686c5feed08db'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '25097d59d4c848f6a93030ca6f3673ca'
                        key: {
                            name: 'x_1863391_cms_now.cms_moderator'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '28d3bd453b084db4a83750254c6ada74'
                        key: {
                            name: 'x_1863391_cms_now/main'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '29e46ee119e44572ad52e3634d10ce8a'
                        key: {
                            name: 'x_1863391_cms_now_content_editor.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '2ac627675ecf4e1bb7828aa62b8cc77b'
                        key: {
                            endpoint: 'x_1863391_cms_now_public.do'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '2b0326e3eb5847b0ba9ef3249b23f544'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'modified_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '317bd73193c742628d9b84f1f7f92666'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'priority_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '337dbdbfc86143229d7263e908439058'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'securable'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '351ed35a1fb74fc8a1bfba15c8b125a4'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'body_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35452ed530454822bf85b7ac5152f7b1'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'is_system_defined'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '36153bda18e541fea05d11f3b116e2cc'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'securable'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '37b55bb7e18c44a6ba9511d35e72c889'
                        key: {
                            sys_security_acl: '367851c46c70436db249852988873ad6'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3851372080f846929861b927d1158bc3'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '391ab02cb2d145bf93bbfe598d654c31'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Link'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3a6feb8d2372431481593c563fee89fd'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'slug'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c4b044f52f74d64a9a05f334671af65'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'body_text'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c72aefd212e466ea0c7da5bb2da7ed1'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'publication_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3d780968804a43b882ca2e83f659b9e0'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'position'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3e629a49af9e4ea695c607c42e306cd4'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'content_type'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3fd803c028c543deb546e97e9d1f1a2a'
                        key: {
                            sys_security_acl: '51bb2b1fe7c543bf996cf46c4fa628a9'
                            sys_user_role: {
                                id: '18b2ec2f2e4741c4b047dbb71aecae44'
                                key: {
                                    name: 'x_1863391_cms_now.cms_reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '411f58f076f5421985f68acb0c6edbda'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'related_link'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '41ae225450f348289bd8afb9f0f931dc'
                        key: {
                            role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                            contains: {
                                id: 'acd51e7ea2a944aea64373e607c7ac1d'
                                key: {
                                    name: 'x_1863391_cms_now.cms_author'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42e7ea28c4204fe687d65f52c6794dcd'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'is_published'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '432a86328ebd4aa397f5ef765eb79002'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'is_latest'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '43e78e6efb3f4a01beabf6c44d21dd2f'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'created'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '44a5430f996a4f82925f9b0853e93d4c'
                        key: {
                            sys_security_acl: '16f5cf9531044284ba1d99a7ab5d2922'
                            sys_user_role: {
                                id: 'acd51e7ea2a944aea64373e607c7ac1d'
                                key: {
                                    name: 'x_1863391_cms_now.cms_author'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4573058779704a2a89a0aed2ee73cda0'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'featured'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '491e13a3331e4f2091503a2fc7bc00bc'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a585515ae26431b88bb1ac89cac088d'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4bfed1ba183c417bbb10c2dca34cde54'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'related_link'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4ccd3866f8cc4ebba88b40396ed07c5e'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'body_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e20909860bb442bb79ad643932a6a77'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'publication_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f0ad02c05824d0a899bc59a6d8f7de6'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '512e7a0669114734bfeb440b3d8a85d1'
                        key: {
                            endpoint: 'x_1863391_cms_now_content_editor.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '54d472c0d86648729f009c5cb12b23cc'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'content_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '54e12f40f1174df1be5bcbdb77c0dbcc'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Media'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '55d9bc45b9d14470a3ab99091464e517'
                        key: {
                            sys_ui_action: '06f4e896a0f6425b9b8ddf9df1eb1f23'
                            sys_user_role: {
                                id: '0418dba49b53468d9743a11428d75fff'
                                key: {
                                    name: 'x_1863391_cms_now.cms_editor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '56beef3c49b841ce825d01befe35ebba'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'state'
                            value: 'Published'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57209d377bdb481185f67dbf959ef5fe'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Html'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5723073250754221b8db760284c53a02'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'modified_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '58ac4966f2224dacabf40d9116092ab8'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'tags'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '593d7255fe7148f7b8b0731e7ca9234b'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a711fe44b4c451780c9fe1152a8c605'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ad9dc0feb914a1cb720580dc1db28bc'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'content_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5cc8c751c92b4710a4e67b2c0796a03a'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'is_system_defined'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5dee0da7316e4ef1be347883a9337a24'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'state'
                            value: 'Removed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5eea475b438e4c5394c2892bc6692a63'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '616122db4d604f09934e62438fce29f1'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'settings'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '6348363e53b2465fafe652b1598ab3a1'
                        key: {
                            name: 'x_1863391_cms_now/main.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64e48b1dc68747ba9b629da6fe27fcae'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'content_item'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '658c719f8b69460abd07cb81c8408533'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'position'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6591f978aee74c9193aa23860ab06028'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'featured'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '65ad23d2a1724a39a2c26dac2b05062a'
                        key: {
                            sys_ui_action: '0ac3abab52c842c2a3c91c5efef4d08c'
                            sys_user_role: {
                                id: '25097d59d4c848f6a93030ca6f3673ca'
                                key: {
                                    name: 'x_1863391_cms_now.cms_moderator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '65d0c05124af410a9a0bc578ac4821e7'
                        key: {
                            role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                            contains: {
                                id: '0418dba49b53468d9743a11428d75fff'
                                key: {
                                    name: 'x_1863391_cms_now.cms_editor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66a69dc2a08e45a18db4a5d59f0db5c1'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '687af3b617e243c5b6c82d23a2fec808'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'is_published'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '693e8395be124e789a14533ef372d216'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'publication_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6aec9be28bf74a24a1e0ea27b0c17f89'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'is_published'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c9f5eddac674908bf5c1a2256e7532b'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'content_item'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '70f45224ad2044ff83725f79c4c57045'
                        key: {
                            sys_security_acl: 'c38806b2ae894bb0b432e2f307671abe'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73c984e139ee454f90dde79e4d408657'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'slug'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73da82de842b44199d156dc4d94c1ac3'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'settings'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '76e00fadfd8d4169a1005e70e43d956c'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'display_name'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '773fb721fb9f4cf8afe97d0151950d9f'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'content_item_id'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '7827a3f560e1462581baf27dadc3bd7e'
                        key: {
                            name: 'x_1863391_cms_now.cms_api'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '786bbe5cfc5a4b04bc7eac28944d0d67'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'body_text'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '790534b51a80420d886864ee66618b41'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Markdown'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '7b571f5e266445e487702fc33c51a38e'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'author'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7de05f036fc8455e8359c938bc165aa9'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7e27c1f5c9684a369532dd27dc88e732'
                        key: {
                            sys_security_acl: 'a50f322fdcac4ca8af77eef1f68f2d53'
                            sys_user_role: {
                                id: '18b2ec2f2e4741c4b047dbb71aecae44'
                                key: {
                                    name: 'x_1863391_cms_now.cms_reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7eca6573a8144c568d940d0cb51ceea9'
                        key: {
                            sys_security_acl: 'c2080fe6edb44205a9ca68ea6dc698f5'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7f0b2f0d4ce94c1cb386e33f0d7bfcfd'
                        key: {
                            document_key: '4fdadb86e7464bbcbe7b550725be8b45'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8096f668ff4d4c50abf23da7f1427568'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Date'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81de2a0cf2dc44b694a5d183caed27eb'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'publication_date'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '83858a8614e742488271791959ab8bdd'
                        key: {
                            role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                            contains: {
                                id: '8c08e1a3bcf24ddbb6a0f9348b5b49ce'
                                key: {
                                    name: 'x_1863391_cms_now.cms_contributor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '83f1fb70f4014aa2af9f6f1709b3c28a'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'is_latest'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '85ea13f3affc409db07a4f1843afda82'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '862b2419cafc40c68c82ebd8b925c04e'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'related_link'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '874b1ee0d2894f1f8bfd23f3b71b67b0'
                        key: {
                            sys_ui_action: 'ac6d80a721d44db89cc72763b429ad1f'
                            sys_user_role: {
                                id: '0418dba49b53468d9743a11428d75fff'
                                key: {
                                    name: 'x_1863391_cms_now.cms_editor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8807e4c11d7a4f99ab11c479183d4613'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'display_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '887272a9678b4fdd83ace6513d4de6a1'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'content_item_version_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8a471cb0f22e4c96936666c8ef56e728'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '8ac9f7dc0da446809d36a7431684464a'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '8b3cefb9442f43499f583ba2dc98db36'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'is_latest,is_published'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '8beeaa76ca444c3d8e7d726bfe46ff1e'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '8c08e1a3bcf24ddbb6a0f9348b5b49ce'
                        key: {
                            name: 'x_1863391_cms_now.cms_contributor'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8cd74363371d4a7fb9a546f05fd9b563'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'featured'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '8cdfe989cd37460880ceed6f72350a2e'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_field'
                            col_name_string: 'content_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8ed115310566452088937fa77f7642d4'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'ContentPicker'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9019fa26a8b444c6828db7abdae55738'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'content_item_version_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9373be39068542349a253394cc6cd778'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'state'
                            value: 'Draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96ae9170408442dba44eb8ff9b7eaabf'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'priority_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9a3866c274ec4883bd191b60d361537f'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a47127f20b14209a54b2c019f5d94c2'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'draftable'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9b421206ac754479bcd663e6b5e8a242'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a4b754572fd549159a2ed164e035646f'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'CustomBooleanField'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a5914ee4fde449078487e4496a0fe0e1'
                        key: {
                            sys_security_acl: '16f5cf9531044284ba1d99a7ab5d2922'
                            sys_user_role: {
                                id: '8c08e1a3bcf24ddbb6a0f9348b5b49ce'
                                key: {
                                    name: 'x_1863391_cms_now.cms_contributor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a64e11acf7d44d97bb4d974f9182e29c'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'creatable'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a705a37f62364d8fb9b42b4b5be9519c'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a73fe0bab450456a8b90b7abd86d22af'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'priority_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a8abd29e65b94f1d92dfed4cb550ddc0'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'featured'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a969773640514b9eb6b2a4271f9a8d5a'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'featured_image_path'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a999364356a94a5e889ebe3300f39661'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aa3f07555a1d4522ac7552983055962b'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aac71d93f099439d9d7b2cf2e51aa926'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'featured_image_path'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ac71b8444faf411bae749b33353e2e8f'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'acd51e7ea2a944aea64373e607c7ac1d'
                        key: {
                            name: 'x_1863391_cms_now.cms_author'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'ad5e8377ca9241f2bfea6d8b0989e7f3'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_type'
                            col_name_string: 'name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ad7f4294791e4e09bcbf843fa51a4fe7'
                        key: {
                            sys_security_acl: '3a95d552a4944e0ca63d0b771df877d9'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'adee7b709ec54a5d89900e2e7a81c8e0'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'versionable'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aee9320ac4384e99b8c028e7075e38c9'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'b02465da222b463e96c408a33019e231'
                        key: {
                            sys_ui_action: 'd84e85bb37334a53bf27faec1bb87cf4'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b09cbc632a8546578802022ddd919504'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'b1919d774ba94685b5b11e2bcd63cb08'
                        key: {
                            application_file: '512e7a0669114734bfeb440b3d8a85d1'
                            source_artifact: '29e46ee119e44572ad52e3634d10ce8a'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b44b1291e43c4068a1559bc892f5120f'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'created'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b5f38578539546cbaf0e80082e34d320'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b7c829d2b0ca4a6a9253e67bd137e96f'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Numeric'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8d893afa36645f8a763e72b6831df66'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'is_latest'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8de46f9f2a04f1d85940340c8fc70b2'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b904598b6f62420cb2b3319074f7fc91'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'state'
                            value: 'Removed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba5fdaef6ccc4797b8d070f6b445af56'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'versionable'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'bb0b024dc6a646cc9a3644aedb77972e'
                        key: {
                            role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                            contains: {
                                id: '18b2ec2f2e4741c4b047dbb71aecae44'
                                key: {
                                    name: 'x_1863391_cms_now.cms_reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc5562cf34074c8da87885ff907a8b2a'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'listable'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be38e324ec7d4a1aa9f7a05d724a7f1d'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'featured_image_path'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bec2d9361df54fb4b67691a83e4f7842'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'is_latest'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c020f2cc882944a1a89fc1c3483c51f8'
                        key: {
                            sys_security_acl: 'bdd3263b25ed474eb691b6d6fc5a92f8'
                            sys_user_role: {
                                id: '0418dba49b53468d9743a11428d75fff'
                                key: {
                                    name: 'x_1863391_cms_now.cms_editor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2c68325ccd4412f926473efc3902b7b'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'custom_html'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4413af12a5942efaf5ac2aa2669ec22'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'is_published'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c47cc557f90242ce9335a4863dbec0a5'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'version_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c5106677edcc4aeca13135727fd64183'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'Boolean'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c76b62ff29a344b5b08c3878fdc955ed'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'c827dff5fa7349d9a0c0627193db9594'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item_version'
                            col_name_string: 'content_item'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'c86984d3154b4a4f84eb23f15d33fb00'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c8b600e9229a4caa90cb456bf79efbcf'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ca3e5ad44dd241d7856c6a7e4f40763f'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'author'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce4f7878cb7442bca8be0c179e676b92'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'content_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cfc376957dd44fe59df02cf79d86bd9f'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'content_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd50e5fb3465d4f89b551c1a56d124c28'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd60c5fa6b8264d9e837e3289d34e93bb'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd7501a930e8a4655913c3c6f3ba7fed4'
                        key: {
                            sys_security_acl: '114792385bca4543a3f050db59bc2454'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd7b88b9d42414109874db865ab5a1de7'
                        key: {
                            document_key: '4fdadb86e7464bbcbe7b550725be8b45'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd7c17dd0627f42f9baaa3f24dab99fc5'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'content_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd900eadcddd741e6affe88747018048f'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'settings'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd975e9122d4c4947ae9074afc0d04200'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'version_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9bd2bf413934724af46840956284832'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbdb02bb066a496e992615418d2f9737'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'settings'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'de87ef3610ea448bb392a8c7fcd17d71'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df27837101554a8d9810153eba949264'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'author'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e2532d16f3734ad3bfc826960f9ff33a'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'custom_html'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'e3269944b6124051b3cde0bd635e5c8e'
                        key: {
                            name: 'x_1863391_cms_now.cms_admin'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: 'e399275c477e47b090a4acb0ddc267de'
                        key: {
                            test_suite: '7e1744eb78cc49d3ac74bdfe2c14241f'
                            test: 'eadfef9df52f4ce3bbf8f967828939b3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e4e3ef2f8836457ebf5e4e36f70ba0ab'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'content_item_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e51f7bbdaedf4424a91fb68299c5355a'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'modified_date'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'e5dc1dd3d5ff4688abab0568748554bd'
                        key: {
                            logical_table_name: 'x_1863391_cms_now_content_item'
                            col_name_string: 'content_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e7942b123006425a8790244b5e92bf08'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'e7c6eb683dd24a3589b02dac716f0d28'
                        key: {
                            application_file: '6348363e53b2465fafe652b1598ab3a1'
                            source_artifact: '29e46ee119e44572ad52e3634d10ce8a'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e825d628a8704945b861a0c4afd2add4'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'tags'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e9c251177ced4e3c95dbfdfedee484b7'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'slug'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f3218f920ec64d52882f9866259db994'
                        key: {
                            name: 'x_1863391_cms_now_content_type'
                            element: 'creatable'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f36944987a92413382e3473a58c40ad0'
                        key: {
                            sys_security_acl: '6d8accaebe914ad5be1233c01eff5fc4'
                            sys_user_role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f5d13e0dc7814193843c50e7839d505d'
                        key: {
                            name: 'x_1863391_cms_now_content_field'
                            element: 'field_type'
                            value: 'DateField'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f6463dc0de20474f93fe9c5f46c61d6d'
                        key: {
                            sys_security_acl: 'bdd3263b25ed474eb691b6d6fc5a92f8'
                            sys_user_role: {
                                id: 'acd51e7ea2a944aea64373e607c7ac1d'
                                key: {
                                    name: 'x_1863391_cms_now.cms_author'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6f5456dd00e40e18c4436952044d59d'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'content_item_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f816210320774d2ab9b7fd9f0f1a3733'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'tags'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'f83f2a9efc8347f3a171c4b35bc35f44'
                        key: {
                            role: {
                                id: 'e3269944b6124051b3cde0bd635e5c8e'
                                key: {
                                    name: 'x_1863391_cms_now.cms_admin'
                                }
                            }
                            contains: {
                                id: '25097d59d4c848f6a93030ca6f3673ca'
                                key: {
                                    name: 'x_1863391_cms_now.cms_moderator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f969aa1681b349c693ea2816e0012dd6'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'fb6fb8bfa77a4c26869d0ede7843b2a0'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fbb4a2fc76bd405dae7726051dde5221'
                        key: {
                            name: 'x_1863391_cms_now_content_item_version'
                            element: 'related_link'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fcf7fb6f28af434d9112ca306248c781'
                        key: {
                            sys_security_acl: '16f5cf9531044284ba1d99a7ab5d2922'
                            sys_user_role: {
                                id: '0418dba49b53468d9743a11428d75fff'
                                key: {
                                    name: 'x_1863391_cms_now.cms_editor'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fd5085cf15414bf5a20f27717b9799f6'
                        key: {
                            sys_security_acl: '69b6cd52ad2e433db1e1ef6b35451a1c'
                            sys_user_role: {
                                id: 'd7592686668a4c20b5b1856c41eb909c'
                                key: {
                                    name: 'public'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff687ba99095414bb3a329f4f64fd418'
                        key: {
                            name: 'x_1863391_cms_now_content_item'
                            element: 'custom_html'
                        }
                    },
                ]
            }
        }
    }
}
