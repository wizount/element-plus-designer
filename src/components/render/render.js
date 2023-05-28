import {deepClone} from '@/utils/index'




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
    setup(props, {slots, emit,attrs}) {
        const {conf} = props
        // function buildDataObject() {
        //     const dataObject = {}
        //     Object.keys(conf).forEach(key => {
        //         if (key.indexOf("__") < 0) {
        //             dataObject[key] = conf[key]
        //             // const val = conf[key]
        //         }
        //         if(conf[key]==null &&conf[key]==undefined){
        //             delete conf[key]
        //         }
        //
        //     })
        //     return dataObject;
        // }
        function buildSlots(conf) {
            const thisSlots = slots.default || {}
            const childObjs = slotRenderFunctions[conf.__config__.tag]
            if (childObjs) {
                Object.keys(childObjs).forEach(key => {
                    const childFunc = childObjs[key]
                    if (conf.__slot__ && conf.__slot__[key]) {
                        Object.assign(thisSlots, childFunc(h, conf, key))
                    }
                })
            }
            //增加默认slot
            if(!thisSlots.default&&conf.__slot__&&conf.__slot__.default){
                thisSlots.default=()=>conf.__slot__.default
            }
            return thisSlots;
        }

        return () => h(resolveComponent(conf.__config__.tag),
            {
                ...conf.__props__
            }, buildSlots(conf)
        )
    }
}
