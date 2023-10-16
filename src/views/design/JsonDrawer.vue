<template>
  <div>
    <el-drawer v-bind="$attrs">
      <template #header>
        <div class="narrower-button-margin">
          <el-button text type="primary" class="copy-json-btn" icon="DocumentCopy" @click="triggerCopy">
            复制JSON
          </el-button>
          <el-button text type="primary" @click="exportJsonFile" icon="Download">
            导出JSON文件
          </el-button>
          <el-switch  v-model="designConf.jsonSimplified" inline-prompt active-text="简化" inactive-text="完整"  style="float: right; --el-switch-off-color: grey"/>
        </div>

      </template>
      <div id="jsonCopyNode" class="display:none;"></div>
      <VAceEditor
          v-model:value="aceStr"
          class="json-editor"
          :options="{fontSize:'15px'}"
          lang="json"
          theme="one_dark"/>
    </el-drawer>
  </div>
</template>
<script setup>

import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'

import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

import {VAceEditor} from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-one_dark';

const props = defineProps({
  jsonStr: {type: String, required: true},
  designConf: {type: String, required: true}
})

const aceStr = ref(props.jsonStr);

watch(() => props.jsonStr, () => {
  aceStr.value = props.jsonStr
})

function exportJsonFile() {
  ElMessageBox.prompt('文件名:', '导出文件', {
    inputValue: `${+new Date()}.vue`,
    closeOnClickModal: false,
    inputPlaceholder: '请输入文件名',
  }).then(({value}) => {
    if (!value) value = `${+new Date()}.json`
    const codeStr = aceStr.value
    const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, value)
  })
}

function triggerCopy(event) {
  let clipboard = new ClipboardJS('#jsonCopyNode', {
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

.json-editor {
  height: calc(100vh - 45px);
}

:deep(.el-drawer__body) {
  padding: 40px 5px 5px;
}

:deep(.el-drawer__header) {
  display: flex;
  width: calc(100% - 40px);
  position: absolute;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  &:first-child {
    width: unset;
  }

  button {
    right: 30px;
  }
}

</style>
