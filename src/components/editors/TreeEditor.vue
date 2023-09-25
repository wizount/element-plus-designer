<!--用于树型数据-->
<template>
  <div>
    <div>树形编辑器
      <el-button link icon="Setting" @click="showSetting=!showSetting"></el-button>
    </div>
    <el-collapse-transition>
      <el-form v-show="treeProps&&showSetting">
        <el-form-item label="label">
          <el-input v-model="treeProps.label" placeholder="标签属性"></el-input>
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="treeProps.value" placeholder="值属性"></el-input>
        </el-form-item>
        <el-form-item label="children">
          <el-input v-model="treeProps.children" placeholder="子选项属性值"></el-input>
        </el-form-item>
        <el-form-item label="disabled" v-if="treeProps.disabled!==undefined">
          <el-input v-model="treeProps.disabled" placeholder="子选项属性值"></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-transition>
    <el-scrollbar :height="100" class="w-100 m-1">
      <el-tree :data="treeData" node-key="value" draggable :props="treeProps"
               default-expand-all highlight-current :expand-on-click-node="false" @nodeDragEnd="dropEnd"
      >
        <template #default="{ node, data }">
          <span>
           <el-text>{{ data[treeProps.label||"label"]}}</el-text>
          <span class="pl-2">
                 <el-button icon="Edit" link
                            type="primary" title="编辑" @click="popupInputDialog($event,node,-2)"/>
              <el-button icon="ArrowUp" link
                         type="primary" title="添加到选项前" @click="popupInputDialog($event,node,-1)"/>
             <el-button icon="ArrowDown" link title="添加到选项前"
                        type="primary" @click="popupInputDialog($event,node,1)"/>
              <el-button icon="Plus" link title="添加子选项"
                         type="primary" @click="popupInputDialog($event,node,0)"/>
            <el-button icon="Delete" link title="删除此选项" @click="deleteItem(node)"
                       type="danger"/>
          </span>
        </span>
        </template>

      </el-tree>
      <popup-input ref="popupRef">
        <el-form>
          <el-form-item label="标签">
            <el-input v-model="tempItem[treeProps.label||'label']"/>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="tempItem[treeProps.value||'value']"/>
          </el-form-item>
          <el-form-item label="禁用" v-if="treeProps.disabled!==undefined">
            <el-switch v-model="tempItem[treeProps.disabled||'disabled']"/>
          </el-form-item>
        </el-form>
        <div class="text-right">
          <el-button @click="cancelAdd">取消</el-button>
          <el-button @click="addItem" type="primary">确定</el-button>
        </div>

      </popup-input>
    </el-scrollbar>
  </div>
</template>

<script setup>
import PopupInput from "@/components/PopupInput"
import {ref, watchEffect} from "vue";
import {ElNotification} from "element-plus";
import {deepClone} from "@/utils";


const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  treeProps: {
    type: Object,
    required: true
  }
});
const emits=defineEmits(["update:modelValue"])
const popupRef = ref("")
const tempItem = ref({})
let tempInfo = {};

const treeData=ref([]);
watchEffect(()=>{
  if(Array.isArray(props.modelValue)){
    treeData.value=deepClone(props.modelValue)
  }else{
    treeData.value=[];
  }
})
const popupInputDialog = (event, node, pos) => {//看能不能改成promise
  if (pos === -2) {
    tempItem.value = {};
    Object.assign(tempItem.value, node.data);
  } else {
    tempItem.value = {};
  }

  popupRef.value.popup({x: event.clientX, y: event.clientY});
  tempInfo = {node, pos};
}
const addItem = () => {
  const children = props.treeProps.children || 'children'
  const {node, pos} = tempInfo;

  const {data, parent} = node;
  if (pos === -2) {
    Object.assign(data, tempItem.value)
    popupRef.value.close();
    return;
  }
  const item = deepClone(tempItem.value)
  if (pos === 0) {
    console.info(data)
    if (!data[children]) {
      data[children] = []
    }
    data[children].push(item)
  } else {
    const {data: parentData} = parent;
    let target = null;
    if (Array.isArray(parentData)) {
      target = parentData;
    } else {
      target = parentData[children];
    }
    let idx = target.indexOf(data);
    if (pos === 1) {
      idx++;
    }
    target.splice(idx, 0, item)
  }
  popupRef.value.close();
  emits("update:modelValue",treeData.value)
}
const cancelAdd = () => {
  popupRef.value.close();
}
const deleteItem = (node) => {

  const {data, parent} = node;

  const {data: parentData} = parent;
  let target = null;
  if (Array.isArray(parentData)) {
    target = parentData;
  } else {
    target = parentData.children;
  }
  let idx = target.indexOf(data);

  if (target === treeData.value && target.length === 1) {
    ElNotification.warning("只有一个选项，不能删除");
  } else {
    target.splice(idx, 1);
  }
  emits("update:modelValue",treeData.value)
}

const defaultKeys = ["label", "value", "disabled", "children"]
watch(() => [props.treeProps.label, props.treeProps.value, props.treeProps.disabled, props.treeProps.children], (newVal, oldVal) => {
  defaultKeys.map((key, idx) => {
    changeKeys(treeData.value, oldVal[idx] || key, newVal[idx] || key, oldVal[3])
  })
  emits("update:modelValue",treeData.value)
});

function changeKeys(list, oldKey, newKey, children) {
  if (oldKey === newKey) {
    return;
  }
  for (const l of list) {
    l[newKey] = l[oldKey];
    if (l[children]) {
      changeKeys(l[children], oldKey, newKey, children)
    }
    delete l[oldKey]

  }
}
function dropEnd(){
  emits("update:modelValue",treeData.value)
}

const showSetting = ref(false)
</script>

<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 2px;
}
</style>
