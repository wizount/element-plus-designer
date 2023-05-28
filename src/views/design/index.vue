<template>
  <designer v-model="drawingList"></designer>
</template>

<script setup>
import {resolveComponent} from "vue";

import {getDrawingList, saveDrawingList} from "@/utils/db";
import drawingDefault from "@/components/generator/drawingDefault";
import {debounce} from "throttle-debounce";
import Designer from "@/views/design/Designer.vue";

const saveDrawingListDebounce = debounce(340, saveDrawingList)

const drawingListInDB = getDrawingList().filter((d)=>d!=null);

console.info(drawingListInDB)
const drawingList = ref(drawingListInDB || drawingDefault || [])
watch(() => [...drawingList.value], (val) => {
  saveDrawingListDebounce(val)
}, {deep: true})

</script>

<style scoped>

</style>