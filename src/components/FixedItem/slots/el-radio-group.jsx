import {ElRadio, ElRadioButton} from "element-plus";

export default {
  options(h, conf, key) {
    const list = []
    const options =  conf.__data__&& conf.__data__.options||conf.__props__.options
    options&&options.forEach((item) => {
      if (conf.__config__.optionType === 'button') {
        list.push(h(ElRadioButton, {value: item.value},()=> item.label))
      } else {
        list.push(h(ElRadio, {value: item.value, border: conf.__config__.border},()=> item.label))
      }
    })
    return {default: () => list}
  },
}
