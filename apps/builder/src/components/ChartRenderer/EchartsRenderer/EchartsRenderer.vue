<script setup lang="ts">
import { GraphChart } from 'echarts/charts'
import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent
} from 'echarts/components'
import { type EChartsType, init, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { MOCK_DATA } from './MOCK_DATA'

// 注册ECharts模块
use([
    CanvasRenderer,
    GraphChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    GridComponent
])

const chartContainer = ref<HTMLDivElement | null>(null)

const chartInstance = ref<EChartsType>()

const resizeHandler = () => {
    chartInstance.value?.resize()
}

const fetchChartData = () => {
    const graph = MOCK_DATA
    graph.nodes.forEach(function (node: any) {
        node.label = {
            show: node.symbolSize > 30 // 为 symbolSize > 30 的节点显示标签
        }
    })
    const options: ECBasicOption = {
        title: {
            text: 'XC',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [
            {
                data: graph.categories.map(function (a: any) {
                    return a.name
                }),
                top: 'top',
                left: 'center'
            }
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'XC',
                type: 'graph',
                layout: 'circular',
                circular: {
                    rotateLabel: true
                },
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: false, //禁止缩放和平移
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                }
            }
        ]
    }

    chartInstance.value?.setOption(options)
}
let ro = ref()
onMounted(() => {
    if (!chartContainer.value) return
    chartInstance.value = init(chartContainer.value)

    fetchChartData()

    window.addEventListener('resize', resizeHandler)

    ro.value = new ResizeObserver(() => {
        chartInstance.value?.resize()
    })
    ro.value.observe(chartContainer.value)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
    chartInstance.value?.dispose()
    ro.value.disconnect()
})
</script>

<template>
    <div class="chart-container" ref="chartContainer"></div>
</template>

<style scoped>
.chart-container {
    width: 100%;
    height: 500px;
}
</style>
