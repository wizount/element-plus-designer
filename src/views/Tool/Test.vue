<template>
  <div style="padding: 5px">
    <el-form :model="form101Model" :rules="form101Rules">
      <el-form-item label="级联选择" prop="cascader102" required>
        <el-cascader placeholder="请选择级联选择" :options="cascader102Options" style="width: 100%;"
                     v-model="form101Model.cascader102"></el-cascader>
      </el-form-item>
      <el-form-item label="多选框组" prop="checkboxGroup103" required>
        <el-checkbox-group v-model="form101Model.checkboxGroup103">
          <el-checkbox v-for="(item, index) in checkboxGroup103Options" :key="index" :label="item.value"
                       :disabled="item.disabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="颜色选择" prop="colorPicker104" required>
        <el-color-picker v-model="form101Model.colorPicker104"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      form101Model: {
        cascader102: [],
        checkboxGroup103: [],
        colorPicker104: undefined
      },
      form101Rules: {
        cascader102: [{
          required: true,
          message: "请至少选择一个级联选择",
          trigger: "change"
        }],
        checkboxGroup103: [{
          required: true,
          message: "请至少选择一个多选框组",
          trigger: "change"
        }]
      },
      cascader102Options: undefined,
      checkboxGroup103Options: [{
        label: "选项一",
        value: "1"
      }, {
        label: "选项二",
        value: "2"
      }]
    }
  },
  mounted() {
    this.getCascader102Options();
  },
  methods: {
    getCascader102Options() {
      axios({
        method: "get",
        url: "https://www.fastmock.site/mock/c9e1a1c3cefb84da4306dcf9fadde652/ele-plus-desinger/options"
      }).then((resp) => {
        this.cascader102Options = resp.data;
      })
    }
  }
}

</script>