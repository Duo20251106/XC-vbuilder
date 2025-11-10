<script setup lang="ts">
import { Home, MoreFour, WebPage } from '@icon-park/vue-next'
import { ref } from 'vue'

const pages = [
    {
        type: 'page',
        label: '首页',
        icon: Home
    },
    {
        type: 'page',
        label: 'New Screen',
        icon: WebPage
    },
    {
        type: 'page',
        label: 'Some Things',
        icon: MoreFour
    }
]

const activatedPageIndex = ref(0)
</script>

<template>
    <ul class="navigation-list">
        <li
            :class="['navigation-item', activatedPageIndex === index && 'active']"
            v-for="(page, index) in pages"
            :key="page.type"
        >
            <component :is="page.icon" class="navigation-item-icon"></component>
            <span class="navigation-item-name">
                {{ page.label }}
            </span>
        </li>
    </ul>
</template>

<style scoped>
.navigation-item {
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

.navigation-item-icon {
    color: var(--color-gray-800);
}

.navigation-item-name {
    margin-left: 8px;
    font-size: var(--font-size-normal);
    color: var(--color-gray-900);
}

.navigation-item-title {
    flex: 1;
    margin-left: 8px;
    font-size: var(--font-size-small);
    color: var(--color-gray-700);
}
</style>

