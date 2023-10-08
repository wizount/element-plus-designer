<template>
  <el-form-item label="组件布局" v-if="curComConfig.layouts&&curComConfig.layouts.length>1">
    <el-radio-group v-model="curItemConfig.layout">
      <el-radio-button v-for="v in curComConfig.layouts" :label="v">{{ v }}</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="组件名">
    <el-input v-model="curItemConfig.itemName" placeholder="请输入组件名"/>
  </el-form-item>
  <el-form-item label="ref" v-if="activeData.__id__!=='plainText' &&typeof activeData!=='string'">
    <el-input v-model="curItemProps.ref" title="请输入ref对象变量名">
    </el-input>
  </el-form-item>
  <el-form-item label="文字" v-if="activeData.__slots__&&typeof activeData.__slots__.default==='string'">
    <el-input v-model="activeData.__slots__.default" placeholder="请输入文字"/>
  </el-form-item>
  <el-form-item
      v-if="curItemConfig.showLabel !== undefined &&curItemConfig.labelWidth !== undefined"
      label="显示标签">
    <el-switch v-model="curItemConfig.showLabel"/>
  </el-form-item>
  <el-form-item v-if="curItemConfig.showLabel" label="标题">
    <el-input v-model="curItemConfig.label" placeholder="请输入标题"/>
  </el-form-item>
  <el-form-item v-if="curItemConfig.showLabel" label="标签宽度">
    <el-input v-model.number="curItemConfig.labelWidth" type="number" placeholder="请输入标签宽度"/>
  </el-form-item>
  <el-form-item v-if="curItemProps.placeholder !== undefined" label="占位提示">
    <el-input v-model="curItemProps.placeholder" placeholder="请输入占位提示"/>
  </el-form-item>
  <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名" title="字段名，用于v-model">
    <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"/>
  </el-form-item>
  <el-form-item v-if="activeData.__vModel__ !== undefined">
    <template #label>
      默认值
      <el-tooltip content="请在控件上输入" placement="top">
        <el-button text circle icon="InfoFilled" style="float:right"></el-button>
      </el-tooltip>
    </template>
    <div style="display: flex;width: 100%">
      <div style="flex: 1"> {{ curItemConfig.defaultValue }}</div>
      <el-button text icon="CircleClose" type="danger" title="清空"
                 @click="curItemConfig.defaultValue=undefined"></el-button>
    </div>

  </el-form-item>
  <el-form-item v-if="curItemConfig.tag==='el-dialog'||curItemConfig.tag==='el-drawer'" label="显示"
                title="显示dialog或者drawer">
    <el-button
        @click="curItemConfig.defaultValue=!curItemConfig.defaultValue">显示{{ curItemConfig.tag }}
    </el-button>
  </el-form-item>
  <el-form-item v-if="curItemConfig.optionType !== undefined" label="选项样式">
    <el-radio-group v-model="curItemConfig.optionType">
      <el-radio-button label="default">默认</el-radio-button>
      <el-radio-button label="button">按钮</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item v-if="curItemConfig.iconName !== undefined" label="图标">
    <icon-chooser v-model="curItemConfig.iconName"></icon-chooser>
  </el-form-item>
  <el-form-item v-if="curItemConfig.reference !== undefined" label="文字">
    <el-input v-model="curItemConfig.reference"/>
  </el-form-item>

  <el-form-item v-if="curItemConfig.required !== undefined" label="必填">
    <el-switch v-model="curItemConfig.required"></el-switch>
  </el-form-item>
  <el-form-item v-if="activeData.__data__" :label="curComConfig.data.label">

    <el-radio-group v-model="activeData.__data__.source" class="mb-2">
      <el-radio-button label="static">静态数据</el-radio-button>
      <el-radio-button label="dynamic">动态数据</el-radio-button>
    </el-radio-group>
    <el-input v-model="activeData.__refs__[curComConfig.data.name]"
              v-if="activeData.__data__[activeData.__data__.source].ref">
      <template #prepend>REF</template>
    </el-input>
    <div v-show="activeData.__data__.source==='static'">

      <config-value-input :attr-config="curComConfig.data.static.type" :treeProps="curItemProps.props"
                          v-model="activeData.__data__[curComConfig.data.name]"></config-value-input>
    </div>
    <div v-show="activeData.__data__.source==='dynamic'">
      <el-form-item label="网址">
        <el-input v-model="activeData.__data__.dynamic.url" placeholder="网址">
        </el-input>
      </el-form-item>
      <el-form-item label="方法">
        <el-select v-model="activeData.__data__.dynamic.method" placeholder="方法">
          <el-option label="get" value="get"></el-option>
          <el-option label="post" value="post"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据位置">
        <el-input v-model="activeData.__data__.dynamic.dataKey" placeholder="数据位置" @change="changeRenderKey()">
        </el-input>
      </el-form-item>
    </div>
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
import IconChooser from "@/components/editors/IconChooser.vue";
import elementPlusConfigMap from "@/element-plus-config";

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
const curComConfig = computed(() => {
  return elementPlusConfigMap[props.activeData.__id__] || {}
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