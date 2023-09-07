export default {
    icon(h, conf, key) {
        return {default: () => h(resolveComponent(conf.__data__.icon))}
    },
}
