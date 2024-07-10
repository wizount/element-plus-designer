<!--只有一个表单model，多个表单共享一个-->
<template>
  <draw-item v-for="di in drawItemList" :current-item="di" :form-models-and-rules="formModelsAndRules"  ref="drawList"></draw-item>
</template>

<script setup>
import DrawItem from "@/views/render/DrawItem";
import ruleTrigger from "@/components/generator/ruleTrigger";

const props = defineProps({
  drawItemList: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  },
})

const emits = defineEmits(['update:modelValue']);

onMounted(() => {
})

//region 表单操作
const formModelsAndRules = ref(props.modelValue||{});

//构建表单model
function buildFormModelsAndRules(list, model, rules) {

  for (const item of list) {
    if (typeof item === 'string'||typeof item === 'function') {
      continue;
    }
    if (item.__id__ === 'form') {
      model = formModelsAndRules.value[item.__props__.model]||{};
      rules =formModelsAndRules.value[item.__props__.rules] || {};
      formModelsAndRules.value[item.__props__.model] = model;
      formModelsAndRules.value[item.__props__.rules] = rules;
    } else {
      if (item.__vModel__) {
        const {__config__: config, __props__: props} = item;
        if (item.__config__.wrapWithFormItem) {
          model && (model[item.__vModel__] = config.defaultValue);
          if (rules) {
            const r = buildRules(item);
            if (r.length > 0) {
              rules[item.__vModel__] = r;
            }
          }
        } else {
          formModelsAndRules.value[item.__vModel__] = config.defaultValue;
        }
      }

    }
    if (Array.isArray(item.__slots__.default)) {
      buildFormModelsAndRules(item.__slots__.default, model, rules)
    }
  }
}

// 构建校验规则
function buildRules(item) {
  const rules = []
  const {__config__: config, __props__} = item;
  if (ruleTrigger[config.tag]) {
    if (config.required) {
      const type = Array.isArray(config.defaultValue) ? "array" : config.defaultValueType

      let message = Array.isArray(config.defaultValue)
          ? `请至少选择一个${config.label}`
          : __props__ && __props__.placeholder || ""
      if (message === undefined) message = `${config.label}不能为空`
      rules.push(
          {
            required: true, type, message, trigger: ruleTrigger[config.tag]
          }
      )
    }
    if (config.regList && Array.isArray(config.regList)) {
      config.regList.forEach((reg) => {
        if (reg.pattern) {
          rules.push({
                pattern: new RegExp(reg.pattern),
                message: reg.message,
                trigger: ruleTrigger[config.tag]
              }
          )
        }
      })
    }
  }
  return rules;
}

watchEffect(() => {
  buildFormModelsAndRules(props.drawItemList);
  emits("update:modelValue", formModelsAndRules.value);
})
// watch(formModelsAndRules, (val) => {
//   emits("update:modelValue", val);
// }, {deep: true})
//endregion

import elementPlusRenderConfigMap from "@/config/render";
import {deepClone} from "@/utils";
function buildDrawItem(id,other) {
  if (elementPlusRenderConfigMap[id]) {
    const item = deepClone(elementPlusRenderConfigMap[id]);
    item.__slots__={};
    item.__refs__={};
    item.__props__={};
    if (typeof other === 'object') {
      Object.keys(other).forEach(key => {
        const v = other[key];
        if (typeof v === 'object') {
          if (item[key]) {
            Object.assign(item[key], v)
          } else {
            item[key] = v;
          }
        } else {
          item[key] = v;
        }
      })
    }
    return item
  } else {
    return undefined;
  }
}
defineExpose({
  buildDrawItem
})
const drawList=ref();
setTimeout(()=>{
  console.info(drawList.value[0].instance.refs);

},2000)
</script>

<style scoped>

</style>