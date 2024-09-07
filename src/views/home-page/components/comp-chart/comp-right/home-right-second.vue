<template>
  <div class="right">
    <div class="flex-item right-top">
      <div class="label">全省平均值</div>
      <div class="value">
        <span class="value">50</span>
        <span class="unit">%</span>
      </div>
    </div>
    <div class="flex-item right-bottom">
      <div class="label">全省平均值</div>
      <div class="value">50%</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
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
</style>
