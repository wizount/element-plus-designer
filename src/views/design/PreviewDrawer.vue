<template>
<div>
  <el-drawer
      v-bind="$attrs"
      @opened="onOpen"
      @close="onClose"
      title="预览"
  >
    <iframe
        ref="previewPage"
        class="result-wrapper el-card"
        frameborder="0"
        src="preview.html"
        @load="iframeLoad"
    />
  </el-drawer>
</div>
</template>

<script setup>

import {renderJsOptionsRaw} from '@/components/generator/js'

import {ElMessage} from "element-plus";

import {renderHtml} from "@/components/generator/html";


const props = defineProps(['drawItemList'])


const htmlCode = ref('')
const jsCode = ref('')
let isInitcode = false // 保证open后两个异步只执行一次runcode
let isRefreshCode = false // 每次打开都需要重新刷新代码

let scripts = []
let links = []

const resources = computed(() => {
  return scripts.concat(links)
})

function onOpen() {
  htmlCode.value = renderHtml(props.drawItemList)
  jsCode.value = renderJsOptionsRaw(props.drawItemList);
  runCode();
}

function onClose() {
  isInitcode = false
  isRefreshCode = false
}

function iframeLoad() {
  if (!isInitcode) {
    runCode()
  }
}


const previewPage = ref();

function runCode() {
  const jsCodeStr = jsCode.value
  try {

    const postData = {
      type: 'refreshFrame',
      data: {
        generateConf: {},
        html: htmlCode.value,
        js: jsCodeStr,
        css: "",
        scripts: scripts,
        links: links,
      },
    }

    previewPage.value.contentWindow.postMessage(
        postData,
        location.origin
    )
  } catch (err) {
    ElMessage.error(`js错误：${err}`)
    console.error(err)
  }
}


</script>

<style lang="scss" scoped>
.result-wrapper {
  height: calc(100vh - 50px);
  width: 100%;
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;
}
:deep(.el-drawer__body){
  padding: 40px 5px 5px;
}
:deep(.el-drawer__header) {
  display: flex;
  width: calc(100vw - 40px);
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
