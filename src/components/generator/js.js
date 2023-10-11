import elementPlusConfigMap from "@/element-plus-config"
import ruleTrigger from './ruleTrigger'
import {deepClone} from "@/utils";

//总入口
const imports = new Set();
let vModelRefGeneratedMap = {}
let variables = [];
let dynamicFunctions = [];
let optionsStyle=false;
//选项式
export const renderJsOption = (itemList) => {
    optionsStyle=true;
    clearAndStartProcess(itemList);
    return `{
       data(){
         return{
           ${variables.map(v => {
             return v.name + ":" + v.text}).join(",")}
         }
       }
    }`
}
//组合式
export const renderJsComposition = (itemList) => {
    optionsStyle=false;
    clearAndStartProcess(itemList);
    return ` ${variables.map(v => {
        if(v.noRef){
            return `const ${v.name} = ${v.text};`
        }else{
            return `const ${v.name} = ref(${v.text});`
        }
        
    }).join(",")}
    `
}

const clearAndStartProcess = (itemList) => {
    vModelRefGeneratedMap = {}
    imports.clear();
    variables = []
    processItemList(itemList);


}

//递归调用生成所有的元素
const processItemList = (itemList) => {
    if (!Array.isArray(itemList)) {
        return;
    }

    for (const item of itemList) {
        processItem(item);
    }
}
//单独生成元素
const processItem = (item) => {
    if (typeof item === 'string') {
        return
    }

    const tag = item.__config__.tag;

    if (tag === 'el-form') {
        addVariable(item.__props__.model, `{${processFormModel(item.__slots__.default).join(",")}}`);
        addVariable(item.__props__.rules, `{${processFormRules(item.__slots__.default).join(",")}}`, true);
    }
    processVModelRef(item);
    processPropRefs(item);
    processDynamicData(item);
    for (const slotName in item.__slots__) {
        processItemList(item.__slots__[slotName]);
    }
}
//生成表单数据
const processFormModel = (itemList) => {
    if (!Array.isArray(itemList)) {
        return [];
    }
    let data = [];
    for (const item of itemList) {
        if (item.__config__.tag === 'el-form') {
            continue;
        }
        if (item.__vModel__) {
            vModelRefGeneratedMap[item.__vModel__] = true;
            data.push(`${item.__vModel__}:${renderValue(item.__config__.defaultValue)}`)
        }
        data = data.concat(processFormModel(item.__slots__.default))
    }
    return data;
}
//生成表单校验
const processFormRules = (itemList) => {
    if (!Array.isArray(itemList)) {
        return [];
    }
    let rules = [];
    for (const item of itemList) {
        if (item.__config__.tag === 'el-form') {
            continue;
        }
        if (item.__vModel__) {
            const rule = processARule(item);
            rule && rules.push(rule)
        }
        rules = rules.concat(processFormRules(item.__slots__.default))
    }
    return rules;
}

// 构建校验规则
function processARule(item) {
    const config = item.__config__
    if (item.__vModel__ === undefined) return ""
    const rules = []
    if (ruleTrigger[config.tag]) {
        if (config.required) {
            const type = Array.isArray(config.defaultValue) ? "type: 'array'," : ''
            let message = Array.isArray(config.defaultValue)
                ? `请至少选择一个${config.label}`
                : item.placeholder
            if (message === undefined) message = `${config.label}不能为空`
            rules.push(
                `{ required: true, message: "${message}", trigger: "${
                    ruleTrigger[config.tag]
                }" }`
            )
        }
        if (config.regList && Array.isArray(config.regList)) {
            config.regList.forEach((item) => {
                if (item.pattern) {
                    rules.push(
                        `{ pattern: /${item.pattern}/,
                          message: "${item.message}",
                          trigger: "${ruleTrigger[config.tag]}" }`
                    )
                }
            })
        }
        return `${item.__vModel__}: [${rules.join(',')}]`
    }
    return ""
}

//生成属性ref
const processPropRefs = (item) => {

    const props = item.__props__ || {}
    const __refs__ = item.__refs__ || {}
    if (!optionsStyle&&props.ref) {//fixme 模板引用，选项式不运行！
        addVariable(props.ref, "undefined");
    }
    const {attributes} = elementPlusConfigMap[item.__id__]
    __refs__ && Object.keys(__refs__).forEach((k) => {
        let val = props[k];
        if (val === undefined) {
            val = getStaticData(item.__data__, k);
        }
        if (val === undefined && attributes[k] && attributes[k].required) {
            val = attributes[k].default;
        }
        addVariable(__refs__[k], renderValue(val, attributes[k] && attributes[k].default));
    })
}

function getStaticData(__data__, key) {
    if (__data__ === undefined || key === undefined || __data__.name !== key) {
        return undefined;
    }
    if (__data__.source === 'static') {
        return __data__[key];
    }
}

//生成动态的数据获取
const processDynamicData = (item) => {
    const {__data__, __refs__} = item;
    if (!__data__) {
        return;
    }
    const {name, source, dynamic} = __data__;
    if (source !== 'dynamic') {
        return;
    }
    const {url, method, dataKey} = dynamic;
    imports.add("import Axios from 'axios';")
    dynamicFunctions.push(`function get${titleCase(__refs__[name])} (){Axios({"${method}", "${url}"}).then((resp) => {
         ${__refs__[name]}.value=resp.data${dataKey ? "[" + dataKey + "]" : ""};
        })}`)

}

//生成v-model ref
const processVModelRef = (item) => {
    if (item.__vModel__ && !vModelRefGeneratedMap[item.__vModel__]) {
        addVariable(item.__vModel__, renderValue(item.__config__.defaultValue))
    }
}
const renderValue = (value, default_ob) => {
    if (value === undefined || value === null) {
        return "undefined"
    }
    if (typeof value === 'boolean' || typeof value === 'number') {//针对boolean，是true直接写一个名称
        return JSON.stringify(value)
    } else if (typeof value === 'string') {
        return `"${value}"`
    } else if (typeof value === 'object') {
        value = deepClone(value)
        if (!Array.isArray(value)) {
            Object.keys(value).forEach((k) => {
                if (!k || !value[k]) {
                    delete value[k];
                    return false;
                }
                if (default_ob && value[k] === default_ob[k]) {
                    delete value[k];
                }
            })
        }

        return JSON.stringify(value).replace(/\"(.[^-\"]*?)\":/g, '$1:');//.replace(/\"/g, "'");

    }
}


function addVariable(name, text, noRef) {
    variables.push({name, text, noRef})
}




