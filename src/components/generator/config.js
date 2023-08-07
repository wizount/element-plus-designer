// 表单属性【右面板】
export const designConf = {
    unFocusedComponentBorder: true,
    wrapWithCol:true,//生成组件包含col
}

// 输入型组件 【左面板】
export const inputComponents = [
    {
        // 组件的自定义配置
        __id__: 'singleInput',
        __config__: {
            name: '单行文本',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'formItem',
            regList: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/input.html',
            // 正则校验规则
        },
        // 组件的插槽属性
        __slot__: {
            prepend: '',
            append: '',
        },
        __props__: {style: {width: '100%'}}
    },
    {
        __id__: 'multipleInput',
        __config__: {
            name: '多行文本',
            labelWidth: null,
            showLabel: true,
            tag: 'el-input',
            tagIcon: 'textarea',
            defaultValue: undefined,
            required: true,
            layout: 'formItem',
            changeTag: true,
            regList: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/input.html',
        },
        __props__: {
            type: 'textarea',
            style: {width: '100%'}
        }

    },
    {
        __id__: 'passwordInput',
        __config__: {
            name: '密码',
            showLabel: true,
            labelWidth: null,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'password',
            defaultValue: undefined,
            layout: 'formItem',
            required: true,
            regList: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/input.html',
        },
        __slot__: {
            prepend: '',
            append: '',
        },
        __props__: {
            'show-password': true,
            style: {width: '100%'},
            clearable: true
        }
    },
    {
        __id__: 'input-number',
        __config__: {
            name: '计数器',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            tag: 'el-input-number',
            tagIcon: 'number',
            defaultValue: undefined,
            layout: 'formItem',
            required: true,
            regList: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/input-number.html',
        },
        __props__: {
            min: 0,
            max: 100,
            step: 1,
        }

    },
    // {
    //     __config__: {
    //         name: '编辑器',
    //         showLabel: true,
    //         changeTag: true,
    //         labelWidth: null,
    //         tag: 'tinymce',
    //         tagIcon: 'rich-text',
    //         defaultValue: null,
    //         layout: 'formItem',
    //         required: true,
    //         document: 'http://tinymce.ax-z.cn',
    //     },
    //     __props__: {
    //         height: 300, // 编辑器高度
    //         branding: false, // 隐藏右下角品牌烙印
    //     }
    //
    // },
]

