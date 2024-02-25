import { createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/design/index.vue'
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
    }
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
