<template>

  <div class="container">

    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo"><img :src="logo" alt="logo"/> Element Plus Designer<a class="github"
                                                                                href="https://github.com/wizount/element-plus-designer"
                                                                                target="_blank">
          <svg-icon icon-class="github"/>
        </a>
          <a class="github"
             href="https://gitee.com/wizount/element-plus-designer"
             target="_blank">
            <svg-icon icon-class="gitee"/>
          </a>
        </div>


      </div>
      <el-scrollbar class="left-scrollbar">
        <el-collapse class="components-list">
          <el-collapse-item :title="c.title" :name="c.titles" v-for="c in elementPlusComponents" :key="c.title">
            <template v-for="l in c.children">
              <draggable tag="span" class="components-draggable" :list="l.children" item-key="renderKey"
                         :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneDrawItem"
                         draggable=".components-item" :sort="false" @end="onEnd">
                <template #item="{element}">
                  <div class="components-item" @click="addDrawItem(element)" :title="element.__config__.tag">
                    <div class="components-body">
                      <svg-icon :icon-class="element.__config__.tagIcon"/>
                      {{ element.__config__.name }}
                      <el-dropdown v-if="element.__link__" class="subtag-item" @command="addDrawItem">
                        <el-icon style="height: 38px;" @click="(e)=>{e.stopPropagation()}">
                          <arrow-down/>
                        </el-icon>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item v-for="l in element.__link__" :command="l">
                              <svg-icon :icon-class="l.__config__.tagIcon"/>
                              {{ l.__config__.name || l.__config__.tag }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </div>
                </template>
              </draggable>
            </template>
          </el-collapse-item>

        </el-collapse>

      </el-scrollbar>
    </div>
    <div class="center-board">
      <div class="action-bar">
        <el-button text @click="run">
          <svg-icon class="mr-2" icon-class="run"/>
          运行
        </el-button>
        <el-button text @click="showJson">
          <svg-icon class="mr-2" icon-class="json"/>
          查看json
        </el-button>
        <el-button text @click="showHtml">
          <svg-icon class="mr-2" icon-class="code"/>
          查看Vue
        </el-button>
        <el-button text @click="download" icon="Download"> 导出vue文件</el-button>
        <el-button text @click="drawItemTreeVisible=true">
          <svg-icon class="mr-2" icon-class="tree"/>
          组件树
        </el-button>
        <el-button text @click="execCopy" icon="DocumentCopy"> 复制代码</el-button>
        <el-dropdown>
          <el-button text icon="Setting"> 设置</el-button>
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
              <el-dropdown-item>
                <el-form-item label="表单组件包裹form-item" prop="wrapWithCol" style="margin-bottom: 0px">
                  <el-switch v-model="designConf.wrapWithFormItem"></el-switch>
                </el-form-item>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-form-item label="暗黑模式" style="margin-bottom: 0px">
                  <el-switch @click="toggleDark()" :model-value="isDark" title="暗黑模式"></el-switch>
                </el-form-item>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>

        </el-dropdown>

        <el-button type="danger" text icon="Delete" @click="emptyDrawItemList"> 清空</el-button>
        <div id="copyNode" class="display:none;"></div>
      </div>
      <el-scrollbar class="center-scrollbar" @scroll="resetActiveDrawItemPosition">
        <draggable tag="div" :list="drawItemList" style="padding: 5px"
                   group="componentsGroup" item-key="renderKey" @change="itemChange" :move="itemMove">
          <template #item="{element,index}">
            <draggable-item :current-item="element"
                            :active-id="activeId" :design-conf="designConf" @activeItem="activeDrawItem"
                            @change="itemChange" :item-move="itemMove" :form-models-and-rules="formModelsAndRules"
                            :dynamic-data="dynamicData"/>
          </template>
        </draggable>
        <div v-show="!drawItemList||drawItemList.length===0" class="empty-info"> 从左侧拖入或点选组件进行界面设计</div>
        <div class="activeToolbar" ref="activeToolbar" v-if="activeData.renderKey">
          <svg-icon style="color: var(--el-text-color)" :icon-class="activeData.__config__.tagIcon"/>
          <span style="color: var(--el-text-color)"> {{ activeData.__config__.itemName }}</span>

          <el-button class="activeBtn" size="small" type="info" circle @click="activeParentDrawItem"
                     title="跳到父组件">
            <el-icon style="transform:rotate(180deg);">
              <Download/>
            </el-icon>
          </el-button>
          <el-button class="activeBtn" size="small" type="info" circle icon="ArrowUp" @click="moveDrawItem(-1)"
                     title="上移">
          </el-button>
          <el-button class="activeBtn" size="small" type="info" circle icon="ArrowDown" @click="moveDrawItem(1)"
                     title="下移">
          </el-button>
          <el-button class="activeBtn" type="primary" size="small" circle icon="Document" @click="drawItemCopy"
                     title="复制组件"/>
          <el-button class="activeBtn" type="danger" size="small" circle icon="Delete" @click="deleteDrawItem"
                     title="删除组件"/>
        </div>
      </el-scrollbar>
    </div>
    <right-panel :active-data="activeData" :design-conf="designConf" :show-field="!!drawItemList.length"
                 @fetch-data="fetchData" @add-slot-draw-item="addSlotDrawItem"
                 @active-parent-draw-item="activeParentDrawItem"/>
    <form-drawer v-model="formDrawerVisible" :drawing-data="drawingData" size="100%" :generate-conf="generateConf"/>
    <json-drawer size="750px" v-model="jsonDrawerVisible" :json-str="jsonStr" @refresh="refreshJson"/>

    <html-drawer size="750px" v-model="htmlDrawerVisible" :html-str="htmlStr"/>
    <code-type-dialog v-model="dialogVisible" title="选择生成类型" :show-file-name="showFileName"
                      @confirm="generate"/>
    <el-drawer v-model="drawItemTreeVisible" title="组件树" size="350px" modal-class="bg-transparent"
               @open="openTreeDrawer">
      <el-tree :data="drawItemTreeData" ref="drawItemTree" node-key="renderKey" v-if="showTree"
               default-expand-all highlight-current :expand-on-click-node="false"
               @node-click="activeDrawItemThroughTree" draggable :allow-drag="drawItemTreeAllowDrag"
               :allow-drop="drawItemTreeAllowDrop" @node-drop="drawItemTreeNodeDrop">
        <template #default="{ node, data }">
          <span>
             <el-text v-if="data.__id__==='plainText' " type="primary"><svg-icon
                 :icon-class="data.__config__.tagIcon" :class="{ac:data.renderKey===activeData.renderKey}"/>{{
                 data.__id__
               }} - {{ data.__config__.itemName }}</el-text>
          <el-text v-else-if="data.__config__&&data.__config__.tag" type="primary"><svg-icon
              :icon-class="data.__config__.tagIcon" :class="{ac:data.renderKey===activeData.renderKey}"/>{{
              data.__config__.tag
            }} - {{ data.__config__.itemName }}</el-text>
             <span v-else :title="`插槽${data.slotName}`">{{ data.slotName }}</span>
          <span>
            <el-button style="margin-left: 8px" @click="removeItemFromTree( data)" icon="Delete" link
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
import Draggable from '@/vuedraggable/vuedraggable'
import {saveAs} from 'file-saver'
import ClipboardJS from 'clipboard'
import FormDrawer from './FormDrawer.vue'
import JsonDrawer from './JsonDrawer'
import RightPanel from './RightPanel'
import {
  designConf as designConfPreset
} from '@/components/config/config'
import {beautifierConf, camelCase, deepClone, isObjectObject} from '@/utils/index'
import {vue3Template, vueScript} from '@/components/generator/html.js'
import {renderJs} from '@/components/generator/js'

import CodeTypeDialog from './CodeTypeDialog'
import {getDesignConf, getDrawItemList, getIdGlobal, saveDesignConf, saveDrawItemList, saveIdGlobal,} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import DraggableItem from "./DraggableItem"
import {elementPlusComponents} from "@/components/config/elementPlusConfig";


import elementPlusConfigMap from "@/element-plus-config";

const componentMap = {};
elementPlusComponents.forEach((first) => {
  first.children.forEach((second) => {
    second.children.forEach((third) => {
      createComponentMap(third)
      if (third.__link__) {
        third.__link__.forEach(l => {
          createComponentMap(l)
        })
      }
    });
  });
})

function createComponentMap(com) {
  if (elementPlusConfigMap[com.__id__]) {
    if (!com.__config__) {
      com.__config__ = {};
    }
    const {name, tag, tagIcon, layouts} = elementPlusConfigMap[com.__id__];
    if (!com.__config__.name) {
      com.__config__.name = name;
    }
    if (!com.__config__.tag) {
      com.__config__.tag = tag;
    }
    if (!com.__config__.tagIcon) {
      com.__config__.tagIcon = tagIcon;
    }
    com.__config__.layout = layouts[0];
    componentMap[com.__id__] = com;
  }
}

import {nextTick} from "vue";
import {ArrowDown, Download} from "@element-plus/icons-vue";
import HtmlDrawer from "@/views/design/HtmlDrawer.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";


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


const drawItemList = ref([])

watch(() => props.modelValue, (val) => {
  drawItemList.value = val;
})

watch(drawItemList, (val) => {
  if (val.length === 0) idGlobal.value = 100
  emits("update:modelValue", val);
  formModelsAndRules.value = {};
  buildFormModelsAndRules(val);
  buildDynamicData();
  drawItemTreeData.value = [];

}, {deep: true})
//endregion
const idGlobal = ref(100);

const designConf = ref(designConfPreset);
const drawingData = ref()
const activeId = ref(0)
const formDrawerVisible = ref(false)
const dialogVisible = ref(false)

const generateConf = ref(null)
const showFileName = ref(false)
const activeData = ref({})
const activeToolbar = ref(null)

//region 初始化及退出
let operationType = ""
let clipboard
onMounted(() => {
  drawItemList.value = props.modelValue;
  if (drawItemList.value.length >= 1) {
    activeDrawItem(drawItemList.value[0])
  }

  idGlobal.value = 100;
  recursiveProcessDrawItemList(drawItemList.value, setMaxIdGlobal)
  const designConfInDB = getDesignConf()
  if (designConfInDB) {
    designConf.value = designConfInDB
  }
  loadBeautifier((btf) => {
    beautifier = btf
  })
  clipboard = new ClipboardJS('#copyNode', {
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

onBeforeUnmount(() => {
  clipboard && clipboard.destroy();
})

/**
 *找出最大的idGlobal
 * @param item
 */
function setMaxIdGlobal(item) {
  if (!item || !item.__config__) return;
  let config = item.__config__;
  idGlobal.value = Math.max(idGlobal.value, config.drawItemId)
}

function findItemIndexInDrawItemList(targetItem) {
  return recursiveFindItemIndexInList(null, drawItemList.value, targetItem);
}

//endregion
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

function setRespData(item, resp) {
  const {dataPath, dataConsumer} = item.__config__
  if (!dataPath || !dataConsumer) return
  const respData = dataPath
      .split('.')
      .reduce((pre, item) => pre[item], resp)

  // 将请求回来的数据，赋值到指定属性。
  // 以el-table为例，根据Element文档，应该将数据赋值给el-tabel的data属性，所以dataConsumer的值应为'data';
  // 此时赋值代码可写成 component[dataConsumer] = respData；
  // 但为支持更深层级的赋值（如：dataConsumer的值为'options.data'）,使用setObjectValueReduce
  setObjectValueReduce(item, dataConsumer, respData)
  const i = drawItemList.value.findIndex(
      (item) => item.renderKey === item.renderKey
  )
  if (i > -1) {
    drawItemList.value[i] = item
  }
}

function fetchData(item) {//todo 增加动态获取数据
  const {dataType, method, url} = item.__config__
  if (dataType === 'dynamic' && method && url) {
    setLoading(item, true)
    // $axios({
    //   method,
    //   url,
    // }).then((resp) => {
    //   setLoading(component, false)
    //   setRespData(component, resp.data)
    // })
  }
}

function setLoading(item, val) {
  const {directives} = item
  if (Array.isArray(directives)) {
    const t = directives.find((d) => d.name === 'loading')
    if (t) t.value = val
  }
}

//region 选中组件的操作

import {useWindowSize} from "@vueuse/core";

const {width, height} = useWindowSize();
watch([width, height], (val) => {
  nextTick(() => {
    resetActiveDrawItemPosition();
  })
})

function activeDrawItem(item) {
  if (!item || !item.__config__) {
    return;
  }
  activeData.value = item;
  activeId.value = item.__config__.drawItemId;
  setTimeout(() => {
    resetActiveDrawItemPosition();
  }, 50)
}

function drawItemCopy() {
  let res = findItemIndexInDrawItemList(activeData.value);
  if (res) {
    let {list} = res;

    let clone = deepClone(activeData.value);
    processADrawItemAndSlots(clone, resetDrawItemId)

    list.push(clone);
  }
}


function deleteDrawItem(e, item) {
  let {parent, list, index} = findItemIndexInDrawItemList(item || activeData.value);
  if (!Array.isArray(list) || index < 0 || index > list.length) {
    return;
  }
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
    if (drawItemList.value.length === 0) {
      activeData.value = {}
    }
  })
}

//active父组件
function activeParentDrawItem() {
  let {parent} = findItemIndexInDrawItemList(activeData.value);
  if (parent) {
    activeDrawItem(parent);
  } else {
    //ElNotification.info("无父组件");
  }
}

//移动
function moveDrawItem(upOrDown) {

  let res = findItemIndexInDrawItemList(activeData.value);
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
  if (item) {
    let rect = item.getBoundingClientRect()
    activeToolbar.value.style.display = 'block';
    activeToolbar.value.style.left = (rect.left + rect.width - activeToolbar.value.clientWidth) + "px";
    activeToolbar.value.style.top = (rect.top - 20) + "px";
  }
}

//endregion


//region 组件克隆操作

//拖拽结束的操作

function onEnd(obj) {
  if (obj.from !== obj.to) {
    fetchData(tempActiveData);
    const {parent, list, index} = findItemIndexInDrawItemList(tempActiveData);
    //判断是否可以添加
    if (allowToAdd(parent, tempActiveData)) {
      if (obj.to.className !== 'slot-container') {
        activeDrawItem(tempActiveData)
      }
    } else {//不能添加就删除
      list.splice(index, 1);
    }
    if (parent && parent.__id__ === 'button-group' && tempActiveData.__id__ === 'button') {
      delete tempActiveData.__props__.size;
    }
  }
}

function addDrawItem(item) {
  const clone = cloneDrawItem(item);
  fetchData(clone)
  if (activeData.value && activeData.value.__config__ && activeData.value.__config__.layout === 'containerItem') {
    if (allowToAdd(activeData.value, clone)) {
      activeData.value.__slots__.default.push(clone)
    }
  } else {
    if (allowToAdd(undefined, clone)) {
      drawItemList.value.push(clone)
      activeDrawItem(clone)
    }
  }
}


//克隆组件
function cloneDrawItem(origin) {
  //用el-col包裹
  let colItem
  if (designConf.value.wrapWithCol) {
    let {parent} = findItemIndexInDrawItemList(origin);
    parent = parent || activeData.value;
    if (parent.__config__ && parent.__config__.tag === 'el-row' && origin.__config__.tag !== 'el-col') {
      colItem = cloneDrawItem(componentMap["col"]);
    }
  }


  const clone = deepClone(origin);
  delete clone.__link__;
  createIdAndKey(clone);
  if (!clone["__props__"]) {
    clone["__props__"] = {}
  }
  //__refs__用来放需要通过变量引用的属性值。比如<el-input :disabled="disabled/> 中的 const disabled=ref(false)
  if (!clone["__refs__"]) {
    clone["__refs__"] = {}
  }
  const {__props__: props, __config__: config} = clone;

  const id = clone.__id__;
  if (id && elementPlusConfigMap[id]) {
    const {attributes, data} = elementPlusConfigMap[id];
    for (const key in attributes) {
      const attr = attributes[key];
      if (attr.ref) {
        clone.__refs__[key] = camelCase(config.itemName + "-" + key);
      } else if (attr.formRef) {
        props[key] = camelCase(config.itemName + '-' + key)
      }
      if (key === 'vModel' || props[key]) {//非空值继续
        continue
      }

      if (attr.hide) {
        continue;
      }

      if (props[key] === undefined && attr.default !== undefined) {
        props[key] = deepClone(attr.default)
      }
      if (attr.remember && designConf.value[key]) {
        props[key] = deepClone(designConf.value[key]);
      }
    }
    if (attributes.placeholder)
      props.placeholder = attributes.placeholder
    //复制像el-select的选项
    if (data) {
      const {name, source} = data;//props为true，代表是__props__里面的属性
      const static_ = {
        ref: data.static.ref,
      }
      if (data.static.ref) {
        clone.__refs__[data.name] = camelCase(config.itemName + '-' + data.name)
      }
      const dynamic = {ref: true}

      Object.assign(dynamic, data.dynamic)
      clone.__data__ = {
        name, source, dynamic, static: static_,
        [data.name]: deepClone(data.static.default)
      };

    }
  }

  //不包裹form-item
  if (config.wrapWithFormItem && !designConf.value.wrapWithFormItem) {
    delete config.showLabel;
    delete config.labelWidth;
    delete config.required;
    config.wrapWithFormItem = false;
  }
  props.placeholder !== undefined && (props.placeholder += config.label);
  if (!props.style) {
    props.style = {}
  }
  if (colItem) {
    colItem.__slots__.default.push(clone);
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
  const itemNamePrefix = config.itemName || item.__id__;
  if (itemId && elementPlusConfigMap[itemId] && elementPlusConfigMap[itemId].attributes.vModel) {
    item.__vModel__ = camelCase(`${itemNamePrefix}${idGlobal.value}`);
  }

  config.itemName = `${itemNamePrefix}${idGlobal.value}`

  if (elementPlusConfigMap[item.__id__]) {
    if (!item.__slots__) {
      item.__slots__ = {}
    }
    for (const slot of elementPlusConfigMap[item.__id__].slots) {//有一般有default插槽就是containerItem
      if (!item.__slots__[slot.name]) {
        item.__slots__[slot.name] = [];
      }
    }
  }

  return item
}

/**
 * 重新设置组件id，复制组件都会调用
 * @param item
 */
function resetDrawItemId(item) {
  let newId = ++idGlobal.value;
  let config = item.__config__;
  let oldItemName = config.itemName;
  config.itemName = `${item.__id__}${newId}`
  changeDrawItemVariableName(item, config.itemName, oldItemName);
  config.drawItemId = newId;
  item.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}` // 改变renderKey后可以实现强制更新组件
}


function allowToAdd(parent, clone, noShowMessage) {
  if (!parent || !parent.__id__) {

    const {parentTag} = elementPlusConfigMap[clone.__id__];
    if (parentTag) {
      !noShowMessage && ElMessageBox.alert(`不能添加${clone.__config__.name}（${clone.__config__.tag}）。`)
      return false;
    }
    return true;
  }
  const {childTag} = elementPlusConfigMap[parent.__id__];
  if (childTag) {
    if (childTag.indexOf(clone.__config__.tag) < 0) {
      !noShowMessage && ElMessageBox.alert(`${parent.__config__.name}（${parent.__config__.tag}）组件下只能添加${childTag}。`)
      //  ElMessageBox.alert(`不只能添加到${clone.__config__.name}（${parent.__config__.tag}）组件下。${designConf.value.wrapWithCol ? "可以关闭”设置->组件包裹col“。" : ""}`)
      return false;
    }
  }
  const {parentTag} = elementPlusConfigMap[clone.__id__];
  if (parentTag) {
    if (parentTag.indexOf(parent.__config__.tag) < 0) {
      !noShowMessage && ElMessageBox.alert(`只能添加到${clone.__config__.name}（${parentTag}）组件下。`)
      return false;
    }
  }

  //专用，删除button-group下面button的size属性
  if (parent && parent.__id__ === 'button-group' && clone.__id__ === 'button') {
    delete clone.__props__.size;
  }
  return true;
}

//endregion

//region 组件移动操作
//组件变成操作
function itemChange(evt) {
  //todo 可以用来记录操作历史


}

function itemMove(evt) {
  const {draggedContext, relatedContext} = evt;
  const {element} = draggedContext;//拖拽对象
  const {list} = relatedContext;//放到哪个位置

  let parent = findChildrenParentRoot(list);

  return allowToAdd(parent, element, true);


}

function findChildrenParentRoot(children) {
  if (children === drawItemList.value) {//检查数组地址相同
    return undefined;
  } else {
    for (const item of drawItemList.value) {
      return findChildrenParent(item, children);
    }
  }
}

/**
 * 查找children的父节点
 */
function findChildrenParent(parent, children) {

  if (parent.__slots__) {
    for (const slotName in parent.__slots__) {
      if (parent.__slots__[slotName] === children) {
        return parent;
      } else {
        for (const item of parent.__slots__[slotName]) {
          return findChildrenParent(item, children);
        }
      }
    }
  }

}

//endregion
const layoutTreeProps = {
  label(data, node) {
    const config = data.__config__
    return config.tag + ":" + config.itemName || `${config.label}: ${data.__vModel__}`
  }
}

function AssembleFormData() {
  drawingData.value = {
    fields: deepClone(drawItemList.value),
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

function emptyDrawItemList() {
  ElMessageBox.confirm('确定要清空所有组件吗？', '提示', {type: 'warning'}).then(
      () => {
        drawItemList.value = []
        activeData.value = {}
        idGlobal.value = 100;
      }
  )
}


function generateCode() {
  const script = beautifier.js(renderJs(drawItemList.value), beautifierConf.js);
  const html = beautifier.html(vue3Template(drawItemList.value), beautifierConf.html).replaceAll("template_alt", "template");
  // const css = cssStyle(makeUpCss(drawingData))
  return vueScript(html, script)

}

//region json显示操作
const jsonDrawerVisible = ref(false)
const jsonStr = ref("");

function showJson() {
  const cloneDrawItemList = deepClone(drawItemList.value)
  recursiveProcessDrawItemList(cloneDrawItemList, (item) => {
    const {__id__: id} = item;

    const {attributes} = elementPlusConfigMap[id];
    const {__props__: props} = item;
    for (const attr in props) {
      const val = props[attr];
      if (val === '' || val === undefined) {
        delete props[attr];
        continue;
      }
      const default_ = attributes[attr] && attributes[attr].default;
      if (val === default_) {
        delete props[attr];
      } else if (typeof val === 'object') {
        if (Array.isArray(val)) {
          if (isArrayEqual(val, default_)) {
            delete props[attr];
          }
        } else if (default_) {
          for (const key in val) {
            if (val[key] === default_[key]) {
              delete val[key];
            }
          }
          if (JSON.stringify(val) === '{}') {
            delete props[attr];
          }
        }
      }
    }

  })


  jsonStr.value = JSON.stringify(cloneDrawItemList, null, 2);

  jsonDrawerVisible.value = true
}

function refreshJson(data) {
  drawItemList.value = deepClone(data)
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


//region 组件树操作
const drawItemTreeVisible = ref(false)
const showTree = ref(true)//为了树能自动刷新
const drawItemTreeData = ref([]);
const drawItemTree = ref()

function openTreeDrawer() {
  drawItemTreeData.value = [];
  buildDrawItemTree(drawItemList.value, drawItemTreeData.value)
  nextTick(() => {
    drawItemTree.value.setCurrentKey(activeData.value.renderKey)
  })

}

function buildDrawItemTree(list, parent) {
  for (const item of list) {
    if (typeof item === 'string') {
      continue;
    }
    const {renderKey, __id__} = item;
    const {tag, tagIcon, itemName} = item.__config__;
    let treeItem = {__id__, renderKey, __config__: {tag, tagIcon, itemName}};
    treeItem.children = [];
    parent.push(treeItem);

    if (Array.isArray(item.__slots__.default)) {
      buildDrawItemTree(item.__slots__.default, treeItem.children)
    }

    for (const slotName in item.__slots__) {
      if (slotName === 'default') {
        continue;
      }
      if (Array.isArray(item.__slots__[slotName]) && item.__slots__[slotName].length > 0) {
        let c = [];

        buildDrawItemTree(item.__slots__[slotName], c);
        c.length > 0 && treeItem.children.push({
          slotName,
          renderKey,
          children: c
        })
      }
    }
  }

}

function drawItemTreeAllowDrag(node) {
  return !node.data.slotName;
}

function drawItemTreeAllowDrop(draggingNode, dropNode, type) {
  const {__id__: dropId, renderKey: dropRenderKey, slotName} = dropNode.data;
  if (type === 'inner') {
    if (slotName) {
      return allowToAdd(undefined, draggingNode.data, true);
    }
    if (elementPlusConfigMap[dropId] && elementPlusConfigMap[dropId].layout === 'containerItem') {
      return allowToAdd(dropNode.data, draggingNode.data, true);
    }

  }
  if (type !== 'inner') {
    const {__id__: draggingId, renderKey: draggingRenderKey} = dropNode.data;
    if (dropNode.parent) {
      return allowToAdd(dropNode.parent.data, draggingNode.data, true);
    } else {
      return allowToAdd(dropNode.data, draggingNode.data, true);
    }
  }

  return false;

}

function drawItemTreeNodeDrop(draggingNode, dropNode, type) {
  //根据数的变化，更改相对应的drawListItem
  let {
    list: draggingList,
    index: draggingIndex
  } = findItemIndexInDrawItemList(draggingNode.data);
  let {
    list: dropList,
    index: dropIndex
  } = findItemIndexInDrawItemList(dropNode.data);

  const item = draggingList.splice(draggingIndex, 1);
  if (type === 'inner') {
    dropList[dropIndex].__slots__.default.push(...item);
  } else {
    if (draggingList === dropList && dropIndex > draggingIndex) {
      dropIndex--;
    }
    if (type === 'before') {
      if (dropIndex === 0) {
        dropList.unshift(...item)
      } else {
        dropList.splice(dropIndex, 0, ...item);
      }
    } else {
      if (dropIndex === dropList.length - 1) {
        dropList.push(...item)
      } else {
        dropList.splice(dropIndex + 1, 0, ...item);
      }
    }
  }
  Array.isArray(item) && item.length > 0 && activeDrawItem(item[0])
  nextTick(() => {
    drawItemTreeData.value = [];
    buildDrawItemTree(drawItemList.value, drawItemTreeData.value);

  })
}


function removeItemFromTree(data) {
  deleteDrawItem(undefined, data);
  nextTick(() => {
    drawItemTreeData.value = [];
    buildDrawItemTree(drawItemList.value, drawItemTreeData.value);
  })
}

function activeDrawItemThroughTree(data) {
  const {list, index} = findItemIndexInDrawItemList(data);
  list && activeDrawItem(list[index])
}

//endregion
//region 表单操作
const formModelsAndRules = ref({});

//构建表单model
function buildFormModelsAndRules(list, modal, rules) {
  for (const item of list) {
    if (typeof item === 'string') {
      continue;
    }
    if (item.__id__ === 'form') {
      modal = {};
      rules = {};
      formModelsAndRules.value[item.__props__.model] = modal;
      formModelsAndRules.value[item.__props__.rules] = rules;
    } else {
      if (item.__config__.wrapWithFormItem && item.__vModel__) {
        const {__config__: config, __props__: props} = item;
        modal && (modal[item.__vModel__] = config.defaultValue);
        if (rules) {
          const r = buildRules(item);
          if (r.length > 0) {
            rules[item.__vModel__] = r;
          }
        }
      }

    }
    if (Array.isArray(item.__slots__.default)) {
      buildFormModelsAndRules(item.__slots__.default, modal, rules)
    }
  }
}

// 构建校验规则
function buildRules(item) {
  const rules = []
  const {__config__: config, __props__: props} = item;
  if (ruleTrigger[config.tag]) {
    if (config.required) {
      const type = Array.isArray(config.defaultValue) ? "array" : undefined
      let message = Array.isArray(config.defaultValue)
          ? `请至少选择一个${config.label}`
          : props.placeholder
      if (message === undefined) message = `${config.label}不能为空`
      rules.push(
          {
            required: true, type, message, trigger: ruleTrigger[config.tag]
          }
      )
    }
    if (config.regList && Array.isArray(config.regList)) {
      config.regList.forEach((reg) => {
        if (reg.pattern) {
          rules.push({
                pattern: new RegExp(reg.pattern),
                message: reg.message,
                trigger: ruleTrigger[config.tag]
              }
          )
        }
      })
    }
  }
  return rules;
}

//endregion

//region 动态数据获取
const dynamicData = ref({})

import Axios from 'axios'

function buildDynamicData() {
  recursiveProcessDrawItemList(drawItemList.value, (item) => {
    if (item.__data__) {
      const {data} = elementPlusConfigMap[item.__id__];
      if (item.__data__.source === 'dynamic' && !dynamicData.value[item.__refs__[data.name]]) {
        const {method, url, dataKey} = item.__data__.dynamic;
        Axios({method, url}).then((resp) => {
          dynamicData.value[item.__refs__[data.name]] = resp.data;
        })
        // }

      }
    }
  })


}

// endregion

//region 插槽操作
//添加子项，比如el-steps下加上el-step子项
function addSlotDrawItem({slotName, subtag}) {
  let child = componentMap[subtag]

  if (child) {
    const clone = cloneDrawItem(child);
    activeData.value.__slots__[slotName].push(clone)
  } else {
    ElNotification.info(`添加${subtag}子组件失败！`)
  }
}

//endregion
//region 配置自动保存
watch(designConf, (val) => {
  saveDesignConf(val)
}, {deep: true})
//endregion

//region 暗黑模式

import {useDark, useToggle} from '@vueuse/core'
import ruleTrigger from "@/components/generator/ruleTrigger";
import {
  processADrawItemAndSlots,
  recursiveProcessDrawItemList,
  recursiveFindItemIndexInList,
  changeDrawItemVariableName
} from "@/views/design/DrawItemProcessor";
import {isArrayEqual, isObjectEqual} from "@/components/generator/utils";

const isDark = useDark()
const toggleDark = useToggle(isDark)


//endregion
</script>


<style lang="scss" scoped>
@import '@/styles/designer.scss';

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

.bg-transparent {
  background-color: unset;
}
</style>
