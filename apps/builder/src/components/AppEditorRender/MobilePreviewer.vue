<script setup lang="ts">
import { ref } from 'vue'

import MobilePreviewer from '../AppPreviewer/MobilePreviewer.vue'
import PreviewModeSwitcher from './PreviewModeSwitcher.vue'
import StatusBar from './StatusBar.vue'
import TabBar from './TabBar.vue'
import type { PreviewType } from './type'

const props = defineProps<{
    previewMode?: PreviewType
}>()

const runner = ref<HTMLElement | null>(null)

const emit = defineEmits<{
    'preview-mode-change': [mode: PreviewType]
}>()

function greet(mode: PreviewType) {
    emit('preview-mode-change', mode)
}
</script>

<template>
    <div class="layout-runner" ref="runner">
        <div class="layout-runner-navigator">
            <PreviewModeSwitcher :preview-mode="props.previewMode" @preview-mode-change="greet" />
        </div>
        <div class="simulator-wrapper">
            <div class="simulator-header">
                <StatusBar />
            </div>
            <div class="simulator-content">
                <MobilePreviewer />
            </div>
            <div class="simulator-home-bar">
                <TabBar />
            </div>
        </div>
    </div>
</template>

<style scoped>
.layout-runner {
    flex: 1;
    height: 98%;
}

.layout-runner-navigator {
    height: 42px;
    display: grid;
    font-size: var(--font-size-normal);
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 0 16px;
    background-color: var(--color-gray-100);
    width: 100%;
}

.simulator-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 42px);
    width: 393px;
    margin: 0 auto;
    border-radius: 55px;
    overflow: hidden;
    overflow-y: auto;
    background-color: pink;
    box-shadow:
        0 0 0 5px #151515,
        0 0 0 6px var(--color-theme-bg),
        0 -7.5px 1.5px rgb(255 255 255 / 40%),
        7.5px 0 1.5px rgb(255 255 255 / 25%),
        -7.5px 0 1.5px rgb(255 255 255 / 40%),
        0 7.5px 1.5px rgb(255 255 255 / 25%),
        0 0 0 9px var(--color-theme-bg),
        6px 8px 16px rgb(0 0 0 / 25%),
        20px 32px 72px rgb(0 0 0 / 20%);
}

.simulator-wrapper::-webkit-scrollbar {
    display: none;
}

.simulator-header {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: var(--color-theme-bg);
}

.simulator-content {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.simulator-content::-webkit-scrollbar {
    display: none;
}

.simulator-home-bar {
    width: 100%;
    height: 34px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;
    overflow: hidden;
    background: transparent;
}
</style>
