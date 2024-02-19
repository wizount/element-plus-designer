const l=i=>{const e=[];return e.push(`<el-option v-for="(item, index) in ${i.__refs__.options}" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`),e.join(`
`)};export{l as default};
