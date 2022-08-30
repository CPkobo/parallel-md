<template>
  <a-layout>
    <a-layout-content>
      <InputOriginal />
      <a-divider />
      <TableDisp />
    </a-layout-content>
    <a-layout-footer>
      <a-space>
        <a href="https://github.com/CPkobo/parallel-md" target="_blank">
          <IconGithub />
        </a>
        <a-button type="text" @click="toggleDark">
          <IconSun v-if="!isDark" />
          <IconMoon v-else />
        </a-button>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputOriginal from './components/InputOriginal.vue';
import TableDisp from './components/TableDisp.vue'
import { IconGithub, IconSun, IconMoon } from '@arco-design/web-vue/es/icon'

const isDark = ref(false)

const toggleDark = () => {
  if (isDark.value) {
    document.body.removeAttribute('arco-theme');
    isDark.value = false
  }
  else {
    document.body.setAttribute('arco-theme', 'dark')
    isDark.value = true
  }
}

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>