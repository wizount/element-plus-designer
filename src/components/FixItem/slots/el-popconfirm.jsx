import {ElButton} from "element-plus";

export default {
    reference(h, conf, key) {
        return {reference: () => <ElButton>{conf.__config__[key]}</ElButton>}
    }
}
