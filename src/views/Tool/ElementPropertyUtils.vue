<!--从element-plus复制属性过来，变成settingConfig需要的格式-->
<template>
  <div style="display: flex">
    <div style="width: 50%">
      <el-input type="textarea" v-model="input" placeholder="请输入" :input-style="{height: 'calc(100vh)'}"></el-input>
    </div>
    <div style="width: 50%">
      <el-input type="textarea" v-model="output" :input-style="{height: 'calc(100vh)'}"></el-input>
    </div>
  </div>
</template>
<script setup>

const input = ref('');
const output = ref('')
watch(input, (val) => {
  const lines = val.split("\n");
  const props = {}
  for (let l of lines) {
    l = l.trim()
    if (!l) {
      continue;
    }
    let cols = l.split("\t")
    if (cols.length === 1) {
      cols = l.split(" ")
    }
    if (cols.length === 5) {
      const prop = {};
      prop.label = "",
          prop.title = cols[1].trim();
      prop.type = cols[2].trim()

      if (cols[3] && cols[3] !== '—' && cols[3] !== '-') {
        const options = cols[3].split('/')
        prop.options = options.map((v) => {
          v = v.trim()
          return {label: v, value: v}
        })
      }
      if (cols[4] === '—' || cols[4] === '-') {
        prop.default = undefined
      } else {
        if (prop.type.indexOf('boolean') > -1 || prop.type.indexOf('array') > -1 || prop.type.indexOf('object') > -1 || prop.type.indexOf('number') > -1) {
          try {
            prop.default = JSON.parse(cols[4])
          } catch (e) {
            prop.default = cols[4]
          }
        } else {
          prop.default = cols[4].trim()
        }
      }

      props[cols[0]] = prop
    }
    if (cols.length === 4) {
      const prop = {};
      prop.label = "",
          prop.title = cols[1].trim();
      prop.type = 'string'

      if (cols[2] && cols[2] !== '—' && cols[2] !== '-') {
        const options = cols[2].split('/')
        prop.options = options.map((v) => {
          v = v.trim()
          return {label: v, value: v}
        })
      }
      if (cols[3] === '—' || cols[3] === '-') {
        prop.default = undefined
      } else {
        if (prop.type.indexOf('boolean') > -1 || prop.type.indexOf('array') > -1 || prop.type.indexOf('object') > -1 || prop.type.indexOf('number') > -1) {
          try {
            prop.default = JSON.parse(cols[3])
          } catch (e) {
            prop.default = cols[3]
          }
        } else {
          prop.default = cols[3].trim()
        }
      }
      props[cols[0]] = prop;
      console.info(props)
    }
  }

  output.value = JSON.stringify(props).replace(/\"(.[^-\"]*?)\":/g, '$1:')
})
</script>
<style>
</style>
