import FixItem from "@/components/FixItem"
import {ElFormItem} from "element-plus";
import Draggable from '@/vuedraggable/vuedraggable';
import {deepClone} from "@/utils";
import {h, resolveComponent} from "vue";
import '@/styles/draggalbeItem.scss'

let eventTime = Date.now();

export default {
    props: [
        'currentItem',
        'activeId',
        'designConf',
        'onActiveItem',
        'onChange',
        'itemMove',
        'formModelsAndRules',
        'dynamicData'
    ],
    setup(props) {
        function buildEvent(curItem) {
            const onClick = (event) => {
                //fixme 再针对menu写一些代码  {//阻止事件向上传递（因无法选中el-menu-item而更改）
                if (Date.now() - eventTime > 50) {
                    props.onActiveItem(curItem)
                }
                if (curItem.__id__ === 'menu-item') {
                    eventTime = Date.now();
                }
                if (event instanceof PointerEvent) {
                    event.stopPropagation()
                }
            }

            return {onClick}
        }

        function buildClass(curItem) {
            const {drawItemId} = curItem.__config__
            let clazz = props.activeId === drawItemId ? 'drawing-ele selected-draw-ele' : 'drawing-ele';
            if (props.designConf.unFocusedComponentBorder && props.activeId !== drawItemId) clazz += ' unselected-draw-ele'
            const curClass = curItem.__props__.class;
            if (curClass) {
                if (Array.isArray(curClass)) {
                    clazz += " " + curClass.join(" ")
                } else {
                    clazz += " " + curClass
                }
            }
            if (clazz) {
                return {class: clazz};
            } else {
                return {};
            }

        }

        function buildVModel(curItem) {
            if (curItem.__vModel__) {
                return {
                    modelValue: curItem.__config__.defaultValue,
                    'onUpdate:modelValue'(e) {
                        curItem.__config__.defaultValue = e
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
                    prop: curItem.__vModel__,
                    ...buildClass(curItem),
                    style: {width: '100%'}
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
            return <FormItem {...buildEvent(curItem)}/>


        }

        function containerItem(curItem) {
            let colProps = () => {
                const props_ = deepClone(curItem.__props__)
                if (curItem.__slots__.default.length === 0) {
                    if (!props_.style.minHeight && !props_.style['min-height']) {
                        props_.style['min-height'] = '60px';
                        props_.style['min-width'] = '120px';
                    }
                }
                return props_;
            }
            let model = undefined
            let rules = undefined
            if (props.formModelsAndRules && curItem.__config__.tag === 'el-form') {
                model = props.formModelsAndRules[curItem.__props__.model];
                rules = props.formModelsAndRules[curItem.__props__.rules];
            }
            const thisSlots = buildSlots(curItem, true);
            let DraggableChildren = <Draggable tag={curItem.__config__.tag}
                                               componentData={{
                                                   ...colProps(), ...buildClass(curItem), ...buildVModel(curItem),
                                                   model,
                                                   rules
                                               }}
                                               componentSlots={thisSlots}
                                               list={curItem.__slots__.default} group="componentsGroup"
                                               itemKey="renderKey"
                                               onChange={props.onChange}
                                               move={props.itemMove}
                                               animation={340}>
                {{
                    item: ({element}) => h(doLayout(element)),
                }}
            </Draggable>
            return <DraggableChildren {...buildEvent(curItem)}/>

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
                if (curItem.__config__.layout === 'rawItem') {
                    thisSlots[key] = () => curItem.__slots__[key].map(element => doLayout(element));
                } else {
                    thisSlots[key] = () =>
                        <Draggable tag="span"
                                   list={curItem.__slots__[key]} group="componentsGroup"
                                   itemKey="renderKey"
                        >
                            {{
                                item: ({element}) => h(doLayout(element)),
                            }}
                        </Draggable>
                }

            }
            return thisSlots;
        }


        function buildData(curItem) {
            const data = curItem.__data__;
            let dataProps = {}
            if (data) {
                const {name, source, inProps} = data;
                if (source === 'static') {
                    dataProps[name] = data[name];
                } else {
                    const key = curItem.__refs__[name];
                    if (data.dynamic.dataKey) {
                        dataProps[name] = props.dynamicData[key] && props.dynamicData[key][data.dynamic.dataKey] || [];//[]硬编码
                    } else {
                        dataProps[name] = props.dynamicData[key] || [];//[]硬编码
                    }
                }
                if (inProps) {
                    return dataProps;
                } else {
                    return {__data__: dataProps};
                }
            } else {
                return {}
            }


        }

        function fixedItem(curItem, simple) {
            const {wrapWithSpan} = curItem.__config__;
            let config = {...curItem, ...buildData(curItem)};


            if (simple) {
                return <FixItem conf={config} {...buildVModel(curItem)}></FixItem>
            } else {
                if (wrapWithSpan) {
                    const source = <FixItem conf={config}  {...buildVModel(curItem)}></FixItem>
                    return doWrapWithSpan(curItem, source);
                } else {
                    return <FixItem
                        conf={config} {...buildClass(curItem)} {...buildVModel(curItem)} {...buildEvent(curItem)}></FixItem>
                }


            }


        }

        /**
         *
         * @param curItem
         * @param simple true:不生成class和event
         * @return {VNode}
         */
        function rawItem(curItem, simple) {
            const {tag, wrapWithSpan} = curItem.__config__;
            const data = buildData(curItem);
            if (simple) {
                return h(resolveComponent(tag), {...curItem.__props__, ...data, ...buildVModel(curItem)},
                    buildSlots(curItem));
            } else {
                if (wrapWithSpan) {
                    const source = h(resolveComponent(tag), {...curItem.__props__, ...data, ...buildVModel(curItem)}, buildSlots(curItem));
                    return doWrapWithSpan(curItem, source);
                } else {
                    return h(resolveComponent(tag),
                        {...buildClass(curItem), ...curItem.__props__, ...data, ...buildVModel(curItem), ...buildEvent(curItem)},
                        buildSlots(curItem));
                }

            }

        }

        function doWrapWithSpan(curItem, source) {
            const {drawItemId} = curItem.__config__
            let clazz = props.activeId === drawItemId ? 'selected-raw-ele' : props.designConf.unFocusedComponentBorder && props.activeId !== drawItemId ? 'raw-ele' : '';
            return h("span", {class: clazz, ...buildEvent(curItem)}, source);
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

