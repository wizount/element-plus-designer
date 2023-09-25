// el-icon 子级
export default (scheme) => {
    const icon=scheme.__config__.iconName
    if (icon) {
        return `<${icon}/>`
    }
    return ''
}
