<template>
  <div>
    <el-button class="click-remove-btn" text v-if="icon"
               :icon="icon" title="点击删除"
               @click="setIcon('')">{{ icon }}
    </el-button>
    <el-button @click="openIconsDialog"> 选择...</el-button>
    <icons-dialog v-model="iconsVisible" :chosen="icon"
                  @select="setIcon">
    </icons-dialog>

  </div>
</template>

<script setup>

import IconsDialog from "@/components/IconsDialog.vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String
  }
});
const icon=ref(props.modelValue);
watch(props.modelValue,(val)=>{
  icon.value=val;
})
const iconsVisible = ref(false)

function openIconsDialog() {
  iconsVisible.value = true
}

function setIcon(val) {
  icon.value= val;
  emits("update:modelValue",val);
}

</script>

<style scoped lang="scss">
.click-remove-btn:hover {
  text-decoration: line-through red
}
.el-button{
  padding: 0 6px;
}
.el-button + .el-button {
  margin-left: 2px;
}
</style>
