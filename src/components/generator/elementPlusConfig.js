export const elementPlusComponents = [
    {
        children: [
            {
                name: "Button 按钮",
                key: "button",
                children: [
                    {
                        __id__: "button",
                        __config__: {
                            name: "按钮",
                            tag: "el-button",
                            tagIcon: "button",
                            layout: "rawItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/button.html"
                        },
                        __slot__: {
                            default: "按钮"
                        },
                    },
                    {
                        __id__: "button-group",
                        __config__: {
                            name: "按钮组",
                            tag: "el-button-group",
                            tagIcon: "button",
                            layout: "containerItem",
                            childTag: ["el-button"],
                            document: "https://element-plus.gitee.io/zh-CN/component/button.html"
                        },
                    }
                ]
            },
            {
                name: "Border 边框",
                key: "border",
                children: []
            },
            {
                name: "Container 布局容器",
                key: "container",
                children: [
                    {
                        __id__: "container",
                        __config__: {
                            name: "外层容器",
                            tag: "el-container",
                            tagIcon: "container",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/container.html"
                        }
                    },
                    {
                        __id__: "header",
                        __config__: {
                            name: "顶栏容器",
                            tag: "el-header",
                            tagIcon: "header",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/container.html"
                        }
                    },
                    {
                        __id__: "aside",
                        __config__: {
                            name: "侧边栏容器",
                            tag: "el-aside",
                            tagIcon: "aside",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/container.html"
                        }
                    },
                    {
                        __id__: "main",
                        __config__: {
                            name: "主要区域容器",
                            tag: "el-main",
                            tagIcon: "main",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/container.html"
                        }
                    },
                    {
                        __id__: "footer",
                        __config__: {
                            name: "底栏容器",
                            tag: "el-footer",
                            tagIcon: "footer",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/container.html"
                        }
                    }
                ]
            },
            {
                name: "Icon 图标",
                key: "icon",
                children: []
            },
            {
                name: "Layout 布局",
                key: "layout",
                children: [
                    {
                        __id__: "row",
                        __config__: {
                            name: "行容器",
                            tag: "el-row",
                            tagIcon: "row",
                            childTag: ["el-col"],
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/layout.html"
                        },
                        __props__: {}
                    },
                    {
                        __id__: "col",
                        __config__: {
                            name: "列容器",
                            tag: "el-col",
                            tagIcon: "col",
                            parentTag: ["el-row"],
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/layout.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Link 链接",
                key: "link",
                children: [
                    {
                        __id__: "link",
                        __config__: {
                            layout: "rawItem",
                            name: "链接",
                            tag: "el-link",
                            tagIcon: "link",
                            document: "https://element-plus.gitee.io/zh-CN/component/link.html"
                        },
                        __slot__: {
                            default: "link"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Text 文本",
                key: "text",
                children: [
                    {
                        __id__: "text",
                        __config__: {
                            layout: "rawItem",
                            name: "文本",
                            tag: "el-text",
                            tagIcon: "text",
                            document: "https://element-plus.gitee.io/zh-CN/component/text.html"
                        },
                        __slot__: {
                            default: "text"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Scrollbar 滚动条",
                key: "scrollbar",
                children: [
                    {
                        __id__: "scrollbar",
                        __config__: {
                            name: "滚动条",
                            tag: "el-scrollbar",
                            tagIcon: "scrollbar",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/scrollbar.html"
                        }
                    }
                ]
            },
            {
                name: "Space 间距",
                key: "space",
                children: [
                    {
                        __id__: "space",
                        __config__: {
                            name: "间距",
                            tag: "el-space",
                            tagIcon: "space",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/space.html"
                        }
                    }
                ]
            },
            {
                name: "Typography 排版",
                key: "typography",
                children: []
            }
        ],
        title: "Basic 基础组件"
    },
    // {
    //     children: [
    //         {
    //             name: "Config Provider 全局配置",
    //             key: "config-provider",
    //             children: []
    //         }
    //     ],
    //     title: "配置组件"
    // },
    {
        children: [
            {
                name: "Form 表单",
                key: "form",
                children: [
                    {
                        __id__: "form",
                        __config__: {
                            name: "表单",
                            tag: "el-form",
                            tagIcon: "form",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/form.html"
                        },
                        __props__: {
                            rules: "rules"
                        }
                    },
                    {
                        __id__: "form-item",
                        __config__: {
                            name: "表单项",
                            tag: "el-form-item",
                            tagIcon: "form",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/form.html"
                        },
                        __props__: {
                            rules: "rules"
                        }
                    }
                ]
            },
            {
                name: "Autocomplete 自动补全输入框",
                key: "autocomplete",
                children: []
            },
            {
                name: "Cascader 级联选择器",
                key: "cascader",
                children: [
                    {
                        __id__: "cascader",
                        __config__: {
                            name: "级联选择",
                            url: "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList",
                            method: "get",
                            dataPath: "list",
                            dataConsumer: "options",
                            showLabel: true,
                            labelWidth: null,
                            tag: "el-cascader",
                            tagIcon: "cascader",
                            layout: "formItem",
                            defaultValue: [],
                            dataType: "dynamic",
                            required: true,
                            changeTag: true,
                            regList: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/cascader.html"
                        },
                        options: [
                            {
                                id: 1,
                                value: 1,
                                label: "选项1",
                                children: [
                                    {
                                        id: 2,
                                        value: 2,
                                        label: "选项1-1"
                                    }
                                ]
                            }
                        ],
                        __props__: {
                            style: {
                                width: "100%"
                            },
                            props: {
                                props: {
                                    multiple: false,
                                    label: "label",
                                    value: "value",
                                    children: "children"
                                }
                            }
                        }
                    }
                ]
            },
            {
                name: "Checkbox 多选框",
                key: "checkbox",
                children: [
                    {
                        __id__: "checkbox-group",
                        __config__: {
                            name: "多选框组",
                            tag: "el-checkbox-group",
                            tagIcon: "checkbox",
                            defaultValue: [],
                            showLabel: true,
                            labelWidth: null,
                            layout: "formItem",
                            optionType: "default",
                            required: true,
                            changeTag: true,
                            border: false,
                            document: "https://element-plus.gitee.io/zh-CN/component/checkbox.html"
                        },
                        __slot__: {
                            options: [
                                {
                                    label: "选项一",
                                    value: 1
                                },
                                {
                                    label: "选项二",
                                    value: 2
                                }
                            ]
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Color Picker 取色器",
                key: "color-picker",
                children: [
                    {
                        __id__: "color-picker",
                        __config__: {
                            name: "颜色选择",
                            tag: "el-color-picker",
                            tagIcon: "color",
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            layout: "formItem",
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/color-picker.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Date Picker 日期选择器",
                key: "date-picker",
                children: [
                    {
                        __id__: "date-picker",
                        __config__: {
                            name: "日期选择",
                            tag: "el-date-picker",
                            tagIcon: "date",
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            layout: "formItem",
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/date-picker.html"
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            }
                        }
                    }
                ]
            },
            {
                name: "DateTime Picker 日期时间选择器",
                key: "datetime-picker",
                children: []
            },
            {
                name: "Input 输入框",
                key: "input",
                children: [
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
                        __id__: "passwordInput",
                        __config__: {
                            name: "密码",
                            showLabel: true,
                            labelWidth: null,
                            changeTag: true,
                            tag: "el-input",
                            tagIcon: "password",
                            layout: "formItem",
                            required: true,
                            regList: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/input.html"
                        },
                        __slot__: {
                            prepend: "",
                            append: ""
                        },
                        __props__: {
                            "show-password": true,
                            style: {
                                width: "100%"
                            },
                            clearable: true
                        }
                    }
                ]
            },
            {
                name: "Input Number 数字输入框",
                key: "input-number",
                children: [
                    {
                        __id__: "input-number",
                        __config__: {
                            name: "计数器",
                            showLabel: true,
                            changeTag: true,
                            labelWidth: null,
                            tag: "el-input-number",
                            tagIcon: "number",
                            layout: "formItem",
                            required: true,
                            regList: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/input-number.html"
                        },
                        __props__: {
                            min: 0,
                            max: 100,
                            step: 1
                        }
                    }
                ]
            },
            {
                name: "Radio 单选框",
                key: "radio",
                children: [
                    {
                        __id__: "radio-group",
                        __config__: {
                            name: "单选框组",
                            labelWidth: null,
                            showLabel: true,
                            tag: "el-radio-group",
                            tagIcon: "radio",
                            changeTag: true,
                            layout: "formItem",
                            optionType: "default",
                            required: true,
                            border: false,
                            document: "https://element-plus.gitee.io/zh-CN/component/radio.html"
                        },
                        __slot__: {
                            options: [
                                {
                                    label: "选项一",
                                    value: 1
                                },
                                {
                                    label: "选项二",
                                    value: 2
                                }
                            ]
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Rate 评分",
                key: "rate",
                children: [
                    {
                        __id__: "rate",
                        __config__: {
                            name: "评分",
                            tag: "el-rate",
                            tagIcon: "rate",
                            defaultValue: 0,
                            showLabel: true,
                            labelWidth: null,
                            layout: "formItem",
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/rate.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Select 选择器",
                key: "select",
                children: [
                    {
                        __id__: "select",
                        __config__: {
                            name: "下拉选择",
                            showLabel: true,
                            labelWidth: null,
                            tag: "el-select",
                            tagIcon: "select",
                            layout: "formItem",
                            defaultValue: "",
                            required: true,
                            changeTag: true,
                            regList: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/select.html"
                        },
                        __slot__: {
                            options: [
                                {
                                    label: "选项一",
                                    value: "1"
                                },
                                {
                                    label: "选项二",
                                    value: "2"
                                }
                            ]
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            }
                        }
                    },
                ]
            },
            {
                name: "Virtualized Select 虚拟化选择器",
                key: "select-v2",
                children: [
                    {
                        __id__: "select-v2",
                        __config__: {
                            name: "虚拟选择器",
                            showLabel: true,
                            labelWidth: null,
                            tag: "el-select-v2",
                            tagIcon: "select",
                            layout: "formItem",
                            defaultValue: "",
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/select-v2.html"
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            }
                        }
                    }
                ]
            },
            {
                name: "Slider 滑块",
                key: "slider",
                children: [
                    {
                        __id__: "slider",
                        __config__: {
                            name: "滑块",
                            tag: "el-slider",
                            tagIcon: "slider",
                            defaultValue: null,
                            showLabel: true,
                            layout: "formItem",
                            labelWidth: null,
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/slider.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Switch 开关",
                key: "switch",
                children: [
                    {
                        __id__: "switch",
                        __config__: {
                            name: "开关",
                            tag: "el-switch",
                            tagIcon: "switch",
                            defaultValue: false,
                            showLabel: true,
                            labelWidth: null,
                            layout: "formItem",
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/switch.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Time Picker 时间选择器",
                key: "time-picker",
                children: [
                    {
                        __id__: "time-picker",
                        __config__: {
                            name: "时间选择",
                            tag: "el-time-picker",
                            tagIcon: "time",
                            defaultValue: null,
                            showLabel: true,
                            layout: "formItem",
                            labelWidth: null,
                            required: true,
                            changeTag: true,
                            document: "https://element-plus.gitee.io/zh-CN/component/time-picker.html"
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            }
                        }
                    }
                ]
            },
            {
                name: "Time Select 时间选择",
                key: "time-select",
                children: []
            },
            {
                name: "Transfer 穿梭框",
                key: "transfer",
                children: [
                    {
                        __id__: "transfer",
                        __config__: {
                            layout: "rawItem",
                            name: "穿梭框",
                            tag: "el-transfer",
                            tagIcon: "transfer",
                            defaultValue: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/transfer.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Upload 上传",
                key: "upload",
                children: [
                    {
                        __id__: "upload",
                        __config__: {
                            name: "上传",
                            tag: "el-upload",
                            tagIcon: "upload",
                            layout: "formItem",
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                            showTip: false,
                            buttonText: "点击上传",
                            changeTag: true,
                            fileSize: 2,
                            sizeUnit: "MB",
                            document: "https://element-plus.gitee.io/zh-CN/component/upload.html"
                        },
                        __slot__: {
                            "list-type": true
                        },
                        __props__: {
                            action: "https://jsonplaceholder.typicode.com/posts/",
                            disabled: false,
                            accept: "",
                            name: "file",
                            "auto-upload": true,
                            "list-type": "text",
                            multiple: false
                        }
                    }
                ]
            }
        ],
        title: "Form 表单组件"
    },
    {
        children: [
            {
                name: "Avatar 头像",
                key: "avatar",
                children: [
                    {
                        __id__: "avatar",
                        __config__: {
                            layout: "rawItem",
                            name: "头像",
                            tag: "el-avatar",
                            tagIcon: "avatar",
                            document: "https://element-plus.gitee.io/zh-CN/component/avatar.html"
                        },
                        __props__: {
                            icon: "Avatar"
                        }
                    }
                ]
            },
            {
                name: "Badge 徽章",
                key: "badge",
                children: [
                    {
                        __id__: "badge",
                        __config__: {
                            name: "徽章",
                            tag: "el-badge",
                            tagIcon: "badge",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/badge.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Calendar 日历",
                key: "calendar",
                children: [
                    {
                        __id__: "calendar",
                        __config__: {
                            layout: "rawItem",
                            name: "日历",
                            tag: "el-calendar",
                            tagIcon: "calendar",
                            document: "https://element-plus.gitee.io/zh-CN/component/calendar.html"
                        }
                    }
                ]
            },
            {
                name: "Card 卡片",
                key: "card",
                children: []
            },
            {
                name: "Carousel 走马灯",
                key: "carousel",
                children: [
                    {
                        __id__: "carousel",
                        __config__: {
                            name: "走马灯",
                            tag: "el-carousel",
                            tagIcon: "carousel",
                            layout: "containerItem",
                            childTag: ["el-carousel-item"],
                            document: "https://element-plus.gitee.io/zh-CN/component/carousel.html"
                        }
                    },
                    {
                        __id__: "carousel-item",
                        __config__: {
                            name: "走马灯子项",
                            tag: "el-carousel-item",
                            tagIcon: "carousel-item",
                            layout: "containerItem",
                            parentTag: ["el-carousel"],
                            document: "https://element-plus.gitee.io/zh-CN/component/carousel.html"
                        }
                    }
                ]
            },
            {
                name: "Collapse 折叠面板",
                key: "collapse",
                children: [
                    {
                        __id__: "collapse",
                        __config__: {
                            name: "折叠面板",
                            tag: "el-collapse",
                            tagIcon: "collapse",
                            layout: "containerItem",
                            childTag: ["el-collapse-item"],
                            document: "https://element-plus.gitee.io/zh-CN/component/collapse.html"
                        }
                    },
                    {
                        __id__: "collapse-item",
                        __config__: {
                            name: "折叠面板子项",
                            tag: "el-collapse-item",
                            tagIcon: "collapse-item",
                            layout: "containerItem",
                            parentTag: ["el-collapse"],
                            document: "https://element-plus.gitee.io/zh-CN/component/collapse.html"
                        }
                    }
                ]
            },
            {
                name: "Descriptions 描述列表",
                key: "descriptions",
                children: []
            },
            {
                name: "Empty 空状态",
                key: "empty",
                children: [
                    {
                        __id__: "empty",
                        __config__: {
                            layout: "rawItem",
                            name: "空状态",
                            tag: "el-empty",
                            tagIcon: "empty",
                            document: "https://element-plus.gitee.io/zh-CN/component/empty.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Image 图片",
                key: "image",
                children: []
            },
            {
                name: "Infinite Scroll 无限滚动",
                key: "infinite-scroll",
                children: []
            },
            {
                name: "Pagination 分页",
                key: "pagination",
                children: [
                    {
                        __id__: "pagination",
                        __config__: {
                            layout: "rawItem",
                            name: "分页",
                            tag: "el-pagination",
                            tagIcon: "pagination",
                            defaultValue: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/pagination.html"
                        },
                        __props__: {
                            total: 1000
                        }
                    }
                ]
            },
            {
                name: "Progress 进度条",
                key: "progress",
                children: [
                    {
                        __id__: "progress",
                        __config__: {
                            layout: "rawItem",
                            name: "进度条",
                            tag: "el-progress",
                            tagIcon: "progress",
                            document: "https://element-plus.gitee.io/zh-CN/component/progress.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Result 结果",
                key: "result",
                children: [
                    {
                        __id__: "result",
                        __config__: {
                            layout: "rawItem",
                            name: "结果",
                            tag: "el-result",
                            tagIcon: "button",
                            document: "https://element-plus.gitee.io/zh-CN/component/result.html"
                        },
                        __props__: {}
                    },
                    {
                        __id__: "alert",
                        __config__: {
                            layout: "rawItem",
                            name: "提示",
                            tag: "el-alert",
                            tagIcon: "alert",
                            document: "https://element-plus.gitee.io/zh-CN/component/result.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Skeleton 骨架屏",
                key: "skeleton",
                children: [
                    {
                        __id__: "skeleton",
                        __config__: {
                            layout: "rawItem",
                            name: "骨架",
                            tag: "el-skeleton",
                            tagIcon: "skeleton",
                            document: "https://element-plus.gitee.io/zh-CN/component/skeleton.html"
                        },
                        __props__: {
                            loading: true
                        }
                    }
                ]
            },
            {
                name: "Table 表格",
                key: "table",
                children: [
                    {
                        __id__: "table",
                        __config__: {
                            layout: "containerItem",
                            name: "表格",
                            tag: "el-table",
                            tagIcon: "table",
                            childTag: ["el-table-column"],
                            defaultValue: [],
                            document: "https://element-plus.gitee.io/zh-CN/component/table.html"
                        },
                        __props__: {
                            data: [
                                {
                                    date: "2016-05-03",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                },
                                {
                                    date: "2016-05-02",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                },
                                {
                                    date: "2016-05-04",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                },
                                {
                                    date: "2016-05-01",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                },
                                {
                                    date: "2016-05-08",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                },
                                {
                                    date: "2016-05-06",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                },
                                {
                                    date: "2016-05-07",
                                    name: "Tom",
                                    address: "No. 189, Grove St, Los Angeles"
                                }
                            ]
                        }
                    },
                    {
                        __id__: "table-column",
                        __config__: {
                            name: "表格子项",
                            tag: "el-table-column",
                            tagIcon: "table-column",
                            layout: "rawItem",
                            parentTag: ["el-table"],
                            document: "https://element-plus.gitee.io/zh-CN/component/table.html"
                        }
                    }
                ]
            },
            {
                name: "Virtualized Table 虚拟化表格2.2.0",
                key: "table-v2",
                children: []
            },
            {
                name: "Tag 标签",
                key: "tag",
                children: [
                    {
                        __id__: "tag",
                        __config__: {
                            layout: "rawItem",
                            name: "标签",
                            tag: "el-tag",
                            tagIcon: "tag",
                            document: "https://element-plus.gitee.io/zh-CN/component/tag.html"
                        },
                        __slot__: {
                            default: "标签"
                        },
                        __props__: {}
                    },
                    {
                        __id__: "check-tag",
                        __config__: {
                            layout: "rawItem",
                            name: "可选中标签",
                            tag: "el-check-tag",
                            tagIcon: "check-tag",
                            document: "https://element-plus.gitee.io/zh-CN/component/tag.html"
                        },
                        __slot__: {
                            default: "可选中标签"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Timeline 时间线",
                key: "timeline",
                children: [
                    {
                        __id__: "timeline",
                        __config__: {
                            name: "时间线",
                            tag: "el-timeline",
                            tagIcon: "timeline",
                            layout: "containerItem",
                            childTag: ["el-timeline-item"],
                            document: "https://element-plus.gitee.io/zh-CN/component/timeline.html"
                        }
                    },
                    {
                        __id__: "timeline-item",
                        __config__: {
                            name: "时间线子项",
                            tag: "el-timeline-item",
                            tagIcon: "timeline-item",
                            layout: "rawItem",
                            parentTag: ["el-timeline"],
                            document: "https://element-plus.gitee.io/zh-CN/component/timeline.html"
                        },
                        __slot__: {
                            default: "timeline-item"
                        }
                    }
                ]
            },
            {
                name: "Tree 树形控件",
                key: "tree",
                children: []
            },
            {
                name: "TreeSelect 树形选择2.1.8",
                key: "tree-select",
                children: []
            },
            {
                name: "Virtualized Tree 虚拟化树形控件",
                key: "tree-v2",
                children: []
            },
            {
                name: "Statistic 统计组件",
                key: "statistic",
                children: [
                    {
                        __id__: "statistic",
                        __config__: {
                            name: "统计组件",
                            tag: "el-statistic",
                            tagIcon: "statistic",
                            layout: "rawItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/statistic.html"
                        }
                    },
                    {
                        __id__: "countdown",
                        __config__: {
                            name: "倒计时",
                            tag: "el-countdown",
                            tagIcon: "countdown",
                            layout: "rawItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/statistic.html#%E5%80%92%E8%AE%A1%E6%97%B6"
                        }
                    }
                ]
            }
        ],
        title: "Data 数据展示"
    },
    {
        children: [
            {
                name: "Affix 固钉",
                key: "affix",
                children: []
            },
            {
                name: "Backtop 回到顶部",
                key: "backtop",
                children: []
            },
            {
                name: "Breadcrumb 面包屑",
                key: "breadcrumb",
                children: [
                    {
                        __id__: "breadcrumb",
                        __config__: {
                            name: "面包屑",
                            tag: "el-breadcrumb",
                            tagIcon: "breadcrumb",
                            layout: "containerItem",
                            childTag: ["el-breadcrumb-item"],
                            document: "https://element-plus.gitee.io/zh-CN/component/breadcrumb.html"
                        }
                    },
                    {
                        __id__: "breadcrumb-item",
                        __config__: {
                            name: "面包屑子项",
                            tag: "el-breadcrumb-item",
                            tagIcon: "breadcrumb-item",
                            layout: "rawItem",
                            parentTag: ["S*"],
                            document: "https://element-plus.gitee.io/zh-CN/component/breadcrumb.html"
                        },
                        __slot__: {
                            default: "breadcrumb-item"
                        }
                    }
                ]
            },
            {
                name: "Dropdown 下拉菜单",
                key: "dropdown",
                children: []
            },
            {
                name: "Menu 菜单",
                key: "menu",
                children: [
                    {
                        __id__: "menu",
                        __config__: {
                            name: "菜单",
                            tag: "el-menu",
                            tagIcon: "menu",
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/menu.html"
                        }
                    },
                    {
                        __id__: "sub-menu",
                        __config__: {
                            name: "子菜单",
                            tag: "el-sub-menu",
                            tagIcon: "sub-menu",
                            layout: "containerItem",
                            parentTag: ["el-menu", "el-sub-menu", "el-menu-item-group"],
                            document: "https://element-plus.gitee.io/zh-CN/component/menu.html#submenu-attributes"
                        },
                        __slot__: {
                            title: "子菜单"
                        }
                    },
                    {
                        __id__: "menu-item",
                        __config__: {
                            name: "菜单项",
                            tag: "el-menu-item",
                            tagIcon: "menu-item",
                            parentTag: ["el-menu", "el-sub-menu", "el-menu-item-group"],
                            layout: "rawItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/menu.html#menu-item-attributes"
                        },
                        __slot__: {
                            default: "菜单项"
                        },
                    },
                    {
                        __id__: "menu-item-group",
                        __config__: {
                            name: "菜单项组",
                            tag: "el-menu-item-group",
                            tagIcon: "menu-item-group",
                            childTag: ["el-menu-item"],
                            layout: "containerItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/menu.html#menu-item--group-attributes"
                        },
                        __props__: {
                            title: "菜单项组"
                        }
                    },
                ]
            },
            {
                name: "Page Header 页头",
                key: "page-header",
                children: []
            },
            {
                name: "Steps 步骤条",
                key: "steps",
                children: [
                    {
                        __id__: "steps",
                        __config__: {
                            name: "步骤条",
                            tag: "el-steps",
                            tagIcon: "steps",
                            layout: "containerItem",
                            childTag: ["el-step"],
                            document: "https://element-plus.gitee.io/zh-CN/component/steps.html"
                        }
                    },
                    {
                        __id__: "step",
                        __config__: {
                            name: "步骤",
                            tag: "el-step",
                            tagIcon: "step",
                            parentTag: ["el-steps"],
                            layout: "rawItem",
                            document: "https://element-plus.gitee.io/zh-CN/component/steps.html"
                        }
                    }
                ]
            },
            {
                name: "Tabs 标签页",
                key: "tabs",
                children: [
                    {
                        __id__: "tabs",
                        __config__: {
                            name: "标签页",
                            tag: "el-tabs",
                            tagIcon: "tabs",
                            layout: "containerItem",
                            childTag: ["el-tab-pane"],
                            document: "https://element-plus.gitee.io/zh-CN/component/tabs.html"
                        }
                    },
                    {
                        __id__: "tab-pane",
                        __config__: {
                            name: "标签页",
                            tag: "el-tab-pane",
                            tagIcon: "tab-pane",
                            layout: "containerItem",
                            parentTag: ["el-tabs"],
                            document: "https://element-plus.gitee.io/zh-CN/component/tabs.html"
                        }
                    }
                ]
            }
        ],
        title: "Navigation 导航"
    },
    {
        children: [
            {
                name: "Alert 提示",
                key: "alert",
                children: [
                    {
                        __id__: "alert",
                        __config__: {
                            layout: "rawItem",
                            name: "提示",
                            tag: "el-alert",
                            tagIcon: "alert",
                            document: "https://element-plus.gitee.io/zh-CN/component/result.html"
                        },
                        __props__: {}
                    }
                ]
            },
            {
                name: "Dialog 对话框",
                key: "dialog",
                children: []
            },
            {
                name: "Drawer 抽屉",
                key: "drawer",
                children: []
            },
            {
                name: "Loading 加载",
                key: "loading",
                children: []
            },
            {
                name: "Message 消息提示",
                key: "message",
                children: []
            },
            {
                name: "Message Box 消息弹出框",
                key: "message-box",
                children: []
            },
            {
                name: "Notification 通知",
                key: "notification",
                children: []
            },
            {
                name: "Popconfirm 气泡确认框",
                key: "popconfirm",
                children: [
                    {
                        __id__: "popconfirm",
                        __config__: {
                            layout: "rawItem",
                            name: "气泡确认框",
                            tag: "el-popconfirm",
                            tagIcon: "popconfirm",
                            document: "https://element-plus.gitee.io/zh-CN/component/popconfirm.html"
                        },
                        __slot__: {
                            reference: "删除"
                        },
                        __props__: {
                            title: "是否确认删除？"
                        }
                    }
                ]
            },
            {
                name: "Popover 弹出框",
                key: "popover",
                children: [
                    {
                        __id__: "popover",
                        __config__: {
                            layout: "rawItem",
                            name: "弹出框",
                            tag: "el-popover",
                            tagIcon: "popover",
                            document: "https://element-plus.gitee.io/zh-CN/component/popover.html"
                        },
                        __slot__: {
                            reference: "打开"
                        },
                        __props__: {
                            title: "气泡卡片",
                            content: "显示内容"
                        }
                    }
                ]
            },
            {
                name: "Tooltip 文字提示",
                key: "tooltip",
                children: [
                    {
                        __id__: "tooltip",
                        __config__: {
                            layout: "rawItem",
                            name: "文字提示",
                            tag: "el-tooltip",
                            tagIcon: "tooltip",
                            document: "https://element-plus.gitee.io/zh-CN/component/tooltip.html"
                        },
                        __slot__: {
                            default: "文字提示"
                        },
                        __props__: {
                            content: "文字提示内容"
                        }
                    }
                ]
            }
        ],
        title: "Feedback 反馈组件"
    },
    {
        children: [
            {
                name: "Divider 分割线",
                key: "divider",
                children: [
                    {
                        __id__: "divider",
                        __config__: {
                            layout: "rawItem",
                            name: "分割线",
                            tag: "el-divider",
                            tagIcon: "divider",
                            document: "https://element-plus.gitee.io/zh-CN/component/divider.html"
                        },
                        __slot__: {
                            default: "分割线"
                        },
                        __props__: {}
                    }
                ]
            }
        ],
        title: "Others 其他"
    }
]
