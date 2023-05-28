<template>

  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo"><img :src="logo" alt="logo"/> Element Plus Designer
          <a class="github"
             href="https://github.com/wizount/element-plus-designer"
             target="_blank"> <img
              src="https://github.githubassets.com/pinned-octocat.svg" alt/> </a></div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <el-collapse class="components-list">
          <el-collapse-item :title="c.title" :name="c.titles" v-for="c in elementPlusComponents" :key="c.title">
            <!--            <el-link v-for="l in c.children">{{ l.name }}</el-link>-->
            <template v-for="l in c.children">
              <!--                {{ l.name }}-->
              <draggable tag="span" class="components-draggable" :list="l.children" item-key="renderKey"
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
        <el-button text @click="showHtml"> 查看Vue</el-button>
        <el-button text @click="download"> 导出vue文件</el-button>
        <el-button text @click="componentTreeVisible=true"> 组件树</el-button>
        <el-button text @click="execCopy"> 复制代码</el-button>
        <!--        <el-dropdown>-->
        <!--          <el-button text> 复制代码</el-button>-->
        <!--          <template #dropdown>-->
        <!--            <el-dropdown-menu>-->
        <!--              <el-dropdown-item @click="console.info(11)">-->
        <!--                页面-->
        <!--              </el-dropdown-item>-->
        <!--              <el-dropdown-item @click="">-->
        <!--                弹窗-->
        <!--              </el-dropdown-item>-->
        <!--            </el-dropdown-menu>-->
        <!--          </template>-->
        <!--        </el-dropdown>-->
        <el-dropdown>
          <el-button text> 设置</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-form-item label="未选中组件画边框" style="margin-bottom: 0px">
                  <el-switch v-model="designConf.unFocusedComponentBorder"></el-switch>
                </el-form-item>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-form-item label="组件包裹col" prop="wrapWithCol" style="margin-bottom: 0px">
                  <el-switch v-model="designConf.wrapWithCol"></el-switch>
                </el-form-item>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button type="danger" text icon="Delete" @click="emptyDrawingList"> 清空</el-button>
        <div id="copyNode" class="display:none;"></div>
      </div>
      <el-scrollbar class="center-scrollbar" @scroll="resetActiveDrawItemPosition">
        <draggable tag="div" :list="drawingList" style="padding: 5px"
                   group="componentsGroup" item-key="renderKey">
          <template #item="{element,index}">
            <draggable-item :drawing-list="drawingList" :current-item="element" :index="index"
                            :active-id="activeId" :design-conf="designConf" @activeItem="activeDrawItem"/>
          </template>
        </draggable>
        <div v-show="!drawingList||drawingList.length===0" class="empty-info"> 从左侧拖入或点选组件进行界面设计</div>
        <div style="position: fixed; left: 400px" ref="actionDiv" v-if="activeData.__config__">
          <svg-icon :icon-class="activeData.__config__.tagIcon"/>
          <span style="color: gray"> {{ activeData.__config__.componentName }}</span>

          <el-button class="activeBtn" size="small" circle @click="activeParentComponent" title="跳到父组件">
            <el-icon style="transform:rotate(180deg);">
              <Download/>
            </el-icon>
          </el-button>
          <el-button class="activeBtn" size="small" circle icon="ArrowUp" @click="moveComponent(-1)" title="上移">
          </el-button>
          <el-button class="activeBtn" size="small" circle icon="ArrowDown" @click="moveComponent(1)" title="下移">
          </el-button>
          <el-button class="activeBtn" type="primary" size="small" circle icon="Document" @click="drawingItemCopy"
                     title="复制组件"/>
          <el-button class="activeBtn" type="danger" size="small" circle icon="Delete" @click="drawingItemDelete"
                     title="删除组件"/>
        </div>
      </el-scrollbar>
    </div>
    <right-panel :active-data="activeData" :design-conf="designConf" :show-field="!!drawingList.length"
                 @tag-change="tagChange" @fetch-data="fetchData" @add-child-item="addChildItem"
                 @active-parent-component="activeParentComponent"/>
    <form-drawer v-model="formDrawerVisible" :drawing-data="drawingData" size="100%" :generate-conf="generateConf"/>
    <json-drawer size="750px" v-model="jsonDrawerVisible" :json-str="jsonStr" @refresh="refreshJson"/>

    <html-drawer size="750px" v-model="htmlDrawerVisible" :html-str="htmlStr"/>
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
import FormDrawer from './FormDrawer.vue'
import JsonDrawer from './JsonDrawer'
import RightPanel from './RightPanel'
import {

  designConf as designConfPreset
} from '@/components/generator/config'
import {beautifierConf, deepClone, isObjectObject} from '@/utils/index'
import {vue3Template, vueScript} from '@/components/generator/html.js'
import {renderJs} from '@/components/generator/js'
import drawingDefault from '@/components/generator/drawingDefault'

