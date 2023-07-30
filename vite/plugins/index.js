import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import createCommonjs from "./commonjs";

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue(), vueJsx]

    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSetupExtend())

    isBuild && vitePlugins.push(createCommonjs())
    vitePlugins.push(createSvgIcon(isBuild))
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
