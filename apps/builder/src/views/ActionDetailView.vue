<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import FlowMath from '@/components/FlowEditor/FlowMath.vue'
import FlowWorker from '@/components/FlowEditor/FlowWorker.vue'

const route = useRoute()

const pages = [
    {
        id: 1,
        component: FlowMath
    },
    {
        id: 2,
        component: FlowWorker
    }
]

const page = computed(() => {
    const pageId = parseInt(route.params.id as string)
    return pages.find((item) => item.id === pageId)?.component
})
</script>

<template>
    <component :is="page"></component>
</template>
