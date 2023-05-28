<template>
  <div>
    <router-view />
    <div style="position: absolute; bottom: 10px;right: 10px;color: gray">Element Plus version {{version}}</div>
  </div>
</template>

<script>
import ElementPlus from 'element-plus'
export default {
  data() {
    return {
      version: ElementPlus.version
    }
  },
  mounted() {
    // 取消开始的loading动画
   // const preLoader = document.querySelector('#pre-loader')
    //preLoader.style.display = 'none'

    // fix: firefox 下 拖拽 会新打卡一个选项卡
    // https://github.com/JakHuang/form-generator/issues/15
    // document.body.ondrop = (event) => {
    //   event.preventDefault()
    //   event.stopPropagation()
    // }
  },
}
</script>
