import Render from "@/components/render/render"
import {CopyDocument, Delete} from "@element-plus/icons-vue";
import {ElFormItem, ElIcon, ElRow, ElCol} from "element-plus";
import Draggable from '@/vuedraggable/vuedraggable';
import {deepClone} from "@/utils";
import slotRenderFunctions from "@/components/render/slots";
import {h} from "vue";
import '@/styles/draggalbeItem.scss'


let eventTime=Date.now();

export default {
    props: [
        'currentItem',
        'index',
        'drawingList',
        'activeId',
        'designConf',
        'onActiveItem'
    ],
    setup(props) {
        function buildEvent(curItem, list, index) {
            const onClick = (event) => {
                if(Date.now()-eventTime>50) {//阻止事件向上传递（因无法选中el-menu-item而更改）
                    props.onActiveItem(curItem);
                }
                eventTime=Date.now();
            }

            return {onClick}
        }

        function buildClass(curItem) {
            const {drawItemId} = curItem.__config__
            let className = props.activeId === drawItemId ? 'drawing-item active-draw-item' : 'drawing-item';

            if (props.designConf.unFocusedComponentBorder && props.activeId !== drawItemId) className += ' unfocus-bordered';
            if (props.class) {

                className += " " + className
            }
            return className;
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

        function formItem(curItem, list, index) {
            //console.info(curItem)
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
                    class: buildClass(curItem),
                    style: {width: '100%'}
                }
            }

            const Input = <Render conf={curItem} {...buildVModel(curItem)}></Render>

            const FormItem =
                <ElFormItem {...formItemProps()}>
                    <Input/>
                </ElFormItem>
            return <FormItem {...buildEvent(curItem, list, index)}/>


        }

        function containerItem(curItem, list, index) {
            let colProps = () => {
                const props_ = deepClone(curItem.__props__)
                let className = buildClass(curItem);
                props_.class = className;
                if (curItem.__children__.length === 0) {
                    if (!props_.style.minHeight && !props_.style['min-height']) {
                        props_.style['min-height'] = '60px';
                        props_.style['min-width'] = '120px';
                    }
                }
                return props_;

            }
            let thisSlots = null
            const childObjs = slotRenderFunctions[curItem.__config__.tag]
            if (childObjs) {
                thisSlots = {}
                Object.keys(childObjs).forEach(key => {
                    const childFunc = childObjs[key]
                    if (curItem.__slot__ && curItem.__slot__[key]) {
                        Object.assign(thisSlots, childFunc(h, curItem, key))
                    }
                })
            }

            let DraggableChildren = <Draggable tag={curItem.__config__.tag}
                                               componentData={{...colProps(), ...buildVModel(curItem)}}
                                               componentSlots={thisSlots}
                                               list={curItem.__children__} group="componentsGroup"
                                               itemKey="renderKey"
                                               animation={340}>
                {{
                    item: ({element, index}) => h(doLayout(element, curItem.__children__, index)),
                }}
            </Draggable>
            return <DraggableChildren {...buildEvent(curItem, list, index)}/>

        }

        function rawItem(curItem, list, index) {
            let colProps = () => {
                let className = buildClass(curItem);
                return {class: className}
            }
            const Input = <Render
                conf={curItem} {...colProps()} {...buildVModel(curItem)} {...buildEvent(curItem, list, index)}></Render>

            return <Input/>
        }

        function doLayout(curItem, list, index) {
            const {layout} = curItem.__config__;
            if (layout === 'formItem') {
                return formItem(curItem, list, index);
            } else if (layout === 'containerItem') {
                return containerItem(curItem, list, index);
            } else if (layout === 'rawItem') {
                return rawItem(curItem, list, index);
            } else if (layout === 'childItem') {
                return rawItem(curItem, list, index);
            }
        }

        return () => doLayout(props.currentItem, props.drawingList, props.index);

    }


}

