/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */

// 首字母大小
export function titleCase(str) {
    return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
    return str.replace(/-[a-z]/g, (str1) => str1.substr(-1).toUpperCase())
}


export function isNumberStr(str) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

export const exportDefault = 'export default '

export const beautifierConf = {
    html: {
        indent_size: '2',
        indent_char: ' ',
        max_preserve_newlines: '-1',
        preserve_newlines: false,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: 'separate',
        brace_style: 'end-expand',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: false,
        end_with_newline: true,
        wrap_line_length: '110',
        indent_inner_html: true,
        comma_first: false,
        e4x: true,
        indent_empty_lines: true,
    },
    js: {
        indent_size: '2',
        indent_char: ' ',
        max_preserve_newlines: '-1',
        preserve_newlines: false,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: 'normal',
        brace_style: 'end-expand',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: true,
        end_with_newline: true,
        wrap_line_length: '110',
        indent_inner_html: true,
        comma_first: false,
        e4x: true,
        indent_empty_lines: true,
    },
}

function stringify(obj) {
    return JSON.stringify(obj, (key, val) => {
        if (typeof val === 'function') {
            return `${val}`
        }
        return val
    })
}

function parse(str) {
    JSON.parse(str, (k, v) => {
        if (v.indexOf && v.indexOf('function') > -1) {
            return eval(`(${v})`)
        }
        return v
    })
}


// 深拷贝对象
export function deepClone(obj) {
    const _toString = Object.prototype.toString

    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
        return obj
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
        return obj.cloneNode(true)
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
        return new Date(obj.getTime())
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
        const flags = []
        if (obj.global) {
            flags.push('g')
        }
        if (obj.multiline) {
            flags.push('m')
        }
        if (obj.ignoreCase) {
            flags.push('i')
        }

        return new RegExp(obj.source, flags.join(''))
    }

    const result = Array.isArray(obj)
        ? []
        : obj.constructor
            ? new obj.constructor()
            : {}

    for (const key in obj) {
        result[key] = deepClone(obj[key])
    }

    return result
}

const toStr = Function.prototype.call.bind(Object.prototype.toString)

export function isObjectObject(t) {
    return toStr(t) === '[object Object]'
}

export function isObjectArray(t) {
    return toStr(t) === '[object Array]'
}

export function isObjectNull(t) {
    return toStr(t) === '[object Null]'
}

export function isObjectUnde(t) {
    return toStr(t) === '[object Undefined]'
}

export function getType(obj) {
    let type = typeof obj;

    if (type !== 'object') {
        return type;
    }
    //如果不是object类型的数据，直接用typeof就能判断出来

    //如果是object类型数据，准确判断类型必须使用Object.prototype.toString.call(obj)的方式才能判断
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1').toLowerCase();
}

//删除json object 的空值
export function deleteObjectProps(targetObject) {
    for (const key in targetObject) {
        const val = targetObject[key];
        if (val === undefined || val === null || val === '') {
            delete targetObject[key];
        } else {
            const str = JSON.stringify(val);
            if (str === '[]' || str === '{}') {
                delete targetObject[key];
            }
        }
    }
}


