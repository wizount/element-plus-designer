//组件一些操作

//递归处理组件
export function recursiveProcessDrawItemList(comList, processorFunc) {
    if (!Array.isArray(comList)) {
        return;
    }
    for (const item of comList) {
        if (typeof item === 'string') {
            continue;
        }
        processorFunc(item)
        for (const slotName in item.__slots__) {
            recursiveProcessDrawItemList(item.__slots__[slotName], processorFunc);
        }

    }
}

export function processADrawItemAndSlots(item, processorFunc) {
    if (typeof item === 'string') {
        return;
    }
    processorFunc(item)
    for (const slotName in item.__slots__) {
        recursiveProcessDrawItemList(item.__slots__[slotName], processorFunc);
    }
}

//region 组件遍历

/**
 * 从list中找到 item 的index
 * @param list 要寻找的数组
 * @param item
 * @return 返回 item的父组件，所在的数组，位置，如果为空，返回{}
 */
export function recursiveFindItemIndexInList(parent, list, item) {
    if (!Array.isArray(list) || !item || !item.renderKey) {
        return {};
    }
    for (let index = 0; index < list.length; index++) {
        let p = list[index];
        if (item.renderKey === p.renderKey) {
            return {parent, list, index}
        }
        for (const slotName in p.__slots__) {
            let res = recursiveFindItemIndexInList(p, p.__slots__[slotName], item);
            if (res.index !== undefined) {
                return res;
            }
        }
    }
    return {};
}

export function changeDrawItemVariableName(drawItem, newItemName, oldItemName) {
    if (!drawItem || !drawItem.renderKey) {
        return;
    }
    if (drawItem.__vModel__ !== undefined && oldItemName === drawItem.__vModel__) {
        drawItem.__vModel__ = newItemName;
    }
    for (const key in drawItem.__refs__) {
        let val = drawItem.__refs__[key];
        if (val.indexOf(oldItemName) === 0) {
            drawItem.__refs__[key] = val.replace(oldItemName, newItemName)
        }
    }
    const {__config__: config, __props__: props} = drawItem;
    //针对el-form更改model和rules
    if (config.tag === 'el-form') {//这是硬编码
        if (props.model.indexOf(oldItemName) === 0) {
            props.model = props.model.replace(oldItemName, newItemName)
        }
        if (props.rules.indexOf(oldItemName) === 0) {
            props.rules = props.rules.replace(oldItemName, newItemName)
        }
    }
}

//endregion