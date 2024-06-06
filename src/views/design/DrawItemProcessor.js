//组件一些操作

/**
 * 递归处理DrawItem列表，如果processorFunc返回true则停止递归
 * @param itemList 要寻找组件数组
 * @param processorFunc 处理函数(item=>
 */
export function recursiveProcessDrawItemList(itemList, processorFunc) {
    if (!Array.isArray(itemList)) {
        return;
    }
    for (const item of itemList) {
        if (typeof item === 'string') {
            continue;
        }
        if (!processorFunc(item)) {//如果processorFunc返回true则停止递归
            for (const slotName in item.__slots__) {
                recursiveProcessDrawItemList(item.__slots__[slotName], processorFunc);
            }
        }

    }
}

/**
 * 递归某一个DrawItem及子DrawItem，如果processorFunc返回true则停止递归
 * @param item 组件
 * @param processorFunc 处理函数
 */
export function processADrawItemAndSlots(item, processorFunc) {
    if (typeof item === 'string') {
        return;
    }

    if (!processorFunc(item)) {
        for (const slotName in item.__slots__) {
            recursiveProcessDrawItemList(item.__slots__[slotName], processorFunc);
        }
    }

}

//region DrawItem遍历

/**
 * 根据renderKey查找这个组件
 * @param itemList drawItemList
 * @param renderKey
 * @return {{}}
 */
export function findDrawItemByRenderKey(itemList, renderKey) {
    let res = {};
    recursiveProcessDrawItemList(itemList, (item) => {
        if (item.renderKey === renderKey) {
            res = item;
            return true;
        } else {
            return false;
        }
    })
    return res;
}

/**
 * 从list中找到 item 的index
 * @param list 要寻找的数组
 * @param item的数组，位置，所在
 * @return object 返回 item的父组件，所在的slot,如果为空，返回{}
 */


export function recursiveFindDrawItemInfo(parent, list, item, slotName) {
    if (!Array.isArray(list) || !item || !item.renderKey) {
        return {};
    }
    for (let index = 0; index < list.length; index++) {
        let p = list[index];
        if (item.renderKey === p.renderKey) {
            return {parent, slotName, list, index}
        }
        for (const slotName_ in p.__slots__) {
            let res = recursiveFindDrawItemInfo(p, p.__slots__[slotName_], item, slotName_);
            if (res.index !== undefined) {
                return res;
            }
        }
    }
    return {};
}

/**
 * 查找子节点（children）的父节点和slotName
 *
 * @param parent 父节点
 * @param itemList 比较的列表
 * @param children 子节点
 * @param slotName
 * @return {{slotName, parent}|{}|*}
 */
export function recursiveFindParentOfChildren(parent, itemList,children,slotName) {
    if(itemList===children){
        return {parent, slotName};
    }
    for (const p of itemList) {
        for (const slotName_ in p.__slots__) {
            let res = recursiveFindParentOfChildren(p, p.__slots__[slotName_], children, slotName_);
            if (res.parent !== undefined) {
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
    const {__props__: props} = drawItem;

    Object.keys(props).forEach(key => {
        if (typeof props[key] === 'string' && props[key].indexOf(oldItemName) === 0) {
            props[key] = props[key].replace(oldItemName, newItemName)
        }
    })
}

//endregion