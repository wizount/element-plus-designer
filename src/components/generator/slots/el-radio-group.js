
// el-radio-group 子级
export default (scheme) => {
    const children = []
    const slot = scheme.__slot__
    const config = scheme.__config__
    if (slot && slot.options && slot.options.length) {
        const tag = config.optionType === 'button' ? 'el-radio-button' : 'el-radio'
        const border = config.border ? 'border' : ''
        children.push(
            `<${tag} v-for="(item, index) in ${scheme.__props__.__ref__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.label}}</${tag}>`
        )
    }
    return children.join('\n')
}
