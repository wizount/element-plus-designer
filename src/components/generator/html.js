import elementPlusConfigMap from "@/config"
import slotHtmlFunctions from "@/components/generator/slots";
import {camelCase, deepClone} from "@/utils";
import {getFunctionName, isArrayEqual, isObjectEqual} from "@/components/generator/utils";


//递归比较麻烦，直接使用
let formModelName = '';

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
    if(typeof itemList === 'string') {
        return itemList;
    }
    if (!itemList||!Array.isArray( itemList )) {//todo 增加其他解析
        return ""
    }
    const html = [];
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
            formModelName = item.__props__.model;
            childHtml = `<${tag}${renderProps(item)} ${renderDirective(item)}>${renderSlots(item)}</${tag}>`;
            formModelName = '';
        } else {
            childHtml = `<${tag}${renderProps(item)} ${renderDirective(item)}>${renderSlots(item)}</${tag}>`;
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
    let {attributes} = id && elementPlusConfigMap[id] || {};
    attributes = attributes || {}
    const props = item.__props__;
    const str = []
    if (props.ref) {
        str.push(` ref=${props.ref}`)
    }
    if (item.__native__) {
        Object.keys(item.__native__).map(key => {
            if (props[key]) return false;
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
                            if (config.propsRef === true) {//只是引用！
                                str.push(` :${propsName}="${value}"`)
                            } else if (config.ref === true) {//引用
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

        Object.keys(props).forEach(key => {
                if (key === 'ref') {
                    return false;
                }
                if (props[key] !== undefined && keys.indexOf(key) < 0) {
                    const value = props[key];
                    const typeOfValue = typeof value;

                    if (typeOfValue === 'boolean') {//针对boolean，是true直接写一个名称
                        if (!value) {
                            str.push(` :${key}=false`)
                        } else {
                            str.push(` ${key}`)
                        }
                    } else if (typeOfValue === 'string') {

                        str.push(` ${key}="${value}"`)
                    } else if (typeOfValue === 'number') {
                        str.push(` :${key}="${value}"`)
                    } else if (typeOfValue === 'object') {
                        str.push(renderObjectProps(key, value))
                    } else if (typeOfValue === 'function') {
                        const isNested = getFunctionName(value) === key;//是不是内嵌函数
                        if (key.indexOf("on") === 0) {
                            key = "@" + key.substring(2).toLowerCase();
                        }
                        if (isNested) {
                            str.push(` ${key}="${value.toString().replace(/\"/g, "'")}"`)
                        } else {
                            str.push(` ${key}="${getFunctionName(value)}"`)
                        }
                    }
                }


            }
        )

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
    events.map(e => {
        str.push(` @${e.name}=${e.fnName}`)
    })
    return str.join("");

}


const renderSlots = (item) => {
    const {tag, layout} = item.__config__;
    if (layout === 'fixedItem' && slotHtmlFunctions[tag]) {
        return slotHtmlFunctions[tag](item);
    } else {
        const slots = item.__slots__;
        if (!slots) {
            return "";
        }
        const array = [];
        for (const slotName in slots) {

            let s = renderItemList(slots[slotName]);
            console.info(slots[slotName],s)
            if (s && slotName !== "default") {
                s = `<template_alt #${slotName}>${s}</template_alt>` //fixme js beauty不支持这个
            }
            array.push(s)
        }
        return array.join("");
    }

}


//生成指令，todo element-plus指令只有一个loading其它没有，等多了再说
const renderDirective = (item) => {
    const {__directives__} = item;
    if (!__directives__) {
        return "";
    }
    const res = [];
    for (const key in __directives__) {
        console.info(key)
        const d = __directives__[key];
        let modifiersStr=""
        if( d.modifiers) {
             modifiersStr = d.modifiers.join(".");
            //todo 指令参数，目前element-plus指令太少
            if (modifiersStr) {
                modifiersStr = "." + modifiersStr;
            }
        }
        res.push(`v-${key}${modifiersStr}="${d.value}"`)
    }
    return res.join(" ");
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