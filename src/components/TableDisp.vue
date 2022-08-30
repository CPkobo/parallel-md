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
</script>

<template>
    <a-table :columns="columns" :data="data.table" :pagination="false">
    </a-table>
</template>
