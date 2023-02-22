import {createWebHistory, createRouter} from 'vue-router'
import Home from '@/views/index/Home.vue'
import Test from '@/views/Test'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/test',
        name: 'test',
        component:Test
    },
    {
        path: '/elutils',
        name: 'elutils',
        component:() =>import('@/views/ElementPropertyUtils')
    },
    {
        path: '/parser',
        name: 'parser',
        component: () =>
            import(
                /* webpackChunkName: "parser-example" */ '@/components/parser/example/Index.vue'
                ),
    },
    {
        path: '/tinymce',
        name: 'tinymce',
        component: () =>
            import(
                /* webpackChunkName: "tinymce-example" */ '@/components/tinymce/example/Index.vue'
                ),
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
