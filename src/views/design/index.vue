<template>
  <designer v-model="drawItemList" ref="designerRef"></designer>
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

const designerRef=ref();
//生成代码请使用  designerRef.value.generateCode(jsCodeStyle)
//jsCodeStyle可以为：composition（组合式）
//可以为：options（选项式）
//可以为：compositionSFC（组合式SFC）
//可以为：defineComponent（defineComponent）

</script>

<style scoped>

</style>