import { useVueFlow } from '@vue-flow/core'

export function useFlowUtils(nodesRef: any) {
    const { setViewport, toObject } = useVueFlow()

    /**
     * 随机修改节点的坐标
     */
    const updatePos = () => {
        nodesRef.value.forEach((el: any) => {
            el.position = { x: Math.random() * 400, y: Math.random() * 400 }
        })
    }

    /**
     * 导出当前图结构JSON
     */
    const logToObject = () => {
        // eslint-disable-next-line no-console
        console.log(toObject())
    }

    /**
     * 重置视图
     */
    const resetViewport = (fn?: any) => {
        if (fn) fn()
        else setViewport({ x: 0, y: 0, zoom: 1 })
    }

    return { updatePos, logToObject, resetViewport }
}
