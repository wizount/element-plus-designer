export const renderJs = (itemList) => {
    return `${renderRefs(itemList).join("")}
    ${renderOptions(itemList).join("")}
     const rules={${renderAllRules(itemList).join("")}}`;

}
export const renderRefs = (itemList) => {
    let refs = [];
    for (const item of itemList) {
        if (item.__vModel__) {
            refs.push(`const ${item.__vModel__}=ref(${renderValue(item.__config__.defaultValue)});`)
        }
        if (item.__children__) {
            refs = refs.concat(renderRefs(item.__children__))
        }
    }
    return refs;
}
const renderValue = (value) => {
    if (value == undefined || value == null) {
        return ""
    }
    if (typeof value == 'boolean' || typeof value == 'number') {//针对boolean，是true直接写一个名称
        return JSON.stringify(value)
    } else if (typeof value == 'string') {
        return `"${value}"`
    } else if (typeof value == 'object') {
        value = deepClone(value)
        Object.keys(value).forEach((k) => {
            if (!k || !value[k]) {
                delete value[k]
            }
        })
        return JSON.stringify(value).replace(/\"(.[^-\"]*?)\":/g, '$1:').replace(/\"/g, "'");

    }
}

const renderOptions = (itemList) => {
    let options = [];
    for (const item of itemList) {
        if (item.__vModel__) {
            const {tag} = item.__config__;
            if (tag == 'el-select' || tag == 'el-radio-group' || tag == 'el-checkbox-group') {
                options.push(`const ${item.__vModel__}Options=ref(${renderValue(item.__slot__.options)});`)
            }
        }
        if (item.__children__) {
            options = options.concat(renderOptions(item.__children__))
        }
    }
    return options;
}

const renderAllRules = (itemList) => {
    let rules = [];
    for (const item of itemList) {
        if (item.__vModel__) {
            rules.push(renderARules(item))
        }
        if (item.__children__) {
            rules = rules.concat(renderAllRules(item.__children__))
        }
    }
    return rules;
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
                `{ required: true, ${type} message: '${message}', trigger: '${
                    ruleTrigger[config.tag]
                }' }`
            )
        }
        if (config.regList && Array.isArray(config.regList)) {
            config.regList.forEach((item) => {
                if (item.pattern) {
                    rules.push(
                        `{ pattern: ${item.pattern},
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
    const slot = scheme.__slot__
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
    if (!options) options = scheme.__slot__.options
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
            const type =  Array.isArray(config.defaultValue) ? 'type: \'array\',' : ''
            let message =  Array.isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.placeholder
            if (message === undefined) message = `${config.label}不能为空`
            rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[config.tag]}' }`)
        }
        if (config.regList &&  Array.isArray(config.regList)) {
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
