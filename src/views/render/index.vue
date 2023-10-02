<template>
  <div style="padding: 20px">
    <render :draw-item-list="renderJson" v-model="formModel"></render>
  </div>
</template>

<script setup>
import Render from "./Render.vue";
import data from "./data.json";

const renderJson = ref(data)
const formModel = ref(data)

watch(formModel, (val) => {
  console.info(val)
}, {deep: true})
</script>

<style scoped>

</style>