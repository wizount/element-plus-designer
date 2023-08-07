<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs" style="padding-left: 15px">
      <el-tab-pane label="组件属性" name="field"/>
      <el-tab-pane label="样式" name="style"/>
      <el-tab-pane label="子组件" name="childTag" v-if="config.childTag"/>
      <el-tab-pane label="正则表达式" name="reg" v-if="Array.isArray(config.regList)"/>
    </el-tabs>
    <el-scrollbar class="right-scrollbar">
      <!-- 组件属性 -->
      <div style="padding: 15px">
        <el-form v-show="currentTab === 'field' &&showField">
          <el-form-item>
            <template #label>组件类型
              <el-link type="primary" class="document-link" :underline="false" target="_blank" :href="documentLink"
                       title="查看组件文档">
                <el-icon>
                  <Link/>
                </el-icon>
              </el-link>
              <el-link type="info" :underline="false" class="document-link" title="切换到父组件"
                       @click="activeParentComponent">
                <el-icon style="transform:rotate(180deg);">
                  <Download/>
                </el-icon>
              </el-link>
            </template>
            <!--            <div style="display: flex;width: 100%">-->
            <!--              <el-select v-model="activeData.__id__" placeholder="请选择组件类型"-->
            <!--                         @change="tagChange" v-if="config.changeTag" style="flex: 1">-->
            <!--                <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">-->
            <!--                  <el-option v-for="item in group.options" :key="item.__config__.name" :label="item.__config__.name"-->
            <!--                             :value="item.__id__">-->
            <!--                    <svg-icon class="node-icon" :icon-class="item.__config__.tagIcon"/>-->
            <!--                    <span> {{ item.__config__.name }}</span></el-option>-->
            <!--                </el-option-group>-->
            <!--              </el-select>-->
            <!--              <div v-else style="flex: 1">{{ config.name }}</div>-->
            <!--              <el-button text icon="ArrowUp" type="primary" title="切换到父组件"-->
            <!--                         @click="activeParentComponent"></el-button>-->
            <!--            </div>-->
          </el-form-item>
          <el-form-item label="组件名">
            <el-input v-model="config.componentName" placeholder="请输入组件名"/>
          </el-form-item>

          <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名" title="字段名，用于v-model">
            <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"/>
          </el-form-item>

          <el-form-item
              v-if="config.showLabel !== undefined &&config.labelWidth !== undefined"
              label="显示标签">
            <el-switch v-model="config.showLabel"/>
          </el-form-item>
          <el-form-item v-if="config.showLabel" label="标题">
            <el-input v-model="config.label" placeholder="请输入标题" @input="changeRenderKey"/>
          </el-form-item>
          <el-form-item v-if="config.showLabel" label="标签宽度">
            <el-input v-model.number="config.labelWidth" type="number" placeholder="请输入标签宽度"/>
          </el-form-item>
          <el-form-item v-if="activeProps.placeholder !== undefined" label="占位提示">
            <el-input v-model="activeProps.placeholder" placeholder="请输入占位提示" @input="changeRenderKey"/>
          </el-form-item>
          <el-form-item v-if="activeData.__vModel__ !== undefined">
            <template #label>
              默认值
              <el-tooltip content="请在控件上输入" placement="top">
                <el-button text circle icon="InfoFilled" style="float:right"></el-button>
              </el-tooltip>
            </template>
            <div style="display: flex;width: 100%">
              <div style="flex: 1"> {{ config.defaultValue }}</div>
              <el-button text icon="CircleClose" type="danger" title="清空"
                         @click="config.defaultValue=undefined"></el-button>
            </div>

          </el-form-item>

          <el-form-item v-if="config.optionType !== undefined" label="选项样式">
            <el-radio-group v-model="config.optionType">
              <el-radio-button label="default"> 默认</el-radio-button>
              <el-radio-button label="button"> 按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="config.required !== undefined" label="必填">
            <el-switch v-model="config.required"></el-switch>
          </el-form-item>
          <item-config :property-config="activeProperty" :props-value="activeProps"
                       :slots-value="activeData.__slot__"></item-config>

        </el-form>

        <el-form v-if="currentTab==='reg'&&Array.isArray(config.regList)">
          <el-divider>正则校验</el-divider>
          <div v-for="(item, index) in config.regList" :key="index" class="reg-item">
            <span class="close-btn" @click="config.regList.splice(index, 1)">
              <el-icon><close/></el-icon>
            </span>
            <el-form-item label="表达式">
              <el-autocomplete v-model="item.pattern" placeholder="请输入正则表达式" :fetch-suggestions="ac.querySearch"
                               clearable style="width:100%" @change="regChange">
                <template #default="{ item }">
                  <span>{{ item.text }}</span>
                  <div>{{ item.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="错误提示" style="margin-bottom: 0">
              <el-input v-model="item.message" placeholder="请输入错误提示" clearable/>
            </el-form-item>
          </div>
          <div style="margin-left: 20px">
            <el-button @click="addReg" size="small"> 添加规则</el-button>
          </div>
        </el-form>
        <el-form v-if="currentTab==='childTag'&&config.childTag"><!--拥有固定的子项-->
          <draggable v-model="activeData.__children__" :animation="340" group="childItem" itemKey="renderKey"
                     handle=".option-drag">
            <template #item="{element,index}">
              <div class="child-item" @click="showChildItem(element)"
                   :class="{'active-child-item':activeChildItem&&element.renderKey==activeChildItem.renderKey}">
                <div class="option-drag">
                  <el-icon>
                    <Operation/>
                  </el-icon>
                </div>
                <div class="child-item-content">{{ element.__config__.tag + element.__config__.drawItemId }}</div>
                <div @click="activeData.__children__.splice(index, 1)">
                  <el-icon class="child-item-delete">
                    <Remove/>
                  </el-icon>
                </div>
              </div>
            </template>
          </draggable>
          <div style="margin: 5px">
            <el-button text type="primary" @click="addChildItem()"> 添加子组件
            </el-button>
          </div>
          <item-config :property-config="activeChildProperty" :props-value="childActiveProps"
                       :slots-value="childActiveSlots"></item-config>
        </el-form>

        <div v-if="currentTab==='style'">
          <style-editor v-model="activeProps.style"></style-editor>
        </div>
      </div>
      <div style="position: absolute; bottom: 10px;right: 10px;color: gray">Element Plus version {{ version }}</div>
    </el-scrollbar>
    <tree-node-dialog v-model="dialogVisible" title="添加选项" @commit="addNode"/>

  </div>
</template>

<script setup lang="jsx">
import ElementPlus from "element-plus";

const version = ElementPlus.version;
import TreeNodeDialog from '@/views/design/TreeNodeDialog'
import Draggable from '@/vuedraggable/vuedraggable';
import {saveDesignConf} from '@/utils/db'


import propertyConfigList from "@/components/generator/settingConfig"
import ConfigFormItem from "@/views/design/ConfigFormItem";
import ArrayEditor from "@/components/ArrayEditor";
import StyleEditor from "@/components/StyleEditor";


const currentTab = ref('field')
const currentNode = ref(null)
const dialogVisible = ref(false)


const props = defineProps({
      showField: Boolean,
      activeData: {
        type: Object,
        required: true
      },
      designConf: {
        type: Object,
        required: true
      }
    }
)

const emits = defineEmits(['tag-change', 'addChildItem', "activeParentComponent"])
const config = computed(() => {
  return props.activeData.__config__ || {}
})
//当前item的属性
const activeProps = computed(() => {
  return props.activeData.__props__ || {}
})
//当前item对应的系统属性
const activeProperty = computed(() => {
  currentTab.value = 'field';//重置当前的tab
  return propertyConfigList[props.activeData.__id__]
})
const documentLink = computed(() => {
  return config.value.document ||
      'https://element-plus.gitee.io/zh-CN/guide/installation.html'
})


//监听，并随时保存
watch(activeProps, (newVal) => {
  activeProperty.value && Object.keys(activeProperty.value).forEach((k) => {
    if (activeProperty.value[k].remember) {
      props.designConf[k] = activeProps.value[k];
    }
  })
  saveDesignConf(props.designConf)
}, {deep: true})

//region 对部分的tag进行修改
watch(() => activeProps.value.multiple, (val) => {
  if (config.value.tag === 'el-select' || config.value.tag === 'el-select-v2') {
    if (val) {
      if (!Array.isArray(config.value.defaultValue)) {
        config.value.defaultValue = []
      }
    } else {
      if (typeof config.value.defaultValue !== 'string') {
        config.value.defaultValue = ''
      }
    }

  }
})
watch(() => activeProps.value['is-range'], (val) => {
  props.activeData.renderKey = `${config.value.drawItemId}${Math.floor(Math.random() * 10000)}`
})
watch(() => activeProps.value.range, (val) => {
  if (config.value.tag === 'el-slider') {
    if (val) {
      if (!Array.isArray(config.value.defaultValue)) {
        config.value.defaultValue = [25, 50]
      }
    } else {
      if (typeof config.value.defaultValue !== 'number') {
        config.value.defaultValue = 50
      }
    }
  }
})
//endregion
watch(() => config.value.label, (newVal, oldVal) => {
  if (activeProps.value && activeProperty.value && activeProps.value.placeholder === (activeProperty.value.placeholder + oldVal)) {
    activeProps.value.placeholder = activeProperty.value.placeholder + newVal
  }
})


//region 对时间和日期组件进行格式操作
//监听date-picker-type格式

const dateTimeFormatList = {
  date: 'YYYY-MM-DD',
  dates: 'YYYY-MM-DD',
  week: 'YYYY 第w周',
  month: 'YYYY-MM',
  year: 'YYYY',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  monthrange: 'YYYY-MM',
  datetimerange: 'YYYY-MM-DD HH:mm:ss',
}
watch(() => activeProps.value.type, (newVal) => {
  if (newVal && config.value.tag === 'el-date-picker') {
    if (newVal === 'dates' || newVal.indexOf('range') > 0) {
      config.value.defaultValue = []
    } else {
      config.value.defaultValue = null
    }
    activeProps.value['value-format'] = dateTimeFormatList[newVal]
    activeProps.value['format'] = dateTimeFormatList[newVal]
  }

})
//endregion

//region 正则表达式
//AutoComplete 回调
import {AutoCompleteCallback} from "@/utils/element-plus-utils";
import regList from '@/utils/regList.json'

const ac = new AutoCompleteCallback(regList)


function addReg() {
  config.value.regList.push({
    pattern: '',
    message: '',
  })
}

//fixme 当更新时，要填入正则表达式的message
function regChange(e) {
  console.info(e)
}

//endregion

import ObjectArrayEditor from "@/components/ObjectArrayEditor";
import ObjectEditor from "@/components/ObjectEditor";
import ItemConfig from "@/views/design/ItemConfig.vue";


function addTreeItem() {
//  ++idGlobal
  dialogVisible.value = true
  currentNode.value = props.activeData.options
}

//fixme
function renderContent(h, {node, data, store}) {
  return (
      <div class="custom-tree-node">
        <span>{node.label}</span>
        <span class="node-operation">
            <i
                on-click={() => append(data)}
                class="el-icon-plus"
                title="添加"
            ></i>
            <i
                on-click={() => remove(node, data)}
                class="el-icon-delete"
                title="删除"
            ></i>
          </span>
      </div>
  )
}

function append(data) {
  if (!data.children) {
    data['children'] = []
  }
  dialogVisible.value = true
  currentNode.value = data.children
}

function remove(node, data) {
  config.value.defaultValue = [] // 避免删除时报错
  const {parent} = node
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
}

function addNode(data) {
  currentNode.value.push(data)
}


function tagChange(id) {
  let target = inputComponents.find(
      (item) => item.__id__ === id
  )
  if (!target)
    target = selectComponents.find(
        (item) => item.__id__ === id
    )
  emits('tag-change', target)
}


// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

function changeRenderKey() {
  if (needRerenderList.includes(config.value.tag)) {
    props.activeData.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}`
  }
}

//region 子组件操作
const activeChildItem = ref(undefined)
const activeChildProperty = computed(() => {
  return activeChildItem.value && propertyConfigList[activeChildItem.value.__id__] || {}
})
const childActiveProps = computed(() => {
  return activeChildItem.value && activeChildItem.value.__props__ || {}
})

const childActiveSlots = computed(() => {
  return activeChildItem.value && activeChildItem.value.__slot__ || {}
})

function showChildItem(child) {
  activeChildItem.value = child;
}

function addChildItem() {
  emits('addChildItem', props.activeData.__config__.childTag)
}

//根据当前选中的组件，选中他的父组件
function activeParentComponent() {
  emits('activeParentComponent')
}


//endregion
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0px !important;
}


.right-board {
  width: 350px;
  //position: absolute;

  .right-scrollbar {
    position: relative;
    height: calc(100vh - 40px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

}


.time-range {
  .el-date-editor {
    width: 227px;
  }

  :deep(.el-icon-time) {
    display: none;
  }
}

.document-link {
  width: 20px;
  height: 20px;
  font-size: 18px;
  margin: 6px 0px 4px 10px;
}

.node-label {
  font-size: 14px;
}

.node-icon {
  color: #bebfc3;
}

.reg-item {
  padding: 12px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;

  .close-btn {
    position: absolute;
    right: -6px;
    top: -6px;
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background: rgba(210, 23, 23, 0.5)
    }
  }

  & + .reg-item {
    margin-top: 18px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.child-item {
  display: flex;
  padding: 10px;

  .option-drag {
    cursor: move;
  }

  .child-item-content {
    flex: 1;
  }

  .child-item-delete {
    color: red;
  }

}

.active-child-item {
  border: 1px dashed lightblue;
}
</style>
