<!--用于数组的项是Object-->
<template>
  <draggable :list="modelValue" :animation="340" group="selectItem" itemKey="value"
             handle=".drag-icon">
    <template #item="{element,index}">
     <draggable-editor :remove-func="()=>modelValue.splice(index, 1)">
          <Component v-model="element[v.key]" :placeholder="v.label" :title="v.label" clearable :is="v.tag||'ElInput'"
                     v-for="v in keys" :key="v.key"/>
          </draggable-editor>
    </template>
  </draggable>
  <div style="margin-left: 20px">
    <el-button style="padding-bottom: 0" text type="primary" @click="addItem"> 添加
    </el-button>
  </div>
</template>

<script setup>
import Draggable from '@/vuedraggable/vuedraggable';
import DraggableEditor from "@/components/draggableEditor/index.vue";

const props = defineProps({
  keys: {
    type: Array
  },
  modelValue: {
    type: Array,
    required: true
  }
});

const addItem = () => {
  props.modelValue.push({})
}
</script>

<style scoped lang="scss">
@import './editor.scss';

</style>
