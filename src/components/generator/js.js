import elementPlusConfigMap from "@/element-plus-config"
//总入口
const imports = new Set();
export const renderJs = (itemList) => {
    let res = [];
    vModelRefGeneratedMap = {}
    imports.clear();
    res.push(renderItemList(itemList));
    res.splice(0, 0, ...Array.from(imports))
    return res.join("");
}

//递归调用生成所有的JS
const renderItemList = (itemList) => {
    if (!Array.isArray(itemList)) {
        return [];
    }
    let res = [];
    for (const item of itemList) {
        res.push(renderItem(item).join(""));
    }
    return res.join("");
}
//单独生成
const renderItem = (item) => {
    if (typeof item === 'string') {
        return []
    }
    let res = []
    const tag = item.__config__.tag;

    if (tag === 'el-form') {
        res.push(`const ${item.__props__.model}=ref({${renderFormData(item.__slots__.default).join("")}});`)
        res.push(`const ${item.__props__.rules}={${renderFormRules(item.__slots__.default).join("")}};`)
    }
    res.push(renderVModelRef(item));
    res.push(renderPropRefs(item));
    res.push(renderDynamicData(item));
    for (const slotName in item.__slots__) {
        res.push(renderItemList(item.__slots__[slotName]));
    }


    // res.push(renderNotFormRefs(item).join(""))


    return res;
}
//生成表单数据
const renderFormData = (itemList) => {
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
            data.push(`${item.__vModel__}:${renderValue(item.__config__.defaultValue)},`)
        }
        data = data.concat(renderFormData(item.__slots__.default))
    }
    return data;
}
//生成表单校验
const renderFormRules = (itemList) => {
    if (!Array.isArray(itemList)) {
        return [];
    }
    let rules = [];
    for (const item of itemList) {
        if (item.__config__.tag === 'el-form') {
            continue;
        }
        if (item.__vModel__) {
            rules.push(renderARules(item))
        }
        rules = rules.concat(renderFormRules(item.__slots__.default))
    }
    return rules;
}
//生成属性ref
export const renderPropRefs = (item) => {
    const refs = [];
    const props = item.__props__||{}
    const __refs__ = item.__refs__||{}
    if (props.ref) {
        refs.push(` const ${props.ref}=ref(undefined);`)
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
        refs.push(` const ${__refs__[k]}=ref(${renderValue(val, attributes[k] && attributes[k].default)});`)
    })
    return refs.join("");
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
export const renderDynamicData = (item) => {
    const {__data__, __refs__} = item;
    if (!__data__) {
        return "";
    }
    const {name, source, dynamic} = __data__;
    if (source !== 'dynamic') {
        return "";
    }
    const {url, method, dataKey} = dynamic;
    imports.add("import Axios from 'axios';")
    return `function get${titleCase(__refs__[name])} (){Axios({"${method}", "${url}"}).then((resp) => {
         ${__refs__[name]}.value=resp.data${dataKey ? "[" + dataKey + "]" : ""};
        })}`;
    //  return refs.join("");
}
let vModelRefGeneratedMap = {}
//生成v-model ref
export const renderVModelRef = (item) => {
    if (item.__vModel__ && !vModelRefGeneratedMap[item.__vModel__]) {
        return `const ${item.__vModel__}=ref(${renderValue(item.__config__.defaultValue)});`;
    }
    return "";
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


// 构建校验规则
function renderARules(item) {
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
                `{ required: true, message: '${message}', trigger: '${
                    ruleTrigger[config.tag]
                }' }`
            )
        }
        if (config.regList && Array.isArray(config.regList)) {
            config.regList.forEach((item) => {
                if (item.pattern) {
                    rules.push(
                        `{ pattern: /${item.pattern}/,
                          message: '${item.message}',
                          trigger: '${ruleTrigger[config.tag]}' }`
                    )
                }
            })
        }
        return `${item.__vModel__}: [${rules.join(',')}],`
    }
    return ""
}


