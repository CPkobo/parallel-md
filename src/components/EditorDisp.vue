<template>
    <a-split>
        <template #first>
            <DataEditor :isSrc="true" />
        </template>
        <template #second>
            <DataEditor :isSrc="false" />
        </template>
    </a-split>
</template>

<script setup lang="ts">
import DataEditor from './DataEditor.vue'

</script>
