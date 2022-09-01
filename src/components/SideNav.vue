<script setup lang="ts">
import { ref } from 'vue'
import { useSrcTgt } from '@/stores/data';
import { useViews } from '@/stores/views';
import { IconEdit, IconNav, IconCode, IconGithub, IconSun, IconMoon, IconDownload } from '@arco-design/web-vue/es/icon'

const views = useViews()
const data = useSrcTgt()

const toggleInput = () => {
    views.isInputing = !views.isInputing
}

const toggleViewMode = () => {
    views.isTable = !views.isTable
    if (views.isTable) {
        data.resplit()
    }
}

const toggleDark = () => {
    if (views.isDark) {
        document.body.removeAttribute('arco-theme');
        views.isDark = false
    }
    else {
        document.body.setAttribute('arco-theme', 'dark')
        views.isDark = true
    }
}

const gotoGithub = () => {
    const atag = document.createElement('a')
    atag.href = 'https://github.com/CPkobo/parallel-md'
    atag.target = '_blank'
    atag.click()
}

const downloadCSV = () => {
    const srcs = data.esrc.split('\n')
    const tgts = data.etgt.split('\n')
    const longer = Math.max(srcs.length, tgts.length)
    const csv: string[] = []
    for (let i = 0; i < longer; i++) {
        const src = srcs[i] || ''
        const tgt = tgts[i] || ''
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
    <aside>
        <a-space direction="vertical" fill>
            <a-tooltip position="right" content="Input Texts">
                <a-button @click="toggleInput">
                    <IconEdit />
                </a-button>
            </a-tooltip>
            <a-button type="text" @click="toggleViewMode">
                <a-tooltip position="right" content="Table View" v-if="!views.isTable">
                    <IconNav />
                </a-tooltip>
                <a-tooltip position="right" content="Editor view" v-else>
                    <IconCode />
                </a-tooltip>
            </a-button>
            <a-tooltip position="right" content="Download CSV">
                <a-button type="text" @click="downloadCSV">
                    <IconDownload />
                </a-button>
            </a-tooltip>
            <a-button type="text" @click="toggleDark">
                <a-tooltip position="right" content="Light Mode" v-if="views.isDark">
                    <IconSun />
                </a-tooltip>
                <a-tooltip position="right" content="Dark Mode" v-else>
                    <IconMoon />
                </a-tooltip>
            </a-button>
            <a-tooltip position="right" content="Check Codes">
                <a-button type="text" @click="gotoGithub">
                    <IconGithub />
                </a-button>
            </a-tooltip>

        </a-space>
    </aside>
</template>

<style>
aside {
    height: 100%;
}
</style>