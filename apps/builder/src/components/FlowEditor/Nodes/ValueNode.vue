<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { computed } from 'vue'

import type { NodeType } from '../type'

interface NodeData {
    label: string
    value: number
    nodeType?: NodeType
}

const props = defineProps<{
    id: string
    data: NodeData
    type: string
}>()

const { updateNodeData } = useVueFlow()

const value = computed({
    get: () => props.data.value,
    set: (value) => updateNodeData(props.id, { value })
})

const nodeConfig = {
    input: { top: false, bottom: true, right: false, type: 'text' },
    default: { top: true, bottom: true, right: false, type: 'text' },
    output: { top: true, bottom: false, right: false, type: 'text' },
    value: { top: false, bottom: false, right: true, type: 'number' }
} as const

const currentConfig = computed(() => nodeConfig[props.data.nodeType || 'value'])
</script>

<template>
    <input :id="`${id}-input`" v-model="value" :type="currentConfig.type" class="nodrag" />

    <Handle v-if="currentConfig.bottom" type="source" :position="Position.Bottom" />
    <Handle v-if="currentConfig.top" type="target" :position="Position.Top" />
    <Handle v-if="currentConfig.right" type="source" :position="Position.Right" />
</template>
