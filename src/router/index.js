import { createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/design/index.vue'
import Test from '@/views/tool/Test'
const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/render',
        name: 'render',
        component:() =>import('@/views/render')
    },
    {
        path: '/test',
        name: 'test',
        component:Test
    },
    {
        path: '/elutils',
        name: 'elutils',
        component:() =>import('@/views/tool/ElementPropertyUtils')
    },
    {
        path: '/preview',
        name: 'preview',
        component:() =>import('@/views/tool/preview')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});

export default router;
