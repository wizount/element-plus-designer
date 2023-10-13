import elementPlusConfigMap from "@/element-plus-config"
import slotHtmlFunctions from "@/components/generator/slots";
import {deepClone} from "@/utils";
import {isArrayEqual, isObjectEqual} from "@/components/generator/utils";


//递归比较麻烦，直接使用
let formModelName='';
export function renderVue3Template(itemList) {
    return `<template_alt>
    <div style="padding: 5px">
     ${renderItemList(itemList)}
    </div></template_alt>
 `
}
export function renderHtml(itemList) {
    return `
     ${renderItemList(itemList)}
 `
}
//总入口
const renderItemList = (itemList) => {
    if (!itemList) {
        return ""
    }
    let html = [];
    for (const item of itemList) {
        html.push(renderItem(item))
    }
    return html.join("")

}
//单个组件
const renderItem = (item) => {
    if (typeof item === 'string') {//todo 只有文字而已，目前用span代替，应该有更好的方法
        return item
    } else if (item.__id__ === 'plainText') {
        return item.__slots__.default
    } else {
        const {tag, wrapWithFormItem} = item.__config__;
        let childHtml
        if (tag === "el-form") {
            formModelName=item.__props__.model;
            childHtml = `<${tag}${renderProps(item)}>${renderSlots(item)}</${tag}>`;
            formModelName='';
        } else {
            childHtml = `<${tag}${renderProps(item)}>${renderSlots(item)}</${tag}>`;
        }
        if (wrapWithFormItem) {
            return renderFormItem(item, childHtml)
        } else {
            return childHtml
        }

    }
}
//组件属性
const renderProps = (item) => {
    const id = item.__id__;
    const {attributes} = elementPlusConfigMap[id];
    const props = item.__props__;
    const str = []
    if (props.ref) {
        str.push(` ref=${props.ref}`)
    }
    if(item.__native__){
        Object.keys(item.__native__).map(key=>{
            if(props[key]) return false;
            str.push(` ${key}="${item.__native__[key]}"`)
        })
    }
    if (attributes) {
        const keys = Object.keys(attributes)
        keys.push('style');//多一个style
        keys.forEach((propsName) => {
            const value = props[propsName];
            const config = attributes[propsName];
            if (config && !config.slot && item.__refs__[propsName]) {
                str.push(` :${propsName}="${item.__refs__[propsName]}"`);
                return false;
            }
            const typeOfValue = typeof value;
            if (value === undefined || value === null || value === '') {//这些情况都不生成

            } else {
                if (typeOfValue === 'boolean') {//针对boolean，是true直接写一个名称
                    const r = config && config.default;//需要反着写 比如 el-link 中的underline
                    if (r) {
                        if (!value) {
                            str.push(` :${propsName}=false`)
                        }
                    } else {
                        if (value)
                            str.push(` ${propsName}`)
                    }
                } else {
                    if (!config || value !== config.default) {
                        if (typeOfValue === 'string') {
                            if (config.formRef === true) {//在el-form中表示引用
                                str.push(` :${propsName}="${value}"`)
                            } else if (config.ref === true) {//在el-form中表示引用
                                str.push(` :${propsName}="${props}"`)
                            } else {
                                str.push(` ${propsName}="${value}"`)
                            }
                        } else if (typeOfValue === 'number') {
                            str.push(` :${propsName}=${value}`)
                        } else if (typeOfValue === 'object') {
                            if (Array.isArray(value)) {
                                if (!config || !isArrayEqual(value, config.default)) {
                                    str.push(renderObjectProps(propsName, value))
                                }
                            } else {
                                if (!config || !isObjectEqual(value, config.default)) {
                                    str.push(renderObjectProps(propsName, value, config && config.default))
                                }
                            }
                        }
                    }
                }


            }
        })
    }
    if (item.__vModel__) {
        if (formModelName) {
            str.push(` v-model="${formModelName}.${item.__vModel__}"`)//todo el-upload要用v-model:file-list
        } else {
            str.push(` v-model="${item.__vModel__}"`)//todo el-upload要用v-model:file-list
        }
    }

    //生成Events
    const events = item.__events__ || []
    events.map(e=>{
        str.push(` @${e.name}=${e.fnName}`)
    })
    return str.join("");

}


const renderSlots = (item) => {
    const {tag, layout} = item.__config__;
    if (layout==='fixedItem'&&slotHtmlFunctions[tag]) {
        return slotHtmlFunctions[tag](item);
    } else {
        const slots = item.__slots__;
        if (!slots) {
            return "";
        }
        const array = [];
        for (const slotName in slots) {
            let s = renderItemList(slots[slotName]);
            if (s && slotName !== "default") {
                s = `<template_alt #${slotName}>${s}</template_alt>` //fixme js beauty不支持这个
            }
            array.push(s)
        }
        return array.join("");
    }

}

const renderFormItem = (item, child) => {
    const config = item.__config__
    let labelWidth = ''
    let label = `label="${config.label}"`
    if (config.labelWidth) {
        labelWidth = `label-width="${config.labelWidth}px"`
    }
    if (config.showLabel === false) {
        labelWidth = 'label-width="0"'
        label = ''
    }
    const required = config.required ? 'required' : ''
    let str = `<el-form-item ${labelWidth} ${label} prop="${item.__vModel__}" ${required}>${child}</el-form-item>`
    return str
}

//属性值为object
const renderObjectProps = (propsName, ob, default_ob) => {
    if (!ob) {
        return ""
    }
    ob = deepClone(ob)
    Object.keys(ob).forEach((k) => {//删除空值
        if (!k || ob[k] === "" || ob[k] === undefined) {
            delete ob[k];
            return false;
        }
        if (default_ob && ob[k] === default_ob[k]) {
            delete ob[k];
        }

    })


    const str = JSON.stringify(ob).replace(/\"(.[^-\"]*?)\":/g, '$1:').replace(/\"/g, "'");
    if (str === "{}" || str === "[]") {
        return "";
    } else {
        if (propsName === "style") {//针对style以字符串显示
            let array = []
            Object.keys(ob).forEach((k) => {//删除空值
                array.push(`${k}: ${ob[k]}; `)
            })
            return ` style="${array.join("").trim()}"`
        } else {
            return ` :${propsName}="${str}"`
        }

    }


}