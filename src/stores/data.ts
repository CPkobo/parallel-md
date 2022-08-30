import { defineStore } from "pinia";
import type { TableData } from '@arco-design/web-vue'
import { qaNum } from '@/qa/qaNums'

interface SrcTgtState {
    srcs: string[];
    tgts: string[];
    qas: QaResultInfo[][];
}

const data: SrcTgtState = {
    srcs: [],
    tgts: [],
    qas: [],
}

export const useSrcTgt = defineStore('srctgt', {
    state: () => data,
    actions: {
        setData(srcs: string[], tgts: string[]) {
            this.srcs = srcs
            this.tgts = tgts
            this.qas.length = 0
        },
        execQa() {
            const longer = Math.max(this.srcs.length, this.tgts.length)
            for (let i = 0; i < longer; i++) {
                const src = this.srcs[i] || ''
                const tgt = this.tgts[i] || ''
                qaNum(src, tgt)
                    .then(result => {
                        this.qas.push(result)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        }
    },
    getters: {
        table: (state): TableData[] => {
            const tableData: TableData[] = []
            const longer = Math.max(state.srcs.length, state.tgts.length)
            for (let i = 0; i < longer; i++) {
                const src = state.srcs[i] || ''
                const tgt = state.tgts[i] || ''
                const qas = state.qas[i] || []
                const qa: string[] = []
                qas.forEach(q => {
                    qa.push(`${q.sInfo} vs ${q.tInfo}`)
                })
                tableData.push({ key: `${i}`, src, tgt, qa })
            }
            return tableData
        }
    },
})