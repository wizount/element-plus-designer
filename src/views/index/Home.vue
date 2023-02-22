<template>

  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo"><img :src="logo" alt="logo"/> Element Plus Designer
          <a class="github"
             href="https://github.com/JakHuang/form-generator"
             target="_blank"> <img
              src="https://github.githubassets.com/pinned-octocat.svg" alt/> </a></div>
      </div>
      <el-scrollbar class="left-scrollbar">

        <el-collapse class="components-list">
          <el-collapse-item :title="c.title" :name="c.titles" v-for="c in elementPlusComponents" :key="c.title">
<!--            <el-link v-for="l in c.children">{{ l.name }}</el-link>-->
              <template v-for="l in c.children">
                {{ l.name }}
              <draggable class="components-draggable" :list="l.children" item-key="renderKey"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
                draggable=".components-item" :sort="false" @end="onEnd">
                <template #item="{element}">
                  <div class="components-item" @click="addComponent(element)">
                    <div class="components-body">
                      <svg-icon :icon-class="element.__config__.tagIcon"/>
                      {{ element.__config__.name }}
                    </div>
                  </div>
                </template>
              </draggable>
            </template>
          </el-collapse-item>

        </el-collapse>
        <!--        <div class="components-list">-->
        <!--          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">-->
        <!--            <div class="components-title">-->
        <!--              <svg-icon icon-class="component"/>-->
        <!--              {{ item.title }}-->
        <!--            </div>-->
        <!--            <draggable class="components-draggable" :list="item.list" item-key="renderKey"-->
        <!--                       :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"-->
        <!--                       draggable=".components-item" :sort="false" @end="onEnd">-->
        <!--              <template #item="{element}">-->
        <!--                <div class="components-item" @click="addComponent(element)">-->
        <!--                  <div class="components-body">-->
        <!--                    <svg-icon :icon-class="element.__config__.tagIcon"/>-->
        <!--                    {{ element.__config__.name }}-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </draggable>-->
        <!--          </div>-->
        <!--        </div>-->
      </el-scrollbar>
    </div>
    <div class="center-board">
      <div class="action-bar">
        <el-button text @click="run"> 运行</el-button>
        <el-button text @click="showJson"> 查看json</el-button>
        <el-button text @click="download"> 导出vue文件</el-button>
        <el-button text @click="componentTreeVisible=true"> 组件树</el-button>
        <el-button class="copy-btn-main" text @click="copy"> 复制代码</el-button>
        <el-button class="delete-btn" text @click="empty"> 清空</el-button>
        <div id="copyNode" class="display:none;"></div>
      </div>
      <el-scrollbar class="center-scrollbar">
        <draggable tag="div" :list="drawingList" style="padding: 5px"
                   group="componentsGroup" item-key="renderKey">
          <template #item="{element,index}">
            <draggable-item :drawing-list="drawingList" :current-item="element" :index="index"
                            :active-id="activeId" :design-conf="designConf" @activeItem="activeDrawItem"
                            @mouseenter="drawItemMouseenter" @mouseleave="drawItemMouseleave"/>
          </template>
        </draggable>
        <div v-show="!drawingList.length" class="empty-info"> 从左侧拖入或点选组件进行表单设计</div>
        <div style="position: fixed; left: 400px" ref="actionDiv">
          <el-button type="primary" size="small" circle icon="Document" @click="drawingItemCopy"/>
          <el-button type="danger" size="small" circle icon="Delete" @click="drawingItemDelete"/>
        </div>

      </el-scrollbar>
    </div>
    <right-panel :active-data="activeData" :design-conf="designConf" :show-field="!!drawingList.length"
                 @tag-change="tagChange" @fetch-data="fetchData" @add-child-item="addChildItem"/>
    <form-drawer v-model="formDrawerVisible" :drawing-data="drawingData" size="100%" :generate-conf="generateConf"/>
    <json-drawer size="60%" v-model="jsonDrawerVisible" :json-str="jsonStr" @refresh="refreshJson"
                 class="drawer-header-hide"/>
    <code-type-dialog v-model="dialogVisible" title="选择生成类型" :show-file-name="showFileName"
                      @confirm="generate"/>
    <el-drawer v-model="componentTreeVisible" title="组件树">
      <el-tree :data="drawingList" node-key="renderKey" v-if="showTree"
               :props="{children:'__children__'}"
               default-expand-all draggable @node-click="activeDrawItem">
        <template #default="{ node, data }">

          <!--          data.__config__-->
          <!--          return config.tag + ":" + config.componentName || `${config.label}: ${data.__vModel__}`-->
          <span>
          <span>{{ data.__config__.tag }}</span>
          <span>
            <el-button style="margin-left: 8px" @click="removeItemFromTree($event,node, data)" icon="Delete" link
                       type="danger"/>
          </span>
        </span>
        </template>

      </el-tree>
    </el-drawer>
  </div>
