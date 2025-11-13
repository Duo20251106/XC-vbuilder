<script setup lang="ts">
import { Delete,Log, Resting, Shuffle } from '@icon-park/vue-next'
import { Panel } from '@vue-flow/core'
</script>

<template>
    <Panel position="top-right" class="controls">
        <div class="control-btn" title="Reset Transform" @click="$emit('reset')">
            <Resting />
        </div>

        <div class="control-btn" title="Shuffle Node Positions" @click="$emit('shuffle')">
            <Shuffle />
        </div>

        <div class="control-btn" title="Log `toObject`" @click="$emit('log')">
            <Log />
        </div>

        <div class="control-btn" title="delete node" @click="$emit('delete')">
            <Delete />
        </div>
    </Panel>
</template>

<style scoped>
.controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: var(--color-gray-100);
    border: 1px solid var(--color-gray-300);
    box-shadow: rgb(0 0 0 / 10%) 1px 2px 20px;
}
.control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    color: var(--color-gray-800);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
.control-btn:hover {
    background-color: var(--color-gray-300);
    transition: all 0.2s ease-in-out;
}
</style>
