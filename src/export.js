import Designer from "@/views/design/Designer.vue"
import 'virtual:svg-icons-register'
import ElClearableSlider from "@/components/ElClearableSlider"
import * as components from '@element-plus/icons-vue'

const ElementPlusDesigner = {
    install(App) {
        App.component('ElementPlusDesigner', Designer);
        App.component('el-clearable-slider', ElClearableSlider);
        for (const key in components) {
            const componentConfig = components[key];
            App.component(componentConfig.name, componentConfig);
        }
    },
};
export default ElementPlusDesigner;
