/**
 * 创建el-autoComplete回调
 */
export class AutoCompleteCallback {

    constructor(list) {
        this.list = []
        for (const l of list) {
            if (typeof l === 'string') {
                this.list.push({value: l, text: l})
            } else {
                this.list.push(l)
            }
        }
    }

    querySearch = (queryString, cb) => {
        if(!queryString||queryString=='null'){
            queryString=""
        }
        const results = queryString
            ? this.list.filter(this.createFilter(queryString))
            : this.list
        // call callback function to return suggestions
        cb(results)
    }

    createFilter = (queryString) => {
        return (item) => {
            return (
                item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            )
        }
    }
}
