const _=o=>{const n=[],t=o.__slot__,e=o.__config__;if(t&&t.options&&t.options.length){const i=e.optionType==="button"?"el-radio-button":"el-radio",r=e.border?"border":"";n.push(`<${i} v-for="(item, index) in ${o.__props__.__ref__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${r}>{{item.label}}</${i}>`)}return n.join(`
`)};export{_ as default};
