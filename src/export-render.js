import Render from "@/views/render/Render.vue"

const ElementPlusDesignerRender = {
    install(App) {
        App.component('ElementPlusRender', Render);
    },
};

export default ElementPlusDesignerRender;
