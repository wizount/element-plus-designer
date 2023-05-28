const i=o=>{const t=[],e=o.__slot__;return e&&e.options&&e.options.length&&t.push(`<el-option v-for="(item, index) in ${o.__props__.__ref__.options}" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`),t.join(`
`)};export{i as default};
