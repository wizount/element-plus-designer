<template>
  <div>
    <el-drawer
        v-bind="$attrs"
        @opened="onOpen"
        @close="onClose"
    >
      <div style="height: 100%">
        <el-row style="height: 100%; overflow: auto">
          <el-col :md="24" :lg="12" class="left-editor">
            <div class="setting" title="资源引用" @click="showResource">
              <el-badge :is-dot="!!resources.length" class="item">
                <el-icon>
                  <Setting/>
                </el-icon>
              </el-badge>
            </div>
            <el-tabs v-model="activeTab" type="card" class="editor-tabs">
              <el-tab-pane name="html">
                <template #label>
                  <el-icon>
                    <Edit/>
                  </el-icon>
                  <el-icon>
                    <Document/>
                  </el-icon>
                  template
                </template>
              </el-tab-pane>
              <el-tab-pane name="js">
                <template #label>
                  <el-icon>
                    <Edit/>
                  </el-icon>
                  <el-icon>
                    <Document/>
                  </el-icon>
                  script
                </template>
              </el-tab-pane>
              <el-tab-pane name="css">
                <template #label>
                  <el-icon>
                    <Edit/>
                  </el-icon>
                  <el-icon>
                    <Document/>
                  </el-icon>
                  css
                </template>
              </el-tab-pane>
            </el-tabs>
            <div
                v-show="activeTab === 'html'"
                id="editorHtml"
                class="tab-editor"
            />
            <div v-show="activeTab === 'js'" id="editorJs" class="tab-editor"/>
            <div
                v-show="activeTab === 'css'"
                id="editorCss"
                class="tab-editor"
            />
          </el-col>
          <el-col :md="24" :lg="12" class="right-preview">
            <div class="action-bar" :style="{ 'text-align': 'left' }">
              <span class="bar-btn" @click="runCode">
                <el-icon><refresh/></el-icon>
                刷新
              </span>
              <span class="bar-btn" @click="exportFile">
                <el-icon><download/></el-icon>
                导出vue文件
              </span>
              <span class="bar-btn copy-btn">
                <el-icon><document-copy/></el-icon>
                复制代码
              </span>
              <span
                  class="bar-btn delete-btn"
                  @click="$emit('update:visible', false)"
              >
                <el-icon><circle-close/></el-icon>
                关闭
              </span>
            </div>
            <iframe
                v-show="isIframeLoaded"
                ref="previewPage"
                class="result-wrapper"
                frameborder="0"
                src="preview.html"
                @load="iframeLoad"
            />
            <div
                v-show="!isIframeLoaded"
                v-loading="true"
                class="result-wrapper"
            />
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <resource-dialog
        v-model="resourceVisible"
        :origin-resource="resources"
        @save="setResource"
    />
  </div>
</template>

<script setup>
import {parse} from '@babel/parser'
import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'
import {
  makeUpHtml,
  vueTemplate,
  vueScript,
  cssStyle, vue3Template,
} from '@/components/generator/html.js'
import {makeUpJs, renderJs} from '@/components/generator/js'
import {makeUpCss} from '@/components/generator/css'
import {exportDefault, beautifierConf, titleCase} from '@/utils/index'
import ResourceDialog from './ResourceDialog'
import loadMonaco from '@/utils/loadMonaco'
import loadBeautifier from '@/utils/loadBeautifier'
import {onBeforeUnmount, onMounted} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

const editorObj = {
  html: null,
  js: null,
  css: null,
}
const mode = {
  html: 'html',
  js: 'javascript',
  css: 'css',
}
let beautifier


const props=defineProps(['drawingData', 'generateConf'])


const activeTab = ref('html')
let htmlCode = ''
let jsCode = ''
let cssCode = ''
const isIframeLoaded = ref(false)
let isInitcode = false // 保证open后两个异步只执行一次runcode
let isRefreshCode = false // 每次打开都需要重新刷新代码
const resourceVisible = ref(false)
let scripts = []
let links = []
let monaco = null

const resources = computed(() => {
  return scripts.concat(links)
})
onMounted(() => {
      window.addEventListener('keydown', preventDefaultSave)
      const clipboard = new ClipboardJS('.copy-btn', {
        text: (trigger) => {
          const codeStr = generateCode()
         ElNotification({
            title: '成功',
            message: '代码已复制到剪切板，可粘贴。',
            type: 'success',
          })
          return codeStr
        },
      })
      clipboard.on('error', (e) => {
        ElMessage.error('代码复制失败')
      })
    }
)
onBeforeUnmount(() => {
  window.removeEventListener('keydown', preventDefaultSave)
})


