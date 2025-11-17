<script setup lang="ts">
import DataSourceList from './DataSourceList.vue'
</script>

<template>
    <div class="data-source-left-panel-wrapper">
        <div class="drawer-header">
            <h3 class="drawer-title">SHEETS</h3>
        </div>
        <div class="drawer-content">
            <DataSourceList />
        </div>
    </div>
</template>

<style scoped>
.data-source-left-panel-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 4;
    width: 300px;
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
</style>
