# Element Plus designer 
感谢 JakHuang [form generator](https://github.com/JakHuang/form-generator) 提供的灵感。  
Element Plus设计器提供大部分element plus组件所见及所得在线设计，当然也包含表单设计。  
[GitHub演示地址](https://wizount.github.io/element-plus-designer/)

<img src="https://gitee.com/wizount/element-plus-designer/raw/master/images/all.png">

## 功能概述

- 支持98%以上的element plus组件在线设计
- 丰富快速组件属性更改
- style样式修改
- 组件插槽在线可插入
- 表单正则表达式创建
- 导出和复制vue3代码(支持选项式和组合式)
- 导出组件后台JSON代码
- 代码预览


## 使用
### 直接引用

```sh 
npm install element-plus-designer

main.js
import  ElementPlusDesigner from 'element-plus-designer'
import 'element-plus-designer/dist/style.css'
app.use(ElementPlusDesigner)

vue
<script setup>
import {ref} from "vue";
const drawingList=ref([])
</script>
<template>
  <div>
    <element-plus-designer v-model="drawingList"></element-plus-designer>
  </div>
</template>

仅使用render
<script setup>
import {ref,watch} from "vue";
import data from "./data.json";
const renderJson = ref(data)
const formModel = ref(data)

watch(formModel, (val) => {
  console.info(val)
}, {deep: true})
</script>

<template>
  <div>
    <element-plus-render :draw-item-list="renderJson" v-model="formModel"></element-plus-render>
  </div>
</template>

```
## 工程开发安装
### 安装
```sh
npm install
```

### 开发

```sh
npm run dev
```
然后访问：http://localhost:5173/
### 发布

```sh
npm run build
```

## 技术栈
- Vue3 
- Element Plus
- Vite4
- Vuedraggable（有进行修改，并在项目直接使用）

## 下一步计划
- 支持剩下2%组件
- 支持事件


联系方式：微信：glqqyx, QQ: 2537660666 email: 2537660666@qq.com