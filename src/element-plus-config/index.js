const elementPlusConfigMap = {}
/**
 * 将./slots中的文件挂载到对象slotFunctions上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */

const jsonFiles = import.meta.glob("./json/*.json", {as: "raw", eager: true});
const keys = Object.keys(jsonFiles) || []
keys.map(key => {
    const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1').split("/").pop();
    elementPlusConfigMap[tag] = JSON.parse(jsonFiles[key]);//fixme 有没有比较好的方法，不用再parse一次
    if (!elementPlusConfigMap[tag].attributes) {
        elementPlusConfigMap[tag].attributes = []
    }
    if (!elementPlusConfigMap[tag].slots) {
        elementPlusConfigMap[tag].slots = []
    }
})
Object.assign( elementPlusConfigMap["tree-select"].attributes,elementPlusConfigMap["select"].attributes);
Object.assign( elementPlusConfigMap["tree-select"].attributes,elementPlusConfigMap["tree"].attributes);
export default elementPlusConfigMap;