import CodeTypeDialog from './CodeTypeDialog'
import {getDesignConf, getDrawingList, getIdGlobal, saveDesignConf, saveDrawingList, saveIdGlobal,} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import DraggableItem from "./DraggableItem"
import propertyConfigList from "@/components/generator/settingConfig";

import {elementPlusComponents} from "@/components/generator/elementPlusConfig";

const componentMap = {};
elementPlusComponents.forEach((first) => {
  first.children.forEach((second) => {
    second.children.forEach((third) => {
      componentMap[third.__config__.tag] = third;
    });
  });
})
import {nextTick} from "vue";
import {Download} from "@element-plus/icons-vue";
import HtmlDrawer from "@/views/design/HtmlDrawer.vue";


let tempActiveData
let beautifier

//region 初始化

const props = defineProps({
  modelValue: {
    type: Array,
    default: []
  }
});
const emits = defineEmits(["update:modelValue"]);


const drawingList = ref([])
watch(() => props.modelValue, (val) => {
  drawingList.value = val;
})

watch(drawingList, (val) => {
  if (val.length === 0) idGlobal.value = 100
  emits("update:modelValue", val);

  showTree.value = false;
  nextTick(() => {
    showTree.value = true;
  })
}, {deep: true})
//endregion
const idGlobal = ref(100);

const designConf = ref(designConfPreset);
const drawingData = ref()
const activeId = ref(0)
const formDrawerVisible = ref(false)
const dialogVisible = ref(false)
const componentTreeVisible = ref(false)

const showTree = ref(true)//为了树能自动刷新


const generateConf = ref(null)
const showFileName = ref(false)
const activeData = ref({})
const actionDiv = ref(null)


let operationType = ""

