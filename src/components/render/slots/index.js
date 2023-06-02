import slotHtmlFunctions from "@/components/generator/slots";

const slotRenderFunctions = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */

const slotsFiles = import.meta.glob("./*.jsx");
const keys = Object.keys(slotsFiles) || []

for (const key of keys) {
    const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1').replace("slots/", "")
    const value = slotsFiles[key]
    value().then(res=>{
        slotHtmlFunctions[tag] = res.default
    })
}

export default slotRenderFunctions;
