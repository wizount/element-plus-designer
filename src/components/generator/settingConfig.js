//对config.js的补充，根据element plus对组件属性的定义得到，生成方法见ElementPropertyUtils.vue
const propertyConfigList = {
    singleInput: {
        vModel: 'modelValue',
        placeholder: '请输入',
        maxlength: {label: "最大输入长度", title: "最大输入长度", type: "string / number"},
        minlength: {label: "最小输入长度", title: "原生属性，最小输入长度", type: "number", hide: true},
        size: {
            label: "尺寸",
            title: "输入框尺寸，只在 type 不为 'textarea' 时有效",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        prepend: {
            slot: true,
            type: 'string',
            label: '前缀'
        },
        append: {
            slot: true,
            type: 'string',
            label: '后缀'
        },
        "prefix-icon": {
            label: "前缀图标",
            title: "自定义前缀图标",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        "suffix-icon": {
            label: "前缀图标",
            title: "自定义后缀图标",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        "show-word-limit": {
            label: "统计字数",
            title: "是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效",
            type: "boolean",
            default: false
        },
        clearable: {label: "可清空", title: "是否可清空", type: "boolean", default: false},
        formatter: {
            label: "输入值的格式",
            title: "指定输入值的格式。(只有当 type 是\"text\"时才能工作)",
            type: "(value: string | number) => string", hide: true
        },
        parser: {
            label: "提取的值",
            title: "指定从格式化器输入中提取的值。(仅当 type 是\"text\"时才起作用)",
            type: "(string) => string", hide: true
        },
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        autocomplete: {
            label: "autocomplete",
            title: "原生 autocomplete 属性",
            type: "string",
            default: "off",
            hide: true
        },
        name: {label: "name", title: "等价于原生 input name 属性", type: "string", hide: true},
        readonly: {label: "只读", title: "原生  readonly 属性，是否只读", type: "boolean", default: false},
        max: {label: "max", title: "原生 max 属性，设置最大值", hide: true},
        min: {label: "min", title: "原生属性，设置最小值", hide: true},
        step: {label: "step", title: "原生属性，设置输入字段的合法数字间隔", hide: true},
        resize: {
            label: "缩放",
            title: "控制是否能被用户缩放",
            type: "string",
            options: ["none", "both", "horizontal", "vertical"], hide: true
        },
        autofocus: {label: "自动获取焦点", title: "原生属性，自动获取焦点", type: "boolean", default: false},
        form: {label: "form", title: "原生属性", type: "string", hide: true},
        label: {label: "标签文本", title: "标签文本", type: "string", hide: true},
        tabindex: {label: "tabindex", title: "输入框的 tabindex", type: "string / number", hide: true},
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true},
        "input-style": {label: "style", title: "input 元素或 textarea 元素的 style", type: "object", default: {}}
    },
    multipleInput: {
        vModel: 'modelValue',
        placeholder: '请输入',
        maxlength: {label: "最大输入长度", title: "最大输入长度", type: "string / number"},
        minlength: {label: "最小输入长度", title: "原生属性，最小输入长度", type: "number", hide: true},
        "show-word-limit": {
            label: "统计字数",
            title: "是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效",
            type: "boolean",
            default: false
        },
        clearable: {label: "可清空", title: "是否可清空", type: "boolean", default: false},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        rows: {label: "行数", title: "输入框行数，仅 type 为 'textarea' 时有效", type: "number", default: 2},
        autosize: {
            label: "高度自适应",
            title: "textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }",
            type: "boolean",
            default: false

        },
        autocomplete: {
            label: "autocomplete",
            title: "原生 autocomplete 属性",
            type: "string",
            default: "off",
            hide: true
        },
        name: {label: "name", title: "等价于原生 input name 属性", type: "string", hide: true},
        readonly: {label: "只读", title: "原生  readonly 属性，是否只读", type: "boolean", default: false},
        max: {label: "max", title: "原生 max 属性，设置最大值", hide: true},
        min: {label: "min", title: "原生属性，设置最小值", hide: true},
        step: {label: "step", title: "原生属性，设置输入字段的合法数字间隔", hide: true},
        autofocus: {label: "自动获取焦点", title: "原生属性，自动获取焦点", type: "boolean", default: false},
        form: {label: "form", title: "原生属性", type: "string", hide: true},
        label: {label: "标签文本", title: "标签文本", type: "string", hide: true},
        tabindex: {label: "tabindex", title: "输入框的 tabindex", type: "string / number", hide: true},
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true},
        "input-style": {label: "style", title: "input 元素或 textarea 元素的 style", type: "object", default: {}}
    },
    passwordInput: {
        vModel: 'modelValue',
        placeholder: '请输入',
        maxlength: {label: "最大输入长度", title: "最大输入长度", type: "string / number"},
        minlength: {label: "最小输入长度", title: "原生属性，最小输入长度", type: "number", hide: true},
        size: {
            label: "尺寸",
            title: "输入框尺寸，只在 type 不为 'textarea' 时有效",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        prepend: {
            slot: true,
            type: 'string',
            label: '前缀'
        },
        append: {
            slot: true,
            type: 'string',
            label: '后缀'
        },
        "prefix-icon": {
            label: "前缀图标",
            title: "自定义前缀图标",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        "suffix-icon": {
            label: "前缀图标",
            title: "自定义后缀图标",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        clearable: {label: "可清空", title: "是否可清空", type: "boolean", default: false},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        autocomplete: {
            label: "autocomplete",
            title: "原生 autocomplete 属性",
            type: "string",
            default: "off",
            hide: true
        },
        name: {label: "name", title: "等价于原生 input name 属性", type: "string", hide: true},
        readonly: {label: "只读", title: "原生  readonly 属性，是否只读", type: "boolean", default: false},
        max: {label: "max", title: "原生 max 属性，设置最大值", hide: true},
        min: {label: "min", title: "原生属性，设置最小值", hide: true},
        step: {label: "step", title: "原生属性，设置输入字段的合法数字间隔", hide: true},
        autofocus: {label: "自动获取焦点", title: "原生属性，自动获取焦点", type: "boolean", default: false},
        form: {label: "form", title: "原生属性", type: "string", hide: true},
        label: {label: "标签文本", title: "标签文本", type: "string", hide: true},
        tabindex: {label: "tabindex", title: "输入框的 tabindex", type: "string / number", hide: true},
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true},
        "input-style": {label: "style", title: "input 元素或 textarea 元素的 style", type: "object", default: {}}
    },
    'input-number': {
        vModel: 'modelValue',
        placeholder: '请输入',
        size: {
            label: "精度",
            title: "计数器尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        controls: {label: "使用控制按钮", title: "是否使用控制按钮", type: "boolean", default: true},
        "controls-position": {
            label: "按钮位置",
            title: "控制按钮位置",
            type: "string",
            options: [{label: "默认", value: ""}, {label: "右边", value: "right"}],
        },
        min: {
            label: "最小值",
            title: "设置计数器允许的最小值",
            type: "number",
            renderTag: 'el-input-number',
            default: "-Infinity"
        },
        max: {
            label: "最大值",
            title: "设置计数器允许的最大值",
            type: "number",
            renderTag: 'el-input-number',
            default: "Infinity"
        },
        precision: {
            label: "精度",
            title: "数值精度",
            renderTag: 'el-input-number',
            renderProps: {min: 0},
            type: "number"
        },
        step: {label: "步长", title: "计数器步长", type: "number", renderTag: 'el-input-number', default: 1},
        "step-strictly": {label: "严格步数", title: "是否只能输入 step 的倍数", type: "boolean", default: false},
        readonly: {label: "只读", title: "原生  readonly 属性，是否只读", type: "boolean", default: false},
        disabled: {label: "禁用", title: "是否禁用状态", type: "boolean", default: false},
        name: {label: "", title: "等价于原生 input name 属性", type: "string", hide: true},
        label: {label: "", title: "输入框关联的 label 文字", type: "string", hide: true},
        "value-on-clear": {
            label: "清空时显示的值",
            title: "当输入框被清空时显示的值 (> 2.2.0)",
            type: "string / number / null",
            options: [{label: "未设置", value: ""}, {label: "最小值", value: "min"}, {label: "最大值", value: "max"}]
        },
        "validate-event": {label: "触发表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true}
    },
    select: {
        vModel: 'modelValue',
        placeholder: '请选择',
        options: {
            slot: true,
            label: '选项',
            type: 'array',//如果是array,支持draggable
            keys: [{key: "label", label: '选项名'}, {key: "value", label: '选项值'}]//key为空是，array里面的项是字符串，否则是object
        },
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        "value-key": {
            label: "",
            title: "作为 value 唯一标识的键名，绑定值为对象类型时必填",
            type: "string",
            default: "value", hide: true
        },
        size: {
            label: "尺寸",
            title: "输入框尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        clearable: {label: "清空", title: "是否可以清空选项", type: "boolean", default: false},
        "clear-icon": {
            label: "清除图标",
            title: "自定义清除图标",
            type: "string | Component",
            renderTag: 'iconDialog',
            default: "CircleClose"
        },
        multiple: {label: "多选", title: "是否多选", type: "boolean", default: false},
        "collapse-tags": {
            label: "折叠多选",
            title: "多选时是否将选中值按文字的形式展示",
            type: "boolean",
            default: false,
            switch: ['multiple', true]//控制显示，当前配置下multiple为true显示
        },
        "collapse-tags-tooltip": {
            label: "显示多选tooltip",
            title: "当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 只有当 collapse-tags 设置为 true 时才会生效。",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: false,
            switch: ['multiple', true]
        },
        "multiple-limit": {
            label: "多选最大数目",
            title: "多选时可被选择的最大数目。 当被设置为0时，可被选择的数目不设限。",
            type: "number",
            default: 0,
            switch: ['multiple', true]
        },
        name: {label: "", title: "选择器的原生name属性", type: "string", hide: true},
        effect: {
            label: "文字提示主题",
            title: "文字提示（Tooltip）的主题，内置dark和light两种。",
            type: "string",
            options: [{label: "light", value: "light"}, {label: "dark", value: "dark"}],
            default: "light"
        },
        autocomplete: {label: "", title: "自动完成选择输入", type: "string", default: "off", hide: true},
        filterable: {label: "可筛选", title: "是否可筛选", type: "boolean", default: false},
        "allow-create": {
            label: "创建新条目",
            title: "是否允许创建新条目， 当使用该属性时，filterable必须设置为true",
            type: "boolean",
            default: false
        },
        "reserve-keyword": {
            label: "保留关键字",
            title: "筛选时，是否在选择选项后保留关键字",
            type: "boolean",
            default: true
        },
        "no-data-text": {
            label: "无数据显示文字",
            title: "当在没有数据时显示的文字，你同时可以使用#empty插槽进行设置。",
            type: "string",
            default: "No Data"
        },
        "popper-class": {label: "下拉菜单类名", title: "选择器下拉菜单的自定义类名", type: "string"},
        teleported: {
            label: "使用teleport插入body元素",
            title: "该下拉菜单是否使用teleport插入body元素",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        persistent: {
            label: "persistent",
            title: "当下拉选择器未被激活并且persistent设置为false，选择器会被删除。",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        "popper-options": {label: "popper选项", title: "自定义 popper 选项，更多请参考 popper.js", type: "object"},
        "automatic-dropdown": {
            label: "自动弹出菜单",
            title: "对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单",
            type: "boolean",
            default: false
        },
        height: {
            label: "子选项的高度",
            title: "下拉菜单的高度，每一个子选项的高度是 34px",
            type: "number",
            default: 170
        },
        "scrollbar-always-on": {label: "展示滚动条", title: "控制是否总是展示滚动条", type: "boolean", default: false},
        remote: {label: "服务器搜索数据", title: "是否从服务器搜索数据", type: "boolean", default: false},
        "remote-method": {
            label: "",
            title: "当输入值发生变化时被调用的函数。 其参数是当前输入值。 只有当 filterable 设置为 true 时才会生效。",
            type: "function(keyword: string)", hide: true
        },
        "validate-event": {label: "触发表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true},
        placement: {
            label: "下拉框出现位置",
            title: "下拉框出现的位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "top-start", value: "top-start"}, {
                label: "top-end",
                value: "top-end"
            }, {label: "bottom", value: "bottom"}, {label: "bottom-start", value: "bottom-start"}, {
                label: "bottom-end",
                value: "bottom-end"
            }, {label: "left", value: "left"}, {label: "left-start", value: "left-start"}, {
                label: "left-end",
                value: "left-end"
            }, {label: "right", value: "right"}, {label: "right-start", value: "right-start"}, {
                label: "right-end",
                value: "right-end"
            }],
            default: "bottom-start"
        }
    },
    radioGroup: {
        vModel: 'modelValue',
        options: {
            slot: true,
            label: '选项',
            type: 'objectArray',//如果是array,支持draggable
            keys: [{key: "label", label: '选项名'}, {key: "value", label: '选项值'}]//key为空是，array里面的项是字符串，否则是object
        },
        size: {
            label: "尺寸",
            title: "单选框组尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        "text-color": {
            label: "激活文本颜色",
            title: "按钮形式的 Radio 激活时的文本颜色",
            type: "string",
            renderTag: 'el-color-picker',
            default: "#ffffff"
        },
        fill: {
            label: "填充色和边框色",
            title: "按钮形式的 Radio 激活时的填充色和边框色",
            type: "string",
            renderTag: 'el-color-picker',
            default: "#409EFF"
        },
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true}
    },
    checkboxGroup: {
        vModel: 'modelValue',
        options: {
            slot: true,
            label: '选项',
            type: 'objectArray',//如果是array,支持draggable
            keys: [{key: "label", label: '选项名'}, {key: "value", label: '选项值'}]//key为空是，array里面的项是字符串，否则是object
        },
        size: {
            label: "尺寸",
            title: "多选框组尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        min: {label: "勾选最小数量", title: "可被勾选的 checkbox 的最小数量", type: "number"},
        max: {label: "勾选最大数量", title: "可被勾选的 checkbox 的最大数量", type: "number"},
        label: {label: "", title: "为屏幕阅读器准备的标签", type: "string"},
        "text-color": {
            label: "按钮活跃颜色",
            title: "当按钮为活跃状态时的字体颜色",
            type: "string",
            renderTag: 'el-color-picker',
            default: "#ffffff"
        },
        fill: {
            label: "按钮活跃边框背景颜色",
            title: "当按钮为活跃状态时的边框和背景颜色",
            type: "string",
            renderTag: 'el-color-picker',
            default: "#409EFF"
        },
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true}
    },
    switch: {
        vModel: 'modelValue',
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        loading: {label: "显示加载中", title: "是否显示加载中", type: "boolean", default: false},
        size: {
            label: "尺寸",
            title: "switch 的大小",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        width: {label: "宽度", title: "switch 的宽度", type: "number / string"},
        "inline-prompt": {
            label: "只呈现文本第一个字符",
            title: "无论图标或文本是否显示在点内，只会呈现文本的第一个字符",
            type: "boolean",
            default: false
        },
        "active-icon": {
            label: "on显示图标",
            title: "switch 状态为 on 时所显示图标，设置此项会忽略 active-text",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        "inactive-icon": {
            label: "off显示图标",
            title: "switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        "active-text": {label: "打开时文字描述", title: "switch 打开时的文字描述", type: "string"},
        "inactive-text": {label: "关闭时文字描述", title: "switch 的状态为 off 时的文字描述", type: "string"},
        "active-value": {
            label: "on时的值",
            title: "switch 状态为 on 时的值",
            type: "boolean / string / number",
            default: true
        },
        "inactive-value": {
            label: "off时的值",
            title: "switch的状态为 off 时的值",
            type: "boolean / string / number",
            default: false
        },
        "active-color": {
            label: "on时背景颜色",
            title: "当在 on 状态时的背景颜色(已废弃，请使用 CSS var --el-switch-on-color )",
            type: "string",
            renderTag: 'el-color-picker'
        },
        "inactive-color": {
            label: "off时背景颜色",
            title: "off 状态时的背景颜色(已废弃，使用 CSS var --el-switch-of-color )",
            type: "string",
            renderTag: 'el-color-picker'
        },
        "border-color": {
            label: "边框颜色",
            title: "开关的边框颜色 ( 已废弃，使用 CSS var --el-switch-border-color )",
            type: "string",
            renderTag: 'el-color-picker'
        },
        name: {label: "", title: "switch 对应的 name 属性", type: "string", hide: true},
        "validate-event": {
            label: "表单校验",
            title: "改变 switch 状态时是否触发表单的校验",
            type: "boolean",
            default: true
        },
        "before-change": {
            label: "",
            title: "switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换",
            type: "() => Promise<boolean> | boolean", hide: true
        }
    },
    slider: {
        vModel: 'modelValue',
        min: {label: "最小值", title: "最小值", type: "number", default: 0},
        max: {label: "最大值", title: "最大值", type: "number", default: 100},
        step: {label: "步长", title: "步长", type: "number", default: 1},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        range: {label: "选择范围", title: "是否开启选择范围", type: "boolean", default: false},
        "show-input": {
            label: "输入框",
            title: "是否显示输入框，仅在非范围选择时有效",
            type: "boolean",
            default: false,
            switch: ['range', false]
        },
        "input-size": {
            label: "输入框的大小",
            title: "输入框的大小，如果设置了size属性，默认值自动取 size",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default",
            switch: ['show-input', true]
        },
        "show-input-controls": {
            label: "输入框控制按钮",
            title: "在显示输入框的情况下，是否显示输入框的控制按钮",
            type: "boolean",
            default: true,
            switch: ['show-input', true]
        },
        size: {
            label: "大小",
            title: "slider 包装器的大小，垂直模式下该属性不可用",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default", switch: ['vertical', false]

        },
        "show-stops": {label: "间断点", title: "是否显示间断点", type: "boolean", default: false},
        "show-tooltip": {label: "显示提示信息", title: "是否显示提示信息", type: "boolean", default: true},
        "format-tooltip": {label: "", title: "格式化提示信息", type: "function(value)", hide: true},

        vertical: {label: "垂直模式", title: "垂直模式", type: "boolean", default: false},
        height: {label: "滑块高度", title: "滑块高度，垂直模式必填", type: "string", switch: ['vertical', true]},
        label: {label: "屏幕阅读器标签", title: "屏幕阅读器标签", type: "string"},
        "range-start-label": {
            label: "标签开始标记",
            title: "当 range 为true时，屏幕阅读器标签开始的标记",
            type: "string",
            switch: ['vertical', true]
        },
        "range-end-label": {
            label: "标签结尾标记",
            title: "当 range 为true时，屏幕阅读器标签结尾的标记",
            type: "string",
            switch: ['vertical', true]
        },
        "format-value-text": {
            label: "",
            title: "显示屏幕阅读器的 aria-valuenow 属性的格式",
            type: "function(value)",
            hide: true
        },
        debounce: {
            label: "去抖延迟",
            title: "输入时的去抖延迟，毫秒，仅在 show-input 等于 true 时有效",
            type: "number",
            default: 300
        },
        "tooltip-class": {label: "tooltip类名", title: "tooltip 的自定义类名", type: "string"},
        placement: {
            label: "Tooltip出现位置",
            title: "Tooltip 出现的位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "top-start", value: "top-start"}, {
                label: "top-end",
                value: "top-end"
            }, {label: "bottom", value: "bottom"}, {label: "bottom-start", value: "bottom-start"}, {
                label: "bottom-end",
                value: "bottom-end"
            }, {label: "left", value: "left"}, {label: "left-start", value: "left-start"}, {
                label: "left-end",
                value: "left-end"
            }, {label: "right", value: "right"}, {label: "right-start", value: "right-start"}, {
                label: "right-end",
                value: "right-end"
            }],
            default: "top"
        },
        marks: {
            label: "标记",
            title: "标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式",
            type: "object",
            objectTag: {keyTag: 'ElInput', valueTag: 'ElInput'}

        },
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true}
    },
    rate: {
        vModel: 'modelValue',
        max: {label: "最大分值", title: "最大分值", type: "number", default: 5},
        size: {
            label: "尺寸",
            title: "尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        disabled: {label: "只读", title: "是否为只读", type: "boolean", default: false},
        "allow-half": {label: "允许半选", title: "是否允许半选", type: "boolean", default: false},
        "low-threshold": {
            label: "低中界限值",
            title: "低分和中等分数的界限值， 值本身被划分在低分中",
            type: "number",
            default: 2
        },
        "high-threshold": {
            label: "高中界限值",
            title: "高分和中等分数的界限值， 值本身被划分在高分中",
            type: "number",
            default: 4
        },
        colors: {
            label: "icon 的颜色",
            title: "icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色",
            type: "array",
            tag: 'ElColorPicker',
            default: ['#F7BA2A', '#F7BA2A', '#F7BA2A']
        },
        "void-color": {
            label: "未选中 icon 的颜色",
            title: "未选中 icon 的颜色",
            type: "string",
            renderTag: 'el-color-picker',
            default: "#C6D1DE"
        },
        "disabled-void-color": {
            label: "只读时未选中 icon 的颜色",
            title: "只读时未选中 icon 的颜色",
            type: "string",
            default: "#EFF2F7"
        },
        icons: {
            label: "图标组件",
            title: "图标组件 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名",
            type: "array/object",
            // default: "[StarFilled, StarFilled, StarFilled]"
        },
        "void-icon": {
            label: "未选中图标",
            title: "未被选中的图标组件",
            type: "string/Component",
            renderTag: 'iconDialog',
            default: "Star"
        },
        "disabled-void-icon": {
            label: "禁用状态下未选择图标",
            title: "禁用状态下未选择图标",
            type: "string/Component",
            renderTag: 'iconDialog',
            default: "StarFilled"
        },
        "show-text": {
            label: "显示辅助文字",
            title: "是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容",
            type: "boolean",
            default: false
        },
        "show-score": {
            label: "显示当前分数",
            title: "是否显示当前分数， show-score 和 show-text 不能同时为真",
            type: "boolean",
            default: false
        },
        "text-color": {
            label: "辅助文字颜色",
            title: "辅助文字的颜色",
            type: "string",
            renderTag: 'el-color-picker',
            default: "#1F2D3D"
        },
        texts: {
            label: "辅助文字数组",
            title: "辅助文字数组",
            type: "array",
            default: ['Extremely bad', 'Disappointed', 'Fair', 'Satisfied', 'Surprise']
        },
        clearable: {label: "可重置值为0", title: "是否可以重置值为 0", type: "boolean", default: false}
    },
    'color-picker': {
        vModel: 'modelValue',
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        size: {
            label: "尺寸",
            title: "尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        "show-alpha": {label: "透明度选择", title: "是否支持透明度选择", type: "boolean", default: false},
        "color-format": {
            label: "颜色的格式",
            title: "写入 v-model 的颜色的格式",
            type: "string",
            options: [{label: "hsl", value: "hsl"}, {label: "hsv", value: "hsv"}, {
                label: "hex",
                value: "hex"
            }, {label: "rgb", value: "rgb"}],
            default: "hex"//fixme  (当 show-alpha 为 false) / rgb (当 show-alpha 为 true)
        },
        "popper-class": {label: "下拉框的类名", title: "el-color-picker 下拉框的类名", type: "string"},
        predefine: {label: "预设颜色", title: "预设颜色", type: "array", tag: 'ElColorPicker', default: []},
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true}
    },
    cascader: {
        vModel: 'modelValue',
        placeholder: '请选择',
        options: {label: "数据源", title: "可选项数据源，键名可通过 Props 属性配置", type: "array"},
        props: {label: "配置选项", title: "配置选项，具体见下表", type: "object"},
        size: {
            label: "尺寸",
            title: "尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        clearable: {label: "清空", title: "是否支持清空选项", type: "boolean", default: false},
        "show-all-levels": {
            label: "显示完整路径",
            title: "输入框中是否显示选中值的完整路径",
            type: "boolean",
            default: true
        },
        "collapse-tags": {label: "折叠Tag", title: "多选模式下是否折叠Tag", type: "boolean", default: false},
        "collapse-tags-tooltip": {
            label: "折叠选中的标签",
            title: "当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true",
            type: "boolean",
            default: false
        },
        separator: {label: "分隔符", title: "用于分隔选项的字符", type: "string", default: "/"},
        filterable: {label: "被搜索", title: "该选项是否可以被搜索", type: "boolean"},
        "filter-method": {
            label: "搜索逻辑",
            title: "自定义搜索逻辑，第一个参数是node，第二个参数是keyword，返回的布尔值表示是否保留该选项",
            type: "function(node, keyword)"
        },
        debounce: {label: "去抖延迟", title: "搜索关键词正在输入时的去抖延迟，单位为毫秒", type: "number", default: 300},
        "before-filter": {
            label: "钩子函数",
            title: "过滤函数调用前欲被调用的钩子函数，该函数接受一个参数。 如果该函数的返回值是 false 或者是一个被拒绝的 Promise，那么接下来的过滤逻辑便不会执行。",
            type: "function(value)"
        },
        "popper-class": {label: "弹出内容类名", title: "弹出内容的自定义类名", type: "string"},
        teleported: {
            label: "使用teleport",
            title: "弹层是否使用 teleport",
            type: "boolean",
            default: true
        },
        "popper-append-to-body": {
            label: "弹出的内容插入到 body 元素",
            title: "是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false(弃用)",
            type: "boolean",
            default: true
        },
        "tag-type": {
            label: "标签类型",
            title: "标签类型",
            type: "string",
            options: [{label: "success", value: "success"}, {label: "info", value: "info"}, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}],
            default: "info"
        },
        "validate-event": {label: "表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true}
    },
    tabs: {
        vModel: 'modelValue',
        type: {
            label: "风格类型",
            title: "风格类型",
            type: "string",
            options: [{label: "默认", value: ""}, {label: "card", value: "card"}, {
                label: "border-card",
                value: "border-card"
            }]
        },
        closable: {label: "标签可关闭", title: "标签是否可关闭", type: "boolean", default: false},
        addable: {label: "标签可增加", title: "标签是否可增加", type: "boolean", default: false},
        editable: {label: "标签可增加和关闭", title: "标签是否同时可增加和关闭", type: "boolean", default: false},
        "tab-position": {
            label: "选项卡位置",
            title: "选项卡所在位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "right", value: "right"}, {
                label: "bottom",
                value: "bottom"
            }, {label: "left", value: "left"}],
            default: "top"
        },
        stretch: {label: "标签宽度自撑开", title: "标签的宽度是否自撑开", type: "boolean", default: false},
        "before-leave": {
            label: "",
            title: "切换标签之前的钩子函数， 若返回 false  或者返回被 reject 的 Promise，则阻止切换。",
            type: "Function(activeName, oldActiveName)",
            hide: true
        }
    },
    'tab-pane': {
        label: {label: "选项卡标题", title: "选项卡标题", type: "string"},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        name: {
            label: "标识符",
            title: "与选项卡绑定值 value 对应的标识符，表示选项卡别名",
            type: "string / number"
        },
        closable: {label: "可关闭", title: "标签是否可关闭", type: "boolean", default: false},
        lazy: {label: "延迟渲染", title: "标签是否延迟渲染", type: "boolean", default: false}
    },
    avatar: {
        icon: {
            label: "图标",
            title: "设置 Avatar 的图标类型，具体参考 Icon 组件",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        size: {
            label: "大小",
            title: "Avatar 大小",
            type: "number",
            // options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
            //     label: "small",
            //     value: "small"
            // }],
            //default: "default"
        },
        shape: {
            label: "形状",
            title: "Avatar 形状",
            type: "string",
            options: [{label: "circle", value: "circle"}, {label: "square", value: "square"}],
            default: "circle"
        },
        src: {label: "图片源地址", title: "Avatar 图片的源地址", type: "string"},
        "src-set": {label: "", title: "图片 Avatar 的原生 srcset 属性", type: "string"},
        alt: {label: "alt属性", title: "图片 Avatar 的原生 alt 属性", type: "string"},
        fit: {
            label: "适应容器",
            title: "当展示类型为图片的时候，设置图片如何适应容器",
            type: "string",
            options: [{label: "fill", value: "fill"}, {label: "contain", value: "contain"}, {
                label: "cover",
                value: "cover"
            }, {label: "none", value: "none"}, {label: "scale-down", value: "scale-down"}],
            default: "cover"
        }
    },
    tag: {
        default: {
            slot: true,
            type: 'string',
            label: '内容'
        },
        type: {
            label: "类型",
            title: "类型",
            type: "string",
            options: [{label: "默认", value: ""}, {label: "success", value: "success"}, {
                label: "info",
                value: "info"
            }, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}],
            default: ''
        },
        closable: {label: "可关闭", title: "是否可关闭", type: "boolean", default: false},
        "disable-transitions": {label: "禁用渐变动画", title: "是否禁用渐变动画", type: "boolean", default: false},
        hit: {label: "边框描边", title: "是否有边框描边", type: "boolean", default: false},
        color: {label: "背景色", title: "背景色", type: "string", renderTag: 'el-color-picker'},
        size: {
            label: "尺寸",
            title: "尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        effect: {
            label: "主题",
            title: "主题",
            type: "string",
            options: [{label: "dark", value: "dark"}, {label: "light", value: "light"}, {
                label: "plain",
                value: "plain"
            }],
            default: "light"
        },
        round: {label: "圆形", title: "Tag 是否为圆形", type: "boolean", default: false}
    },
    link: {
        default: {
            slot: true,
            type: 'string',
            label: '链接内容'
        },
        type: {
            label: "类型",
            title: "类型",
            type: "string",
            options: [{label: "primary", value: "primary"}, {label: "success", value: "success"}, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}, {label: "info", value: "info"}, {
                label: "default",
                value: "default"
            }],
            default: "default"
        },
        underline: {label: "下划线", title: "是否下划线", type: "boolean", default: true},
        disabled: {label: "禁用状态", title: "是否禁用状态", type: "boolean", default: false},
        href: {label: "href 属性", title: "原生 href 属性", type: "string"},
        icon: {label: "图标组件", title: "图标组件", type: "string | Component", renderTag: 'iconDialog'}
    },
    progress: {
        percentage: {
            label: "百分比",
            title: "百分比，必填",
            type: "number",
            default: 0
        },
        type: {
            label: "类型",
            title: "进度条类型",
            type: "string",
            options: [{label: "line", value: "line"}, {label: "circle", value: "circle"}, {
                label: "dashboard",
                value: "dashboard"
            }],
            default: "line"
        },
        "stroke-width": {label: "进宽度", title: "进度条的宽度", type: "number", default: 6},
        "text-inside": {
            label: "文字内置",
            title: "进度条显示文字内置在进度条内（仅 type 为 'line' 时可用）",
            type: "boolean",
            default: false
        },
        status: {
            label: "当前状态",
            title: "进度条当前状态",
            type: "string",
            options: [{label: "默认", value: undefined}, {label: "success", value: "success"}, {
                label: "exception",
                value: "exception"
            }, {
                label: "warning",
                value: "warning"
            }]
        },
        indeterminate: {label: "动画进度条", title: "是否为动画进度条", type: "boolean", default: false},
        duration: {label: "进度条速度", title: "控制动画进度条速度", type: "number", default: 3},
        color: {
            label: "背景色",
            title: "进度条背景色 进度条背景色 （会覆盖 status 状态颜色）",
            type: "string",
            renderTag: 'el-color-picker'
        },
        width: {
            label: "环形画布宽度",
            title: "环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）",
            type: "number",
            default: 126
        },
        "show-text": {label: "显示文字内容", title: "是否显示进度条文字内容", type: "boolean", default: true},
        "stroke-linecap": {
            label: "两端形状",
            title: "circle/dashboard 类型路径两端的形状",
            type: "string",
            options: [{label: "butt", value: "butt"}, {label: "round", value: "round"}, {
                label: "square",
                value: "square"
            }],
            default: "round"
        },
        format: {label: "", title: "指定进度条文字内容", type: "function(percentage)", hide: true}
    },
    result: {
        title: {label: "标题", title: "标题", type: "string"},
        "sub-title": {label: "二级标题", title: "二级标题", type: "string"},
        icon: {
            label: "图标类型",
            title: "图标类型",
            type: "string",
            options: [{label: "success", value: "success"}, {label: "warning", value: "warning"}, {
                label: "info",
                value: "info"
            }, {label: "error", value: "error"}],
            default: "info"
        }
    },
    alert: {
        title: {label: "标题", title: "Alert 标题。", type: "string"},
        type: {
            label: "类型", title: "Alert 类型。", type: "string", default: 'info',
            options: [{label: "success", value: "success"}, {label: "info", value: "info"}, {
                label: "warning",
                value: "warning"
            }, {label: "error", value: "error"}]
        },
        description: {label: "描述文本", title: "描述性文本", type: "string"},
        closable: {label: "可以关闭", title: "是否可以关闭", type: "boolean", default: true},
        center: {label: "文字居中", title: "文字是否居中", type: "boolean", default: false},
        'close-text': {label: "关闭按钮文本", title: "自定义关闭按钮文本", type: "string"},
        'show-icon': {label: "显示类型图标", title: "是否显示类型图标", type: "boolean", default: false},
        'effect': {
            label: "主题样式", title: "主题样式", type: "string", default: 'light',
            options: [{label: "light", value: "light"}, {label: "dark", value: "dark"}]
        },
    },
    form: {
        rules: {label: "验证规则", title: "表单验证规则", type: "string"},
        inline: {
            label: "行内表单",
            title: "行内表单模式",
            type: "boolean",
            default: false
        },
        "label-position": {
            label: "标签位置",
            title: "表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "right", value: "right"}, {label: "top", value: "top"}],
            default: "right"
        },
        "label-width": {
            label: "标签长度",
            title: "标签的长度，例如50px。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。",
            type: "string / number",
        },
        "label-suffix": {
            label: "标签后缀",
            title: "表单域标签的后缀",
            type: "string",
        },
        "hide-required-asterisk": {
            label: "隐藏标签红色星号",
            title: "是否隐藏必填字段标签旁边的红色星号。",
            type: "boolean",
            default: false
        },
        "require-asterisk-position": {
            label: "星号位置",
            title: "星号的位置。",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "right", value: "right"}],
            default: "left"
        },
        "show-message": {
            label: "显示校验错误信息",
            title: "是否显示校验错误信息",
            type: "boolean",
            default: true
        },
        "inline-message": {
            label: "行内展示校验信息",
            title: "是否以行内形式展示校验信息",
            type: "boolean",
            default: false
        },
        "status-icon": {
            label: "显示校验反馈图标",
            title: "是否在输入框中显示校验结果反馈图标",
            type: "boolean",
            default: false
        },
        "validate-on-rule-change": {
            label: "立即触发验证",
            title: "是否在 rules 属性改变后立即触发一次验证",
            type: "boolean",
            default: true
        },
        size: {
            label: "尺寸",
            title: "用于控制该表单内组件的尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        disabled: {
            label: "禁用",
            title: "是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性",
            type: "boolean",
            default: false
        },
        "scroll-to-error": {
            label: "滚动表单项",
            title: "当校验失败时，滚动到第一个错误表单项",
            type: "boolean",
            default: false
        }
    },
    row: {
        gutter: {label: "栅格间隔", title: "栅格间隔", type: "number", default: 0},
        justify: {
            label: "水平排列方式",
            title: "flex 布局下的水平排列方式",
            type: "string",
            options: [{label: "start", value: "start"}, {label: "end", value: "end"}, {
                label: "center",
                value: "center"
            }, {label: "space-around", value: "space-around"}, {
                label: "space-between",
                value: "space-between"
            }, {label: "space-evenly", value: "space-evenly"}],
            default: "start"
        },
        align: {
            label: "垂直排列方式",
            title: "flex 布局下的垂直排列方式",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "middle", value: "middle"}, {
                label: "bottom",
                value: "bottom"
            }],
            default: "top"
        },
        tag: {
            label: "自定义元素标签",
            title: "自定义元素标签",
            type: "string",
            //options: [{label: "(*)", value: "(*)"}],
            default: "div"
        }
    },
    col: {
        span: {
            label: "占据列数",
            title: "栅格占据的列数",
            type: "number",
            default: 24,
            renderTag: 'el-clearable-slider',
            renderProps: {max: 24, min: 1, marks: {12: ''}, defaultValue: 24},
            remember: true//记住，并在新建的组件用这些设置
        },
        offset: {
            label: "左侧间隔格数",
            title: "栅格左侧的间隔格数",
            type: "number",
            default: 0,
            renderTag: 'el-clearable-slider',
            renderProps: {max: 24, min: 0, marks: {12: ''}}
        },
        push: {
            label: "向右移动格数",
            title: "栅格向右移动格数",
            type: "number",
            default: 0,
            renderTag: 'el-clearable-slider',
            renderProps: {max: 24, min: 0, marks: {12: ''}}
        },
        pull: {
            label: "向左移动格数",
            title: "栅格向左移动格数",
            type: "number",
            default: 0,
            renderTag: 'el-clearable-slider',
            renderProps: {max: 24, min: 0, marks: {12: ''}}
        },
        xs: {
            label: "xs(<768px)",
            title: "<768px 响应式栅格数或者栅格属性对象",
            type: "number/object (例如 {span: 4, offset: 4})",
            renderTag: 'el-clearable-slider', renderProps: {max: 24, min: 0, marks: {12: ''}},
            default: undefined
        },
        sm: {
            label: "sm(≥768px)",
            title: "≥768px 响应式栅格数或者栅格属性对象",
            type: "number/object (例如 {span: 4, offset: 4})",
            renderTag: 'el-clearable-slider', renderProps: {max: 24, min: 0, marks: {12: ''}},
            default: undefined
        },
        md: {
            label: "md(≥992px)",
            title: "≥992px 响应式栅格数或者栅格属性对象",
            type: "number/object (例如 {span: 4, offset: 4})",
            renderTag: 'el-clearable-slider', renderProps: {max: 24, min: 0, marks: {12: ''}},
            default: undefined
        },
        lg: {
            label: "lg(≥1200px)",
            title: "≥1200px 响应式栅格数或者栅格属性对象",
            type: "number/object (例如 {span: 4, offset: 4})",
            renderTag: 'el-clearable-slider', renderProps: {max: 24, min: 0, marks: {12: ''}},
            default: undefined
        },
        xl: {
            label: "xl(≥1920px)",
            title: "≥1920px 响应式栅格数或者栅格属性对象",
            type: "number/object (例如 {span: 4, offset: 4})",
            renderTag: 'el-clearable-slider', renderProps: {max: 24, min: 0, marks: {12: ''}},
            default: undefined
        },
        tag: {
            label: "自定义元素标签",
            title: "自定义元素标签",
            type: "string",
            //options: [{label: "(*)", value: "(*)"}],
            default: "div"
        }
    },
    badge: {
        value: {
            label: "显示值",
            title: "显示值",
            type: "number",
            default: undefined
        },
        max: {
            label: "最大值",
            title: "最大值，超过最大值会显示 {max}+。 只有当 value 是数字类型时才会工作。",
            type: "number",
            default: 99
        },
        "is-dot": {
            label: "显示小圆点",
            title: "是否显示小圆点。",
            type: "boolean",
            default: false
        },
        hidden: {
            label: "隐藏 Badge",
            title: "是否隐藏 Badge。",
            type: "boolean",
            default: false
        },
        type: {
            label: "类型",
            title: "badge 类型。",
            type: "string",
            options: [{label: "primary", value: "primary"}, {label: "success", value: "success"}, {
                label: "warning",
                value: "warning"
            }, {
                label: "danger",
                value: "danger"
            }, {label: "info", value: "info"}],
            default: "danger"
        }
    },
    button: {
        default: {slot: true, label: '按钮文字', type: 'string'},
        size: {
            label: "尺寸",
            title: "尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        type: {
            label: "类型",
            title: "类型",
            type: "string",
            options: [{label: "primary", value: "primary"}, {label: "success", value: "success"}, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}, {label: "info", value: "info"}, {label: "text", value: "text"}]
        },
        plain: {label: "朴素按钮", title: "是否为朴素按钮", type: "boolean", default: false},
        text: {label: "文字按钮", title: "是否为文字按钮", type: "boolean", default: false},
        bg: {label: "显示文字按钮背景颜色", title: "是否显示文字按钮背景颜色", type: "boolean", default: false},
        link: {label: "链接按钮", title: "是否为链接按钮", type: "boolean", default: false},
        round: {label: "圆角按钮", title: "是否为圆角按钮", type: "boolean", default: false},
        circle: {label: "圆形按钮", title: "是否为圆形按钮", type: "boolean", default: false},
        loading: {label: "加载中", title: "是否为加载中状态", type: "boolean", default: false},
        "loading-icon": {
            label: "加载中图标",
            title: "自定义加载中状态图标组件",
            type: "string | Component",
            renderTag: 'iconDialog',
            default: "Loading"
        },
        disabled: {label: "禁用状态", title: "按钮是否为禁用状态", type: "boolean", default: false},
        icon: {label: "图标", title: "图标组件", type: "string | Component", renderTag: 'iconDialog'},
        autofocus: {label: "autofocus", title: "原生 autofocus 属性", type: "boolean", default: false, hidden: true},
        "native-type": {
            label: "原生 type 属性",
            title: "原生 type 属性",
            type: "string",
            options: [{label: "button", value: "button"}, {label: "submit", value: "submit"}, {
                label: "reset",
                value: "reset"
            }],
            default: "button"
        },
        "auto-insert-space": {label: "插入空格", title: "自动在两个中文字符之间插入空格", type: "boolean"},
        color: {
            label: "按钮颜色",
            title: "自定义按钮颜色, 并自动计算 hover 和 active 触发后的颜色",
            renderTag: 'el-color-picker',
            type: "string"
        },
        dark: {
            label: "dark 模式",
            title: "dark 模式, 意味着自动设置 color 为 dark 模式的颜色",
            type: "boolean",
            default: false
        }
    },
    empty: {
        image: {label: "图片地址", title: "图片地址", type: "string"},
        "image-size": {label: "图片大小", title: "图片大小（宽度）", type: "number"},
        description: {label: "描述", title: "描述", type: "string"}
    },
    steps: {
        space: {label: "间距", title: "每个 step 的间距，不填写将自适应间距。 支持百分比。", type: "number / string"},
        direction: {
            label: "方向",
            title: "显示方向",
            type: "string",
            options: [{label: "vertical", value: "vertical"}, {label: "horizontal", value: "horizontal"}],
            default: "horizontal"
        },
        active: {label: "当前步骤", title: "设置当前激活步骤", type: "number", default: 0},
        "process-status": {
            label: "当前步骤状态",
            title: "设置当前步骤的状态",
            type: "string",
            options: [{label: "wait", value: "wait"}, {label: "process", value: "process"}, {
                label: "finish",
                value: "finish"
            }, {label: "error", value: "error"}, {label: "success", value: "success"}],
            default: "process"
        },
        "finish-status": {
            label: "结束步骤状态",
            title: "设置结束步骤的状态",
            type: "string",
            options: [{label: "wait", value: "wait"}, {label: "process", value: "process"}, {
                label: "finish",
                value: "finish"
            }, {label: "error", value: "error"}, {label: "success", value: "success"}],
            default: "finish"
        },
        "align-center": {label: "居中对齐", title: "进行居中对齐", type: "boolean", default: false},
        simple: {label: "简洁风格", title: "是否应用简洁风格", type: "boolean", default: false}
    },
    step: {
        title: {label: "标题", title: "标题", type: "string"},
        description: {label: "描述", title: "描述文案", type: "string"},
        icon: {
            label: "图标",
            title: "Step 组件的自定义图标。 也支持 slot 方式写入",
            type: "string | Component",
            renderTag: 'iconDialog'
        },
        status: {
            label: "状态",
            title: "设置当前步骤的状态， 不设置则根据 steps 确定状态",
            type: "string",
            options: [{label: "wait", value: "wait"}, {label: "process", value: "process"}, {
                label: "finish",
                value: "finish"
            }, {label: "error", value: "error"}, {label: "success", value: "success"}]
        }
    },
    divider: {
        direction: {
            label: "方向",
            title: "设置分割线方向",
            type: "string",
            options: [{label: "horizontal", value: "horizontal"}, {label: "vertical", value: "vertical"}],
            default: "horizontal"
        },
        "border-style": {
            label: "样式",
            title: "设置分隔符样式",
            type: "string",
            options: [{label: "dotted", value: "dotted"}, {label: "dashed", value: "dashed"}, {
                label: "solid",
                value: "solid"
            }, {label: "double", value: "double"}
                , {label: "groove", value: "groove"}, {label: "ridge", value: "ridge"}, {
                    label: "inset",
                    value: "inset"
                }, {label: "outset", value: "outset"}],
            default: "solid"
        },
        "content-position": {
            label: "内容位置",
            title: "自定义分隔线内容的位置",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "right", value: "right"}, {
                label: "center",
                value: "center"
            }],
            default: "center"
        }
    },
    container: {
        direction: {
            label: "排列方向",
            title: "子元素的排列方向",
            type: "string",
            options: [{label: "horizontal", value: "horizontal"}, {label: "vertical", value: "vertical"}],
            default: "vertical"
        }
    },
    header: {height: {label: "高度", title: "顶栏高度", type: "string", default: "60px"}},
    footer: {height: {label: "高度", title: "底栏高度", type: "string", default: "60px"}},
    aside: {height: {label: "宽度", title: "底栏宽度", type: "string", default: "300px"}},
    scrollbar: {
        height: {
            label: "高度",
            title: "滚动条高度",
            type: "string/number",
        },
        "max-height": {
            label: "最大高度",
            title: "滚动条最大高度",
            type: "string/number",
        },
        native: {
            label: "使用原生滚动条样式",
            title: "是否使用原生滚动条样式",
            type: "boolean",
            default: false
        },
        "wrap-style": {
            label: "包裹容器样式",
            title: "包裹容器的自定义样式",
            type: "string/object"
        },
        "wrap-class": {
            label: "包裹容器类名",
            title: "包裹容器的自定义类名",
            type: "string"
        },
        "view-style": {
            label: "视图样式",
            title: "视图的自定义样式",
            type: "string/object",
        },
        "view-class": {
            label: "视图类名",
            title: "视图的自定义类名",
            type: "string",
        },
        noresize: {
            label: "响应容器尺寸变化",
            title: "不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能",
            type: "boolean",
            default: false
        },
        tag: {
            label: "视图的元素标签",
            title: "视图的元素标签",
            type: "string",
            default: "div"
        },
        always: {
            label: "滚动条总是显示",
            title: "滚动条总是显示",
            type: "boolean",
            default: "false"
        },
        "min-size": {
            label: "最小尺寸",
            title: "滚动条最小尺寸",
            type: "number",
            default: 20
        }
    },
    space: {
        alignment: {
            label: "对齐方式",
            title: "对齐的方式",
            type: "string",
            options: [{label: "stretch", value: "stretch"}, {label: "center", value: "center"}, {
                label: "flex-start",
                value: "flex-start"
            }, {label: "flex-end", value: "flex-end"}],
            default: "center"
        },
        class: {label: "类名", title: "类名", type: "string / Array / Object"},
        direction: {
            label: "排列方向",
            title: "排列的方向",
            type: "string",
            options: [{label: "vertical", value: "vertical"}, {label: "horizontal", value: "horizontal"}],
            default: "horizontal"
        },
        "prefix-cls": {
            label: "类名前缀",
            title: "给 space-items 的类名前缀",
            type: "string"
        },
        style: {label: "样式", title: "额外样式", type: "string / Array / Object"},
        spacer: {label: "间隔符", title: "间隔符", type: "string / number / VNode"},
        size: {label: "间隔大小", title: "间隔大小", type: "string / number / [number, number]", default: "small"},
        wrap: {
            label: "自动折行",
            title: "设置是否自动折行",
            type: "boolean",
            default: false
        },
        fill: {
            label: "子元素填充父容器",
            title: "子元素是否填充父容器",
            type: "boolean",
            default: false
        },
        "fill-ratio": {label: "填充父容器比例", title: "填充父容器的比例", type: "number", default: 100}
    },
    collapse: {
        vModel: 'modelValue',
        accordion: {label: "手风琴模式", title: "是否手风琴模式", type: "boolean", default: false}
    },
    'collapse-item': {
        name: {label: "名称", title: "唯一标志符", type: "string/number"},
        title: {label: "标题", title: "面板标题", type: "string"},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean"}
    },
    carousel: {
        height: {label: "高度", title: "carousel 的高度", type: "string"},
        "initial-index": {
            label: "初始状态激活索引",
            title: "初始状态激活的幻灯片的索引，从 0 开始",
            type: "number",
            default: 0
        },
        trigger: {
            label: "触发方式",
            title: "指示器的触发方式",
            type: "string",
            options: [{label: "hover", value: "hover"}, {label: "click", value: "click"}],
            default: "hover"
        },
        autoplay: {label: "自动切换", title: "是否自动切换", type: "boolean", default: true},
        interval: {label: "自动切换时间间隔", title: "自动切换的时间间隔，单位为毫秒", type: "number", default: 3000},
        "indicator-position": {
            label: "指示器位置",
            title: "指示器的位置",
            type: "string",
            options: [{label: "outside", value: "outside"}, {label: "none", value: "none"}]
        },
        arrow: {
            label: "切换箭头显示时机",
            title: "切换箭头的显示时机",
            type: "string",
            options: [{label: "always", value: "always"}, {label: "hover", value: "hover"}, {
                label: "never",
                value: "never"
            }],
            default: "hover"
        },
        type: {label: "类型", title: "carousel 的类型", type: "string", options: [{label: "card", value: "card"}]},
        loop: {label: "循环显示", title: "是否循环显示", type: "boolean", default: true},
        direction: {
            label: "展示的向",
            title: "展示的方向",
            type: "string",
            options: [{label: "horizontal", value: "horizontal"}, {label: "vertical", value: "vertical"}],
            default: "horizontal"
        },
        "pause-on-hover": {label: "悬浮时暂停切换", title: "鼠标悬浮时暂停自动切换", type: "boolean", default: true}
    },
    'carousel-item': {
        name: {label: "名字", title: "幻灯片的名字，可用作 setActiveItem 的参数", type: "string"},
        label: {label: "指示器的文本", title: "该幻灯片所对应指示器文本", type: "string"}
    },
    breadcrumb: {
        separator: {label: "分隔符", title: "分隔符", type: "string", default: "/"},
        "separator-icon": {
            label: "分隔符图标",
            title: "图标分隔符的组件或组件名",
            type: "string | Component",
            renderTag: 'iconDialog'
        }
    },
    'breadcrumb-item': {
        default: {label: '内容', slot: true, type: 'string'},
        to: {label: "跳转目标", title: "路由跳转目标，同 vue-router 的 to 属性", type: "string/object"},
        replace: {
            label: "不留下历史记录",
            title: "如果设置该属性为 true, 导航将不会留下历史记录",
            type: "boolean",
            default: false
        }
    },
    'select-v2': {
        vModel: 'modelValue',
        placeholder: '请选择',
        options: {
            label: '选项',
            type: 'objectArray',//如果是array,支持draggable
            keys: [{key: "label", label: '选项名'}, {key: "value", label: '选项值'}],
            default: []
        },
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        "value-key": {
            label: "",
            title: "作为 value 唯一标识的键名，绑定值为对象类型时必填",
            type: "string",
            default: "value", hide: true
        },
        size: {
            label: "尺寸",
            title: "输入框尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        clearable: {label: "清空", title: "是否可以清空选项", type: "boolean", default: false},
        "clear-icon": {
            label: "清除图标",
            title: "自定义清除图标",
            type: "string | Component",
            renderTag: 'iconDialog',
            default: "CircleClose"
        },
        multiple: {label: "多选", title: "是否多选", type: "boolean", default: false},
        "collapse-tags": {
            label: "折叠多选",
            title: "多选时是否将选中值按文字的形式展示",
            type: "boolean",
            default: false,
            switch: ['multiple', true]//控制显示，当前配置下multiple为true显示
        },
        "collapse-tags-tooltip": {
            label: "显示多选tooltip",
            title: "当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 只有当 collapse-tags 设置为 true 时才会生效。",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: false,
            switch: ['multiple', true]
        },
        "multiple-limit": {
            label: "多选最大数目",
            title: "多选时可被选择的最大数目。 当被设置为0时，可被选择的数目不设限。",
            type: "number",
            default: 0,
            switch: ['multiple', true]
        },
        name: {label: "", title: "选择器的原生name属性", type: "string", hide: true},
        effect: {
            label: "文字提示主题",
            title: "文字提示（Tooltip）的主题，内置dark和light两种。",
            type: "string",
            options: [{label: "light", value: "light"}, {label: "dark", value: "dark"}],
            default: "light"
        },
        autocomplete: {label: "", title: "自动完成选择输入", type: "string", default: "off", hide: true},
        filterable: {label: "可筛选", title: "是否可筛选", type: "boolean", default: false},
        "allow-create": {
            label: "创建新条目",
            title: "是否允许创建新条目， 当使用该属性时，filterable必须设置为true",
            type: "boolean",
            default: false
        },
        "reserve-keyword": {
            label: "保留关键字",
            title: "筛选时，是否在选择选项后保留关键字",
            type: "boolean",
            default: true
        },
        "no-data-text": {
            label: "无数据显示文字",
            title: "当在没有数据时显示的文字，你同时可以使用#empty插槽进行设置。",
            type: "string",
            default: "No Data"
        },
        "popper-class": {label: "下拉菜单类名", title: "选择器下拉菜单的自定义类名", type: "string"},
        teleported: {
            label: "使用teleport插入body元素",
            title: "该下拉菜单是否使用teleport插入body元素",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        persistent: {
            label: "persistent",
            title: "当下拉选择器未被激活并且persistent设置为false，选择器会被删除。",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        "popper-options": {
            label: "popper选项",
            title: "自定义 popper 选项，更多请参考 popper.js",
            type: "object",
            hide: true
        },
        "automatic-dropdown": {
            label: "自动弹出菜单",
            title: "对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单",
            type: "boolean",
            default: false
        },
        height: {
            label: "子选项的高度",
            title: "下拉菜单的高度，每一个子选项的高度是 34px",
            type: "number",
            default: 170
        },
        "scrollbar-always-on": {label: "展示滚动条", title: "控制是否总是展示滚动条", type: "boolean", default: false},
        remote: {label: "服务器搜索数据", title: "是否从服务器搜索数据", type: "boolean", default: false},
        "remote-method": {
            label: "",
            title: "当输入值发生变化时被调用的函数。 其参数是当前输入值。 只有当 filterable 设置为 true 时才会生效。",
            type: "function(keyword: string)", hide: true
        },
        "validate-event": {label: "触发表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true},
        placement: {
            label: "下拉框出现位置",
            title: "下拉框出现的位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "top-start", value: "top-start"}, {
                label: "top-end",
                value: "top-end"
            }, {label: "bottom", value: "bottom"}, {label: "bottom-start", value: "bottom-start"}, {
                label: "bottom-end",
                value: "bottom-end"
            }, {label: "left", value: "left"}, {label: "left-start", value: "left-start"}, {
                label: "left-end",
                value: "left-end"
            }, {label: "right", value: "right"}, {label: "right-start", value: "right-start"}, {
                label: "right-end",
                value: "right-end"
            }],
            default: "bottom-start"
        }

    },
    'time-picker': {
        vModel: 'modelValue',
        placeholder: '请选择',
        readonly: {label: "只读", title: "完全只读", type: "boolean", default: false},
        disabled: {label: "禁用", title: "禁用", type: "boolean", default: false},
        editable: {label: "可输入", title: "文本框可输入", type: "boolean", default: true},
        clearable: {label: "显示清除按钮", title: "是否显示清除按钮", type: "boolean", default: true},
        size: {
            label: "尺寸",
            title: "输入框尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        "is-range": {label: "时间范围选择", title: "是否为时间范围选择", type: "boolean", default: false},
        "start-placeholder": {
            label: "开始日期占位内容",
            title: "范围选择时开始日期的占位内容",
            type: "string",
            switch: ['is-range', true]
        },
        "end-placeholder": {
            label: "结束日期占位内容",
            title: "范围选择时结束日期的占位内容",
            type: "string",
            switch: ['is-range', true]
        },
        "arrow-control": {label: "箭头选择时间", title: "是否使用箭头进行时间选择", type: "boolean", default: false},
        "popper-class": {label: "下拉框类名", title: "TimePicker 下拉框的类名", type: "string"},
        "range-separator": {label: "分隔符", title: "选择范围时的分隔符", type: "string", default: "-"},
        format: {
            label: "输入框格式",
            title: "显示在输入框中的格式",
            type: "string",
            default: "HH:mm:ss"
        },
        'value-format': {
            label: "值格式",
            title: "值格式",
            type: "string",
            default: "HH:mm:ss"
        },
        id: {label: "", title: "等价于原生 input id 属性", type: "string / [string, string]", hide: true},
        name: {label: "", title: "等价于原生 input name 属性", type: "string", hide: true},
        "prefix-icon": {
            label: "前缀图标",
            title: "前缀图标",
            type: "string | Component",
            default: "Clock",
            renderTag: 'iconDialog'
        },
        "clear-icon": {
            label: "清除图标",
            title: "自定义清除图标",
            type: "string | Component",
            default: "CircleClose",
            renderTag: 'iconDialog'
        },
        "disabled-hours": {label: "", title: "禁止选择部分小时选项", type: "function", hide: true},
        "disabled-minutes": {label: "", title: "禁止选择部分分钟选项", type: "Function(selectedHour)", hide: true},
        "disabled-seconds": {
            label: "",
            title: "禁止选择部分秒选项",
            type: "Function(selectedHour, selectedMinute)",
            hide: true
        },
        teleported: {
            label: "下拉列表镜像 body 元素",
            title: "是否将 popover 的下拉列表镜像至 body 元素",
            type: "boolean",
            default: true,
            hide: true
        }
    },
    'date-picker': {
        vModel: 'modelValue',
        placeholder: '请选择',
        type: {
            label: "类型",
            title: "显示类型",
            type: "string",
            options: [
                //year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
                {
                    label: '日(date)',
                    value: 'date',
                },
                {
                    label: '多日(dates)',
                    value: 'dates',
                },
                {
                    label: '周(week)',
                    value: 'week',
                },
                {
                    label: '月(month)',
                    value: 'month',
                },
                {
                    label: '年(year)',
                    value: 'year',
                },
                {
                    label: '日期时间(datetime)',
                    value: 'datetime',
                },
                {
                    label: '日期范围(daterange)',
                    value: 'daterange',
                },
                {
                    label: '月范围(monthrange)',
                    value: 'monthrange',
                },
                {
                    label: '日期时间范围(datetimerange)',
                    value: 'datetimerange',
                },
            ],


            default: "date"
        },
        format: {
            label: "显示格式",
            title: "显示在输入框中的格式",
            type: "string",
            default: "YYYY-MM-DD"
        },
        "value-format": {
            label: "值格式",
            title: "可选，绑定值的格式。 不指定则绑定值为 Date 对象",
            type: "string",
            default: "YYYY-MM-DD"
        },

        readonly: {label: "只读", title: "只读", type: "boolean", default: false},
        disabled: {label: "禁用", title: "禁用", type: "boolean", default: false},
        size: {
            label: "尺寸",
            title: "输入框尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        editable: {label: "文本框可输入", title: "文本框可输入", type: "boolean", default: true},
        clearable: {label: "显示清除按钮", title: "是否显示清除按钮", type: "boolean", default: true},
        "start-placeholder": {label: "开始日期占位内容", title: "范围选择时开始日期的占位内容", type: "string"},
        "end-placeholder": {label: "结束日期占位内容", title: "范围选择时结束日期的占位内容", type: "string"},

        "popper-class": {label: "下拉框的类名", title: "DatePicker 下拉框的类名", type: "string"},
        "range-separator": {label: "分隔符", title: "选择范围时的分隔符", type: "string", default: "-"},
        "default-value": {label: "默认显示时间", title: "可选，选择器打开时默认显示的时间", type: "Date / [Date, Date]"},
        "default-time": {
            label: "默认时间",
            title: "范围选择时选中日期所使用的当日内具体时刻",
            type: "Date / [Date, Date]"
        },
        id: {label: "", title: "等价于原生 id 属性", type: "string / [string, string]", hide: true},
        name: {label: "", title: "等价于原生 name 属性", type: "string", hide: true},
        "unlink-panels": {
            label: "取消两个日期面板联动",
            title: "在范围选择器里取消两个日期面板之间的联动",
            type: "boolean",
            default: false
        },
        "prefix-icon": {
            label: "前缀图标",
            title: "自定义前缀图标",
            type: "string | Component",
            default: "Calendar",
            renderTag: 'iconDialog'
        },
        "clear-icon": {
            label: "清除图标",
            title: "自定义清除图标",
            type: "string | Component",
            default: "CircleClose",
            renderTag: 'iconDialog'
        },
        "validate-event": {label: "触发表单校验", title: "输入时是否触发表单的校验", type: "boolean", default: true},
        "disabled-date": {
            label: "",
            title: "一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。",
            type: "function", hide: true
        },
        shortcuts: {
            label: "",
            title: "设置快捷选项，需要传入数组对象",
            type: "Array<{ text: string, value: Date | Function }>"
        },
        "cell-class-name": {label: "自定义类名", title: "设置自定义类名", type: "Function(Date)"},
        teleported: {
            label: "下拉列表插入至 body 元素",
            title: "是否将 date-picker 的下拉列表插入至 body 元素",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        "time-arrow-control": {
            label: '箭头选择时间',
            title: "whether to pick time using arrow buttons",
            type: "boolean",
            default: false
        }
    },
    timeline: {},
    'timeline-item': {
        default: {label: '内容', slot: true, type: 'string'},
        timestamp: {label: "时间戳", title: "时间戳", type: "string"},
        "hide-timestamp": {label: "隐藏时间戳", title: "是否隐藏时间戳", type: "boolean", default: false},
        center: {label: "垂直居中", title: "是否垂直居中", type: "boolean", default: false},
        placement: {
            label: "时间戳位置",
            title: "时间戳位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "bottom", value: "bottom"}],
            default: "bottom"
        },
        type: {
            label: "节点类型",
            title: "节点类型",
            type: "string",
            options: [{label: "primary", value: "primary"}, {label: "success", value: "success"}, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}, {label: "info", value: "info"}]
        },
        color: {
            label: "节点颜色",
            title: "节点颜色",
            type: "string",
            options: [{label: "hsl", value: "hsl"}, {label: "hsv", value: "hsv"}, {
                label: "hex",
                value: "hex"
            }, {label: "rgb", value: "rgb"}]
        },
        size: {
            label: "节点尺寸",
            title: "节点尺寸",
            type: "string",
            options: [{label: "normal", value: "normal"}, {label: "large", value: "large"}],
            default: "normal"
        },
        icon: {label: "自定义图标", title: "自定义图标", type: "string | Component", renderTag: 'iconDialog'},
        hollow: {label: "空心点", title: "是否空心点", type: "boolean", default: false}
    },
    'text': {
        default: {label: '文字内容', slot: true, type: 'string'},
    },
    'flex-box': {

        //  style: {
        //       label: "样式",
        //     title: "节点尺寸",
        //  }
    },
    menu: {
        mode: {
            label: "展示模式",
            title: "菜单展示模式",
            type: "string",
            options: [{label: "水平", value: "horizontal"}, {label: "垂直", value: "vertical"}],
            default: "vertical"
        },
        collapse: {
            label: "水平折叠",
            title: "是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）",
            type: "boolean",
            default: false,
            switch: ['mode', 'vertical']
        },
        ellipsis: {
            label: "省略多余子项",
            title: "是否省略多余的子项（仅在横向模式生效）",
            type: "boolean",
            default: true
        },
        "background-color": {
            label: "背景颜色",
            title: "菜单的背景颜色（十六进制格式）（已被废弃，使用--bg-color）",
            type: "string",
            default: "#ffffff"
        },
        "text-color": {
            label: "文字颜色",
            title: "文字颜色（十六进制格式）（已被废弃，使用--text-color）",
            type: "string",
            default: "#303133"
        },
        "active-text-color": {
            label: "活动菜单项文本颜色",
            title: "活动菜单项的文本颜色（十六进制格式）（已被废弃，使用--active-color）",
            type: "string",
            default: "#409EFF"
        },
        "default-active": {label: "默认激活菜单的 index", title: "页面加载时默认激活菜单的 index", type: "string"},
        "default-openeds": {label: "打开的sub-menu数组", title: "默认打开的 sub-menu 的 index 的数组", type: "Array"},
        "unique-opened": {
            label: "只保持一个子菜单展开",
            title: "是否只保持一个子菜单的展开",
            type: "boolean",
            default: false
        },
        "menu-trigger": {
            label: "子菜单打开触发方式",
            title: "子菜单打开的触发方式，只在 mode 为 horizontal 时有效。",
            type: "string",
            options: [{label: "hover", value: "hover"}, {label: "click", value: "click"}],
            default: "hover"
        },
        router: {
            label: "启用vue-router模式",
            title: "是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。",
            type: "boolean",
            default: false
        },
        "collapse-transition": {label: "开启折叠动画", title: "是否开启折叠动画", type: "boolean", default: true}
    },
    'sub-menu': {
        title: {slot: true, label: '标题', type: 'string'},
        index: {label: "唯一标志", title: "唯一标志", type: "string"},
        "popper-class": {label: "popper类名", title: "为 popper 添加类名", type: "string"},
        "show-timeout": {label: "展开延时", title: "展开 sub-menu 的延时", type: "number", default: 300},
        "hide-timeout": {label: "收起延时", title: "收起 sub-menu 的延时", type: "number", default: 300},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false},
        "popper-append-to-body": {
            label: "弹出菜单插入至 body 元素",
            title: "是否将弹出菜单插入至 body 元素。 在菜单的定位出现问题时，可尝试修改该属性",
            type: "boolean",
            default: false
        },
        "popper-offset": {label: "弹出窗口偏移", title: "弹出窗口偏移", type: "number", default: 6},
        "expand-close-icon": {
            label: "",
            title: "父菜单展开且子菜单关闭时的图标， expand-close-icon 和 expand-open-icon 需要一起配置才能生效",
            type: "string | Component"
        },
        "expand-open-icon": {
            label: "",
            title: "父菜单展开且子菜单打开时的图标， expand-open-icon 和 expand-close-icon 需要一起配置才能生效",
            type: "string | Component"
        },
        "collapse-close-icon": {
            label: "",
            title: "父菜单收起且子菜单关闭时的图标， expand-close-icon 和 expand-open-icon 需要一起配置才能生效",
            type: "string | Component"
        },
        "collapse-open-icon": {
            label: "",
            title: "父菜单收起且子菜单打开时的图标， expand-open-icon 和 expand-close-icon 需要一起配置才能生效",
            type: "string | Component"
        }
    },
    'menu-item': {
        default: {slot: true, label: '标题', type: 'string'},
        index: {label: "唯一标志", title: "唯一标志", type: "string"},
        route: {label: "Vue Router", title: "Vue Router 路径对象", type: "object"},
        disabled: {label: "禁用", title: "是否禁用", type: "boolean", default: false}
    },
    'menu-item-group': {title: {label: "组标题", title: "组标题", type: "string"}},
    descriptions: {
        border: {label: "边框", title: "是否带有边框", type: "boolean", default: false},
        column: {label: '每行数量', title: "一行 Descriptions Item 的数量", type: "number", default: 3},
        direction: {
            label: "排列的方向",
            title: "排列的方向",
            type: "string",
            options: [{label: "vertical", value: "vertical"}, {label: "horizontal", value: "horizontal"}],
            default: "horizontal"
        },
        size: {
            label: "尺寸",
            title: "列表的尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: "default"
        },
        title: {label: "标题文本", title: "标题文本，显示在左上方", type: "string"},
        extra: {label: "操作区文本", title: "操作区文本，显示在右上方", type: "string"}
    },
    'descriptions-item': {
        label: {label: "标签文本", title: "标签文本", type: "string"},
        span: {label: "列数量", title: "列的数量", type: "number", default: 1},
        width: {
            label: "宽度",
            title: "列的宽度，不同行相同列的宽度按最大值设定（如无 border ，宽度包含标签与内容）",
            type: "string / number"
        },
        "min-width": {
            label: "最小宽度",
            title: "列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列（如无 border，宽度包含标签与内容）",
            type: "string / number"
        },
        align: {
            label: "内容对齐方式",
            title: "列的内容对齐方式（如无 border，对标签和内容均生效）",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "center", value: "center"}, {
                label: "right",
                value: "right"
            }],
            default: "left"
        },
        "label-align": {
            label: "标签对齐方式",
            title: "列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 border，请使用 align 参数）",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "center", value: "center"}, {
                label: "right",
                value: "right"
            }]
        },
        "class-name": {label: "内容自定义类名", title: "列的内容自定义类名", type: "string"},
        "label-class-name": {label: "标签自定义类名", title: "列的标签自定义类名", type: "string"}
    },
    transfer: {
        vModel: 'modelValue',
        data: {
            label: "数据源",
            title: "Transfer 的数据源Array<{ key, label, disabled }>",
            type: "objectArray",
            keys: [{key: "label", label: '名称'}, {key: "key", label: '键值'}, {
                key: "disabled",
                label: '禁用',
                tag: 'ElSwitch'
            }],
            default: []
        },
        filterable: {label: "可搜索", title: "是否可搜索", type: "boolean", default: false},
        "filter-placeholder": {
            label: "搜索框占位符",
            title: "搜索框占位符",
            type: "string",
            default: "Enter keyword",
            switch: ['filterable', true]
        },
        "filter-method": {label: "搜索方法", title: "自定义搜索方法", type: "function", hide: true},
        "target-order": {
            label: "右侧元素排序策略",
            title: "右侧列表元素的排序策略： 若为 original，则保持与数据源相同的顺序； 若为 push，则新加入的元素排在最后； 若为 unshift，则新加入的元素排在最前",
            type: "string",
            options: [{label: "相同", value: "original"}, {label: "最后", value: "push"}, {
                label: "最前",
                value: "unshift"
            }],
            default: "original"
        },
        titles: {label: "列表标题", title: "自定义列表标题", type: "array", default: ['List 1', 'List 2']},
        "button-texts": {label: "按钮文字", title: "自定义按钮文案", type: "array", default: []},
        "render-content": {
            label: "数据项渲染函数",
            title: "自定义数据项渲染函数",
            type: "function(h, option)",
            hide: true
        },
        format: {
            label: "",
            title: "列表顶部勾选状态文案",
            type: "{ noChecked, hasChecked }",
            default: "{ noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' }", hide: true
        },
        props: {label: "数据源的字段别名", title: "数据源的字段别名", type: "{ key, label, disabled }", hide: true},
        "left-default-checked": {
            label: "",
            title: "初始状态下左侧列表的已勾选项的 key 数组",
            type: "array",
            default: [], hide: true
        },
        "right-default-checked": {
            label: "",
            title: "初始状态下右侧列表的已勾选项的 key 数组",
            type: "array",
            default: [], hide: true
        },
        "validate-event": {label: "触发表单验证", title: "是否触发表单验证", type: "boolean", default: true}
    },
    pagination: {
        small: {label: "小型分页", title: "是否使用小型分页样式", type: "boolean", default: false},
        background: {label: "添加背景色", title: "是否为分页按钮添加背景色", type: "boolean", default: false},
        "page-size": {label: "显示个数", title: "每页显示条目个数，支持 v-model 双向绑定", type: "number", default: 10},
        "default-page-size": {label: "每页个数初始值", title: "每页显示条目数的初始值", type: "number"},
        total: {label: "总数", title: "总数", type: "number"},
        "page-count": {
            label: "总页数",
            title: "总页数， total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性",
            type: "number"
        },
        "pager-count": {
            label: "最大页码按钮数",
            title: "设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠",
            type: "number",
            default: 7
        },
        //"current-page": {label: "当前页", title: "当前页数，支持 v-model 双向绑定", type: "number", default: 1},
        "default-current-page": {label: "初始页", title: "当前页数的初始值", type: "number"},
        layout: {
            label: "组件布局",
            title: "组件布局，子组件名用逗号分隔",
            type: "string",
            // options: [{label: "sizes", value: "sizes"}, {label: "prev", value: "prev"}, {
            //     label: "pager",
            //     value: "pager"
            // }, {label: "next", value: "next"}, {label: "jumper", value: "jumper"}, {
            //     label: "->",
            //     value: "->"
            // }, {label: "total", value: "total"}, {label: "slot", value: "slot"}],
            default: "prev, pager, next, jumper, ->, total"
        },
        "page-sizes": {
            label: "每页显示个数",
            title: "每页显示个数选择器的选项设置",
            type: "array", tag: 'ElInputNumber',
            default: [10, 20, 30, 40, 50, 100]
        },
        "popper-class": {label: "下拉框类名", title: "每页显示个数选择器的下拉框类名", type: "string"},
        "prev-text": {label: "上一页文字", title: "替代图标显示的上一页文字", type: "string"},
        "prev-icon": {
            label: "上一页图标",
            title: "上一页的图标， 比 prev-text 优先级更高",
            type: "string | Component", renderTag: 'iconDialog',
            default: "ArrowLeft"
        },
        "next-text": {label: "下一页文字", title: "替代图标显示的下一页文字", type: "string"},
        "next-icon": {
            label: "下一页图标",
            title: "下一页的图标， 比 next-text 优先级更高",
            type: "string | Component", renderTag: 'iconDialog',
            default: "ArrowRight"
        },
        disabled: {label: "禁用", title: "是否禁用分页", type: "boolean", default: false},
        "hide-on-single-page": {label: "只有一页时隐藏", title: "只有一页时是否隐藏", type: "boolean"}
    },
    table: {
        data: {label: "数据", title: "显示的数据", type: "objectArray"},
        height: {
            label: "高度",
            title: "Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。",
            //   type: "string/number"
            type: "number"
        },
        "max-height": {
            label: "最大高度",
            title: "Table 的最大高度。 合法的值为数字或者单位为 px 的高度。",
            //   type: "string/number"
            type: "number"
        },
        stripe: {label: "斑马纹", title: "是否为斑马纹 table", type: "boolean", default: false},
        border: {label: "纵向边框", title: "是否带有纵向边框", type: "boolean", default: false},
        size: {
            label: "尺寸",
            title: "Table 的尺寸",
            type: "string",
            options: [{label: "large", value: "large"}, {label: "default", value: "default"}, {
                label: "small",
                value: "small"
            }],
            default: 'default'
        },
        fit: {label: "列自撑开", title: "列的宽度是否自撑开", type: "boolean", default: true},
        "show-header": {label: "显示表头", title: "是否显示表头", type: "boolean", default: true},
        "highlight-current-row": {label: "高亮当前行", title: "是否要高亮当前行", type: "boolean", default: false},
        "current-row-key": {label: "", title: "当前行的 key，只写属性", type: "string / number"},
        "row-class-name": {
            label: "",
            title: "行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。",
            type: "function({ row, rowIndex }) / string", hide: true
        },
        "row-style": {
            label: "",
            title: "行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。",
            type: "function({ row, rowIndex }) / object", hide: true
        },
        "cell-class-name": {
            label: "",
            title: "单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。",
            type: "function({ row, column, rowIndex, columnIndex }) / string", hide: true
        },
        "cell-style": {
            label: "",
            title: "单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。",
            type: "function({ row, column, rowIndex, columnIndex }) / object", hide: true
        },
        "header-row-class-name": {
            label: "",
            title: "表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。",
            type: "function({ row, rowIndex }) / string", hide: true
        },
        "header-row-style": {
            label: "",
            title: "表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。",
            type: "function({ row, rowIndex }) / object", hide: true
        },
        "header-cell-class-name": {
            label: "",
            title: "表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。",
            type: "function({ row, column, rowIndex, columnIndex }) / string", hide: true
        },
        "header-cell-style": {
            label: "",
            title: "表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。",
            type: "function({ row, column, rowIndex, columnIndex }) / object", hide: true
        },
        "row-key": {
            label: "",
            title: "行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。",
            type: "function(row) / string", hide: true
        },
        "empty-text": {
            label: "无数据显示的文本内容",
            title: "空数据时显示的文本内容， 也可以通过 #empty 设置",
            type: "string",
            default: "No Data"
        },
        "default-expand-all": {
            label: "展开所有行",
            title: "是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效",
            type: "boolean",
            default: false, hide: true
        },
        "expand-row-keys": {
            label: "",
            title: "可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。",
            type: "array", hide: true
        },
        "default-sort": {
            label: "",
            title: "默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序",
            type: "object",
            options: [{label: "(order: 'ascending' 'descending')", value: "(order: 'ascending' 'descending')"}],
            default: "如果 prop 已配置, 同时 order 未配置, 那么 order 默认为升序", hide: true
        },
        "tooltip-effect": {
            label: "",
            title: "tooltip effect 属性",
            type: "string",
            options: [{label: "dark", value: "dark"}, {label: "light", value: "light"}],
            default: "dark"
        },
        "show-summary": {label: "", title: "是否在表尾显示合计行", type: "boolean", default: false},
        "sum-text": {label: "", title: "合计行第一列的文本", type: "string", default: "合计"},
        "summary-method": {label: "", title: "自定义的合计计算方法", type: "function({ columns, data })"},
        "span-method": {
            label: "",
            title: "合并行或列的计算方法",
            type: "function({ row, column, rowIndex, columnIndex })", hide: true
        },
        "select-on-indeterminate": {
            label: "",
            title: "在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行",
            type: "boolean",
            default: true
        },
        indent: {label: "", title: "展示树形数据时，树节点的缩进", type: "number", default: 16, hide: true},
        lazy: {label: "", title: "是否懒加载子节点数据", type: "boolean", hide: true},
        load: {
            label: "",
            title: "加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息",
            type: "function(row, treeNode, resolve)", hide: true
        },
        "tree-props": {
            label: "",
            title: "渲染嵌套数据的配置选项",
            type: "object",
            default: "{ hasChildren: 'hasChildren', children: 'children' }", hide: true
        },
        "table-layout": {
            label: "布局方式",
            title: "设置表格单元、行和列的布局方式",
            type: "string",
            options: [{label: "fixed", value: "fixed"}, {label: "auto", value: "auto"}],
            default: "fixed"
        },
        "scrollbar-always-on": {label: "总是显示滚动条", title: "总是显示滚动条", type: "boolean", default: false},
        flexible: {label: "确保主轴最小尺寸", title: " 确保主轴的最小尺寸", type: "boolean", default: false}
    },
    'table-column': {
        type: {
            label: "列类型",
            title: "对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮",
            type: "string",
            options: [{label: "默认", value: undefined}, {label: "selection", value: "selection"}, {
                label: "index",
                value: "index"
            }, {
                label: "expand",
                value: "expand"
            }]
        },
        label: {label: "列标题", title: "显示的标题", type: "string"},
        prop: {label: "字段名", title: "字段名称 对应列内容的字段名， 也可以使用 property属性", type: "string"},
        width: {label: "宽度", title: "对应列的宽度", type: "string / number"},
        index: {
            label: "",
            title: "如果设置了 type=index，可以通过传递 index 属性来自定义索引",
            type: "number / function(index)", hide: true
        },
        "column-key": {
            label: "列Key",
            title: "column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件",
            type: "string"
        },
        "min-width": {
            label: "最小宽度",
            title: "对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列",
            type: "string / number"
        },
        fixed: {
            label: "列固定位置",
            title: "列是否固定在左侧或者右侧。 true 表示固定在左侧",
            type: "string / boolean",
            options: [{label: "左侧", value: true}, {label: "左侧", value: "left"}, {
                label: "右侧",
                value: "right"
            }]
        },
        "render-header": {
            label: "",
            title: "列标题 Label 区域渲染使用的 Function",
            type: "function({ column, $index })", hide: true
        },
        sortable: {
            label: "",
            title: "对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件",
            type: "boolean / string",
            options: [{label: "custom", value: "custom"}],
            default: false
        },
        "sort-method": {
            label: "",
            title: "指定数据按照哪个属性进行排序，仅当sortable设置为true的时候有效。 应该如同 Array.sort 那样返回一个 Number",
            type: "function(a, b)", hide: true
        },
        "sort-by": {
            label: "",
            title: "指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推",
            type: "function(row, index) / string / array", hide: true
        },
        "sort-orders": {
            label: "",
            title: "数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序",
            type: "array",
            options: [{
                label: "数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序",
                value: "数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序"
            }],
            default: "['ascending', 'descending', null]", hide: true
        },
        resizable: {
            label: "改变宽度",
            title: "对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）",
            type: "boolean",
            default: true
        },
        formatter: {label: "", title: "用来格式化内容", type: "function(row, column, cellValue, index)", hide: true},
        "show-overflow-tooltip": {
            label: "内容过长折叠",
            title: "当内容过长被隐藏时显示 tooltip",
            type: "boolean",
            default: false
        },
        align: {
            label: "对齐方式",
            title: "对齐方式",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "center", value: "center"}, {
                label: "right",
                value: "right"
            }],
            default: "left"
        },
        "header-align": {
            label: "",
            title: "表头对齐方式， 若不设置该项，则使用表格的对齐方式",
            type: "string",
            options: [{label: "left", value: "left"}, {label: "center", value: "center"}, {
                label: "right",
                value: "right"
            }]
        },
        "class-name": {label: "列类名", title: "列的 className", type: "string"},
        "label-class-name": {label: "列标题类名", title: "当前列标题的自定义类名", type: "string"},
        selectable: {
            label: "",
            title: "仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选",
            type: "function(row, index)", hide: true
        },
        "reserve-selection": {
            label: "",
            title: "仅对  type=selection 的列有效， 请注意， 需指定 row-key 来让这个功能生效。",
            type: "boolean",
            default: false
        },
        filters: {
            label: "",
            title: "数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性。",
            type: "Array<{text: string, value: string}>", hide: true
        },
        "filter-placement": {
            label: "",
            title: "过滤弹出框的定位",
            type: "string",
            options: [{label: "与 Tooltip 的 placement 属性相同", value: "与 Tooltip 的 placement 属性相同"}],
            hide: true
        },
        "filter-multiple": {label: "", title: "数据过滤的选项是否多选", type: "boolean", default: true, hide: true},
        "filter-method": {
            label: "",
            title: "数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。",
            type: "function(value, row, column)", hide: true
        },
        "filtered-value": {
            label: "",
            title: "选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。",
            type: "array", hide: true
        }
    },
    calendar: {
        vModel: 'modelValue',
        range: {
            label: "时间范围",
            title: "时间范围，包括开始时间与结束时间。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。",
            type: "array", tag: 'ElDatePicker',
            //    default:[]
        }
    },
    skeleton: {
        animated: {
            label: "使用动画",
            title: "是否使用动画",
            type: "boolean",
            default: false
        },
        count: {
            label: "渲染多少个 template",
            title: "渲染多少个 template, 建议使用尽可能小的数字",
            type: "number",
            default: 1
        },
        loading: {
            label: "DOM 结构",
            title: "是否显示加载结束后的 DOM 结构",
            type: "boolean",
            default: false
        },
        rows: {
            label: "段落数量",
            title: "骨架屏段落数量",
            type: "number",
            default: 3
        },
        throttle: {
            label: "渲染延迟",
            title: "渲染延迟（以毫秒为单位）",
            type: "number",
            default: 0
        }
    },
    popconfirm: {
        reference: {slot: true, label: '按钮文字', type: 'string'},
        width: {label: "弹出窗口宽度", title: "弹出窗口宽度", type: "string/number", default: "150px"},
        title: {label: "标题", title: "标题", type: "string"},
        "confirm-button-text": {label: "确认按钮文字", title: "确认按钮文字", type: "string"},
        "cancel-button-text": {label: "取消按钮文字", title: "取消按钮文字", type: "string"},
        "confirm-button-type": {
            label: "确认按钮类型",
            title: "确认按钮类型",
            type: "string",
            options: [{label: "primary", value: "primary"}, {label: "success", value: "success"}, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}, {label: "info", value: "info"}, {label: "text", value: "text"}],
            default: "primary"
        },
        "cancel-button-type": {
            label: "取消按钮类型",
            title: "取消按钮类型",
            type: "string",
            options: [{label: "primary", value: "primary"}, {label: "success", value: "success"}, {
                label: "warning",
                value: "warning"
            }, {label: "danger", value: "danger"}, {label: "info", value: "info"}, {label: "text", value: "text"}],
            default: "text"
        },
        "hide-icon": {label: "隐藏 Icon", title: "是否隐藏 Icon", type: "boolean", default: false},
        icon: {
            label: "自定义图标",
            title: "自定义图标",
            type: "string | Component",
            default: "QuestionFilled",
            renderTag: 'iconDialog'
        },
        "icon-color": {label: "", title: "Icon 颜色", type: "string", renderTag: 'el-color-picker', default: "#f90"},
        teleported: {
            label: "下拉列表插入 body 元素",
            title: "是否将 popover 的下拉列表插入至 body 元素",
            type: "boolean",
            default: true
        },
        persistent: {
            label: "persistent",
            title: "当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除",
            type: "boolean",
            default: false
        },
    },
    popover: {
        reference: {slot: true, label: '按钮文字', type: 'string'},
        title: {label: "标题", title: "标题", type: "string"},
        content: {label: "显示内容", title: "显示的内容，也可以通过写入默认 slot 修改显示内容", type: "string"},
        trigger: {
            label: "触发方式",
            title: "触发方式",
            type: "string",
            options: [{label: "click", value: "click"}, {label: "focus", value: "focus"}, {
                label: "hover",
                value: "hover"
            }, {label: "contextmenu", value: "contextmenu"}],
            default: "click"
        },
        effect: {
            label: "主题",
            title: "Tooltip 主题，Element Plus 内置了 dark / light 两种主题",
            type: "string",
            options: [{label: "light", value: "light"}, {label: "dark", value: "dark"}],
            default: "light"
        },
        width: {label: "宽度", title: "宽度", type: "string / number", default: "150px"},
        placement: {
            label: "出现位置",
            title: "出现位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "top-start", value: "top-start"}, {
                label: "top-end",
                value: "top-end"
            }, {label: "bottom", value: "bottom"}, {label: "bottom-start", value: "bottom-start"}, {
                label: "bottom-end",
                value: "bottom-end"
            }, {label: "left", value: "left"}, {label: "left-start", value: "left-start"}, {
                label: "left-end",
                value: "left-end"
            }, {label: "right", value: "right"}, {label: "right-start", value: "right-start"}, {
                label: "right-end",
                value: "right-end"
            }],
            default: "bottom"
        },
        disabled: {label: "禁用", title: "Popover 是否可用", type: "boolean", default: false},
        visible: {label: "显示", title: "Popover 是否显示", type: "Boolean", default: "false"},
        offset: {label: "偏移量", title: "出现位置的偏移量", type: "number", default: 0},
        transition: {label: "渐变动画", title: "定义渐变动画", type: "string", default: "el-fade-in-linear"},
        "show-arrow": {
            label: "显示 Tooltip 箭头",
            title: "是否显示 Tooltip 箭头， 欲了解更多信息，请参考 ElPopper",
            type: "boolean",
            default: true
        },
        "popper-options": {
            label: "popper.js 的参数",
            title: "popper.js 的参数",
            type: "object",
            options: [{label: "详情参考 popper.js", value: "详情参考 popper.js"}],
            default: "{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}", hide: true
        },
        "popper-class": {label: "popper 添加类名", title: "为 popper 添加类名", type: "string"},
        "show-after": {label: "延迟出现", title: "延迟出现，单位毫秒", type: "number", default: 0},
        "hide-after": {label: "延迟关闭", title: "延迟关闭，单位毫秒", type: "number", default: 200},
        "auto-close": {
            label: "自动隐藏延时",
            title: "Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏",
            type: "number",
            default: 0
        },
        tabindex: {label: "tabindex", title: "Popover 组件的 tabindex", type: "number"},
        teleported: {
            label: "teleported",
            title: "是否将 popover 的下拉列表插入至 body 元素",
            type: "boolean",
            default: true
        },
        persistent: {
            label: "persistent",
            title: "当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除",
            type: "boolean",
            default: true
        }
    },
    tooltip: {

        content: {label: "显示内容", title: "显示的内容，也可被 slot#content 覆盖", type: "String"},
        trigger: {
            label: "触发方式",
            title: "如何触发（展示） Tooltip",
            type: "string",
            options: [{label: "hover", value: "hover"}, {label: "click", value: "click"}, {
                label: "focus",
                value: "focus"
            }, {label: "contextmenu", value: "contextmenu"}],
            default: "hover"
        },
        effect: {
            label: "主题",
            title: "Tooltip 主题，内置了 dark / light 两种",
            type: "string",
            options: [{label: "dark", value: "dark"}, {label: "light", value: "light"}],
            default: "dark"
        },
        "raw-content": {
            label: "内容作为HTML字符串处理",
            title: "content 中的内容是否作为 HTML 字符串处理",
            type: "boolean",
            default: false
        },
        placement: {
            label: "出现位置",
            title: "Tooltip 组件出现的位置",
            type: "string",
            options: [{label: "top", value: "top"}, {label: "top-start", value: "top-start"}, {
                label: "top-end",
                value: "top-end"
            }, {label: "bottom", value: "bottom"}, {label: "bottom-start", value: "bottom-start"}, {
                label: "bottom-end",
                value: "bottom-end"
            }, {label: "left", value: "left"}, {label: "left-start", value: "left-start"}, {
                label: "left-end",
                value: "left-end"
            }, {label: "right", value: "right"}, {label: "right-start", value: "right-start"}, {
                label: "right-end",
                value: "right-end"
            }],
            default: "bottom"
        },
        //fixme  visible: {label: "可见性", title: "Tooltip 组件可见性", options:[{label: "不设置", value: ''},{label: "显示", value: true},{label: "不显示", value:false}]},
        disabled: {label: "禁用", title: "Tooltip 组件是否禁用", type: "boolean", default: false},
        offset: {label: "偏移量", title: "出现位置的偏移量", type: "number", default: 0},
        transition: {label: "动画名称", title: "动画名称", type: "string", default: "el-fade-in-linear"},
        "append-to": {
            label: "",
            title: "指示 Tooltip 的内容将附加在哪一个网页元素上",
            type: "CSS 选择器 | HTMLElement",
            default: "#el-popper-container-[randomValue]", hide: true
        },
        "popper-options": {
            label: "",
            title: "popper.js 参数",
            type: "Object",
            options: [{label: "详见 popper.js 文档", value: "详见 popper.js 文档"}],
            default: "{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}", hide: true
        },
        "show-after": {label: "触发后多久显示内容", title: "在触发后多久显示内容，单位毫秒", type: "number", default: 0},
        "show-arrow": {
            label: "内容有箭头",
            title: "tooltip 的内容是否有箭头",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        "hide-after": {label: "延迟关闭", title: "延迟关闭，单位毫秒", type: "number", default: 200},
        "auto-close": {label: "自动隐藏延时", title: "tooltip 出现后自动隐藏延时，单位毫秒", type: "number", default: 0},
        manual: {
            label: "手动控制 Tooltip",
            title: "是否手动控制 Tooltip。 如果设置为 true，则 mouseenter 和 mouseleave 将不会生效",
            type: "boolean",
            default: false
        },
        "popper-class": {label: "popper 添加类名", title: "为 Tooltip 的 popper 添加类名", type: "string"},
        enterable: {label: "鼠标可进入", title: "鼠标是否可进入到 tooltip 中", type: "boolean", default: true},
        tabindex: {label: "tabindex", title: "Tooltip 的 tabindex", type: "number", default: 0},
        teleported: {
            label: "teleported",
            title: "是否使用 teleport。设置成 true则会被追加到 append-to 的位置",
            type: "boolean",
            options: [{label: "true", value: "true"}, {label: "false", value: "false"}],
            default: true
        },
        "virtual-triggering": {
            label: "虚拟触发器",
            title: "指示是否启用虚拟触发器",
            type: "boolean",
            default: false,
            hide: true
        },
        "virtual-ref": {label: "参照元素", title: "代表 tooltip 所要附加的参照元素", type: "HTMLElement", hide: true},
        "trigger-keys": {
            label: "",
            title: "当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示",
            type: "Array",
            default: "['Enter','Space']", hide: true
        }
    },
    upload: {
        action: {label: "URL", title: "请求 URL", type: "string",default:"https"},
        headers: {label: "请求头部", title: "设置上传的请求头部", type: "Object"},
        method: {
            label: "方法",
            title: "设置上传请求方法",
            type: "string",
            options: [{label: "post", value: "post"},{label: "get", value: "get"}],
            default: "post"
        },
        multiple: {
            label: "多选文件",
            title: "是否支持多选文件",
            type: "boolean",
            default: false
        },
        data: {label: "附带参数", title: "上传时附带的额外参数", type: "object"},
        name: {
            label: "字段名",
            title: "上传的文件字段名",
            type: "string",
            default: "file"
        },
        "with-credentials": {
            label: "发送 cookie 凭证信息",
            title: "支持发送 cookie 凭证信息",
            type: "boolean",
            default: false
        },
        "show-file-list": {
            label: "显示已上传文件列表",
            title: "是否显示已上传文件列表",
            type: "boolean",
            default: true
        },
        drag: {
            label: "启用拖拽上传",
            title: "是否启用拖拽上传",
            type: "boolean",
            default: false
        },
        accept: {
            label: "文件类型",
            title: "接受上传的文件类型（thumbnail-mode 模式下此参数无效）",
            type: "string",
        },
        "on-preview": {
            label: "已上传的文件时的钩子",
            title: "点击文件列表中已上传的文件时的钩子",
            type: "function",
            hide: true

        },
        "on-remove": {
            label: "移除文件",
            title: "文件列表移除文件时的钩子",
            type: "function",
            hide: true
        },
        "on-success": {
            label: "",
            title: "文件上传成功时的钩子",
            type: "function",
            hide: true
        },
        "on-error": {
            label: "",
            title: "文件上传失败时的钩子",
            type: "function",
            hide: true
        },
        "on-progress": {
            label: "",
            title: "文件上传时的钩子",
            type: "function",
            hide: true
        },
        "on-change": {
            label: "",
            title: "文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用",
            type: "function",
            hide: true
        },
        "on-exceed": {
            label: "",
            title: "当超出限制时，执行的钩子函数",
            type: "function",
            hide: true
        },
        "before-upload": {
            label: "",
            title: "上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。",
            type: "function",
            hide: true
        },
        "before-remove": {
            label: "",
            title: "删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。",
            type: "function",
            hide: true
        },
        "list-type": {
            label: "列表类型",
            title: "文件列表的类型",
            type: "string",
            options: [{label: "text", value: "text"},{label: "picture", value: "picture"},{label: "picture-card", value: "picture-card"}],
            default: "text"
        },
        "auto-upload": {
            label: "自动上传文件",
            title: "是否自动上传文件",
            type: "boolean",
            default: true
        },
        "http-request": {
            label: "允许自行实现上传文件的请求",
            title: "覆盖默认的 Xhr 行为，允许自行实现上传文件的请求",
            type: "function",
            hide: true
        },
        disabled: {
            label: "禁用上传",
            title: "是否禁用上传",
            type: "boolean",
            default: false
        },
        limit: {label: "最大数量", title: "允许上传文件的最大数量", type: "number"}
    }
}

//作一些修改
for (const pcKey in propertyConfigList) {
    const pc = propertyConfigList[pcKey];
    for (const pKey in pc) {
        const p = pc[pKey];
        if (p.type && !p.renderTag) {
            let tag = 'el-input';
            if (p.type == 'boolean') {
                tag = 'el-switch'
            } else if (p.options && p.options.length <= 3) {
                tag = 'el-radio-group'
                p.config = {optionType: 'button'}
            } else if (p.options && p.options.length > 3) {
                tag = 'el-select'
            } else if (p.type.indexOf('string') > -1) {
                tag = 'el-input'
            } else if (p.type.indexOf('number') > -1) {
                tag = 'el-input-number'
            }
            if (tag == 'el-input' || tag == 'el-select') {
                p.renderProps = {clearable: true, ...p.renderProps}
            }
            p.renderTag = tag;
        }
    }

}
export default propertyConfigList;
