import {ElRadio, ElRadioButton} from "element-plus";

export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach((item) => {
      if (conf.__config__.optionType === 'button') {
        list.push(h(ElRadioButton, {label: item.value},()=> item.label))
      } else {
        list.push(h(ElRadio, {label: item.value, border: conf.__config__.border},()=> item.label))
      }
    })
    return {default: () => list}
  },
}
