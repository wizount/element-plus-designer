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
const input = ref('model-value / v-model\t绑定值\tstring / number / boolean / object\t—\t—\n' +
    'multiple\t是否多选\tboolean\t—\tfalse\n' +
    'disabled\t是否禁用\tboolean\t—\tfalse\n' +
    'value-key\t作为 value 唯一标识的键名，绑定值为对象类型时必填\tstring\t—\tvalue\n' +
    'size\t输入框尺寸\tstring\tlarge/default/small\tdefault\n' +
    'clearable\t是否可以清空选项\tboolean\t—\tfalse\n' +
    'clear-icon\t自定义清除图标\tstring | Component\t—\tCircleClose\n' +
    'collapse-tags\t多选时是否将选中值按文字的形式展示\tboolean\t—\tfalse\n' +
    'collapse-tags-tooltip\t当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 只有当 collapse-tags 设置为 true 时才会生效。\tboolean\ttrue / false\tfalse\n' +
    'multiple-limit\t多选时可被选择的最大数目。 当被设置为0时，可被选择的数目不设限。\tnumber\t—\t0\n' +
    'name\t选择器的原生name属性\tstring\t—\t—\n' +
    'effect\t文字提示（Tooltip）的主题，内置dark和light两种。\tstring\tstring\tlight\n' +
    'autocomplete\t自动完成选择输入\tstring\t—\toff\n' +
    'placeholder\tselect input的原生autocomplete属性\tstring\t—\tPlease select\n' +
    'filterable\t是否可筛选\tboolean\t—\tfalse\n' +
    'allow-create\t是否允许创建新条目， 当使用该属性时，filterable必须设置为true\tboolean\t—\tfalse\n' +
    'reserve-keyword\t筛选时，是否在选择选项后保留关键字\tboolean\t—\ttrue\n' +
    'no-data-text\t当在没有数据时显示的文字，你同时可以使用#empty插槽进行设置。\tstring\t—\tNo Data\n' +
    'popper-class\t选择器下拉菜单的自定义类名\tstring\t—\t—\n' +
    'popper-append-to-body(deprecated)\t是否将弹出框插入至 body 元素 当弹出框的位置出现问题时，你可以尝试将该属性设置为false。\tboolean\t-\tfalse\n' +
    'teleported\t该下拉菜单是否使用teleport插入body元素\tboolean\ttrue / false\ttrue\n' +
    'persistent\t当下拉选择器未被激活并且persistent设置为false，选择器会被删除。\tboolean\ttrue / false\ttrue\n' +
    'popper-options\t自定义 popper 选项，更多请参考 popper.js\tobject\t-\t-\n' +
    'automatic-dropdown\t对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单\tboolean\t-\tfalse\n' +
    'height\t下拉菜单的高度，每一个子选项的高度是 34px\tnumber\t-\t170\n' +
    'scrollbar-always-on\t控制是否总是展示滚动条\tboolean\t-\tfalse\n' +
    'remote\t是否从服务器搜索数据\tboolean\t—\tfalse\n' +
    'remote-method\t当输入值发生变化时被调用的函数。 其参数是当前输入值。 只有当 filterable 设置为 true 时才会生效。\tfunction(keyword: string)\t—\t—\n' +
    'validate-event\t输入时是否触发表单的校验\tboolean\t-\ttrue\n' +
    'placement\t下拉框出现的位置\tstring\ttop/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end\tbottom-start')

console.info("\"button\":  \"bu-tton\":".replace(/\"(.[^-]*?)\":/g, '$1:'))
const output = ref('')
watch(input, (val) => {
  const lines = val.split("\n");
  const props = {}
  for (let l of lines) {
    l = l.trim()
    if (!l) {
      return
    }
    let cols = l.split("\t")
    if(cols.length==1){
      cols=l.split(" ")
    }
    if (cols.length == 5) {
      const prop = {};
      prop.label = "",
          prop.title = cols[1].trim();
      prop.type = cols[2].trim()

      if (cols[3] && cols[3] != '—' && cols[3] != '-') {
        const options = cols[3].split('/')
        prop.options = options.map((v) => {
          v = v.trim()
          return {label: v, value: v}
        })
      }
      if (cols[4] == '—' || cols[4] == '-') {
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
    if (cols.length == 4) {
      const prop = {};
      prop.label = "",
          prop.title = cols[1].trim();
      prop.type = 'string'

      if (cols[2] && cols[2] != '—' && cols[2] != '-') {
        const options = cols[2].split('/')
        prop.options = options.map((v) => {
          v = v.trim()
          return {label: v, value: v}
        })
      }
      if (cols[3] == '—' || cols[3] == '-') {
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

      props[cols[0]] = prop
    }
  }
  output.value = JSON.stringify(props).replace(/\"(.[^-\"]*?)\":/g, '$1:')
})
</script>
<style>
</style>
