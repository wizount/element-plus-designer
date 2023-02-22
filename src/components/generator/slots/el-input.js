// el-input 子级
export default (scheme) => {
    const children = []
    const slot = scheme.__slot__
    if (slot && slot.prepend) {
        children.push(`<template #prepend>${slot.prepend}</template>`)
    }
    if (slot && slot.append) {
        children.push(`<template #append>${slot.append}</template>`)
    }
    return children.join('\n')
}