// 选择型组件 【左面板】
export const selectComponents = [
    {
        __id__: 'select',
        __config__: {
            name: '下拉选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            layout: 'formItem',
            defaultValue: '',
            required: true,
            changeTag: true,
            regList: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/select.html',
        },
        __slot__: {
            options: [
                {
                    label: '选项一',
                    value: 1,
                },
                {
                    label: '选项二',
                    value: 2,
                },
            ],
        },
        __props__: {
            style: {width: '100%'},
        }

    },
    {
        __id__: 'select-v2',
        __config__: {
            name: '虚拟选择器',
            showLabel: true,
            labelWidth: null,
            tag: 'el-select-v2',
            tagIcon: 'select',
            layout: 'formItem',
            defaultValue: '',
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/select-v2.html',
        },
        __props__: {
            style: {width: '100%'},
        }
    },
    {
        __id__: 'cascader',
        __config__: {
            name: '级联选择',
            url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
            method: 'get',
            dataPath: 'list',
            dataConsumer: 'options',
            showLabel: true,
            labelWidth: null,
            tag: 'el-cascader',
            tagIcon: 'cascader',
            layout: 'formItem',
            defaultValue: [],
            dataType: 'dynamic',
            required: true,
            changeTag: true,
            regList: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/cascader.html',
        },
        options: [
            {
                id: 1,
                value: 1,
                label: '选项1',
                children: [
                    {
                        id: 2,
                        value: 2,
                        label: '选项1-1',
                    },
                ],
            },
        ],
        __props__: {
            style: {width: '100%'},
            props: {
                props: {
                    multiple: false,
                    label: 'label',
                    value: 'value',
                    children: 'children',
                },
            },
        }

    },
    {
        __id__: 'radio-group',
        __config__: {
            name: '单选框组',
            labelWidth: null,
            showLabel: true,
            tag: 'el-radio-group',
            tagIcon: 'radio',
            changeTag: true,
            defaultValue: undefined,
            layout: 'formItem',
            optionType: 'default',
            required: true,
            border: false,
            document: 'https://element-plus.gitee.io/zh-CN/component/radio.html',
        },
        __slot__: {
            options: [
                {
                    label: '选项一',
                    value: 1,
                },
                {
                    label: '选项二',
                    value: 2,
                },
            ],
        },
        __props__: {}

    },
    {
        __id__: 'checkbox-group',
        __config__: {
            name: '多选框组',
            tag: 'el-checkbox-group',
            tagIcon: 'checkbox',
            defaultValue: [],
            showLabel: true,
            labelWidth: null,
            layout: 'formItem',
            optionType: 'default',
            required: true,
            changeTag: true,
            border: false,
            document: 'https://element-plus.gitee.io/zh-CN/component/checkbox.html',
        },
        __slot__: {
            options: [
                {
                    label: '选项一',
                    value: 1,
                },
                {
                    label: '选项二',
                    value: 2,
                },
            ],
        },
        __props__: {}

    },
    {
        __id__: 'switch',
        __config__: {
            name: '开关',
            tag: 'el-switch',
            tagIcon: 'switch',
            defaultValue: false,
            showLabel: true,
            labelWidth: null,
            layout: 'formItem',
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/switch.html',
        },
        __props__: {}
    },
    {
        __id__: 'slider',
        __config__: {
            name: '滑块',
            tag: 'el-slider',
            tagIcon: 'slider',
            defaultValue: null,
            showLabel: true,
            layout: 'formItem',
            labelWidth: null,
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/slider.html',
        },
        __props__: {}
    },
    {
        __id__: 'time-picker',
        __config__: {
            name: '时间选择',
            tag: 'el-time-picker',
            tagIcon: 'time',
            defaultValue: null,
            showLabel: true,
            layout: 'formItem',
            labelWidth: null,
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/time-picker.html',
        },
        __props__: {
            style: {width: '100%'},
        }

    },
    {
        __id__: 'date-picker',
        __config__: {
            name: '日期选择',
            tag: 'el-date-picker',
            tagIcon: 'date',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            layout: 'formItem',
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/date-picker.html',
        },
        __props__: {
            style: {width: '100%'},
        }

    },
    {
        __id__: 'datetime-picker',
        __config__: {
            name: '日期选择',
            tag: 'el-date-picker',
            tagIcon: 'date',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            layout: 'formItem',
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/datetime-picker.html',
        },
        __props__: {
            type:'dateTime',
            style: {width: '100%'},
        }

    },

    {
        __id__: 'rate',
        __config__: {
            name: '评分',
            tag: 'el-rate',
            tagIcon: 'rate',
            defaultValue: 0,
            showLabel: true,
            labelWidth: null,
            layout: 'formItem',
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/rate.html',
        },
        __props__: {}
    },
    {
        __id__: 'color-picker',
        __config__: {
            name: '颜色选择',
            tag: 'el-color-picker',
            tagIcon: 'color',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            layout: 'formItem',
            required: true,
            changeTag: true,
            document: 'https://element-plus.gitee.io/zh-CN/component/color-picker.html',
        },
        __props__: {}
    },
    {
        __id__: 'upload',
        __config__: {
            name: '上传',
            tag: 'el-upload',
            tagIcon: 'upload',
            layout: 'formItem',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            required: true,
            showTip: false,
            buttonText: '点击上传',
            changeTag: true,
            fileSize: 2,
            limit: undefined,
            sizeUnit: 'MB',
            document: 'https://element-plus.gitee.io/zh-CN/component/upload.html',
        },
        __slot__: {
            'list-type': true,
        },
        __props__: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            disabled: false,
            accept: '',
            name: 'file',
            'auto-upload': true,
            'list-type': 'text',
            multiple: false,
        }
    },
]

