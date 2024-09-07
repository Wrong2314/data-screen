<template>
  <div id="right-top">
    <home-right-first />
    <div class="right">
      <div class="flex-item right-top">
        <div class="label">全省平均值</div>
        <div class="value">50%</div>
      </div>
      <div class="flex-item right-bottom">
        <div class="label">全省平均值</div>
        <div class="value">50%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HomeRightFirst from "@/views/home-page/components/comp-chart/comp-right/home-right-first.vue";
</script>
<style lang="scss" scoped>
  #right-top {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .flex-item {
      display: flex;
      flex-direction: column;
    }
  }
</style>
