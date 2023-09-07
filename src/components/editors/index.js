
const editors={}
const vueFiles = import.meta.glob("./*.vue",{eager:true});
const keys = Object.keys(vueFiles) || []

for (const key of keys) {
    const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1');
    editors[tag] = vueFiles[key].default

}

export default {
    install: (app) => {
        for (const key in editors) {
            app.component(key, editors[key]);
        }
    },
};
