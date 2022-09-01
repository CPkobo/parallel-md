<template>
  <div id="appbody" :class="{ 'darkmode': views.isDark }">
    <a-layout>
      <a-layout-sider :collapsed="true" :style="{ 'height': '100%' }">
        <a-affix :offsetTop="0">
          <SideNav />
        </a-affix>
      </a-layout-sider>
      <a-layout-content>
        <!-- <InputOriginal /> -->
        <!-- <a-divider /> -->
        <InputDrawer />
        <MainDisp />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useViews } from './stores/views';
import SideNav from './components/SideNav.vue';
import MainDisp from './components/MainDisp.vue'
import InputDrawer from './components/InputDrawer.vue';

const views = useViews()

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100vh;
}

div#appbody {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
}

div#appbody.darkmode {
  background-color: black;
}

main {
  padding-left: 20px;
  padding-right: 20px;
}
</style>