import {exportDefault, titleCase, deepClone} from '@/utils/index'
import ruleTrigger from './ruleTrigger'
import {isArrayEqual, isObjectEqual} from "@/components/generator/utils";
import {renderObjectProps} from "@/components/generator/html";

const units = {
    KB: '1024',
    MB: '1024 / 1024',
    GB: '1024 / 1024 / 1024',
}
let confGlobal
const inheritAttrs = {
    file: '',
    dialog: 'inheritAttrs: false,',
}

/**
 * 组装js 【入口函数】
 * @param {Object} designConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpJs(designConfig, type) {
    confGlobal = designConfig = deepClone(designConfig)
    const dataList = []
    const ruleList = []
    const optionsList = []
    const propsList = []
    const methodList = mixinMethod(type)
    const uploadVarList = []
    const created = []

    designConfig.fields.forEach((el) => {
        buildAttributes(
            el,
            dataList,
            ruleList,
            optionsList,
            methodList,
            propsList,
            uploadVarList,
            created
        )
    })

    const script = vue3build(
        designConfig,
        type,
        dataList.join('\n'),
        ruleList.join('\n'),
        optionsList.join('\n'),
        uploadVarList.join('\n'),
        propsList.join('\n'),
        methodList.join('\n'),
        created.join('\n')
    )
    confGlobal = null
    return script
}

// 构建组件属性
function buildAttributes(
    scheme,
    dataList,
    ruleList,
    optionsList,
    methodList,
    propsList,
    uploadVarList,
    created
) {
    const config = scheme.__config__
    const slot = scheme.__data__
    buildData(scheme, dataList)
    buildRules(scheme, ruleList)

    // 特殊处理options属性
    if (scheme.options || (slot && slot.options && slot.options.length)) {
        buildOptions(scheme, optionsList)
        if (config.dataType === 'dynamic') {
            const model = `${scheme.__vModel__}Options`
            const options = titleCase(model)
            const methodName = `get${options}`
            buildOptionMethod(methodName, model, methodList, scheme)
            callInCreated(methodName, created)
        }
    }

    // 处理props
    if (scheme.props && scheme.props.props) {
        buildProps(scheme, propsList)
    }

    // 处理el-upload的action
    if (scheme.action && config.tag === 'el-upload') {
        uploadVarList.push(
            `const ${scheme.__vModel__}Action= '${scheme.action}';
      const  ${scheme.__vModel__}fileList=[];`
        )
        methodList.push(buildBeforeUpload(scheme))
        // 非自动上传时，生成手动上传的函数
        if (!scheme['auto-upload']) {
            methodList.push(buildSubmitUpload(scheme))
        }
    }

    // 构建子级组件属性
    if (config.children) {
        config.children.forEach((item) => {
            buildAttributes(
                item,
                dataList,
                ruleList,
                optionsList,
                methodList,
                propsList,
                uploadVarList,
                created
            )
        })
    }
}

// 在Created调用函数
function callInCreated(methodName, created) {
    created.push(`${methodName}()`)
}

// 混入处理函数
function mixinMethod(type) {
    const list = []
    const minxins = {
        file: confGlobal.formBtns
            ? {
                submitForm: `function submitForm() {
        ${confGlobal.formRef}.value.validate(valid => {
          if(!valid) return
          // TODO 提交表单
        })
      }`,
                resetForm: `function resetForm() {
        ${confGlobal.formRef}.value.resetFields()
      }`,
            }
            : null,
        dialog: {
            onOpen: 'function onOpen() {}',
            onClose: `function onClose() {
        ${confGlobal.formRef}.value.resetFields()
      }`,
            close: `function close() {
        this.$emit('update:modelValue', false)
      }`,
            handelConfirm: `function handelConfirm() {
        ${confGlobal.formRef}.value.validate(valid => {
          if(!valid) return
          close()
        })
      }`,
        },
    }

    const methods = minxins[type]
    if (methods) {
        Object.keys(methods).forEach((key) => {
            list.push(methods[key])
        })
    }

    return list
}

// 构建data
function buildData(scheme, dataList) {
    const config = scheme.__config__
    if (scheme.__vModel__ === undefined) return
    const defaultValue = JSON.stringify(config.defaultValue)
    dataList.push(`${scheme.__vModel__}: ${defaultValue},`)
}


// 构建options
function buildOptions(scheme, optionsList) {
    if (scheme.__vModel__ === undefined) return
    // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
    let {options} = scheme
    if (!options) options = scheme.__data__.options
    if (scheme.__config__.dataType === 'dynamic') {
        options = []
    }
    const str = `const ${scheme.__vModel__}Options=${JSON.stringify(options)};`
    optionsList.push(str)
}

function buildProps(scheme, propsList) {
    const str = `const ${scheme.__vModel__}Props= ${JSON.stringify(
        scheme.props.props
    )};`
    propsList.push(str)
}

// 构建校验规则
function buildRules(scheme, ruleList) {
    const config = scheme.__config__
    if (scheme.__vModel__ === undefined) return
    const rules = []
    if (ruleTrigger[config.tag]) {
        if (config.required) {
            const type = Array.isArray(config.defaultValue) ? 'type: \'array\',' : ''
            let message = Array.isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.placeholder
            if (message === undefined) message = `${config.label}不能为空`
            rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[config.tag]}' }`)
        }
        if (config.regList && Array.isArray(config.regList)) {
            config.regList.forEach(item => {
                if (item.pattern) {
                    rules.push(
                        `{ pattern: ${eval(item.pattern)}, message: '${item.message}', trigger: '${ruleTrigger[config.tag]}' }`
                    )
                }
            })
        }
        ruleList.push(`${scheme.__vModel__}: [${rules.join(',')}],`)
    }
}

// el-upload的BeforeUpload
function buildBeforeUpload(scheme) {
    const config = scheme.__config__
    const unitNum = units[config.sizeUnit]
    let rightSizeCode = ''
    let acceptCode = ''
    const returnList = []
    if (config.fileSize) {
        rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
    if(!isRightSize){
      ElMessage.error('文件大小超过 ${config.fileSize}${config.sizeUnit}')
    }`
        returnList.push('isRightSize')
    }
    if (scheme.accept) {
        acceptCode = `let isAccept = new RegExp('${scheme.accept}').test(file.type)
    if(!isAccept){
      ElMessage.error('应该选择${scheme.accept}类型的文件')
    }`
        returnList.push('isAccept')
    }
    const str = `function ${scheme.__vModel__}BeforeUpload(file) {
    ${rightSizeCode}
    ${acceptCode}
    return ${returnList.join('&&')}
  }`
    return returnList.length ? str : ''
}

// el-upload的submit
function buildSubmitUpload(scheme) {
    const str = `function submitUpload() {
    this.$refs['${scheme.__vModel__}'].submit()
  }`
    return str
}

function buildOptionMethod(methodName, model, methodList, scheme) {
    const config = scheme.__config__
    const str = `function ${methodName}() {
    // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
    this.$axios({
      method: '${config.method}',
      url: '${config.url}'
    }).then(resp => {
      var { data } = resp
      this.${model} = data.${config.dataPath}
    })
  }`
    methodList.push(str)
}

// vue3 js整体拼接
function vue3build(
    conf,
    type,
    data,
    rules,
    selectOptions,
    uploadVar,
    props,
    methods,
    created
) {
    const str = `
  const  ${conf.formModel}= ref({
        ${data}
      });
  const ${conf.formRules}=ref( {
        ${rules}
      });
      ${uploadVar}
      ${selectOptions}
      ${props}
      
   const ${confGlobal.formRef}=ref(null)
   onMounted(() => {
    ${created}
    })
    ${methods}
`
    return str
}
