<script setup lang="ts">
import AppEditorRender from '@/components/AppEditorRender/AppEditorRender.vue'
import AppLeftPanel from '@/components/AppLeftPanel/AppLeftPanel.vue'
import AppRightPanel from '@/components/AppRightPanel/AppRightPanel.vue'
</script>

<template>
    <div class="layout-wrapper">
        <el-splitter>
            <el-splitter-panel size="270">
                <AppLeftPanel />
            </el-splitter-panel>
            <el-splitter-panel>
                <AppEditorRender />
            </el-splitter-panel>
            <el-splitter-panel size="300">
                <AppRightPanel />
            </el-splitter-panel>
        </el-splitter>
    </div>
</template>

<style scoped>
.layout-wrapper {
    display: flex;
    height: 100%;
}
</style>
