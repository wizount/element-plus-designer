export default {
    prepend(h, conf, key) {
        return {prepend: () => conf.__data__[key]}
    },
    append(h, conf, key) {
        return {append: () => conf.__data__[key]}
    },
}
