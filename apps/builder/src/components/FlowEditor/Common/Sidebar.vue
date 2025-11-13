<script setup lang="ts">
import { computed } from 'vue'

import useDragAndDrop from '@/hooks/useDnd'

const props = defineProps<{
    nodeType: 'math' | 'workflow'
}>()

const { onDragStart } = useDragAndDrop()

const nodesConfig = computed(() => {
    if (props.nodeType === 'math') {
        return [{ label: 'Number Node', type: 'value', class: 'vue-flow__node-input' }]
    } else {
        return [
            { label: 'Input Node', type: 'value-input', class: 'vue-flow__node-input' },
            { label: 'Default Node', type: 'value-default', class: 'vue-flow__node-default' },
            { label: 'Output Node', type: 'value-output', class: 'vue-flow__node-output' }
        ]
    }
})
</script>

<template>
    <aside>
        <div class="nodes">
            <div
                v-for="node in nodesConfig"
                :key="node.type"
                :class="node.class"
                :draggable="true"
                @dragstart="onDragStart($event, node.type)"
            >
                {{ node.label }}
            </div>
        </div>
    </aside>
</template>

<style scoped>
aside {
    width: var(--layout-right-panel-width);
    color: var(--color-white);
    font-weight: 700;
    border-right: 1px solid #eee;
    padding: 15px 10px;
    font-size: 12px;
    background-color: var(--color-white);
    border-left: 1px solid var(--color-gray-200);
}

aside .nodes > * {
    width: 100%;
    margin-bottom: 10px;
    cursor: grab;
    font-weight: 500;
}
</style>
