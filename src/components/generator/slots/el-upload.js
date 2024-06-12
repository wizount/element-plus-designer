export default (scheme) => {
    const config = scheme.__config__
    const props = scheme.__props__
    const children = [];
    if (props['list-type'] === 'picture-card') {
        children.push("<el-icon><Plus/></el-icon>")
    } else {
        children.push(`<el-button type="primary">点击上传</el-button>`)
    }
    children.push(`<template_alt #tip> <div class="el-upload__tip">
                    只能上传不超过 ${config.fileSize}
                    ${config.sizeUnit} 的${props.accept}文件
                </div></template_alt>`);

    return children.join('\n')
}

