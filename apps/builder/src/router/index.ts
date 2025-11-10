import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import ActionView from '../views/ActionView.vue'
import AppView from '../views/AppView.vue'
import DataSourceDetailView from '../views/DataSourceDetailView.vue'
import DataSourceView from '../views/DataSourceView.vue'
import PageLayout from '../views/PageLayout.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/app/layout'
    },
    {
        path: '/app',
        name: 'home',
        component: AppView,
        children: [
            {
                path: 'dataSource',
                name: 'dataSource',
                component: DataSourceView,
                children: [
                    {
                        path: ':id',
                        name: 'dataSourceDetail',
                        component: DataSourceDetailView
                    }
                ]
            },
            {
                path: 'layout',
                name: 'layout',
                component: PageLayout
            },
            {
                path: 'actions',
                name: 'actions',
                component: ActionView
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
