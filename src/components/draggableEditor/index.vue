<template>
  <div class="draggable-item">
    <i class="drag-icon"  title="移动">
      <el-icon>
        <Operation/>
      </el-icon>
    </i>
    <slot></slot>
    <div class="remove-btn" @click="removeFunc" title="删除">
      <el-icon>
        <Remove/>
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import {Operation, Remove} from "@element-plus/icons-vue";

const props = defineProps({
  removeFunc: {
    type: Function,
  },
});

</script>

<style lang="scss" scoped>
.draggable-item {
  display: flex;
  border-bottom: 1px dashed #d5d4d4;
  align-items: center;

  .drag-icon {
    color: #777;
    cursor: move;
    margin:4px;
  }
  .remove-btn {
    cursor: pointer;
    color: #f56c6c;
    margin:4px;
  }



  &.chosen {
    border: 1px dashed #409eff;
  }

}

.draggable-item + .draggable-item {
  margin-top: 4px;
}


</style>
