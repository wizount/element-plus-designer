export default {
    default(h, conf, key) {
        return {default: () => h(resolveComponent(conf.__config__.iconName))}
    },
}
