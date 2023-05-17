<template>
  <div>
    <el-drawer v-bind="$attrs" @closed="onClose">
      <div class="action-bar" :style="{ 'text-align': 'left' }">
        <el-button text class="bar-btn" @click="refresh" icon="Refresh" title="更改到界面">
          更新
        </el-button>
        <el-button text class="bar-btn copy-json-btn" icon="DocumentCopy" @click="triggerCopy">
          复制JSON
        </el-button>

        <el-button text class="bar-btn" @click="exportJsonFile" icon="Download">
          导出JSON文件
        </el-button>
        <el-button text class="bar-btn delete-btn" @click="emits('update:modelValue', false)" icon="CircleClose">
          关闭
        </el-button>
      </div>
      <div id="jsonCopyNode" class="display:none;"></div>

      <VAceEditor
          v-model:value="aceStr"
          class="json-editor"
          :options="{fontSize:'15px'}"
          lang="json"
          theme="chrome"/>

    </el-drawer>
  </div>
</template>
<script setup>

import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'


import {onBeforeUnmount, onMounted, watch} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

import {VAceEditor} from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';

const props = defineProps({jsonStr: {type: String, required: true,}})
const emits = defineEmits(["refresh"]);//, 'update:modelValue会导致错误！

const aceStr = ref(props.jsonStr);

watch(() => props.jsonStr, () => {
  aceStr.value = props.jsonStr
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

let clipboard = null;

onMounted(() => {
      if (!clipboard) {
        clipboard = new ClipboardJS('#jsonCopyNode', {
          text: (trigger) => {
            console.info(1333)
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
        console.info(clipboard)
      }
    }
)

function onClose() {
  clipboard && clipboard.destroy();
  clipboard = null;
}

function exportJsonFile() {
  ElMessageBox.prompt('文件名:', '导出文件', {
    inputValue: `${+new Date()}.json`,
    closeOnClickModal: false,
    inputPlaceholder: '请输入文件名',
  }).then(({value}) => {
    if (!value) value = `${+new Date()}.json`
    const codeStr = aceStr.value
    const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, value)
  })
}

function refresh() {
  try {
    emits('refresh', JSON.parse(aceStr.value))
  } catch (error) {
    ElNotification.error({title: '错误', message: 'JSON格式错误，请检查'})
  }
}

function triggerCopy() {
  document.getElementById('jsonCopyNode').click()
}
</script>


<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include action-bar;
.json-editor {
  height: calc(100vh - 80px);
}

:deep(.el-drawer__header) {
  display: none;
}
</style>
