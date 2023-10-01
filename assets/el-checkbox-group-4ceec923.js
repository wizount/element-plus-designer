const r=o=>{const e=[],t=o.__data__,n=o.__config__;if(t&&t.options&&t.options.length){const i=n.optionType==="button"?"el-checkbox-button":"el-checkbox",l=n.border?"border":"";e.push(`<${i} v-for="(item, index) in ${o.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${l}>{{item.label}}</${i}>`)}return e.join(`
`)};export{r as default};
