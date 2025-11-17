<script setup lang="ts">
const props = defineProps<{
    id: string
    data: { label: string; value: string }
}>()
</script>

<template>
    <div class="input-node">
        <label>{{ props.data.label }}</label>
        <input v-model="props.data.value" />
    </div>
</template>

<style scoped>
.input-node {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    min-width: 120px;
}
.input-node input {
    width: 100%;
    margin-top: 4px;
}
</style>
