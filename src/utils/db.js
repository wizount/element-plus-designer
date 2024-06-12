const DRAWING_ITEMS = 'drawItems'
const DRAWING_ITEMS_VERSION = '0.3'
const DRAWING_ITEMS_VERSION_KEY = 'DRAWING_ITEMS_VERSION'
const DRAWING_ID = 'idGlobal'
const TREE_NODE_ID = 'treeNodeId'
const FORM_CONF = 'designConf'

export function getDrawItemList() {
  // 加入缓存版本的概念，保证缓存数据与程序匹配
  const version = localStorage.getItem(DRAWING_ITEMS_VERSION_KEY)
  if (version !== DRAWING_ITEMS_VERSION) {
    localStorage.setItem(DRAWING_ITEMS_VERSION_KEY, DRAWING_ITEMS_VERSION)
    saveDrawItemList([])
    return []
  }

  const str = localStorage.getItem(DRAWING_ITEMS)
  if (str) return JSON.parse(str)
  return []
}

export function saveDrawItemList(list) {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list))
}

export function getIdGlobal() {
  const str = localStorage.getItem(DRAWING_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveIdGlobal(id) {
  localStorage.setItem(DRAWING_ID, `${id}`)
}

export function getTreeNodeId() {
  const str = localStorage.getItem(TREE_NODE_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveTreeNodeId(id) {
  localStorage.setItem(TREE_NODE_ID, `${id}`)
}

export function getDesignConf() {
  const str = localStorage.getItem(FORM_CONF)
  try{
    if (str) return JSON.parse(str)
  } catch (e) {
  }
  return null
}

export function saveDesignConf(obj) {
  localStorage.setItem(FORM_CONF, JSON.stringify(obj))
}
