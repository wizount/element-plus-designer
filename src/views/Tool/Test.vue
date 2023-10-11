<template>
  <div style="padding: 5px">
    <el-form :model="form101Model" :rules="form101Rules">
      <el-form-item label="计数器" prop="inputNumber104" required>
        <el-input-number placeholder="请输入计数器" :min=-9 :max=100 v-model="form101Model.inputNumber104">
        </el-input-number>
      </el-form-item>
      <el-form-item label="评分" prop="rate105" required>
        <el-rate show-text text-color="#010D1B" v-model="form101Model.rate105"></el-rate>
      </el-form-item>
      <el-form-item label="树形选择" prop="treeSelect106" required>
        <el-tree-select placeholder="请选择树形选择" :data="treeSelect106Data" v-model="form101Model.treeSelect106">
        </el-tree-select>
      </el-form-item>
      <el-form-item label="级联选择" prop="cascader110" required>
        <el-cascader placeholder="请选择级联选择" :options="cascader110Options" style="width: 100%;"
                     v-model="form101Model.cascader110"></el-cascader>
      </el-form-item>
    </el-form>
    <el-form-item label="级联选择" prop="cascader112" required>
      <el-cascader placeholder="请选择级联选择" :options="cascader112Options" style="width: 100%;"
                   v-model="cascader112"></el-cascader>
    </el-form-item>
  </div>
</template>

<script setup>
const form101Model = ref({
  inputNumber104: 5,
  rate105: 5,
  treeSelect106: "2",
  cascader110: undefined,
});
const form101Rules = {
  inputNumber104: [{
    required: true,
    message: '计数器不能为空',
    trigger: 'change'
  }, {
    pattern: /^\+?[1-9][0-9]*$/,
    message: '233',
    trigger: 'change'
  }],
  rate105: [{
    required: true,
    message: '评分不能为空',
    trigger: 'change'
  }],
  cascader110: [{
    required: true,
    message: '级联选择不能为空',
    trigger: 'change'
  }],
};
const treeSelect106Data = ref([{
  value: "1",
  label: "选项1",
  children: [{
    value: "2",
    label: "选项1-1"
  }]
}]);
const cascader110Options = ref([{
  value: "1",
  label: "选项1",
  children: [{
    value: "2",
    label: "选项1-1"
  }]
}]);
const cascader112 = ref(["1", "2"]);
const cascader112Options = ref([{
  value: "1",
  label: "选项1",
  children: [{
    value: "2",
    label: "选项1-1"
  }]
}]);

</script>