import {ElCheckbox, ElCheckboxButton} from "element-plus";

export default {
    options(h, conf, key) {
        const list = []
        conf.__data__.options&&conf.__data__.options.forEach((item) => {
            if (conf.__config__.optionType === 'button') {
                list.push(h(ElCheckboxButton, {label: item.value},()=> item.label))
            } else {
                list.push(h(ElCheckbox, {label: item.value, border: conf.__config__.border},()=> item.label))
            }
        })
        return {default: () => list}
    },
}
