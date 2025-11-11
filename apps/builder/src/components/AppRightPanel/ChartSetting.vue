<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { watch } from 'vue'

import type { ChartBlockInfo, ChartType } from '@/types/block'
import SegmentedControl from '@/ui/SegmentedControl/SegmentedControl.vue'

const props = defineProps<{
    blockInfo: ChartBlockInfo
}>()

const data = [
    {
        label: 'Echarts-Echarts',
        value: 'echarts'
    },
    {
        label: 'Canvas',
        value: 'canvas'
    },
    {
        label: 'SVG',
        value: 'svg'
    }
]

const emit = defineEmits<{
    change: [block: ChartBlockInfo]
}>()

const { values } = useForm({
    initialValues: {
        chartType: props.blockInfo.props.chartType
    }
})

const { value: chartType, handleChange: handleChartTypeChange } = useField<ChartType>('chartType')

watch([values], ([newValues]) => {
    emit('change', { ...props.blockInfo, props: { ...props.blockInfo.props, ...newValues } })
})
</script>

<template>
    <SegmentedControl :value="chartType" :data="data" @change="handleChartTypeChange" />
</template>

<style scoped>
.content-input {
    width: 100%;
    height: 32px;
    margin-top: 8px;
    padding: 0 8px;
    border: 1px solid var(--color-gray-300);
    border-radius: 8px;
    outline-style: none;
    color: var(--color-gray-800);
}
</style>
