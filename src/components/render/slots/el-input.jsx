export default {
    prepend(h, conf, key) {
        return {prepend: () => conf.__slot__[key]}
    },
    append(h, conf, key) {
        return {append: () => conf.__slot__[key]}
    },
}
