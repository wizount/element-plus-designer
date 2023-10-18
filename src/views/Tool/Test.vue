<template>
  <div style="padding: 5px">
    <el-form-item label="自动补全" prop="autocomplete102" required>
      <el-autocomplete placeholder="请选择自动补全" :fetch-suggestions="autocomplete102FetchSuggestions"
                       v-model="autocomplete102"></el-autocomplete>
    </el-form-item>
  </div>
</template>

<script setup>
import {
  ref
}
  from "vue";
const autocomplete102 = ref(undefined);
const autocomplete102Options = ref([{
  label: "选项一",
  value: "1"
}, {
  label: "选项二",
  value: "2"
}]);

function autocomplete102FetchSuggestions(queryString, cb) {
  const results = queryString ? autocomplete102Options.value.filter((item) => item.value.toLowerCase()
      .indexOf(queryString.toLowerCase()) === 0) : autocomplete102Options.value
  cb(results)
}

</script>