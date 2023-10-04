import loadScript from './loadScript'
import {ElLoading} from 'element-plus'
import pluginsConfig from './pluginsConfig'

let beautifierObj

export default function loadBeautifier(cb) {
    const {beautifierUrl} = pluginsConfig
    if (beautifierObj) {
        cb(beautifierObj)
        return
    }

    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    loadScript(beautifierUrl, () => {
        loading.close()
        beautifierObj = beautifier
        cb(beautifierObj)
    })
}
