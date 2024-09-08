<template>
  <div class="container">
    <div class="flex-item">
      <div class="label">全省平均值</div>
      <div class="value">
        <dv-water-level-pond :config="configAvg" style="width: 100px; height: 100px" />
      </div>
    </div>
    <div class="flex-item">
      <div class="label">全省最高值</div>
      <div class="value">
        <dv-water-level-pond :config="configMax" style="width: 100px; height: 100px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";

  const configAvg = reactive({
    data: [50], // 假设这是全省平均值
    shape: "round",
    waveNum: 1,
    waveHeight: 10,
    colors: ["#1E90FF", "#87CEFA"],
  });

  const configMax = reactive({
    data: [80], // 假设这是全省最高值
    shape: "round",
    waveNum: 1,
    waveHeight: 10,
    colors: ["#FFD700", "#FFA500"],
  });
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flex-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
</style>
