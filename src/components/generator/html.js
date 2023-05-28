import propertyConfigList from './settingConfig'
import slotHtmlFunctions from "./slots";

export function vue3Template(itemList) {
    return `<template>
    <div style="padding: 5px">
     ${renderHtml(itemList)}
    </div>
  </template>`
}

export const renderHtml = (itemList, formModelName) => {
    if (!itemList) {
        return ""
    }
    let html = [];
    for (const item of itemList) {
        html.push(renderElement(item, formModelName))
    }
    return html.join("")

}
//单个组件
export const renderElement = (item, formModelName) => {
    const {tag, layout} = item.__config__;
    const id = item.__id__;
    if (id === 'text') {//todo 只有文字而已，目前用span代替，应该有更好的方法
        return renderSlot(item)
    } else {
        let childHtml
        if (tag === "el-form") {
            let {model} = item.__props__;
            childHtml = `<${tag}${renderProps(item)}>${renderSlot(item)}${renderHtml(item.__children__, model)}</${tag}>`;
        } else {
            childHtml = `<${tag}${renderProps(item, formModelName)}>${renderSlot(item)}${renderHtml(item.__children__, formModelName)}</${tag}>`;
        }
        if (layout === 'formItem') {
            return renderFormItem(item, childHtml)
        } else {
            return childHtml
        }

    }

}
//组件
export const renderProps = (item, formModelName) => {
    const id = item.__id__;
    const configs = propertyConfigList[id];
    const props = item.__props__
    const str = []
    if (configs) {
        const keys = Object.keys(configs)
        keys.push('style');//多一个style
        keys.forEach((propsName) => {
            const value = props[propsName];
            const config = configs[propsName];
            if (config&&!config.slot && props.__ref__[propsName]) {
                str.push(` :${propsName}="${props.__ref__[propsName]}"`);
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
                            }else {
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
                                    str.push(renderObjectProps(propsName, value))
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
    return str.join("");

}


export const renderSlot = (item) => {
    const slot = item.__slot__;
    if (!slot) {
        return "";
    }
    const tag = item.__config__.tag;
    if (slot.default) {
        return slot.default;
    }
    if (slotHtmlFunctions[tag])
        return slotHtmlFunctions[tag](item);
    return "";
}

export const renderFormItem = (item, child) => {
    const config = item.__config__
    let labelWidth = ''
    let label = `label="${config.label}"`
    if (config.labelWidth ) {
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
export const renderObjectProps = (propsName, ob) => {
    if (!ob) {
        return ""
    }
    ob = deepClone(ob)
    Object.keys(ob).forEach((k) => {//删除空值
        if (!k || ob[k] === "" || ob[k] === undefined) {
            delete ob[k]
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
import {deepClone} from "@/utils";
import {isArrayEqual, isObjectEqual} from "@/components/generator/utils";


export function dialogWrapper(str) {
    return `<el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
    ${str}
    <template #footer>
     <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </template>
  </el-dialog>`
}


export function vueScript(html,script) {
    return `${html}
<script setup>
${script}
</script>`
}


export function cssStyle(cssStr) {
    return `<style>
    ${cssStr}
  </style>`
}