// 布局型组件 【左面板】
export const layoutComponents = [

    {
        __id__: 'row',
        __config__: {
            name: '行容器',
            tag: 'el-row',
            tagIcon: 'row',
            layout: 'containerItem',
            document:
                'https://element-plus.gitee.io/zh-CN/component/layout.html',
        },
        __props__: {}
    },
    {
        __id__: 'col',
        __config__: {
            name: '列容器',
            tag: 'el-col',
            tagIcon: 'col',
            layout: 'containerItem',
            document:
                'https://element-plus.gitee.io/zh-CN/component/layout.html',
        },
        __props__: {}
    },
    {
        __id__: 'button',
        __config__: {
            name: '按钮',
            tag: 'el-button',
            tagIcon: 'button',
            layout: 'rawItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/button.html',
        },
        __slot__: {
            default: '主要按钮',
        },
        __props__: {
            type: 'primary',
            icon: 'Search',
        }
    },
    {
        __id__: 'form',
        __config__: {
            name: '表单',
            tag: 'el-form',
            tagIcon: 'form',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/form.html',
        },
        __props__: {
            rules: 'rules'
        }
    },
    {
        __id__: 'badge',
        __config__: {
            name: '徽章',
            tag: 'el-badge',
            tagIcon: 'badge',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/badge.html',
        },
        __props__: {}
    },
    {
        __id__: 'container',
        __config__: {
            name: '外层容器',
            tag: 'el-container',
            tagIcon: 'container',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/container.html',
        }
    },
    {
        __id__: 'header',
        __config__: {
            name: '顶栏容器',
            tag: 'el-header',
            tagIcon: 'header',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/container.html',
        }
    },
    {
        __id__: 'aside',
        __config__: {
            name: '侧边栏容器',
            tag: 'el-aside',
            tagIcon: 'aside',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/container.html',
        }
    },
    {
        __id__: 'main',
        __config__: {
            name: '主要区域容器',
            tag: 'el-main',
            tagIcon: 'main',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/container.html',
        }
    },
    {
        __id__: 'footer',
        __config__: {
            name: '底栏容器',
            tag: 'el-footer',
            tagIcon: 'footer',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/container.html',
        }
    },
    {
        __id__: 'scrollbar',
        __config__: {
            name: '滚动条',
            tag: 'el-scrollbar',
            tagIcon: 'scrollbar',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/scrollbar.html',
        }
    },
    {
        __id__: 'space',
        __config__: {
            name: '间距',
            tag: 'el-space',
            tagIcon: 'space',
            layout: 'containerItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/space.html',
        }
    }
]
// 展示组件 【左面板】
export const rawComponents = [
    {
        __id__: 'avatar',
        __config__: {
            layout: 'rawItem',
            name: '头像',
            tag: 'el-avatar',
            tagIcon: 'avatar',
            document: 'https://element-plus.gitee.io/zh-CN/component/avatar.html',
        },
        __props__: {
            icon: 'Avatar'
        }
    },
    {
        __id__: 'tag',
        __config__: {
            layout: 'rawItem',
            name: '标签',
            tag: 'el-tag',
            tagIcon: 'tag',
            document: 'https://element-plus.gitee.io/zh-CN/component/tag.html',
        },
        __slot__: {
            default: '标签',
        },
        __props__: {}
    },
    {
        __id__: 'link',
        __config__: {
            layout: 'rawItem',
            name: '链接',
            tag: 'el-link',
            tagIcon: 'link',
            document: 'https://element-plus.gitee.io/zh-CN/component/tag.html',
        },
        __slot__: {
            default: 'link',
        },
        __props__: {}
    },
    {
        __id__: 'empty',
        __config__: {
            layout: 'rawItem',
            name: '空状态',
            tag: 'el-empty',
            tagIcon: 'empty',
            document: 'https://element-plus.gitee.io/zh-CN/component/empty.html',
        },
        __props__: {}
    },
    {
        __id__: 'progress',
        __config__: {
            layout: 'rawItem',
            name: '进度条',
            tag: 'el-progress',
            tagIcon: 'progress',
            document: 'https://element-plus.gitee.io/zh-CN/component/progress.html',
        },
        __props__: {}
    },
    {
        __id__: 'result',
        __config__: {
            layout: 'rawItem',
            name: '结果',
            tag: 'el-result',
            tagIcon: 'button',
            document: 'https://element-plus.gitee.io/zh-CN/component/result.html',
        },
        __props__: {}
    },
    {
        __id__: 'alert',
        __config__: {
            layout: 'rawItem',
            name: '提示',
            tag: 'el-alert',
            tagIcon: 'alert',
            document: 'https://element-plus.gitee.io/zh-CN/component/result.html',
        },
        __props__: {}
    },
    {
        __id__: 'divider',
        __config__: {
            layout: 'rawItem',
            name: '分割线',
            tag: 'el-divider',
            tagIcon: 'divider',
            document: 'https://element-plus.gitee.io/zh-CN/component/divider.html',
        },
        __props__: {}
    },
    {
        __id__: 'transfer',
        __config__: {
            layout: 'rawItem',
            name: '穿梭框',
            tag: 'el-transfer',
            tagIcon: 'transfer',
            defaultValue: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/transfer.html',
        },
        __props__: {}
    },
    {
        __id__: 'pagination',
        __config__: {
            layout: 'rawItem',
            name: '分页',
            tag: 'el-pagination',
            tagIcon: 'pagination',
            defaultValue: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/pagination.html',
        },
        __props__: {
            total: 1000
        }
    },
    {
        __id__: 'calendar',
        __config__: {
            layout: 'rawItem',
            name: '日历',
            tag: 'el-calendar',
            tagIcon: 'calendar',
            document: 'https://element-plus.gitee.io/zh-CN/component/calendar.html',
        }
    },
    {
        __id__: 'skeleton',
        __config__: {
            layout: 'rawItem',
            name: '骨架',
            tag: 'el-skeleton',
            tagIcon: 'skeleton',
            document: 'https://element-plus.gitee.io/zh-CN/component/skeleton.html',
        },
        __props__: {
            loading: true //fixme 不使用loading 显示不出来，不知道为什么
        }
    },
    {
        __id__: 'popconfirm',
        __config__: {
            layout: 'rawItem',
            name: '气泡确认框',
            tag: 'el-popconfirm',
            tagIcon: 'popconfirm',
            document: 'https://element-plus.gitee.io/zh-CN/component/popconfirm.html',
        },
        __slot__: {
            reference: '删除'
        },
        __props__: {
            title:'是否确认删除？'
        }
    },
    {
        __id__: 'popover',
        __config__: {
            layout: 'rawItem',
            name: '弹出框',
            tag: 'el-popover',
            tagIcon: 'popover',
            document: 'https://element-plus.gitee.io/zh-CN/component/popover.html',
        },
        __slot__: {
            reference: '打开'
        },
        __props__: {
            title:'气泡卡片',
            content:'显示内容'
        }
    },
    {
        __id__: 'tooltip',
        __config__: {
            layout: 'rawItem',
            name: '文字提示',
            tag: 'el-tooltip',
            tagIcon: 'tooltip',
            document: 'https://element-plus.gitee.io/zh-CN/component/tooltip.html',
        },
        __slot__: {
            default: '文字提示'
        },
        __props__: {
            content:'文字提示内容'
        }
    },
]


