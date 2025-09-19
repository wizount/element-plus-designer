import {ElOption} from "element-plus";

export default {
  options(h, conf, key) {
    const list = []
    const options =   conf.__data__&&conf.__data__.options||conf.__props__.options
    options&&options.forEach((item) => {
      list.push(
          h(ElOption,item)
      )
    })
    return  {default:()=>list}
  },
}
