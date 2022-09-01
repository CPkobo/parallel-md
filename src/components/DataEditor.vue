<template>
    <div>
        <CmEditor :value="text" :options="cmOptions" placeholder="test placeholder" @ready="ready" @change="change"
            @cursor-activity="cursorActivity" />
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps } from "vue";
import CmEditor, { CodeMirror } from "codemirror-editor-vue3";

// language
import "codemirror/mode/markdown/markdown";
// theme
import "./dracula.css";
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/fold/foldcode.js'

import { useSrcTgt } from "@/stores/data";
import { Editor, EditorConfiguration, defineMode } from "codemirror";
import { storeToRefs } from "pinia";
import { checkModeFactory, state } from './check'

let cm_: Editor;
const ready = (cm: Editor) => {
    cm_ = cm
}

interface Props {
    isSrc: boolean
}

defineMode('check', () => checkModeFactory({}, state))
const props = defineProps<Props>()
const data = useSrcTgt()
const { src, tgt, sline, tline } = storeToRefs(data)
const text = props.isSrc ? src : tgt
const myline = props.isSrc ? 'sline' : 'tline'
const crtline = ref(0)
data.$subscribe((mutation, state) => {
    // console.log(state[myline])
    if (state.isInSrc !== props.isSrc) {
        if (crtline.value !== state[myline]) {
            crtline.value = state[myline]
            cm_.setCursor(crtline.value)
        }
    }
})


const cmOptions: EditorConfiguration = {
    mode: "check", // Language mode
    theme: "dracula", // Theme
    lineNumbers: true, // Show line number
    smartIndent: true, // Smart indent
    indentUnit: 2, // The smart indent unit is 2 spaces in length
    // foldGutter: true, // Code folding
    styleActiveLine: true, // Display the style of the selected row
    // gutters: ['10'],
    // lineSeparator: '---',
    lineWrapping: true,
    extraKeys: {
        'Ctrl-Down': (cm: Editor) => { console.log(63); cm.foldCode(crtline.value, {}, 'fold') },
        'Ctrl-Up': (cm: Editor) => { console.log(64); cm.foldCode(crtline.value, {}, 'unfold') },
        // 'Shift-Enter': (cm: Editor) => { console.log(65) }
    }
}

const change = (value: string, cm: Editor) => {
    data.setText(value, props.isSrc)
}

const cursorActivity = (cm: Editor) => {
    const { line } = cm.getCursor()
    if (line !== crtline.value) {
        crtline.value = line
        data.setAnotherLine(line, props.isSrc)
        // console.log('cursol activity in:' + myline)
    }
}
</script>