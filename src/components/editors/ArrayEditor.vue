<!--数组子项是字符串-->
<template>
  <draggable :list="list" :animation="340" group="selectItem" itemKey="index" class="w-100"
             handle=".drag-icon">
    <template #item="{element,index}">
      <div class="draggable-item">
        <div class="flex-grow-1 d-flex">
          <div class="drag-icon">
            <el-icon>
              <Operation/>
            </el-icon>
          </div>
          <component :is="tag" v-model="list[index]" v-bind="tagProps" clearable/>
        </div>
        <div class="remove-btn" @click="deleteItem(index)">
          <el-icon>
            <Remove/>
          </el-icon>
        </div>
      </div>
    </template>
  </draggable>
  <div style="margin-left: 10px">
    <el-button style="padding-bottom: 0" text type="primary" @click="addItem" :disabled="fixedNumber&&list.length>=fixedNumber"> 添加
    </el-button>
  </div>
</template>

<script setup>
import Draggable from '@/vuedraggable/vuedraggable';

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
    default: []
  },
  fixedNumber:{
    type:Number
  }
});
const emits = defineEmits(['update:modelValue']);
const list =ref([]);
onMounted(()=>{
  if(props.modelValue!==null){
    list.value=props.modelValue;
  }else{
    list.value=[]
  }
})
watch(()=>props.modelValue,(val)=>{
  if(val!==null){
    list.value=val;
  }else{
    list.value=[]
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

<style scoped lang="scss">
@import './editor.scss';

</style>
