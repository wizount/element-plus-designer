import {renderDefineComponent, renderJsComposition, renderJsNotSetup, renderJsOptions} from "@/components/generator/js";
import {beautifierConf} from "@/utils";
import {renderVue3Template} from "@/components/generator/html";

export const renderJs = (drawItemList, jsCodeStyle) => {
    if (jsCodeStyle === 'options') {
        return renderJsOptions(drawItemList);
    } else {
        return renderJsComposition(drawItemList);
    }
}


//beautifier.js(
//形成sfc
export const renderSfc = (drawItemList, jsCodeStyle, beautifier) => {
    let setup = "";
    let js = "";
    switch (jsCodeStyle) {
        case 'options':
            js = renderJsOptions(drawItemList);
            break;
        case 'composition':
            setup = "setup"
            js = renderJsComposition(drawItemList);
            break;
        case 'compositionSFC':
            js = renderJsNotSetup(drawItemList);
            break;
        case 'defineComponent':
            js = renderDefineComponent(drawItemList);
            break;
    }

    let htmlCode = renderVue3Template(drawItemList);
    if (beautifier) {
        htmlCode = beautifier.html(htmlCode, beautifierConf.html).replaceAll("template_alt", "template");
        js = beautifier.js(js, beautifierConf.js);
    }
    return `${htmlCode}
<script ${setup}>
${js}
</script>`
}