</template>

<script setup>


import logo from "@/assets/logo.png"
import Draggable from 'vuedraggable'
import {debounce} from 'throttle-debounce'
import {saveAs} from 'file-saver'
import ClipboardJS from 'clipboard'
import FormDrawer from './FormDrawer'
import JsonDrawer from './JsonDrawer'
import RightPanel from './RightPanel'
import {
  childComponents,
  designConf as designConfPreset,
  htmlComponents,
  inputComponents,
  layoutComponents,
  rawComponents,
  selectComponents,
} from '@/components/generator/config'
import {beautifierConf, deepClone, isObjectObject,} from '@/utils/index'
import {vue3Template, vueScript, vueTemplate,} from '@/components/generator/html.js'
import {renderJs} from '@/components/generator/js'
import drawingDefault from '@/components/generator/drawingDefault'

import CodeTypeDialog from './CodeTypeDialog'
import {getDesignConf, getDrawingList, getIdGlobal, saveDrawingList, saveIdGlobal,} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import DraggableItem from "./DraggableItem"
import propertyConfigList from "@/components/generator/settingConfig";

import {elementPlusComponents} from "@/components/generator/elementPlusConfig";

import {nextTick} from "vue";

let tempActiveData
let beautifier

const drawingListInDB = getDrawingList();


const idGlobal = ref(getIdGlobal());

const labelWidth = ref(100);//not change
const drawingList = ref(drawingDefault || [])
const designConf = ref(designConfPreset);
const drawingData = ref()
const activeId = ref(drawingDefault[0].drawItemId)
const formDrawerVisible = ref(false)
const dialogVisible = ref(false)
const componentTreeVisible = ref(false)

const showTree = ref(true)//为了树能自动刷新

const jsonDrawerVisible = ref(false)
const generateConf = ref(null)
const showFileName = ref(false)
const activeData = ref(drawingDefault[0])
const actionDiv = ref(null)

const saveDrawingListDebounce = debounce(340, saveDrawingList)

const leftComponents = [
  {
    title: 'html原生组件',
    list: htmlComponents
  },
  {
    title: '输入型组件',
    list: inputComponents
  },
  {
    title: '选择型组件',
    list: selectComponents
  },
  {
    title: '展示型组件',
    list: rawComponents
  },
  {
    title: '布局型组件',
    list: layoutComponents
  },
  {
    title: '其它组件',
    list: childComponents
  }
]


let operationType = ""

watch(() => [...drawingList.value], (val) => {
  saveDrawingListDebounce(val)
  if (val.length === 0) idGlobal.value = 100

  showTree.value = false;
  nextTick(() => {
    showTree.value = true;
  })

  console.info(vue3Template(val), renderJs(val))
}, {deep: true})


watch(idGlobal, (val) => {
  saveIdGlobal(val)
})

