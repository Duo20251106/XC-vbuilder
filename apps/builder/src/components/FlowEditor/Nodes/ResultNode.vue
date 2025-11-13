<script setup lang="ts">
import { Handle, Position, useHandleConnections, useNodesData, useVueFlow } from '@vue-flow/core'
import { computed } from 'vue'

defineProps(['id'])

// eslint-disable-next-line no-unused-vars
const mathFunctions: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (b !== 0 ? a / b : 0)
}

// VueFlow 实例
const { getConnectedEdges } = useVueFlow()

// 获取当前节点的输入连接
const sourceConnections = useHandleConnections({
    // 当前节点作为 目标节点（Target），即有线“指向”它
    // 这些连接的源头（source）就是它要读取数据的上游节点
    type: 'target'
})

// 获取上游的“运算符节点”
const operatorSourceConnections = computed(() => {
    const firstConnection = sourceConnections.value[0]
    if (!firstConnection?.source) return []

    // sourceConnections.value[0].source 是连接到当前节点的“运算符节点 ID”
    // getConnectedEdges(id) 获取该运算符节点的所有连线。
    return getConnectedEdges(firstConnection.source).filter(
        // 得到连接到该运算符节点的“数值节点”
        (e) => e.source !== firstConnection.source
    )
})

// 返回与当前节点相连的上游“运算符节点”的数据
const operatorData = useNodesData(() =>
    sourceConnections.value.map((connection) => connection.source)
)

// 返回所有上游“数值节点”的数据
const valueData = useNodesData(() =>
    operatorSourceConnections.value.map((connection) => connection.source)
)

const result = computed(() => {
    const currResult = operatorData.value.reduce((acc, { data }) => {
        const operator = data?.operator

        if (operator) {
            const values = valueData.value.map(({ data }) => data?.value ?? 0)
            return values.reduce((acc, val) => mathFunctions[operator]?.(acc, val), 0)
        }

        return acc
    }, 0)

    return Math.round(currResult * 100) / 100
})
</script>

<template>
    <div>
        <div class="calculation">
            <template v-for="(value, i) in valueData" :key="`${value.id}-${value.data}`">
                <span>
                    {{ value.data?.value }}
                </span>

                <span v-if="i !== valueData.length - 1">
                    {{ operatorData[0]?.data?.operator }}
                </span>
            </template>
        </div>

        <span> = </span>

        <span class="result" :style="{ color: result > 0 ? '#5EC697' : '#f15a16' }">
            {{ result }}
        </span>

        <Handle
            type="target"
            :position="Position.Left"
            :connectable="false"
            :style="{ background: result > 0 ? '#5EC697' : '#f15a16' }"
        />
    </div>
</template>
