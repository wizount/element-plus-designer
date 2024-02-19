const d=o=>{const e=[];o.__data__;const t=o.__config__,i=t.optionType==="button"?"el-radio-button":"el-radio",n=t.border?"border":"";return e.push(`<${i} v-for="(item, index) in ${o.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${n}>{{item.label}}</${i}>`),e.join(`
`)};export{d as default};
