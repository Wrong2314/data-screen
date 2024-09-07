<template>
  <div id="right-top">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  #right-top {
    width: 100%;
    height: 100%;
    display: flex;

    .left {
      background: url(@/assets/images/right/range.png) no-repeat center center/100% 100%;
    }
  }
</style>
