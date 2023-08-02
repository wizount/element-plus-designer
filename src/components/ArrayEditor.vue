<!--数组子项是字符串-->
<template>
  <draggable :list="list" :animation="340" group="selectItem" itemKey="index"
             handle=".option-drag">
    <template #item="{element,index}">
      <div class="select-item">
        <div class="select-line-icon option-drag">
          <el-icon>
            <Operation/>
          </el-icon>
        </div>
        <component :is="tag" v-model="list[index]"  clearable/>
        <div class="close-btn select-line-icon" @click="list.splice(index, 1)">
          <el-icon>
            <Remove/>
          </el-icon>
        </div>
      </div>
    </template>
  </draggable>
  <div style="margin-left: 20px">
    <el-button style="padding-bottom: 0" text type="primary" @click="addItem"> 添加
    </el-button>
  </div>
</template>

<script setup>
import Draggable from '@/vuedraggable/vuedraggable';
const props = defineProps({
  //tag
  tag: {
    type: String,
    default:'ElInput'
  },
  list:{
    type: Array,
    required:true,
    default:[]
  }
});
const addItem = () => {
  if(props.list==null){
  }
  props.list.push('')
}
</script>

<style scoped lang="scss">
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;

& .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }

& .el-input + .el-input {
    margin-left: 4px;
  }
}

.select-item + .select-item {
  margin-top: 4px;
}

.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}

.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}

.option-drag {
  cursor: move;
}

</style>
