<!--数组子项是字符串-->
<template>
  <draggable :list="list" :animation="340" group="selectItem" itemKey="index" class="w-100"
             handle=".drag-icon">
    <template #item="{element,index}">
        <draggable-editor :remove-func="()=>deleteItem(index)">
          <component :is="tag" v-model="list[index]" v-bind="tagProps" clearable/>
        </draggable-editor>
    </template>
  </draggable>
  <div class="ml-2">
    <el-button  text type="primary" icon="Plus" @click="addItem" :disabled="fixedNumber&&list.length>=fixedNumber"> 添加
    </el-button>
  </div>
</template>

<script setup>
import Draggable from '@/vuedraggable/vuedraggable';
import DraggableEditor from "@/components/draggableEditor/index.vue";

const props = defineProps({
  //tag
  tag: {
    type: String,
    default: 'ElInput'
  },
  tagProps: {
    type: Object
  },
  modelValue: {
    type: Array,
    required: true,
    default: () => {
      return []
    }
  },
  fixedNumber:{
    type:Number
  }
});
const emits = defineEmits(['update:modelValue']);
const list = ref([]);
watchEffect(()=>{
  if (props.modelValue) {
    list.value = props.modelValue;
  } else {
    list.value = []
  }
})
const addItem = () => {
  if(props.tag==='el-date-picker'){
    list.value.push(new Date())
  }else{
    list.value.push('');
  }
  emits("update:modelValue",list.value)
}
const deleteItem = (index) => {
  list.value.splice(index, 1)
  emits("update:modelValue",list.value)

}
</script>

