import Render from "@/components/render/render"
import {ElFormItem} from "element-plus";
import Draggable from '@/vuedraggable/vuedraggable';
import {deepClone} from "@/utils";
import {h, resolveComponent} from "vue";
import '@/styles/draggalbeItem.scss'
import slotRenderFunctions from "@/components/render/slots";


let eventTime = Date.now();

export default {
    props: [
        'currentItem',
        'activeId',
        'designConf',
        'onActiveItem',
        'onChange',
        'itemMove',
        'formModelsAndRules'
    ],
    setup(props) {
        function buildEvent(curItem) {
            const onClick = (event) => {
                console.info();
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
            let clazz = props.activeId === drawItemId ? 'drawing-item active-draw-item' : 'drawing-item';
            if (props.designConf.unFocusedComponentBorder && props.activeId !== drawItemId) clazz += ' unfocus-bordered'
            const curClass = curItem.__props__.class;
            if (curClass) {
                console.info(curClass)
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

        function formItem(curItem) {
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

            const Input = <Render conf={curItem} {...buildVModel(curItem)}></Render>

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

        function rawItem(curItem) {
            const Input = <Render
                conf={curItem} {...buildClass(curItem)} {...buildVModel(curItem)} {...buildEvent(curItem)}></Render>

            return <Input/>
        }

        function rawItemAlt(curItem) {
            const {tag} = curItem.__config__;
            if (slotRenderFunctions[tag]) {
                return rawItem(curItem);
            }
            let s = buildSlots(curItem);
            return h(resolveComponent(tag),
                {...buildClass(curItem), ...curItem.__props__, ...buildVModel(curItem), ...buildEvent(curItem)},
                s);
        }

        function doLayout(curItem) {
            if (typeof curItem === "string") {
                return h("span", curItem);
            }
            const {layout} = curItem.__config__;

            if (layout === 'formItem') {
                return formItem(curItem);
            } else if (layout === 'containerItem') {
                return containerItem(curItem);
            } else if (layout === 'rawItem') {
                return rawItemAlt(curItem);
            }
        }

        return () => doLayout(props.currentItem);

    }


}

