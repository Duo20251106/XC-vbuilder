<script setup lang="ts">
import { RouterView } from 'vue-router'

import ActionsLeftPanel from '@/components/ActionsLeftPanel/ActionsLeftPanel.vue'
</script>

<template>
    <div class="actions-wrapper">
        <ActionsLeftPanel />
        <RouterView />
    </div>
</template>

<style scoped>
.actions-wrapper {
    display: flex;
    height: 100%;
}
</style>
