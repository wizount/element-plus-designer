import Designer from "@/views/design/Designer.vue"
import 'virtual:svg-icons-register'
import editors from "@/components/editors"
import * as components from '@element-plus/icons-vue'

const ElementPlusDesigner = {
    install(App) {
        App.component('ElementPlusDesigner', Designer);
        App.use(editors);
        for (const key in components) {
            const componentConfig = components[key];
            App.component(componentConfig.name, componentConfig);
        }
    },
};
export default ElementPlusDesigner;
