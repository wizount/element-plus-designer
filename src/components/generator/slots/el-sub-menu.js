// el-input 子级
export default (scheme) => {
    const slot = scheme .__slot__
    if (slot && slot.title) {
        return `<template #title>${slot.title}</template>`
    }
    return ''
}
