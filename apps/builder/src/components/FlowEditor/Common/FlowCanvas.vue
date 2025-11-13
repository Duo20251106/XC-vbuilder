<script setup lang="ts">
import { MiniMap } from '@vue-flow/additional-components'
import type { Edge, Node } from '@vue-flow/core'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { ref } from 'vue'

import useDragAndDrop from '@/hooks/useDnd'
import { useFlowUtils } from '@/hooks/useFlowUtils'

import DropzoneBackground from './DropzoneBackground.vue'
import FlowControls from './FlowControls.vue'
import Sidebar from './Sidebar.vue'

interface Props {
    initialNodes?: Node[]
    initialEdges?: Edge[]
    nodeTemplates: any
    nodeType: string
}

const props = defineProps<Props>()

const nodes = ref<Node[]>(props.initialNodes || []) //节点
const edges = ref<Edge[]>(props.initialEdges || []) //边
const initialNodesSnapshot = JSON.parse(JSON.stringify(props.initialNodes || []))
const { updatePos, logToObject, resetViewport } = useFlowUtils(nodes)
const { onDragOver, onDrop, onDragLeave, isDragOver, onResetNode } = useDragAndDrop(nodes)

/**
 * VueFlow核心钩子
 */
const { onConnect, addEdges } = useVueFlow()

/**
 * 当用户连接两个节点时触发，添加新的连线
 * params：VueFlow 传入的连接数据 { source, target, sourceHandle, targetHandle }
 */
onConnect((params) => addEdges(params))
</script>

<template>
    <div class="flow-canvas" @drop="onDrop">
        <VueFlow
            class="basic-flow"
            :nodes="nodes"
            :edges="edges"
            :default-viewport="{ zoom: 1, x: 300, y: 300 }"
            :min-zoom="0.2"
            :max-zoom="4"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
        >
            <template v-for="(component, slotName) in props.nodeTemplates" #[slotName]="props">
                <component :is="component" v-bind="props" />
            </template>
            <DropzoneBackground
                :style="{
                    backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
                    transition: 'background-color 0.2s ease'
                }"
            >
                <p v-if="isDragOver">Drop here</p>
            </DropzoneBackground>

            <MiniMap />

            <FlowControls
                @reset="resetViewport(onResetNode(initialNodesSnapshot ?? []))"
                @shuffle="updatePos"
                @log="logToObject"
            />
        </VueFlow>

        <Sidebar :nodeType="props.nodeType" />
    </div>
</template>

<style global>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.39.0/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.39.0/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

.flow-canvas,
.basic-flow {
    width: 100%;
    height: 100%;
}

.flow-canvas {
    display: flex;
    flex-direction: row;
}

.vue-flow__minimap {
    transform: scale(75%);
    transform-origin: bottom right;
}

.vue-flow__handle {
    height: 24px;
    width: 10px;
    background: #aaa;
    border-radius: 4px;
}

.vue-flow__edges path {
    stroke-width: 3;
}

.vue-flow__node {
    background-color: #f3f4f6;
}

.vue-flow__node-value {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 8px;
    box-shadow: 0 0 10px #0003;
}

.vue-flow__node-value.selected {
    box-shadow: 0 0 0 2px #ec4899;
}

.vue-flow__node-value input {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 10px #0000001a;
}

.vue-flow__node-value input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ec4899;
    transition: box-shadow 0.2s;
}

.vue-flow__node-value .vue-flow__handle {
    background-color: #ec4899;
}

.vue-flow__node-operator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 0 10px #0003;
}

.vue-flow__node-operator.selected {
    box-shadow: 0 0 0 2px #2563eb;
}

.vue-flow__node-operator .buttons {
    display: flex;
    gap: 8px;
}

.vue-flow__node-operator button {
    border: none;
    cursor: pointer;
    background-color: #4a5568;
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 0 10px #0000004d;
    width: 40px;
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vue-flow__node-operator button svg {
    width: 100%;
    height: 100%;
}

.vue-flow__node-operator button:hover {
    background-color: #2563eb;
    transition: background-color 0.2s;
}

.vue-flow__node-operator button.selected {
    background-color: #2563eb;
}

.vue-flow__node-operator .vue-flow__handle[data-handleid='target-a'] {
    top: 25%;
}

.vue-flow__node-operator .vue-flow__handle[data-handleid='target-b'] {
    top: 75%;
}

.vue-flow__node-operator .vue-flow__handle {
    background-color: #2563eb;
}

.vue-flow__node-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 0 10px #0003;
}

.vue-flow__node-result.selected {
    box-shadow: 0 0 0 2px #5ec697;
}

.vue-flow__node-result .result {
    display: flex;
    gap: 8px;
    font-size: 24px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
    -webkit-appearance: none;
}
</style>
