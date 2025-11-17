import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/app/layout'
    },
    {
        path: '/app',
        name: 'home',
        component: () => import('../views/AppView.vue'),
        redirect: '/app/layout',
        children: [
            {
                path: 'dataSource',
                name: 'dataSource',
                component: () => import('../views/DataSourceView.vue'),
                children: [
                    {
                        path: '',
                        redirect: '/app/dataSource/1'
                    },
                    {
                        path: ':id',
                        name: 'dataSourceDetail',
                        component: () => import('../views/DataSourceDetailView.vue')
                    }
                ]
            },
            {
                path: 'layout',
                name: 'layout',
                component: () => import('../views/PageLayout.vue')
            },
            {
                path: 'actions',
                name: 'actions',
                component: () => import('../views/ActionView.vue'),
                children: [
                    {
                        path: ':id',
                        name: 'actionsDetail',
                        component: () => import('../views/ActionDetailView.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/runner',
        name: 'runner',
        component: () => import('../views/RunnerView.vue')
    }
]

export const router = createRouter({
    history: createWebHistory('/XC-vBuilder/'),
    routes
})
