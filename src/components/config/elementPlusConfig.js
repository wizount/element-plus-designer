export const elementPlusComponents = [
    {
        title: "html组件",
        children: [
            {
                name: "html组件",
                key: "html",
                children: [
                    {
                        __id__: "plainText",
                        __slots__: {
                            default: "plainText"
                        },
                    },
                    {
                        __id__: "div",
                        __config__: {
                            // document: "https://element-plus.gitee.io/zh-CN/component/button.html"
                        }
                    },
                    {
                        __id__: "flex-div",
                        __config__: {
                            // document: "https://element-plus.gitee.io/zh-CN/component/button.html"
                        },
                        __props__: {
                            style: {
                                display: "flex"
                            }
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "span",//必须是英文
                            name: "span",
                            tag: "span",
                            tagIcon: "code"
                        },
                        __slots__: {
                            default: ["span"]
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "p",//必须是英文
                            name: "p",
                            tag: "p",
                            tagIcon: "p"
                        },
                        __slots__: {
                            default: ["段落"]
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "h1",//必须是英文
                            name: "h1",
                            tag: "h1",
                            tagIcon: "h1"
                        },
                        __slots__: {
                            default: ["标题h1"]
                        },
                        __link__: ["h2", "h3", "h4", "h5", "h6"].map(h => {
                            return {
                                __id__: "html",
                                __config__: {
                                    itemName: h,//必须是英文
                                    name: h,
                                    tag: h,
                                    tagIcon: h
                                },
                                __slots__: {
                                    default: ["标题" + h]
                                },
                                __link__: []
                            }
                        })
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "ul",//必须是英文
                            name: "无序列表",
                            tag: "ul",
                            tagIcon: "ul"
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "ol",//必须是英文
                            name: "有序列表",
                            tag: "ol",
                            tagIcon: "ol"
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "li",//必须是英文
                            name: "列表项",
                            tag: "li",
                            tagIcon: "menu"
                        },
                        __slots__: {
                            default: ["列表项"]
                        }
                    },
                ]
            }
        ]
    },
    {
        children: [
            {
                name: "Button 按钮",
                key: "button",
                children: [
                    {
                        __id__: "button",
                        __slots__: {
                            default: ["按钮"]
                        },
                        __link__: [
                            {
                                __id__: "button-group",
                            }
                        ]
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
                        __link__: [
                            {
                                __id__: "header",
                            },
                            {
                                __id__: "aside",
                            },
                            {
                                __id__: "main",
                            },
                            {
                                __id__: "footer",
                            }
                        ]
                    }
                ]
            },
            {
                name: "Icon 图标",
                key: "icon",
                children: [{
                    __id__: "icon",
                }]
            },
            {
                name: "Layout 布局",
                key: "layout",
                children: [
                    {
                        __id__: "row",
                    },
                    {
                        __id__: "col",
                    }
                ]
            },
            {
                name: "Link 链接",
                key: "link",
                children: [
                    {
                        __id__: "link",
                        __slots__: {
                            default: ["link"]
                        },
                    }
                ]
            },
            {
                name: "Text 文本",
                key: "text",
                children: [
                    {
                        __id__: "text",
                        __slots__: {
                            default: "text"
                        },
                    }
                ]
            },
            {
                name: "Scrollbar 滚动条",
                key: "scrollbar",
                children: [
                    {
                        __id__: "scrollbar",
                    }
                ]
            },
            {
                name: "Space 间距",
                key: "space",
                children: [
                    {
                        __id__: "space",
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
                        __props__: {
                            // rules: "rules"
                        }
                    },
                    {
                        __id__: "form-item",
                        __props__: {
                            // rules: "rules"
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
                            url: "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList",
                            method: "get",
                            dataPath: "list",
                            dataConsumer: "options",
                            showLabel: true,
                            labelWidth: null,
                            defaultValue: [],
                            dataType: "dynamic",
                            required: true,
                            regList: [],
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            },
                            options: [
                                {
                                    value: "1",
                                    label: "选项1",
                                    children: [
                                        {
                                            "value": "2",
                                            "label": "选项1-1"
                                        }
                                    ]
                                }
                            ]
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
                            defaultValue: [],
                            showLabel: true,
                            labelWidth: null,
                            optionType: "default",
                            required: true,
                            border: false,
                        },
                        __link__: [{
                            __id__: "checkbox",
                            __config__: {
                                showLabel: true,
                                labelWidth: null,
                                optionType: "default",
                                required: true,
                                border: false,
                            },
                        }]
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
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                        },
                    }
                ]
            },
            {
                name: "Date Picker 日期选择",
                key: "date-picker",
                children: [
                    {
                        __id__: "date-picker",
                        __config__: {
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
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
                children: [
                    {
                        __id__: "date-picker",
                        __config__: {
                            itemName: "datetime-picker",
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                            name: "日期时间选择"
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            },
                            type: "datetime"
                        }
                    }
                ]
            },
            {
                name: "Input 输入框",//fixme 将3个都整合到同一个配置input.json里面
                key: "input",
                children: [
                    {
                        // 组件的自定义配置
                        __id__: 'input',
                        __config__: {
                            tagIcon: "input",
                            labelWidth: null,
                            showLabel: true,
                            defaultValue: undefined,
                            required: true,
                            // 正则校验规则
                            regList: [],
                        },
                        __props__: {
                            type: 'text',
                            style: {width: '100%'}
                        }
                    },
                    {
                        __id__: 'input',
                        __config__: {
                            name: "多行文本",
                            itemName: "texarea",
                            labelWidth: null,
                            showLabel: true,
                            tag: 'el-input',
                            tagIcon: 'textarea',
                            defaultValue: undefined,
                            required: true,
                            regList: []
                        },
                        __props__: {
                            type: 'textarea',
                            style: {width: '100%'}
                        }
                    },
                    {
                        __id__: "input",
                        __config__: {
                            itemName: "password",
                            name: "密码框",
                            tagIcon: "password",
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                            regList: [],
                        },
                        __props__: {
                            type: 'text',
                            "show-password": true,
                            style: {
                                width: "100%"
                            },
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
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                            regList: [],
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
                            labelWidth: null,
                            showLabel: true,
                            optionType: "default",
                            required: true,
                            border: false,
                        }
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
                            defaultValue: 0,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                        },
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
                            showLabel: true,
                            labelWidth: null,
                            defaultValue: "",
                            required: true,
                            regList: [],
                        },
                        __props__: {
                            style: {
                                width: "100%"
                            }
                        },
                        __link__: [
                            {
                                __id__: "option"
                            },
                            {
                                __id__: "option-group"
                            }
                        ]
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
                            showLabel: true,
                            labelWidth: null,
                            defaultValue: "",
                            required: true,
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
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                        },
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
                            defaultValue: false,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                        },
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
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
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
                children: [
                    {
                        __id__: "time-select",
                        __config__: {
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
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
                name: "Transfer 穿梭框",
                key: "transfer",
                children: [
                    {
                        __id__: "transfer",
                        __config__: {
                            defaultValue: [],
                        },
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
                            defaultValue: null,
                            showLabel: true,
                            labelWidth: null,
                            required: true,
                            showTip: false,
                            buttonText: "点击上传",
                            fileSize: 2,
                            sizeUnit: "MB",
                        },
                        __props__: {
                            action: "https://jsonplaceholder.typicode.com/posts/",
                            disabled: false,
                            accept: "",
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
                    }
                ]
            },
            {
                name: "Calendar 日历",
                key: "calendar",
                children: [
                    {
                        __id__: "calendar",
                    }
                ]
            },
            {
                name: "Card 卡片",
                key: "card",
                children: [
                    {
                        __id__: "card",

                    }
                ]
            },
            {
                name: "Carousel 走马灯",
                key: "carousel",
                children: [
                    {
                        __id__: "carousel",
                        __link__: [
                            {
                                __id__: "carousel-item",
                            }
                        ]
                    },

                ]
            },
            {
                name: "Collapse 折叠面板",
                key: "collapse",
                children: [
                    {
                        __id__: "collapse",
                        __link__: [
                            {
                                __id__: "collapse-item",
                            }
                        ]
                    }
                ]
            },
            {
                name: "Descriptions 描述列表",
                key: "descriptions",
                children: [
                    // {
                    //     __id__: "descriptions",
                    //     __link__: [
                    //         {
                    //             __id__: "descriptions-item",
                    //         }
                    //     ]
                    // }
                ]
            },
            {
                name: "Empty 空状态",
                key: "empty",
                children: [
                    {
                        __id__: "empty",
                    }
                ]
            },
            {
                name: "Image 图片",
                key: "image",
                children: [{
                    __id__: "image",
                    __props__: {
                        src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    }
                }
                ]
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
                            defaultValue: [],
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
                    }
                ]
            },
            {
                name: "Result 结果",
                key: "result",
                children: [
                    {
                        __id__: "result",
                    },
                    {
                        __id__: "alert",
                    }
                ]
            },
            {
                name: "Skeleton 骨架屏",
                key: "skeleton",
                children: [
                    {
                        __id__: "skeleton",
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
                        __props__: {
                            data: [],
                            style: {
                                width: "99%"
                            }
                        },
                        __link__: [
                            {
                                __id__: "table-column",
                            }
                        ]
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
                        __slots__: {
                            default: ["标签"]
                        },
                        __link__: [{
                            __id__: "check-tag",
                            __slots__: {
                                default: ["可选中标签"]
                            },
                        }]
                    }
                ]
            },
            {
                name: "Timeline 时间线",
                key: "timeline",
                children: [
                    {
                        __id__: "timeline",
                        __link__: [
                            {
                                __id__: "timeline-item",
                                __slots__: {
                                    default: "timeline-item"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: "Tree 树形控件",
                key: "tree",
                children: [
                    {
                        __id__: "tree",
                        __props__: {
                            data: [
                                {
                                    value: "1",
                                    label: "选项1",
                                    children: [
                                        {
                                            value: "2",
                                            label: "选项1-1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },
            {
                name: "TreeSelect 树形选择2.1.8",
                key: "tree-select",
                children: [{
                    __id__: "tree-select",
                    __config__: {
                        showLabel: true,
                        labelWidth: null,
                        optionType: "default",
                        required: true,
                    },
                    __props__: {
                        data: [
                            {
                                value: "1",
                                label: "选项1",
                                children: [
                                    {
                                        value: "2",
                                        label: "选项1-1"
                                    }
                                ]
                            }
                        ]
                    }
                }]
            },
            {
                name: "Virtualized Tree 虚拟化树形控件",
                key: "tree-v2",
                children: [{
                    __id__: "tree-v2",
                    __props__: {
                        data: [
                            {
                                id: "1",
                                label: "选项1",
                                children: [
                                    {
                                        id: "2",
                                        label: "选项1-1"
                                    }
                                ]
                            }
                        ]
                    }
                }]
            },
            {
                name: "Statistic 统计组件",
                key: "statistic",
                children: [
                    {
                        __id__: "statistic",
                    },
                    {
                        __id__: "countdown",
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
                children: [{
                    __id__: "affix",
                },]
            },
            {
                name: "Backtop 回到顶部",
                key: "backtop",
                children: [{
                    __id__: "backtop",
                }]
            },
            {
                name: "Breadcrumb 面包屑",
                key: "breadcrumb",
                children: [
                    {
                        __id__: "breadcrumb",
                        __link__: [
                            {
                                __id__: "breadcrumb-item",
                                __slots__: {
                                    default: "breadcrumb-item"
                                }
                            }
                        ]
                    },

                ]
            },
            {
                name: "Dropdown 下拉菜单",

                key: "dropdown",
                children: [{
                    __id__: "dropdown",
                    __slots__: {
                        default: ["下拉菜单"]
                    },
                    __link__: [{
                        __id__: "dropdown-menu",
                    }, {
                        __id__: "dropdown-item",
                        __slots__: {
                            default: "下拉菜单"
                        }
                    }]
                }]
            },
            {
                name: "Menu 菜单",
                key: "menu",
                children: [
                    {
                        __id__: "menu",
                        __link__: [
                            {
                                __id__: "sub-menu",
                                __slots__: {
                                    title: "子菜单"
                                }
                            },
                            {
                                __id__: "menu-item",
                                __slots__: {
                                    default: "菜单项"
                                },
                            },
                            {
                                __id__: "menu-item-group",
                                __props__: {
                                    title: "菜单项组"
                                }
                            },
                        ]
                    },

                ]
            },
            {
                name: "Page Header 页头",
                key: "page-header",
                children: [
                    {
                        __id__: "page-header",
                    }
                ]
            },
            {
                name: "Steps 步骤条",
                key: "steps",
                children: [
                    {
                        __id__: "steps",
                        __link__: [
                            {
                                __id__: "step",
                            }
                        ]
                    },

                ]
            },
            {
                name: "Tabs 标签页",
                key: "tabs",
                children: [
                    {
                        __id__: "tabs",
                        __link__: [
                            {
                                __id__: "tab-pane",
                            }
                        ]
                    },

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
                    }
                ]
            },
            {
                name: "Dialog 对话框",
                key: "dialog",
                children: [//fixme 如果有子组件，会出错。
                    //     {
                    //     __id__: "dialog",
                    //     __config__: {
                    //         defaultValue: true
                    //     }
                    // }
                ]
            },
            {
                name: "Drawer 抽屉",
                key: "drawer",
                children: [
                    //     {
                    //     __id__: "drawer",
                    //     __config__: {
                    //         defaultValue: true
                    //     }
                    // }
                ]
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
                        __slots__: {
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
                        __slots__: {
                            reference: ["打开"]
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
                        __slots__: {
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
                        __slots__: {
                            default: "分割线"
                        },
                    }
                ]
            }
        ],
        title: "Others 其他"
    }
]
