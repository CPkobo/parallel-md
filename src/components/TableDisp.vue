<script setup lang="ts">
import { useSrcTgt } from '@/stores/data';
import type { TableColumnData } from '@arco-design/web-vue';
const data = useSrcTgt()
const columns: TableColumnData[] = [
    {
        title: 'Source',
        dataIndex: 'src'
    },
    {
        title: 'Target',
        dataIndex: 'tgt'
    },
    {
        title: 'QA',
        dataIndex: 'qa'
    }
]

const copyText = (type: 'src' | 'tgt') => {
    let text = ''
    if (type === 'src') {
        text = data.srcs.join('\n')
    }
    else {
        text = data.tgts.join('\n')
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
    }
}

const execQa = () => {
    data.execQa()
}

const downloadCSV = () => {
    const srcs = data.srcs
    const tgts = data.tgts
    const longer = Math.max(srcs.length, tgts.length)
    const csv: string[] = []
    for (let i = 0; i < longer; i++) {
        const src = srcs[i].trim() || ''
        const tgt = tgts[i].trim() || ''
        csv.push(`"${src}", "${tgt}"`)
    }
    const file = new Blob([csv.join('\n')])
    const atag = document.createElement('a')
    atag.href = window.URL.createObjectURL(file)
    atag.download = `${srcs[0]}.csv`
    atag.click()
}
</script>

<template>
    <a-card>
        <a-table :columns="columns" :data="data.table" :pagination="false" column-resizable :sticky-header="0">
        </a-table>
        <a-divider />
        <a-space>
            <a-button type="primary" @click="() => copyText('src')">Copy Source</a-button>
            <a-button type="primary" @click="() => copyText('tgt')">Copy Target</a-button>
            <a-button type="secondary" @click="execQa">QA</a-button>
            <a-button type="dashed" @click="downloadCSV">Download CSV</a-button>
        </a-space>
    </a-card>
</template>
