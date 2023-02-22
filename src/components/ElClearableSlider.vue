<template>
  <div style="display: flex;width: 100%">
    <el-slider style="flow:1" v-bind="$attrs" v-model="value" @input="onInput"
               @change="$emit('onChange')"></el-slider>
    <el-button icon="CircleClose" circle link @click="setToDefault(defaultValue)" style="margin-left: 10px"></el-button>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'defaultValue'])
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)
watch(
    () => props.modelValue,
    (v1, v2) => {
      value.value = v1;
    }
);

function setToDefault(val) {
  emit("update:modelValue", val);
}

function onInput(e) {
  emit("update:modelValue", e);
  emit("input", e);
}
</script>

<style scoped>

</style>
