<script setup lang="ts">
import { Plus } from '@icon-park/vue-next'

import ActionList from './ActionList.vue'
</script>

<template>
    <div class="actions-left-panel-wrapper">
        <div class="drawer-header">
            <h3 class="drawer-title">ACTIONS</h3>
            <button class="drawer-component-adder">
                <Plus size="18" />
            </button>
        </div>
        <div class="drawer-content">
            <ActionList />
        </div>
    </div>
</template>

<style scoped>
.actions-left-panel-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 4;
    width: var(--layout-left-panel-width);
    height: 100%;
    border-right: 1px solid var(--color-gray-200);
}

.drawer-header {
    display: flex;
    position: sticky;
    justify-content: space-between;
    align-items: center;
    top: 0;
    font-weight: var(--font-weight-bolder);
    padding: 12px 10px 12px 20px;
    background-color: var(--color-white);
}

.drawer-content {
    padding: 0 10px;
}

.drawer-component-adder {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    margin-left: 10px;
    background-color: var(--color-gray-300);
    color: var(--color-black);
    cursor: pointer;
    box-shadow:
        rgba(62, 65, 86, 0.25) 0px 0px 1px,
        rgba(62, 65, 86, 0.1) 0px 4px 8px;
}
</style>
