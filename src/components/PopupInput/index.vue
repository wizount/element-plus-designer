<template>
  <div class="el-overlay bg-transparent" style="z-index: 2022;display: none;" ref="overlay" @click="close">
    <div ref="popupRef"
         style="position: fixed; background-color: white;padding: 15px;border: 1px #c6c6c8 solid; border-radius: 5px;">
      <slot></slot>

      <div style="text-align: right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
  </div>

</template>

<script setup>

const popupRef = ref();
const overlay = ref();
const messageInstance = {
  value: null,
  resolve: null,
  reject: null
}
const popup = (pos, value) => {
  messageInstance.value = value;
  return new Promise((resolve, reject) => {
    messageInstance.resolve = resolve;
    messageInstance.reject = reject;
    const el = popupRef.value;
    overlay.value.style.display = 'block'
    nextTick(() => {
      let left
      if (pos.x + el.clientWidth > window.innerWidth) {
        left = (pos.x - el.clientWidth) + 'px'
      } else {
        left = (pos.x) + 'px'
      }
      if (left < 0) {
        left = 0;
      }
      el.style.left = left;
      let top
      if (pos.y + el.clientHeight > window.innerHeight) {
        top = (pos.y - el.clientHeight) + 'px'
      } else {
        top = (pos.y) + 'px'
      }
      if (top < 0) {
        top = 0;
      }
      el.style.top = top;
    })
  })

}

function confirm() {
  overlay.value.style.display = 'none';
  if (messageInstance.value && messageInstance.resolve) {
    messageInstance.resolve(messageInstance.value);
  }
}

const cancel = () => {
  overlay.value.style.display = 'none';
  if (messageInstance.value && messageInstance.reject) {
    messageInstance.reject("cancel");
  }
}

const close = (event) => {
  if (!event || event.target === overlay.value) {
    overlay.value.style.display = 'none'
  }
}
defineExpose({
  popup
});
</script>

<style scoped>

</style>