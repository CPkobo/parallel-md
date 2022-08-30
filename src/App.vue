<template>
  <a-layout>
    <a-layout-content>
      <InputOriginal />
      <a-divider />
      <TableDisp />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import InputOriginal from './components/InputOriginal.vue';
import TableDisp from './components/TableDisp.vue'

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