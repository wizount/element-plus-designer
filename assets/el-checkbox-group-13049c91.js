const l=o=>{const e=[],t=o.__slot__,n=o.__config__;if(t&&t.options&&t.options.length){const i=n.optionType==="button"?"el-checkbox-button":"el-checkbox",_=n.border?"border":"";e.push(`<${i} v-for="(item, index) in ${o.__props__.__ref__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${_}>{{item.label}}</${i}>`)}return e.join(`
`)};export{l as default};
