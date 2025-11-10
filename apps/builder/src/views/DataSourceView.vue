<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
    <div>dataSourceView{{ route.params.id }}</div>
    <RouterView />
</template>

<style scoped></style>
