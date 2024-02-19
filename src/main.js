import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
app.component('svg-icon', SvgIcon)
import elementIcons from '@/components/SvgIcon/svgicon'
app.use(elementIcons)

//载入props编辑组件。
import editors from '@/components/editors/index'
app.use(editors)


// main.ts
// 如果只想导入css变量
import 'element-plus/theme-chalk/dark/css-vars.css'

app.mount('#app')
