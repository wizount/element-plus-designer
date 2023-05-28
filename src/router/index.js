import {createWebHistory, createRouter} from 'vue-router'
import Index from '@/views/design/index.vue'
import Test from '@/views/tool/Test'
const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
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
    history: createWebHistory(),
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
