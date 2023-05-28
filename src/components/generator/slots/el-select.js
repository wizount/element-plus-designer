// el-select 子级
export default (scheme) => {
    const children = []
    const slot = scheme.__slot__
    if (slot && slot.options && slot.options.length) {
        children.push(
            `<el-option v-for="(item, index) in ${scheme.__props__.__ref__.options}" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`
        )
    }
    return children.join('\n')
}
