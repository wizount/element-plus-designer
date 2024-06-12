import FixedItem from "@/components/FixedItem"

//动态配置输入
export default {
    props: [
        'attrConfig'
    ],
    setup(props) {
        const {tag, options} = props.attrConfig; //options只针对select
        const renderConfig = {
            __config__: {tag, ...props.attrConfig.config},
            __props__: props.attrConfig.props || {}
        }
        if (options) {
            renderConfig.__data__ = {options}
        }
        return () => h(FixedItem, {conf: renderConfig})

    }


}



