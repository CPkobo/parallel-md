<template>
    <div>
        <TableDisp v-if="views.isTable" />
        <EditorDisp v-else />
    </div>
</template>

<script setup lang="ts">
import { useViews } from '@/stores/views';
import TableDisp from './TableDisp.vue';
import EditorDisp from './EditorDisp.vue'

const views = useViews()
</script>