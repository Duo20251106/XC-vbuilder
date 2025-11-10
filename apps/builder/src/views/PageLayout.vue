<script setup lang="ts">
import AppEditorRender from '@/components/AppEditorRender/AppEditorRender.vue'
import AppLeftPanel from '@/components/AppLeftPanel/AppLeftPanel.vue'
import AppRightPanel from '@/components/AppRightPanel/AppRightPanel.vue'
</script>

<template>
    <div class="layout-wrapper">
        <AppLeftPanel />
        <AppEditorRender />
        <AppRightPanel />
    </div>
</template>

<style scoped>
.layout-wrapper {
    display: flex;
    height: 100%;
}
</style>
