<template>
  <div class="left">
    <div class="value">
      <span class="value-data value-color">50</span>
      <span class="value-unit">%</span>
    </div>
    <div class="label">达标率</div>
    <div class="rank">
      <span class="rank-label">排名</span>
      <span class="rank-value value-color">1</span>
    </div>
    <div class="desc">
      <span class="desc-label">合理区间：</span>
      <span class="desc-value">10%-100%</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .left {
    width: 250px;
    height: 250px;
    background: url(@/assets/images/right/rank.png) no-repeat center center/100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 135px;

    .value-color {
      background: linear-gradient(to bottom, #fff, #ecd237);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .value {
      .value-data {
        margin-left: 20px;
        font-size: 50px;
        line-height: 50px;
      }
      .value-unit {
        font-size: 12px;
      }
    }

    .label {
      font-size: 25px;
      line-height: 25px;
      margin-top: 15px;
    }

    .rank {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .rank-label {
        font-size: 18px;
      }
      .rank-value {
        font-size: 25px;
        line-height: 25px;
        margin-left: 5px;
        font-weight: 600;
      }
    }

    .desc {
      margin-top: 20px;
      font-weight: 200;
    }
  }
</style>
