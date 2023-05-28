<template>
  <div>
    <el-drawer v-bind="$attrs" @closed="onClose">
      <div class="action-bar" :style="{ 'text-align': 'left' }">
        <el-button text class="bar-btn copy-html-btn" icon="DocumentCopy" @click="triggerCopy">
          复制HTML
        </el-button>
        <el-button text class="bar-btn" @click="exportHtmlFile" icon="Download">
          导出HTML文件
        </el-button>
        <el-button text class="bar-btn delete-btn" @click="emits('update:modelValue', false)" icon="CircleClose">
          关闭
        </el-button>
      </div>
      <div id="htmlCopyNode" class="display:none;"></div>

      <VAceEditor
          v-model:value="aceStr"
          class="html-editor"
          :options="{fontSize:'15px'}"
          lang="html"
          theme="chrome"/>

    </el-drawer>
  </div>
</template>
<script setup>

import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'


import {nextTick, onBeforeUnmount, onMounted, watch} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

import {VAceEditor} from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chrome';

const props = defineProps({htmlStr: {type: String, required: true,}})
const emits = defineEmits();

const aceStr = ref(props.htmlStr);

watch(() => props.htmlStr, () => {
  aceStr.value = props.htmlStr
})


onMounted(() => {
  window.addEventListener('keydown', preventDefaultSave)

})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', preventDefaultSave)
})

function preventDefaultSave(e) {
  if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
  }
}


function onClose() {
}

function exportHtmlFile() {
  ElMessageBox.prompt('文件名:', '导出文件', {
    inputValue: `${+new Date()}.vue`,
    closeOnClickModal: false,
    inputPlaceholder: '请输入文件名',
  }).then(({value}) => {
    if (!value) value = `${+new Date()}.html`
    const codeStr = aceStr.value
    const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, value)
  })
}

function triggerCopy(event) {
  let clipboard = new ClipboardJS('#htmlCopyNode', {
    text: (trigger) => {
      ElNotification({
        title: '成功',
        message: '代码已复制到剪切板，可粘贴。',
        type: 'success',
      })
      return aceStr.value
    },

  })
  clipboard.on('error', (e) => {
    ElMessage.error('代码复制失败')
  })
  clipboard.onClick(event)
}
</script>


<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include action-bar;
.html-editor {
  height: calc(100vh - 80px);
}

:deep(.el-drawer__header) {
  display: none;
}
</style>
