const i=e=>{const l=e.__config__,p=e.__props__,t=[];return p["list-type"]==="picture-card"?t.push("<el-icon><Plus/></el-icon>"):t.push('<el-button type="primary">点击上传</el-button>'),t.push(`<template_alt #tip> <div class="el-upload__tip">
                    只能上传不超过 ${l.fileSize}
                    ${l.sizeUnit} 的${p.accept}文件
                </div></template_alt>`),t.join(`
`)};export{i as default};
