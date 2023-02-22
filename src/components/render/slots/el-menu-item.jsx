export default {
  default(h, conf, key) {
    return {default:()=>conf.__slot__[key]}
  },
}
