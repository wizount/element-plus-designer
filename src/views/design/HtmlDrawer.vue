<template>
  <div>
    <el-drawer v-bind="$attrs">
      <template #header>
      <div :style="{ 'text-align': 'left' }">
        <el-button text type="primary" class="copy-html-btn" icon="DocumentCopy" @click="triggerCopy">
          复制HTML
        </el-button>
        <el-button text type="primary" @click="exportHtmlFile" icon="Download">
          导出HTML文件
        </el-button>
      </div>

      </template>
      <div id="htmlCopyNode" class="display:none;"></div>
      <VAceEditor
          v-model:value="aceStr"
          class="html-editor"
          :options="{fontSize:'15px'}"
          lang="html"
          theme="one_dark"/>
    </el-drawer>
  </div>
</template>
<script setup>

import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'

import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

import {VAceEditor} from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-one_dark';
const props = defineProps({htmlStr: {type: String, required: true,}})

const aceStr = ref(props.htmlStr);

watch(() => props.htmlStr, () => {
  aceStr.value = props.htmlStr
})

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

.html-editor {
  height: calc(100vh - 45px);
}

:deep(.el-drawer__body){
  padding: 40px 5px 5px;
}
:deep(.el-drawer__header) {
  display: flex;
  width: calc(100% - 40px);
  position: absolute;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  &:first-child{
    width: unset;
  }
  button{
    right: 30px;
  }
}

</style>
