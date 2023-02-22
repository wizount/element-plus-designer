export default {
    title(h, conf, key) {
        return {title: () => conf.__slot__[key]}
    },
}
