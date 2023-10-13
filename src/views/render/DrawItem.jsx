import FixItem from "@/components/FixItem"
import {ElFormItem} from "element-plus";
export default {
    props: [
        'currentItem',
        'formModel',
        'formRules',
        'dynamicData'
    ],
    setup(props) {

        function buildVModel(curItem) {
            if (curItem.__vModel__) {
                return {
                    modelValue: props.formModel[curItem.__vModel__],
                    'onUpdate:modelValue'(e) {
                        props.formModel[curItem.__vModel__] = e
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
                Input = rawItem(curItem, true)

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

            let model = undefined
            let rules = undefined
            if (curItem.__config__.tag === 'el-form') {
                model = props.formModel;
                rules = props.formRules;
            }
            const {tag} = curItem.__config__;
            return h(resolveComponent(tag),
                {...curItem.__props__, ...curItem.__native__,...buildVModel(curItem), model, rules},
                buildSlots(curItem));

        }

        function buildSlots(curItem, noDefault) {
            let thisSlots = {}
            for (const key in curItem.__slots__) {
                if (noDefault && key === 'default') {
                    continue;
                }
                if (typeof curItem.__slots__[key] === 'string') {
                    thisSlots[key] = () => curItem.__slots__[key];
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
                return <FixItem conf={config} {...buildVModel(curItem)}></FixItem>
            } else {
                return <FixItem
                    conf={config}  {...buildVModel(curItem)}></FixItem>
            }


        }

        /**
         *
         * @param curItem
         * @param simple true:不生成class和event
         * @return {VNode}
         */
        function rawItem(curItem, simple) {
            const {tag} = curItem.__config__;
            const data = buildData(curItem).__data__;
            if (simple) {
                return h(resolveComponent(tag), {...curItem.__props__,...curItem.__native__, ...data, ...buildVModel(curItem)},
                    buildSlots(curItem));
            } else {
                return h(resolveComponent(tag),
                    {...curItem.__props__, ...curItem.__native__,...data, ...buildVModel(curItem)},
                    buildSlots(curItem));
            }

        }

        function doLayout(curItem) {
            if (typeof curItem === "string") {
                return h("span", curItem);
            }
            const {layout, wrapWithFormItem} = curItem.__config__;
            if (wrapWithFormItem) {
                return formItem(curItem, layout);
            } else if (layout === 'containerItem') {
                return containerItem(curItem);
            } else if (layout === 'rawItem') {
                return rawItem(curItem);
            } else if (layout === 'fixedItem') {
                return fixedItem(curItem);
            }
        }

        return () => doLayout(props.currentItem);

    }


}

