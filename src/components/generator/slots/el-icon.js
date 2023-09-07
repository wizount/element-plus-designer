// el-icon 子级
export default (scheme) => {
    console.info(scheme)
    const icon=scheme.__data__.icon
    if (icon) {
        return `<${icon}/>`
    }
    return ''
}
