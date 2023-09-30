<!--有固定keys的Object-->
<template>
  <el-form-item :label="k.name" v-for="k in keys" style="width: 100%" :title="k.title">
    <config-value-input v-model="values[k.name]" :attr-config="k" @change="change"
                        style="width: 100%"></config-value-input>
  </el-form-item>

</template>

<script setup>

import ConfigValueInput from "@/views/design/ConfigValueInput";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  keys: {
    type: Array,
    required: true,
    default: []
  }

});
onMounted(()=>{
  setValues();
})
function setValues(){
  if (typeof props.modelValue === 'object' && !Array.isArray(props.modelValue)) {
    values.value = props.modelValue || {}
  } else {
    values.value = props.modelValue
  }
}
const values = ref({});
const emits = defineEmits(['update:modelValue']);
watch(()=>props.modelValue, (v) => {
  setValues();
})

function change() {
  emits("update:modelValue", values);
}

</script>

<style scoped lang="scss">
@import './editor.scss';

</style>
