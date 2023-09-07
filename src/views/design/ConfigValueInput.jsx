import Render from "@/components/render/render"

//生成配置的FormItem
export default {
    props: [
        // 'modelValue',
        // 'attrName',
        'attrConfig'
    ],
    setup(props) {
        // function buildVModel() {
        //     return {
        //         modelValue: props.data[props.attrName],
        //         'onUpdate:modelValue'(e) {
        //             props.data[props.attrName] = e
        //         }
        //     }
        // }

        //以下组件也是自动生成
        //options只针对select

        const {tag, options} = props.attrConfig;
        const renderConfig = {
            __config__: {tag, ...props.attrConfig.config},
            __props__: props.attrConfig.props || {}
        }
        if (options) {
            renderConfig.__data__ = {options}
        }
        return () => <Render conf={renderConfig}></Render>

    }


}



