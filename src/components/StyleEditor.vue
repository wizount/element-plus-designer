<template>
  <draggable :list="list" :animation="340" group="style" itemKey="index"
             handle=".option-drag" @change="change" style="margin-bottom: 5px">
    <template #item="{element,index}">
      <div class="select-item">
        <div class="select-line-icon option-drag">
          <el-icon>
            <Operation/>
          </el-icon>
        </div>
        <el-autocomplete :fetch-suggestions="ac.querySearch" v-model="element.key" @change="change"/>
        <el-input v-model="element.value" @change="change"/>
        <div class="close-btn select-line-icon" @click="list.splice(index, 1);change()">
          <el-icon>
            <Remove/>
          </el-icon>
        </div>
      </div>
    </template>
  </draggable>
  <div style="margin-left: 20px">
    <el-button style="padding-bottom: 0" text type="primary" @click="list.push({key:'',value:''});change()"> 添加
    </el-button>
  </div>
</template>

<script setup>
import styleName from '@/utils/styleName.json'
import Draggable from "vuedraggable";
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
  props.modelValue&&Object.keys(props.modelValue).forEach((key) => {
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

const ac=new AutoCompleteCallback(styleName)
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
