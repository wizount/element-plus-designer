<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs" style="padding-left: 15px">
      <el-tab-pane label="组件属性" name="field"/>
      <el-tab-pane label="插槽" name="slots" v-if="showSlots"/>
      <el-tab-pane label="样式" name="style"/>
      <el-tab-pane label="正则表达式" name="reg" v-if="Array.isArray(curItemConfig.regList)"/>
    </el-tabs>
    <el-scrollbar class="right-scrollbar">
      <!-- 组件属性 -->
      <div style="padding: 15px">
        <el-form v-show="currentTab === 'field' &&showField" class="narrower-margin-bottom">
          <el-form-item>
            <template #label>组件类型
              <el-link type="primary" class="document-link" :underline="false" target="_blank" :href="curDocLink"
                       title="查看组件文档">
                <el-icon>
                  <Link/>
                </el-icon>
              </el-link>
              <el-link type="info" :underline="false" class="document-link" title="切换到父组件"
                       @click="activeParentDrawItem">
                <el-icon style="transform:rotate(180deg);">
                  <Download/>
                </el-icon>
              </el-link>

              <div v-for="slot in curComSlots" v-if="showSlots">
                <template v-if="slot.subtags&&slot.subtags.length>0">
                  <div v-if="slot.subtags.length===1">
                    <el-tooltip :content="`添加${slot.subtags[0]}组件`" placement="top">
                      <el-button link type="primary" icon="Plus"
                                 @click="addSlotDrawItem({slotName:slot.name,subtag:slot.subtags[0]})"/>
                    </el-tooltip>
                  </div>
                  <div v-else>
                    <el-dropdown @command="addSlotDrawItem" class="m-1">
                      <el-button link type="primary" content="添加组件" icon="Plus"/>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="subtag in slot.subtags" :command="{slotName:slot.name,subtag}">
                            添加{{ subtag }}组件
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>

                </template>

              </div>
            </template>
          </el-form-item>
          <el-form-item label="组件布局" v-if="curComConfig.layouts&&curComConfig.layouts.length>1">
            <el-radio-group v-model="curItemConfig.layout">
              <el-radio-button v-for="v in curComConfig.layouts" :label="v">{{ v }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组件名">
            <el-input v-model="curItemConfig.itemName" placeholder="请输入组件名"/>
          </el-form-item>
          <el-form-item v-if="activeData.__vModel__ !== undefined" label="字段名" title="字段名，用于v-model">
            <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"/>
          </el-form-item>

          <el-form-item
              v-if="curItemConfig.showLabel !== undefined &&curItemConfig.labelWidth !== undefined"
              label="显示标签">
            <el-switch v-model="curItemConfig.showLabel"/>
          </el-form-item>
          <el-form-item v-if="curItemConfig.showLabel" label="标题">
            <el-input v-model="curItemConfig.label" placeholder="请输入标题"/>
          </el-form-item>
          <el-form-item v-if="curItemConfig.showLabel" label="标签宽度">
            <el-input v-model.number="curItemConfig.labelWidth" type="number" placeholder="请输入标签宽度"/>
          </el-form-item>
          <el-form-item v-if="curItemProps.placeholder !== undefined" label="占位提示">
            <el-input v-model="curItemProps.placeholder" placeholder="请输入占位提示"/>
          </el-form-item>
          <el-form-item v-if="activeData.__vModel__ !== undefined">
            <template #label>
              默认值
              <el-tooltip content="请在控件上输入" placement="top">
                <el-button text circle icon="InfoFilled" style="float:right"></el-button>
              </el-tooltip>
            </template>
            <div style="display: flex;width: 100%">
              <div style="flex: 1"> {{ curItemConfig.defaultValue }}</div>
              <el-button text icon="CircleClose" type="danger" title="清空"
                         @click="curItemConfig.defaultValue=undefined"></el-button>
            </div>

          </el-form-item>
          <el-form-item v-if="curItemConfig.tag==='el-dialog'||curItemConfig.tag==='el-drawer'" label="显示"
                        title="显示dialog或者drawer">
            <el-button
                @click="curItemConfig.defaultValue=!curItemConfig.defaultValue">显示{{ curItemConfig.tag }}
            </el-button>

          </el-form-item>
          <el-form-item v-if="curItemConfig.optionType !== undefined" label="选项样式">
            <el-radio-group v-model="curItemConfig.optionType">
              <el-radio-button label="default">默认</el-radio-button>
              <el-radio-button label="button">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="curItemConfig.iconName !== undefined" label="图标">
            <icon-chooser v-model="curItemConfig.iconName"></icon-chooser>
          </el-form-item>
          <el-form-item v-if="curItemConfig.required !== undefined" label="必填">
            <el-switch v-model="curItemConfig.required"></el-switch>
          </el-form-item>

          <el-form-item v-if="activeData.__data__" :label="curComConfig.data.label">

            <el-radio-group v-model="activeData.__data__.source" class="mb-2">
              <el-radio-button label="static">静态数据</el-radio-button>
              <el-radio-button label="dynamic">动态数据</el-radio-button>
            </el-radio-group>
            <el-input v-model="activeData.__refs__[curComConfig.data.name]"
                      v-if="activeData.__data__[activeData.__data__.source].ref">
              <template #prepend>REF</template>
            </el-input>
            <div v-show="activeData.__data__.source==='static'">

              <config-value-input :attr-config="curComConfig.data.static.type" :treeProps="curItemProps.props"
                                  v-model="activeData.__data__[curComConfig.data.name]"></config-value-input>
            </div>
            <div  v-show="activeData.__data__.source==='dynamic'">
              <el-form-item label="网址">
                <el-input v-model="activeData.__data__.dynamic.url" placeholder="网址">
                </el-input>
              </el-form-item>
              <el-form-item label="方法">
                <el-select v-model="activeData.__data__.dynamic.method" placeholder="方法">
                  <el-option label="get" value="get"></el-option>
                  <el-option label="post" value="post"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据位置">
                <el-input v-model="activeData.__data__.dynamic.dataKey" placeholder="数据位置">
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <attributes-render :attribute-config="curComAttrs"
                             :active-data="activeData"></attributes-render>

        </el-form>

        <el-form v-if="currentTab==='reg'&&Array.isArray(curItemConfig.regList)">
          <el-divider>正则校验</el-divider>
          <div class="draggable-item" v-for="(item, index) in curItemConfig.regList" :key="index">
            <div class="flex-grow-1 d-flex">
              <div>
                <el-form-item label="表达式">
                  <el-autocomplete v-model="item.pattern" placeholder="请输入正则表达式"
                                   :fetch-suggestions="ac.querySearch"
                                   clearable @change="regChange">
                    <template #default="{ item }">
                      <span>{{ item.text }}</span>
                      <div>{{ item.value }}</div>
                    </template>
                  </el-autocomplete>
                </el-form-item>
                <el-form-item label="错误提示">
                  <el-input v-model="item.message" placeholder="请输入错误提示" clearable/>
                </el-form-item>
              </div>
            </div>
            <div class="remove-btn" @click="curItemConfig.regList.splice(index, 1)">
              <el-icon>
                <Remove/>
              </el-icon>
            </div>
          </div>


          <div style="margin-left: 20px">
            <el-button @click="addReg" size="small"> 添加规则</el-button>
          </div>
        </el-form>

        <div v-if="currentTab==='style'">
          <style-editor v-model="curItemProps.style"></style-editor>
        </div>
        <div v-if="showSlots&&currentTab==='slots'" class="slot-tab-pane">
          <div v-for="slot in curComSlots">
            <el-card shadow="hover">
              <template #header>
                <div class="d-flex">
                  <div class="flex-grow-1">{{ slot.name }}
                    <el-tooltip :content="slot.title">
                      <el-button icon="InfoFilled" text size="small"/>
                    </el-tooltip>
                  </div>
                  <template v-if="slot.subtags&&slot.subtags.length>0">
                    <div v-if="slot.subtags.length===1">
                      <el-tooltip :content="`添加${slot.subtags[0]}组件`" placement="top">
                        <el-button link type="primary" icon="Plus"
                                   @click="addSlotDrawItem({slotName:slot.name,subtag:slot.subtags[0]})"/>
                      </el-tooltip>
                    </div>
                    <div v-else>
                      <el-dropdown @command="addSlotDrawItem">
                        <el-button link type="primary" :content="`添加组件`" icon="Plus"/>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item v-for="subtag in slot.subtags" :command="{slotName:slot.name,subtag}">
                              添加{{ subtag }}组件
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>

                  </template>
                </div>
              </template>
              <template v-if="Array.isArray(curItemSlots[slot.name])">
                <draggable :list="curItemSlots[slot.name]" :animation="340" group="componentsGroup" itemKey="renderKey"
                           handle=".drag-icon" style="min-height: 30px" class="slot-container">
                  <template #item="{element,index}">
                    <div class="draggable-item" :class="{chosen:chosenSlotIndex===(slot.name+index)}">
                      <div class="flex-grow-1 d-flex" @click="chooseSlotDrawItem(element,slot.name,index)">
                        <div class="drag-icon">
                          <el-icon>
                            <Operation/>
                          </el-icon>
                        </div>
                        <div v-if="typeof element==='string'">
                          <el-input v-model="curItemSlots[slot.name][index]"></el-input>
                        </div>
                        <div v-else-if="element.__id__==='plainText'">
                          <el-input v-model="element.__slots__.default"></el-input>
                        </div>
                        <div class="text-item" v-else>
                          {{ element.__config__.tag + "-" + element.__config__.drawItemId }}
                        </div>
                      </div>
                      <div @click="deleteSlotDrawItem(slot.name,index)">
                        <el-icon class="remove-btn">
                          <Remove/>
                        </el-icon>
                      </div>
                    </div>
                  </template>
                </draggable>
              </template>
              <template v-else>
                <div v-if="typeof curItemSlots[slot.name]==='string'">
                  <el-input v-model="curItemSlots[slot.name]"></el-input>
                </div>
              </template>

            </el-card>
            <el-collapse-transition>
              <el-form class="narrower-margin-bottom" v-if="chosenSlotDrawItem&&chosenSlotIndex.indexOf(slot.name)===0">
                <attributes-render
                    :active-data="chosenSlotDrawItem"
                    :attribute-config="chosenSlotDrawItemAttributes"></attributes-render>
              </el-form>
            </el-collapse-transition>
          </div>
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
import AttributesRender from "@/views/design/AttributesRender.vue";
import elementPlusConfigMap from "@/element-plus-config";
import StyleEditor from "@/components/editors/StyleEditor.vue";
import {ElCollapseTransition} from 'element-plus'

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

const emits = defineEmits(['addSlotDrawItem', "activeParentDrawItem"])

const curItemConfig = computed(() => {
  return props.activeData.__config__ || {}
})
//当前组件的属性值
const curItemProps = computed(() => {
  return props.activeData.__props__ || {}
})

//当前组件信息
const curComConfig = computed(() => {
  return elementPlusConfigMap[props.activeData.__id__] || {}
})
//当前组件的属性配置
const curComAttrs = computed(() => {
  return curComConfig.value.attributes
})

const curComSlots = computed(() => {
  return curComConfig.value.slots;
})


const curDocLink = computed(() => {
  return curComConfig.value.document ||
      'https://element-plus.gitee.io/zh-CN/guide/installation.html'
})
const curItemSlots = computed(() => {
  return props.activeData.__slots__ || {}
})

const showSlots = computed(() => {
  console.info(curItemConfig.value)
  return curItemConfig.value.layout !== 'fixedItem' && curComConfig.value.slots && curComConfig.value.slots.length > 0
})
//当选中组件变化，也就是renderKey变化，重新选中的插槽数据
watch(() => props.activeData.renderKey, (val) => {
  chosenSlotDrawItem.value = undefined;
  chosenSlotIndex.value = ""
})
//监听，并随时保存
watch(curItemProps, (newVal) => {
  curComAttrs.value && Object.keys(curComAttrs.value).forEach((k) => {
    if (curComAttrs.value[k].remember) {
      props.designConf[k] = curItemProps.value[k];
    }
  })
  saveDesignConf(props.designConf)
}, {deep: true})

//region 对部分的tag进行修改
watch(() => curItemProps.value.multiple, (val) => {
  if (['el-select', 'el-select-v2', 'el-tree-select'].indexOf(curItemConfig.value.tag) >= 0) {
    if (val) {
      if (!Array.isArray(curItemConfig.value.defaultValue)) {
        curItemConfig.value.defaultValue = []
      }
    } else {
      if (typeof curItemConfig.value.defaultValue !== 'string') {
        curItemConfig.value.defaultValue = ''
      }
    }

  }
})
watch(() => curItemProps.value['is-range'], (val) => {
  props.activeData.renderKey = `${curItemConfig.value.drawItemId}${Math.floor(Math.random() * 10000)}`
  if (curItemConfig.value.tag === 'el-time-picker') {
    curItemConfig.value.defaultValue = []
  }
})
watch(() => curItemProps.value.range, (val) => {
  if (curItemConfig.value.tag === 'el-slider') {
    if (val) {
      if (!Array.isArray(curItemConfig.value.defaultValue)) {
        curItemConfig.value.defaultValue = [25, 50]
      }
    } else {
      if (typeof curItemConfig.value.defaultValue !== 'number') {
        curItemConfig.value.defaultValue = 50
      }
    }
  }
})
//endregion
watch(() => curItemConfig.value.label, (newVal, oldVal) => {
  if (curItemProps.value && curComAttrs.value && curItemProps.value.placeholder === (curComAttrs.value.placeholder + oldVal)) {
    curItemProps.value.placeholder = curComAttrs.value.placeholder + newVal
  }
})


watch(() => curItemConfig.value.itemName, (newVal, oldVal) => {
  changeDrawItemVariableName(props.activeData, newVal, oldVal);
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
watch(() => curItemProps.value.type, (newVal) => {
  if (newVal && curItemConfig.value.tag === 'el-date-picker') {
    if (newVal === 'dates' || newVal.indexOf('range') > 0) {
      curItemConfig.value.defaultValue = []
    } else {
      curItemConfig.value.defaultValue = null
    }
    curItemProps.value['value-format'] = dateTimeFormatList[newVal]
    curItemProps.value['format'] = dateTimeFormatList[newVal]
  }

})
//endregion

//region 正则表达式
//AutoComplete 回调
import {AutoCompleteCallback} from "@/utils/element-plus-utils";
import regList from '@/utils/regList.json'
import {changeDrawItemVariableName} from "@/views/design/DrawItemProcessor";
import ConfigValueInput from "@/views/design/ConfigValueInput";
import {camelCase, deepClone} from "@/utils";
import IconChooser from "@/components/editors/IconChooser.vue";

const ac = new AutoCompleteCallback(regList)


function addReg() {
  curItemConfig.value.regList.push({
    pattern: '',
    message: '',
  })
}

//fixme 当更新时，要填入正则表达式的message
function regChange(e) {
  console.info(e)
}

//endregion

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
  curItemConfig.value.defaultValue = [] // 避免删除时报错
  const {parent} = node
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
}

function addNode(data) {
  currentNode.value.push(data)
}


//region 插槽操作

const chosenSlotDrawItem = ref(undefined)
const chosenSlotDrawItemAttributes = computed(() => {
  return chosenSlotDrawItem.value && elementPlusConfigMap[chosenSlotDrawItem.value.__id__] && elementPlusConfigMap[chosenSlotDrawItem.value.__id__].attributes || {}
})

function addSlotDrawItem(slotNameAndSubtag) {
  emits('addSlotDrawItem', slotNameAndSubtag)
}

const chosenSlotIndex = ref("")

function chooseSlotDrawItem(element, slotName, index) {
  chosenSlotDrawItem.value = element;
  chosenSlotIndex.value = slotName + index;
}

function deleteSlotDrawItem(slotName, index) {
  curItemSlots.value[slotName].splice(index, 1);
  nextTick(() => {
    chosenSlotDrawItem.value = undefined
    chosenSlotIndex.value = "";
  })
}

//根据当前选中的组件，选中他的父组件
function activeParentDrawItem() {
  emits('activeParentDrawItem')
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

@import '@/components/editors/editor.scss';


.slot-tab-pane .el-card {
  margin-bottom: 5px;
}


.narrower-margin-bottom {
  :deep(.el-form-item) {
    margin-bottom: 8px !important;
  }
}
</style>
