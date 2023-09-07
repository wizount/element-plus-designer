<!--动态数据获取-->
<template>
  <el-form-item>

  </el-form-item>
</template>

<script setup>
import Axios from 'axios'

Axios.get('https://www.fastmock.site/mock/c9e1a1c3cefb84da4306dcf9fadde652/ele-plus-desinger/tableData')
    .then(resp => {
      emits("update:modelValue", resp.data)
    })
    .catch(resp => {
    })
const props = defineProps({
  modelValue: {},
  tag: {
    type: Object,
    required: true,
  }
});
const emits = defineEmits(['update:modelValue']);


</script>

<style scoped>

</style>