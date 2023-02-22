<template>

  <el-dialog width="500px" :close-on-click-modal="false" append-to-body @open="onOpen">

    <el-form ref="formRef" :model="formData" :rules="rules" size="default" label-width="100px">

      <el-form-item label="生成类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio-button v-for="(item, index) in typeOptions" :key="index" :label="item.value"
                           :disabled="item.disabled"> {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="showFileName" label="文件名" prop="fileName">
        <el-input v-model="formData.fileName" placeholder="请输入文件名" clearable/>
      </el-form-item>

    </el-form>

    <template #footer>
      <el-button @click="close"> 取消</el-button>
      <el-button type="primary" @click="handelConfirm"> 确定</el-button>
    </template>
  </el-dialog>

</template>
<script setup>

const props = defineProps(['showFileName']);
const emit = defineEmits(['update:modelValue','confirm']);

const formData = ref({
  fileName: undefined,
  type: 'file'
})


const rules = {
  fileName: [{required: true, message: '请输入文件名', trigger: 'blur',},],
  type: [{required: true, message: '生成类型不能为空', trigger: 'change',},],
}
const typeOptions = [{label: '页面', value: 'file',}, {label: '弹窗', value: 'dialog',}];


function onOpen() {
  if (props.showFileName) {
    formData.value.fileName = `${+new Date()}.vue`
  }
}


function close(e) {
  emit('update:modelValue', false)
}

const formRef=ref();
function handelConfirm() {
  formRef.value.validate((valid) => {
    if (valid) {
      close()
      try {
        emit('confirm', {...formData.value})
      }catch(err) {
        console.info(err)
      }
    }
  })
}

</script>


<style lang="scss" scoped></style>
