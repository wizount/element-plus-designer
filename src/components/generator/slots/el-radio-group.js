
// el-radio-group 子级
export default (scheme) => {
    const children = []
    const data = scheme.__data__
    const config = scheme.__config__
   // if (data && data.options && data.options.length) {
        const tag = config.optionType === 'button' ? 'el-radio-button' : 'el-radio'
        const border = config.border ? 'border' : ''
        children.push(
            `<${tag} v-for="(item, index) in ${scheme.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.label}}</${tag}>`
        )
   // }
    return children.join('\n')
}
