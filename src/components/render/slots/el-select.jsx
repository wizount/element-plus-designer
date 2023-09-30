import {ElOption} from "element-plus";

export default {
  options(h, conf, key) {
    const list = []
    conf.__data__.options&&conf.__data__.options.forEach((item) => {
      list.push(
          h(ElOption,item)
      )
    })
    return  {default:()=>list}
  },
}
