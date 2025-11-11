<script setup lang="ts">
import { Strikethrough, TextBold, TextItalic } from '@icon-park/vue-next'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent,useEditor } from '@tiptap/vue-3'
import { inject } from 'vue'

import { ColorHighlighter } from './extensions/ColorHighlighter'

const editable = inject('editable', true)

const editor = useEditor({
    editable,
    extensions: [
        //tarterKit 默认包含 TipTap 中最常用的节点（nodes）和标记（marks）：
        StarterKit.configure({
            bold: {
                HTMLAttributes: {
                    class: 'custom-bold' // 给 <strong> 标签加一个 class
                }
            }
        }),
        ColorHighlighter
    ],
    content: `
    <p></p>
    <p>我正在使用 Vue.js 运行 Tiptap。 🎉</p>
    <p>您还可以教给编辑器新事物。例如，识别十六进制颜色并添加颜色</p>
    <p>动态颜色：#401f3e #3f2e56、#faf2a1、#759aab、#FD9170、#453f78、#68CEF8、#80cbc4、#9DEF8F</p>
    <p></p>
`
})
</script>

<template>
    <div :class="['notes-editor-wrapper', editable && 'editable']">
        <div v-if="editable" class="notes-editor-header">
            <button
                class="notes-editor-header-button"
                @click="editor?.chain().focus().toggleBold().run()"
            >
                <text-bold />
            </button>
            <button
                class="notes-editor-header-button"
                @click="editor?.chain().focus().toggleItalic().run()"
            >
                <text-italic />
            </button>
            <button
                class="notes-editor-header-button"
                @click="editor?.chain().focus().toggleStrike().run()"
            >
                <strikethrough />
            </button>
        </div>
        <editor-content class="notes-editor-content" :editor="editor" />
    </div>
</template>

<style scoped>
.notes-editor-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 4;
    height: 100%;
}
.notes-editor-wrapper.editable {
    border: 1px solid var(--color-gray-300);
    border-radius: 6px;
}

.notes-editor-header {
    display: flex;
    padding: 8px 12px;
    font-size: var(--font-size-large);
    background-color: var(--color-gray-200);
}

.notes-editor-header-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    background-color: transparent;
}

.notes-editor-header-button:hover {
    background-color: var(--color-gray-300);
}

.notes-editor-content {
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 8px 12px;
}
</style>

<style lang="css">
/* Basic editor styles */
/* stylelint-disable */
.ProseMirror {
    font-size: var(--font-size-large);
    outline: none;
    font-weight: normal;
    > * + * {
        margin-top: 0.75em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }
}

/* Color swatches */
.color {
    white-space: nowrap;

    &::before {
        content: ' ';
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid rgba(128, 128, 128, 0.3);
        vertical-align: middle;
        margin-right: 0.1em;
        margin-bottom: 0.15em;
        border-radius: 2px;
        background-color: var(--color);
    }
}
</style>
