<template>
  <div class="icon-dialog">
    <el-dialog
        v-bind="$attrs"
        width="980px"
        append-to-body
        @open="onOpen"
    >
      <template #title>
        选择图标
        <el-input
            v-model="key"
            :style="{ width: '260px' }"
            placeholder="请输入图标名称"
            clearable
        />
      </template>
      <el-scrollbar style="height: calc(50vh)">
        <IconListDiv :iconList="iconList" :chosen="chosen"></IconListDiv>
      </el-scrollbar>

    </el-dialog>
  </div>
</template>

<script setup lang="jsx">
import * as allIcons from '@element-plus/icons-vue'

import {ElIcon} from "element-plus";

const props = defineProps(['chosen'])
const emits = defineEmits(['select']);
const active = ref(null);
const key = ref("");
const iconList = ref("")

const originList = [];
Object.keys(allIcons).map((key) => {
  originList.push(key)
})
iconList.value = originList;

//函数式组件
const IconListDiv = (props, context) => {
  const AllIconRender = [];
  props.iconList.forEach((key) => {
    AllIconRender.push(<li className="icon-item" onClick={() => onSelect(key)}>
    <span className="demo-svg-icon">
        <ElIcon style="font-size: 20px;">{h(allIcons[key])}</ElIcon>
        <span className="icon-name">{key}</span>
    </span>
    </li>)

  })
  return <ul className="demo-icon-list">{AllIconRender}</ul>;
};

IconListDiv.props = ['iconList', 'chosen']

watch(key, (val) => {
  if (val) {
    //val = val.toLowerCase()
    iconList.value = originList.filter((name) => name.indexOf(val) > -1)
  } else {
    iconList.value = originList
  }
})


function onOpen() {
  // props.chosen="Aim"
  //iconList = originList
  active.value = props.chosen
  console.info(props.chosen)
  iconList.value.slice(iconList.value.indexOf(props.chosen), 1)
  key.value = ''
  //scrollToActive()
}


function onSelect(icon) {
  console.info(icon)
  active.value = icon
  emits('select', icon)
  emits('update:modelValue', false)
}

function scrollToActive() {
  nextTick(() => {
    const $activeItem = this.active
        ? document.getElementsByClassName('active-item')[0]
        : this.$refs.iconWrap.childNodes[0]
    $activeItem &&
    $activeItem.scrollIntoView &&
    $activeItem.scrollIntoView()
  })
}
</script>

<style lang="scss" scoped>

:deep(.el-dialog__body) {
  padding-top: 5px !important;
}
</style>
<style lang="scss">
.demo-icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns:repeat(7, 1fr);

  .icon-item {
    text-align: center;
    color: var(--el-text-color-regular);
    height: 90px;
    font-size: 13px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);

    &:hover {
      background-color: var(--el-border-color-extra-light);
      color: var(--brand-color-light)
    }
  }
}


.demo-icon-list .icon-item
.demo-icon-list .icon-item:hover .el-icon {
  color: var(--brand-color-light)
}

.demo-icon-list .icon-item .demo-svg-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer
}

.demo-icon-list .icon-item .demo-svg-icon .icon-name {
  margin-top: 8px
}
</style>
