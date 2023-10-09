<!--只有一个表单model，多个表单共享一个-->
<template>
  <draw-item v-for="di in drawItemList" :current-item="di" :form-model="formModel" :form-rules="formRules"></draw-item>
  {{formModel}}
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
  buildFormModelsAndRules(props.drawItemList);
  console.info(formModel)
  emits("update:modelValue",formModel);
})

//region 表单操作
const formModel = ref({});
const formRules = ref({});

//构建表单model
function buildFormModelsAndRules(list) {
  for (const item of list) {
    if (typeof item === 'string') {
      continue;
    }

    if (item.__config__.wrapWithFormItem && item.__vModel__) {
      const {__config__: config} = item;
      formModel.value[item.__vModel__] = props.modelValue && props.modelValue[item.__vModel__] || config.defaultValue;
      const r = buildRules(item);
      if (r.length > 0) {
        formRules.value[item.__vModel__] = r;
      }
    }

    if (Array.isArray(item.__slots__&&item.__slots__.default)) {
      buildFormModelsAndRules(item.__slots__.default)
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
          : __props__&&__props__.placeholder||""
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
watch(formModel,(val)=>{
  emits("update:modelValue",val);
},{deep:true})
//endregion
</script>

<style scoped>

</style>