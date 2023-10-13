import slotRenderFunctions from './slots'
import {h, resolveComponent} from 'vue'

export default {
    //  inheritAttrs: false,想要拖拽，这个不能要

    props: {
        conf: {
            type: Object,
            required: true
        }
    },
    setup(props, {slots, emit, attrs}) {
        const {conf} = props
        function buildSlots(conf) {
            const thisSlots = slots.default || {}
            const childObjs = slotRenderFunctions[conf.__config__.tag]
            if (childObjs) {
                Object.keys(childObjs).forEach(key => {
                    const childFunc = childObjs[key]
                    Object.assign(thisSlots, childFunc(h, conf, key))
                })
            }
            return thisSlots;
        }

        return () => h(resolveComponent(conf.__config__.tag),
            {
                ...conf.__props__,...conf.__native__
            }, buildSlots(conf)
        )
    }
}
