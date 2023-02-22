import {ElButton} from "element-plus";

export default {
    default(h, conf, key) {
        return {default: () => <ElButton>{conf.__slot__[key]}</ElButton>}
    },
}
