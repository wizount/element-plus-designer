<template>
  <el-form-item label="组件布局" v-if="activeComConfig.layouts&&activeComConfig.layouts.length>1">
    <el-radio-group v-model="activeItemConfig.layout">
      <el-radio-button v-for="v in activeComConfig.layouts" :value="v">{{ v }}</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="组件名" v-if="activeItem.__id__&&activeItem.__id__!=='plainText'">
    <el-input v-model="activeItemConfig.itemName" placeholder="请输入组件名"/>
  </el-form-item>
  <el-form-item label="ref" v-if="activeItem.__id__!=='plainText' &&typeof activeItem!=='string'">
    <el-input v-model="activeItemProps.ref" title="请输入ref对象变量名">
    </el-input>
  </el-form-item>
  <template v-if="activeItemConfig.wrapWithFormItem">

    <el-divider>表单属性</el-divider>
    <el-form-item
        v-if="activeItemConfig.showLabel !== undefined &&activeItemConfig.labelWidth !== undefined"
        label="显示标签">
      <el-switch v-model="activeItemConfig.showLabel"/>
    </el-form-item>
    <el-form-item v-if="activeItemConfig.showLabel" label="标题">
      <el-input v-model="activeItemConfig.label" placeholder="请输入标题"/>
    </el-form-item>
    <el-form-item v-if="activeItemConfig.showLabel" label="标签宽度">
      <el-input v-model.number="activeItemConfig.labelWidth" type="number" placeholder="请输入标签宽度"/>
    </el-form-item>
    <el-form-item v-if="activeItemProps.placeholder !== undefined" label="占位提示">
      <el-input v-model="activeItemProps.placeholder" placeholder="请输入占位提示"/>
    </el-form-item>
  </template>

  <el-form-item v-if="activeItem.__vModel__ !== undefined" label="字段名" title="字段名，用于v-model">
    <el-input v-model="activeItem.__vModel__" placeholder="请输入字段名（v-model）"/>
  </el-form-item>
  <el-form-item v-if="activeItem.__vModel__ !== undefined">
    <template #label>
      默认值
      <el-tooltip content="请在控件上输入" placement="top">
        <el-button text circle icon="InfoFilled" style="float:right"></el-button>
      </el-tooltip>
    </template>
    <div style="display: flex;width: 100%">
      <div style="flex: 1"> {{ activeItemConfig.defaultValue }}</div>
      <el-button text icon="CircleClose" type="danger" title="清空"
                 @click="activeItemConfig.defaultValue=undefined"></el-button>
    </div>

  </el-form-item>
  <el-form-item v-if="activeItemConfig.visibleBtn" label="显示">
    <el-button
        @click="activeItemConfig.defaultValue=!activeItemConfig.defaultValue">显示{{ activeItemConfig.tag }}
    </el-button>
  </el-form-item>
  <template v-if="activeItem.__id__!=='plainText'">
    <el-divider>属性</el-divider>

    <el-form-item label="原生属性">
      <object-editor v-model="activeItem.__native__"/>
    </el-form-item>
    <el-form-item v-if="activeItemConfig.optionType !== undefined" label="选项样式">
      <el-radio-group v-model="activeItemConfig.optionType">
        <el-radio-button value="default">默认</el-radio-button>
        <el-radio-button value="button">按钮</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeItemConfig.iconName !== undefined" label="图标">
      <icon-chooser v-model="activeItemConfig.iconName"></icon-chooser>
    </el-form-item>
    <el-form-item v-if="activeItemConfig.reference !== undefined" label="文字">
      <el-input v-model="activeItemConfig.reference"/>
    </el-form-item>
    <el-form-item label="文字" v-if="activeItem.__slots__&&typeof activeItem.__slots__.default==='string'">
      <el-input v-model="activeItem.__slots__.default" placeholder="请输入文字"/>
    </el-form-item>
    <el-form-item v-if="activeItemConfig.required !== undefined" label="必填">
      <el-switch v-model="activeItemConfig.required"></el-switch>
    </el-form-item>

    <el-form-item v-if="activeItem.__data__" :label="activeComConfig.data.label">

      <el-radio-group v-model="activeItem.__data__.source" class="mb-2">
        <el-radio-button value="static">静态数据</el-radio-button>
        <el-radio-button value="dynamic" v-if="activeItem.__data__.dynamic">动态数据</el-radio-button>
      </el-radio-group>
      <el-input v-model="activeItem.__refs__[activeComConfig.data.name]"
                v-if="activeItem.__data__[activeItem.__data__.source].ref">
        <template #prepend>REF</template>
      </el-input>
      <div v-show="activeItem.__data__.source==='static'">
        <config-value-input :attr-config="activeComConfig.data.static.type" :treeProps="activeItemProps.props"
                            v-model="activeItem.__data__.static[activeComConfig.data.name]"></config-value-input>
      </div>
      <div v-show="activeItem.__data__.source==='dynamic'" v-if="activeItem.__data__.dynamic">
        <el-form-item label="网址">
          <el-input v-model="activeItem.__data__.dynamic.url" placeholder="网址">
          </el-input>
        </el-form-item>
        <el-form-item label="方法">
          <el-select v-model="activeItem.__data__.dynamic.method" placeholder="方法">
            <el-option label="get" value="get"></el-option>
            <el-option label="post" value="post"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据位置">
          <el-input v-model="activeItem.__data__.dynamic.dataKey" placeholder="数据位置" @change="changeRenderKey()">
          </el-input>
        </el-form-item>
      </div>
    </el-form-item>
    <template v-for="(v,k) in defaultSetterData" :key="k">

      <el-form-item v-show="!v.switch||v.switch&&activeItemProps[v.switch[0]]===v.switch[1]"
                    :required="v.required">
        <template #label>
          <div v-html="v.title"></div>
          <div>
            <el-tooltip effect="light"
                :content="`${k}${v.title?'：'+v.title:''}。${v.ref?'':'双击可以变成ref对象'}`"
                raw-content
            >
              <el-button>hover me</el-button>
            </el-tooltip>
          <span :title="`${k}${v.title?'：'+v.title:''}。${v.ref?'':'双击可以变成ref对象'}`"
                @dblclick.prevent="!v.ref&&switchRef(k)" @click.prevent="" class="mr-1" >
          {{ v.label || v.title }}</span>
            <el-tag v-if="v.version">{{ v.version }}</el-tag>
            <el-tag v-if="v.deprecated" type="warning">弃用</el-tag>
            <el-tag v-if="v.a11y">a11y</el-tag>
            <el-icon v-if="attributeConfig[k]&&attributeConfig[k].types.length>1"
                     style="transform: rotate(90deg); cursor: pointer;"
                     :title="`当前${v.type.name}类型，点击更换类型`" @click="changeType(k,v.type.name)">
              <Sort/>
            </el-icon>
          </div>
        </template>

        <el-input v-model="activeItemRefs[k]" placeholder="请输入ref对象变量名" title="请输入ref对象变量名"
                  v-if="activeItemRefs&&activeItemRefs[k]">
          <template #prepend>REF</template>
        </el-input>


        <!--      :treeProps="activeItemProps.props"使用不明智，但确实解决了问题-->
        <config-value-input v-model="activeItemProps[k]" v-if="v.type.tag" :treeProps="activeItemProps.props"
                            :attr-config="v.type"></config-value-input>
      </el-form-item>
    </template>
  </template>


