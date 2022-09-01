<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSrcTgt } from '@/stores/data';
import { useViews } from '@/stores/views';
import InputOriginal from './InputOriginal.vue';

const views = useViews()

const data = useSrcTgt()

const original = ref('')
const lines = computed(() => {
    return original.value.split('\n')
})

const splitter = ref(0)

const splitText = () => {
    const texts = original.value.split('\n')
    isShow.value = false
    data.setData(
        texts.slice(0, splitter.value),
        texts.slice(splitter.value)
    )
    closeDrawer()
}

const isShow = ref(true)
const showButton = computed(() => {
    return isShow.value ? 'HIDE' : 'SHOW'
})

const autofix = () => {
    const lineNum = lines.value.length
    splitter.value = Math.floor(lineNum / 2)
}

const closeDrawer = () => {
    views.isInputing = false
}


</script>

<template>
    <a-drawer :visible="views.isInputing" :width="'90%'" placement="left" :ok-text="'SPLIT'" :cancel-text="'CLOSE'"
        @ok="splitText" @cancel="closeDrawer">
        <template #title>
            <a-typography>
                <a-typography-title>Paste Original Text</a-typography-title>
            </a-typography>
        </template>
        <a-row>
            <a-col :span="21">
                <a-textarea v-model="original" placeholder="Paste here" @change="autofix" auto-size v-if="isShow" />
                <a-textarea v-model="original" placeholder="Paste here" disabled v-else />
            </a-col>
            <a-col :span="2" :offset="1">
                <a-button type="dashed" @click="() => { isShow = !isShow }">{{ showButton }}</a-button>
            </a-col>
        </a-row>
        <a-space direction="vertical">
            <a-typography-text>Select where the translations start: </a-typography-text>
            <a-select placeholder="Please select the start of translations" v-model="splitter" allow-search>
                <a-option v-for="line, lx in lines" :value="lx" :key="'line-' + lx">{{ line.substring(0, 25) }}
                </a-option>
            </a-select>
        </a-space>
    </a-drawer>
</template>