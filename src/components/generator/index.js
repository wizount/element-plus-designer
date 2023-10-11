import {renderJsComposition, renderJsOption} from "@/components/generator/js";
import {beautifierConf} from "@/utils";
import {renderVue3Template} from "@/components/generator/html";

export const renderJs = (drawItemList, jsCodeStyle) => {
    if (jsCodeStyle === 'options') {
        return renderJsOption(drawItemList);
    } else {
        return renderJsComposition(drawItemList);
    }
}


//beautifier.js(
//形成sfc
export const renderSfc = (drawItemList, jsCodeStyle, beautifier) => {
    let jsCode;
    if (jsCodeStyle === 'options') {
        let js = renderJsOption(drawItemList);
        if (beautifier) {
            js = beautifier.js(js, beautifierConf.js);
        }
        jsCode= `<script>
export default ${js}
</script>`
    } else {
        let js = renderJsComposition(drawItemList);
        if (beautifier) {
            js = beautifier.js(js, beautifierConf.js);
        }
        jsCode= `<script setup>
${js}
</script>`
    }

    let htmlCode=renderVue3Template(drawItemList);
    if(beautifier){
        htmlCode= beautifier.html(htmlCode,beautifierConf.html).replaceAll("template_alt", "template");;
    }
    return `${htmlCode}
${jsCode}`
}