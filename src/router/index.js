// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useTokenStore } from '@/store';

const routes = [
    {
        path: '/startPage',
        name: 'startPage',
        component: () => import('../components/startPage.vue')
    },
    {
        path: '/',
        name: 'IndexView',
        component: () => import('../page/index.vue')
    },
    {
        path: '/LuckyWheel',
        name: 'LuckyWheel',
        component: () => import('../components/home/LuckyWheel.vue')
    },
    {
        path: '/SharePage',
        name: 'SharePage',
        component: () => import('../components/home/SharePage.vue')
    },
    {
        path: '/MyProfile',
        name: 'MyProfile',
        component: () => import('../components/home/MyProfile.vue')
    },
    {
        path: '/task',
        name: 'task',
        component: () => import('../components/home/task.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const tokenStore = useTokenStore();
    if (to.path === '/startPage') {
        next()
        return
    }
    if(tokenStore.getToken){
        await tokenStore.RefreshInfo()
        next()
    }else{
        next('/startPage')
    }
})

export default router;
