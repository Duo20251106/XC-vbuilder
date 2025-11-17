<script setup lang="ts">
import { Arithmetic, ConnectionArrow } from '@icon-park/vue-next'
import { shallowRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const actionList = shallowRef([
    {
        id: '1',
        type: 'math',
        title: 'Math',
        icon: Arithmetic
    },
    {
        id: '2',
        type: 'workflow',
        title: 'Workflow Builder',
        icon: ConnectionArrow
    }
])

const route = useRoute()
</script>

<template>
    <ul class="action-list">
        <RouterLink
            is="li"
            :to="`/app/actions/${action.id}`"
            :class="['action-item', { active: route.params.id === action.id }]"
            v-for="action in actionList"
            :key="action.id"
        >
            <component :is="action.icon"></component>
            <span class="action-item-title">
                {{ action.title }}
            </span>
            <span class="action-item-type">
                {{ action.type }}
            </span>
        </RouterLink>
    </ul>
</template>

<style scoped>
.action-item {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    margin-bottom: 4px;
    color: var(--color-text);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
        background-color: var(--color-gray-100);
    }

    &:hover {
        background-color: var(--color-gray-100);
        transition: all 0.3s ease;
    }
}

.action-item-icon {
    color: var(--color-gray-800);
}

.action-item-title {
    margin-left: 8px;
    font-size: var(--font-size-normal);
    color: var(--color-gray-900);
}

.action-item-type {
    flex: 1;
    margin-left: 8px;
    font-size: var(--font-size-small);
    color: var(--color-gray-700);
}
</style>
