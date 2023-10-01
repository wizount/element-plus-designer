const o=t=>{const i=[],e=t.__data__;return e&&e.options&&e.options.length&&i.push(`<el-option v-for="(item, index) in ${t.__refs__.options}" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`),i.join(`
`)};export{o as default};
