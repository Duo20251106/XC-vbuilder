<script setup lang="ts">
import { Delete, Drag } from '@icon-park/vue-next'
import { dropHandlers, smoothDnD } from 'smooth-dnd'
import { inject, ref } from 'vue'

import { useAppEditorStore } from '@/stores/appEditor'

defineProps<{
    block: BlockInfo
    i: number
}>()

import { storeToRefs } from 'pinia'

import type { BlockInfo } from '@/types/block'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler

const blockWrapperRef = ref<HTMLElement | null>(null) // 每个 block 外层容器一个 ref（DOM 引用）
const appEditorStore = useAppEditorStore()

const { currentBlockId, blocks } = storeToRefs(appEditorStore)
const { selectBlock } = appEditorStore

const editable = inject('editable', true)
</script>

<template>
    <div class="block-wrapper" ref="blockWrapperRef" @click.stop="selectBlock(block.id)">
        <!-- @vue-ignore -->
        <component :is="$blocksMap[block.type].material" class="block" :blockInfo="block" />
        <div
            v-if="editable"
            :class="['block-wrapper-indicator', { selected: currentBlockId === block.id }]"
        >
            <div class="block-toolbar" v-if="currentBlockId === block.id">
                <div class="block-toolbar-item handle">
                    <!-- 外层的SmoothDndContainer中drag-handle-selector=".handle"-->
                    <!-- 点击这个图标拖动时，smooth-dnd会检测到事件来源是.handle -->
                    <drag />
                </div>
                <div class="block-toolbar-item" @click="blocks.splice(i, 1)">
                    <delete />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.block-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 16px;
    padding: 6px 4px;
    background-color: var(--color-white);
    transition: box-shadow 0.2s ease-in-out;
}

.block {
    position: relative;
    z-index: 1;
}

.block-wrapper-indicator {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 8px;
    pointer-events: none;
    user-select: none;
}

.block-wrapper-indicator.shown {
    border: 1px dashed var(--color-gray-300);
}

.block-wrapper-indicator.selected {
    border: 1px solid var(--color-primary);
}

.block-toolbar {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: -36px;
    z-index: 2;
    padding: 4px 8px;
    gap: 4px;
    background-color: var(--color-black);
    border-radius: 6px;
    pointer-events: visible;
}

.block-toolbar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    color: var(--color-white);
    cursor: pointer;
}

.block-toolbar-item:nth-of-type(1) {
    cursor: grab;
}

.block-toolbar-item:hover {
    background-color: var(--color-gray-800);
    transition: all 0.2s ease-in-out;
}

.block-wrapper.debug:hover .block-wrapper-senior {
    border-style: solid;
    transition: box-shadow 0.2s ease-in-out;
}
</style>

<style lang="css">
.smooth-dnd-draggable-wrapper {
    overflow: visible !important;
}
</style>
