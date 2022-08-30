import { defineStore } from "pinia";
import { marked } from 'marked'
import type { TableData } from '@arco-design/web-vue'

interface SrcTgtState {
    srcs: string[];
    tgts: string[];
}

const data: SrcTgtState = {
    srcs: [],
    tgts: []
}

export const useSrcTgt = defineStore('srctgt', {
    state: () => data,
    actions: {
        setData(srcs: string[], tgts: string[]) {
            this.srcs = srcs
            this.tgts = tgts
        }
    },
    getters: {
        table: (state): TableData[] => {
            const tableData: TableData[] = []
            const longer = Math.max(state.srcs.length, state.tgts.length)
            for (let i = 0; i < longer; i++) {
                const src = state.srcs[i] || ''
                const tgt = state.tgts[i] || ''
                tableData.push({ key: `${i}`, src, tgt })
            }
            return tableData
        }
    }
})