onMounted(() => {
  drawingList.value = props.modelValue;
  if (drawingList.value.length >= 1) {
    activeDrawItem(drawingList.value[0])
  }

  idGlobal.value = 100;
  for (const dl of drawingList.value) {
    resetDrawItemId(dl);
  }

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

function fetchData(component) {//todo 增加动态获取数据
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

//region 选中组件的操作
function activeDrawItem(currentItem) {
  if (!currentItem || !currentItem.__config__) {
    return;
  }
  activeData.value = currentItem
  activeId.value = currentItem.__config__.drawItemId;

  nextTick(() => {
    resetActiveDrawItemPosition();
  })
}

function drawingItemCopy() {
  let res = findItemIndexInList(drawingList.value, activeData.value);
  if (res) {
    let {list} = res;

    let clone = deepClone(activeData.value);

    resetDrawItemId(clone);

    list.push(clone);
  }
}


function drawingItemDelete() {
  let {parent, index} = findParentAndIndexOfChildrenInDrawList(activeData.value);
  const list = parent && parent.__children__ || drawingList.value;
  list.splice(index, 1);
  nextTick(() => {
    const len = list.length
    if (len > 0) {
      index = index - 1;
      if (index < 0) {
        index = 0;
      }
      activeDrawItem(list[index])
    } else {
      parent && activeDrawItem(parent);
    }
    if (drawingList.value.length === 0) {
      activeData.value = {}
    }
  })
}

//active父组件
function activeParentComponent() {
  let {parent} = findParentAndIndexOfChildrenInDrawList(activeData.value);
  if (parent) {
    activeDrawItem(parent);
  } else {
    ElNotification.info("无父组件");
  }
}

//移动
function moveComponent(upOrDown) {

  let res = findItemIndexInList(drawingList.value, activeData.value);
  if (!res) {
    return;
  }
  let {list, index} = res;
  if (!list || list.length <= 1) {
    return
  }
  let moveIndex = index + upOrDown;
  if (moveIndex < 0 || moveIndex >= list.length) {
    return;
  }
  let a = list[index];
  list[index] = list[moveIndex];
  list[moveIndex] = a;
  nextTick(() => {
    activeDrawItem(activeData.value)
  })

}

function resetActiveDrawItemPosition() {
  let item = document.getElementsByClassName("active-draw-item")[0];
  let rect = item.getBoundingClientRect()
  actionDiv.value.style.display = 'block';
  actionDiv.value.style.left = (rect.left + rect.width - actionDiv.value.clientWidth) + "px";
  actionDiv.value.style.top = (rect.top - 20) + "px";
}

//endregion
//region 组件遍历

/**
 * 从list中找到 item 的index
 * @param list
 * @param item
 * @returns {undefined|*|{index: string, list}}
 */
function findItemIndexInList(list, item) {
  for (let index = 0; index < list.length; index++) {
    let l = list[index];
    if (item.renderKey === l.renderKey) {
      return {list, index}
    }
    if (l.__children__ && l.__children__.length > 0) {
      let res = findItemIndexInList(l.__children__, item);
      if (res) {
        return res;
      }
    }
  }
  return undefined;
}

/**
 * 查找某个item的父节点，并在__children__的所在位置
 */
function findParentAndIndexOfChildrenInDrawList(item) {
  for (let index = 0; index < drawingList.value.length; index++) {
    const c = drawingList.value[index];
    if (c.renderKey === item.renderKey) {
      return {index}
    }
    let r = findParentAndIndexOfChildren(c, item);
    if (r) {
      return r;
    }
  }
  return {};
}

function findParentAndIndexOfChildren(parent, item) {
  if (parent.__children__) {
    for (let index = 0; index < parent.__children__.length; index++) {
      const c = parent.__children__[index];
      if (c.renderKey === item.renderKey) {
        return {parent, index}
      }
      let r = findParentAndIndexOfChildren(c, item);
      if (r) {
        return r;
      }
    }
  }
  return undefined;
}


//endregion

//region 组件克隆操作

//拖拽结束的操作

function onEnd(obj) {
  if (obj.from !== obj.to) {
    fetchData(tempActiveData);

    const {parent, index} = findParentAndIndexOfChildrenInDrawList(tempActiveData);
    //判断是否可以添加
    if (allowToAdd(parent, tempActiveData)) {
      activeData.value = tempActiveData;
      activeId.value = idGlobal.value;
    } else {//不能添加就删除
      parent.__children__.splice(index, 1);
    }

  }
}

function addComponent(item) {
  const clone = cloneComponent(item)

  fetchData(clone)


  if (activeData.value && activeData.value.__config__ && activeData.value.__config__.layout === 'containerItem') {
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
  //用el-col包裹
  let colItem
  // if(designConf.value.wrapWithCol) {
  let {parent} = findParentAndIndexOfChildrenInDrawList(origin);
  parent = parent || activeData.value;
  if (parent && parent.__config__ && parent.__config__.tag === 'el-row' && origin.__config__.tag !== 'el-col') {
    colItem = cloneComponent(componentMap["el-col"]);
  }
  //   if (designConf.value.wrapWithCol && origin.__config__.tag !== 'el-row' && origin.__config__.tag !== 'el-col') {
  //     colItem = cloneComponent(componentMap["el-col"]);
  //   }
  // }


  const clone = deepClone(origin);
  createIdAndKey(clone);
  if (!clone["__props__"]) {
    clone["__props__"] = {}
  }
  const props = clone["__props__"];
  props.__ref__ = {};
  const id = clone.__id__;
  if (id && propertyConfigList[id]) {
    const propConf = propertyConfigList[id];
    for (const key in propConf) {
      if (key === 'vModel' || props[key]) {//非空值继续
        continue
      }
      const aPc = propConf[key];
      if (aPc.hide) {
        continue;
      }
      if (aPc.ref) {
        props.__ref__[key] = clone.__config__.componentName + key[0].toUpperCase() + key.slice(1);
      } else if (aPc.formRef) {
        props[key] = aPc.defaultRefName;
      } else {
        props[key] = deepClone(aPc.default)
      }
      if (aPc.remember && designConf.value[key]) {
        props[key] = designConf.value[key];
      }
    }
    if (propConf.placeholder)
      props.placeholder = propConf.placeholder
  }
  const config = clone.__config__
  props.placeholder !== undefined && (props.placeholder += config.label);
  if (!props.style) {
    props.style = {}
  }
  if (colItem) {
    colItem.__children__.push(clone);
    tempActiveData = colItem;
  } else {
    tempActiveData = clone
  }
  return tempActiveData
}

function createIdAndKey(item) {
  const config = item.__config__
  config.drawItemId = ++idGlobal.value;
  if (config.showLabel) {
    config.label = config.name
  }
  item.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}` // 改变renderKey后可以实现强制更新组件

  const itemId = item.__id__;
  if (itemId && propertyConfigList[itemId] && propertyConfigList[itemId].vModel) {
    item.__vModel__ = `${item.__id__}${idGlobal.value}`.replace(/\-/g, "_")
  }
  if (config.layout === 'containerItem') {
    !Array.isArray(item.__children__) && (item.__children__ = [])
  }
  config.componentName = `${item.__id__}${idGlobal.value}`
  if (Array.isArray(item.__children__)) {
    item.__children__ = item.__children__.map((childItem) =>
        createIdAndKey(childItem)
    )
  }
  return item
}

/**
 * 重新设置组件id，重新加载或者复制组件都会调用
 * @param item
 */
function resetDrawItemId(item) {
  let newId = ++idGlobal.value;
  let config = item.__config__;
  if (config.componentName === `${item.__id__}${config.drawItemId}`) {
    config.componentName = `${item.__id__}${newId}`
  }
  if (item.__vModel__ === `${item.__id__}${config.drawItemId}`.replace(/\-/g, "_")) {
    item.__vModel__ = `${item.__id__}${newId}`.replace(/\-/g, "_")
  }
  config.drawItemId = newId;
  item.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}` // 改变renderKey后可以实现强制更新组件
  if (item.__children__ && item.__children__.length > 0) {
    for (const c of item.__children__) {
      resetDrawItemId(c);
    }
  }
}

function allowToAdd(parent, clone) {
  console.info(parent, clone)
  if (!parent) {
    console.info(1)
    const parentTag = clone.__config__.parentTag;
    if (parentTag) {
      ElMessageBox.alert(`不能添加${clone.__config__.name}（${clone.__config__.tag}）。`)
      return false;
    }
    return true;
  }
  const childTag = parent.__config__.childTag;

  if (childTag) {
    console.info(2)
    if (clone.__config__.tag !== childTag) {
      ElMessageBox.alert(`${parent.__config__.name}（${parent.__config__.tag}）组件下只能添加${childTag}。`)
      //  ElMessageBox.alert(`不只能添加到${clone.__config__.name}（${parent.__config__.tag}）组件下。${designConf.value.wrapWithCol ? "可以关闭”设置->组件包裹col“。" : ""}`)
      return false;
    }
  }
  const parentTag = clone.__config__.parentTag;
  if (parentTag) {
    console.info(3)
    if (parent.__config__.tag !== parentTag) {
      ElMessageBox.alert(`只能添加到${clone.__config__.name}（${parentTag}）组件下。`)
      return false;
    }
  }
  return true;
}

//endregion
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
  if (operationType === "download") {
    generateConf.value = data
    execDownload(data)
  } else if (operationType === "copy") {
    execCopy();
  } else if (operationType === "run") {
    generateConf.value = data
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

function execCopy() {
  document.getElementById('copyNode').click()
}

function emptyDrawingList() {
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
  const script = beautifier.js(renderJs(drawingList.value), beautifierConf.js);
  const html = beautifier.html(vue3Template(drawingList.value), beautifierConf.html);
  // const css = cssStyle(makeUpCss(drawingData))

  return vueScript(html, script)

}

//region json显示操作
const jsonDrawerVisible = ref(false)
const jsonStr = ref("");

function showJson() {
  jsonStr.value = JSON.stringify(drawingList.value, null, 2);

  jsonDrawerVisible.value = true
}

function refreshJson(data) {
  drawingList.value = deepClone(data)
}

//endregion

//region html显示操作
const htmlDrawerVisible = ref(false)
const htmlStr = ref("");

function showHtml() {
  htmlStr.value = generateCode();

  htmlDrawerVisible.value = true
}


//endregion
function download() {
  dialogVisible.value = true
  showFileName.value = true
  operationType = 'download'
}

function run() {
  ElMessageBox.alert("未完成");
  // dialogVisible.value = true
  // showFileName.value = false
  // operationType = 'run'
}

function copy() {
  dialogVisible.value = true
  showFileName.value = false
  operationType = 'copy'
}

//废弃！更改组件tag，并复制以前的数据
function tagChange(newTag) {
  newTag = cloneComponent(newTag)
  activeData.value.__id__ = newTag.__id__
  newTag.__config__.defaultValue = activeData.value.__config__.defaultValue
  activeData.value.__config__ = newTag.__config__;

  activeData.value.__props__.placeholder = newTag.__props__.placeholder
  Object.keys(activeData.value.__props__).forEach((key) => {
    if (newTag.__props__.hasOwnProperty(key) && activeData.value.__props__[key] !== undefined) {
      newTag.__props__[key] = activeData.value.__props__[key];
    }
  })
  activeData.value.__props__ = newTag.__props__

  if (newTag.__slot__ && activeData.value.__slot__) {
    Object.keys(activeData.value.__slot__).forEach((key) => {
      if (newTag.__slot__.hasOwnProperty(key) && activeData.value.__slot__[key] !== undefined) {
        newTag.__slot__[key] = activeData.value.__slot__[key];
      }
    })
  }
  activeData.value.__slot__ = newTag.__slot__
  activeData.value.renderKey = newTag.renderKey
}


//添加子项，比如el-steps下加上el-step子项
function addChildItem(childTag) {

  let child = componentMap[childTag]
  if (child) {
    const clone = cloneComponent(child);
    activeData.value.__children__.push(clone)
  }
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
watch(designConf, (val) => {
  saveDesignConf(val)
}, {deep: true})
//endregion
</script>


<style lang="scss">
@import '@/styles/home';

.p-0 {
  padding: 0 !important;
}

.m-2 {
  margin: 2px !important;
}

.activeBtn {
  @extend .p-0;
  @extend .m-2;
}
</style>
