<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { dropHandlers, type DropResult, smoothDnD } from 'smooth-dnd'
import { toRaw } from 'vue'

import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable'
import { useAppEditorStore } from '@/stores/appEditor'
import { arrayMove } from '@/utils/array'

import BlockRenderer from './BlockRenderer.vue'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler

const appEditorStore = useAppEditorStore()

// store内部的数据是响应式的，如果直接解构，响应式会丢失
const { blocks } = storeToRefs(appEditorStore)
const { updateBlocks } = appEditorStore

/**
 *
 * 返回newBlocks
 * @param arr 原blocks集
 * @param dragResult 拖拽结果信息
 */
const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dragResult

    const result = [...arr]

    //情况1：拖出容器->不处理
    // addedIndex: 拖动元素被放入新容器的位置索引，如果是拖出容器，这里为null
    if (addedIndex === null) return result

    //情况2：从外部拖入进容器 -> 插入新元素
    // removedIndex: 被拖动元素在原数组中的索引。如果是从外部容器拖入，这里为null
    if (addedIndex !== null && removedIndex === null) {
        result.splice(addedIndex, 0, {
            id: `${Math.random()}`,
            ...payload //拖动数据载荷
        })
    }

    // 情况3：容器内部的移动 -> 删除原来位置，添加新位置
    if (addedIndex !== null && removedIndex !== null) {
        return arrayMove(result, removedIndex, addedIndex)
    }

    return result
}
</script>

<template>
    <smooth-dnd-container
        drag-handle-selector=".handle"
        group-name="blocks"
        orientation="vertical"
        tag="div"
        class="renderer-dnd-container"
        @drop="updateBlocks(applyDrag(toRaw(blocks), $event))"
    >
        <smooth-dnd-draggable v-for="(block, i) in blocks" :key="block.id">
            <BlockRenderer :block="block" :i="i" />
        </smooth-dnd-draggable>
    </smooth-dnd-container>
</template>

<style scoped>
.renderer-dnd-container {
    width: 100%;
}
</style>

<style lang="css">
.smooth-dnd-draggable-wrapper {
    overflow: visible !important;
}
</style>
