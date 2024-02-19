<template>
  <designer v-model="drawItemList"></designer>
</template>

<script setup>
import {getDrawItemList, saveDrawItemList} from "@/utils/db";
import drawingDefault from "@/config/drawingDefault.json";
import Designer from "@/views/design/Designer.vue";


let drawItemListInDB = getDrawItemList().filter((d)=>d!=null);

if(drawItemListInDB===null||drawItemListInDB.length===0){
  drawItemListInDB=drawingDefault;
}
const drawItemList = ref(drawItemListInDB)
watch(() => [...drawItemList.value], (val) => {
  saveDrawItemList(val)
}, {deep: true})

</script>

<style scoped>

</style>