<template>
  <draggable :list="list" :animation="340" group="style" itemKey="index"
             handle=".drag-icon" @change="change">
    <template #item="{element,index}">
       <draggable-editor :remove-func="()=>{list.splice(index, 1);change()}">
          <component :is="keyTag" v-model="element.key" @change="change"/>
          <component :is="valueTag" v-model="element.value" @change="change"/>
       </draggable-editor>
    </template>
  </draggable>
  <div class="ml-2">
    <el-button  text type="primary" icon="Plus"
               @click="list.push({key:'',value:''});change()"> 添加
    </el-button>
  </div>
</template>

<script setup>
import Draggable from '@/vuedraggable/vuedraggable';
import DraggableEditor from "@/components/draggableEditor/index.vue";
import {ref, watchEffect} from "vue";

const props = defineProps({
  modelValue: {
    type: Object
  },
  keyTag: {
    type: String,
    default: 'ElInput'
  },
  valueTag: {
    type: String,
    default: 'ElInput'
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
  const val = {}
  for (const l of list.value) {
    val[l.key] = l.value;
  }
  emits('update:modelValue', val)
}

</script>
