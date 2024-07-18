let templateReg = /{{((\w|\.)*)}}/g;

// 对模板{{key.subKey}}进行替换
//此方法针对带参数的插槽
export function replaceTemplate(text, paramOb) {
    if(!paramOb){
        return text;
    }
    let keys = []
    let a;
    while ((a = templateReg.exec(text)) !== null) {
        if (a["1"]) {
            keys.push(a["1"]);
        }
    }
    keys.forEach(v => {
        let ob=paramOb;
        v.split(".").forEach(k => {
            console.info(k);
            if(ob){
                ob=ob[k]
            }

        })
        text = text.replace(`{{${v}}}`,ob);
    })
    return text;
}