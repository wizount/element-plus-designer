const elementPlusRenderConfigMap = {}
/**
 * 将./slots中的文件挂载到对象slotFunctions上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */

import slotRenderFunctions from "@/components/FixedItem/slots";


const jsonFiles = import.meta.glob("./components/*.json", {query: "?json", import: 'default', eager: true});
const keys = Object.keys(jsonFiles) || []
keys.map(key => {
    const id = key.replace(/^\.\/(.*)\.\w+$/, '$1').split("/").pop();
    const json = jsonFiles[key];
    const conf = {}
    if (!json.directive) {
        conf.__id__=id;
        conf.__config__ = {
            tag: json.tag,
            layout: json.layouts[0]
        }
        if (json.__data__) {
            conf.__data__ = json.__data__;
        }
        if (slotRenderFunctions[json.tag]) {
            conf.__config__.layout = "fixedItem"
        }
    }
    elementPlusRenderConfigMap[id] = conf;
})
export default elementPlusRenderConfigMap;