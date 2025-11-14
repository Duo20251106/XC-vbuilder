import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import ActionDetailView from '@/views/ActionDetailView.vue'

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
        redirect:'/app/layout',
        children: [
            {
                path: 'dataSource',
                name: 'dataSource',
                component: DataSourceView,
                children: [
                    {
                        path: '',
                        redirect: '/app/dataSource/1'
                    },
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
                component: ActionView,
                children: [
                    {
                        path: ':id',
                        name: 'actionsDetail',
                        component: ActionDetailView
                    }
                ]
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
