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
</script>

<template>
    <a-card>
        <a-table :columns="columns" :data="data.table" :pagination="false" column-resizable :sticky-header="0">
        </a-table>
        <a-space>
            <a-button type="primary" @click="() => copyText('src')">Copy Source</a-button>
            <a-button type="primary" @click="() => copyText('tgt')">Copy Target</a-button>
        </a-space>
    </a-card>
</template>