function preventDefaultSave(e) {
  if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
  }
}

function onOpen() {
  const {type} = props.generateConf
 // console.info(props.drawingData.fields)
  htmlCode = vue3Template(props.drawingData.fields, type)
  jsCode = renderJs(props.drawingData.fields, type)
  cssCode = "";//makeUpCss(props.drawingData.fields)

  loadBeautifier((btf) => {
    beautifier = btf
    htmlCode = beautifier.html(htmlCode, beautifierConf.html)
    jsCode = beautifier.js(jsCode, beautifierConf.js)
    cssCode = beautifier.css(cssCode, beautifierConf.html)

    console.info(htmlCode);
    console.info(jsCode);
    // loadMonaco((val) => {
    //   monaco = val
    //   setEditorValue('editorHtml', 'html', htmlCode)
    //   setEditorValue('editorJs', 'js', jsCode)
    //   setEditorValue('editorCss', 'css', cssCode)
    //   if (!isInitcode) {
    //     isRefreshCode = true
    //     isIframeLoaded.value && (isInitcode = true) && runCode()
    //   }
    // })
  })
}

function onClose() {
  isInitcode = false
  isRefreshCode = false
}

function iframeLoad() {
  if (!isInitcode) {
    isIframeLoaded.value = true
    isRefreshCode && (isInitcode = true) && runCode()
  }
}

function setEditorValue(id, type, codeStr) {
  if (editorObj[type]) {
    editorObj[type].setValue(codeStr)
  } else {
    editorObj[type] = monaco.editor.create(document.getElementById(id), {
      value: codeStr,
      theme: 'vs-dark',
      language: mode[type],
      automaticLayout: true,
    })
  }
  // ctrl + s 刷新
  editorObj[type].onKeyDown((e) => {
    if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
      runCode()
    }
  })
}
const previewPage=ref();
function runCode() {
  const jsCodeStr = editorObj.js.getValue()

  try {
    const ast = parse(jsCodeStr, {sourceType: 'module'})
    const astBody = ast.program.body
    if (astBody.length > 1) {
      ElMessageBox.confirm(
          'js格式不能识别，仅支持修改export default的对象内容',
          '提示',
          {
            type: 'warning',
          }
      )
      return
    }
    if (astBody[0].type === 'ExportDefaultDeclaration') {
      const postData = {
        type: 'refreshFrame',
        data: {
          generateConf: generateConf,
          html: editorObj.html.getValue(),
          js: jsCodeStr.replace(exportDefault, ''),
          css: editorObj.css.getValue(),
          scripts: scripts,
          links: links,
        },
      }

      previewPage.value.contentWindow.postMessage(
          postData,
          location.origin
      )
    } else {
      ElMessage.error('请使用export default')
    }
  } catch (err) {
    ElMessage.error(`js错误：${err}`)
    console.error(err)
  }
}

function generateCode() {
  const html = vueTemplate(editorObj.html.getValue())
  const script = vueScript(editorObj.js.getValue())
  const css = cssStyle(editorObj.css.getValue())
  return beautifier.html(html + script + css, beautifierConf.html)
}

function exportFile() {
  ElMessageBox.prompt('文件名:', '导出文件', {
    inputValue: `${+new Date()}.vue`,
    closeOnClickModal: false,
    inputPlaceholder: '请输入文件名',
  }).then(({value}) => {
    if (!value) value = `${+new Date()}.vue`
    const codeStr = generateCode()
    const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, value)
  })
}

function showResource() {
  resourceVisible.value = true
}

function setResource(arr) {
  let scripts_ = []
  let links_ = []
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (item.endsWith('.css')) {
        links_.push(item)
      } else {
        scripts_.push(item)
      }
    })
    scripts = scripts_
    links = links_
  } else {
    scripts = []
    links = []
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.tab-editor {
  position: absolute;
  top: 33px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}

.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}

.setting {
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

.right-preview {
  height: 100%;

  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}

@include action-bar;
:deep(.el-drawer__header) {
  display: none;
}
</style>
