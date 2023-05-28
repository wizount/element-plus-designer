import Render from "@/components/render/render"

//生成配置的FormItem
export default {
    props: [
        'data',
        'propertyConfig',
        'k',
    ],
    setup(props) {
        function buildVModel() {
            return {
                modelValue: props.data[props.k],
                'onUpdate:modelValue'(e) {
                    props.data[props.k] = e
                }
            }
        }

        //以下组件也是自动生成
        //options只针对select
        const {renderTag: tag,  options} = props.propertyConfig;
        const renderConfig = {
            __config__: {tag,... props.propertyConfig.config},
            __props__: props.propertyConfig.renderProps||{}
        }
        if (options) {
            renderConfig.__slot__ = {options}
        }
        return () => <Render conf={renderConfig} {...buildVModel()}></Render>

    }


}



