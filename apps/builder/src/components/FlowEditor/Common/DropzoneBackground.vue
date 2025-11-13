<script lang="ts" setup>
import { Background } from '@vue-flow/additional-components'
</script>

<template>
    <div class="dropzone-background">
        <Background :gap="12" />

        <div class="overlay">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.dropzone-background {
    position: relative;
    height: 100%;
    width: 100%;
}

.dropzone-background .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    pointer-events: none;
}
</style>
