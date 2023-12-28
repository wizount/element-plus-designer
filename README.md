# Element Plus designer
Thanks to JakHuang [form generator](https://github.com/JakHuang/form-generator) for providing the inspiration.
Element Plus designer provides WYSIWYG design of most element plus components, including form design. 
[GitHub demo url](https://wizount.github.io/element-plus-designer/)

<img src="https://gitee.com/wizount/element-plus-designer/raw/master/images/all.png">

## Functional Overview

- Supports online design of more than 99% of element plus components
- Online design of native html components
- Rich and fast component property changes
- style modification
- Component slots can be inserted online
- Form regular expression creation
- Export and copy vue3 code (supports optional and combined types)
- Export component background JSON code
- Code preview


## Usage
### Use in your project

```sh 
npm install element-plus-designer
```
#### Copy preview.html to your project root directory
#### Enter the following code in main.js
```
import  ElementPlusDesigner from 'element-plus-designer'
import 'element-plus-designer/dist/style.css'
app.use(ElementPlusDesigner)
```
#### If you need to design, please enter the following code in *.vue
```
<script setup>
import {ref} from "vue";
const drawingList=ref([])
</script>
<template>
    <element-plus-designer v-model="drawingList"></element-plus-designer>
</template>
<style>
body{
  margin: 0px;
}
</style>
```
#### Only use render, please enter the following code in *.vue
```
<script setup>
import {ref,watch} from "vue";
import data from "./data.json";
const renderJson = ref(data);
const formModel = ref(data);
watch(formModel, (val) => {
  console.info(val);
}, {deep: true})
</script>
<template>
  <div>
    <element-plus-render :draw-item-list="renderJson" v-model="formModel"></element-plus-render>
  </div>
</template>
```
## Project development
### install
```sh
npm install
```

### develop

```sh
npm run dev
```
然后访问：http://localhost:5173/
### publish

```sh
npm run build
```

## 技术栈
- Vue3 
- Element Plus
- Vite5
- Vuedraggable（(modified and used directly in the project）

## Next steps
- Supports the remaining 1% components
- Support event editing


Contact information: WeChat: glqqyx, QQ: 2537660666 email: 2537660666@qq.com