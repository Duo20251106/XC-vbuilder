<script setup lang="ts">
import { GraphChart } from 'echarts/charts'
import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent
} from 'echarts/components'
import { init, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { onBeforeUnmount, onMounted, ref } from 'vue'

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

const chartInstance = ref()

const resizeHandler = () => {
    chartInstance.value?.resize()
}

const fetchChartData = () => {
    // fetch data from server
    fetch('/charts/examples/data/asset/data/les-miserables.json')
        .then((res) => res.json())
        .then((graph) => {
            graph.nodes.forEach(function (node: any) {
                node.label = {
                    show: node.symbolSize > 30 // 为 symbolSize > 30 的节点显示标签
                }
            })
            const options = {
                title: {
                    text: 'XC',
                    subtext: 'Circular layout',
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
                        roam: true,
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

            chartInstance.value.setOption(options)
        })
}

onMounted(() => {
    if (!chartContainer.value) return
    chartInstance.value = init(chartContainer.value)

    fetchChartData()

    window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
    chartInstance.value?.dispose()
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
