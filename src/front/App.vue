<template>
  <div id="app">
    <top-bar class="top-bar"></top-bar>
    <div class="layout-main">
      <router-view/>
    </div>
    <!-- <back-to-top></back-to-top> -->
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import BackToTop from "@/components/BackToTop";
export default {
    name: "app",
    components: {
        TopBar,
        BackToTop
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.layout-main {
  position: relative;
  top: 60px;
  height: calc(100% - 60px);
  overflow: scroll;
  padding: 20px;
}
</style>
