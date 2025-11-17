<script setup lang="ts">
import FlowCanvas from './Common/FlowCanvas.vue'
import ValueNode from './Nodes/ValueNode.vue'

const nodeTemplates = {
    'node-value': ValueNode
}
</script>

<template>
    <FlowCanvas :nodeType="'workflow'" :node-templates="nodeTemplates" />
</template>

<style scoped></style>
