<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSrcTgt } from '../stores/data'

const data = useSrcTgt()

const original = ref('')
const lines = computed(() => {
    return original.value.split('\n')
})

const splitter = ref(0)

const register = () => {
    const texts = original.value.split('\n')
    data.setData(
        texts.slice(0, splitter.value),
        texts.slice(splitter.value)
    )
}

const autofix = () => {
    const lineNum = lines.value.length
    splitter.value = Math.floor(lineNum / 2)
}

</script>

<template>
    <a-card>
        <a-space direction="vertical" fill>
            <a-typography>
                <a-typography-title>Paste Original Text</a-typography-title>
            </a-typography>
            <a-textarea v-model="original" placeholder="Paste here" @change="autofix"></a-textarea>
            <a-space>
                <a-typography-text>Select where the translations start: </a-typography-text>
                <a-select placeholder="Please select the start of translations" v-model="splitter" allow-search>
                    <a-option v-for="line, lx in lines" :value="lx" :key="'line-' + lx">{{ line.substring(0, 25) }}
                    </a-option>
                </a-select>
                <a-button @click="register" type="primary">SPLIT</a-button>
            </a-space>
        </a-space>
    </a-card>
</template>