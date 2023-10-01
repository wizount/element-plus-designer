const r=o=>{const n=[],t=o.__data__,e=o.__config__;if(t&&t.options&&t.options.length){const i=e.optionType==="button"?"el-radio-button":"el-radio",d=e.border?"border":"";n.push(`<${i} v-for="(item, index) in ${o.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${d}>{{item.label}}</${i}>`)}return n.join(`
`)};export{r as default};
