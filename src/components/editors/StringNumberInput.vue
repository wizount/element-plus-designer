<template>
  <el-input v-model="inputValue" @change="change">
    <template #append>
      <el-button style="color: var(--el-text-color-primary)" title="字符串，双击变成数字" @dblclick="toggleStrDigit">
        <span title="数字，双击变成字符串" v-if="isDigit">
          D
        </span>
        <span title="字符串，双击变成数字" v-else>
          S
        </span>
      </el-button>
    </template>
  </el-input>

</template>

<script setup>
import {ref, watchEffect} from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(['update:modelValue']);

const inputValue = ref(null);

const isDigit = ref(false)

watchEffect(() => {
  isDigit.value=typeof props.modelValue==='number';
  inputValue.value = props.modelValue;
})

function change(val) {

  parse(val);
}



function toggleStrDigit(){
  isDigit.value=!isDigit.value;
  parse(inputValue.value);
}
function parse(val){
  if(isDigit.value){
    try{
      inputValue.value= parseFloat(val)||0;
    }catch (e){
      inputValue.value=0;
    }
  }else{
    inputValue.value=""+val;
  }
  emits('update:modelValue',  inputValue.value)
}

</script>

<style scoped lang="scss">

</style>
