import { defineStore } from "pinia";
import type { TableData } from '@arco-design/web-vue'
import { qaNum } from '@/qa/qaNums'

interface SrcTgtState {
    src: string;
    tgt: string;
    esrc: string;
    etgt: string;
    srcs: string[];
    tgts: string[];
    qas: QaResultInfo[][];
    sline: number;
    tline: number;
    isInSrc: boolean
}

const data: SrcTgtState = {
    src: '',
    tgt: '',
    esrc: '',
    etgt: '',
    srcs: [],
    tgts: [],
    qas: [],
    sline: 0,
    tline: 0,
    isInSrc: true
}

export const useSrcTgt = defineStore('srctgt', {
    state: () => data,
    actions: {
        setData(srcs: string[], tgts: string[]) {
            this.srcs = srcs.filter(val => {
                const v = val.replaceAll(' ', '')
                return v !== ''
            })
            this.tgts = tgts.filter(val => {
                const v = val.replaceAll(' ', '')
                return v !== ''
            })
            this.src = this.srcs.join('\n')
            this.tgt = this.tgts.join('\n')
            this.esrc = this.src
            this.etgt = this.tgt
            this.qas.length = 0
        },
        setText(text: string, isSrc: boolean) {
            if (isSrc) {
                this.esrc = text
            }
            else {
                this.etgt = text
            }
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
        },
        setAnotherLine(line: number, isSrc: boolean) {
            this.isInSrc = isSrc
            if (isSrc) {
                this.tline = line
            }
            else {
                this.sline = line
            }
        },
        resplit() {
            this.srcs = this.esrc.split('\n')
            this.tgts = this.etgt.split('\n')
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