</template>

<script setup>
import ConfigValueInput from "@/views/design/ConfigValueInput";
import {computed} from "vue";
import {ElMessageBox} from "element-plus";
import {camelCase, deepClone, getType} from "@/utils";
import {Sort} from "@element-plus/icons-vue";
import IconChooser from "@/components/editors/IconChooser.vue";
import elementPlusConfigMap from "@/config";
import ObjectEditor from "@/components/editors/ObjectEditor.vue";

const props = defineProps(["activeItem", "attributeConfig"]);
const activeItemConfig = computed(() => {
  return props.activeItem.__config__ || {}
})
//当前组件的属性值
const activeItemProps = computed(() => {
  return props.activeItem.__props__ || {}
})
const activeItemRefs = computed(() => {
  return props.activeItem && props.activeItem.__refs__ || {}
})

onMounted(() => {
  nextTick(() => {
    setDefaultSetterData();
  })

})
const defaultSetterData = ref({});
watch(() => activeItemConfig.value.tag, (val) => {
  setDefaultSetterData();
})
const activeComConfig = computed(() => {
  return elementPlusConfigMap[props.activeItem.__id__] || {}
})

function setDefaultSetterData() {
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
    let type = getType(activeItemProps.value[name]);

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
    activeItemProps.value[key] = props.attributeConfig[key].default;
    return;
  }
  switch (nextTypeName) {
    case 'string':
      activeItemProps.value[key] = "";
      break;
    case 'enum':
      activeItemProps.value[key] = props.attributeConfig[key].default;
      break;
    case 'object':
      activeItemProps.value[key] = {};
      break;
    case 'array':
      activeItemProps.value[key] = [];
      break;
    case 'number':
      activeItemProps.value[key] = thisDefault || 0;
      break;
    default:
      activeItemProps.value[key] = undefined;
  }
}

function switchRef(key) {
  let refs = props.activeItem.__refs__;
  if (!refs) {
    props.activeItem.__refs__ = {};
    refs = props.activeItem.__refs__;
  }
  let refName = refs[key];
  if (!refName) {
    ElMessageBox.confirm("是否将此设置改成ref对象？").then(() => {
      refs[key] = camelCase(activeItemConfig.value.itemName + "-" + key);
    })
  } else {
    delete refs[key]
  }
}
</script>

<style scoped>

</style>