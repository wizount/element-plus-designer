import Render from "@/components/render/render"
import {CopyDocument, Delete} from "@element-plus/icons-vue";
import {ElFormItem, ElIcon, ElRow, ElCol} from "element-plus";
import Draggable from "vuedraggable";
import {deepClone} from "@/utils";
///import '@/styles/draggalbeItem.scss'

export default {
    props: [
        'currentItem',
        'index',
        'drawingList',
        'activeId',
        'designConf',
        'onMouseenter',
        'onMouseleave',
        'onActiveItem'
    ],
    setup(props) {
        // function itemBtns(curItem, list, index) {
        //     const {onCopyItem, onDeleteItem} = props
        //     return [<span class='drawing-item-copy' title='复制'
        //                   onClick={(event) => {
        //                       onCopyItem(curItem, list);
        //                       event.stopPropagation()
        //                   }}>
        //             <ElIcon><CopyDocument/></ElIcon>
        //         </span>,
        //         <span className='drawing-item-delete' title='删除'
        //               onClick={(event) => {
        //                   onDeleteItem(index, list);
        //                   event.stopPropagation()
        //               }}>
        //             <ElIcon><Delete/></ElIcon>
        //         </span>]
        //
        // }

        function buildEvent(curItem, list, index) {
            const onClick = (event) => {
                props.onActiveItem(curItem);
                event.stopPropagation()
            }
            const onMouseenter = (event) => {
                props.onMouseenter(event, curItem, list, index)
                event.stopPropagation()
            }
            const onMouseleave = (event) => {
                props.onMouseleave(event, curItem, list, index)
                event.stopPropagation()
            }
            return {onClick, onMouseenter, onMouseleave}
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
                return {labelWidth, label, required, prop: curItem.__vModel__}
            }

            let colProps = () => {
                const {drawItemId} = curItem.__config__
                let className = props.activeId === drawItemId ? 'drawing-item active-draw-item' : 'drawing-item';

                if (props.designConf.unFocusedComponentBorder) className += ' unfocus-bordered'

                return {class: className, style: {width: '100%'}}
            }

            const Input = <Render conf={curItem} {...buildVModel(curItem)}></Render>

            const FormItem =
                <ElFormItem {...formItemProps()} {...colProps()}>
                    <Input/>
                </ElFormItem>
            return <FormItem {...buildEvent(curItem, list, index)}/>


        }
        function containerItem(curItem, list, index) {
            let colProps = () => {
                const props_ = deepClone(curItem.__props__)
                const {drawItemId} = curItem.__config__
                let className = props.activeId === drawItemId ? 'drawing-item active-draw-item' : 'drawing-item';

                if (props.designConf.unFocusedComponentBorder) className += ' unfocus-bordered'
                if (!props_.class) {
                    props_.class = className
                } else {
                    props_.class += " " + className
                }
                if (curItem.__children__.length == 0) {
                    if (!props_.style.minHeight && !props_.style['min-height']) {
                        props_.style['min-height'] = '60px';
                    }
                }
                return props_;

            }
            let DraggableChildren = <Draggable tag={curItem.__config__.tag} componentData={{...colProps(),...buildVModel(curItem)}}
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
                const {drawItemId} = curItem.__config__
                let className = props.activeId === drawItemId ? 'drawing-item active-draw-item' : 'drawing-item';

                if (props.designConf.unFocusedComponentBorder) className += ' unfocus-bordered'

                return {class: className}
            }
            const Input = <Render conf={curItem} {...colProps()} {...buildVModel(curItem)} {...buildEvent(curItem, list, index)}></Render>

            return <Input/>
        }

        function doLayout(curItem, list, index) {

            const {layout} = curItem.__config__;
            if (layout == 'formItem') {
                return formItem(curItem, list, index);
            } else if (layout == 'containerItem') {
                return containerItem(curItem, list, index);
            } else if (layout == 'rawItem') {
                return rawItem(curItem, list, index);
            } else if (layout == 'childItem') {
                return rawItem(curItem, list, index);
            }
        }
        return () => doLayout(props.currentItem, props.drawingList, props.index);

    }


}

