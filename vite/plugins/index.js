import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import createCommonjs from "./commonjs";

export default function createVitePlugins(viteEnv, env) {
    const vitePlugins = [vue(), vueJsx]

    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSetupExtend())

    env==='lib'&& vitePlugins.push(createCommonjs())
    vitePlugins.push(createSvgIcon(env!=='dev'))
    env==='build'&& vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