export const childComponents = [//这些组件都必须有相应的子元素
    {
        __id__: 'steps',
        __config__: {
            name: '步骤条',
            tag: 'el-steps',
            tagIcon: 'steps',
            layout: 'containerItem',
            childTag: 'el-step',//相应的子元素
            document: 'https://element-plus.gitee.io/zh-CN/component/steps.html',
        },
    },
    {
        __id__: 'step',
        __config__: {
            name: '步骤',
            tag: 'el-step',
            tagIcon: 'step',
            parentTag: 'el-steps',
            layout: 'rawItem',
            document: 'https://element-plus.gitee.io/zh-CN/component/steps.html',
        },
    },
    {
        __id__: 'tabs',
        __config__: {
            name: '标签页',
            tag: 'el-tabs',
            tagIcon: 'tabs',
            layout: 'containerItem',
            childTag: 'el-tab-pane',//相应的子元素
            document: 'https://element-plus.gitee.io/zh-CN/component/tabs.html',
        }
    },
    {
        __id__: 'tab-pane',
        __config__: {
            name: '标签页',
            tag: 'el-tab-pane',
            tagIcon: 'tab-pane',
            layout: 'containerItem',
            parentTag: 'el-tabs',
            document: 'https://element-plus.gitee.io/zh-CN/component/tabs.html',
        }
    },
    {
        __id__: 'collapse',
        __config__: {
            name: '折叠面板',
            tag: 'el-collapse',
            tagIcon: 'collapse',
            layout: 'containerItem',
            childTag: 'el-collapse-item',//相应的子元素
            document: 'https://element-plus.gitee.io/zh-CN/component/collapse.html',
        }
    },
    {
        __id__: 'collapse-item',
        __config__: {
            name: '折叠面板子项',
            tag: 'el-collapse-item',
            tagIcon: 'collapse-item',
            layout: 'containerItem',
            parentTag: 'el-collapse',
            document: 'https://element-plus.gitee.io/zh-CN/component/collapse.html',
        }
    },
    {
        __id__: 'carousel',
        __config__: {
            name: '走马灯',
            tag: 'el-carousel',
            tagIcon: 'carousel',
            layout: 'containerItem',
            childTag: 'el-carousel-item',//相应的子元素
            document: 'https://element-plus.gitee.io/zh-CN/component/carousel.html',
        }
    },
    {
        __id__: 'carousel-item',
        __config__: {
            name: '走马灯子项',
            tag: 'el-carousel-item',
            tagIcon: 'carousel-item',
            layout: 'containerItem',
            parentTag: 'el-carousel',
            document: 'https://element-plus.gitee.io/zh-CN/component/carousel.html',
        }
    },
    {
        __id__: 'breadcrumb',
        __config__: {
            name: '面包屑',
            tag: 'el-breadcrumb',
            tagIcon: 'breadcrumb',
            layout: 'containerItem',
            childTag: 'el-breadcrumb-item',//相应的子元素
            document: 'https://element-plus.gitee.io/zh-CN/component/breadcrumb.html',
        }
    },
    {
        __id__: 'breadcrumb-item',
        __config__: {
            name: '面包屑子项',
            tag: 'el-breadcrumb-item',
            tagIcon: 'breadcrumb-item',
            layout: 'rawItem',
            parentTag: 'el-breadcrumb',
            document: 'https://element-plus.gitee.io/zh-CN/component/breadcrumb.html',
        },
        __slot__: {
            default: 'breadcrumb-item',
        },
    },
    //fixme vuedraggle for vue3 componentData 只能插入属性和方法，不能插入slot，比如el-sub-menu又有slot又有children {
    //     __id__: 'menu',
    //     __config__: {
    //         name: '菜单',
    //         tag: 'el-menu',
    //         tagIcon: 'menu',
    //         layout: 'containerItem',
    //         childTag: 'el-menu-item',//相应的子元素
    //         document: 'https://element-plus.gitee.io/zh-CN/component/menu.html',
    //     }
    // },
    // {
    //     __id__: 'sub-menu',
    //     __config__: {
    //         name: '子菜单',
    //         tag: 'el-sub-menu',
    //         tagIcon: 'sub-menu',
    //         layout: 'containerItem',
    //         document: 'https://element-plus.gitee.io/zh-CN/component/menu.html',
    //     },
    //     __slot__: {
    //         title: 'sub-menu',
    //     },
    // },
    // {
    //     __id__: 'menu-item-group',
    //     __config__: {
    //         name: '菜单组',
    //         tag: 'el-menu-item-group',
    //         tagIcon: 'menu-item-group',
    //         layout: 'containerItem',
    //         document: 'https://element-plus.gitee.io/zh-CN/component/menu.html',
    //     }
    // },
    // {
    //     __id__: 'menu-item',
    //     __config__: {
    //         name: '菜单项',
    //         tag: 'el-menu-item',
    //         tagIcon: 'menu-item',
    //         layout: 'rawItem',
    //         document: 'https://element-plus.gitee.io/zh-CN/component/menu.html',
    //     },
    //     __slot__: {
    //         default: 'menu-item',
    //     },
    // },
    {
        __id__: 'timeline',
        __config__: {
            name: '时间线',
            tag: 'el-timeline',
            tagIcon: 'timeline',
            layout: 'containerItem',
            childTag: 'el-timeline-item',//相应的子元素
            document: 'https://element-plus.gitee.io/zh-CN/component/timeline.html',
        }
    },
    {
        __id__: 'timeline-item',
        __config__: {
            name: '时间线子项',
            tag: 'el-timeline-item',
            tagIcon: 'timeline-item',
            layout: 'rawItem',
            parentTag: 'el-timeline',
            document: 'https://element-plus.gitee.io/zh-CN/component/timeline.html',
        },
        __slot__: {
            default: 'timeline-item',
        },
    },
    // {
    //     __id__: 'descriptions',
    //     __config__: {
    //         name: '描述列表',
    //         tag: 'el-descriptions',
    //         tagIcon: 'descriptions',
    //         layout: 'containerItem',
    //         childTag: 'el-descriptions-item',//相应的子元素
    //         document: 'https://element-plus.gitee.io/zh-CN/component/descriptions.html',
    //     }
    // },
    // {
    //     __id__: 'descriptions-item',
    //     __config__: {
    //         name: '描述列表子项',
    //         tag: 'el-descriptions-item',
    //         tagIcon: 'descriptions-item',
    //         layout: 'rawItem',
    //         parentTag: 'el-descriptions',
    //         document: 'https://element-plus.gitee.io/zh-CN/component/descriptions.html',
    //     },
    //     __slot__: {
    //         default: 'descriptions-item',
    //     },
    // },
    {
        __id__: 'table',
        __config__: {
            layout: 'containerItem',
            name: '表格',
            tag: 'el-table',
            tagIcon: 'table',
            childTag: 'el-table-column',
            defaultValue: [],
            document: 'https://element-plus.gitee.io/zh-CN/component/table.html',
        },
        __props__: {
            data: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-08',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-06',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-07',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                }]
        }
    },
    {
        __id__: 'table-column',
        __config__: {
            name: '表格子项',
            tag: 'el-table-column',
            tagIcon: 'table-column',
            layout: 'rawItem',
            parentTag: 'el-table',
            document: 'https://element-plus.gitee.io/zh-CN/component/table.html',
        }
    }
]
export const htmlComponents = [
    {
        __id__: 'h1',
        __config__: {
            layout: 'containerItem',
            name: '标题(h1)',
            tag: 'h1',
            tagIcon: 'h1',
        },
    },
    {
        __id__: 'h2',
        __config__: {
            layout: 'containerItem',
            name: '标题(h2)',
            tag: 'h2',
            tagIcon: 'h2',
        },
    },
    {
        __id__: 'flex-box',
        __config__: {
            name: 'Flex Box',
            tag: 'div',
            tagIcon: 'div',
            layout: 'containerItem'
        },
        __props__: {
            style: {
                display: 'flex',
                minHeight: '60px'
            }
        }

    },
    {
        __id__: 'text',
        __config__: {
            name: '文字',
            tag: 'span',
            tagIcon: 'text',
            layout: 'rawItem',
        },
        __slot__: {
            default: '文字',
        },
    },

]
