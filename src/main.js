import { createApp } from 'vue'
import App from '@/views/index/App.vue'
import router from './router'


import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

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

//todo 用在col分栏，考虑局部引用。
import ElClearableSlider from "@/components/ElClearableSlider"
app.component('el-clearable-slider', ElClearableSlider)


app.mount('#app')
