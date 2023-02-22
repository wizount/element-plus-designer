<template>
<div>
  <el-drawer v-bind="$attrs" @opened="onOpen" @closed="onClose" >
    <div class="action-bar" :style="{ 'text-align': 'left' }">
      <el-button text class="bar-btn" @click="refresh" icon="Refresh">
        刷新
      </el-button>
      <el-button text  class="bar-btn copy-json-btn" icon="DocumentCopy">
        复制JSON
      </el-button>
      <el-button text class="bar-btn" @click="exportJsonFile" icon="Download">
        导出JSON文件
      </el-button>
      <!--      <el-button text class="bar-btn delete-btn" @click="$emit('update:visible', false)" icon="CircleClose">-->
      <!--        关闭-->
      <!--      </el-button>-->
      <div id="editorJson" class="json-editor"/>
    </div>

    <ace-editor
        ref="addcodeform"
        v-model:value="cmadd.value"
        v-model:id="cmadd.id"
        @update:value="cmadd.value = $event"
    ></ace-editor>

  </el-drawer>
</div>
</template>
<script setup>
const props = defineProps({jsonStr: {type: String, required: true,}})
import AceEditor from "@/components/AceEditor";

const cmadd = ref({value: props.jsonStr, id: 12});

watch(() => props.jsonStr, () => {
  cmadd.value.value = props.jsonStr
})
import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'

import {onBeforeUnmount, onMounted, watch,} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

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
let clipboard=null;
function onOpen() {
  if(!clipboard) {
    console.info(document.getElementsByClassName("copy-json-btn"))
    clipboard = new ClipboardJS('.copy-json-btn', {
      text: (trigger) => {
      //  console.info(trigger)
       // ElNotification({title: '成功', message: '代码已复制到剪切板，可粘贴。', type: 'success',})
        return "eeqwer"
      },
      container: document.getElementsByClassName('el-overlay')[0],

    })
    clipboard.on('error', (e) => {
      ElMessage.error('代码复制失败')
    })
    console.info(clipboard)
  }
}

function onClose(){
  clipboard&&clipboard.destroy();
  clipboard=null;
}
function exportJsonFile() {
  ElMessageBox.prompt('文件名:', '导出文件', {
    inputValue: `${+new Date()}.json`,
    closeOnClickModal: false,
    inputPlaceholder: '请输入文件名',
  }).then(({value}) => {
    if (!value) value = `${+new Date()}.json`
    const codeStr =cmadd.value.value
    const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, value)
  })
}

function refresh() {
  try {
    //fixme $emit('refresh', JSON.parse(jsonEditor.getValue()))
  } catch (error) {
    //fixme  ElNotification({title: '错误', message: 'JSON格式错误，请检查', type: 'error',})
  }
} </script>


<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include action-bar;
.json-editor {
  height: calc(100vh - 150px);
}

:deep(.el-drawer__header) {
  display: none;
}
</style>
