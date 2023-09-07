<template>
  <div class="el-overlay bg-transparent" style="z-index: 2022;display: none;" ref="overlay" @click="close">
    <div ref="popupRef"
         style="position: fixed; background-color: white;padding: 15px;border: 1px #c6c6c8 solid; border-radius: 5px;">
      <slot></slot>
    </div>
  </div>

</template>

<script setup>

const popupRef = ref();
const overlay = ref();
const popup = (pos) => {
  const el = popupRef.value;
  overlay.value.style.display = 'block'
  nextTick(() => {
    if (pos.x + el.clientWidth > window.innerWidth) {
      el.style.left = (pos.x - el.clientWidth - 10) + 'px'
    } else {
      el.style.left = (pos.x + 10) + 'px'
    }
    if (pos.y + el.clientHeight > window.innerHeight) {
      el.style.top = Math.max(0, (pos.y - el.clientHeight - 10)) + 'px'
    } else {
      el.style.top = (pos.y + 10) + 'px'
    }
  })
}
const close = (event) => {
  if (!event || event.target === overlay.value) {
    overlay.value.style.display = 'none'
  }
}

defineExpose({
  popup, close
});
</script>

<style scoped>

</style>