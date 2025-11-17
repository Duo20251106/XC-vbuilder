<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@vue-flow/core'

import Icon from '../Common/Icon.vue'

const props = defineProps(['id', 'data'])

const operators = ['+', '-', '*', '/']

const { updateNodeData } = useVueFlow()
</script>

<template>
    <div>
        <div class="buttons nodrag">
            <button
                v-for="operator of operators"
                :key="`${id}-${operator}-operator`"
                :class="{ selected: data.operator === operator }"
                @click="updateNodeData(props.id, { operator })"
            >
                <Icon :name="operator" />
            </button>
        </div>

        <!-- 右侧出口连线 -->
        <Handle type="source" :position="Position.Right" :connectable="false" />
        <!-- 左侧入口连线 -->
        <Handle id="target-a" type="target" :position="Position.Left" />
        <Handle id="target-b" type="target" :position="Position.Left" />
    </div>
</template>
