import { Node } from '@tiptap/pm/model'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

/**
 * 扫描文档所有文本节点，找出符合十六进制颜色格式的文本，并为他们生成inline装饰
 * @param doc node
 * @returns
 */
export function findColors(doc: Node): DecorationSet {
    const hexColor = /(#[0-9a-f]{3,6})\b/gi
    const decorations: Decoration[] = []

    doc.descendants((node, position) => {
        //遍历文档节点，position：当前节点在文档中的起始偏移量
        if (!node.text) {
            return
        }

        Array.from(node.text.matchAll(hexColor)).forEach((match) => {
            const color = match[0]
            const index = match.index || 0
            const from = position + index
            const to = from + color.length
            const decoration = Decoration.inline(from, to, {
                class: 'color',
                style: `--color: ${color}`
            })

            decorations.push(decoration)
        })
    })

    return DecorationSet.create(doc, decorations)
}
