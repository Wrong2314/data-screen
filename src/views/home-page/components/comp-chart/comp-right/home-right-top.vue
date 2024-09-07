<template>
  <div id="right-top">
    <home-right-first />
    <home-right-second />
  </div>
</template>

<script setup lang="ts">
  import HomeRightFirst from "@/views/home-page/components/comp-chart/comp-right/home-right-first.vue";
  import HomeRightSecond from "@/views/home-page/components/comp-chart/comp-right/home-right-second.vue";
</script>

<style lang="scss" scoped>
  #right-top {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
