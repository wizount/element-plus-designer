<template>
  <draggable :list="list" :animation="340" group="style" itemKey="index"
             handle=".drag-icon" @change="change" style="margin-bottom: 5px">
    <template #item="{element,index}">
      <draggable-editor :remove-func="()=>{list.splice(index, 1);change()}">
        <el-autocomplete :fetch-suggestions="ac.querySearch" v-model="element.key" @select="change" @change="change"/>
        <el-input v-model="element.value" @change="change"/>
      </draggable-editor>
    </template>
  </draggable>
  <div style="margin-left: 20px">
    <el-button style="padding-bottom: 0" text type="primary" @click="list.push({key:'',value:''});change()"> 添加
    </el-button>
  </div>
</template>

<script setup>
import styleName from '@/utils/styleName.json'
import Draggable from '@/vuedraggable/vuedraggable';
import DraggableEditor from "@/components/draggableEditor/index.vue";
import {ref, watchEffect} from "vue";
import {AutoCompleteCallback} from "@/utils/element-plus-utils";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(['update:modelValue']);

const list = ref([]);

watchEffect(() => {
  list.value = []
  props.modelValue && Object.keys(props.modelValue).forEach((key) => {
    list.value.push({key, value: props.modelValue[key]})
  })
})

function change() {
  const style = {}
  for (const l of list.value) {
    style[l.key] = l.value;
  }
  emits('update:modelValue', style)
}

const ac = new AutoCompleteCallback(styleName)
</script>

<style scoped lang="scss">
@import './editor.scss';

</style>
