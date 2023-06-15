import ElementPlusDesigner from "@/views/design/Designer.vue"

export { ElementPlusDesigner };

const component = [ElementPlusDesigner];

const MukUI = {
    install(App) {
        component.forEach((item) => {
            App.component(item.name, ElementPlusDesigner);
        });
    },
};

export default MukUI;
