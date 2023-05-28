import {ElButton, ElIcon} from "element-plus";
import {Plus} from "@element-plus/icons-vue";

export default {
    'list-type': (h, conf, key) => {
        const config = conf.__config__
        let defaultSlot = null;
        if (conf['list-type'] === 'picture-card') {
            defaultSlot = <ElIcon><Plus/></ElIcon>
        } else {
            defaultSlot = <ElButton type="primary">点击上传</ElButton>
        }
        let tipSlot = null;
        if (config.showTip) {
            tipSlot =
                <div class="el-upload__tip">
                    只能上传不超过 {config.fileSize}
                    {config.sizeUnit} 的{conf.accept}文件
                </div>
        }
        return {
            default: () => defaultSlot,
            tip: () => tipSlot
        }
    },
}
