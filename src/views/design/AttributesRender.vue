<template>
  <el-form-item label="ref" v-if="activeData.__id__!=='plainText'">
    <el-input v-model="curItemProps.ref" title="请输入ref对象变量名">
    </el-input>
  </el-form-item>
  <el-form-item label="文字" v-if="activeData.__slots__&&typeof activeData.__slots__.default==='string'">
    <el-input v-model="activeData.__slots__.default" placeholder="请输入文字"/>
  </el-form-item>
  <template v-for="(v,k) in defaultSetterData" :key="k">
    <el-form-item v-show="!v.switch||v.switch&&curItemProps[v.switch[0]]===v.switch[1]"
                  :required="v.required">
      <template #label>
        <div>
          <span :title="`${k}${v.title?'：'+v.title:''}。${v.ref?'':'双击可以变成ref对象'}`"
                @dblclick.prevent="!v.ref&&switchRef(k)" @click.prevent="" class="mr-1">
          {{ v.label || v.title }}</span>
          <el-icon v-if="attributeConfig[k]&&attributeConfig[k].types.length>1" style="transform: rotate(90deg); cursor: pointer;"
                   :title="`当前${v.type.name}类型，点击更换类型`" @click="changeType(k,v.type.name)">
            <Sort/>
          </el-icon>
        </div>
      </template>

      <el-input v-model="__refs__[k]" placeholder="请输入ref对象变量名" title="请输入ref对象变量名"
                v-if="__refs__&&__refs__[k]">
        <template #prepend>REF</template>
      </el-input>
<!--      :treeProps="curItemProps.props"使用不明智，但确实解决了问题-->
      <config-value-input v-model="curItemProps[k]" v-if="v.type.tag" :treeProps="curItemProps.props"
                          :attr-config="v.type"></config-value-input>
    </el-form-item>
  </template>


</template>

<script setup>
import ConfigValueInput from "@/views/design/ConfigValueInput";
import {computed} from "vue";
import {ElMessageBox} from "element-plus";
import {camelCase, deepClone, getType} from "@/utils";
import {Sort} from "@element-plus/icons-vue";

const props = defineProps(["activeData", "attributeConfig"]);
const curItemConfig = computed(() => {
  return props.activeData.__config__ || {}
})
//当前组件的属性值
const curItemProps = computed(() => {
  return props.activeData.__props__ || {}
})
const __refs__ = computed(() => {
  return props.activeData && props.activeData.__refs__ || {}
})

onMounted(()=>{
  nextTick(()=>{
    setDefaultSetterData();
  })

})
const defaultSetterData = ref({});
watch(()=>curItemConfig.value.tag, (val) => {
  setDefaultSetterData();
})
function setDefaultSetterData(){
  defaultSetterData.value = {};
  const res = {};
  for (const name in props.attributeConfig) {
    if (name === 'placeholder' || name === 'vModel') {
      continue;
    }
    if (props.attributeConfig[name].hide) {
      continue;
    }

    const anotherConf = deepClone(props.attributeConfig[name]);
    let typeIndex = 0;
    let type = getType(curItemProps.value[name]);

    anotherConf.types.forEach((t, index) => {
      if (type === t.name) {
        typeIndex = index;
        return true;
      }
    })
    anotherConf.type = anotherConf.types[typeIndex]
    res[name] = anotherConf;
  }

  nextTick(() => {
    defaultSetterData.value = res;
  })
}

//更改

function changeType(key, typeName) {
  const types = props.attributeConfig[key].types;
  let nextTypeName
  let thisDefault;
  console.info(key)
  defaultSetterData.value[key].type = {};
  types.forEach((t, index) => {
    if (typeName === t.name) {
      const type = types[(index + 1) % types.length];

      nextTypeName = type.name;
      thisDefault = type.default;
      nextTick(() => {
        defaultSetterData.value[key].type = type;
      })
      return true;
    }
  })
  if (getType(props.attributeConfig[key].default) === nextTypeName) {
    curItemProps.value[key] = props.attributeConfig[key].default;
    return;
  }
  switch (nextTypeName) {

    case 'string':
      curItemProps.value[key] = "";
      break;
    case 'enum':
      curItemProps.value[key] = props.attributeConfig[key].default;
      break;
    case 'object':
      curItemProps.value[key] = {};
      break;
    case 'array':
      curItemProps.value[key] = [];
      break;
    case 'number':
      curItemProps.value[key] = thisDefault || 0;
      break;
    default:
      curItemProps.value[key] = undefined;
  }
}

function switchRef(key) {
  let __refs__ = props.activeData.__refs__;
  if (!__refs__) {
    props.activeData.__refs__ = {};
    __refs__ = props.activeData.__refs__;
  }
  let refName = __refs__[key];
  if (!refName) {
    ElMessageBox.confirm("是否将此设置改成ref对象？").then(() => {
      __refs__[key] = camelCase(curItemConfig.value.itemName + "-" + key);
    })
  } else {
    delete __refs__[key]
  }
}
</script>

<style scoped>

</style>