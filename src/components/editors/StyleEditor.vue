<template>
  <draggable :list="list" :animation="340" group="style" itemKey="index"
             handle=".drag-icon" @change="change" style="margin-bottom: 5px">
    <template #item="{element,index}">
      <div class="draggable-item">
        <div class="flex-grow-1 d-flex">
          <div class="drag-icon">
            <el-icon>
              <Operation/>
            </el-icon>
          </div>
          <el-autocomplete :fetch-suggestions="ac.querySearch" v-model="element.key" @select="change" @change="change"/>
          <el-input v-model="element.value" @change="change" />
        </div>
        <div class="remove-btn" @click="list.splice(index, 1);change()">
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
import Draggable from '@/vuedraggable/vuedraggable';
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
