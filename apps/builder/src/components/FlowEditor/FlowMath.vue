<script setup lang="ts">
import FlowCanvas from './Common/FlowCanvas.vue'
import { initialMathEdges, initialMathNodes } from './initial-elements'
import OperatorNode from './Nodes/OperatorNode.vue'
import ResultNode from './Nodes/ResultNode.vue'
import ValueNode from './Nodes/ValueNode.vue'

const nodeTemplates = {
    'node-value': ValueNode,
    'node-operator': OperatorNode,
    'node-result': ResultNode
}
</script>

<template>
    <FlowCanvas
        :initial-nodes="initialMathNodes"
        :initial-edges="initialMathEdges"
        :nodeType="'math'"
        :node-templates="nodeTemplates"
    />
</template>

<style global>
.vue-flow__handle {
    height: 24px;
    width: 10px;
    background: #aaa;
    border-radius: 4px;
}
</style>
