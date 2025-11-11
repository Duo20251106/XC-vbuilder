import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

import { findColors } from '../helper'

export const ColorHighlighter = Extension.create({
    name: 'colorHighlighter',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    //初始化插件状态
                    init(_, { doc }) {
                        return findColors(doc)
                    },
                    //每次编辑器变化时都会调用
                    apply(transaction, oldState) {
                        //transaction:当前事务
                        //如果文档发生变化，重新计算
                        return transaction.docChanged ? findColors(transaction.doc) : oldState
                    }
                },
                props: {
                    //每次渲染编辑器时，ProseMirror 会调用它来获取当前状态下需要显示的装饰
                    decorations(state) {
                        return this.getState(state)
                    }
                }
            })
        ]
    }
})
