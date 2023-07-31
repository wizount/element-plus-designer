<template>
  <template v-for="(v,k) in propertyConfig">
    <el-form-item v-if="!v.hide&&k!=='placeholder'&&k!=='vModel'"
                  v-show="!v.switch||v.switch&&propsValue[v.switch[0]]===v.switch[1]"
                  :key="k" :required="v.required">

      <template #label>
        <div :title="`${k}${v.title?'：'+v.title:''}。${v.ref?'':'双击可以变成ref对象'}`" @dblclick.prevent="!v.ref&&switchRef(k)" @click.prevent="">
          {{ v.label || v.title }}
        </div>
      </template>

      <el-input v-model="propsValue.__ref__[k]" placeholder="请输入ref对象变量名" title="请输入ref对象变量名"
                v-if="propsValue.__ref__&&propsValue.__ref__[k]">
        <template #prepend>REF</template>
      </el-input>
      <template v-if="v.renderTag==='iconDialog'">
        <el-button class="click-remove-btn" text v-if="propsValue[k]"
                   :icon="propsValue[k]" title="点击删除"
                   @click="propsValue[k]=''">{{ propsValue[k] }}
        </el-button>
        <el-button @click="openIconsDialog(k)"> 选择...</el-button>
      </template>
      <template v-else-if="v.type==='array'">
        <array-editor :list="v.slot?slotsValue[k]:propsValue[k]"
                      :tag="v.tag||'ElInput'"></array-editor>
      </template>
      <template v-else-if="v.type==='objectArray'">
        <object-array-editor :keys="v.keys"
                             :list="v.slot?slotsValue[k]:propsValue[k]"></object-array-editor>
      </template>
      <template v-else-if="v.type==='object'">
        <object-editor v-model="propsValue[k]" v-bind="v.objectTag"></object-editor>
      </template>
      <template v-else-if="v.type==='style'">
        <style-editor v-model="propsValue[k]" v-bind="v.objectTag"></style-editor>
      </template>
      <config-form-item :data="v.slot?slotsValue:propsValue" :k="k"
                        :property-config="v" v-else></config-form-item>
    </el-form-item>
  </template>
  <icons-dialog v-model="iconsVisible" :chosen="propsValue[currentIconModel]"
                @select="setIcon">
  </icons-dialog>


</template>

<script setup>
import ObjectEditor from "@/components/ObjectEditor.vue";
import ConfigFormItem from "@/views/design/ConfigFormItem";
import ObjectArrayEditor from "@/components/ObjectArrayEditor.vue";
import ArrayEditor from "@/components/ArrayEditor.vue";
import IconsDialog from "@/views/design/IconsDialog.vue";
import {computed} from "vue";
import {ElMessageBox} from "element-plus";
import StyleEditor from "@/components/StyleEditor.vue";

const props = defineProps(["propertyConfig", "propsValue", "slotsValue"])
//region 图标选择
const iconsVisible = ref(false)
const currentIconModel = ref(null)

function openIconsDialog(model) {
  iconsVisible.value = true
  currentIconModel.value = model
}

function setIcon(val) {
  props.propsValue[currentIconModel.value] = val;
}

//endregion

function switchRef(key) {
  let __ref__ = props.propsValue.__ref__;
  if (!__ref__) {
    __ref__ = {};
  }
  let refName = __ref__[key];
  if (!refName) {
    ElMessageBox.confirm("是否将此设置改成ref对象？").then(()=>{
      __ref__[key] = key;
    })
  } else {
    delete __ref__[key]
  }
}
</script>

<style scoped>
.click-remove-btn:hover {
  text-decoration: line-through red
}
</style>