import { type Node, useVueFlow, type XYPosition } from '@vue-flow/core'
import { type Ref, ref, watch } from 'vue'

let id = 0

/** 生成唯一节点 ID */
function getId(): string {
    return `dndNode_${id++}`
}

interface DragState {
    draggedType: Ref<string | null>
    isDragOver: Ref<boolean>
    isDragging: Ref<boolean>
}

const state: DragState = {
    draggedType: ref<string | null>(null),
    isDragOver: ref<boolean>(false),
    isDragging: ref<boolean>(false)
}

export default function useDragAndDrop(nodes?: Ref<Node[]>) {
    const { draggedType, isDragOver, isDragging } = state

    const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

    // 在拖拽时禁用文本选中
    watch(isDragging, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : ''
    })

    /**
     * 拖拽开始
     */
    function onDragStart(event: DragEvent, type: string) {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/vueflow', type)
            event.dataTransfer.effectAllowed = 'move'
        }

        draggedType.value = type
        isDragging.value = true

        document.addEventListener('drop', onDragEnd)
    }

    /**
     * 拖拽经过画布
     */
    function onDragOver(event: DragEvent) {
        event.preventDefault()

        if (draggedType.value) {
            isDragOver.value = true

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move'
            }
        }
    }

    /**
     * 拖离画布
     */
    function onDragLeave() {
        isDragOver.value = false
    }

    /**
     * 拖拽结束
     */
    function onDragEnd() {
        isDragging.value = false
        isDragOver.value = false
        draggedType.value = null
        document.removeEventListener('drop', onDragEnd)
    }

    /**
     * 放下节点到画布
     */
    function onDrop(event: DragEvent) {
        event.preventDefault()

        if (!draggedType.value) return

        const [type, nodeType] = draggedType.value.split('-')

        const position: XYPosition = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY
        })

        const nodeId = getId()

        const newNode: Node = {
            id: nodeId,
            type,
            position,
            data: { label: nodeId, value: nodeType ?? 0, nodeType: nodeType || 'value' }
        }

        // 放置后居中对齐
        const { off } = onNodesInitialized(() => {
            updateNode(nodeId, (node) => ({
                position: {
                    x: node.position.x - (node.dimensions?.width || 0) / 2,
                    y: node.position.y - (node.dimensions?.height || 0) / 2
                }
            }))
            off()
        })

        addNodes(newNode)
        nodes?.value.push(newNode)
    }

    function onResetNode(newNodes: any) {
        if (nodes) nodes.value = newNodes
    }

    return {
        draggedType,
        isDragOver,
        isDragging,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
        onResetNode
    }
}
