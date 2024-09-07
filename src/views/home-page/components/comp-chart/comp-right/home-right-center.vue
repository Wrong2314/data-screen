<template>
  <div class="right-center">
    <div v-for="(item, index) in list" :key="index" class="progress-container">
      <el-progress type="circle" :percentage="item.value" :width="90" :stroke-width="8">
        <template #default>
          <span class="progress-value progress-color">{{ item.value }}</span>
          <span class="progress-unit progress-color">%</span>
        </template>
      </el-progress>

      <div class="progress-desc">
        <div class="progress-color">{{ item.label }}</div>
        <div class="value">
          <span class="value-label">同比</span>
          <span :class="item.type ? 'up' : 'down'">{{ item.lastMonth }}</span>
          <img :src="item.type ? up : down" alt="#" />
        </div>
        <div class="value">
          <span class="value-label">环比</span>
          <span :class="item.type ? 'up' : 'down'">{{ item.lastYear }}</span>
          <img :src="item.type ? up : down" alt="#" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import up from "@/assets/images/right/up.png";
  import down from "@/assets/images/right/down.png";

  const list = [
    { label: "刑事", value: 50, lastMonth: "12.5", lastYear: "12.5", type: false },
    { label: "民事", value: 50, lastMonth: "12.5", lastYear: "12.5", type: true },
    { label: "行政", value: 50, lastMonth: "12.5", lastYear: "12.5", type: false },
    { label: "其他", value: 50, lastMonth: "12.5", lastYear: "12.5", type: false },
  ];
</script>

<style scoped lang="scss">
  .right-center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .progress-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 15px);

    .progress-color {
      background: linear-gradient(to bottom, #fff, #56c8ed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .progress-value {
      font-size: 25px;
      color: #ffffff;
    }

    .progress-unit {
      font-size: 12px;
      color: #ffffff;
    }

    .progress-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      padding: 10px 20px;
      position: relative;

      .value-label {
        color: #fff;
      }
    }

    .progress-desc::after {
      content: "";
      position: absolute;
      top: 0;
      left: -30px;
      width: 130%;
      height: 100%;
      z-index: -1;

      background: linear-gradient(
        to bottom,
        rgba(67, 154, 248, 0.2) 0%,
        rgba(67, 154, 248, 0) 5%,
        rgba(67, 154, 248, 0) 95%,
        rgba(67, 154, 248, 0.2) 100%
      );
    }
  }

  .up {
    color: #cf8c46;
  }

  .down {
    color: #03f771;
  }
</style>
