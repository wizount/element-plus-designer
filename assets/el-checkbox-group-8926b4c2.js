const r=e=>{const o=[];e.__data__;const t=e.__config__,n=t.optionType==="button"?"el-checkbox-button":"el-checkbox",i=t.border?"border":"";return o.push(`<${n} v-for="(item, index) in ${e.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${i}>{{item.label}}</${n}>`),o.join(`
`)};export{r as default};
