<template>
  <designer v-model="drawItemList"></designer>
</template>

<script setup>
import {getDrawItemList, saveDrawItemList} from "@/utils/db";
import drawingDefault from "@/components/config/drawingDefault";
import {debounce} from "throttle-debounce";
import Designer from "@/views/design/Designer.vue";

const saveDrawItemListDebounce = debounce(340, saveDrawItemList)

const drawItemListInDB = getDrawItemList().filter((d)=>d!=null);

if(drawItemListInDB==null){

}
const drawItemList = ref(drawItemListInDB || drawingDefault || [])
watch(() => [...drawItemList.value], (val) => {
  saveDrawItemListDebounce(val)
}, {deep: true})

</script>

<style scoped>

</style>