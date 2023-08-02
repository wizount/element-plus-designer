<template>
  <div style="padding: 5px">
    <el-form :model="myFormData1" :rules="rules1">
      <el-form-item label="单行文本" prop="singleInput104" required>
        <el-input placeholder="请输入单行文本" style="width: 100%;" v-model="myFormData1.singleInput104"></el-input>
      </el-form-item>
      <el-form-item label="多行文本" prop="multipleInput105" required>
        <el-input placeholder="请输入多行文本" style="width: 100%;" v-model="myFormData1.multipleInput105">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwordInput106" required>
        <el-input placeholder="请输入密码" clearable style="width: 100%;" v-model="myFormData1.passwordInput106">
        </el-input>
      </el-form-item>
      <el-form-item label="计数器" prop="input_number107" required>
        <el-input-number placeholder="请输入计数器" :min=-Infinity :max=100 v-model="myFormData1.input_number107">
        </el-input-number>
      </el-form-item>
      <el-form-item label="下拉选择" prop="select108" required>
        <el-select placeholder="请选择下拉选择" style="width: 100%;" v-model="myFormData1.select108">
          <el-option v-for="(item, index) in select108Options" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="滑块" prop="slider109" required>
        <el-slider v-model="myFormData1.slider109"></el-slider>
      </el-form-item>
      <el-form-item label="开关" prop="switch110" required>
        <el-switch v-model="myFormData1.switch110"></el-switch>
      </el-form-item>
      <el-form-item label="评分" prop="rate111" required>
        <el-rate v-model="myFormData1.rate111"></el-rate>
      </el-form-item>
      <el-form-item label="开关" prop="switch112" required>
        <el-switch v-model="myFormData1.switch112"></el-switch>
      </el-form-item>
    </el-form>
    <el-form :model="formData2" :rules="rules2">
      <el-form-item label="单行文本" prop="singleInput114">
        <el-input placeholder="请输入单行文本" style="width: 100%;" v-model="formData2.singleInput114"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwordInput115" required>
        <el-input placeholder="请输入密码" clearable style="width: 100%;" v-model="formData2.passwordInput115">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
const myFormData1 = ref({
  singleInput104: undefined,
  multipleInput105: undefined,
  passwordInput106: undefined,
  input_number107: undefined,
  select108: "",
  slider109: undefined,
  switch110: false,
  rate111: 4,
  switch112: false,
});
const rules1 = {
  singleInput104: [{
    required: true,
    message: '单行文本不能为空',
    trigger: 'blur'
  }],
  multipleInput105: [{
    required: true,
    message: '多行文本不能为空',
    trigger: 'blur'
  }],
  passwordInput106: [{
    required: true,
    message: '密码不能为空',
    trigger: 'blur'
  }],
  input_number107: [{
    required: true,
    message: '计数器不能为空',
    trigger: 'blur'
  }],
  select108: [{
    required: true,
    message: '下拉选择不能为空',
    trigger: 'change'
  }],
  rate111: [{
    required: true,
    message: '评分不能为空',
    trigger: 'change'
  }],
};
const select108Options = ref([{
  label: '选项一',
  value: '1'
}, {
  label: '选项二',
  value: '2'
}]);
const formData2 = ref({
  singleInput114: undefined,
  passwordInput115: undefined,
});
const rules2 = {
  singleInput114: [],
  passwordInput115: [{
    required: true,
    message: '密码不能为空',
    trigger: 'blur'
  }],
};

</script>