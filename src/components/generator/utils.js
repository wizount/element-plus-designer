//判断数组是否相等
export const isArrayEqual = (arrayA, arrayB) => {
    console.info(JSON.stringify(arrayA), JSON.stringify(arrayB))
    return JSON.stringify(arrayA) === JSON.stringify(arrayB);
}

export const isObjectEqual = (oA, oB) => {
    if (!oA || !oB) return false;
    let isEqual = true;
    Object.keys(oA).forEach((k) => {
        if (oA[k] !== oB[k]) {
            isEqual = false;
        }
    })
    Object.keys(oB).forEach((k) => {
        if (oA[k] !== oB[k]) {
            isEqual = false;
        }
    })
    return isEqual;
}