onMounted(() => {
  if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {

    drawingList.value = drawingListInDB
  } else {
    drawingList.value = drawingDefault
  }
  for (const d of drawingList.value) {
    d.__config__.drawItemId = ++idGlobal.value;
  }
  if (drawingList.value.length > 1)
    activeDrawItem(drawingList.value[0])

  const designConfInDB = getDesignConf()
  if (designConfInDB) {
    designConf.value = designConfInDB
  }
  loadBeautifier((btf) => {
    beautifier = btf
  })
  const clipboard = new ClipboardJS('#copyNode', {
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
})

function setObjectValueReduce(obj, strKeys, data) {
  const arr = strKeys.split('.')
  arr.reduce((pre, item, i) => {
    if (arr.length === i + 1) {
      pre[item] = data
    } else if (!isObjectObject(pre[item])) {
      pre[item] = {}
    }
    return pre[item]
  }, obj)
}

function setRespData(component, resp) {
  const {dataPath, dataConsumer} = component.__config__
  if (!dataPath || !dataConsumer) return
  const respData = dataPath
      .split('.')
      .reduce((pre, item) => pre[item], resp)

  // 将请求回来的数据，赋值到指定属性。
  // 以el-table为例，根据Element文档，应该将数据赋值给el-tabel的data属性，所以dataConsumer的值应为'data';
  // 此时赋值代码可写成 component[dataConsumer] = respData；
  // 但为支持更深层级的赋值（如：dataConsumer的值为'options.data'）,使用setObjectValueReduce
  setObjectValueReduce(component, dataConsumer, respData)
  const i = drawingList.value.findIndex(
      (item) => item.renderKey === component.renderKey
  )
  if (i > -1) {
    drawingList.value[i] = component
  }
}

function fetchData(component) {
  const {dataType, method, url} = component.__config__
  if (dataType === 'dynamic' && method && url) {
    setLoading(component, true)
    // $axios({
    //   method,
    //   url,
    // }).then((resp) => {
    //   setLoading(component, false)
    //   setRespData(component, resp.data)
    // })
  }
}

function setLoading(component, val) {
  const {directives} = component
  if (Array.isArray(directives)) {
    const t = directives.find((d) => d.name === 'loading')
    if (t) t.value = val
  }
}

function activeDrawItem(currentItem) {
  activeData.value = currentItem
  activeId.value = currentItem.__config__.drawItemId;
}

let hoverList, hoverIndex, hoverItem;

function drawItemMouseenter(e, curItem, list, index) {
  // console.info("drawItemMouseenter", curItem)
  let rect = e.target.getBoundingClientRect()
  actionDiv.value.style.display = 'block';
  actionDiv.value.style.left = (rect.left + rect.width - actionDiv.value.clientWidth) + "px";
  actionDiv.value.style.top = (rect.top - 10) + "px";
  hoverIndex = index;
  hoverList = list;
  hoverItem = curItem;
  // actionDiv.value.addEventListener("click",drawingItemDelete(index,list))
}

function drawItemMouseleave(e, curItem, list, index) {
  // actionDiv.value.style.display = 'none';
}

function drawingItemCopy() {
  if (hoverList) {
    let clone = deepClone(hoverItem)
    clone = createIdAndKey(clone)
    hoverList.push(clone)
    activeDrawItem(clone)
  }
}

function drawingItemDelete() {
  if (hoverList) {
    hoverList.splice(hoverIndex, 1)
    nextTick(() => {
      const len = drawingList.value.length
      if (len) {
        activeDrawItem(drawingList.value[len - 1])
      }
    })
  }
}

function onEnd(obj) {
  console.info(obj)
  if (obj.from !== obj.to) {
    fetchData(tempActiveData)
    activeData.value = tempActiveData
    activeId.value = idGlobal.value
  }
}

function addComponent(item) {
  const clone = cloneComponent(item)

  fetchData(clone)

  if (activeData.value && activeData.value.__config__ && activeData.value.__config__.layout == 'containerItem') {
    if (allowToAdd(activeData.value, clone)) {
      activeData.value.__children__.push(clone)
    }
  } else {
    if (allowToAdd(undefined, clone)) {
      drawingList.value.push(clone)
      activeDrawItem(clone)
    }
  }
}


function cloneComponent(origin) {
  const clone = deepClone(origin)
  if (!clone["__props__"]) {
    clone["__props__"] = {}
  }
  const props = clone["__props__"];
  const id = clone.__id__;
  if (id && propertyConfigList[id]) {
    const pc = propertyConfigList[id];
    for (const key in pc) {
      if (key == 'vModel') {
        continue;
      }
      const p = pc[key];
      if (p.slot || props[key]) {
        continue
      }
      if (!p.hide && !clone.hasOwnProperty(key)) {
        props[key] = deepClone(p.default)
      }
      if (p.remember && designConf.value[key]) {
        props[key] = designConf.value[key];
      }
    }
    if (pc.placeholder)
      props.placeholder = pc.placeholder
  }
  const config = clone.__config__
  createIdAndKey(clone);
  props.placeholder !== undefined && (props.placeholder += config.label);
  if (!props.style) {
    props.style = {}
  }
  tempActiveData = clone
  return tempActiveData
}

function createIdAndKey(item) {

  const config = item.__config__
  config.drawItemId = ++idGlobal.value
  config.label = config.name
  item.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}` // 改变renderKey后可以实现强制更新组件

  const itemId = item.__id__;
  if (itemId && propertyConfigList[itemId] && propertyConfigList[itemId].vModel) {
    item.__vModel__ = `${item.__id__}${idGlobal.value}`.replace(/\-/g, "_")
  }
  if (config.layout === 'containerItem') {
    config.componentName = `${item.__id__}${idGlobal.value}`
    !Array.isArray(item.__children__) && (item.__children__ = [])
    delete config.label // rowFormItem无需配置label属性
  }
  if (Array.isArray(item.__children__)) {
    item.__children__ = item.__children__.map((childItem) =>
        createIdAndKey(childItem)
    )
  }
  return item
}

function allowToAdd(parent, clone) {
  const tag = clone.__config__.parentTag;
  if (tag) {
    if (parent == undefined || parent.__config__.tag != tag) {
      ElMessageBox.alert("只能添加到" + tag + "组件下。")
      return false;
    }
  }
  return true;
}


const layoutTreeProps = {
  label(data, node) {
    const config = data.__config__
    return config.tag + ":" + config.componentName || `${config.label}: ${data.__vModel__}`
  }
}

function AssembleFormData() {
  drawingData.value = {
    fields: deepClone(drawingList.value),
    ...designConf.value,
  }
}

function generate(data) {

  AssembleFormData()
  if (operationType == "download") {
    generateConf.value = data
    execDownload(data)
  } else if (operationType == "copy") {
    execCopy();
  } else if (operationType == "run") {
    generateConf.value = data
    console.info(generateConf.value)
    execRun();
  }
}

function execRun(data) {
  AssembleFormData()
  formDrawerVisible.value = true
}

function execDownload(data) {

  const codeStr = generateCode()
  const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
  saveAs(blob, data.fileName)
}

function execCopy(data) {
  document.getElementById('copyNode').click()
}

function empty() {
  ElMessageBox.confirm('确定要清空所有组件吗？', '提示', {type: 'warning'}).then(
      () => {
        drawingList.value = []
        activeData.value = {}
        idGlobal.value = 100;
      }
  )
}


function generateCode() {
  //const {type} = generateConf.value
  const script = vueScript(renderJs(drawingList.value))
  const html = vueTemplate(vue3Template(drawingList.value))
  // const css = cssStyle(makeUpCss(drawingData))
  return beautifier.html(html + script, beautifierConf.html)

}

const jsonStr = ref();

function showJson() {
  //AssembleFormData()
  jsonStr.value = JSON.stringify(drawingList.value, null, 2);
  console.info(jsonStr.value)
  jsonDrawerVisible.value = true
}

function download() {
  dialogVisible.value = true
  showFileName.value = true
  operationType = 'download'
}

function run() {
  dialogVisible.value = true
  showFileName.value = false
  operationType = 'run'
}

function copy() {
  dialogVisible.value = true
  showFileName.value = false
  operationType = 'copy'
}

//更改组件tag，并复制以前的数据
function tagChange(newTag) {
  newTag = cloneComponent(newTag)
  activeData.value.__id__ = newTag.__id__
  newTag.__config__.defaultValue = activeData.value.__config__.defaultValue
  activeData.value.__config__ = newTag.__config__

  activeData.value.__props__.placeholder = newTag.__props__.placeholder
  Object.keys(activeData.value.__props__).forEach((key) => {
    if (newTag.__props__.hasOwnProperty(key) && activeData.value.__props__[key] != undefined) {
      newTag.__props__[key] = activeData.value.__props__[key];
    }
  })
  activeData.value.__props__ = newTag.__props__

  if (newTag.__slot__ && activeData.value.__slot__) {
    Object.keys(activeData.value.__slot__).forEach((key) => {
      if (newTag.__slot__.hasOwnProperty(key) && activeData.value.__slot__[key] != undefined) {
        newTag.__slot__[key] = activeData.value.__slot__[key];
      }
    })
  }
  activeData.value.__slot__ = newTag.__slot__
  activeData.value.renderKey = newTag.renderKey
}


function refreshJson(data) {
  drawingList.value = deepClone(data.fields)
  delete data.fields
  designConf.value = data
}


function addChildItem(item) {
  const clone = cloneComponent(item);
  activeData.value.__children__.push(clone)
}

function removeItemFromTree(e, node, data) {
  const parent = node.parent
  const children = parent.data.__children__ || parent.data;
  const index = children.findIndex((d) => d.renderKey === data.renderKey)
  children.splice(index, 1);
  e.stopPropagation();
}

//region dark theme
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import { useToggle } from "@vueuse/shared";
// import { useDark } from "@vueuse/core";
//
// const isDark = useDark({
//   // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
//   storageKey: "useDarkKEY",
//   // 暗黑class名字
//   valueDark: "dark",
//   // 高亮class名字
//   valueLight: "light"
// });
// const toggle = useToggle(isDark);
// toggle("dark");

//endregion


//region
//endregion
</script>


<style lang="scss">
@import '@/styles/home';
</style>
