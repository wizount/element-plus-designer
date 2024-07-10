import FixedItem from "@/components/FixedItem"
import {ElFormItem} from "element-plus";
import {resolveDirective, withDirectives} from "vue";

export default {
    props: [
        'currentItem',
        'formModelsAndRules',
        'dynamicData'
    ],
    setup(props, { expose }) {
        let model = undefined
        function buildVModel(curItem) {
            if (curItem.__vModel__) {
                let m = curItem.__config__.wrapWithFormItem ? model || {} : props.formModelsAndRules
                return {
                    modelValue: m[curItem.__vModel__],
                    'onUpdate:modelValue'(e) {
                        m[curItem.__vModel__] = e
                    }
                }
            } else {
                return {}
            }
        }

        function formItem(curItem, layout) {
            //使用函数，才能响应式
            const formItemProps = () => {
                const {required, showLabel} = curItem.__config__
                let {label, labelWidth} = curItem.__config__
                labelWidth = labelWidth ? labelWidth + "px" : null
                if (showLabel === false) {
                    labelWidth = '0';
                    label = ''
                }
                return {
                    labelWidth,
                    label,
                    required,
                    prop: curItem.__vModel__
                }
            }
            let Input;
            if (layout === 'rawItem') {
                Input = containerItem(curItem, true)

            } else if (layout === 'fixedItem') {
                Input = fixedItem(curItem, true);
            } else {
                Input = "error layout!";
            }


            const FormItem =
                <ElFormItem {...formItemProps()}>
                    <Input/>
                </ElFormItem>
            return <FormItem/>


        }
        function containerItem(curItem) {
            const {tag} = curItem.__config__;

            if (props.formModelsAndRules && tag === 'el-form') {//todo 可以分开？
                model = props.formModelsAndRules[curItem.__props__.model];
                const rules = props.formModelsAndRules[curItem.__props__.rules];
                return h(resolveComponent(tag),
                    {...curItem.__props__, ...curItem.__native__, ...buildVModel(curItem), model, rules},
                    buildSlots(curItem));
            } else {
                return h(resolveComponent(tag),
                    {...curItem.__props__, ...curItem.__native__, ...buildVModel(curItem)},
                    buildSlots(curItem));
            }

        }

        function buildSlots(curItem) {
            let thisSlots = {}
            for (const key in curItem.__slots__) {
                if (typeof curItem.__slots__[key] === 'string') {
                    thisSlots[key] = () => curItem.__slots__[key];
                    continue;
                }
                if (typeof curItem.__slots__[key] === 'function') {
                    thisSlots[key] = curItem.__slots__[key];
                    continue;
                }
                if (curItem.__slots__[key].length === 0) {
                    continue;
                }
                thisSlots[key] = () => curItem.__slots__[key].map(element => doLayout(element));
            }
            return thisSlots;
        }


        function buildData(curItem) {
            const data = curItem.__data__;
            let dataProps = {}
            if (data) {
                const {name, source} = data;
                if (source === 'static') {
                    dataProps[name] = data.static[name];
                } else {
                    const key = curItem.__refs__[name];
                    if (data.dynamic.dataKey) {
                        dataProps[name] = props.dynamicData[key] && props.dynamicData[key][data.dynamic.dataKey] || [];//[]硬编码
                    } else {
                        dataProps[name] = props.dynamicData[key] || [];//[]硬编码
                    }
                }
            }
            return {__data__: dataProps};
        }

        function fixedItem(curItem, simple) {

            let config = {...curItem, ...buildData(curItem)};

            if (simple) {
                return <FixedItem conf={config} {...buildVModel(curItem)}></FixedItem>
            } else {
                return <FixedItem
                    conf={config}  {...buildVModel(curItem)}></FixedItem>
            }


        }
        function buildDirectives(curItem) {
            const {__directives__} = curItem;
            const directives = [];
            if (__directives__) {
                for (const k in __directives__) {
                    const v=__directives__[k];
                    const modifiers={};
                    v.modifiers && v.modifiers.forEach(m => {
                        modifiers[m] = true;
                    })
                    directives.push([resolveDirective(k), v.value,v.arg,modifiers]);
                }
            }
            return directives;
        }


        function doLayout(curItem) {
            if (typeof curItem === "string") {
                return h("span", curItem);
            }
            if (typeof curItem === "function") {
                return curItem;
            }
            const {layout, wrapWithFormItem} = curItem.__config__;
            let ele
            if (wrapWithFormItem) {
                ele=formItem(curItem, layout);
            } else if (layout === 'containerItem' || layout === 'rawItem') {
                ele= containerItem(curItem);
            } else if (layout === 'fixedItem') {
                ele= fixedItem(curItem);
            }
            const directives = buildDirectives(curItem);
            if (directives.length > 0) {
                return withDirectives(ele, directives);
            } else {
                return ele;
            }

        }
        const instance=getCurrentInstance();
        expose({instance})
        return () => doLayout(props.currentItem);

    }


}

